---
aliases: 
tags: 
publish: true
date created: Saturday, November 16th 2024, 6:17 pm
date modified: Saturday, November 16th 2024, 6:18 pm
---

# Firewalls & Networking

## Gaming Network Issues

### Blocked Inbound Ports by LAN Firewall/Router

- If the NAT type is moderate and/or UPnP is disabled, then it could be that some ports are being blocked on the network and this can create issues for gaming. To fix this, try “alternate port selection” and use “Zenmap” on a laptop on the same wifi/LAN to find some open ports that can be selected instead
- Run the below nmap command from within Zenmap since only a select number of ports can be used. This tests for one of the ports being open. It’s likely that they will say “filtered” though

## How to Find Gateway

- [networking - Is it possible to find out what gateway is available on a network without prior knowledge? - Server Fault](https://serverfault.com/questions/323134/is-it-possible-to-find-out-what-gateway-is-available-on-a-network-without-prior)
    - Short answer - not with 100% certainty
- Try “ipconfig” on Windows in the CMD terminal
    - Look for default gateway:
        - Usually
            - 192.168.0.1
            - 192.168.1.1
        - In this case (below)
            - 192.168.66.1

```markdown
ipconfig
```

# Quality of Service Traffic

- TODO - unknown