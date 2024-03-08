# OS Security Fundamentals

---

---

# The Why

- The OS and the kernel bridge software with storage hardware. Therefore, securing the OS is essential to securing stored data

# Outline

- What is OS for really?
- OS environment from DB perspective
- Components of OS security
- Auth methods in OS
- User admin best practices
- Strong passwords
- OS vulnerabilities
- Security risks of email

# OS Overview

## Why have an OS?

- All abstractions
    - We need a way to efficiently interact with hardware and utilize it via programs and code.
- A way to operate hardware
    - We operate hardware in lots of ways but usually to run programs or use browser applications combined with networking functionality (surfing the web)

## Functions of OS

- Efficient Parallel & Concurrent Computation for Tasks
    - Usually concurrent and not parallel
    - How hardware handles concurrency -
        - The CPU automatically handles lists of processes with complex algorithm
    - How applications handle concurrency -
        - Applications can have instructions that explicitly execute parallel instructions
- Hardware Management
- Program Interactions
    - Controls how programs/processes/jobs can interact with hardware and directly or indirectly with other programs

## OS Security Environment

- Physical Security of the hardware
- Three access points or components of hardware that can interface with DB:
    - Services: Entry points for the other two
        - Network services, file mgmt, web services, apps, LOL Bins, etc.
    - Memory
    - Files

## Services

- OS core utilities
    - Used as another abstraction to interact with hardware with general tasks - user auth, remote access, admin stuff, handling of policies

## Files

- Permissions
    - RWX/read write execute on files
    - User-focused vs Group vs Device, etc.
- Network-based sharing (various protocols)

## File Transfer

- FTP
    - Bad security
    - Adopt secure SFTP/FTPS with TLS
    - Be careful with ACL and directories
    - Use limited accounts
    - Log FTP activities
- SMB
- rsync
    - Uses SSH.  Used with NAS devices often

## File Sharing Protocols

- P2P
    - Risky for most networks since there aren’t application-based or 3rd party protections that watch them
    - DLP can be an issue since some of these protocols and their app-level data aren’t logged
- Others:
    - Torrenting protocols
        - BitTorrent
    - HTTP/HTTPS
    - WebDAV
    - Wireless
        - Wifi
        - Bluetooth
        - NFC
    - WebRTC
    - Tor
    - AS2
    - SCP

## Memory

- Managed by OS
- Can be corrupted by other programs
- Lots of programs interact with it, and data can be solely held there for short times.

# AuthN & AuthZ

## Authentication Methods

- What you know, what you are, what you have, what  you can do, etc.
- Certificates
    - Usually made with someone’s private key - verified with a public key
- Hardware security with cards
    - All sorts of portable authentication methods that use different tech and protocols.
- Kerberos
    - Kerberoasting - exploit bad Kerb configs and weak encryption
        - RC4 related to TGS (ticket granting service)
        - Bad passwords
        - Too many privileges
        - Kerberos requires that SPNs be associated with at least one service logon account
    - Central auth service
    - User 2 server, Server 2 user, Servers themselves don’t need to maintain auth information
- LDAP
    - Centralized directory database stores:
        - users, passwords, internal telephone directory, keys
    - Great for reading, but not writing
    - Exploitation:
        - enumeration
- PKI
    - User keeps a private key
    - Authentication firm (CA) holds public key
    - Encrypt and decrypt with pairs
- SSH
    - ECDH - good way to establish keys with Diffie-Hellman over insecure medium while having authentication (verifying each other’s identity)

## Authorization

- Granular permissions for authenticated users on a logical system

# User Administration

- Use and establish a framework or standard for things such as:
    - configuration
    - permissions
    - password policy
    - internal firewall
- Endpoint Hardening

# OS Vulns

- Windows
    - Exchange
    - IIS
    - IE
    - WMI leveraging
    - Outlook
    - SNMP
- Unix
    - RPC
    - Apache Web Server configs
    - Account setup
    - SSL

# Email Security

- Lock down the email server