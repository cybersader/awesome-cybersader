# Cellular Security

### Terms

- 2G/GSM
    - Global System for Mobile Communications
- 4G/LTE - Long-Term Evolution
- 5G - fifth gen

### Readings

Wikipedia

- GSM
- COMP128
- 3GPP
- LTE
- 5G

# GSM

## GSM Security Objectives

- Concerns, Goals, Requirements
- Cellular companies have to pay a lot for frequency resources
    - nations make a lot of money to allocate frequencies to companies
- High profit - NOT DRIVEN by Security
- Security was not tied to the phone
- SIM Anatomy was central to the security
- COMP128 Algorithm
    - big part of 2G Security
    - had quite a few attacks

## GSM Overview

- Standards formed by 3GPP

![Untitled](Cellular%20Security/Untitled.png)

![Untitled](Cellular%20Security/Untitled%201.png)

![Untitled](Cellular%20Security/Untitled%202.png)

## GSM Security Concerns

- Operators
    - Bill correct people
    - Avoid fraud
    - Protect important services
- Customers
    - Privacy
    - Anonymity
    - Integrity of Traffic

## GSM Security Goals

- CIAR
- Strong Client AuthN
    - protect against billing fraud
- Cellular networks should not be able to compromise each other’s network
    - malicious competition

## GSM Design Requirements

- The security mechanism
    - MUST NOT
        - add overhead to mobile services
        - increase error rate
        - increase bandwidth of the channels
        - add expensive complexity
    - MUST
        - cost effective
    - Securit Procedures
        - Generation and distributing keys
        - Exchange info between operators
        - Confidentiality of algorithms

## GSM Architecture

![Untitled](Cellular%20Security/Untitled%203.png)

## GSM Security Features

- Key management separate from equipment
    - cell users can change phones by using the SIM card
        - security is separate from the hardware (MS - mobile station)
- Subscriber ID protection
    - not easy to get user of a system
- Detection of compromised equipment
- Subscriber authentication
- Signaling and user data protection

# Changes from GSM → 3G,LTE,5G

- Voice Data used to be separated from other data
    - not different from browsing data in 3G onward
    - in GSM the voice data is different from other data
    - MSC makes circuit connection to the receiver (dedicated connection).
- No circuit switching in today’s networks
    - we use logical tunnels or circuit switching by using 3 different protocols
        - Time division
        - frequency division
        - code division
            - CDMA
            - CDSS
    - VoIP uses UDP

## Security Features

### Subscriber Identity Protection

- TMSI - Temporary Mobile Subscriber Identity
    - Goals:
        - use this instead of IMSI (your id)
        - prevent eavesdropper from ID’ing the subscriber
    - Usage:
        - new tmsi when things happen

### Key Management Scheme

- Subscriber Authentication Key
    - 128 bit key
- ISP trusts SIM card and not the phone
- Shared key between subscriber and HLR (home location register)

### Detection of Compromised Equipment

- IMEI
    - independent of SIM
- Equipment ID Register
    - black, white listing of phones

### Authentication

- Session Keys, TMSI, IMSI
- Challenge Response Scheme
- A3 and A8 (algorithms) are used on SIM cards

![Untitled](Cellular%20Security/Untitled%204.png)

# LTE

## Changes from 3G & GSM

- GSM has BTS and BSC
- LTE uses a mesh network
    - E-UTRAN
- Core connect to IP network

## User Equipment

- UE - user equipment
    - mobile equipment - ME
        - cellular device
    - ME has ID → IMEI
    - IMSI → Subcriber ID
    - UICC - SIM card
        - runs SIM and USIM apps
        - can store personal info
            - contacts

## LTE Mesh Network (E-UTRAN)

- eNodeB - radio component of LTE
- E-UTRAN - mesh net of eNodeBs
- X2 Interface - connection between eNodeBs

## EPC - Evolved Packet Core

- MME - mobile management entity
    - storing user equipment UE contexts
    - creates temporary IDs
    - controls auth
- P-GW: packet data gateway
    - iteracts with the internet

## Security Architecture

- LTE defenses
    - SIM cards and UICC tokens
    - Device and network authentication
    - Air interface protection (Uu)
    - Backhaul and network protection (S1-MME, S1-U)
- 3GPP TS 33.401

### UICC Token

- stores:
    - pre-shared key
    - IMSI

## Auth

- 3GPP 33.401 - 6.1.1: EPS AKA is the authentication and key agreement procedure that shall be used over E-UTRAN.

## Threats to LTE

### System Vulnerabilities

- Commodity software and hardware may have quite of few vulns

### Renegotiation Attacks - Downgrade

- Rogue base station that forces users to downgrade to GSM or UMTS

### Attacks against secret key

- HSS (db), AUC (db), or UICC manufacturers need to protect their keys for the devices
- luckily these can easily be replaced

### DDoS and DoS

- These are difficult to do now with LTE or 5G
- Service providers are good at mitigating these

# Other

## Hacking SIM Cards

- sidechannel attacks
- looking at:
    - power
    - EMF
    - audio
    - timing
    - errors

## Challenge and Response

- MAC - message auth code (proof of who)
- New random must be used each time to defend against replay attack

![Untitled](Cellular%20Security/Untitled%205.png)

## QOS - Quality of Service

- During communication some communications will tag what quality of service they need to operate
    - Voice might need better than text
- QOS can bs used in a lot of settings - home, mobile networks, etc.
- QOS puts priority to certain communications