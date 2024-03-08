# User Priv & Roles

# SQL Server Privileges

## Privilege Levels (4)

1. System/server 
2. database
3. table (object)
4. column

## Privileges Per Level

- System/server
    - sysadmin - no limits
    - serveradmin
        - add members to serveradmin
        - execute stored procedures
        - shut down or restart server
    - setupadmin
        - add members to setupadmin
        - configure linked servers
    - securityadmin
        - add members
        - manage logons
        - manage create database permissions
        - read error logs
    - processadmin
        - add members
        - terminate a process
    - dbcreator
        - add members to dbcreator
        - manage db creation, deletion, or name changes
    - disk admin
        - add members to diskadmin
        - manage disk space and files
    - bulkadmin
        - add members
        - execute bulk insert DML statement
- Database
    - fixed database roles - collection of privileges
        - db_owner, db_accessadmin, securityadmin, etc.
    - statement permissions
        - create table, create view, etc
- Table (object)
- Column

## Granting/Revoking Privileges

- Grant {All | statement } to account
- Grant all to admins
- Grant create view, create tables to jsmith
- OR use Enterprise Manager
- Statement Permissions
    - CREATE (TABLE, VIEW, PROCEDURE, etc.)
- Revoke {All | statement [,...,n] } from account or
- role [,...n]
- Revoke all from public
- Revoke create view, create table from sam, jason

## Connected permissions

- Revoke select on employees from sam cascade
- Revoke select on employees from Debbie as sales Note: sales is a role
- Deny permission using the DENY statement
    - Deny take precedence over other permissions
- If someone try to execute a stored procedure in a denied group (despite the user being granted), then the user still won’t be able to perform the action
- Explicitly stating role when executing actions
    - If a role is only allowed to do something, then that role must be explicitly defined in the query
    - Revoke select on employees from Debbie as sales
- CASCADE option
    - Permissions also revoked from related permissions
        - If Sam gave select permissions to users and the permission to do that is revoked with cascade, then those users will lose it as well
    - Revoke {All | permission } on object from security_account [CASCADE] [as {group | role}]

## Hierarchy, inclusive, exclusive approach?

- 

## Column-Level

- Grant {All | permission } [(column,...)] on {table|view} to security_account [with grant option] [as {group | role}]
- EX:
    - Grant select on employees (firstname, lastname) to sam with grant option
    - Grant update on employees (firstname, lastname) to hrmanagers
    - Note: hrmanagers is a role
- Revoke {All | permission } [(column,...)] on {table|view} from security_account [CASCADE] [as {group | role}]

# User Roles

- Organizes permissions which are assigned to sets of users
- Cannot own tables or other objects

## Oracle Roles

### Create Role

- Create role rolename [not identified | identified {by password | using package | externally | globally} ]
    - Create role dev_role;
    - Grant create session to dev_role;
- Who can create roles?
    - DBadmin or anyone with the permission

### Assign, Grant, Revoke Roles

- Grant dev_role to dbsec;
- Alter user dbsec default role dev_role;
    - Revoke a role using REVOKE statement
- Revoke dev_role from dbsec;
    - Drop a role using DROP statement
- Drop role dev_role;
- You cannot drop if users are attached

## SQL Server Roles

- User-defined
    - Standard roles - permissions for users to DB objects
    - application roles - activated by application, password protected
- Fixed server roles
- Fixed DB roles

### Create Roles

- Create roles using SP_ADDROLE system- stored procedure
    - exec sp_addrole 'sales'

### Assign, Grant, Revoke Roles

- Add members to a role using SP_ADDROLEMEMBER stored procedure
    - exec sp_addrolemember 'sales', 'sam'
- Drop members from a role using SP_DROPROLEMEMBER stored procedure
    - exec sp_droprolemember 'sales', 'sam'
    - CAN’T DROP ROLE ITSELF
- Fixed Server Roles
    
    ![Untitled](User%20Priv%20&%20Roles%20c111c2ae0de542a18ca59c91598ca897/Untitled.png)
    
    - Cannot be modified
    - Add or drop members
        
        ![Untitled](User%20Priv%20&%20Roles%20c111c2ae0de542a18ca59c91598ca897/Untitled%201.png)
        
- Fixed Database Roles
    
    ![Untitled](User%20Priv%20&%20Roles%20c111c2ae0de542a18ca59c91598ca897/Untitled%202.png)
    
    ![Untitled](User%20Priv%20&%20Roles%20c111c2ae0de542a18ca59c91598ca897/Untitled%203.png)
    
- Public Database role
    - cannot be dropped
    - user automatically added to this
    - users can’t be dropped

# Best Practices

- log auths and changes, immutable backups, etc.

# DB Questions

- Both
    - Overlapping roles? Can a role include permission on top of another role like with a hierarchy?
- Inclusive and exclusive roles approach?
    - Can you make exceptions to role
    - REVOKE vs DENY
        - Are these stored in a table or need to be ran consistently?