# Key Distribution & Agreement

# Establishing a Key

- Key Transport
- Key Agreement

## Long-Term & Session Key

- Session key
    - temporary
- Long-Term Key
    - public and private keys

# Kerberos

![Untitled](Key%20Distribution%20&%20Agreement%20a81c0638271e493fbd3e83ea8bb1ab83/Untitled.png)

Network authentication protocol.

- Symmetric cryptography

## Trusted 3rd Parties

- Authentication Server
- Ticket Granting Server

# Public Key Infrastructure (Public Key Distribution)

## Why Public Key Crypto is Vulnerable to MITM

- You can use the public key to spoof BOB

![Untitled](Key%20Distribution%20&%20Agreement%20a81c0638271e493fbd3e83ea8bb1ab83/Untitled%201.png)

## Use PKI (Public Key Infrastructure)

![Untitled](Key%20Distribution%20&%20Agreement%20a81c0638271e493fbd3e83ea8bb1ab83/Untitled%202.png)

## Digital Signatures & PKI

![Untitled](Key%20Distribution%20&%20Agreement%20a81c0638271e493fbd3e83ea8bb1ab83/Untitled%203.png)

![Untitled](Key%20Distribution%20&%20Agreement%20a81c0638271e493fbd3e83ea8bb1ab83/Untitled%204.png)

# IEEE 802.11 Auth & Key Management

## Key Hierarchy

![Untitled](Key%20Distribution%20&%20Agreement%20a81c0638271e493fbd3e83ea8bb1ab83/Untitled%205.png)

- The lowest level keys are used during wifi communication and authentication

## 4 way handshake

- We build multiple levels of keys to be used with different types of communication
- The group keys are used for broadcast transmissions
- The pairwise keys are used for one-to-one communication

## Process

![Untitled](Key%20Distribution%20&%20Agreement%20a81c0638271e493fbd3e83ea8bb1ab83/Untitled%206.png)

- The key is distributed before hand or through another key distribution or key management process
- 4 way handshake:
    - Both AP & Station know the **PMK**
    1. AP → Station
        1. PMK & random # (Anonce)
        2. Station makes PTK using Anonce and SNonce
    2. Station → AP
        1. Snonce and MIC
        2. AP derives PTK using Anonce and Snonce
        3. Send GTK to station
    3. AP → Station
        1. encrypted GTK
        2. Station decrypts and installs GTK
    4. Station → AP
        1. send MIC - message integrity check