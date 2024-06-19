---
aliases: 
tags:
  - AntisyphonTraining
  - BHIS
  - Summit
  - Conference
publish: true
date created: Wednesday, June 19th 2024, 10:56 am
date modified: Wednesday, June 19th 2024, 4:50 pm
---

2024-06-19

# Main Takeaways
- 
# Dumpster Fires: 3 Things About IR I Learned By Being a Firefighter
- 02:59
- Catherine Ullman

- What is IR?
	- Addressing network events
	- Proactive or reactive
	- Technical components to analyze and contain an incident
- Goals
	- Ensure awareness of incidents
	- Stop attacker
	- Minimize damage
- Firefighting cycle is about the same
	- ![](_attachments/IR%20Summit%202024/IMG-20240619171921341.png)
- ICS (incident command system) - approach to command and control in firefighting
	- ![](_attachments/IR%20Summit%202024/IMG-20240619171921408.png)

- Breakdown
	- IC - incident goals and operational objectives
	- Ops - strategy & tactics - approach and actions
	- Logistics
	- Planning

- Methodology
	- IR
		- Prep
		- Identification
		- Containment
		- Eradication
		- Recovery
		- Lessons learned
	- Firefighting
		- Mitigation
		- Pre
		- Response
		- Recovery
		- Lessons Learned
- Misconceptions
	- IR
		- Every event is an incident
			- Treat them as incidents, but they aren't
		- Every incident is handled the same way
			- No
			- Depends on results
		- Every incident is quickly solved
			- Some can take months or years
		- Every person on an IR team needs to be a rock star
			- Some just take notes
		- Accurate attribution is always possible
			- Sometimes it's just an IP 
	- Firefighting
		- Firefighters are always paid
		- Always big tough dudes
		- Fires are all fought the same way
		- Every fire goes down quick
		- Always a full-time job

- Similarities
	- Focus on immediate issue first, later find the cause
	- Triage used to determine best course of action
	- Cyclic in nature starting w/docs/preplans
	- Require thinking innovatively
	- Often involves outside entities
	- Sometimes have inside teams

- Factories usually have a fire suppression team

- Opportunities 
	- Patience - take a moment to determine whether there actually is an incident and/or what the best course of action is to take can have significant impact on whether or not a good outcome is achieved.
	- Slow is fast - be methodical

- IR
	- Chegg had a breach and students may have been using the same creds for Chegg that they use for the school.
	- Take a minute to realize what's really going on.
	- Them getting breached was not us.

- Is the scene safe?
	- Malware or just misconfig?
	- Blind hardware acquisition?
	- Ransomware or just phishing?
	- Do a 360

- Accountability 
	- With IR, know what people are doing.
	- Make sure there's no interference
	- Approach this from COC (chain of custody)
# The Million Dollar CEO Fraud: Anatomy of a BEC
- Damien Miller-McAndrews
- 02:30

- High-Severity BEC with Executive Account
## Discovery of BEC
- Was doing an audit for a customer
- They use CIS baselines
- Audits are tedious and mundane sometime, but someone has to do
- Was working through audit backlog for past 30 or 40 days
- Started doing a threat hunt

- Checked common IOCs in M365
	- Sus sign-ins
	- Open in Excel
	- Filter out known good IPs in cities
	- Left with one account - had strange sign-ins with impossible travel
	- IP lookup tools showed sus proxy server
- Talked to employee about sus behavior
	- Said the behavior was not suspected
	- Got files accessed
- Created RCA
	- Discovery, Remediation, and What Happened

## Investigation
- The user was the CEO of the company
- There was access to executive Sharepoint site - checked job title in Azure
- Requested 90-day Message Trace (3168 records)
- 90-day UAL - 17441 Records
- Had only investigated a dozen BECs
- Started using HAWK forensic tool for O365
	- Got 90 day Exchange audit log
	- Used API to automate IP to locations
- Separate known good from sus IPs
- Left with pile of information

- Timeline analysis
	- 2022 initial access
	- Defender alert about malicious URL click
	- MS spam filtering is not great
	- 2023 discovery
	- Inbox rule was created to redirect email from finance company
	- Actor sent request to add signer to Finance company
	- Threat actor responds and CCs "new treasurer" with custom domain name for fake independent CPA
	- Finance company responded
	- The inbox rule kept CEO from seeing all this
	- Finance company had problem with document
	- Threat actor had typosquat domain
	- More inbox rules created
	- Threat actor emailed finance company about when new signer would be added
	- NBIN started requesting more information
	- Fake T.A provided
	- New fake signer was added in under a month
	- Threat actor initiated wire transfer to coordinate with fake treasurer
	- This initiated almost 1 million US
	- More transfers to Hong Kong with over a million is USD
	- Let them know that two wire transfers had been made
	- He told him to call financial company to cancel the transfers via the bank
## Epilogue
- Created incident RCA document and got law enforcement involved
- Financial company did not follow internal process for adding signers or making huge transfers
## IOCs
- AUth irregularities
- Email rules
- Spam email sending
- Unexpected inbox activity
- Sensitive access
- Oauth application usage
	- Excif and EM client can do stuff with mailboxes?

## BEC Defense
- ![](_attachments/IR%20Summit%202024/IMG-20240619171921490.png)
- Blumira Cloud SIEM is completely free?
## Takeaways
- MFA does not stop hackers completely when social engineering is involved.  EvilNginx websites that grab tokens, but redirect to legit websites
- Lock down enrollment for MDM and use MDM for mobile devices and conditional access policies
# Navigating the Shadows: IR in the Age of Dark Web Tactics
- Matthew Maynard
- 01:59

- How to get actionable intelligence from threat intel
- Top Dark Web Tactics That Affect Us
	- PHAAS - phishing as a service
	- RAAS - ransomware as a service
	- MAAS - malware as a service

## Phishing as a service
- EvilProxy
- Sales pitch - Bot protection, Virtualization Detection, Automation Detection, and multi streams
- You can do this for 100s
- EvilProxy Technical
	- steal auth tokens to bypass MFA
	- How it works:
		- Phishing site proxies request to actual website
		- Phishing site proxies to MFA screen
	- Detection methods:
		- Tech
			- MS Defender for O365
			- Azure AD ID Protection
			- Sentinel
		- Correlation
			- Sus inbox manipulation rule
			- impossible travel

- Evilginx and GoPhish - Purple teaming can help you when you have something that's high risk and need to confirm defenses

## Malware as a service
- Stealers are super popular right now
- Redline stealer
	- distributed as cracked games and free software
- InfoStealers are popular for initial compromise

- Redline Stealer detection
	- Invokes PowerShell commands
	- Visual Basic Command-Line Compiler
	- Creates scheduled task
	- Windows Defender exclusion criteria to evade detection by Windows Defender

- Redline stealer detection
	- Great GUI for attackers
	- Steals from browsers

## Ransomware as a service
- Data extortion is paired with it every time now
- Ransomware detection
	- EDR
	- DR plan
	- RTO - recovery time objective
	- RPO - recovery point objective
	- Offsite backups - Cloud etc.
- Detection of scanning and scripts
	- detect things like OpenVAS, Nessus, Netscan, Sharefinder, etc.
- ![](_attachments/IR%20Summit%202024/IMG-20240619171921563.png)
- 
# Demystifying AWS IR: A Practical Perspective
- 01:30
- Monty Shyama

- Has a good bit of AWS IR experience
- Logs and Monitors - CloudTrail, S3 access logs, and VPC Flow Logs
- Billing Activity - look for surges here
- AWS Outreach - emails from AWS Support
- Threat Intel - event correlation with 3rd party feeds
# Dungeons & Dragons: The security tool you didn't know you needed
- [Backdoors & Breaches](../../../📁%2004%20-%20Organizational%20Cyber/Game-Based%20Tabletops/Backdoors%20&%20Breaches/Backdoors%20&%20Breaches.md) 
- Klaus Agnoletti
- 12:59

- InfoSec since 2004
- Used to be InfoSec Architect

- Agenda
	- We like games
	- Immersive game
	- HackBack - role playing game framework for IR and other cyber topics

- Game Based Learning 101
	- Playing games to learn
	- Not gamification,but better

- The problem with training now
	- Class-based
	- Computer based
	- in IR, it's tabletops

- Use tabletops for IR
	- We don't care about the abstractions and technology, but how we will actually react and decisions

- Tabletops 101: what and why
	- Build muscle memory on incident handling
	- Tabletops (TTX)

- Traditional IR TTX is boring
	- Participants don't open up
	- != reality and not honest
	- Egos clashing
	- Most important:
		- no focus
		- no engagement
		- fun is taboo

- Instant feedback can be great

- Game-Based Learning
	- There's stats on this
	- Most studies in a sample reported analog GBL as an effective pedagogical tool with impact on learning, cognitive, and psychological levels.
		- science says this is a good thing
	- "Fun is seriousness business" - it's fun playing games
	- Our brains are wired for learning with others
		- Games allow us to use our minds together
		- To be connected requires engagement

- Why Role Playing Games
	- D&D and its cousins are played in an inviting, encouraging, compassionate, and intellectually engaging environment.  Play opens the door to truly amazing possibilities for learning.

- Roleplaying is immersive
	- You forget ego
	- Empathy
	- Lifelike situation

- HackBack
	- General framework for simulating situations
	- Open source soonish
	- [Hackback Gaming | Incident Response Tabletops](https://www.hackbackgaming.com/)

- Application of HackBack
	- De-abstractify
		- make abstract content more concrete
	- Teaching non-techies
	- Teaching teamwork
	- Marketing events
	- Team events
	- Simulate real events

- HackBack IR Edition
	- Run by IM - Incident MAster
	- Team with broad skills
	- Each player plays a character
	- Actions = roll die
	- Open-ended scenarios

- Characters
	- Relatable characters
	- Made from scratch
	- Pre-made
	- Based on themselves and template

- Example scenario
	- Intro
		- Entire IT is in MS Azure
		- It's 16:50 Friday
		- Alert from MS DART
		- Admin logged in from Marketing
		- Sus: Employee is on vacation
		- What do you do?
		- Suggestions?

- To HackBack and beyond
	- Micro attack simulation - included for Purple Team with a layer of communication
	- Let's risk assess the Death Star
	- Two teams play together in real time
		- Attack/Defend
		- Co-op

- State of HackBack
	- We had plans, but it takes a lot of work
	- Ready for use with a bit of help

- Doing Compliance?
	- Play DND as a part of your job

- Other benefits
	- You're connecting concepts to concrete situations - requires imagination
## Some good goals for Role Play TTXs
- Must talk about some abstractive concepts that are modern or relevant
- Be creative
- Everyone must participate and be spicy
- Change role or personality in some cases
- Can't have one person do everything
- Present yourself as some type of character and even have modifiers on certain actions
- 
# IR as a Recovering Pentester
- 12:30
- Alper Basaran

- A few years ago
- How do you think ransomware got there
- Please just get rid of it
- Internal server was compromised but how?
- "Got in" used an exposed RDP in July
	- Got DC Admin in a few hours
	- Infiltrated the water control system of the city
	- Download city plans and projects
	- Replaced IBAN numbers of employees!
	- Used mail server for spear phishing other municipalities in Turkey
- There was a CSV for employee salaries
- PT to IR: Same
	- Understanding of attack vectors
		- Both roles require understanding of how attackers exploit vulnerabilities
	- Technical Skills
		- Strong technical skills
	- Analytical thinking
		- Think critically and analytically
		- Come up with theory, then try to disprove it
	- Security tools - used in both 
		- Nmap
		- Wireshark
		- Metasploit
	- Reporting and documentation
		- Document findings and explain clearly
		- Do it as you go
		- Defeat the institutional knowledge issue for succession planning purposes
	- Security Knowledge
		- Concept and protocol understanding
		- Understanding how protocols are exploiting
	- Continuous Learning
		- Ongoing education of trends, tools, and techniques
	- Collab and Comms
		- Work with other IT teams
- PR to IR: Different
	- Pentesting simulates attacks to uncover vulns
	- Offensive is different thinking than defensive sometimes - the defender's dilemma
	- Pentesting can improve IR, but IR handles the incidents.
	- Pentesting is driven by regulation to test systems. IR focuses on compliance by ensuring incidents are managed according to legal and regulatory standards 
- Transferable Skills
	- Attack vectors
- IR Process
	- Preparation - do threat modeling as pentester and IR.  
	- Identification - Better PT = Better SIEM
		- DeTTECT - use a framework to do detection gap analysis
# How I Started My Summer Vacation: Navigating My First Incident in the Cloud
- Josh Hankins
- 11:57
- Agenda: Threat Overview, Incident Timeline/PICERL
- PICERL - https://www.sans.org/media/score/504-incident-response-cycle.pdf
## Phases
- Incident/Event Preparedness
	- Incident went smoothly because he had relationships with the right people through 1-on-1s
	- Building rapport
	- Having comms plan set out
	- Use paper and pen
	- Assume it could go to the court of law
- Identification Phase
	- Threat Overview - got Twitter alert from researchers.  ChaosDb vuln from Wiz Team
	- ~7 or 8pm - "Automatic feed" from Twitter
	- Does this apply to my org?
	- Can be helpful to combine inventory with threat intel to match when an alert has the name of something in it.  You'll get lot of MS though.
	- Threat was tied to CosmosDb in Azure
	- Jupyter Notebook was related
	- He decided the threat applied to his organization
	- https://chaosdb.wiz.io/
		- ![](_attachments/IR%20Summit%202024/IMG-20240619171921640.gif)
	- Attacker can use Jupyter to get into CosmosDb and grab the primary keys.  
	- Vuln Overview
		- Impact?
			- Permanent data loss
			- Remote acct takeover - Cosmos DB Azure
			- Cred theft beyond Cosmos
		- Scope and Impact – ~9pm - 12:37am
			- Contact oncall
			- Oncall-Cloud
			- Oncall-Manager Data Engineering
			- Oncall-Cloud Database
			- What's the risk?
				- Key regen was HIGH risk
			- Couldn't get upper senior manager contacted
			- Key regenerated - they had the steps ironed out and started sharing
	- Scheduled lessons learned
- Lessons Learned
	- build relationships with CSPs and anything touching the cloud
	- Enhance alerting mechanisms
	- "Low tech" organic methods worked terms of: knowing threat scope beyond "just the cloud."
- Takeaways
	- CSP enabled feature to help customers, "good deed" went south (fixed quickly due to SSM*)
	- Adversary had months to leverage exploit
	- Cloud cred theft tied to Cosmos DB and Jupyter Notebook
	- Vendor recommended customers to Cosmos DB Primary Keys
	- Escalation process with ownership could be better
	- Shared responsibility model can sometimes go well and reduce workload during incident or slow things down
## Takeaways
- Treat everything as an incident until we have confirmation or degradation of the attack to an "event"
- Require owners for ALL Cloud Resources
# Panel Discussion - 11:00
- What's different in last 18 months - trends
	- EDR is much much better and prevalent, so we are looking at zero-days at the perimeters. VPNs are being neglected as the focus shifted to EDR.
	- Once you get off the EDR, a lot of companies don't have visibility.
	- It's easier to implement new tech than enabling a product that is already in place.
	- Turning to new tech is kind of like admitting you did it wrong.
	- Don't put all of your eggs into one basket.  Don't just throw a WAF in front of your applications.
	- We are moving into XDR more
	- More government involvement for breach notification and other recommendations.  Lots of opaque breaches where the government is paying attention. Courts are looking at concept of privilege between IR providers and company. Get into operational and strategic discussions to understand the technical level of these issues. There is going to be more scrutiny.
	- With B&B, it feels like they need to do 1 run with tech and 1 run with mgmt.  We need to get these groups in the same room together.  A lot of management has disdain for tech people, but they need to be working together.
	- The technical side will go stale real quick.  Process for evidence acquisition and pivoting into systems (literally mentioned).  Get 2 hours out of everyone's schedule to have a comprehensive tabletop of time or several a year.
- The 3 things you wished your IR companies had before you got there
	- Alissa
		- Asset inventory - PLZ.  This is a show stopper.
	- Derek Banks
		- Data and log retention.
		- Set default log size for security logs more than the default, so that you can actually see what the heck happened.
	- Troy Wojewoda
		- Network drawing and topology
		- "We have one, but we need it updated" - takes them days
	- Other stuff
		- Consolidate M365 into offline place so you have more than 90 days
		- You probably aren't storing enough of what you need for long enough
		- Network logging - "was data exfiltrated?" Network and endpoint logging are very different.  IP vs hostname.  You need to correlate network and host traffic (Zeek to internal network.)  This can be pretty manual.  There's overlap space between clients, so it's hard
- Endpoint (aimed at Alissa)
	- New operating systems bring webcasts about "what's new" with forensics and security
	- Is Windows 11 new in some way with caveats?
	- SRUM - system resource monitor - sees how much data is moving out
	- Recall brings some interesting possibilities
	- Proving data was there is hard
- IR problems and proactive testing with Atomic Red Team
	- Organizations only develop plans when they're punched in the face
	- If you stay ready, then you won't have to get ready
	- Atomic Red Team - threat emulation from Red Canary.  It resembles what happens on endpoints with threats.
	- Atomic Red Team can be used to emulate new techniques, then you can look at evidence sources for endpoint to map.
	- Common technique is command interpreter.  You won't know what to look for till you try.  Pull in Sysmon and your other data sources, and in 15 minutes, you can look from both sides of the equation
	- ART allows you to take Palo Alto and threat reports for annual reports and start running emulation with new techniques
- Incident prep
	- We still see group policy preference files (GPP) instant win
	- Don't boil the ocean for everything. 
	- Be in the place and test for concrete things.
	- SSH.exe introduced in 2019 - superpower for pentesters.
	- Know your inventory and what's possible.
	- It can be abused (LOTL), but hackers bring their own tools too.  Attackers are all different.
	- You don't have to use malware to do bad.  TeamViewer is likely still the most common C2 route.
	- "How would we have detected this?"  You need the proper logs.
	- It's basically identity and you just need creds when it comes to living off the land (LOTL)
- Is there a developer and vendor complex
	- Are vendors controlling everything?
	- DNS over HTTPS - Browsers: "don't worry we've got the security for you" 🤨
	- Ads are a trainwreck - try to shut them down, but YouTube won't work and lots of other things 
	- Cloud-based email is a good thing, but MS had a serious flaw where actors got access to tenets (cloud 0 day)
	- Small companies should move to cloud email
	- It's your fault when your on-prem Exchange gets wrecked.  It's easier to rely on cloud.  A benefit of cloud is that you CAN point your finger sometimes.  
	- There's lots of vacant corporate space and we are going to feel it in cyber
	- It's easy to point your finger to SaaS and offload the legal liability, but it highlights the supply chain and 3rd party side of things.
	- Risk management needs to do better app and vendor inventory and ask them the hard questions.
	- Covid was cooked up by Zoom and VPN companies #cyberMeme 
	- Cloud inventory is really hard.  What about all the 3rd party cloud apps...not easy. Risk profiles and breaches show you that it's hard to quantify and map. Lots of tech people realize they have Snowflake.  You need to have a vendor management and procurement process.
	- If you buy anything, then the systems team needs to buy it.  Systems pays for it (approved by accounting and management).
	- BYOA (bring your own AAS)
	- Lots of people use Torii?
- Recommendations for incidents and prep in the next week
	- Gerard Johansen
		- Sit down and look at IR playbooks and frameworks
		- Think of worst case and if these are effective
		- Templates for IR? ChatGPT 😆. Planning is indispensable even though the plans may be useless.
	- Alissa Torres
		- Lots of people build wishlists for PPTs, but...
		- Teams fight political battles - get me data or viz into this
		- Build a wishlist for access and political obstacles
		- The wishlist is for CYA
	- Troy Wokewoda
		- Take a look at stack and telemetry
		- Is it configured correctly
		- Make sure the logs are actually there and can be obtained
		- What's a capability in tools we already have
	- Derek Banks
		- Don't be afraid of AI and LLMs.  Start using them.  
		- Don't ignore external surface area.
	- John Strand
		- Chill the heck out and learn how.
		- Learn how to not panic.
		- Don't crash out