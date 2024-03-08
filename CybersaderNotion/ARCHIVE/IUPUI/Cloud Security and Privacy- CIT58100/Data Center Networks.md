# Data Center Networks

# Crazy Data Centers

- Free cooling in the ocean?
    - good luck with maintenance
- They need their own water supply and power lines
    - Wonder how much power they be pullin’

# “Trad” Data Center Network Components

- Switches
    - multiple tiers
    - TOR switch (top of rack)
- Load balancer
    - helps redirect large numbers of requests
    - Does NAT (network address translation)
- Server racks
    - sets of computers
- Border router
    - Has main public IP
- Access routers??? ← what is that?

# Conventional DC Network Problems

## Oversubscription Problem

- You need powerful expensive proprietary routers to handle all of the bandwidth.  You get issues when trying to handle all of the connections with a small number of routers.

## Resource Fragmentation

- Oversubscribed linke

## Solutions (meshes and load balancers)

- You will always need more routes to balance the load.  There is no way to get around it.  Creating a meshed network gives more leeway.

# Virtual LANs

- If you want your own VPC or virtual private cloud, then you can use virtual switches to do so.

# VPN

- Build logical private connections over public networks
- Lots of protocols for this