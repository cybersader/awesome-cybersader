# DHT Pres 3

# Intro

- What’s the core purpose of the DHT design being looked at
    - Theseus DHT protocol (related to file sharing)
    - Based on p2p used by bittorrent
- ML-DHT (main line DHT)

# Censorship Attacks

- Most effective way to stop people from using it is to “eclipse” keys by generating keys close to it
    - Control nodes close to a given key
    - Very ephemeral network
- in ML-DHT nodes are supposed to randomly select node IDs
    - helps uniform ID distribution with IP in calculation
- Attacker can churn random node_ids and use function of their IP
- Botnets can take up a lot
- 1e+10 IDs possible for full IPv4
- IPFS
    - 2nd gen of ML DHT…essentially
    - node_ids are hashes of public keys
    - Can still attack by churning keys till close to chosen CID (equivalent to infohash for ML-DHT)

# Criticisms of Theseus

- Theseus is based on ML-DHT, but sacrifices benefits for security
- anachronistic - doesn’t encourage adoption
- Kademlia…eh
- Tradeoffs:
    - TCP is unreliable, sheds routing tables, and is hard for low-power devices
- The solution is to probably use a password hashing function:
    - hard to parallelize - force them to run it serially
    - Can be tuned in other ways
- Most of these systems are essentially TOFU (trust on first use) — there are some issues or caveats if there is a passive observer of MITM who watches the first exchanges of ephemeral and static keys
    - distributed all use the TOFU trust model