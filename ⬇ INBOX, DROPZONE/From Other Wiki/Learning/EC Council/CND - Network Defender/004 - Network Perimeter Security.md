# Firewalls - Concerns, Abilities, Limitations
## Concerns 
- Edge of network
- Various levels of networking
- Not super hard to bypass
## Purpose
- Uses rulesets and conditions to act on traffic based on information at various levels in TCP IP model
## How they Get Bypassed
- No DPI (deep packet inspection) so it only relies on simple rule sets
- Lack of evasion detection
## 4 P's Firewalls 
- ports
- protocols
- programs
- iP addresses

## What are they
- really just glorified routers that can see layer 2, 3, 4 traffic and filter based on conditions with info at those levels
## Misc Capabilities
- firewall usually logs decisions
- NAT for subnets
## Limitations 
- Can't stop AV or email issues
- Lots of ways to initial compromise other than evading firewalls
- lack of protocols usually that it understands
- common port activity is hard to watch without heavy mgmt
- can't see tunneled traffic
## Firewall Tech
- Packet filtering
- Circuit level gateway
- Multilayer inspection 
- App proxy
- NAT
- VPN
### Packet Filtering 
- Packet 
	- Layer 3 data (IP addr and router layer)
- Source and dest IP addresses
### Circuit-Level
- TCP handshakes and conversations
- Session layer 
- Ports and protocols
### Application Level 
- Filter specific commands and activities based on applications 
### Stateful Multilayer Firewall
 - expensive
 - network layer and watch application layer
### App Proxy
- protects specific apps by sitting in front of them
- filters connections by service and protocol
- proxies limit the types of communications to apps to only the necessary service 
### NAT (network address translation), PAT, Subnetting
- ran out of ips
- map public routable internet address to local subnets
- firewalls do this too because they are routers and can have a NAT layer 
- Uses PAT (port address translation) to map back to local devices despite not having their destination IP (uses ephemeral ports)
- Port forwarding is used to map the gateway to specific internal devices or you use tunneling systems
## Firewall Topologies
- Bastion host: public and private interface with firewall in between
	- small org
- Screened subnet: DMZ or perimeter network. Helpful for publicly accessible services while keeping client devices behind firewall in intranet
	- public servers
- Multi-homed firewall: firewalls between every point (public, DMZ, intranet)
	- lots of different needs
	- management heavy 

## Traffic Stuff
### DPI (deep packet inspection)
- host to host comms
	- clicking on a link to a website
	- the device responds with a page
	- the frame that comes in has piece of info for web page
		- source and dest mac address
	- inside frame is packet
		- source and dest IP
	- communicates with upper layers
		- TCP segment has src and dest TCP ports
	- TCP segment has data payload passed to app layer (web browser)
### Full Data Traffic Normalization
- firewalls are throughput oriented and don't perform normalization 
- they can't detect complex attacks
- choose fw that normalizes for every protocol layer
### Data-Stream Based Inspection
- Vuln detection
- don't just inspect connection, but the whole stream of data (even if it can't read or understand the data)
- look for data outside boundary lengths
## Firewall Implementation and Deployment
- Look at:
	- topology
	- detection
	- traffic and protocols
	- ROSI
		- return on security investment
- Ng-FWs are freakin expensive and they won't protect you from those phishing emails local 

- Management: remote and centralized?
- Throughput: GBps
- Integrations
- Additional power
- Personnel
- Future needs

- Naming conventions...holy moly super important for keeping things manageable 

## Ruleset Design
- Don't nest rules too much...makes it harder to manage
- Don't be too granular or it'll be a lot more work when big migrations or changes need to take place
- Use objects for copying
## Firewall Access
- Remote management is often attacked when publicly accessible (dorks, Shodan)
# IDS - Role, Capabilities, Limits, Concerns
## Why IDS
- Firewalls aren't enough
- We need IDS and IPS to account for another layer
- Uses rules with heuristics and patterns from various layers TCP/IP
- **Works from inside the network rather than at the network edge**
## Capabilities 
- User and system activities analysis
- Configs and vulns
- Typical attack signatures
- Policy violations
### What IDS/IPS isn't
- doesn't replace vuln, logging, AV and endpoint, etc.
## Concerns 
- Can have high false positives
- mistakes:
	- not tuning
	- not updating signatures
	- only watching inbound
## Types
- Anomaly or signatures 
- HIDS, NIDS, hybrids
- agent vs centralized 
- audit trail, packets, system state
- active vs passive
- interval or on the fly processing
### Signatures vs Anomaly
- anomaly 
	- abnormal behavior detection
	- needs tuning
- signature
	- specific sets of conditions to match to

### Stateful Protocol Analysis
- sequences of protocol states or commands
- looks at payloads and data at various TCP/IP layers
### Misuse Detection
- normal vs misuse
- anomaly engine
- depends on the 
### NIDS and HIDS
- network vs host 
- both relate to detecting intrusion without centralized analysis like a SIEM