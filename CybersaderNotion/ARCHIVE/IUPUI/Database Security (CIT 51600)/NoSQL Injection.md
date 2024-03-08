# NoSQL Injection

# NoSQL

- Great for horizontal scaling and distributed environments
- No fixed schema
- Types of NoSQL:
    - key-value Redis, Memcached
    - Document-Based CouchDB, MongoDB, OrientDB
    - Column-Based BigTable Cassandra
    - Graph-based neo4j, InfoGrid, Infinite Graph, Flock DB

## Operators (lots)

- $eq, ne, gt, gte, lt, lte, nin
- AND, NOT, OR, NOR

## SQL vs NoSQL

- SQL - structured and relational with fixed schema
- NoSQL - flexible schema, large volumes of unstructured data

# NoSQL Injection

- untrusted data is used to construct queries

## Top 5 Risks

- Bypass authn
- Unauthorized data access
- Data Manipulation
- Denial of Service
- Account Hijacking

# Fun Takeaways

- You can use regex operators to solve passwords for accounts from the password input
- You can ReDoS with regex operators
    - not infinite loops, but exponential with the input potentially