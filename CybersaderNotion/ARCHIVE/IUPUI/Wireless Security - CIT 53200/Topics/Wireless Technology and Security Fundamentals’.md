# Wireless Technology and Security
Fundamentals’

# Basics

- Data is technically EMF - light, radio, IR, etc.
- Using morse code requires time syncronization

# Visible Light Wireless Comms

- used to be used with fire
- easily interfered with
- Involves some complicated signal processing
- Rooms have to be setup in a specific way
    - temperatures
    - sunlight
- Its strength is the fact that you can limit it
    - short wavelength is its STRENGTH

# Radio

- most effective
- longer wavelength means it goes through stuff
- Nonmetallic objects
- Ferriday Cage for important devices

# Types of Data Signals

- Digital
    - Square wave
    - modern
- Analog
    - older
    - intensity/amplitude defines the information
        - this is what is processed
    - EX: video, audio

# Devices and Signals

- Modem
    - converts the distinct digital signals from a computer
    - Phones have wifi modems
- Modulation
    - Process of encoding the digital signals onto an analog wave

# Modulation Process

- Play with characteristics of the signal
    - frequency
    - cycle
    - carrier signal
        - continuous wave of constant amplitude and constant frequency
        - Other characteristics changed around these base values

# Transmission Speed

- usually bits per second since analog and digital relate to YES/NO
- Baud Rate
    - number of signal units per second that are required to represent the bits transmitted
- Baud is a change in the carrier signal
- Transmission is 3 times Baud rate
- This tells you how many signal changes are required to represent a piece of data
- Phones can support 1024 QAM
    - at least 1024 different choices
    - each transmission (signal unit) carries 10 bits of data
- Bandwidth
    - transmission capacity
    - range of frequency that can be transmitted by a system at one time

# Analog Modulation

- Types
    - amplitude
    - frequency
    - phase
- Carrier signals are always analog signal
- Radio uses digital modulation now

## Amplitude Modulation

- AM radio

![Untitled](Wireless%20Technology%20and%20Security%20Fundamentals%E2%80%99/Untitled.png)

## Frequency Modulation

- Changing the frequency

![Untitled](Wireless%20Technology%20and%20Security%20Fundamentals%E2%80%99/Untitled%201.png)

# Interference

- AM is way more susceptible to interference because amplitude is more easily affected
- FM gives higher bandwidth and is less susceptible to interference

## Phase Modulation

- very useful for digital modulation, but not for analog

# Digital Modulation

- Encode a digital YES/NO signal onto an analog wave
    - transmitting over radio from a cell phone
    - FM radios
- Signal Unit
    - breaks up a signal into pieces so that you can have data
- Advantages for computers
    - Better use of bandwidth
    - less power
    - better with interference
    - ERROR CORRECTION

## Problems to solve w/digital modulation

- What is the signal unit
- How do you sync up the signal with time

## Types of Digital Modulation

- Amplitude Shift Keying (ASK)
    - Height represents 1 or 0
- Frequency Shift Keying (FSK)
    - change frequency of the carrier signal
    - more wave cycles need to represent 1 bit
- Phase Shift Keying (PSK)
    - Quadrature Amplitude Modulation (QAM)
        - combination of amplitude and phase shift
            
            ![Untitled](Wireless%20Technology%20and%20Security%20Fundamentals%E2%80%99/Untitled%202.png)
            

## Binary Signals

- High voltage 1, Low voltage 0
- Return to Zero
    
    ![Untitled](Wireless%20Technology%20and%20Security%20Fundamentals%E2%80%99/Untitled%203.png)
    
    - Clock sync info in that little space
- Non-Return to Zero
    - doesn’t carry self sync data
- Polar Non-Return to Zero
    - Polar NRZ
        
        ![Untitled](Wireless%20Technology%20and%20Security%20Fundamentals%E2%80%99/Untitled%204.png)
        
- Polar NRZ invert on ones
    - can help with clock syncing
    - complicated

# Spread Spectrum

![Untitled](Wireless%20Technology%20and%20Security%20Fundamentals%E2%80%99/Untitled%205.png)

- Jamming
    - easier on smaller channels like the Narrow band transmission

## Frequency Hopping Spread Spectrum (FHSS)

![Untitled](Wireless%20Technology%20and%20Security%20Fundamentals%E2%80%99/Untitled%206.png)

- sender and receiver agree to jump across channels over time since they are synced
- If you lose a frequency then you only lose a portion of your data
- used with Bluetooth and other Wi-Fi systems

## Direct Sequence Spread Spectrum

![Untitled](Wireless%20Technology%20and%20Security%20Fundamentals%E2%80%99/Untitled%207.png)

- Turns 1 bit of data into 11
- used with satellite communication

## REVIEW

- Bitrate vs Baud Rate
    - both related to transmission speed
    - baud - signal units per second
    - both can be exactly the same if the signal unit is only 1 bit of data
    - differences between the rates usually in number?
        - 2^4=16 choices if you have 4 choices per signal unit
        - bits per second is twice the baud rate because the signal unit is in bits
- Digital vs Analog modulation
    - the original signal is digital (bits)
    - the modulated signal is analog in a carrier wave

# Basic Cryptography (In relation to Wireless)

## Goals of Cryptography

- ensure security of communication over an insecure medium

## What makes something secure?

**Confidentiality** - who sees it - secrecy

**Integrity** - is it what it is supposed to be - authenticity

**Availibility** - can we get it

**Non-repudiation**

## Steganography

- depends on the secrecy of the method and not some sort of key

## Cryptography

- Method is not hidden, but the key to decrpyting is hidden

## Key and Algorithms

### Keys

- Key space - number of possible keys
- Key size (key data) - how easy is it to communicate the key over some channel
- Language / lexicon

### Algorithms

- Knowledge of algorithm
- How does key expand to encrypt the data?
    - almost always the key size will matter in how secure the data is
- Does guessing the key size (one letter vs a full word) affect the security of it?
- Patterns noticeable by human or by computer?
- Number of keys?
- Size of lexicon?

## One-Time Pad

- Random string that is at least as long as the plaintext message
- Random - because there will be no patterns with the encryption
- Doubles the amount of data being transferred
- Very useful with physical data like a book

### Quantum Cryptography

- any leaks can be detected
- these use just one-time pads

### Using it for future security

- Use it while in a secure channel to exchange the key, then exchange the ciphertext later on

# Stream Cipher

- modern encryption
- makes key size small
- random seed that generates something that looks random
- the string that encrypts the data is typically unbounded
- THE SEED / KEY SIZE IS SORT OF LIKE HALF OF THE KEY

### Encryption & Decryption

- Decryption
    - The receiver must know:
        - the seed
        - the pseudo random number generator
        - the ciphertext
    - The receiver still has to generate the pseudo random number generator then do XOR again

### The Problems

- It might take a while to generate the number

### Knowledge to Encrypt/Decrypt

- The psudeo random number generating algorithm
- The seed
- The key size

# RC4 Stream Cipher

- SSL/TLS, WEP
- Use RC4-Drop[n]
    - set at 3072 usually

## Breaking Stream Cipher

- KEY STREAM SHOULD ONLY BE USED ONCE
    - using it twice can make it really easy to break

# Block Cipher

- not bit-by-bit, but in blocks
- more efficient

## DES Data Encryption Standard

- 1977 - 2001
- Substitution Box (S Box)
- Short key size is a vulnerability
    - you can easily crack shorter key sizes
- Attacks
    - Dictionary attack
    - linear cryptanalysis

![Untitled](Wireless%20Technology%20and%20Security%20Fundamentals%E2%80%99/Untitled%208.png)

![Untitled](Wireless%20Technology%20and%20Security%20Fundamentals%E2%80%99/Untitled%209.png)

## AES Structure

Current NIST standard