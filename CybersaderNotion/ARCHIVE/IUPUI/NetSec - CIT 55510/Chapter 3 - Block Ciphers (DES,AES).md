# Chapter 3 - Block Ciphers (DES,AES)

# Stream Ciphers

- bit by bit or byte by byte
- Key stream as long as the plaintext
- two parties have to generate a long random keystream every time

# The Problem to Solve

- Can we avoid generating long keystreams

## Block Cipher Idea

- Encrypt the plaintext block-by-block
- Every block is the same size
- Each block is mapped Plaintext ↔ Ciphertext
- The mapping is the cipher.  These mappings are given by the key
- one-to-one mapping

# Block Ciphers

![Untitled](Chapter%203%20-%20Block%20Ciphers%20(DES,AES)%205b4d5ea4d1494daa96a918be8c1ba807/Untitled.png)

![Untitled](Chapter%203%20-%20Block%20Ciphers%20(DES,AES)%205b4d5ea4d1494daa96a918be8c1ba807/Untitled%201.png)

## Generic Block Cipher Overview

- Block ciphers have transformations that are complex
- Converts one plaintext block to a ciphertext block one-to-one mapping

### Problems

- One-to-one mapping can allow for brute force depending on the block size.  The key space is not large enough
    - Codebook attack

### Solution

- Use a long block

### Why this is different from One-Time Pad

![Untitled](Chapter%203%20-%20Block%20Ciphers%20(DES,AES)%205b4d5ea4d1494daa96a918be8c1ba807/Untitled%202.png)

- bit spreading
    - not using XOR - instead it uses a map

### Block Cipher Operations

- substitution
    - substituting plaintext message
        - mapping table
            
            ![Untitled](Chapter%203%20-%20Block%20Ciphers%20(DES,AES)%205b4d5ea4d1494daa96a918be8c1ba807/Untitled%203.png)
            
- permutation
    - Which position each bit is placed

![Untitled](Chapter%203%20-%20Block%20Ciphers%20(DES,AES)%205b4d5ea4d1494daa96a918be8c1ba807/Untitled%204.png)

### Cipher Operation Processes

- Never use consecutive substitution of permutation
    - Makes the mapping more complex

## Feistel Block Ciphers

Sub-class of block ciphers

### Goals in the algorithm

- Confusion
    - complex substitution algorithm
    - make relationship between ciphertext and the key
- Diffusion
    - hide relationship between ciphertext and the plaintext
    - many-to-one and one-to-many with plaintext-to-ciphertext or vice versa

### Alternation

Alternate confusion and diffusion steps

### Cipher Structure

- Split 64 bits into 2 32 bit halves (L & R)
- L = L XOR F(R)
    - F is the algorithm
- Repeat this 16 times
- Merge L & R into the 64-bit output block
- **Keys are also changed every round with IV (initialization vector)**
    - Based on incrementing values

### DES - Data Encryption Standard

- Similiar to Feistel structure
- Key:
    - 64 bit quantity= 56 bit + 8 parity bits (for detecting errors)
    - 64 bit input, 64 bit output
- DES Structure:
    
    ![Untitled](Chapter%203%20-%20Block%20Ciphers%20(DES,AES)%205b4d5ea4d1494daa96a918be8c1ba807/Untitled%205.png)
    
    ![Untitled](Chapter%203%20-%20Block%20Ciphers%20(DES,AES)%205b4d5ea4d1494daa96a918be8c1ba807/Untitled%206.png)
    
- How are round keys generated?
    - Circular left shift the key
        - Operates like a modulus operation
- Bit Expansion
    - 32 bits is increased to 48 bits during the function
        - half of the bits are duplicated because they are copied to 2 positions
- Decryption
    - exactly the same
    - similar to the Feistel cipher
- Small changes in either the key or the plaintext cause huge changes
    - can’t compare the resulting change to original really
    - no pattern
- Criticisms
    - key is too short - only 56 bits
- Triple DES
    - Does improve DES by alternating with two keys
    - P → E (k1) → C1 → D (k2) → C2 → E (k1) → C3

### AES - Advanced Encryption Standard

![Untitled](Chapter%203%20-%20Block%20Ciphers%20(DES,AES)%205b4d5ea4d1494daa96a918be8c1ba807/Untitled%207.png)

![Untitled](Chapter%203%20-%20Block%20Ciphers%20(DES,AES)%205b4d5ea4d1494daa96a918be8c1ba807/Untitled%208.png)

- A replacement for DES
    - DES weaknesses:
        - runs slow in software
        - has theoretical attacks
        - exhaustive key search attacks
    - AES strengths:
        - fast
        - super strong
        - larger blocks
- Single AES Round
    - Round key