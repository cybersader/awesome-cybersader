# Infrastructure

## Azure
- https://azure.microsoft.com/en-us/free/#all-free-services 
## Azure Environment Setup
- [Defensive Origins Lab Environment | DO-LAB](https://www.doazlab.com/) 
	- [OTRF/Microsoft-Sentinel2Go: Microsoft Sentinel2Go is an open source project developed to expedite the deployment of a Microsoft Sentinel research lab.](https://github.com/OTRF/Microsoft-Sentinel2Go) 
# IAM
## Azure Entra ID (f.k.a Azure AD)
- [Microsoft Entra Plans and Pricing | Microsoft Security](https://www.microsoft.com/en-us/security/business/microsoft-entra-pricing) 
	- [https://entra.microsoft.com/?culture=en-us&country=us > home](https://entra.microsoft.com/?culture=en-us&country=us#home) 
## AD Pollution
- 
# Detections, SIEM
- Log aggregation, analysis, and detection engineering
## Azure Sentinel
- KQL (Kusto Query Language)

# Wordlist Gen & Honey User Password Optimization
## General Password Cracking
 - [Get Your Domain Passwords Spayed or Neutered | John Strand | BHIS Nuggets - YouTube](https://www.youtube.com/watch?v=Fy4HODjef2Y&t=12s) 
 - [How and Why We Crack Passwords | John Strand | BHIS Nuggets - YouTube](https://www.youtube.com/watch?v=sERAYCAGTKQ) 
## Popular Wordlists / Dictionaries
- [danielmiessler/SecLists: SecLists is the security tester's companion. It's a collection of multiple types of lists used during security assessments, collected in one place. List types include usernames, passwords, URLs, sensitive data patterns, fuzzing payloads, web shells, and many more.](https://github.com/danielmiessler/SecLists) 
- [berzerk0/Probable-Wordlists: Version 2 is live! Wordlists sorted by probability originally created for password generation and testing - make sure your passwords aren't popular!](https://github.com/berzerk0/Probable-Wordlists) 
- [kennyn510/wpa2-wordlists: A collection of wordlists dictionaries for password cracking](https://github.com/kennyn510/wpa2-wordlists) 
- [Albanian wordlist](https://github.com/its0x08/albanian-wordlist) - A mix of names, last names and some albanian literature.
- [Danish Phone Wordlist Generator](https://github.com/narkopolo/danish_phone_wordlist_generator) - This tool can generate wordlists of Danish phone numbers by area and/or usage (Mobile, landline etc.) Useful for password cracking or fuzzing Danish targets.
- [Danish Wordlists](https://github.com/narkopolo/danish-wordlists) - Collection of danish wordlists for cracking danish passwords.
- [French Wordlists](https://github.com/clem9669/wordlists) - This project aim to provide french word list about everything a person could use as a base password.
- [Packet Storm Wordlists](https://packetstormsecurity.com/Crackers/wordlists/page1/) - A substantial collection of different wordlists in multiple languages.
- [Rocktastic](https://labs.nettitude.com/tools/rocktastic/) - Includes many permutations of passwords and patterns that have been observed in the wild.
- [RockYou2021](https://github.com/ohmybahgosh/RockYou2021.txt) - RockYou2021.txt is a MASSIVE WORDLIST compiled of various other wordlists.
- [WeakPass](https://weakpass.com/) - Collection of large wordlists.
## Wordlist Generation
- Misc, Curations, Lists
	- [https://github.com/n0kovo/awesome-password-cracking > wordlists](https://github.com/n0kovo/awesome-password-cracking#wordlists)
- Explicitly Defined, Mangling, Permutative
	- [sc0tfree/mentalist: Mentalist is a graphical tool for custom wordlist generation. It utilizes common human paradigms for constructing passwords and can output the full wordlist as well as rules compatible with Hashcat and John the Ripper.](https://github.com/sc0tfree/mentalist) 
	- [edoardottt/longtongue: Customized Password/Passphrase List inputting Target Info](https://github.com/edoardottt/longtongue)
	- [sec-it/ComPP: Company Passwords Profiler (aka ComPP) helps making a bruteforce wordlist for a targeted company.](https://github.com/sec-it/ComPP)
- AI-Based
	- [ACM-Research/targeted-password-guesses: We refined a GPT-3 model on Wattpad user account data to generate targeted password guesses automatically.](https://github.com/ACM-Research/targeted-password-guesses) 
	- [Honey, I Chunked the Passwords: Generating Semantic Honeywords Resistant to Targeted Attacks Using Pre-trained Language Models | SpringerLink](https://link.springer.com/chapter/10.1007/978-3-031-35504-2_5)
## 