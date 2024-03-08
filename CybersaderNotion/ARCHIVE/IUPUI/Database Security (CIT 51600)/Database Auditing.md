# Database Auditing

# Terms

- Auditing
    - Making sure everything is being done correctly based on some models or standards
        - the “everything” includes - systems, data, documents, processes, etc.
- Audit log
    - Chronological activities
- Auditor
    - person authorized to audit by some entity
- Audit trail
    - change records, change management, version history, and any system activities that are applicable to some standard

# QA vs Audits vs Performance Monitoring

- QA
    - bug free, up to specifications
- Audits
    - during operation
    - complies with standards, policies, laws, etc.
- Performance Monitoring
    - during development
    - testing for operation

# Audits

## Cost-Benefit of Audits

- Benefits:
    - makes org less liable during an incident
    - helps improve operation and resilience
    - better controls
- Side effects:
    - performance drops
    - disruption of operations
    - friction between departments

## Auditing Models for DBs

- Apps usually have “audit” logs or audit settings in their configuration
- Have states of objects over time and especially during changes

## Simple Auditing Model

- Chronological activities in db

# Auditing in Oracle

- Stored PL/SQL executed to store audit logs whenever actions are taken by entities
- Audit Triggers
    - INSERT, UPDATE, DELETE

# Ideal Audit Log Analysis Architecture

- Databases and Storage/Indexing
    - Ingest with Cribl or another ETL
    - Store in InfluxDB or SIEM
    - Duplicate in a graph DB
        - memgraph
        - neo4j
        - surrealdb
        - arangoDB

# Oracle Fine Grained Auditing

- You can make audits or essentially alerts that use policies which are part of a view
- You can use an user other than SYSTEM or SYS to create tables, sequences, or triggers.
- Simple auditing
    - flag users, tables, columns for auditing
    - SIMPLER
- Oracle has 6 DML events