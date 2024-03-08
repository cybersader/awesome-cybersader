# NoSQL Overview

# Relational Database

## Keys

- Primary - main key to differentiate rows
- Foreign - Primary key of another table to reference another row for lookups

## Limits of RDBMS

- Hard to scale vertically on one server
    - you can add more servers to “horizonally” scale
- Horizontal scaling
    - Master/slave
        - All writes written to master
        - reads performed against replicated slave databases
        
        ![Untitled](LESSONS/Untitled%2031.png)
        
    - Sharding
        - allow read and write to each partition
        - Issues:
            - no joins capability!

# NoSQL

- non-relational
- no schema
- horizontal scaling
- key-value access

![Untitled](LESSONS/Untitled%2032.png)

- Disadvantages:
    - no roll back
    - no standard query language
    - not full support of relational features
    - limits on: joins, group by, order by operations
    - relaxed integrity and consistency

# ACID vs CAP Theorem

- ACID - relational dbs
    - atomicity - committing process for roll-backs
    - consistency - valid data is only written
    - isolation - one operation at a time
    - durability - once committed, it stays that way
- CAP - non-relational dbs
    - consistency - all data on clusters have same copies
    - availability - cluster always accept reads and writes
    - partition tolerance - even if a few partitions fail or have errors, the data can be fixed easily.  Not corrupted because of logic.

## CAP

- Consistency
    - ACID - strong
    - BASE (basically available soft-state eventual consistency) - weak
    - CAP is not guaranteed consistency - or at least immediate consistency

# NoSQL Categories

- Key-value
    - redis, DynamoDB
- Document-based
    - MongoDB, CouchDB
    - JSON is a document
- Column-based
    - BigTable, Hbase
- Graph-based
    - Neo4j