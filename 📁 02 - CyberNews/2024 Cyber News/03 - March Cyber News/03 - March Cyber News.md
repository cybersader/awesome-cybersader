---
date created: Friday, March 22nd 2024, 9:27 am
date modified: Friday, March 22nd 2024, 10:29 am
---

# [Patch Tuesday, March 2024 Edition – Krebs on Security](https://krebsonsecurity.com/2024/03/patch-tuesday-march-2024-edition/) 
#KrebsOnSec 
- March 12, 2024

- For more vulns - [SANS Internet Storm Center](https://isc.sans.edu/forums/diary/Microsoft+Patch+Tuesday+March+2024/30736/)

- #Apple and #Microsoft released updates to fix dozens of vulns
- Microsoft patched 60 vulns!
- Apple's macOS Sonoma addresses 68 weaknesses, and update for iOS fixes two zero-days
	- [Apple Blunts Zero-Day Attacks With iOS 17.4 Update - SecurityWeek](https://www.securityweek.com/apple-blunts-zero-day-attacks-with-ios-17-4-update/) 
- Feb 26 2024 - Biden admin report called from memory-safe programming languages - mitigates lots of mobile OS vulns 
	- Hence why [Rust](https://www.rust-lang.org/) was mentioned
	- [Statements of Support for Software Measurability and Memory Safety | ONCD | The White House](https://www.whitehouse.gov/oncd/briefing-room/2024/02/26/memory-safety-statements-of-support/) 
- No zero-days seen on the Windows side (thankfully)
- Windows - 60 CVEs and yet only 6 that could likely be used
	- Priv esc vulns are the popular ones
	- "including [CVE-2024-26182](https://msrc.microsoft.com/update-guide/en-US/vulnerability/CVE-2024-26182) (Windows Kernel), [CVE-2024-26170](https://msrc.microsoft.com/update-guide/en-US/vulnerability/CVE-2024-26170) (Windows Composite Image File System (CimFS), [CVE-2024-21437](https://msrc.microsoft.com/update-guide/en-US/vulnerability/CVE-2024-21437) (Windows Graphics Component), and [CVE-2024-21433](https://msrc.microsoft.com/update-guide/en-US/vulnerability/CVE-2024-21433) (Windows Print Spooler)."
- Interesting MS Vulns:
	- [CVE-2024-21390](https://msrc.microsoft.com/update-guide/en-US/vulnerability/CVE-2024-21390): Priv esc vuln with **Microsoft Authenticator**
		- Requires access to device through malicious app or malware
		- Closing or reopening Authenticator allows attacker to obtain MFA codes and modify or delete accounts from the app
	- [CVE-2024-21334](https://msrc.microsoft.com/update-guide/en-US/vulnerability/CVE-2024-21334): earned a CVSS (danger) score of 9.8 (10 is the worst), and it concerns a weakness in **Open Management Infrastructure** (OMI), a Linux-based cloud infrastructure in **Microsoft Azure**. Attacks can connect to OMI instance and send crafted data packets to get RCE on host Linux machine
	- [CVE-2024-21435](https://msrc.microsoft.com/update-guide/en-US/vulnerability/CVE-2024-21435): RCE that uses OLE engine (backbone for some app-to-app comms on Windows), but 8.8 because it requires technical skill
- Adobe vulns
	- Adobe finally put out security updates to fix vulns for lots of products: **Adobe Experience Manager**, **Adobe Premiere Pro**, **ColdFusion 2023** and **2021**, **Adobe Bridge**, **Lightroom**, and **Adobe Animate**.
	- Not "aware" of active exploitation.