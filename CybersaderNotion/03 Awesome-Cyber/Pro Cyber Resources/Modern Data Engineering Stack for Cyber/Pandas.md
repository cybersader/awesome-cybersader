---
publish: true
---
# Pandas

# Using a GUI to learn

- [A GUI for pandas | bamboolib](https://bamboolib.8080labs.com/)
- https://github.com/adamerose/PandasGUI

# Data Integration Code to go through

```python
import psycopg as pg
# https://stackoverflow.com/questions/62688256/sqlalchemy-exc-nosuchmoduleerror-cant-load-plugin-sqlalchemy-dialectspostgre
import psycopg2 as pg2  # sqlalchemy doesnt have support for psycopg3 yet
import pandas as pd
import numpy as np
import os
from sqlalchemy import create_engine
from urllib.parse import urlparse
from tqdm import tqdm
from jaccard_index.jaccard import jaccard_index

'''
CONFIGURATION SECTION
__________________________________________
'''
pk_ot = 'id_ot'  #
pk_qb = 'id_qb'  #

'''
------------------------------------------
'''

# ACCESSING ENV VARIABLES - https://dev.to/vulcanwm/environment-variables-in-heroku-python-385o#:~:text=To%20access
# %20your%20environment%20variables,to%20install%20the%20os%20module.&text=Then%2C%20the%20function%20to%20access,
# %5D%20with%20the%20key%20name).&text=You've%20done%20it!
# PANDAS to POSTGRES - https://towardsdatascience.com/upload-your-pandas-dataframe-to-your-database-10x-faster-eb6dc6609ddf
#       https://www.geeksforgeeks.org/how-to-insert-a-pandas-dataframe-to-an-existing-postgresql-table/
#
# PSYCOPG and PANDAS for database stuff -
# https://www.linkedin.com/pulse/how-create-pandas-data-frame-postgresql-psycopg-vitor-spadotto/

# Getting Environment Variables in Heroku
# DATABASE_URL = os.getenv(DATABASE_URL)
# OT_TABLE_NAME = os.getenv(OT_TABLE_NAME)
# QB_TABLE_NAME = os.getenv(QB_TABLE_NAME)

# Connect to POSTGRES database TODO CONFIG
_DATABASE_URL = "POSTGRES URL HERE"
DATABASE_URL = _DATABASE_URL.replace("postgres", "postgresql")  ## sqlalchemy only works if url has 'postgresql'

# TABLE NAMES  TODO CONFIG
OT_TABLE_NAME = "onetrust_vendors"
QB_TABLE_NAME = "quickbase_vendors"
OT_TO_QB_TABLE_NAME = "ot_to_qb_vendors"
VENDOR_MAPPING_TABLE = "mapped_vendor_data"

## Parse out the postgres URL to get each variable
# DB_URL = urlparse(DATABASE_URL)
# username = DB_URL.username
# password = DB_URL.password
# database = DB_URL.path[1:]
# hostname = DB_URL.hostname
# port = DB_URL.port

# conn_dict = pg.conninfo.conninfo_to_dict(DATABASE_URL)
# with pg.connect(**conn_dict) as conn:

alchemy_engine = create_engine(DATABASE_URL)
alchemy_conn = alchemy_engine.connect()

conn = pg.connect(DATABASE_URL)
conn.autocommit = True
cur = conn.cursor()

# Collect Data from Tables and store in Pandas dataframes
try:
    OT_query = '''SELECT * FROM ''' + OT_TABLE_NAME
    cur.execute(OT_query)
    ot_data = cur.fetchall()
    ot_cols = []
    for elt in cur.description:
        ot_cols.append(elt[0])
    ot_df = pd.DataFrame(data=ot_data, columns=ot_cols)
except:
    empty_df = pd.DataFrame()
    empty_df.to_sql(OT_TABLE_NAME, con=alchemy_conn, if_exists='replace', index=False)

try:
    QB_query = '''SELECT * FROM ''' + QB_TABLE_NAME
    cur.execute(QB_query)
    qb_data = cur.fetchall()
    qb_cols = []
    for elt in cur.description:
        qb_cols.append(elt[0])
    qb_df = pd.DataFrame(data=qb_data, columns=qb_cols)
except:
    empty_df = pd.DataFrame()
    empty_df.to_sql(QB_TABLE_NAME, con=alchemy_conn, if_exists='replace', index=False)

try:
    VENDOR_MAPPING_query = '''SELECT * FROM ''' + VENDOR_MAPPING_TABLE
    cur.execute(VENDOR_MAPPING_query)
    old_vendor_mapping_data = cur.fetchall()
    old_vendor_mapping_cols = []
    for elt in cur.description:
        old_vendor_mapping_cols.append(elt[0])
    old_vendor_mapping_df = pd.DataFrame(data=old_vendor_mapping_data, columns=old_vendor_mapping_cols)
except:
    old_vendor_mapping_df = pd.DataFrame()
    old_vendor_mapping_df.to_sql(VENDOR_MAPPING_TABLE, con=alchemy_conn, if_exists='replace', index=False)

OT_TO_QB_query = '''SELECT * FROM ''' + OT_TO_QB_TABLE_NAME
cur.execute(OT_TO_QB_query)
ot_to_qb_data = cur.fetchall()
ot_to_qb_cols = []
for elt in cur.description:
    ot_to_qb_cols.append(elt[0])
ot_to_qb_df = pd.DataFrame(data=ot_to_qb_data, columns=ot_to_qb_cols)
orig_ot_to_qb_df = ot_to_qb_df

print("[+] Loaded PostGreSQL tables...")

# Data Deduplication
# Drop columns where there are problematic nulls from backend changes in Jitsu or in OT or QB
# Using drop() to delete rows based on column value
try:
    ot_df.drop(ot_df[ot_df['status'] == ''].index, inplace=True)
    print("[+] Dropped empty 'status' rows from OT vendors table")
    ot_df.drop(ot_df[ot_df['name'] == ''].index, inplace=True)
    print("[+] Dropped empty 'name' rows from OT vendors table")
    qb_df.drop(qb_df[qb_df['status'] == ''].index, inplace=True)
    print("[+] Dropped empty 'status' rows from QB vendors table")
    qb_df.drop(qb_df[qb_df['name'] == ''].index, inplace=True)
    print("[+] Dropped empty 'name' rows from QB vendors table")
except:
    pass

# Rename input tables from ot and qb
# This was only used because the name column was different at one point
# try:
#     # ot_df.rename(columns={'status': 'ot_status', 'name': 'name_ot'}, inplace=True)
#     ot_df['name_ot'] = np.where((ot_df.name_ot == '') & (ot_df.name != ''), ot_df['name'], ot_df['name_ot'])
# except:
#     pass

# Make sure name rows from OT and QB are changed to name_ot and name_qb and also change status column names
# TODO CONFIG
try:
    ot_df.rename(columns={'name': 'name_ot', 'status': 'status_ot'}, inplace=True)
    print("[+] Changed OT 'name' column to 'name_ot'")
    qb_df.rename(columns={'name': 'name_qb', 'status': 'status_qb'}, inplace=True)
    print("[+] Changed QB 'name' column to 'name_qb'")
except:
    pass

print("[+] Deduplicating tables...")
ot_df.drop_duplicates(subset=pk_ot, keep='first', inplace=True)
qb_df.drop_duplicates(subset=pk_qb, keep='first', inplace=True)
print("[+] Deduplication Finished...")

# Clean OT Data
try:
    pd.set_option('display.max_columns', None)
    pd.set_option('display.max_rows', None)
    ot_df.drop(ot_df[ot_df['name_ot'] == ''].index, inplace=True)
    ot_df = ot_df.dropna(axis=0, how='any', subset=['name_ot', 'id_ot'])
    ot_df.sort_values(by=['id_ot'])
    print("[+] Cleaned OT Data")
except:
    pass

# Clean QB Data
try:
    pd.set_option('display.max_columns', None)
    pd.set_option('display.max_rows', None)
    ot_df.drop(ot_df[ot_df['name_qb'] == ''].index, inplace=True)
    ot_df = ot_df.dropna(axis=0, how='any', subset=['name_qb', 'id_qb'])
    ot_df.sort_values(by=['id_qb'])
    print("[+] Cleaned QB Data")
except:
    pass

# Data Integration and Schema Matching
# ------------------------------------------
# URL Links
# https://pbpython.com/record-linking.html
# https://www.educative.io/answers/three-ways-to-combine-dataframes-in-pandas
# https://github.com/J535D165/recordlinkage
# https://github.com/J535D165/data-matching-software
# https://github.com/AI-team-UoA/pyJedAI
# https://github.com/delftdata/valentine

# Schema Matching (hold off on this - manually for now)
# For now, a custom mapping between tables is fine
# QB (left) and OT (right)
# vendor_schema_map = {
#
# }
# ------------------------------------------

# Cross Join Dataframes to get every combination
print("[+] Cross-Joining OT and QB based on mapped table ('ot_to_qb')")
ot_df['JOIN'] = True
qb_df['JOIN'] = True
merged_df = pd.merge(ot_df, qb_df, on='JOIN')
merged_df.drop('JOIN', axis=1, inplace=True)
ot_df.drop('JOIN', axis=1, inplace=True)
qb_df.drop('JOIN', axis=1, inplace=True)

# renamed merged columns
merged_df.rename(columns={'id_x': pk_ot, 'id_y': pk_qb}, inplace=True)

# print(":::::::MERGED DF::::::")
# merged_df.head(5)
# merged_df.info()

# Using Jaccard for Similarity-based joining with Pandas
similarity_threshold = 0.6  # CONFIGURE (threshold for similarity - rows below this are deleted)
left_column = 'name_ot'  # CONFIGURE (field to compute similarities for)
right_column = 'name_qb'  # CONFIGURE (field to compute similarities for)
sim_column_name = "similarity"  # name for the similarity column
# init progress indicator
tqdm_desc = "Fuzzy Joining on - " + left_column + " <-- compared to --> " + right_column
tqdm.pandas(desc=tqdm_desc)
print("MERGED DF")
merged_df.info()
merged_df[sim_column_name] = merged_df.progress_apply(lambda x: jaccard_index(x[left_column], x[right_column]) if
jaccard_index(x[left_column], x[right_column]) > similarity_threshold else 0, axis=1)

# Filter dataframes based on threshold
df_similar_matches = merged_df[merged_df[sim_column_name] >= similarity_threshold]
df_exact_matches = merged_df[merged_df[sim_column_name] == 1.0]

# Sort Fuzzy-Joined dataframe
df_similar_matches.sort_values(by=sim_column_name, ascending=False)

print("[+] Similarity between databases calculated...")
# print("::::::: Fuzzy-Joined Dataframe ::::::")
# print(df_similar_matches.head(5))
# df_similar_matches.info()

# Add similar matches dataframe to mapping dataframe that matches left -> right tables
print("[+] Configuring mapping tables")
left_primary_key = pk_ot  # this is equivalent to the primary key (left is OT)
right_primary_key = pk_qb  # this is equivalent to the primary key (right is QB)
ot_to_qb_columns = [left_primary_key, left_column, right_primary_key, right_column, sim_column_name, "match"]
ot_to_qb_df = ot_to_qb_df[ot_to_qb_columns]  # selects the same columns as from the similar matches
# df_similar_matches['match'] = "?"  # add match column
df_similar_matches_temp = df_similar_matches.assign(match='y')
ot_to_qb_similar_matches_df = df_similar_matches_temp[
    ot_to_qb_columns]  # gets columns setup for appending current matches

# Create tables for joining to update mapping
# ot_to_qb_nonmatches = ot_to_qb_df[ot_to_qb_df["match"] == "n"]
# ot_to_qb_matches = ot_to_qb_df[ot_to_qb_df["match"] == "y"]
# ot_to_qb_unknown = ot_to_qb_df[ot_to_qb_df["match"] == "?"]
# ot_to_qb_errors = ot_to_qb_df[ot_to_qb_df["match"] != ("n", "y", "?")]

# Rename columns
ot_df.rename(columns={'id': pk_ot}, inplace=True)
qb_df.rename(columns={'id': pk_qb}, inplace=True)
orig_ot_to_qb_df.rename(columns={'id_x': pk_ot, 'id_y': pk_qb, 'name_x': 'name_ot', 'name_y': 'name_qb'}, inplace=True)

# Check for conflicts
print("[+] Checking for conflicts...")
ot_to_qb_conflicts_temp = orig_ot_to_qb_df.merge(how='left',
                                                 right=ot_to_qb_similar_matches_df,
                                                 left_on=left_primary_key,
                                                 right_on=left_primary_key)
ot_to_qb_conflicts_temp = ot_to_qb_conflicts_temp[ot_to_qb_conflicts_temp['id_qb_x']
                                                  == ot_to_qb_conflicts_temp['id_qb_y']]
ot_to_qb_conflicts_temp.rename(columns={'similarity_x': 'similarity_from_db', 'similarity_y': 'similarity_from_python'},
                               inplace=True)
# ot_to_qb_conflicts_temp['match_y'] = (ot_to_qb_conflicts_temp['match_y']).where(
#     ot_to_qb_conflicts_temp['match_y'] == '',
#     'n')
ot_to_qb_conflicts = ot_to_qb_conflicts_temp[
    ot_to_qb_conflicts_temp['match_x'] != ot_to_qb_conflicts_temp['match_y']]  # CONFIGURE

# Find instances of new vendors - means mapping file may need updated.
ot_to_qb_similar_matches_df = ot_to_qb_similar_matches_df.sort_values('similarity', ascending=False) \
    .drop_duplicates('id_ot').sort_index()
new_to_ot_df = orig_ot_to_qb_df.merge(how='outer',
                                      right=ot_to_qb_similar_matches_df,
                                      left_on=left_primary_key,
                                      right_on=left_primary_key,
                                      indicator=True)
new_to_ot_df = new_to_ot_df.loc[new_to_ot_df['_merge'] == 'right_only']
new_to_ot_df = new_to_ot_df.sort_values('similarity_y', ascending=False) \
    .drop_duplicates('id_ot').sort_index()

# UPDATE TODO add to vendor alerts

# Create Vendor-to-Vendor Mapping between OT and QB
# Left Join OT with known QB matches
print("[+] Left joining OT with known QB matches...")
# cols_to_use = ot_df.columns.difference(orig_ot_to_qb_df.columns)  # get difference of cols between dfs so we
# # don't duplicate cols
# # print(cols_to_use.tolist())
# temp_df = orig_ot_to_qb_df[cols_to_use]
# temp_df.info()

ot_mapped_df = ot_df.merge(how='left',
                           right=orig_ot_to_qb_df,
                           left_on=pk_ot,
                           right_on=pk_ot,
                           # suffixes=('', '_map2ot'),
                           suffixes=('', '_drop'),
                           copy=False)
ot_mapped_df = ot_mapped_df[ot_mapped_df['match'] == 'y']  # Filter to only matches
ot_mapped_df.drop([col for col in ot_mapped_df.columns if 'drop' in col], axis=1, inplace=True)

# Left Join QB with known OT matches
print("[+] Left joining OT matches with respective QB matches...")
# cols_to_use = qb_df.columns.difference(ot_mapped_df.columns)  # get difference of cols between dfs so we don't
# # duplicate cols
# temp_df = orig_ot_to_qb_df[cols_to_use]

result_mapped_df = ot_mapped_df.merge(how='left',
                                      right=qb_df,
                                      left_on=pk_qb,
                                      right_on=pk_qb,
                                      # suffixes=('', '_map2qb'),
                                      suffixes=('', '_drop'),
                                      copy=False)
result_mapped_df = result_mapped_df.dropna(axis=1)  # get rid of completely null columns
result_mapped_df.drop([col for col in result_mapped_df.columns if 'drop' in col], axis=1, inplace=True)

# Get missing tables by doing a left anti join on
print("[+] Finding missing vendors between two databases..")
ot_vendors_missing_from_mapping = result_mapped_df.merge(how='outer',
                                                         right=qb_df,
                                                         left_on=pk_qb,
                                                         right_on=pk_qb,
                                                         indicator=True)
ot_vendors_missing_from_mapping = ot_vendors_missing_from_mapping.loc[ot_vendors_missing_from_mapping['_merge'] ==
                                                                      'right_only']
ot_vendors_missing_from_mapping = ot_vendors_missing_from_mapping.dropna(axis=1, how='all')  # get rid of all the null
# columns

qb_vendors_missing_from_mapping = ot_df.merge(how='outer',
                                              right=result_mapped_df,
                                              left_on=pk_ot,
                                              right_on=pk_ot,
                                              indicator=True)
qb_vendors_missing_from_mapping = qb_vendors_missing_from_mapping.loc[qb_vendors_missing_from_mapping['_merge'] ==
                                                                      'left_only']
qb_vendors_missing_from_mapping = qb_vendors_missing_from_mapping.dropna(axis=1, how='all')  # get rid of all the null
# columns

# Look for any vendors that have relevance or have changed in QB compared to OT data
# COMPARING - result_mapped_df && old_vendor_mapping_df (from Postgres database)
tqdm_desc = "Processing duplicate Vendors"
tqdm.pandas(desc=tqdm_desc)

def vendor_mapping_changed(old_mapping_df, new_mapping_df, columns):
    temp_old_mapping_df = old_mapping_df[columns]
    temp_new_mapping_df = new_mapping_df[columns]
    return not temp_old_mapping_df.equals(temp_new_mapping_df)

def create_vendor_alert(old_id_qb, old_qb_org_value, old_qb_status, new_id_qb, new_qb_org_value, new_qb_status):
    alerts = []
    no_alerts = True
    if old_qb_status != new_qb_status:
        alerts.append("[CHECK] QuickBase Status Changed.");
        no_alerts = False
    if old_qb_org_value != new_qb_org_value:
        alerts.append("[CHECK] QuickBase orgs using vendor changed.");
        no_alerts = False
    if old_id_qb != new_id_qb:
        alerts.append("[CHECK] Vendors changed in QuickBase. Check conflicts table just in case.");
        no_alerts = False
    if no_alerts:
        return ""
    else:
        sep = ", "
        return (sep.join(alerts) + sep).rstrip()

# Get duplicate entities from each table and compare them to form more vendor alerts
def process_duplicate_vendor(mapping_df, match_column, match_boolean_column, current_match_val, current_status_val,
                             current_id_val, primary_name_column, status_column_name):
    dup_exists = not mapping_df[mapping_df[match_column] == current_id_val].empty
    inactive_statuses = ['Dormant', 'Terminated', 'Closed to Future Business', '']
    if dup_exists:
        temp_dup_df = mapping_df[mapping_df[match_column] == current_id_val]
        dup_vendor_ct = 0
        old_active_vendor_ct = 0
        old_inactive_vendor_ct = 0
        dup_vendors = []
        old_active_vendors = []
        old_inactive_vendors = []
        for ind in temp_dup_df.index:
            temp_match_val = temp_dup_df[match_boolean_column][ind]
            temp_status_val = temp_dup_df[status_column_name][ind]
            # print(":::: ", temp_dup_df[match_column][ind])
            # print(current_match_val, " ::: ", temp_match_val, " ::: ", current_status_val, " ::: ", temp_status_val)
            if current_match_val == 'y' and temp_match_val == 'y':
                dup_vendor_ct += 1
                temp_str = str(temp_dup_df[primary_name_column][ind])
                dup_vendors += [temp_str]
            elif current_match_val == 'y' and temp_match_val == 'n' and temp_status_val in inactive_statuses:
                old_inactive_vendor_ct += 1
                temp_str = str(temp_dup_df[primary_name_column][ind])
                old_active_vendors += [temp_str]
            elif current_match_val == 'y' and temp_match_val == 'n' and temp_status_val not in inactive_statuses:
                old_active_vendor_ct += 1
                temp_str = str(temp_dup_df[primary_name_column][ind])
                old_inactive_vendors += [temp_str]
        alerts = ''
        if dup_vendor_ct > 0:
            # dup_vendors_str = ''.join(dup_vendors)
            # dup_vendors_str = ' << AND >> '.join(map(str, dup_vendors))
            alerts += '[' + str(dup_vendor_ct) + '] Duplicate vendors IN MAPPING FILE (Sort by IDs to find duplicates) '
        if old_inactive_vendor_ct > 0:
            # old_active_vendors_str = ''.join(old_active_vendors)
            # old_active_vendors_str = ' < AND >'.join(map(str, old_active_vendors))
            alerts += '[' + str(old_inactive_vendor_ct) + '] old duplicate vendors with NON-Active QB status IN ' \
                                                          'MAPPING FILE  (Sort by IDs to find duplicates)'
        if old_active_vendor_ct > 0:
            # old_inactive_vendors_str = ''.join(old_inactive_vendors)
            # old_inactive_vendors_str = ' < AND >'.join(map(str, old_inactive_vendors))
            alerts += '[' + str(old_active_vendor_ct) + '] old duplicate vendors with Active QB status IN MAPPING ' \
                                                        'FILE  (Sort by IDs to find duplicates)'
        return alerts

def process_duplicate_vendors(mapping_df, match_boolean_column, status_column, match_column, primary_name_column):
    # for each row of mapping_df create potential alerts
    temp_df = mapping_df.copy()
    temp_df['alert'] = temp_df.progress_apply(lambda x: process_duplicate_vendor(temp_df,
                                                                                 match_column,
                                                                                 match_boolean_column,
                                                                                 x[match_boolean_column],
                                                                                 x[status_column],
                                                                                 x[match_column],
                                                                                 primary_name_column,
                                                                                 status_column),
                                              axis=1)
    return temp_df

# Create Vendor Alert Dataframe
vendor_alerts_df = result_mapped_df.copy()
vendor_alerts_df = vendor_alerts_df.assign(alert='')

# Shows duplicates in each database where multiple vendors in one db map to a vendor in the other db
# RESOURCE - https://sparkbyexamples.com/pandas/pandas-get-list-of-all-duplicate-rows/

print("[+] Finding duplicate vendors from each table")
# orig_ot_to_qb_df.sort_values(pk_ot, inplace=True)
# duplicates_in_ot_matches_df = orig_ot_to_qb_df[orig_ot_to_qb_df[pk_ot].duplicated()]
# orig_ot_to_qb_df.sort_values(pk_qb, inplace=True)
# duplicates_in_qb_matches_df = orig_ot_to_qb_df[orig_ot_to_qb_df[pk_qb].duplicated()]

# orig_ot_to_qb_df = orig_ot_to_qb_df[orig_ot_to_qb_df['match'] == 'y']
print("[+] Processing duplicate OT vendors...")
duplicates_in_ot_matches_df = orig_ot_to_qb_df[orig_ot_to_qb_df.duplicated(pk_ot, keep=False)]
duplicates_in_ot_matches_df = process_duplicate_vendors(duplicates_in_ot_matches_df, 'match', 'status', pk_ot,
                                                        'name_ot')
duplicates_in_ot_matches_df = duplicates_in_ot_matches_df[duplicates_in_ot_matches_df['alert'] != '']
duplicates_in_ot_matches_df.sort_values(by=['name_ot'])

print("[+] Processing duplicate QB vendors...")
# duplicates_in_ot_matches_df = duplicates_in_ot_matches_df[duplicates_in_ot_matches_df['match'] == 'y']
duplicates_in_qb_matches_df = orig_ot_to_qb_df[orig_ot_to_qb_df.duplicated(pk_qb, keep=False)]
duplicates_in_qb_matches_df.info()
duplicates_in_qb_matches_df = process_duplicate_vendors(duplicates_in_qb_matches_df, 'match', 'status', pk_qb,
                                                        'name_qb')
duplicates_in_qb_matches_df = duplicates_in_qb_matches_df[duplicates_in_qb_matches_df['alert'] != '']
duplicates_in_qb_matches_df.sort_values(by=['name_qb'])

# duplicates_in_ot_matches_df = duplicates_in_ot_matches_df[duplicates_in_ot_matches_df['match'] == 'y']

print("OLD VENDOR MAPPING")
old_vendor_mapping_df.info()
print("NEW VENDOR MAPPING")
result_mapped_df.info()

# Check if vendor data has changed, and if so then get alerts from relevant changes for relevant rows
tqdm_desc = "Creating Vendor Mapping Alerts"
tqdm.pandas(desc=tqdm_desc)
qb_vendor_data_changed = False
if not old_vendor_mapping_df.empty:
    try:
        if vendor_mapping_changed(old_vendor_mapping_df, result_mapped_df, old_vendor_mapping_df.columns.tolist()):
            print("[+] Vendor map changes detected")
            relevant_cols = ['id_qb', 'organization_value', 'status_qb']
            qb_vendor_data_changed = True
            temp_vendor_alerts_df = result_mapped_df.copy()
            # vendor_alerts_df = pd.concat([temp_vendor_alerts_df, old_vendor_mapping_df]).drop_duplicates(keep=False,
            #                                                                                              subset=relevant_cols)
            old_suffix = '_old'
            new_suffix = '_new'
            # temp_vendor_alerts_df.info()  Error free mapping of ot to qb vendors - uses manually inputted map
            # old_vendor_mapping_df.info()  Previous error free mapping that is in the database at the time of running

            # This merges both the previous and just-now built mapping for ot to qb vendors
            vendor_alerts_df = old_vendor_mapping_df.merge(temp_vendor_alerts_df,
                                                           how='left',
                                                           left_on='id_ot',
                                                           right_on='id_ot',
                                                           indicator=False,
                                                           copy=True,
                                                           suffixes=[old_suffix, new_suffix])
            # vendor_alerts_df.info()
            vendor_alerts_df['alert'] = vendor_alerts_df.progress_apply(lambda x:
                                                                        create_vendor_alert(
                                                                            x[relevant_cols[0] + old_suffix],
                                                                            x[relevant_cols[1] + old_suffix],
                                                                            x[relevant_cols[2] + old_suffix],
                                                                            x[relevant_cols[0] + new_suffix],
                                                                            x[relevant_cols[1] + new_suffix],
                                                                            x[relevant_cols[2] + new_suffix]),
                                                                        axis=1)

            vendor_alerts_df = vendor_alerts_df.loc[vendor_alerts_df['alert'] != '']
    except:
        pass

# ----------------------------------------

# Data Export back to Postgres Server (Converting Pandas dataframes to SQL tables)
print("[+] Converting & Uploading pandas dataframes to PostgreSQL...")
qb_df.to_sql('quickbase_vendors', con=alchemy_conn, if_exists='replace', index=False)
ot_df.to_sql('onetrust_vendors', con=alchemy_conn, if_exists='replace', index=False)
ot_to_qb_conflicts.to_sql('false_positives_in_automated_mapping', con=alchemy_conn, if_exists='replace', index=False)
ot_vendors_missing_from_mapping.to_sql('missing_from_ot', con=alchemy_conn, if_exists='replace', index=False)
qb_vendors_missing_from_mapping.to_sql('missing_from_qb', con=alchemy_conn, if_exists='replace', index=False)
duplicates_in_ot_matches_df.to_sql('duplicates_in_ot', con=alchemy_conn, if_exists='replace', index=False)
duplicates_in_qb_matches_df.to_sql('duplicates_in_qb', con=alchemy_conn, if_exists='replace', index=False)
result_mapped_df.to_sql('mapped_vendor_data', con=alchemy_conn, if_exists='replace', index=False)
ot_to_qb_similar_matches_df.to_sql('all_similar_vendors_from_python', con=alchemy_conn, if_exists='replace',
                                   index=False)
new_to_ot_df.to_sql('potential_new_matches_to_ot', con=alchemy_conn, if_exists='replace', index=False)
if qb_vendor_data_changed and not old_vendor_mapping_df.empty:
    vendor_alerts_df.to_sql('vendor_alerts', con=alchemy_conn, if_exists='replace', index=False)

print("[+] Data finished uploading...")

# Test to see if table was populated
# sql_query = '''select * from test_pandas;'''
# cur.execute(sql_query)
# for i in cur.fetchall():
#     print(i)

alchemy_conn.close()
```