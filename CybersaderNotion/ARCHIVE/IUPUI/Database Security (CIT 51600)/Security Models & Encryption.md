# Security Models & Encryption

# Database Application Security Models

## Applications

- Apps solve problems
- How are apps related to dbs?
    - Applications usually access the db more than direct users
    - Application user - within application schema to be used for authn to the app

## Types of Users

- App admin - can manage other app users
- app owner - owns app tables and objects
- Proxy user - account to work on behalf of application user
    - Service accounts? -
- Virtual user -

## Security Models/Objects Used to Track Access

- Simple Access Matrix
    - Subject & Object for explaining their access
- Access Modes Model
    - Uses objects and subjects
    - Take-grant model
    - Static and dynamic access modes
    - Levels of access
        - Static - actions on objects
            - use (call), read, update, create, delete
        - Dynamic - managing static access modes of others
            - grant, revoke, delegate, abrogate

## Models for Running Applications on Hardware

- Mainframe application - everything runs on one un-networked device - has local interface for interactions
- Client/Server Applications - personal computing made this popular
- Web applications - still client server, but adds conveniency layer for navigating public web servers utilizing DNS

## Application Security Models

- Models:
    - DB role based
    - App role based
    - App function based
    - App roles and function based
    - App table based

### DB Role Based

![Untitled](Security%20Models%20&%20Encryption%208fbf6a0a971e4ee0b4a5cac371951fe1/Untitled.png)

- App auth app users
- Each user has role, roles have privs
- A proxy user is needed to activate roles, all roles assigned to proxy user
    - takes actions for application users
- DB roles implementation in Oracle:
    - 3 types of users -
        - app owners, proxy users, and application users
    
    ![Untitled](Security%20Models%20&%20Encryption%208fbf6a0a971e4ee0b4a5cac371951fe1/Untitled%201.png)
    
    ![Untitled](Security%20Models%20&%20Encryption%208fbf6a0a971e4ee0b4a5cac371951fe1/Untitled%202.png)
    
    ![Untitled](Security%20Models%20&%20Encryption%208fbf6a0a971e4ee0b4a5cac371951fe1/Untitled%203.png)
    
- Implementation in SQL Server
    - Use application roles
        - has password, cannot contain members
    - Connect user to an application role: supersedes user privs
    - Use stored procedures
        
        ![Untitled](Security%20Models%20&%20Encryption%208fbf6a0a971e4ee0b4a5cac371951fe1/Untitled%204.png)
        

### App Role Based

![Untitled](Security%20Models%20&%20Encryption%208fbf6a0a971e4ee0b4a5cac371951fe1/Untitled%205.png)

### App Function Based

![Untitled](Security%20Models%20&%20Encryption%208fbf6a0a971e4ee0b4a5cac371951fe1/Untitled%206.png)

- IAM is handled from the application side
- Application has access to all the application related table

### App Roles and Function Based

![Untitled](Security%20Models%20&%20Encryption%208fbf6a0a971e4ee0b4a5cac371951fe1/Untitled%207.png)

- hybrid of roles and function
- flexible
- Roles assigned to functions and users

### App table based

- depends on app to auth users
- app provides privileges to the user based on tables; not on a role or a function

# Questions

- proxy user
    - why?
    - same as service accounts?
    - help with logging or auditing?
- In general, do the models have different use cases?
    - inputs or cost effectiveness
    - work needed to use them
    - relatedness to size of application or system
    - easiest one to uphold standards or be consistent