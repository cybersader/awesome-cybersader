---
aliases: 
tags: 
publish: true
date created: Monday, May 27th 2024, 3:53 pm
date modified: Monday, May 27th 2024, 4:02 pm
---

# DNS Exfiltration & Attack from India?
- Malformed packet going to a phone company in India?  Why???
	- ![](_attachments/Home%20Network%20Wars/IMG-20240527160242375.png)
- Quick IP rep checks
	- https://www.virustotal.com/gui/ip-address/114.69.235.183/detection
		- ![](_attachments/Home%20Network%20Wars/IMG-20240527160242401.png)
	- https://talosintelligence.com/reputation_center/lookup?search=114.69.235.183
		- ![](_attachments/Home%20Network%20Wars/IMG-20240527160242435.png)
	- https://www.whois.com/whois/114.69.235.183
		- ![](_attachments/Home%20Network%20Wars/IMG-20240527160242463.png)
- Okay, but why am I sending malformed mDNS packets (destination port 5353) on a periodic basis?
- Scanning their IP with Nmap
	- ![](_attachments/Home%20Network%20Wars/IMG-20240527160242518.png)
	- Found SSL cert stuff from China
		- `443/tcp open   ssl/https | ssl-cert: Subject: commonName=192.168.1.1/organizationName=ZTE/stateOrProvinceName=JiangSu/countryName=CN | Issuer: organizationName=ZTE/stateOrProvinceName=JiangSu/countryName=CN
- Worldphone company in India?
	- ![](_attachments/Home%20Network%20Wars/IMG-20240527160242547.png)
	- https://www.url2png.com/
		- ![](_attachments/Home%20Network%20Wars/IMG-20240527160321734.png)
	- 