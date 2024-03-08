# Hashing, Number Theory, Public Key Crypto

# Goals of Cyber CIA

## Confidentiality & Source Authentication

- We need to ensure that the sender or receiver is the desired source or target for information

# Hashing

## How it Works

![Untitled](Hashing,%20Number%20Theory,%20Public%20Key%20Crypto%2012171b07eb714e939694493938dd6f07/Untitled.png)

It takes in numbers & generates numbers.

- Numbers can represent data

### ⭐Features

- One-way transformation of data
    - not like a two-way encryption and decryption function
    - no way to figure out original input
- The hash is much shorter than the original text
- Same output for the same input

### Input Data → [ hashing function / algorithm ] → hash, message digest, fingerprint

This is the basic process 

## Use Cases

- Can generate fingerprints for data

## Implementations

- MD5 - Message Digest
- SHA-1 - Secure Hashing Algorithm

## Hash Function Properties

- Performance - (easy to compute)
- One-way - ( computationally infeasible to find input )
- Weak Collision Resistance - ( Hard to find input that makes desired hash value )
- Strong Collision Resistance - ( Hard to find two inputs with the same hash value )

### Collision (Birthday Paradox)

- Chance of Collision
    - $possibilities!/(possibilites-k)!possibilities^k$
- Possibilities
    - factorial of the number of choices
- Number of hash values
    - $sqrt(2^m)$

## Hash Function Applications

### File Authentication

- Detects if file has changed by running the file data through a hash function to generate fingerprint
- The hash value needs to be readable and not able to be modified
    - store it separately from the original file

### User Authentication

- Use combination of random number and the shared key
    - Challenger: sends random number
    - Responder: uses random number and key to generate hash value
    - Challenger: uses random number and key to generate hash value, they check this value with the one from the responder
    - THIS ENSURE THE RESPONDER IS THE RIGHT PERSON

### Commitment Protocols

- Two systems need to choose numbers that combine to decide something
- A & B playing a game choose numbers
    - odd or even game:
        - if A + B numbers = even then A wins, else B wins
        - This can easily be cheated
    - Instead, they both use the hash value of the combined chosen data to generate a number
- Other Applications:
    - routing protocols
    - protocols for coordination

### Message Encryption

- One-Time Pad

## Message Auth Code

- MAC - cryptographic checksum
- Assumption: sender and receiver have a key
- MAC = MAC(K,M)
    - uses key and message

### Modes

- Mode 1 - just MAC, no encryption

![Untitled](Hashing,%20Number%20Theory,%20Public%20Key%20Crypto%2012171b07eb714e939694493938dd6f07/Untitled%201.png)

- Mode 2 - both MAC & encryption, but it must be decrypted to see MAC
    
    ![Untitled](Hashing,%20Number%20Theory,%20Public%20Key%20Crypto%2012171b07eb714e939694493938dd6f07/Untitled%202.png)
    
- Mode 3 - both MAC & encryption.  MAC can be used without decrypting

![Untitled](Hashing,%20Number%20Theory,%20Public%20Key%20Crypto%2012171b07eb714e939694493938dd6f07/Untitled%203.png)

## MAC Weaknesses

### Using previous MAC - Extension Attack on Weak Hash Functions

- For weaker hash functions, it is possible to use previous MACs [ Hash( Key || message || padding ) ] to generate new MACs [ Hash( Key || message || padding || new message || new padding ) ]

## Improving MAC Design

- H( Key || H( Key || Message ) )
- Essentially, we hash it twice
- Message is not input for the final message so extension attacks won’t work

### Modern

- Use key as a seed to the hashing algorithm to decide how to hash the file
- Attacker doesn’t know the key, so they won’t know how to hash even an extended version of the file

# Basic Number Theory

## Prime Numbers, Factorization, GCD (greatest common divisor)

- 91 = 7 * 13

### Hard to find GCD of large numbers

- really hard to factor and find the GCD of a large number

## Relatively Prime

- integers are pairwise relatively prime if the gcd of numbers = 1 for all i ≠ j

## Totient Function

PHI of n = number of positive integers less than n and relatively prime to n

- PHI(6) = 2
    - 2 relatively prime numbers < 6
        - 1 & 5
- they must also be DISTINCT or different prime numbers

## Euler’s Theorem

Basis for RSA cipher

# Public Key Cryptography

- The public key and private key have the same functions.  The only difference is who has each key.
    - Only you have the private key
    - Anyone who wants to send stuff to you has your public key or anyone who wants to verify that they’re communicating with you
    
    ![Untitled-2022-11-14-1842 (2).png](Hashing,%20Number%20Theory,%20Public%20Key%20Crypto%2012171b07eb714e939694493938dd6f07/Untitled-2022-11-14-1842_(2).png)
    

## Use Cases

- Digital Signatures
    - Encrypt with Private Key. Then anyone with Public can prove it’s you, because only the private key can encrypt in that direction

## Requirements

- Must be computationally
    - Easy to generate public/private key pair
    - Hard to determine the private key, given the public key
    - Easy to encrypt using the public key
    - Easy to decrypt using the private key
    - Hard to recover the plaintext message from just the ciphertext and the public key

# Diffie Hellman Key Exchange for Secret Key Crypto

This allows for a secure way for two parties to establish secret key communication in a public channel.

<aside>
‼️ THIS IS NOT for PUBLIC KEY CRYPTO…only for Secret Key Crypto

</aside>

![Untitled](Hashing,%20Number%20Theory,%20Public%20Key%20Crypto%2012171b07eb714e939694493938dd6f07/Untitled%204.png)

# RSA

![Untitled](Hashing,%20Number%20Theory,%20Public%20Key%20Crypto%2012171b07eb714e939694493938dd6f07/Untitled%205.png)

## Overview

- **The most popular public key method**
- **Basis: factorization of large numbers is hard**
- **Variable key length (1024 bits or greater)**
- **Variable plaintext block size**
    - plaintext block size must be smaller than key size
    - ciphertext block size is same as key size

## Attacks

### Brute-Force

- Try all possible private keys
    - really easy to mitigate this
        - longer keys
- mathematical attacks
    - still takes just as long as trying all keys, but it can be verified faster

### Other Attacks

- Probable message attack
    - encrypt all possible plaintext, then find a match with your ciphertext and one of the encrypted messages
        - this means you used the key
    - only works on small plaintext space
    - can be avoided by padding plaintext with random text