---
aliases: 
tags: 
publish: true
date created: Sunday, June 30th 2024, 9:29 pm
date modified: Sunday, June 30th 2024, 9:29 pm
---
# BHIS - How to Not Get Burned in the Year of the Dragon w/ Jordan & Kent
## Methodology
- ![](_attachments/2024%20Threat%20Patterns/IMG-20240630212928578.png)
- For tests, categorize vulns in accordance with defined rubric

![](_attachments/2024%20Threat%20Patterns/IMG-20240630212928509.png)
## Visibility & Threat Optics
![](_attachments/2024%20Threat%20Patterns/IMG-20240630212928682.png)
- We don't have much visibility

![](_attachments/2024%20Threat%20Patterns/IMG-20240630212928849.png)
- Detection time is 204 days
	- containment takes 73 days and trending down luckily

- Orgs fail to detect internal (really noisy) and external pentests along with scary stuff
	- PS and CMD are heavily instrumented, but BRC4?
	- Post Exploitation - seems to get lost in SIEM
## Risks
### Low
#### Information Leakage via Data Breach
![](_attachments/2024%20Threat%20Patterns/IMG-20240630212928911.png)
- stealer logs data dump is like the wild west
	- logs from stealer malware internally
		- Redline, Raccoon, Vidar, and Titan
- searching for stealer logs on the dark web can show a lot
- browser data

- Defenses:
	- ![](_attachments/2024%20Threat%20Patterns/IMG-20240630212928999.png)
	- enterprise password management solution
	- don't mix home and work
	- recon & hunt: register domain
	- policy: define allowable services for your mail domains
	- strong password policy
	- password filter lists
### Medium
#### Access to Admin Utilities
![](_attachments/2024%20Threat%20Patterns/IMG-20240630212929054.png)
- install PS without admin
- PS ISE without saving which runs in memory
- OS-based tools
	- cmd, MSBuild, InstallUtil, Regsvr, MSHTA

- Defenses
	- ![](_attachments/2024%20Threat%20Patterns/IMG-20240630212929116.png)
	- Use RBAC
	- AppLocker needs an FTE, so just spend some money on a product
	- Heavy optics might provide early warning detection
	- Harden PowerShell
	- Remove SSH on Windows
#### Weak Passwords
![](_attachments/2024%20Threat%20Patterns/IMG-20240630212929171.png)
- Reused passwords, guessable, etc.

- Defenses:
	- ![](_attachments/2024%20Threat%20Patterns/IMG-20240630212929239.png)
	- avoid cultural friction
	- PAM - privileged access manager
	- password filter tools
		- crackstation
	- stop reusing passwords
#### Unpatched Software & Web App Components
![](_attachments/2024%20Threat%20Patterns/IMG-20240630212929292.png)
- Oracle and Apache being unpatched are super hackable with vulns

- Defenses:
	- ![](_attachments/2024%20Threat%20Patterns/IMG-20240630212929349.png)
	- Enforce patching standards with a policy statement - hard to actually do
	- Implement and improve inventory controls
#### SMB/LDAP Signing
![](__attachments/oCISO%20Wiki/IMG-2024%20Threat%20Patterns-2024063021-12.png)
- Attackers don't need creds
- SMB and/or LDAP signing missing

- Defenses:
	- ![](__attachments/oCISO%20Wiki/IMG-2024%20Threat%20Patterns-2024063021-13.png)
	- Limit protocols for getting credentials in transit 
		- LNK / URL / SCR / CPL files not allowed
		- Limit LLMNR, NBNS, and WPAD broadcasts
		- Set a WPAD record in DNS
### High
#### Lack of MFA on External Systems
![](__attachments/oCISO%20Wiki/IMG-2024%20Threat%20Patterns-2024063021-14.png)
- 40% of networks not defended against weak password policy and lack of MFA
- MFA is a backstop for password and credential issues

- Defenses:
	- ![](__attachments/oCISO%20Wiki/IMG-2024%20Threat%20Patterns-2024063021-15.png)
	- Know external surface
	- Reduce surface
	- Enforce MFA with SSO as much as possible
#### Multicast and NBNS Poisoning
![](_attachments/2024%20Threat%20Patterns/IMG-20240630212929424.png)
- browser hijacking issue
- Most network adapters have LLMNR on

- Defenses
	- ![](_attachments/2024%20Threat%20Patterns/IMG-20240630212929479.png)
	- Disable LLMNR with GPOs
#### Coercion and Forced Authentication
![](_attachments/2024%20Threat%20Patterns/IMG-20240630212929532.png)

- Defenses:
	- ![](_attachments/2024%20Threat%20Patterns/IMG-20240630212929587.png)
	- monitor for these
#### ADCS
![](_attachments/2024%20Threat%20Patterns/IMG-20240630212929652.png)
- DA as a service
- Misconfigured ADCS
- Certificate Templates
	- subject alternative name to impersonate DA account - very fast priv esc

- Defenses:
	- ![](_attachments/2024%20Threat%20Patterns/IMG-20240630212929703.png)
	- Clean up templates
	- if vendor or software has issue then notify vendors
#### Another Combo!
![](_attachments/2024%20Threat%20Patterns/IMG-20240630212929756.png)
- .NET code in DNSpy 
- Creds in automation routines, CICD, devops
- CloudFormation, Lambdas, and more
## How to Get Resources
- orgs without money - doesn't cost anything to configure stuff you have - have actual conversations
- relate it to money, but make it personalized to the business
- people don't care...they really don't unless there's money involved, so show them that part
- talk to vendor mgmt to help reduce risk -- give them some responsibility