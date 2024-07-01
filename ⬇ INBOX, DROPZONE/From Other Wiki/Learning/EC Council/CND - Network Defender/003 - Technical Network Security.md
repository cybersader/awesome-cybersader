# Items Covered
- Priniciples
- AC Security
- IAM
- Crypto techniques and algorithms
- Network Segmentation
- Solutions and protocols
# Principles of AC
- Separate Duties
- need to know
- least privilege
# Access control
- bell-LaPadula Model - data confidentiality and controlled access
	- read down, write up
- Biba integrity model - opposite of Bell-LaPadula
	- high down to low integrity levels
	- no read down
	- no write up
	  Invocation axiom - subject at one level cannot invoke a subject at higher level of integrity

## DAC Model - Discretionary
- own, read, write, etc
	- per object and subject
- set by the owner of the object
## AC in Mobile and Distributed Environments
- Traditional - castle and moat model
- Zero Trust model 
	- never trust, always verify
	- validate entity
	- limit access and privileges
# IAM - Identity and Access Management
- IAM provides the right entity with the right access at the right time

- Architecture
	- IDM - identity management
		- make sure users have valid identity
		- identities are a collection of attributes on an entity
	- Identity Repo - Active Directory, etc.
	- AM - access management
		- authn, authz

- 2FA - way better, redundancy, can be easy to setup
- SSO - like a keyring
	- sign onto it once with 2FA, then get access to everything that you need

- Authentication
	- validation of the identity of an entity with a system, application, or network
	- Combinations of attributes related to you in some way 
		- Primarily, something you (know, have, are)
	- Types:
		- smart cards that hold PII
		- biometric

- Authorization -
	- Centralized vs Decentralized
		- Centralized - single authorization unit, single database, easy and inexpensive
		- Decentralized - each resources maintains own authz unit, tons of separate logical databases
	- Implicit vs Explicit
		- Implicit - can access requested resources on behalf of others
		- Explicit - authorization for each requested resource

- Digital signatures
	- ensures something hasn't changed
	- uses the private key of a sender, hash code of the message, and the signature function
		- The public key can decrypt that which has been encrypted by the private key
		- the hash code is encrypted using the private key, so an attacker can't make the signature (unless they have the private key)
		- recipients use the public key to decrypt the encrypted hash code, then compare it to the file/message they received by hashing it and comparing the codes
- PKI & PKC - public key infrastructure and cryptography
	- both of these rely on the security of certificate authorities and systems that securely distribute public keys
	- PKI
		- systems to create, manage, distribute, use, store, and revoke digital certificates
		- you need a third party that is trusted to hand these to entities
	- PKI Components:
		- CA - issues and verifies digital certificates
		- RA - registration authority, verifier for the CA
		- Certs and public keys are stored in CAs (databases in practice)

- Internet encryption
	- DSA - deprecated pretty much.  Has weaknesses
	- RSA - Rivest, Shamir, Adleman
		- De-facto standard, but ECC is better
		- Weak to future quantum computing based brute force attacks

- Hashing algorithms
	- MD5 has hash collisions
	- SHA 256 - standard

# Network Segmentation
- separate things into subnets, VLANs, etc.

## DMZ
- in between organization's LAN/private network and the public internet
- contains publicly exposed servers
- DMZ configs:

## IDS/IPS
- Snort, Suricata

## Cyber Deception
- Honeypots
- Honey Users

## Proxy Server
- Dedicated system between client and server
- Filters requests
- Web-based attack detection
## UTM - Unified Threat Management
- One pane of glass to manage all the protections

## IPsec
- a suite of protocols
- secure comms between networks or nodes even with tunneling
- Most VPNs use IPsec

