# Bluetooth Security

# Intro

## Cellular Network Security Concerns

- Operators
    - bills right people
    - avoid fraud
    - protect services
- Customers
    - privacy
    - anonymity

# WPAN

## What is it?

- Wireless Personal Area Network
    - short-range communications
    - eliminates need for wires
- Applications for WPAN technology include
    - syncronizing PDAs, cellular, and Smartphones
    - Home control systems (smarthome)
    - cordless telephones
    - headphones

![Untitled](Bluetooth%20Security/Untitled.png)

## Advantages

- Very little power
- Short range helps with security and privacy

## Security Weaknesses

### Bluetooth as a key (relay attack)

- Signals can be relayed to increase distance
- Signals can even be replicated across enormous distances by using wormholes to take the bluetooth key and relay it over the internet

## Standards

### IEEE (institute of electrical and electronics engineers)

- current development for  various WPAN standards

### OSI - Open Systems Interconnect

- ISO created OSI model
    - overcomplicated…honestly 😠
- Project 802
    - interoperability between different networking products

![Untitled](Bluetooth%20Security/Untitled%201.png)

![Untitled](Bluetooth%20Security/Untitled%202.png)

- the TCP/IP layers (transport and networking in the “dumb” OSI model) usually all use the same thing because everything is normalized in the LLC (logical link control) layer
- Different types of connections are funneled in and normalized from the PHY → MAC → LLC → TCP/IP layer

## WPAN History

- old computers had infrared ports for shortrange communication, then bluetooth became the actual practical standard
- RF WPANs became the standard
    - Bluetooh
    - Zigbee 802.15.4
- UWB - ultra wide band
    - dead because we found better solutions that don’t rely on wireless with low power and slow speeds

## Bluetooth (IEEE 802.15.1)

- Started by Bluetooth Special Interest Group (SIG) by Intel
- Protocol Family at multiple layers

![Untitled](Bluetooth%20Security/Untitled%203.png)

- Layers should not have knowledge of other layers
- Encapsulation and decapsulation

### Sniffing

- We need certain adapters so that we can get information from other layers
- This is wifi hacking requires adapters, because we can’t grab certain info from the transmissions without interfaces for certain layers

![Untitled](Bluetooth%20Security/Untitled%204.png)

- We can get 20m - 30m receiving with a larger antenna

### Frequency Hopping

- Bluetooth uses adaptive frequency ( Bluetooth 1.2) hopping to avoid 2 cases:
    - jamming or interference over a narrow bandwidth
    - interference from wifi devices

### Network topologies

- Piconet
    - more common
- Scatternet

### Piconet

- Active and parked communication between master and connected devices
- devices are preconfigured with MAC addresses
- member addresses are configured when devices start communicating with a master device

### Piconet connection

- Inquiry procedure
    - node discovery
- Paging procedure
    - actual connection being established

### Power consumption

- Depends on the mode (active vs. passive)
- Power saving modes:
    - Active
    - Sniff: listen to master at reduced rate
    - Hold: no data for some amount of time
    - Park: inactive unless M device commands to wake up.

### Bluetooth versions

- Use more advanced modulation
    - merged phase shift with frequency shift
- using ECDH for security
- tons of other improvements all the way to 5.3

### Bluetooth Object Exchange (OBEX)

- Avoids TCP/IP completely
- Transmit files from phone to phone
- size limit
- binary objects

## Bluetooth Security

### Aspects

- AuthZ, AuthN
- Confidentiality

### SAFER+

- weaker than AES
- SAFER - secure and fast encryption routine
    - block cipher
- Modes
    - Non-secure mode
    - Service level enforced security
    - link-level enforced security mode
    - service level enforced security mode
- Features
    - lvl 4: Authenticated link key using Secure Connections required
    - lvl 3: authenticated link key required
    - lvl 2: Unauthenticated link key required
    - lvl 1: No security required
    - lvl 0: No security required

### Authentication

- Challenge and Response Authentication Protocol (CHAP)
- Link keys and random numbers are used during the process

### Encryption Modes

- 1 no encryption
- 2 link keys used
- 3 all traffic is encrypted

### Device Security Levels

- Trusted Device - link key already stored for that device. device marked as trusted
- Untrusted Device - device has been previously authenticated. device not marked as trusted
- Unknown Device - no security info for the device

### Bluetooth Keys

- more keys than wireless
- protect master key like other protocols

### Secure Simple Pairing

- uses ECDH - elliptic curve diffie helman
- user compares numbers on both devices to ensure no MITM
- HOW DO WE GET SECURITY?:
    - timing
    - NFC - you have to get the devices very close
    - passkey
    - voice confirmation on both devices

### Security Threats

- Disclosure - leaking info
- Integrity - MITM changing information
- DOS - easy to deny service especially with certain modes or levels of security

### Bluetooth Attacks

- Bluesnarfing - gets IMEI
- Bluejacking - no harm to device, but useful for social engineering and harassment
- MITM & Eavesdropping
-