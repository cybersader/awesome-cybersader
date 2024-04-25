---
publish: true
---
# Intro to IOT Hacking

# Why hack these?

- Its fun…lol

# Skills for IOT hacking

- General electronic knowledge
- Read or Google C code
- Soldering

# Attack surfaces

## Hardware

- Uart protocol
    - Interuppt or get shells
- Jtag protol
    - Memory stuff
    - Dumping memory can show encryption key and you can decrypt firmware
- Spi protocl

## Network

- Http
    - Self signed
- Mqtt
- Firmware upgrade mechanisms
- Bluetooth

# Disassembly

- Power disconnected
- Google items

# Communicsting with IoT

- Multimeter
- Usb to serial adapter
- Logic analyzer
- Putty
    - Serial tty

# Attacking hardware

- Connecting to uart - watch bootup process
- Interruptboot sequence
- Short flash
- Modify boot arguments
- Get shell
- Pwn

# Uart connection

- Run commands or interrupt bootloader

# Software to use

- Linux - screen, nm, binwalk
- Windows - putty, ghidra, wsl
- VM - ufzzing into virtual emulstion of the firmware

# Practicing Reverse Engineering

- Download random firmware
- Start with known vulnerable firmware
- Pentestpartners tp link with ghidra

# Extracting firmware

- Use binwalk
- Look for linux file structure

# Find vulns

- Fuzz random input to services
    - Observe behavior
- Reverse engineer
    - Look at binaries
    - Determine how user inouts are handled

# Typical vulns

- Buffer overflow
- Malicious firmware updates
    - Are we doing sig checks on iot devices
- Dos
- Leftover debug interfaces
- Rce
- Unencrypted comms

# How to get started

- Old router
- Soldering iron and small cables
- Usb 2 tty cable
- Firmware off internet
- Binwalk to extract firmware
- Ghidra for decompiling

# Mitigations

- Encrypt firmware
- Dont make plaintext firmware available
- Secure coding
- Segment devices on network
- Disable hardware interfaces
- Firmware signatures