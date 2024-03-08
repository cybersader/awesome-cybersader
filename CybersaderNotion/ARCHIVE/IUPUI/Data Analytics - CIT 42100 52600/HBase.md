# HBase

# Overview

- HBase is a BigTable clone
- distributed, column-oriented database build atop HDFS

# Benefits then RDBMS

- No primary keys
- Automatic partitioning
- Scale linearly and automatically with new nodes
- Commodity hardware
- Fault tolerance
- Batch processing

# HBase Data Model

![Untitled](LESSONS/Untitled%2033.png)

![Untitled](LESSONS/Untitled%2034.png)

# HBase Use Cases

- Random inconsistent read and writes
- Fast operation on large datasets
- Access-patterns are simple
    - no huge complex join cases

# HBase Commands

- `hbase shell`
- `create ‘table name’, ‘column 1’, ‘column 2’`
- `alter ‘t1’, NAME⇒’f3’`
- `describe ‘t1’`
- `disable ‘t1’`  - before altering
- `alter ‘t1’, NAME⇒’f3’, METHOD=’delete’`
- `drop ‘t1’`

### Data Manipulation

- `create ‘emp’, ‘personal data’`
- `put ‘emp’,’1’,’personal data:name’,’nancy’`
- `put ‘emp’, ‘2’, ‘personaldata:name’,’erik’`
- `get ‘emp’, ‘1’`
- `delete ‘emp’, ‘1’, ‘personaldataLdept’`
- `deleteall ‘emp’,’1’`