Share any links to cool security stuff in here and delete ones that are meh...

`You can use the "Copy Title and Url as Markdown Style" Google extension for pasting the links with their titles.`

---
- [SecOps Team Productivity](#SecOps-Team-Productivity)
	- [Windows Desktop Tools](#Windows-Desktop-Tools)
	- [Internal AI Chat](#Internal-AI-Chat)
	- [Team Wiki System](#Team-Wiki-System)
- [CISO](#CISO)
	- [Stats, Reports, Research](#Stats%2C-Reports%2C-Research)
	- [Cyber News](#Cyber-News)
- [Asset Discovery, Visibility, Vuln Mgmt](#Asset-Discovery%2C-Visibility%2C-Vuln-Mgmt)
- [Blue Team](#Blue-Team)
	- [Taxonomies, Frameworks](#Taxonomies%2C-Frameworks)
	- [Disaster Preparedness, Ransomware](#Disaster-Preparedness%2C-Ransomware)
	- [Threat Hunting, DFIR](#Threat-Hunting%2C-DFIR)
	- [Threat Intel](#Threat-Intel)
	- [AppSec](#AppSec)
	- [Detection Engineering, SIEM](#Detection-Engineering%2C-SIEM)
	- [Network & Perimeter, Threat Detection](#Network-%26-Perimeter%2C-Threat-Detection)
	- [Email](#Email)
	- [Endpoint](#Endpoint)
	- [Deception, Active Defense](#Deception%2C-Active-Defense)
- [Misc](#Misc)
---
# SecOps Team Productivity
## Windows Desktop Tools
- [Microsoft PowerToys | Microsoft Learn](https://learn.microsoft.com/en-us/windows/powertoys/) 
- [Sysinternals - Sysinternals | Microsoft Learn](https://learn.microsoft.com/en-us/sysinternals/) 
- [ShareX - The best free and open source screenshot tool for Windows](https://getsharex.com/)
## Internal AI Chat
- Upload files, SOPs, and documents that you can ask questions about
	- [StanGirard/quivr: Your GenAI Second Brain 🧠 A personal productivity assistant (RAG) ⚡️🤖 Chat with your docs (PDF, CSV, ...) & apps using Langchain, GPT 3.5 / 4 turbo, Private, Anthropic, VertexAI, Ollama, LLMs, that you can share with users ! Local & Private alternative to OpenAI GPTs & ChatGPT powered by retrieval-augmented generation.](https://github.com/StanGirard/quivr) - can be self-hosted for privacy and security concerns, encourages learning about internal PPTs (people, process, tech)
- [Khoj: An Open-Source AI Copilot for your Second Brain](https://khoj.dev/) - utilizes various sources (GitHub, Obsidian, Notion, PDFs, files.)  Use any AI with it or self-host it too.

## Team Wiki System
A team wiki system encourages collaboration and innovation.

- In a business, to make things easy always stick with plaintext and Markdown
- (FREE) Use [Logseq: A privacy-first, open-source knowledge base](https://logseq.com/) with [GitHub Desktop](https://desktop.github.com/) 
    - I haven’t tried this, but from what I can tell, LogSeq is free, open source, and you just have to integrate it with something like Git
    - To make this work large scale so that wikis can be operated via GitHub and seen in GitHub, there are things that one MUST get right:
        - Find a way to easily use relative paths for images and internal links in the tool
        - Use markdown formatted links and not Wikilinks
	- Another plus is that it forces SecOps team to learn some DevOps
    - [Logseq sync with Git and GitHub – Logseq Community Hub](https://hub.logseq.com/integrations/aV9AgETypcPcf8avYcHXQT/logseq-sync-with-git-and-github/krMyU6jSEN8jG2Yjvifu9i)
- [Obsidian](https://obsidian.md/) with the Git plugin is awesome, but it’s $4.2 per month (50 dollars a year) per user
    - Can have some security concerns (give and take) with community plugins. Just don’t trust them 100%
- If you don’t care about spending 8 dollars per month per user, then you can go with [Notion](https://www.notion.so/), but migration out of it is not easy
- Other Self-Hosted Options (on our own infra):
    - [AppFlowy](https://www.appflowy.io/)
        - Pros: A lot like Notion. Web-based. Self-hosted.
        - Cons: Not as many integrations as Notion
    - [CodiLIA](https://github.com/LiaScript/CodiLIA) - self hosted version of HackMD
    - [Outline](https://www.getoutline.com/pricing)
        - Pros: lots of features and integrations. Web-based. Collaborative. Price that can cover lots of users.
        - Cons: Might be hard to migrate to.
    - [Wiki.js](https://js.wiki/)
        - Pros: Very extensive and flexible. Can use lots of formats. Tons of features. Can host in various setups. Full-blown wiki.
        - Cons: Takes awhile to setup and manage (Digital Ocean does have a 1-click option though.) Might have a very steep learning curve. Clunky.
# CISO
## Stats, Reports, Research
- [jacobdjwilson/awesome-annual-security-reports: A curated list of annual cyber security reports](https://github.com/jacobdjwilson/awesome-annual-security-reports)
- ..
## Cyber News
- [BleepingComputer | Cybersecurity, Technology News and Support](https://www.bleepingcomputer.com/)
- [Krebs on Security – In-depth security news and investigation](https://krebsonsecurity.com/)
- [Invisible CISO - Cybersecurity news and alerts](https://www.invisibleciso.com/#/list/popular/0)
- [The Hacker News](https://thehackernews.com/)
- [Dark Reading](https://www.darkreading.com/)
- [The Record - Recorded Future News](https://therecord.media/)
- [News Now](https://www.newsnow.com/us/Tech/Cyber+Security)

# Asset Discovery, Visibility, Vuln Mgmt
- Run this tool over all of our websites to aggregate more data about "what we are using" on our websites
	- [cybersader/WebsiteTechMiner-py: A little Python project to automate gathering website profiling data from "BuiltWith" & "Wappalyzer" for tech stack information, technographic data, website reports, website tech lookups, website architecture lookups, etc.](https://github.com/cybersader/WebsiteTechMiner-py)
- Other technographic lookup tools for domains:
   - [berrysauce/ingredients: 🧪 Determine the "ingredients" (or technologies) behind a website](https://github.com/berrysauce/ingredients) - open source alternative to builtwith
- [edoardottt/awesome-hacker-search-engines: A curated list of awesome search engines useful during Penetration testing, Vulnerability assessments, Red/Blue Team operations, Bug Bounty and more](https://github.com/edoardottt/awesome-hacker-search-engines) 
- [ProjectDiscovery - Democratize security, together](https://projectdiscovery.io/)
	- [ProjectDiscovery - Nuclei](https://projectdiscovery.io/nuclei) 
- [Shodan Search Engine](https://www.shodan.io/)
- [Discovering and Exploiting N-Days](https://cham423.notion.site/Discovering-and-Exploiting-N-Days-90cf191871eb4bc295cbcb7241c1bae2) 
# Blue Team
- [cyb3rxp/awesome-soc: A collection of sources of documentation, as well as field best practices, to build/run a SOC](https://github.com/cyb3rxp/awesome-soc)
## Taxonomies, Frameworks
- Mitre
	- [DeTT&CT : Mapping detection to MITRE ATT&CK  – NVISO Labs](https://blog.nviso.eu/2022/03/09/dettct-mapping-detection-to-mitre-attck/) - detection
	- [ATT&CK® Navigator](https://mitre-attack.github.io/attack-navigator/) - attacking
	- [Directory of ATT&CK Open Source Tools](https://www.attack-community.org/directory/) - some tools related to ATT&CK framework
	- [D3FEND Matrix | MITRE D3FEND™](https://d3fend.mitre.org/) - defense
	- [Matrix | MITRE Engage™](https://engage.mitre.org/matrix/) - active defense and deception
	- [RE&CT Framework (EN) - RE&CT](https://atc-project.github.io/atc-react/) - (OLD) active defense and deception
## Disaster Preparedness, Ransomware
- Side-Channel Comms
	- GSOC Slack
### Ransomware
- [Ransomware Hostage Rescue Manual](https://www.knowbe4.com/hubfs/Ransomware-Hostage-Rescue-Manual.pdf)
- [Ransomware Playbook Discussion - Overview](https://dev.azure.com/karauctionservices/oCISO/_wiki/wikis/oCISO.wiki/51499/Ransomware-Playbook-Discussion)
## Threat Hunting, DFIR
- [caesar0301/awesome-pcaptools: A collection of tools developed by other researchers in the Computer Science area to process network traces. All the right reserved for the original authors.](https://github.com/caesar0301/awesome-pcaptools) 
- [deadcoder0904/awesome-website-screenshots: :notebook_with_decorative_cover: A curated list of ways to take Awesome Website Screenshots :heart_eyes:](https://github.com/deadcoder0904/awesome-website-screenshots) 
- [edoardottt/awesome-hacker-search-engines: A curated list of awesome search engines useful during Penetration testing, Vulnerability assessments, Red/Blue Team operations, Bug Bounty and more](https://github.com/edoardottt/awesome-hacker-search-engines) 

## Threat Intel
- [hslatman/awesome-threat-intelligence: A curated list of Awesome Threat Intelligence resources](https://github.com/hslatman/awesome-threat-intelligence) 
- [edoardottt/awesome-hacker-search-engines: A curated list of awesome search engines useful during Penetration testing, Vulnerability assessments, Red/Blue Team operations, Bug Bounty and more](https://github.com/edoardottt/awesome-hacker-search-engines) 
- [Awesome OSINT - "A curated list of amazingly awesome open source intelligence tools and resources"](https://github.com/jivoi/awesome-osint)
- [OSINT Framework - Free tools or resources](https://osintframework.com/)
## AppSec
- Secure coding
	- [OWASP Cheat Sheet Series | OWASP Foundation](https://owasp.org/www-project-cheat-sheets/) 
	- [OWASP Top Ten | OWASP Foundation](https://owasp.org/www-project-top-ten/) 
- DevSecOps
	- [jatrost/awesome-kubernetes-threat-detection: A curated list of resources about detecting threats and defending Kubernetes systems.](https://github.com/jatrost/awesome-kubernetes-threat-detection)
	- [sottlmarek/DevSecOps: Ultimate DevSecOps library](https://github.com/sottlmarek/DevSecOps) 
	- [arainho/awesome-api-security: A collection of awesome API Security tools and resources. The focus goes to open-source tools and resources that benefit all the community.](https://github.com/arainho/awesome-api-security) 
	- [mailtoharshit/Awesome-Api-Management-Tools: Curated List of all your need managing api in your org, in an awesome fashion](https://github.com/mailtoharshit/Awesome-Api-Management-Tools)  
	- [tenable/terrascan: Detect compliance and security violations across Infrastructure as Code to mitigate risk before provisioning cloud native infrastructure.](https://github.com/tenable/terrascan) 
- [awesome-selfhosted/awesome-selfhosted: A list of Free Software network services and web applications which can be hosted on your own servers](https://github.com/awesome-selfhosted/awesome-selfhosted)
## Detection Engineering, SIEM 
- [infosecB/awesome-detection-engineering: A list of useful Detection Engineering-related resources.](https://github.com/infosecB/awesome-detection-engineering) 
- [SigmaHQ/sigma: Main Sigma Rule Repository](https://github.com/SigmaHQ/sigma) 
	- where detection engineers, threat hunters and all defensive security practitioners collaborate on detection rules. The repository offers more than 3000 detection rules of different type and aims to make reliable detections accessible to all at no cost.
- [cybersader/awesome-siem: SIEM, Visibility, and Event-Driven Architecture Curated Solutions. Build a cost-effective threat detection and log management system.](https://github.com/cybersader/awesome-siem) 
- [jatrost/awesome-detection-rules: This is a collection of threat detection rules / rules engines that I have come across.](https://github.com/jatrost/awesome-detection-rules)
- 
## Network & Perimeter, Threat Detection
- Topology
	- [anderspitman/awesome-tunneling: List of ngrok alternatives and other ngrok-like tunneling software and services. Focus on self-hosting.](https://github.com/anderspitman/awesome-tunneling)
	- [grad-school-projects/Secure Database Exposition at main · cybersader/grad-school-projects](https://github.com/cybersader/grad-school-projects/tree/main/Secure%20Database%20Exposition) - my resources on secure service exposition 
	- 
- Firewalls
	- .
- WAFs
	- .
- Threat Detection 
	- [0x4D31/awesome-threat-detection: ✨ A curated list of awesome threat detection and hunting resources 🕵️‍♂️](https://github.com/0x4D31/awesome-threat-detection) 
## Email
- [Message Header Analyzer](https://mha.azurewebsites.net/) 
- [Weak Links in Authentication Chains: A Large-scale Analysis of Email Sender Spoofing Attacks | USENIX](https://www.usenix.org/conference/usenixsecurity21/presentation/shen-kaiwen) - breakdown of email spoofing techniques (in-depth)
	- [sec21_slides_shen_kaiwen_rev.pdf](https://www.usenix.org/system/files/sec21_slides_shen_kaiwen_rev.pdf) 
	- [sec21-shen-kaiwen.pdf](https://www.usenix.org/system/files/sec21-shen-kaiwen.pdf) 
## Endpoint
- Endpoint Hardening & Benchmarking
	- [0x6d69636b/windows_hardening: HardeningKitty and Windows Hardening settings and configurations](https://github.com/0x6d69636b/windows_hardening)
	- [scipag/HardeningKitty: HardeningKitty - Checks and hardens your Windows configuration](https://github.com/scipag/HardeningKitty)
	- [CIS Benchmarks](https://www.cisecurity.org/cis-benchmarks)
		- [CIS-CAT Lite](https://learn.cisecurity.org/cis-cat-lite) - CIS Benchmarking tool for endpoints
	- [Security Technical Implementation Guides (STIGs) – DoD Cyber Exchange](https://public.cyber.mil/stigs/) 
		- [SRG / STIG Tools – DoD Cyber Exchange](https://public.cyber.mil/stigs/srg-stig-tools/) 
	- [decalage2/awesome-security-hardening: A collection of awesome security hardening guides, tools and other resources](https://github.com/decalage2/awesome-security-hardening)
	- [hardentools/hardentools: Hardentools simply reduces the attack surface on Microsoft Windows computers by disabling low-hanging fruit risky features.](https://github.com/hardentools/hardentools)
- AV & EDR
	- [shadawck/awesome-endpoint-detection-and-response: Collection of tool you need to have in your Endpoint Detection and Response arsenal](https://github.com/shadawck/awesome-endpoint-detection-and-response) 
## Deception, Active Defense 
- [Getting Started in Cyber Deception](https://youtu.be/cCxbBz1UbnA)
- [adhdproject/awesome-active-defense: an awesome list of active defense resources](https://github.com/adhdproject/awesome-active-defense)
- [ADHD - Active Countermeasures](https://www.activecountermeasures.com/free-tools/adhd/) 
	- Active Defense Harbinger Distribution (ADHD) is our answer to security distributions such as Kali Linux or Parrot Security. We have curated a variety of open-source tools and installed them on top of Ubuntu 20.04 (previously Linux Mint). Tools are organized into three categories: Annoyance, Attribution, and Attack. Some tools that have fallen into disrepair have been forked by the ADHD team and fixed/upgraded to prevent them from being lost.
- [Canarytokens](https://canarytokens.org/generate) 
	- Enterprise platform - [Thinkst Canary](https://canary.tools/#why)
- [grad-school-projects/Honey Accounts in Windows AD at main · cybersader/grad-school-projects](https://github.com/cybersader/grad-school-projects/tree/main/Honey%20Accounts%20in%20Windows%20AD) - my grad school project with resources on setting up Honey Accounts in Windows AD

# Bug Bounty, Offensive
- https://jhaddix.gumroad.com/l/gtpkm
- https://portswigger.net/web-security
- https://www.youtube.com/playlist?list=PLWay6gx6Lv_Bdcb9-FQg7q7I3BqRD9lr9

# Misc 
- [RunaCapital/awesome-oss-alternatives: Awesome list of open-source startup alternatives to well-known SaaS products 🚀](https://github.com/RunaCapital/awesome-oss-alternatives) 
- [sereneblue/awesome-oss: A list of open source projects with links to contribute or donate.](https://github.com/sereneblue/awesome-oss) 
- sys admin
	- [Spacial/awesome-systools: Awesome Systools is a collection of sysadmins daily handy tools.](https://github.com/Spacial/awesome-systools) 
	- [pakoti/Awesome_Sysadmin: collection of one-liners, scripts, Tricks for system administrators and help desks](https://github.com/pakoti/Awesome_Sysadmin)
- [nil0x42/awesome-hacker-note-taking: Awesome note-taking apps for hackers & pentesters !](https://github.com/nil0x42/awesome-hacker-note-taking) 
- [lorien/awesome-web-scraping: List of libraries, tools and APIs for web scraping and data processing.](https://github.com/lorien/awesome-web-scraping) 
- [goabstract/Awesome-Design-Tools: The best design tools and plugins for everything 👉](https://github.com/goabstract/Awesome-Design-Tools) 
- MORE FREE TOOLS:
	- [Free Cybersecurity Services & Tools | CISA](https://www.cisa.gov/resources-tools/resources/free-cybersecurity-services-and-tools) 
	- .
- Recon, Enumeration
	- [Discovering and Exploiting N-Days](https://cham423.notion.site/Discovering-and-Exploiting-N-Days-90cf191871eb4bc295cbcb7241c1bae2) 
	- [ProjectDiscovery - Democratize security, together](https://projectdiscovery.io/)
		- [ProjectDiscovery - Nuclei](https://projectdiscovery.io/nuclei) 
	- [Shodan Search Engine](https://www.shodan.io/)
- Traversal, Post-Exploitation
	- [Introducing GraphRunner: A Post-Exploitation Toolset for Microsoft 365 - Black Hills Information Security](https://www.blackhillsinfosec.com/introducing-graphrunner/) 
	- [BloodHoundAD/BloodHound: Six Degrees of Domain Admin](https://github.com/BloodHoundAD/BloodHound)
- Red Teaming
	- [danielmiessler/SecLists: SecLists is the security tester's companion. It's a collection of multiple types of lists used during security assessments, collected in one place. List types include usernames, passwords, URLs, sensitive data patterns, fuzzing payloads, web shells, and many more.](https://github.com/danielmiessler/SecLists) 
	- [redhuntlabs/Awesome-Asset-Discovery: List of Awesome Asset Discovery Resources](https://github.com/redhuntlabs/Awesome-Asset-Discovery) 
	- [yeyintminthuhtut/Awesome-Red-Teaming: List of Awesome Red Teaming Resources](https://github.com/yeyintminthuhtut/Awesome-Red-Teaming) 
	- [RistBS/Awesome-RedTeam-Cheatsheet: Red Team Cheatsheet in constant expansion.](https://github.com/RistBS/Awesome-RedTeam-Cheatsheet) 
	- [edoardottt/awesome-hacker-search-engines: A curated list of awesome search engines useful during Penetration testing, Vulnerability assessments, Red/Blue Team operations, Bug Bounty and more](https://github.com/edoardottt/awesome-hacker-search-engines) 
	- [shonker/Awesome-AV-EDR-XDR-Bypass: Awesome AV/EDR/XDR Bypass Tips](https://github.com/shonker/Awesome-AV-EDR-XDR-Bypass)
	- [tkmru/awesome-edr-bypass: Awesome EDR Bypass Resources For Ethical Hacking](https://github.com/tkmru/awesome-edr-bypass) 
	- 
