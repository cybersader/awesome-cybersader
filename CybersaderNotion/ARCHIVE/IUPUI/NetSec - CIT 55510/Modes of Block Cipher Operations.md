# Modes of Block Cipher Operations

# Encrypting a Long Message

- Plaintext can be larger than the general block size for a block cipher
- Naive Approach - just keep adding zeros onto the end or some reserved character
    - “padding”

## CMS Padding

- Pad with the same value as the number of padding bytes
    - RFC 5652, PKCS#5, and RFC 1423 PEM
- Relies on pattern

## Bit Padding

- Pad with 0x80 (10000000) followed by zero (null) bytes.
    - ANSI X.923 and ISO/IEC9797-1
- Relies on reserved values

## ZeroLength Padding

- Pad with zeros except for the last byte which is equal to the number of padding bytes

# Modes of Operation

We need ways to continuously apply a block cipher with one key to a whole message securely.

## Modes

- ECB - Electronic Code Block
- CBC - Cipher Block Chaining
- OFB - k-Bit Output Feedback Mode
- CFB - k-Bit Cipher Feedback Mode
- CTR - Counter Mode

### Electronic Code Book

![Untitled](Modes%20of%20Block%20Cipher%20Operations/Untitled.png)

- Matching plaintext will be matching in ciphertext
- One wrong bit will break the plaintext message when it is decrypted
- NOT suitable for large files

### Cipher Block Chaining

![Untitled](Modes%20of%20Block%20Cipher%20Operations/Untitled%201.png)

- A bit slower
- can prove integrity of message
- adds confidentiality to large messages where same plaintext may appear in certain blocks
- Modifying the ciphertext will modify the plaintext
    - we need integrity checks
- File encryption

### Output Feedback Mode

![Untitled](Modes%20of%20Block%20Cipher%20Operations/Untitled%202.png)

- Block cipher is used to generate keystream
- CIA:
    - Confidentiality - block cipher
    - Integrity: First block affects next block
    - Availability: If all of the keystreams are computed beforehand, then you can decrypt/encrypt in parallel

Characteristics (CIA - related)

- Chaining dependencies
    - key stream is plaintext independent
    - pre-computing of pseudo-random stream can be done

### K-bit OFB Mode

![Untitled](Modes%20of%20Block%20Cipher%20Operations/Untitled%203.png)

- Same as OFB.  Except, we only use ‘k’ bits from IV + Key + Cipher Block Algorithm
- Instead of making a whole key stream, we only need k-bits and we add that onto the end of the IV

### Cipher Feedback Mode (CFB)

![Untitled](Modes%20of%20Block%20Cipher%20Operations/Untitled%204.png)

- Plaintext dependent
    - rest of plaintext is broke if one is broke
- Encryption:
    - CANNOT pre-compute
    - CANNOT be encrypted in parallel
    - Ciphertext blocks are dependent upon plaintext blocks
    - Error propagation:
        - one bit error affects the rest of the blocks
- Decryption:
    - CAN pre-compute
    - Allows for integrity

### K-bit Cipher Feedback Mode

- combo of k-bit and cipher feedback

![Untitled](Modes%20of%20Block%20Cipher%20Operations/Untitled%205.png)

### Counter Mode

![Untitled](Modes%20of%20Block%20Cipher%20Operations/Untitled%206.png)

- Transforms block cipher into stream cipher, but doesn’t rely on chaining
- Key Stream:
    - block cipher
    - key
    - CTR
        - CTR +1, CTR +2, etc.
- Balance between confidentiality, speed, and integrity
- Decryption can be done at any location