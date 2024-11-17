---
aliases: 
tags: 
publish: true
date created: Sunday, November 17th 2024, 5:16 pm
date modified: Sunday, November 17th 2024, 5:16 pm
---

# Intro to WAN

- We don’t just ran cables everywhere
- A company may have multiple buildings and needs connections between them
    - You could use an overlay network or VPN setup
- Centralized services for a company
    - CUCM - cisco’s version of phone servers
    - POS - point of sale
    - Email servers
    - Databases and websites
- WAN topologies
    - Leased lines -reliable but expensive and slow
    - Frame relay - you used to have to know how to configure these as alternative to leased lines
    - ATM - also older
    - MPLS - multi protocol label switching (rage in the 90s)
        - everything connected and talking
        - MPLS circuits that connect to routers at all sites
        - The provider has an MPLS network that handles all of the connections
        - Everything relies or virtual or logical circuits
        - kinda at the 2.5 layer - applies label here and MPLS network recognizes the label
    - Metro ethernet -
        - doesn’t replace MPLS
        - edge routers
            - the router used to connect to the MPLS network is the CE (customer edge) router
            - the router used to connect to customers from the MPLS network is the PE (provider edge) router
        - A cable between two sites
        - They handle the cable
        - E-LINE and EVC (ethernet virtual circuit)
        - E-LAN: Sometimes they give you a big cloud switch between your sites
        - E-Tree: hub and spoke connecting to a hub center
        - Use QoS to make sure certain traffic gets important treatment
    - SD-WAN - software defined wide area networking
        - Go over the public internet but add encryption at higher levels
        - The cloud is used more so data centers are not as common
        - Most orgs are hybrid
    - VPNs and overlay networks
        - Avoids expensive dedicated lines and can connect sites just as well
        - site-to-site VPNs can be slow sometimes
        - Use QoS to make sure certain traffic gets important treatment