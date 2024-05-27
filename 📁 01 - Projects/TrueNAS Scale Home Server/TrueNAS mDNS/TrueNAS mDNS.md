---
aliases: 
tags: 
publish: true
date created: Thursday, April 18th 2024, 5:27 pm
date modified: Monday, May 27th 2024, 2:05 pm
---

# Truenas.local Stopped Working
- My truenas.local domain stopped working all of the sudden, so I'm troubleshooting the issue
- The local IP address still works fine
- To fix this, I got rid of the IPv6 address and it started working for seemingly no reason

More troubleshooting to get to SMB shares - [Cannot Connect to Truenas SMB](../Cannot%20Connect%20to%20Truenas%20SMB/Cannot%20Connect%20to%20Truenas%20SMB.md)

- Weirdly enough, `truenas.local` still works on my phone
- Current Network config:
	- ![](_attachments/TrueNAS%20mDNS/IMG-20240527140543811.png)
- So, I have a truenas.local host on my local network that can resolve to the local IP address. Right now, my phone can resolve the .local domain to the IP address, but my Windows computer couldn't in either the file explorer on the browser. What's going on? I have mDNS and WS-DISCOVERY also turned on for the Networking in the TrueNAS Scale settings

# Solution
This is a client-side issue for Windows since it works on the phone.  Here's some solutions.

1. Add a manual entry to the `hosts` file located @ `C:\Windows\System32\drivers\etc`
2. Set up a local DNS server on the home router
3. Make sure WS-DISCOVERY is properly configured
4. 