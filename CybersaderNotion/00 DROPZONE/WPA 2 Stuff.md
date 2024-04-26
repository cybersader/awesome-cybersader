# WPA 2 Stuff

[Understanding CTR with CBC-MAC Protocol (CCMP) AES-CCMP in depth – Praneeth's Blog](https://praneethwifi.in/2020/05/02/ctr-with-cbc-mac-protocol-ccmp-aes-ccmp/) 

[CCMP (cryptography) - Wikipedia](https://en.wikipedia.org/wiki/CCMP_%28cryptography%29) 

[4-Way Handshake - WiFi](https://www.wifi-professionals.com/2019/01/4-way-handshake) 

# Wireless Protocol Overview

WEP, WPA, WPA2, and WPA3 refer to different certifications for securing a wireless network, each requiring certain standards. Each of them specifies different behavior and offers different options.

The original WEP used the stream cipher RC4 with a 104-bit key. Because RC4 does not accept a nonce, it produces a single stream of output. However, when dealing with packets, it's not possible to guarantee all data arrives in the same order without packet loss, WEP specified a 24-bit nonce as part of the key.

RC4, however, is vulnerable to related-key attacks, which means using similar keys causes security problems, and 24 bits is not sufficient for a nonce size, which means that the same nonce (and hence the same keystream) was reused. Combined with the fact that RC4 has known statistical weaknesses and there was no integrity check to prevent tampering, this design meant that WEP was exceedingly weak and using it was little better than sending data unencrypted.

WPA was designed to fix this problem without requiring new hardware by implementing TKIP, the Temporal Key Integrity Protocol. It used a new, per-packet key for each packet plus a (weak) integrity check. While RC4 was still a bad choice, TKIP meant that many people could achieve a very basic level of security with just a firmware upgrade.

AES is a well-known, secure block cipher for encrypting data, and CCMP is a mode of using this cipher to provide both strong encryption and robust integrity protection. WPA2 required support for AES-CCMP for certification. While WPA2 properly secures the data involved in a packet, it doesn't authenticate the header information, so it's still possible for an attacker to send spoofed packets directing other endpoints to disassociate from the network (a disassociation attack).

WPA3 introduces a new, more robust version of key exchange (the process of negotiating keys when connecting to a network) and adds support for integrity checking of management frames, so disassociation attacks are no longer possible. AES-CCMP is still used because it's still considered robust and secure.

In this day and age, you should use WPA3 if all your devices support it, and WPA2 otherwise. Unless you are dealing with obsolete devices, your networks should use only AES-CCMP and should have TKIP (and WEP) disabled.

![Untitled](WPA%202%20Stuff/Untitled.png)

![nse-7141466639241786672-7864.png](WPA%202%20Stuff/nse-7141466639241786672-7864.png)

![Untitled](WPA%202%20Stuff/Untitled%201.png)

## What weaknesses does WPA2 have?

Even when WPA2 is implemented and a password is required to join a Wi-Fi network, it still harbors some potential vulnerabilities.

Passwords can potentially be cracked due to key management vulnerabilities present in the 4-way handshake. In addition to password decryption, this can result in packet replay, TCP connection hijacking, and [HTTP](https://proprivacy.com/guides/https-explained) content injection. Passwords are also potentially vulnerable to a [dictionary attack](https://en.wikipedia.org/wiki/Dictionary_attack).

In addition, once any user has access to a WPA2 protected Wi-Fi network, it is possible that they might attack other devices connected to the network. This is why we recommend that you always use a [VPN for public Wi-Fi](https://proprivacy.com/vpn/comparison/best-vpn-wifi-hotspot) networks.

The [KRACK vulnerability](https://en.wikipedia.org/wiki/KRACK) can also be exploited to intercept unprotected data passing over the network, which is another reason why it is always recommended for consumers to use a VPN.

## Should I use VPN on WPA2 protected networks?

When you connect to a public Wi-Fi hotspot, it is not always possible to tell what kind of security has been implemented.

In addition, as previously mentioned, even if WPA2 has been implemented, it is possible that your data could be exposed to another user who is also connected to the hotspot.

# CCMP

1. **Encryption**
    1. CCM Uses CTR (Counter Mode) for data Confidentiality.
    2. It uses Block Cipher.
2. **Authentication and Integrity.**
    1. CBC-MAC is used for authentication and integrity.
        1. CBC-MAC is a technique for constructing a message authentication code from a block cipher.
        2. The message is encrypted with some block cipher algorithm in CBC mode to create a chain of blocks such that each block depends on the proper encryption of the previous block.