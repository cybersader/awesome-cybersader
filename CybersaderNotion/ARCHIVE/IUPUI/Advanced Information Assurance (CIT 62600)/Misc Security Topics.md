# Misc Security Topics

---

---

# Identity-based Encryption (IBE), Attribute-based Encryption (ABE), Attribute-based Access Control

- Involves public information like email address
    - Email address can be used to do encryption
    - Derives key from email address
    - Encrypting based on identity or attributes?

## Shamir from RSA and IBE

- Identity-based signature scheme
- Based on Weil pairing
- IBE got extended to ABE

# Zero-Knowledge Proof

- Proof you know something without disclosing what you know
- Prove you have a key without showing it
- Ali baba and the 40 thieves
    - Show that you know the cave really well without revealing where the actual treasure is hidden
- They can sometimes operate off or probability and statistics to prove that someone likely knows something
- Some popular use cases:
    - e-voting with ZKP
- Sharing proof of key in public without disclosing it.  Establish trust for future communication or other commitments
- Interactive and non-interactive
- Anonymous, but verifiable
    - Anonymouse e voting
        - Commitment scheme that is anonymous and yet verifiable
- Private Exchange & Settlement of Digital Assets

# Commitment Schemes

- Ways for 2 parties to commit and not be able to back out once the process is started
- Non repudiation
- Properties of commitment
    - Hiding
        - No one can see committed information ahead of time
        - Protect privacy of committed data
    - Binding
        - Sender cannot reveal 2 values in stage two
- Broken commitment examples
    - Sending key in stage 1
        - Stage 1: sender uses key and sends encrypted message
        - Stage 2: sender sends key so that receiver can decrypt
        - Problem:
            - not totally binding - there can be collisions or issues if a fake key or wrong key is used
    - Hashing
        - Stage 1: send hash of value
        - Stage 2: announce values, then confirm by hashing
        - Collisions or guessing the hash in stage 1
- Hashing to commit
    - Stage 1: send hash of value
    - Stage 2: announce values, then confirm by hashing
    - Sometimes good if a good hashing algorithm is used
    - Great if the range of possible values is HUGE, TERRIBLE if the range is small
- Types of hiding
    - Unconditional hiding
        - Commitment phase does not leak ANY info about message.  Perfect secrecy in theory
    - Computation hiding
        - Good for limited computation
- Types of binding
    - Unconditional binding
        - after commitment, infinite computational power adversary sender cannot reveal two different values
        - perfect secrecy
    - Computational binding
        - Limited computation power cannot reveal two different values
- Some better hashing based schemes
    - Salting
        - Stage 1: Send hashed message
        - Stage 2: Send message and salt, then verify
        - Problems:
            - They can guess the salt
            - Person can choose an instance where two different salts have different results - with high computation likely
- Realistic commitment scheme with small range of possible values???
    - Trusted 3rd party?
- Other commitment schemes:
    - Pederson Commitment Scheme
        
        ![Untitled](Misc%20Security%20Topics/Untitled.png)
        
        ![Untitled](Misc%20Security%20Topics/Untitled%201.png)
        
        - Additive homomorphic
        - Really hard to find values to fake
        - Impossible to find other values before hand
        - You can use committed messages for zero knowledge proofs
            - interactive

# Blind Signature

- A message is “blinded”, then sent to a signer for signature.  Signer doesn’t know blinded message content
- The author of blinded message can get the signature by removing the disguise/blind
- Use cases:
    - signer and author are different parties - e-voting and digital cash
    - You can sign a message without knowing what the message is
    - Electronic voting
        - authentication authorities have to authenticate users - users register to them; doesn’t know the actual vote
        - sending authority - sends votes for authenticated users
- Different way of using public and private keys

# Secret Sharing

- Everybody has to agree to share or reveal encrypted or hidden information
- How to operate with multiple people in a way that each piece has equally no information
- think of having two correct points recovers the original line (secret)
- Shamir’s secret sharing
    - uses polynomials instead of simple straight lines
    - You can even use tuples to give certain pieces more importance - Example: president can launch the missile or 3 generals

# Secure Multi-Party Computation

- Jointly compute shared data without revealing the data
- Primary SMPC methods:
    - Garbled circuit
        - Encrypts parts of conditional logic.  You can see the result, but the inputs are hidden
        - They can lose a certain degree of functionality for other use cases, but work well for very specific situations of computation and privacy
        - Can be used for secure multi-party boolean logic
    - OT
    - Homomorphic Encryption

# STPM

- Secure two party multiplication
- Can be done yet again with a public and private key combo

# Oblivious Transfer

- Client can request certain information from server, but the server doesn’t know what it transfers
- 1-2 OT by Even, Goldreich, and Lempel
- k out of n oblivious transfer

# Secure Digital Provenance/Blockchain

- Prove someone did something and prove tampering if it happens
- Methods:
    - Blockchain
    - Hash chaining
- Hashes
    - collision resistant
- Good thing about blockchain is that it’s distributed and requires work for an identity to influence the network
- Digital provenance
    - generated metadata that proves if someone did something to data.  Guarantees integrity
    - The metadata still has to be secured

# Moving Target Defense

- Constantly changing systems to make recon and exploitation hard
- Form of cyber deception.  Relies on attacker’s lack of knowledge
- 

# Millionaire’s Problem - Trapdoor Hash Functions

- Two millionaires want to find out who is richer without revealing their wealth.
- Trapdoor functions And a hash function
    - easy one way…hard the other way to compute
    - Alice and Bob apply trapdoor to their wealth values, which hides the real values
    - Exchange transformed values then compare using some protocols
- How are comparisons made?
    - Using conditionals and hashes???
    - Conditionals which rely on hash comparisons.

# Quantum Cryptography

- Shor’s algorithm
    - uses quantum fourier transform and other assumptions and euclids algorithm to get the keys
- SNDL - store now decrypt later
- We need perfect quantum bits
    - IBM has gotten up to 80, but we likely need millions
- Algorithms that aren’t safe
    - ECC, RSA
- Algorithms that are post-quantum and strong against attacks and quantum resistant
    - [NIST Announces First Four Quantum-Resistant Cryptographic Algorithms | NIST](https://www.nist.gov/news-events/news/2022/07/nist-announces-first-four-quantum-resistant-cryptographic-algorithms)
        - general encryption - CRYSTALS-Kyber
        - digital signatures - CRYSTALS-Dilithium, FALCON, and SPHINCS+
- Quantum computing features:
    - Insane parallelism because of superposition
    - Measurement is complicated, but can be done with certain assumptions
- Quantum Cryptography
    - You can generate keys that involves superpositions rather than known bits.
    - Examples: BB84 algorithm
    - The physical properties of quantum computing make it so that you can know when a quantum key or information has been eavesdropped?
    - Parts of the cryptography are conducted through “classic” channels
- Quantum Computing Hardware?
    - Quantum Information is very different
    - Processor?
    - Storage?

# Privacy and anonymity

- Privacy vs Security
    - the ends are the same (conflicting interests), but the means are different.
    - Privacy has repudiation and deniability - provenance
        - Accounts for use of PII or information about an entity for conflicting interests against the entity
    - Security - peace of mind
        - Accounts for exploitation of systems for conflicting interests with entities which morally/ethically/legally control the system.
- 

# Deep Learning and Security

- .