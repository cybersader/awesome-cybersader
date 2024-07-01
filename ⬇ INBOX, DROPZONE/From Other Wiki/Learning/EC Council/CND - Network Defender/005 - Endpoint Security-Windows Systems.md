# Windows OS History
- PC
	- Now it's NT Kernel based
- Server
	- LANman - LAN manager
	- NT Server came up at some point
	- Windows Server 2003 to 2019
# Windows OS Arch
- Layers
	- **User Mode**
		- limited access via APIs to resources
		- Integral sub systems connects to environment subsystems via security
	- **Kernel Mode**
		- unrestricted access to system memory and external I/O devices
		- Executive services interface with various managers and monitors to the object manager and then down to...
		- Kernel mode drivers, microkernel down to...
		- HAL - hardware abstraction layer
	- Hardware

## Windows Security Components
- ![|500](__attachments/CND%20-%20Network%20Defender/IMG-005%20-%20Endpoint%20Security-Windows%20Systems-2024063021.png)
### Security Reference Monitor (SRM)
- controls user access to objects
- kernel component w/unrestricted level of access
- logs security events throughout system for auditing
- %SystemRoot%\\System32\\Ntoskrnel.exe
### Local Security Authority Subsystem (LSASS)
- user-mode process \\Windows\System32\Lsass.exe
- implements local sec policies for privs granted to users, groups, etc
- key component of logon process
- \\HKLM\\SECURITY registry
### Security Account Manager (SAM)
- manages the db containing user names and groups on local machine
- loaded into LSASS process
- Stores NTLM v2 hashes
- Syskey can be used to secure the SAM file
### Active Directory (AD)
- Windows OS directory service to manage permissions and access to networked resources for Windows domain networks
- AD is hierarchical
- AD stores data as objects such as user group application or device
- Kerberos used with AD instead of SAM
- IAM 
### Authentication Packages
- DLLs that run in context of the LSSAS process 
### Cred Providers (CPs)
- in-process COM objects that run in the LogonUI process
- CPs extract username and password, or biometric data
### NetLogon
- user-mode running process and is responsible for authing users and services within a domain
- DLL used for ad logons
### Kernel Security Device Driver (KSecDD)
- kernel-mode library of functions used by kernel-mode sec for ALPC (advanced local procedure calls) and used to communicate with LSASS in user mode
- logon and credential information processing
# Windows Security Features
- windows isn't the least secured...just the most hacked
- pwn2own - windows is supposed to be really locked down
## Windows Object Protection
[Win obj from Sysinternals](https://learn.microsoft.com/en-us/sysinternals/)

- object can be code, program, files, etc.
- separate function in Windows because of object oriented programming
- Protect the kernel-level objects and isolate user-level objects
- Windows Kernel Object Manager manages securable objects

objects:
- files/dirs on NTFS file systems
- named or anonymous pipes 
- processes/threads
- file mapping objs
- access tokens
- windows mgmt objs
- reg keys
- windows services
- local or remote printer
- network shares
- interprocess sync objs
	- LAN or WAN even
- job objs
- dir service objs
	- AD stuff
## Windows Access Checks
- decision to allow or deny subject (user/process) to access a securable object comparing the info in token w/access control entities
- kernel objects attached to a process which describes security context
### SIDs
- unique value of variable length to ID a security principal or security group
## Windows Integrity Control (WIC) and Mandatory (MIC)
- gives integrity levels to securable objects and what principles relate to the object
- SACL stores SIDs representing integrity levels
- [Use ProcExp to view processes and integrity lvls](https://learn.microsoft.com/en-us/sysinternals/)
## Virtual Service Account
- enhance isolation and access control
- services run under its own account having its own security ID
- name of account is "NT SERVICE\\" with pws that are changed automatically in Windows
- service account management
## Secure File Sharing
- Powershell commands can be used to set permissions on folders for sharing with Smb
## Security Auditing
- audit lots of events
- put this into a SIEM or analysis and threat detection system
## Windows Security Baseline Configurations
- endpoint hardening 
# User Account and PW Mgmt
- admin
- standard
- only read and write, no install and app changes

- pw - heard it enough
# Windows Patch Management
- Use a test network
# Limiting Tools
## Prevent Unauthorized Changes to the System
- use "user account control"
## Disable Anonymouse Security IDs Enumeration
- Do not allow anonymous enumeration of SAM accounts and shares
## Acces to Certain Tools
- Control panel
	- GUI for changing registry keys
- Command prompt
## JEA (just enough admin)
- limit amount of cmdlets or admin privs for account
## Registry
- Stores configurations for apps and systems of OS
- PowerShell can be used to edit keys
# Windows AD Best Practice
## Domain AD Groups
- Clean up backup accounts
## Local Admin Password Solution (LAPS)
- manage local admin passwords
- creates a password for each admin account and stores them in AD
- LAPS helps secure SAM file hashes from hackers
## Disable NTLM
- Disable NTLM and enable Kerberos instead
## AD Best Practice
- Use LAPS
- Implement RDP Restricted Admin mode
- Remove unsupported OSes
- Monitor scheduled tasks on sensitive systems like domain controllers
- Ensure that OOB management passwords (DSRM) are changed regularly and securely stored
- Use SMB v2/v3+
- Default domain Admin and KRBTGT should be changed annually
- SID filtering as is appropriate
- Audit NTLM use
- Block internet access for DCs, servers, and admin systems
- Disable NetBIOS over TCPIP and turn off multicast name resolution (LLMNR)

- No user accounts in admin groups
- Add admins to "Protected Users" group
- admin accounts should be somewhat ephemeral and have a system for temporary access

- Segment networks
- IDS
- network device and OOB mgmt on separate network

- Protect Service Account Creds
	- Group managed service accounts
	- FGPP DFL (domain functional level) level where AD objects are limited to 
	- no interactive logon
- protect hosts
	- patch quickly
	- deploy security back-port patch
		- you can back port some features to older server versions
	- set reg key to 0
	- Wdigest registry key
	- whitelisting apps on hosts
	- EMET - workstation application sandboxing technology
- protect DCs
# Windows Network Services & Protocol Security
- Secure PowerShell Remoting Endpoints
- Disable PSv2
- Allow only signed scripts
	- you can make it so only scripts signed by certain users in your org to be able to run
- Set PS Language Mode
	- set to something like "ConstrainedLanguageMode"
	- use AppLocker or Device Guard using UMCI
- PS Remoting
	- transcription logigng
	- lock down those accounts
	- script block logging
	- cert infra enabled for the domain
	- HTTP port disable for PS with SSL use
	- Limit firewall ports
## Secure RDP
- port 3389
- firewalls
- limit users
- Prefer remote credential guard
## DNSSEC
- adds security to domain names with digital signatures to DNS info
- DNSSEC-based lookups can't be tricked without a matching signature
## Disable SMB 1.0
- Use latest version
