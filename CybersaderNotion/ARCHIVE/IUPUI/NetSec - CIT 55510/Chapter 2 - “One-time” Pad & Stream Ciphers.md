# Chapter 2 - “One-time” Pad & Stream Ciphers

# One-Time Pad

If the key-to-plaintext ratio is 1 or more, then theoretically the cipher is secure.

## Key Characteristics

- uniformly psuedo-random key
- as long or more than plaintext
- 1920s
- ciphertext space = keyspace
- knowing the ciphertext shouldn’t affect the security of the cipher

## Basic Ideas Again

- Ciphertext shouldn’t reveal anything about plaintext
- Length is the only thing that can learned

## Probability Distribution

- What is the chance that the ciphertext is some specific letter in plaintext
    - a uniform distribution means a secure algorithm

## Validating an attack

- an attacker needs to be able to validate an attack
- The plaintext must be something that is discernible between random characters

## Perfect Secrecy

- Keys are uniformly chosen.  Number of keys P→C is the same as # of keys C→P
- One-time pad has perfect secrecy

## Two-Time Pad?…NO 😅

- You can guess the difference between two plaintexts
- More information about the plaintexts
- Long key is bad for key management

## Problems with One-Time Pad

- Key cannot be reused
- If you have a secure channel for giving the key away, then using it before every message is silly…just use the channel

## One-Time Pad Uses

- One-Time Pad is for when you will send one message to a person later

# Key Management

- If you have a secure channel, why not use the secure channel

## Detecting Key Leakage in Quantum

- **Quatum Cryptography** makes it possible to detect key leakage

## Binary XOR

Different is 1.  Same is 0.

Any logical operation that doesn’t have collisions.

# Stream Cipher

- modern encryption
- makes key size small
- random seed that generates something that looks random
- the string that encrypts the data is typically unbounded
- THE SEED / KEY SIZE IS SORT OF LIKE HALF OF THE KEY

## Encryption & Decryption

- Decryption
    - The receiver must know:
        - the seed
        - the pseudo random number generator
        - the ciphertext
    - The receiver still has to generate the pseudo random number generator then do XOR again

## The Problems

- It might take a while to generate the number

## Knowledge to Encrypt/Decrypt

- The pseudo random number generating algorithm
- The seed
- The seed size
- The ciphertext

## Pseudo Random Number Generator

- Expand a short random seed into a long string that “looks random.”
- Still same problems as with One-Time Pad if you see two ciphertexts from same key

# Modern Ciphers (Stream Ciphers)

## RC4 Stream Cipher

- Owned by RSA
- Public in 1994
- Widely used (web SSL/TLS, wireless WEP)
- Not completely secure PRNG
- Key size: 40-256 bits

## Pseudo-Random Number Generator

- Can be used as a session key
- The same seed always gives the same key
- The next bit must be hard to predict if the attacker got part of the key stream
- You cannot be able to recover the key simply by knowing the output sequence

## Security of Stream Cipher

- Depends on the PRNG (pseudo random number generator)
    - XOR operation is secure

### Type of Attacks

- Attacker knows plaintext and ciphertext
    - they can infer the key stream, but not the key seed

### Secrecy of Stream Cipher

- No - key not perfectly random

## Practical Problems of the Stream Cipher

- Not secure if the key stream is used more than once
    - Using the first two ciphertexts, you can generate the third ciphertext to plaintext
        
        ![Untitled](Chapter%202%20-%20%E2%80%9COne-time%E2%80%9D%20Pad%20&%20Stream%20Ciphers%2031e04c2ff61d4d34b228833801c01b5b/Untitled.png)
        
- You would have to share a new keystream every time

### Using Stream Ciphers in Practice

- Solutions:
    - make a cipher stateful (keep a state) in terms of the sessions
        - each new communication is incremented
    - **Use initial vectors**

## Initial Vectors

- Append an IV to the seed

![Untitled](Chapter%202%20-%20%E2%80%9COne-time%E2%80%9D%20Pad%20&%20Stream%20Ciphers%2031e04c2ff61d4d34b228833801c01b5b/Untitled%201.png)

### Sharing the IV

- The IV is sent over with the ciphertext

![Untitled](Chapter%202%20-%20%E2%80%9COne-time%E2%80%9D%20Pad%20&%20Stream%20Ciphers%2031e04c2ff61d4d34b228833801c01b5b/Untitled%202.png)

### Problems with IV

- If the length of the IV compared to length of the key is not done right, there can be weaknesses in the seed+IV implementation
- The IV needs to be long so that it doesn’t get repeated

## WEP Protocol

- RC4 Algorithm
- Problems:
    - IV wasn’t very long
        - IV would repeat because it only had a small number of bits associated with it

![Untitled](Chapter%202%20-%20%E2%80%9COne-time%E2%80%9D%20Pad%20&%20Stream%20Ciphers%2031e04c2ff61d4d34b228833801c01b5b/Untitled%203.png)

![Untitled](Chapter%202%20-%20%E2%80%9COne-time%E2%80%9D%20Pad%20&%20Stream%20Ciphers%2031e04c2ff61d4d34b228833801c01b5b/Untitled%204.png)

- CRC - for checking if the file has been altered
    - hashing algorithm probably

### Problems with WEP

- Based on RC4 protocol
- RC4 IV has some problems