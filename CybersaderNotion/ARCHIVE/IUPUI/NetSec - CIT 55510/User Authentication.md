# User Authentication

# Authentication

- Verifying claims of a subject
- Confirm identity

## Methods for Authentication

Something subjects or entities -

1. Have - Key, Cars, USB token
2. Know - Password
3. Are - Biometrics, Voice, Face, Behavior
4. Location - attribution, email-address, IP, geolocation

## Process in Network Security

Reliably verify information related to a subject or entity.

### Examples

User Authentication:

- Proof to a system, app, or device

Message Authentication:

- Verify that a message hasn’t been altered without authorization
- Verify the source of the message

## Access Control

Enables authorization via. authentication

# Passwords

## Storing Passwords

- Storing in plaintext is bad, so we store the hashes of them which are given via. the user from the client side.

## Password Salting

![Untitled](User%20Authentication/Untitled.png)

- Store a random number along with the password hash for each user
- Combine the random number and the incoming password to generate the hash

![Untitled](User%20Authentication/Untitled%201.png)

## Future Proof Mitigation for Password Attacks

- Disposable Passwords that are used only once
- Cons:
    - you need a long password list
    - likely these are stored in another system and then the security of all of those is reliant on some other form of authentication

# One-Way Hash Chain

- Used for various network security applications

![Untitled](User%20Authentication/Untitled%202.png)

## Hash vs Blockchain

A hash chain is similar to a [blockchain](https://en.wikipedia.org/wiki/Blockchain), as they both utilize a [cryptographic hash function](https://en.wikipedia.org/wiki/Cryptographic_hash_function) for creating a link between two nodes. However, a blockchain (as used by [Bitcoin](https://en.wikipedia.org/wiki/Bitcoin) and related systems) is generally intended to support distributed consensus around a public ledger (data), and incorporates a set of rules for encapsulation of data and associated data permissions.

## Using the Hash Chain

![Untitled](User%20Authentication/Untitled%203.png)

1. Parties Exchange:
    1.  the Hash Function, 
    2. Kn (the first hash to be used), 
    3. the number of times to hash - gives them some number of total keys (right to left in image)
2. Synchronize to use the next hash (starting with K0) (because K1+ cannot be found from K0)
    1. Use time to  synchronize
    2. Use some additional authenticated server to authenticate

## Problems to Solve with Hash Chaining

- Synchronization can be complex and needs a connection and additional programming to work properly
    - If there is some accepted method to use a synchronized variable, like time, then maybe it’s possible to have an easy solution

## Authentication Example

![Untitled](User%20Authentication/Untitled%204.png)

## Hash Chaining Weakness

- Man in the Middle Attack
- Assume the Fake server can trick Alice into thinking they are the real server at first or somehow intercept the communication

![Untitled](User%20Authentication/Untitled%205.png)

# Authentication for Large Networks

- Hard to scale

## Trusted Key Servers

- Use a trusted server for key management across users in a network
- Shared keys with the KDC (key distribution center)
- Multiple KDCs are needed for larger topologies
    - This usually requires synchronization of keys too

## Trusted Intermediary for PKC - CAs

- Required to ensure the integrity of the public keys in PKC
- Certification Authorities
    - A secure authority that authenticates users and stores their public keys
    - trusted intermediary in Public Key Infrastructure
    - CRL - cert revocation lists
        - need to be delivered timely
        - hard problem with CAs
- Multiple CAs
    - CAs issue certs to each other

# Kerberos Authentication

## KDC-based Trusted Intermediaries

- The KDC handles the keys

## Authentication Problem

- Open distributed environment where users at workstations want to access different services on a local institutional network
- Access control to services for authenticated users

## Can we rely on workstation for authentication service?

- 3 threats:
    - Attackers can easily emulate an additional user on compromised workstation
    - An attacker may mimic an authenticated workstation IP to get to services
    - An attacker may eavesdrop and replay exchanges to get into a services or disrupt operations

## Authentication with Kerberos

- PKC is used
- Stateless
    - Doesn’t maintain information about authenticated users
- Centralized:
    - auths users to servers & servers to users

## Kerberos Requirements

- Secure
    - Impersonation information should not be easily obtainable
- Reliable
    - High availability
    - Distributed Server Architecture
- Transparent
    - User shouldn’t know that authentication is taking place
- Scalable
    - System should be capable of supporting large numbers of clients and servers

## Kerberos Protocol

### Simple Authentication Protocol

- Use Authentication Server (AS)
- Client Request:
    - ID of client
    - client password
    - ID of the service
- AS uses a ticket to authenticate the user to a server:
- Weaknesses:
    - Password every time
    - Plaintext password
    - Ticket can be replayed to the server

### TGS - Ticket Granting Server

- Protocol
    - client gets ticket granting ticket (TGT) from authentication server (AS)
    - client uses (TGT) with (TGS) ticket granting server to access a service
- Weakness:
    - Components in tickets
        - no auth of valid ownership of ticket
        - replay attack
    - Why do we have them?
        - no server authentication