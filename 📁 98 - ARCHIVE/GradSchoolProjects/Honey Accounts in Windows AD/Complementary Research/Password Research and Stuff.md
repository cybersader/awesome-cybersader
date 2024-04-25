---
publish: true
---
# Researchers and Blogs
- [Troy Hunt: Have I Been Pwned - Troy Hunt](https://www.troyhunt.com/tag/have-i-been-pwned-3f/) 
	- One of the key projects I'm involved in today is [Have I Been Pwned](https://haveibeenpwned.com/?ref=troyhunt.com) (HIBP), a free service that aggregates data breaches and helps people establish if they've been impacted by malicious activity on the web. As well as being a useful service for the community, HIBP has given me an avenue to ship code that runs at scale on Microsoft's Azure cloud platform, one of the best ways we have of standing up services on the web today.
# Tools & Services
- [Have I Been Pwned: Check if your email has been compromised in a data breach](https://haveibeenpwned.com/) 
- [DeHashed — #FreeThePassword](https://dehashed.com/) 
# Wordlists, Dictionaries, Datasets
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
# Passwords & Wordlists Resarch
- [[2309.03384] Measuring Website Password Creation Policies At Scale](https://arxiv.org/abs/2309.03384) 
- [Future Internet | Free Full-Text | A Systematic Survey of Multi-Factor Authentication for Cloud Infrastructure](https://www.mdpi.com/1999-5903/15/4/146) 
- [[1908.05901] Evaluating User Perception of Multi-Factor Authentication: A Systematic Review](https://arxiv.org/abs/1908.05901) 
- [Araña: Discovering and Characterizing Password Guessing Attacks in Practice | USENIX](https://www.usenix.org/conference/usenixsecurity23/presentation/islam)
- [[2309.03384] Measuring Website Password Creation Policies At Scale](https://arxiv.org/abs/2309.03384) 
- [Security and Scalability of E-Commerce Website by OWASP threats. | IEEE Conference Publication | IEEE Xplore](https://ieeexplore.ieee.org/abstract/document/10111955) 
- [A Cognitive Deception Model for Generating Fake Documents to Curb Data Exfiltration in Networks During Cyber-Attacks | IEEE Journals & Magazine | IEEE Xplore](https://ieeexplore.ieee.org/abstract/document/9755446) 
- [Birthday, Name and Bifacial-security: Understanding Passwords of Chinese Web Users | USENIX](https://www.usenix.org/conference/usenixsecurity19/presentation/wang-ding) 
- [An Empirical Analysis on the Usability and Security of Passwords | IEEE Conference Publication | IEEE Xplore](https://ieeexplore.ieee.org/abstract/document/9191658) 
- ['Passwords Keep Me Safe' – Understanding What Children Think about Passwords | USENIX](https://www.usenix.org/conference/usenixsecurity21/presentation/theofanos) 
- [A Two-Decade Retrospective Analysis of a University's Vulnerability to Attacks Exploiting Reused Passwords | USENIX](https://www.usenix.org/conference/usenixsecurity23/presentation/nisenoff-retrospective) 
- [Password Guessing Based on Semantic Analysis and Neural Networks | SpringerLink](https://link.springer.com/chapter/10.1007/978-981-13-5913-2_6) 
- [Advances in Password Recovery Using Generative Deep Learning Techniques | SpringerLink](https://link.springer.com/chapter/10.1007/978-3-030-86365-4_2) 
- [Modeling Password Guessability via Variational Auto-Encoder | IEEE Conference Publication | IEEE Xplore](https://ieeexplore.ieee.org/abstract/document/9437859) 
- [No Single Silver Bullet: Measuring the Accuracy of Password Strength Meters | USENIX](https://www.usenix.org/conference/usenixsecurity23/presentation/wang-ding-silver-bullet)
## Wordlist Generation for Password Spraying
- https://www.horizon3.ai/the-unreasonable-effectiveness-of-password-spray/
	- NodeZero generates probable passwords to spray based on commonly known breached passwords, context-specific terms such as the company name or domain name, or a custom dictionary supplied by the user.
	- Attackers know that most companies have set up a password policy to enforce a minimum password length of 8 characters, password complexity rules (including lowercase, uppercase, digits, and special characters), and periodic rotation of passwords. Password complexity and rotation policies have ironically led users to creating more predictable passwords such as passwords starting with an uppercase letter, ending in 1!,, or containing seasons and years. NodeZero optimizes for these cases to maximize the likelihood of success.
	- In addition to spraying probable weak passwords, NodeZero also attempts to spray any passwords it finds organically during the course of a pentest, just like a real-world attacker would do. These are passwords that may be found through unintended data exposure or exploitation, and they may not necessarily be weak. This form of password spray is used to exploit password reuse across multiple accounts.
# Reports & Stats on Passwords
* [Password Statistics That Will Change Your Online Habits - Panda Security](https://www.pandasecurity.com/en/mediacenter/password-statistics/)
* [33 Password Statistics Small Businesses Should Know](https://smallbiztrends.com/2022/10/password-statistics.html)
* [awesome-annual-security-reports/Annual Security Reports/2022/Verizon-Data-Breach-Investigations-Report-2022.pdf at main · jacobdjwilson/awesome-annual-security-reports](https://github.com/jacobdjwilson/awesome-annual-security-reports/blob/main/Annual%20Security%20Reports/2022/Verizon-Data-Breach-Investigations-Report-2022.pdf)
* [Are Your Passwords in the Green?](https://www.hivesystems.io/blog/are-your-passwords-in-the-green?))
* [jacobdjwilson/awesome-annual-security-reports: A curated list of annual cyber security reports](https://github.com/jacobdjwilson/awesome-annual-security-reports)
* [LMI0828a-IAM-LastPass-State-of-the-Password-Report.pdf](https://lp-cdn.lastpass.com/lporcamedia/document-library/lastpass/pdf/en/LMI0828a-IAM-LastPass-State-of-the-Password-Report.pdf)
* [Yubico report 2020 Final 7](https://www.nass.org/sites/default/files/2020-04/Yubico%20Report%20Ponemon%202020%20State%20of%20Password%20and%20Authentication%20Security%20Behaviors.pdf)
* [Why people (don't) use password managers effectively | USENIX](https://www.usenix.org/conference/soups2019/presentation/pearman)
* [The 2021 State of the Auth Report: 2FA Climbs, While Password Managers and Biometrics Trend | Duo Security](https://duo.com/blog/the-2021-state-of-the-auth-report-2fa-climbs-password-managers-biometrics-trend)
* [2022 State of Passwordless Security Report | HYPR](https://get.hypr.com/2022-state-of-passwordless-security)
* [2019 Global Password Security Report - LastPass](https://www.lastpass.com/state-of-the-password/global-password-security-report-2019)
* [Password Manager and Vault 2021 Annual Report: Usage, Awareness, and Market Size | Security.org](https://www.security.org/digital-safety/password-manager-annual-report/2021/)
* [The top 5 things the 2022 Weak Password Report means for IT security](https://www.bleepingcomputer.com/news/security/the-top-5-things-the-2022-weak-password-report-means-for-it-security/)
* [annual-global-password-security-report-for-educational-institutions](https://www.lastpass.com/resources/ebook/annual-global-password-security-report-for-educational-institutions)
* [Password Benchmark Report](https://www.lastpass.com/resources/reports/password-benchmark-report)
* [Top 200 Most Common Passwords List | NordPass](https://nordpass.com/most-common-passwords-list/)
* [2023 Annual Identity Exposure Report | SpyCloud](https://spycloud.com/resource/2023-annual-identity-exposure-report/)
* [Specops-Software-Weak-Pwd-report-2023.pdf](https://specopssoft.com/wp-content/uploads/2023/06/Specops-Software-Weak-Pwd-report-2023.pdf)
# Password Spray 
- searches:
	- password spray site:usenix.org 
	- password spray time series anomaly detection
	- password spray time series anomaly detection UEBA behavior user 
	- password spray UEBA behavior user 

- [Multi-Factor Key Derivation Function (MFKDF) for Fast, Flexible, Secure, & Practical Key Management | USENIX](https://www.usenix.org/conference/usenixsecurity23/presentation/nair-mfkdf)
	- However, the recent surge in **password**-based attacks like credential stuffing and **password** **spraying** has highlighted the critical weakness of **passwords** as a sole authentication factor.
- [Gossamer: Securely Measuring Password-based Logins | USENIX](https://www.usenix.org/conference/usenixsecurity22/presentation/sanusi-bohuk)
	- December 22nd, 2020, a total of 12 unique IPs belonging to Digital Ocean Cloud \[1\] carried out a high volume **password** **spraying** attack by targeting 76 K unique users with 169 K
	- "a new login service instrumentation tool called Gossamer. It securely records information about login requests, including certain carefully chosen statistics about the passwords used in the requests"
- [Don't Forget the Stuffing! Revisiting the Security Impact of Typo-Tolerant Password Authentication | Proceedings of the 2021 ACM SIGSAC Conference on Computer and Communications Security](https://dl.acm.org/doi/abs/10.1145/3460120.3484791) 
	- In this paper, we revisit the security impact of typo-tolerant password authentication. We observe that the existing security analysis of such systems considers only password spraying attacks.
- [Pump Up Password Security! Evaluating and Enhancing Risk-Based Authentication on a Real-World Large-Scale Online Service | ACM Transactions on Privacy and Security](https://dl.acm.org/doi/full/10.1145/3546069) 
	- We expect that users with a high number of failed login attempts are likely being targeted in credential stuffing or password spraying attacks.
- [A Two-Decade Retrospective Analysis of a University's Vulnerability to Attacks Exploiting Reused Passwords | USENIX](https://www.usenix.org/conference/usenixsecurity23/presentation/nisenoff-retrospective)
	- Credential-guessing attacks often exploit passwords that were reused across a user's online accounts. To learn how organizations can better protect users, we retrospectively analyzed our university's vulnerability to credential-guessing attacks across twenty years. Given a list of university usernames, we searched for matches in both data breaches from hundreds of websites and a dozen large compilations of breaches. After cracking hashed passwords and tweaking guesses, we successfully guessed passwords for 32.0% of accounts matched to a university email address in a data breach, as well as 6.5% of accounts where the username (but not necessarily the domain) matched. Many of these accounts remained vulnerable for years after the breached data was leaked, and passwords found verbatim in breaches were nearly four times as likely to have been exploited (i.e., suspicious account activity was observed) than tweaked guesses. Over 70 different data breaches and various username-matching strategies bootstrapped correct guesses. In surveys of 40 users whose passwords we guessed, many users were unaware of the risks to their university account or that their credentials had been breached. This analysis of password reuse at our university provides pragmatic advice for organizations to protect accounts.
# Random Unrelated
- [Don't Forget the Stuffing! Revisiting the Security Impact of Typo-Tolerant Password Authentication | Proceedings of the 2021 ACM SIGSAC Conference on Computer and Communications Security](https://dl.acm.org/doi/abs/10.1145/3460120.3484791) 
