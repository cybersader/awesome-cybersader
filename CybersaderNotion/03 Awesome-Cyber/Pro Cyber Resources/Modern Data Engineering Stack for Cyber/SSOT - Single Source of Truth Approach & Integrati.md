# SSOT - Single Source of Truth Approach & Integration

---

---

# Approach to SSOT (single source of truth) & Updating Data Sources

## (EXACT / MATCHING KEY) Sub-Tasks

### Schema Matching or Schema Mapping

This involves manually or manually creating a mapping between two tables or tabular data structures. This means matching columns that refer the same thing, but maybe have different values or different column names.

### Data Matching or Entity Resolution or Record Linkage

This means figuring out which entities are the same between two tabular data structures, tables, or data sources. This essentially means matching and deduplicating rows. Additionally, this includes “canonicalization,” which refers to choosing the primary name for that entity when there are two differing names from separate sources.

## (FUZZY /NO MATCHING KEY) Sub-Tasks

### Schema Matching or Schema Mapping

This involves manually or manually creating a mapping between two tables or tabular data structures. This means matching columns that refer the same thing, but maybe have different values or different column names.

### Fuzzy Data Matching - getting candidates

This step is designed to gather potential candidates which may be the same entity. Fuzzy entity resolution can use AI or it can use machine learning and/or NLP algorithms to determine similarities (even string similarity) between values in columns such as names which may be different between two sources.

### Fuzzy Data Matching - manual adjudication

This step shows the candidates based on a threshold and the user must verify which are matching. Non-matching and matching columns are then put into mappings that map between the two data sources via an ID or primary key or column.

### Fuzzy Data Matching - utilizing matching and non-matching map

Now we have a map that determines which are matching and non-matching, so that when new entities are added to either data sources, then they can be checked via these mappings, then if they are fuzzily like another unmatched entity in the other data source, then that row of data can be put into the manual adjudication step again.

### Updating Data Sources & Canonicalization

Usually involves APIs or some form of joins and conditional stuff.