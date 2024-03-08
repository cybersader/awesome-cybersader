# VPN over Wireless: PPTP, L2TP, IPSec, SSL and HTTPS

# VPNs?

- MITM mitigation
- Uses
    - Connection between networks
    - Remote Access
        - Tunneling protocol
            - Dial-up to local ISP - hard to do.  outdated.
    - extend to another LAN

## VPN Architecture

### Required Components

- User authentication
- address MGMT
- kay MGMT
- data encryption
- multiprotocol support

## Hardware

- Firewalls and routers can be configured or made better to support VPNs
- AES-NI makes the CPU better for VPN encryption

## VPN Types

1. Hardware
    1. highest throughput
    2. plug and play
    3. dual-purpose
2. Firewall
    1. Harden the Operating System
    2. Tri-purpose
    3. Cost-effective
3. Software
    1. Lack of efficiency
    2. Ideal for 2 endpoint not in same org
    3. Great when combined with other firewalls

## Authentication Servers

- RADIUS server
- Kerberos
- TACACS+
- LDAP

### RADIUS

- Authenticate certain users to Wi-Fi
- High-volume

### Kerberos

- Ticketing system for time-sensitive services (timestamps) and sessions for services
- Cons
    - Malicious KS can silently eavesdrop in any communication
    - The Kerberos server can become a single point of failure

### TACACS+

- Industry Control Applications

### LDAP & AD

- Active Directory
    - uses LDAP versions, MS’s version of Kerberos, and DNS
    - Works with all OS (the important ones)
- X.500 - overly complicated
    - not widely used
- LDAP
    - builds DB that is stored on machines in network
    - DIT - tree structure to keep track of users and applications

## Layer 2 VPNs

### L2TP/IPSEC

- Used with IPSec
- Layer 2 Tunneling protocol
- IPSec encapsulates L2TP

## SSL/TLS

- developed by Netscape
    - built browser structure
- SSL/TLS
    - uses certs for identification
    - Private key used to prove identity
    - SSL server provides encryption keys
- Designed for HTTP and the Web
- Pre computation can be used to break Diffie Hellman in TLS

## HTTPS

- Really secure
- zero-days and smart attackers
- Only forged certs or stealing keys certs in browsers

# Wireless MAC

- Tons of collisions with wireless devices, so we need a media access control protocol
- 2 types of coordination:
    - contention-free vs contention
    - sender-initiated vs receiver-initiated

![Untitled](VPN%20over%20Wireless%20PPTP,%20L2TP,%20IPSec,%20SSL%20and%20HTTPS%2018431dfe61d640708cac3c7777f2b4b2/Untitled.png)

- It is easy to avoid collision on wires, because it is easily detected.
- It is hard to detect collisions with wireless APs
- CSMA is used to avoid collisions
- RTS and CTS
    - request to send
    - clear to send