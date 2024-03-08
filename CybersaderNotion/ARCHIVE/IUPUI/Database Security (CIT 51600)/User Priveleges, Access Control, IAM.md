# User Priveleges, Access Control, IAM

# Profile Basics

- Profile
    - Concept that encompasses resources per entity
    - Defines DB user behaviors
    - Additional way to track users from Oracle interfaces
- Relevant Profile Components
    - Password - age, usage, verification
    - Resources - hardware utilization

## Creating a profile in Oracle

### CREATE PROFILE Options

```sql
CREATE PROFILE

Options:
– Session_per_user: max number of concurrent open sessions per
user
– CPU_per_session: max number in hundredths of seconds of CPU
time allowed per session (duration of session)
– CPU_per_call: max number in hundredths of seconds of CPU time
allowed per call (duration of statement call)
– Connection_time: max number of minutes a user connection is
allowed
– Idle_time: max number of minutes of idle time before user gets
disconnected
– Logical_reads_per_session: max number of DB blocks allowed
to be read per session
– Private_SGA: Specify the amount of private space a session can
allocate in the shared pool of the system global area (SGA)
```

## Managing User Profiles

- Query dictionary view DBA_PROFILES
    
    ```sql
    Select * from DBA_PROFILES where PROFILE
    like ‘.....’;
    ```
    
- Altering user options
    
    ```sql
    • ALTER PROFILE: modifies a limit for a profile
    
    alter profile cho4_prof
    limit
    cpu_per_call 500
    
    • ALTER USER: assigns a profile to a user
    
    alter user HR
    profile cho4_prof
    ```
    
- 

## Profiles in M SQL (there are none)

- Resource Governor manages workloads and resource consumption

# Setting PW Policies

- Oracle
    - Statement
    
    ```sql
    create profile pwd_policy
    limit
    failed_login_attempts 3
    password_life_time 180
    password_reuse_time default
    password_reuse_max 3;
    ```
    
    - Options
        
        ```sql
        Options:
        – FAILED_LOGIN_ATTEMPTS: max number of tries before the
        account is locked
        – PASSWORD_LIFES_TIME: number of days before the account
        is expired or aged out
        – PASSWORD_REUSE_TIME: number of days before the
        password can be reused
        – PASSWORD_REUSE_MAX: number of times the password
        can be reused
        – PASSWORD_LOCK_TIME: number of days an account is
        locked due to failed log in
        – PASSWORD_GRACE_TIME: number of days ahead of
        expiration the user is warned
        – PASSWORD_VERIFY_FUNCTION: customized function to
        validate the complexity of the password
        ```
        
- M SQL
    - No profiles in M SQL, so just enforce AD GP password policies.

# Privileges in Oracle

- System privilege
    - admin actions, CREATE TABLE, CREATE SES
- Object privilege
    - permissions on db objects - SELECT, INSERT, UPDATE, DELETE

## Granting System Priv

- never use ALL privilege
- Who can grant?
    - Only by DB admin
    - Some other users with admin priv

**Grant create any table to dbsec with admin option**

## Revoking System Priv

**Revoke create any table from dbsec**

## Priv

Check table “DBA_SYS_PRI”?

## Oracle object priv

- Granting object priv
    
    ![Untitled](User%20Priveleges,%20Access%20Control,%20IAM%20de2d4c6f89c8474295ec3575ca37b436/Untitled.png)
    
- Revoking
    
    ![Untitled](User%20Priveleges,%20Access%20Control,%20IAM%20de2d4c6f89c8474295ec3575ca37b436/Untitled%201.png)