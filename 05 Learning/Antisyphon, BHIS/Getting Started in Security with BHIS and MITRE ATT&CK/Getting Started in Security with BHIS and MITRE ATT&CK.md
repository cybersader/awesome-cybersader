---
created: 2024-03-18T09:46
updated: 2024-03-18T11:00
tags:
  - BHIS
  - ATTCK
  - Mitre
  - JohnStrand
---
# MEMES
- Change your title to "managing intern" if you want to avoid some marketing crap
# RESOURCES and LINKS
- [Free Resources - AuditScripts.com](https://www.auditscripts.com/) 
# A Gentle Caring Intro to Security
## Overview of Class - What will be covered
- What works to defend a network
- Cover the things that BHIS loves/hates to see in customer networks
- "Hacker tears make the best wine" - classic quote from John Strand
- **Atomic Controls** - Mapping MITRE to Critical Controls 11 topics:
	- Application Allow listing
	- Password Controls
	- Egress Traffic Analysis
	- UEBA
	- Advanced Endpoint Protection
	- Logging
	- Host Firewalls
	- Internet Allow Listing
	- Vuln mgmt
	- AD Hardening
	- Backup and Recovery
## What WON'T be covered
- Windows
- Linux
- TCP/IP
- Crypto
- Security Models
- The CBK
- NIST 800 series
- DLP
- Exploit of the day!
## Why is this important
- BHIS tracked vulns over the years (650+ per year)
- Mapped these to Mitre

## Compliance Issues
- Far too many frameworks
- Overlapping and conflicting recommendations
- NIST Greenbook
- PCI Min Password length changes a lot
- [Free Resources - AuditScripts.com](https://www.auditscripts.com/) 

## Mitre Defense Coverage Approach
- Don't approach by technique - try to cover large sets of attacks instead
# Application Allow Listing
![](__attachments/Getting%20Started%20in%20Security%20with%20BHIS%20and%20MITRE%20ATT&CK/IMG-20240318104314054.png)
- How to approach white and blacklisting applications
- We are hardwired to like denylists
	- Don't snuggle with grizzly bears - cavemen evolution
## Six Dumbest Ideas in Security
![](__attachments/Getting%20Started%20in%20Security%20with%20BHIS%20and%20MITRE%20ATT&CK/IMG-20240318104426720.png)
/## Examples: Ghostwriting, LOLBins
- If we XOR data to itself then it should always be 0
- If we do this in assembly then we can avoid lots of AV
- Living of the land binaries can be used to avoid denylisting AV out there
## Application Allow listing: Directories
![](__attachments/Getting%20Started%20in%20Security%20with%20BHIS%20and%20MITRE%20ATT&CK/IMG-20240318105109428.png)
- Go by dir
	- Only from Program Files, Program Files x86
	- Avoids from Downloads, Desktop, etc.

## By Hash
- This works too
## By Digital Certs
![](__attachments/Getting%20Started%20in%20Security%20with%20BHIS%20and%20MITRE%20ATT&CK/IMG-20240318105235283.png)
## AppLocker
![](__attachments/Getting%20Started%20in%20Security%20with%20BHIS%20and%20MITRE%20ATT&CK/IMG-20240318105304629.png)
- You need pro license to use it
# How LABS work
- Show what to do
- Go step by step
# AppLocker LAB
[IntroLabs/IntroClassFiles/Tools/IntroClass/AppLocker/AppLocker.md at master · strandjs/IntroLabs](https://github.com/strandjs/IntroLabs/blob/master/IntroClassFiles/Tools/IntroClass/AppLocker/AppLocker.md)
- Made a malicious executable
- 