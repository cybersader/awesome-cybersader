# User Administration

---

---

# Why Documentation

- CYA - cover your ass / paper trail
- What to document:
    - policies for administration
    - security procedures, incident response
    - implementations - scripts or programs
    - roles

# OS-Based Auth for DB

- Consistent and centralized
- Less attack surface

# User Creation & Management in Oracle - SQL Queries

- Oracle
    - use CREATE USER
        
        ![Untitled](User%20Administration/Untitled.png)
        
    - IDENTIFIED - tells Oracle how to authenticate a user account
        - BY PASSWORD
        - EXTERNALLY
        - GLOBALLY
    - If you don’t specify default table spaces for DEFAULT and TEMP, then they are picked for you (SYSTEM,TEMP)
        
        ![Untitled](User%20Administration/Untitled%201.png)
        
    - Passwords and unlocking account
        
        ![Untitled](User%20Administration/Untitled%202.png)
        
    - View DBA users
        
        ![Untitled](User%20Administration/Untitled%203.png)
        

# External User Authentication in Oracle

- Example interfaces:
    - Active Directory with Windows Endpoints
    - Kerberos
    - LDAP
- Automating User Creation with Registry
    
    ![Untitled](User%20Administration/Untitled%204.png)
    
    ![Untitled](User%20Administration/Untitled%205.png)
    

# User Creation & Management in MS SQL

- Integrated with Windows
    - Associate local, domain, and group usernames with SP_GRANTLOGIN to allow MS SQL logins
    - Add logins under Enterprise Manager > Security Container
    - SP_ADDLOGIN - with default database
- SQL Server based
    - Security container > logins > new login > SQL server auth option
- SYSLOGINS vs SYSUSERS
    - SYSLOGINS - used for user auth
    - SYSUSERS - database access and permissions validation account, including users and roles

# Removing Users

- Removing Users
    - Backups first
    - Written requests for auditing
    - COMMANDS
        - DROP
        - CASCADE - when you want to delete things that the user owns too
- For SQL Server Windows Integrated Logins
    
    ![Untitled](User%20Administration/Untitled%206.png)
    

# Modifying Users

- For Oracle
    - ALTER USER
- Modifying Windows Integrated Login Attributes
    - CLI - SP_DEFAULTDB
- Enterprise Manager
    - Security Container
    - Login
    - Properties

## Oracle and SQL Defaults

- Oracle
    - SYS
    - SYSTEM
- M SQL
    - SA

## Database Links

- Can connect DBs for use with DML and SQL
- PUBLIC and PRIVATE types - public to all users, private per user

### SQL

- Public
    - CREATE PUBLIC DATABASE LINK remote USING ‘name’;
- Local and Private?
    
    ```sql
    CREATE DATABASE LINK local
    CONNECT TO hr IDENTIFIED BY password
    USING 'local';
    ```
    
- Remote and Private?
    
    ```sql
    CREATE DATABASE LINK remote.us.example.com
    CONNECT TO CURRENT_USER
    USING 'remote';
    ```