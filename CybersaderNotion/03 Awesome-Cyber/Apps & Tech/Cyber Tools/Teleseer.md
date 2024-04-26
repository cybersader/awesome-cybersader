# Teleseer

- [Teleseer: Cyber visibility, security, and network mapping](https://teleseer.com/)

I would very much like to talk with you at some point. Although, I'm not sure you would get much value out of it

. I do have questions about Teleseer for sure though. I work as a data privacy engineer/analyst, and I'm in grad school for cyber. I also do work with our security operations team regularly where I work in Indianapolis. I see A LOT of value with Teleseer in terms of taking knowledge about a network and converting it into other formats or integrating it with other tools or stacks. Not to mention, this could even be useful for red teaming too. I will spend some more time soon contemplating Teleseer and trying out the demo to think about how I could get value out of the graph-structured data it puts together.  Nonetheless, I'm super impressed with the tool and will be utilizing it when I make my own business one day, or I may try it out with a home network setup at some point.

I'm also assuming there are a limited number of ways to ingest and draw out the map: 1) SPAN/mirrored port, 2) ARP spoofing traffic through a device or tap (doesn't work on lots of networks...also sus), 3) Wireless sniffing, 4) Network Tap, 5) Switch/Router Log Dumping (Netflow or sFlow)??? I'm also new at this, so sorry if that's a silly question. I mentioned it to our CISO and showed him your channel though. The first thing he asked is how we would deploy it on a large scale - agent-based, taps, etc.

The big problem we've seen is IT and security knowledge is fragmented across the our organizations. 62% of teams are understaffed. And waste up to 50% gathering knowledge about the networks they protect.

1. See what assets you have.

2. Know what they are doing

3. Share your knowledge with others easily.

Step #1 is to see what assets you have. The current asset management tools out there typically use 5 different approaches. There's pros and cons to each.

![unnamed.png](Teleseer/unnamed.png)

![unnamed (1).png](Teleseer/unnamed_(1).png)

An ideal solution would be to allow you to do passive discovery without any appliance, augmented by API connectors to fill in any missing details (read info from other existing products you have, e.g. Active Directory, ServiceNow CMDB, an nmap scan, etc.)

Our approach is to do the passive asset discovery from periodic network captures, pushed directly into your Teleseer project via an API key (coming soon), so you can schedule and automate everything. No scanning, no agents, no appliances. This way the time to value is just a few minutes.

3 means of deployment at large-scale:

- Native sniffer or capture tool on your firewall/switch.
- SPAN or aggregator tap
- Existing security sensor deployment (most can write to PCAP).

Last week I showed a network security engineer guy at an MSP in Vienna, Austria how to pull PCAP back from the Fortinet firewalls over SSH. Once our API-based uploads come out, he can literally discover all of their client sites with a single command.

Depending on the organization, you only need 1-2 collection points to cover an entire site. Sample X amount of traffic per minute/hour/day, automatically pushed to Telseeer.

Imagine being able to provide an up-to-date map and inventory for any organization in the world in minutes. Very helpful for compliance (PCI DSS, HIPAA, SOC2, FedRAMP, CMMC)

But wait, there's more....

![https://fonts.gstatic.com/s/e/notoemoji/15.0/1f604/32.png](https://fonts.gstatic.com/s/e/notoemoji/15.0/1f604/32.png)

We bring in a time and space dimension, so you can see changes over time and pull in important event data (e.g. only alerts and associated logs) from a SIEM or storage location, so you can visualize what your assets are doing as well.

We support ingesting Zeek logs right now and will expand to others.

This helps teams save lots of time on threat hunts, incident response, audits, because now they have a centralized source of knowledge visual and context about their environments.