# Python Program

# Applicable Canarytokens

## HTTP Token

When you create a HTTP based Canarytoken, the system gives you a URL.

Anyone attempting to browse to this URL will generate an alert.

Why does this matter? Once you are able to get an alert for a web-based token, or a DNS based token, you have the building blocks for squillions of possible tripwires.

## DNS Token

When you create a DNS based Canarytoken, the system gives you a unique Internet resolvable domain name. Anyone attempting to resolve this domain name, will now trigger an alert. Why does this matter? Once you are able to get an alert for a web-based token, or a DNS based token, you have the building blocks for squillions of possible tripwires.

## Web Image Token

This token works much like the default HTTP token, but allows you to bind the token to an image of your choosing. i.e. upload an image to your server. The server will serve this image to people, and will notify you when it does.

A trick is to embed this image in an admin page for example. An attacker accessing the page will also load the image, sending you your notification that the page has been accessed.

**Bonus** If your site actually is used for phishing attacks, you will be notified for every user who loads the “malicious page" - This is great news, since it will often help with targeted Incident Response.

## Cloned Website

This Canarytoken is placed within the JavaScript of your websites and notifies you if someone clones your site and hosts it on another domain. (This is often used for targeted Phishing attacks.)

Create a token by choosing "Cloned Website" from the drop down list.

Leave a reasonable comment to remind yourself where you will deploy the token. Then, supply the domain that you want to protect (this is the domain where the site is deployed that you will insert your tokenized javascript into).

You'll get javascript similar to:

`if (document.domain != "thinkst.com") {
    var l = location.href;
    var r = document.referrer;
    var m = new Image();
    m.src = "http://canarytokens.com/"+
            "<TOKEN>.jpg?l="+
            encodeURI(l) + "&amp;r=" + encodeURI(r);
}`

Copy the javascript (optionally run through an **[obfuscator (opens new window)](https://www.google.com/search?q=JavaScript+Obfuscator)**) onto the pages of the website deployed at the specified domain.

## AWS API Keys

This token provides you with a set of AWS API keys. Leave them in private code repositories, leave them on a developers machine. An attacker who stumbles on them will believe they are the keys to your cloud infrastructure. If they are used via the AWS API at any point, you will be alerted. The AWS credentials that are displayed can be copied into a file named credentials or keys (as per AWS custom). The two provided keys must be kept together for an attacker to use the AWS API. The file downloaded contains the AWS API credentials linked to your Canarytoken. The file is formatted such that it looks like a legitimate AWS credentials file.

> Note: These alerts first pass through Amazon's logging infrastructure which may introduce a delay of between 2 and 30 minutes before the alert comes through.
> 

## Fast Redirect Token

- This token is similar to the HTTP token but the token redirects to a custom address once triggered. The difference between the regular HTTP token and the Fast Redirect is that this token does not collect browser nor browser plugin information. For a redirect that does, see the Slow Redirect token in the next section.

## Slow Redirect Token

- This token is similar to the HTTP token but the token redirects to a custom address once triggered. The difference between the regular Fast Redirect token and this is that this token runs a browser scanner that collects browser/plugin information.

# Future Developments

1. If I would modify the canarytokens source code;
    1. The python program fetches the current redis database information, goes through it, and turns the key:value data into dictionaries (I will have to run some python code to first determine what the redis db data looks like.

# GPT Prompts

## Initial Program

Okay.  Here's what I need you to do.  I need to create a program called [cybirdy.py](http://cybirdy.py/) which can utilize this redis database to implant canary tokens programmatically into a postgres SQL database.  This program should mostly utilize pandas to do the programmatic parts but use psycopg or SQL alchemy to interface with the SQL databases.

Here's how it should generally work:

1. The python program pulls in the credentials data from a local JSON file with configurations for API tokens, database credentials, and anything else that is necessary.
2. The python program fetches the canaries.json file which stores user-entered canaries.  
    1. The keys of this JSON file should be the canary_id.  Then each canary ID can have any number of children keys and values.  However, all canary_token items should have a “canary_type” key. 
    2. There should be a “canaries_schema.json” file which houses all of the possible applicable canary types and their keys.
3. The python program looks at the column names of tables in the attached SQL database to determine if there are any current canary tokens that are applicable to a specific column that might be applicable
    1. Finding out if there is a column that could be inserted with a canary token can be done in a few ways (from best to worst):
        1. Use the OpenAI API with a GPT model to look at the columns and return a key:value pair for (canary_token_type:applicable_SQL_table_column)
        2. Only use exact name matches
4. The python program will then process the applicable tables that will be inserted with fake rows to find the statistical distributions and analytical patterns of the values in columns so that it can generate a realistic row
    1. We will use a method that could help retain the statistical properties through probability matching or another method.  I want to do the simplest one possible which covers edge cases and different dtypes of columns.
    2. Here’s some other examples of methods:
        1. bootstrapping, monte carlo simulations, GANs, copula-based methods, etc.
5. The python program will then create a fake row of data and insert it into the SQL database

## Canary Match Checking

Okay make a function that obtains all tables and their headers and stores them as a dictionary in the class.  Also, change the class name to "CanaryImplanter".  The identify_suitable_tables function looks at the column names of tables in the attached SQL database to determine if there are any current canary tokens that are applicable to a specific column that might be applicable. Use the OpenAI API with a GPT model to look at the columns and return a key:value pair like "canary_token_type:applicable_SQL_table_column".  It should put these into a dictionary variables for the class that has the SQL table_name as the key and then an object for each value with the "canary_token_type:applicable_SQL_table_column" pair.  Next, this function should obtain example values from column candidates via the SQL connection (postgres).  The GPT model is then used again to ask if the token values are the same type of values as the ones in the database.  GPT should only answer a simple "yes" or "no".  If yes, then this successful matches are added to a variable that keeps track of canary matches which once again has the SQL table_name as the key and then an object for each value with the "canary_token_type:applicable_SQL_table_column" pair.

This variable will be used in subsequent steps

In order to interact with OpenAI's GPT models, you need to use OpenAI's API. As of my training cut-off in September 2021, OpenAI's GPT models don't have a built-in method to interact with databases, so you'd need to make the SQL queries, process the data, then generate your query to the GPT model based on the data you've retrieved.

For your use case, you would need to generate a suitable prompt for the GPT model based on the database schema and the canary tokens, and then interpret the model's response. This is a complex task that would likely require careful tuning of the prompts and possibly some manual intervention to handle edge cases and ensure the correctness of the results.

Here's a rough idea of how you might implement this:

```
pythonCopy code
import openai
from sqlalchemy import MetaData, Table
from sqlalchemy.sql import select

class CanaryImplanter:
    def __init__(self, credentials_file, canaries_file, canaries_schema_file):
        self.load_credentials(credentials_file)
        self.load_canaries(canaries_file, canaries_schema_file)
        self.connect_to_db()
        self.tables = {}
        self.get_all_tables_and_columns()

    def load_credentials(self, file):
        with open(file, 'r') as f:
            self.credentials = json.load(f)
        openai.api_key = self.credentials['openai_api_key']

    def get_all_tables_and_columns(self):
        metadata = MetaData()
        metadata.reflect(bind=self.connection.engine)
        for table_name in metadata.tables.keys():
            table = Table(table_name, metadata, autoload=True, autoload_with=self.connection.engine)
            self.tables[table_name] = [column.name for column in table.columns]

    def identify_suitable_tables(self):
        self.canary_matches = {}
        for table_name, columns in self.tables.items():
            for column_name in columns:
                for canary_id, canary_data in self.canaries.items():
                    if self.check_canary_match(canary_data['canary_type'], table_name, column_name):
                        if table_name not in self.canary_matches:
                            self.canary_matches[table_name] = {}
                        self.canary_matches[table_name][column_name] = canary_id

    def check_canary_match(self, canary_type, table_name, column_name):
        table = Table(table_name, MetaData(), autoload=True, autoload_with=self.connection.engine)
        stmt = select([table]).limit(10)
        example_data = [row[column_name] for row in self.connection.execute(stmt)]
        prompt = f"Is a {canary_type} canary token suitable for a database column with the following example values: {example_data}?"
        response = openai.Completion.create(engine="text-davinci-003", prompt=prompt, max_tokens=10)
        return "yes" in response.choices[0].text.lower()

    # ... rest of the class ...

```

This script will identify suitable tables and columns for each canary token type by generating a prompt for the GPT model based on example data from the column and the canary token type, then interpreting the model's response as a yes/no answer.

Note that this is a simplified version and will not handle all edge cases. For example, it does not handle the case where the GPT model's response is ambiguous or does not contain a clear yes/no answer. Additionally, it only uses the first 10 rows of each column for the example data, which might not be representative of the entire column.

Remember to replace "text-davinci-003" with the actual ID of the model you want to use.

You also need to provide your OpenAI API key. This key should be stored securely and

I want there to be two separate canary match-checking functions though. One looks at the column names and the general table to determine which columns might be applicable, then it does the same value check as what was done here. Also, I want the identify_suitable_tables to instead use data from the schema JSON which should include descriptions and other important keys for each canary_type. These are then given to the canary check function/functions which are then used to determine if the columns and then the example values are applicable to the canary type.

Sure, here's how you might modify the **`CanaryImplanter`** class to separate the process of matching canary tokens to columns based on column names and example values, and to use the canary schema data:

```
pythonCopy code
import openai
from sqlalchemy import MetaData, Table
from sqlalchemy.sql import select

class CanaryImplanter:
    def __init__(self, credentials_file, canaries_file, canaries_schema_file):
        self.load_credentials(credentials_file)
        self.load_canaries(canaries_file, canaries_schema_file)
        self.connect_to_db()
        self.tables = {}
        self.get_all_tables_and_columns()

    def load_credentials(self, file):
        with open(file, 'r') as f:
            self.credentials = json.load(f)
        openai.api_key = self.credentials['openai_api_key']

    def get_all_tables_and_columns(self):
        metadata = MetaData()
        metadata.reflect(bind=self.connection.engine)
        for table_name in metadata.tables.keys():
            table = Table(table_name, metadata, autoload=True, autoload_with=self.connection.engine)
            self.tables[table_name] = [column.name for column in table.columns]

    def identify_suitable_tables(self):
        self.canary_matches = {}
        for table_name, columns in self.tables.items():
            for column_name in columns:
                for canary_id, canary_data in self.canaries.items():
                    canary_schema = self.canaries_schema[canary_data['canary_type']]
                    if self.check_canary_match(canary_schema, table_name, column_name):
                        if table_name not in self.canary_matches:
                            self.canary_matches[table_name] = {}
                        self.canary_matches[table_name][column_name] = canary_id

    def check_canary_match(self, canary_schema, table_name, column_name):
        if not self.check_column_name_match(canary_schema, column_name):
            return False
        return self.check_value_match(canary_schema, table_name, column_name)

    def check_column_name_match(self, canary_schema, column_name):
        prompt = f"Does a database column with the name '{column_name}' match the following description of a canary token type: {canary_schema['description']}?"
        response = openai.Completion.create(engine="text-davinci-003", prompt=prompt, max_tokens=10)
        return "yes" in response.choices[0].text.lower()

    def check_value_match(self, canary_schema, table_name, column_name):
        table = Table(table_name, MetaData(), autoload=True, autoload_with=self.connection.engine)
        stmt = select([table]).limit(10)
        example_data = [row[column_name] for row in self.connection.execute(stmt)]
        prompt = f"Do the following example values from a database column match the type of values expected for a canary token with the following description: {canary_schema['description']}? Example values: {example_data}"
        response = openai.Completion.create(engine="text-davinci-003", prompt=prompt, max_tokens=10)
        return "yes" in response.choices[0].text.lower()

    # ... rest of the class ...

```

In this modified version, the **`identify_suitable_tables`** function now passes the canary schema data for each canary token type to the **`check_canary_match`** function. This function then calls **`check_column_name_match`** to check if the column name matches the description of the canary token type, and **`check_value_match`** to check if the example values from the column match the type of values expected for the canary token type. Both of these functions generate suitable prompts for the GPT model based on the canary schema data and

## Canary Matching and Print Statements and Progress Bars

## Generating Fake Data with OpenAI GPT in Python

```python
import openai
from faker import Faker
import csv
from tqdm import tqdm

# Initialize the OpenAI API
openai.api_key = "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# Define the CSV file headers and columns for each table
headers = {
    "user_accounts": ["username", "password", "email", "phone_number", "preferences"],
    "customers": ["name", "email", "phone_number", "purchase_history", "purchase_history"],
    "transactions": ["transaction_id", "date", "amount", "payer", "payee", "description"]
}

# Define a dictionary that maps column names to Faker data types
data_types = {
    "username": "user_name",
    "password": "password",
    "email": "email",
    "phone_number": "phone_number",
    "name": "name",
    "purchase_history": "text",
    "payer": "name",
    "payee": "name",
    "transaction_id": "uuid4",
    "date": "date",
    "amount": "pyfloat",
    "description": None
}

# Initialize the Faker library
fake = Faker()

# Generate the fake data and write it to CSV files
for table in headers.keys():
    with open(f"{table}.csv", "w", newline="") as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(headers[table])
        for i in tqdm(range(100), desc=f"Generating {table} data"):
            row = []
            for column in headers[table]:
                if column in ["description", "purchase_history", "preferences"]:
                    # Generate a fake paragraph for this column using GPT
                    prompt = "Generate a paragraph for the \"" + column + \
                             "" \
                             "\" column in a table with the following headers: " + \
                             ",".join(headers[table]) + \
                             ". The paragraph should describe a fake " + \
                             column + " value, including any relevant details or context. " \
                                      "You can assume that this data is being generated for " \
                                      "testing or development purposes, and does not need to be " \
                                      "accurate or representative of real data. Please generate 1-2 " \
                                      "sentences of text."
                    completions = openai.Completion.create(engine="text-davinci-003", prompt=prompt, max_tokens=1024)
                    fake_data = completions.choices[0].text.strip()
                    row.append(fake_data)
                else:
                    # Generate a fake value for this column using Faker
                    fake_fn = getattr(fake, data_types[column])
                    row.append(fake_fn())
            writer.writerow(row)
```

# Adding Fake Data to SQL Database using DBeaver

- Made database in Digital Ocean

![Untitled](Python%20Program/Untitled.png)

- Connected with DBeaver

![Untitled](Python%20Program/Untitled%201.png)

- Imported Data in to DBeaver

![Untitled](Python%20Program/Untitled%202.png)