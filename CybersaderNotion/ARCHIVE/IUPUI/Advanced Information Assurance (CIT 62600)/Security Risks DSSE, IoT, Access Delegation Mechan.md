# Security Risks: DSSE, IoT, Access Delegation Mechanism, and Centralized Access Control Mechanism

# Introduction to Survey Paper

- Secret Key Compromise
    - Solution - Searchable Encryption with key-Update (SEKU)
        - non-interactice key updates
    - Post compromise security even if client secret key is compromised

# DSSE - Dynamic Searchable Symmetric Encryption

- Kinda like MFA, redundancy?
- Forward secrecy - even if they get the key, they can’t decrypt the data
- SEKU allows for updating keys for clients and easily making past ones invalid?
    - A bit of redundancy by having two keys

- Questions:
    - So this is a way to search a DB without seeing the data and bamboo is better because it makes it easier all around, easier for clients, and slightly harder for the server
    - You can search internal data
-