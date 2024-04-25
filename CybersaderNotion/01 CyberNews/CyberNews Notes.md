---
publish: true
---
# CyberNews Notes

# 7/24/2023

- The FCC Security Labeling
    - FCC IDs for smart devices
    - [U.S. preparing Cyber Trust Mark for more secure smart devices](https://www.bleepingcomputer.com/news/security/us-preparing-cyber-trust-mark-for-more-secure-smart-devices/)
- VirusTotal leak
    - DLP can be difficult when things like VT exist

# 7/18/2023

- Microsoft hack
    - [Microsoft lost its keys, and the government got hacked | TechCrunch](https://techcrunch.com/2023/07/17/microsoft-lost-keys-government-hacked/)
    - [How a Cloud Flaw Gave Chinese Spies a Key to Microsoft’s Kingdom | WIRED](https://www.wired.com/story/microsoft-cloud-attack-china-hackers/)
    - [Microsoft mitigates China-based threat actor Storm-0558 targeting of customer email | MSRC Blog | Microsoft Security Response Center](https://msrc.microsoft.com/blog/2023/07/microsoft-mitigates-china-based-threat-actor-storm-0558-targeting-of-customer-email/)
    - What:
        - Microsoft got hacked.  A signing key was compromised that allowed attackers to create their own access tokens.
    - How:
        - Some theories —
            - Microsoft isn’t saying how the key was obtained
            - A - vuln in O365 that allowed attackers to get a key
            - B - compromise of internal microsoft resources (phising attack, etc).  compromise of the cloud service
            - C - used an account to create other certificates (somehow)
            - D - freckin GitHub
        - (John) It sounds like, conspiratorially, that we might’ve been in the Chinese networks, through the NSA, NRO, FBI, etc.., then they contacted Microsoft.  BILL BILL caught them haha *points to state department*.
        - US government detected weird mail access logs…apparently
    - When:
        - This wasn’t detected by Microsoft but rather by the state department
        - June 16th
    - More:
        - People probably want to do audits with their logs, so they will have to put something out soon
        - Microsoft will contact people who may have been affected, but they aren’t saying much
- Why do logs cost extra tiers on products lol?
    - it’s stupid.  this is a necessary commodity
    - we have to push back to get logs and choose platforms with better logging
    - the problem is that logs require computation and everyone is stingy with cloud resources and making money off it

# 7/6/2023

- [Twitter's bot spam keeps getting worse — it's about porn this time](https://www.bleepingcomputer.com/news/security/twitters-bot-spam-keeps-getting-worse-its-about-porn-this-time/)
    - Lots of bots spamming messages and likes on Twitter
    - They rate-limited users and new users the most, but this is still a game of whack-a-mole

# 7/3/2023

- [Why Malware Crypting Services Deserve More Scrutiny – Krebs on Security](https://krebsonsecurity.com/2023/06/why-malware-crypting-services-deserve-more-scrutiny/)
    - Malware-based cybercrime organizations use crypting services with their malware (usually 3rd party) to hide their malware from AV
    - The most popular service is Cryptor[.]biz
        - long-running crypting service trusted by biggest names in cybercrime
        - Adversarial game that requires lost of labor
    - Why crypting services should be a target for good guys, the NSA, etc.
        - Crypting services examine all types of malware before their new malware is set into the wild.  They have LOTS of intelligence
        - Good crypting services usually have direct and frequent contact with some of the world’s best malware authors
- [SMS Phishers Harvested Phone Numbers, Shipment Data from UPS Tracking Tool – Krebs on Security](https://krebsonsecurity.com/2023/06/sms-phishers-harvested-phone-numbers-shipment-data-from-ups-tracking-tool/)
    - Any tool that allows to traversal that uses and operates on PII with no authentication is usually a bad idea
    - Companies should be careful in the same manner on authenticating for PII with their APIs when it involves GET requests to supposedly public information
    - Web scraping is way harder than an API
- [U.K. Cyber Thug “PlugwalkJoe” Gets 5 Years in Prison – Krebs on Security](https://krebsonsecurity.com/2023/06/u-k-cyber-thug-plugwalkjoe-gets-5-years-in-prison/)
    - SIM swapping is a simple attack that involves tricking or bribing companies for SIM swaps
        - This allows interception of account resets, MFA, and more which can be used to gain access to financial accounts or accounts with data that can be extorted against the victim
    - The lesson: get burner phones or figure out how to get rid of the weak link of phone numbers
- [Brave Browser boosts privacy with new local resources restrictions](https://www.bleepingcomputer.com/news/security/brave-browser-boosts-privacy-with-new-local-resources-restrictions/)
    - It’s common for websites and local web apps to request access to local resources to fingerprint users or collect info about what software runs on the user’s machine.
    - Most browsers allows websites local resource access just as easily as other resources with just the browser.
    - This practice is typically documented on websites:
        - examples - eBay, Citibank, Chick-fil-A, etc.
        - usually anti-fraud scripts
    - Safari blocks these requests even from secure public websites as a side-effect of its security measures, rather than on purpose
    - Brave is introducing a localhost access permission for granular control of this with websites
    - "Brave is the only browser that will block requests to localhost resources from both secure and insecure public sites, while still maintaining a compatibility path for sites that users trust," pledges the Brave team.
    - Brave will maintain allow-lists for trusted sites that can ask for this permission
- [New Mockingjay process injection technique evades EDR detection](https://www.bleepingcomputer.com/news/security/new-mockingjay-process-injection-technique-evades-edr-detection/)
    - Process injection is looked after by OS companies, so they are always watching for these techniques, but it’s still a game of cat and mouse and sometimes dependent on configuration
- [Inside Threat Actors: Dark Web Forums vs. Illicit Telegram Communities](https://www.bleepingcomputer.com/news/security/inside-threat-actors-dark-web-forums-vs-illicit-telegram-communities/)
    -