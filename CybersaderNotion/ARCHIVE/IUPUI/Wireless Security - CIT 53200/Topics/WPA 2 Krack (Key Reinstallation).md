# WPA 2: Krack (Key Reinstallation)

<aside>
📜 ***Key Reinstallation Attacks: Forcing Nonce Reuse in WPA2***

</aside>

# WPA 2 Background / Overview

## 4-Way Handshake

- comes from 802.11i amendment of 802.11
    - WEP was broken so IEEE gave everyone the 4-way handshake
    - also defined TKIP and CCMP
- mutual authentication and session key agreement

## WPA2

- uses AES-CCMP
    - achieves 2 parts of security:
        - data-confidentiality
        - integrity

## WPA vs WPA2

- WPA only uses TKIP
    - temporal key integrity protocol
        - very vulnerable
- WPA2 *can* use TKIP, but it usually uses AES-CCMP

# 4-Way Handshake

![Untitled](WPA%202%20Krack%20(Key%20Reinstallation)/Untitled.png)

3 steps:

1. Mutual authentication and association
    1. Shares the pairwise and group **cipher suites** with the client and AP (supplicant and authenticator)
2. The 4-way handshake
    1. AP sends the first message:
        1. replay counter - detected replayed frames
        2. ANonce - random number used to make session keys
        3. ONLY MESSAGE NOT PROTECTED with MIC (message integrity check)
    2. Client sends 2nd message:
        1. replay counter
        2. SNonce
        3. generates PTK from ANonce
    3. AP and sends GTK
        1. AP makes the PTK from SNonce
    4. Client sends 4th message:
        1. has received GTK
3. Group key handshake
    1. AP periodically refreshes the group key and distributes it to all clients

# KRACK (Reinstallation Attack)

## Supplicant State Machine

- The 802.11i amendment doesn’t define how the supplicant/client has to implement storage and use of the information during this 4-way handshake
    - 802.11r provides extends the pseudo-code description of 802.11i but still has the same issues
- Two vulnerable properties:
    - the AP retransmits message 1 or 3 if it did not receive a reply
        - the client must handle retransmission of message 1 or 3 from the AP
    - Client should install the PTK after processing and replying to message 3
- BOTH vulnerable properties of 802.11i are just as vulnerable in 802.11r

## The Vulnerability

- The supplicant/client accept retransmissions of message 3, even when it is in the PTK-DONE state
- We can force retransmission of message 3 by preventing message 4 from arriving at the AP/authenticator
- The supplicant must then reinstall the already-in-use PTK
- This resets the nonce being used. Depending on the protocol, the adversary can replay, decrypt, and/or forge packets.

## Caveats, Exceptions, and Constraints for the KRACK Attack

- Who IS or ISN’T vulnerable?
    - Not all wifi clients implement this state machine as defined in 802.11i (not vulnerable)
    - Windows and iOS do NOT accept retransmissions of message 3 (not vulnerable)
        - group key handshake is still vulnerable with the FT handshake (different)
- MitM position
    - must be between client and the AP
    - have to be channel-based
        - can’t simply use a rogue AP
        - AP is cloned on a different channel with the same MAC address (since MAC affects keys)
- Some implementations only accept encrypted message 3
    - ways to get around this

## Attacks & Conditions

### Plaintext Retransmission of Message 3

- Conditions:
    - client/victim accepts plaintext retransmission
- Attack:
    - channel-based MitM attack to manipulate handshake messages
    - block message 4 from getting to the authenticator
    - AP retransmits messages after not receiving message 4
    - SOME APs accept older replay counters

### Encrypted Retransmission of message 3

- Conditions:
    - client only accept encrypted message 3
- Attack:
    - same as above
    - additionally exploits things like race conditions, specific implementations, etc.

## Impacts of KRACK

- Depends on data-confidentiality protocol being used:
    - TKIP - forge packets in one direction
        - MIC key can be recovered
        - Can then attack the weak Michael algorithm
        - Can forge packets in both direction
    - CCMP - read packets
        - replay and decryption of packets
    - GCMP - forge packets in both direction
        - authentication key can be recovered
        - use auth key to forge packets to either AP or client

## Defenses & Mitigations

- Entity using the data-confidentiality protocol needs to check if the key being installed was already in use
- Add boolean variable to state machine so that session key in the 4-way handshake is only installed once