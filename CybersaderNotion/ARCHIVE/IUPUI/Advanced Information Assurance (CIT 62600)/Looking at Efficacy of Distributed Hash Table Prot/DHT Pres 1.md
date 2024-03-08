# DHT Pres 1

## Theseus and Terminology (File Sharing Related)

- DHT - distributed hash table
- BitTorrent - file protocol, p2p
- Peer/Node - users in network
- Overlay network - logical routing based on something other than IP

## Naive Solution to Connect People and Share Files

- Tracker - centralized search engine mapping files to who has them

## Something Better?

- Peers somehow do tracking themselves
- Lots of issues with security though - collusion and adversarial activity

# Distributed System

## General Considerations

- Unreliable peers - home PCs
    - Joining and leaving needs to be cheap
- Peers are numerous and span large areas
- BAR Fault model
    - Byzantine
    - Altruistic
    - Rational

## Distributing the hash tables

- unreliable peers  - means they need deterministic self healing routing structure
    - Kademlia - common routing for this
- hash tables track hashes
    - everyone compares hashes to know what people have

## Attacks

- Imitate someone to deny other people access (poisoning with bad files)
- Imitate alice to catch bob (Dos, harass)
- Oscar can attack tracker
- ID and drop exchanges if you have power over the network
- Sybil - join multiple times and express byzantine behavior

## Theseus Threat Model

- Get around weak and strong censorship
- Get around sybil attacks

## Stopping Sybil

- crypto puzzles - to join network
    - hashcash - generate hashes with some number of leading zeros
        - originally for combatting email spam
        - S/Kademlia - brings idea to node_id generation in 2008
        - Bitcoin uses crypto puzzles for consensus, not network entry
    - Use password hash function
        - increases cost for sybil to join network past what is cost effective
- Indistinguishability
    - What is this? -
        - Noise protocol - handshake patterns that look like everything else
    - Hides p2p traffic when under TCP
    - p2p traffic is characteristic enough to auto detect and deny
    - most DHTs use UDP for efficiency

## Theseus Obscurity

- elligator scheme to hide when key exchange is happening
- bloom filters - search queries without revealing search domain.

# QA

- key value store with key being hash of data
- How are files shared is a realistic situation?
    - How do you find files from other people?  Know them in real life?
        - Download client and start looking for files…
    - This in on top of BitTorrent or could be?
    - Introduced to network by downloading client
        - Find request to look for data, hops around the tree looking for matching hash
        - Is the find request related to BitTorrent?
- How does this battle censorship
    - Detecting file exchanges and dropping connections
    - Looking for traffic that isn’t visible at a certain layer with certain printable characters - drop those connections
        -