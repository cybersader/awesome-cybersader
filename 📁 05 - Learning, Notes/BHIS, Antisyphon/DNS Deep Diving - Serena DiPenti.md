

- [YouTube: DNS Deep Diving with Serena DiPenti](https://www.youtube.com/watch?v=p0Ar6eincE0)

- DNS maps human-readable domain names to machine-readable IPs
- DNS is one of the most critical components of the operations of the modern internet.  

# Fundamentals

## Components
- Domain
    - Protocol, Subdomain, Domain, Top-Level domain
- DNS Servers
    - Recursive resolver 
    - Root nameserver
    - TLD Nameserver
    - Autoritative Nameserver

## Queries
- DNS Recursor
    - Responds maybe with cached data
    - Usually sends a request to a root name server
- Root Nameserver
    - Directs the recursor server to a TLD name server based on extension
    - They used to only have 13 root addresses, but now there's hundreds or thousands
- Unicast vs Anycast
    - We don't go straight to one of those 13, but rather the DNS Root Nameservers use anycast so you're routed to the closest one.
- Recursor gets the Authoritative Name Server from the Root server and is givern a DNS A or CNAME record to go to the final set of servers

## Record Types
- A record: classic record that points to a specific IPv4 address
- AAAA record: IPv6 address
- CNAME record: canonical name record - point to a domain which triggers another DNS lookup - when IP of root domain changes a lot
- MX record: directs mail to mail server - can have property values - cannot point to a CNAME record
- TXT record: holds strings, email spam preventation, SPF, DMARC, domain ownership verification

# DNS Zones
- Portion of DNS namespace managed by specific organization
- Allow you to delegate authority - e.g. blogs, third parties
- Isolation
- Custom DNS records

# Security Threats
- DNS Cache Poisoning
- DNS Tunneling
- Domain Generation Algorithm

## Issues with DNS
- not a lot of verification
- no mechanism for data integrity - data can be alterted in transit
- compromise any level of hierarchy for mass disruption
- DNS is a trust-first system

## DNS Cache Poisoning
- Threat actor impersonates a nameserver, feeding incorrect info to the DNS Resolver
- DNS Resolver caches the bad data and serves it when the data is requested by someone else

## DNS Tunneling
- useful for data exfiltration or C2

- Register domain and point it to your malicious server with a tunneling malware program
- Infected computer uses DNS against the protocol to exfiltrate data
- DNS can avoid firewall rules and requires more advanced detection

## DGA - domain generation algorithm
- generates large numbers of new domain names
- WHO:
    - botnet operators
- WHY:
    - avoid malware-detection that may block specific domain namesand static IPs - used to encode data
- Used to counter CTI
- HOW:
    - Seed used with RNG and C2 to use random letters for domains
    - Domains can be unregistered and unmonitored

## Zone Transfers
- AXFR - Async transfer full range - a protocol for zone transfer for replication of DNS data across multiple DNS servers. Data stored in zone file and may contain sensitive info like internal network structure

## DNS Enumeration
- DNS servers, subdomains, internal IP leaks, email server info
- Tools: Fierce, Amass, DNSdumpster, DNSEnum, DNSrecon

# Case Studies

## Solarwinds
- Big supply chain attack that embedded malware into their SDLC and into the MSP's customers
- Sunburst malware that used domain gen algorithm to hide C2 traffic
- They used DGA for the subdomain which included the compromised user/victim's host information
- They would add the DGA to a CNAME record so the victim computer would automatically map to the correct C2 server
- They used DGA to allow for their C2 infrastructure and approach to scale quickly 

## DNS Sink Hole
- Wannacry would query for hardcoded unregistered domain, and if the domain was registered, the ransomware would shutdown.
- Pi-hole
    - DNS and IP blocklists
    - Sets up a record in little DNS resolver that ignores junk connections

## DNSChanger
- DNS Hiacking Trojan
- Used to change IP addresses for hosts to inject advertising into web pages
- Estonian company that made tons of money by injecting ads everywhere
- 