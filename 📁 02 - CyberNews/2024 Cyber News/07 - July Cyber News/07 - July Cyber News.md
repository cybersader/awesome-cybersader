
- [🔴 July 24's Top Cyber News NOW! - Ep 671](https://www.youtube.com/watch?v=ounD1m7hClU)
    - Don't just stop using the tool at work. Decommision it.  

- [BHIS - Talkin' Bout [infosec] News 2024-07-22](https://www.youtube.com/watch?v=252-y4UpLOI)
    - Crowdstrike Outage
        - Southwest was using older tech and is benefiting, but this focuses on the wrong problem.
    - Dog robot made by DHS to deactivate IoT booby traps before raids
    - Law enforcement in EU and US are cracking down on ransomware groups more - or at least more pulicly
        - 17 year olds with bad OPSEC going to prison for millions of dollars in wire fraud and crimes
    
- [🔴July 22's Top Cyber News NOW! - Ep 669](https://www.youtube.com/watch?v=hojkZub3A5M)
    - Crowdstrike Outage also hit O365 PCs
        - They had to use CLIs or "attempt" the 20 reboots trick which rarely works
    - Remcos RAT Phishing with Crowdstrike Incident
        - Hackers are using the incident to get people to download the RAT
    - Known Exploited Vulnerabilities
        - Exploits that are being used right now
        - Included Magento, VMware Vcenter, etc.

- [🔴July 15's Top Cyber News NOW! - Ep 664
](https://www.youtube.com/watch?v=5tUbjr7Wt68)
    - Ransomhub Ransomware
        - A trash IS program - don't evaluate TTPs. 
        - Focus on protecting from the general threats - EDR, TTX, education, and MFA.
    - PII lets you say "this data is that person."
    - https://www.youtube.com/live/5tUbjr7Wt68?si=1pLJmAtWxmHvxLQD&t=810 - #cyberMeme
    - 

- [BHIS - Talkin' Bout [infosec] News 2024-07-08
](https://www.youtube.com/watch?v=tBRZNE3guR4)
    - Story # 1b: National Crime Agency leads international operation to degrade illegal versions of Cobalt Strike
        - Europol took out a bunch of Cobalt Strike servers
        - Cobalt Strike is easy to find artifacts for - there are methods. 
        - If they aren't using proxies and have bad OPSEC, then it can be easy to find those malicious servers and their "mothership."
        - Looks like ISP-level blackholing because law enforcement were involved
    - RockYou2024
        - Look like a bunch of junk, hashes, duplicates, and lack of thorough cleaning that is worthy to be called "RockYou2024."
        - You really just need to check your environment for password reuse, DLP for password hygiene and using weird sources, etc.
    - Story # 3: Ticketmaster Breach: ShinyHunters Leak 440K Taylor Swift Eras Tour Ticket Data
        - https://hackread.com/ticketmaster-breach-shinyhunters-leak-taylor-swift-eras-tour-tickets/
        - Exfil'd 22 billion $ worth of data supposedly
        - LiveNation was gonna pay 1 million to shush
        - ShinyHunters realized they had Taylor Swift ticket data and upped the price to $8 million.
        - The ShinyHunters hackers extorted them for $1 million with a $7 million processing fee #cyberMeme #dataBreach
    - Story # 4: US Supreme Court ruling will likely cause cyber regulation chaos
        - https://www.csoonline.com/article/2512955/us-supreme-court-ruling-will-likely-cause-cyber-regulation-chaos.html
        - Regulatory earthquake
        - Supreme court overturned the "Chevron Deference or Chevron Doctrine"
        - The court case was called "Loper Bright Enterprises v. Raimondo"
        - Chevron instructed lower courts to defer to regulatory agencies in cases requiring interpretation of congressional intent.
        - People are asking "what will happen to FTC and FCC regulations?
        - There is binding precedence on what happened before, but it opens up challenges to cybersecurity regulations.
        - Regulatory agencies can still give their interpretations of congress laws, but now judges can have disgression if they believe the regulatory agency is correct or not.
        - We will see more cases around data breach reporting requirements, AI regulations, etc.
        - Things are subject to judicial review again if there is a "lack of clarity" in laws passed by Congress.
        - Laws don't have to spell out what agencies can do, but there has to be definitions of theses agencies' mandates.
        - We've been banging the drum and inching forward with a disciplined approach and now we are on shaky ground again. Sometimes we have to beat people over the head with regulations. This can cause GRC to lose a bit of its backing.
        - These agencies are appointed and not elected and subject to weird changes due to party changes. This is forcing Congress to delegate authority into the law. If Congress gets this delegation encoded into law, then it could help. In the short term, it will be a mess.
        - Going forward, cyber regulations may have challenges. The SEC regulations for 4 days on cybersecurity materiality has people upset, so some of these might go up to the courts.
        - Judges can now simply have more disgression on whether agency interpretations of laws are correct or not.
        - "Lack of clarity" on a law is an important delineation. Agencies that don't relate to security or technology will be moreso in the firing line. 
        - The interpretive authority used to be regulatory agencies, but now it won't always be the case. This can be good, but it can also be bad.
        - Congress should realistically delegate authority to agencies
    - 00:43:08 - Story # 5: California Advances Unique Safety Regulations for AI Companies Despite Tech Firm opposition
        - https://www.bankinfosecurity.com/openai-did-disclose-2023-breach-to-feds-public-report-a-25713
        - 

- [🔴July 8's Top Cyber News NOW! - Ep 659](https://www.youtube.com/watch?v=PJ9NOHabfaQ)
    - ISACs can be noisy
    - OpenAI Breach
        - New York Times reported breach at OpenAI for employee conversations.
        - Unless you are cleared by legal, don't comment or do interviews
        - Be careful doing security talks about stuff you did at work. Get it cleared first.
        - OpenAI doesn't have to report the breach because it's private
        - There's diminishing returns on cybersecurity investment
        - University of Maryland (Lawson) did an analysis. Around 37% you get diminishing returns on cyber investment.
        - You will always have residual risk - #grcmafia
        - 

- [BHIS - Talkin' Bout [infosec] News 2024-07-01
](https://www.youtube.com/watch?v=eUzASE1389A)
    - Teamviewer APT 
        - Likely hit by Russia
        - Lots of healthcare companies use Teamviewer for remote admin
        - Healthcare IT is dramatically underfunded
        - The year will be rough with this exploit and the types of companies using it
        - Use AC Hunter and other tech to find RMM tools being used in your environment
    - Supreme court looking at Florida and Texas state laws on social media and moderation
        - Should the intersection between free speech and social media have a stoplight?  These platforms should be treated like a business and restricted from removing posts?
        - Platforms are pushing back on the states by saying they are being forced to push speech that they don't want to disseminate.  Supreme court vacated the decision.  Lower court apparently didn't do a proper assessment of the 1st Amendment issue.
    - [CISA: Most critical open source projects not using memory safe code](https://www.bleepingcomputer.com/news/security/cisa-most-critical-open-source-projects-not-using-memory-safe-code/)
        - This is a WASTE OF TIME
        - You might as well say "code written by humans has vulns"
        - People say to use a certain language because of memory safety and garbage collection
        - CISA needs to focus on valuable topics like companies not patching
        - "This reeks of theoryware from a bunch of people with PhDs who've never been in a real environment."
        - They can do security by design and do research, but they need to peddle and do outreach on the important stuff (MFA, social engineering, business logic, vulns and patching).
        - You have to go out of your way to get these vulns into your environments, so this shouldn't be an "initiative" from CISA.