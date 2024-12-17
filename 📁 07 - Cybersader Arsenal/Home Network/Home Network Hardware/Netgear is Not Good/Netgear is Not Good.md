---
aliases: []
tags: []
publish: true
permalink:
date created: Monday, December 16th 2024, 7:40 pm
date modified: Monday, December 16th 2024, 7:45 pm
---

- Netgear works if you are okay with using UPnP and don't run any servers at home - so most people. 

- Can't split up the network into VLANs by SSID
- Setup only worked on mobile app and not in browser
- Setting static IPs was terrible
	- Poorly programmed UI and testing
	- Had to manually change POST requests to set static IPs (went into browser dev tools and manually typed in MAC addresses then paste the request in a certain format in the terminal)
- NAT / port-forwarding didn't match what was set in the UI - and only sometimes