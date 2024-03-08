# Looking at Efficacy of Distributed Hash Table Protocols - Project

- Bailey

# How - The Project

- 7
    - active 2017-2020

# Presentations

[DHT Pres 1](Looking%20at%20Efficacy%20of%20Distributed%20Hash%20Table%20Prot/DHT%20Pres%201.md)

[DHT Pres 2](Looking%20at%20Efficacy%20of%20Distributed%20Hash%20Table%20Prot/DHT%20Pres%202.md)

[DHT Pres 3 ](Looking%20at%20Efficacy%20of%20Distributed%20Hash%20Table%20Prot/DHT%20Pres%203.md)

# Overview

- Theseus is replacement or supplement to bittorrents ml dht
- Crypto puzzles to join network with tcp instead of udp and additional protocols and handshakes
- E2e encryption and protocol obfuscation by hashing ecc public key
- Main goal is to stop Sybil attacks

- Elligator protocol
    - Obscure implementations
    - Makes packet string look random in Wireshark…hidd protocols
    - Went back to go with kademlia in Golang
- Tried in rust but only some libs with ecc and quic
    - No good dht
- Go-kademlia
    - Largest Dht network prolly
    - Test suite and network simulator included
- Theseus in go-kad
    - 160 bit keys
    - Use IP instead of multi addrs
    - RPC - supposed to use Bencode (like JSON) instead of protobuf
- Simulator
    - [Localhost](http://Localhost) - xor of self and self is 0
    - Binary tree of nodes
    - 

- Distance only affects content transmission
- Worst case they could be far away
- E2E encrypted but where is trust established or could attackers or spys corrupt
- As the network scales, issues??
- Threat model is Sybil attacks and anonymity doesn't change between past implementations?
- Crypto puzzles and caveats to those? -