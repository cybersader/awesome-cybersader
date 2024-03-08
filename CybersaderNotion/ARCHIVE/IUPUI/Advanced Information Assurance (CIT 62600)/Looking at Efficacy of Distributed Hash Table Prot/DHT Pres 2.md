# DHT Pres 2

# Summary of Work

- Synchronous messages over UDP with QUIC

# Why Theseus TCP Only

- DHKE is complex without message order (or ACKs)
- Author says NAT traversal or hole-punching is desired but requires more research

# What is QUIC

- On top of UDP for Google to make HTTPS faster
- gQUIC uses simple DHKE
- QUIC RFC 9000 uses TLS 1.3

## Prior work for QUIC in p2p?

- Protocol Labs proponent of QUIC
    - P2p networks don’t have central trusted authority
    - Self signed TLS certs with extensions

## nQUIC

- variant  replaces TLS with Noise framework handshakes

## TCP vs QUIC

- TCP in kernel of OS
- QUIC is in userspace - application
- QUIC with NAT traversal enables more people to use network
- Hard to match performance of kernelspace TCP in userspace
- 

# Q&A

-