---
publish: true
---
# Talkin’ Bout [Infosec] News - BlackHillsInfoSec

[TalkinBoutNews - TEMPLATE](Talkin%E2%80%99%20Bout%20%5BInfosec%5D%20News%20-%20BlackHillsInfoSec/TalkinBoutNews%20-%20TEMPLATE.md)

---

# TalkinBoutNews - 3/11/2024

## News - Ideas, Takeaways, Tangents

1. [Behind the doors of a Chinese hacking company, a sordid culture fueled by influence, alcohol and sex | AP News](https://apnews.com/article/chinese-hacking-leak-documents-surveillance-spying-6276e8662ddf6f2c1afbae994d8b3aa2) 
    1. The hackers say they’re “patriotic” with hacking, but really they’re just in it for moneys, wammins, and droogs.
    2. They have a lot of low level hackers and hate HR
    3. They give access to zero days
    4. “Bro this just sounds like a VC software company”
2. CISA was hacked, but they aren’t going to say exactly what happened.  They had to take some systems offline
    1. Better than someone piping up that they did the hack
    2. DoD and government has a lot of young people, GS3s, and 19 year olds drinking at night trying to make it through classes
    3. Govt has a hard time retaining talent because private sector pulls them away with $100k jobs
3. IC3 Release for FBI reporting
    1. personal data breaches were really high ~50k
    2. Investment fraud most damages technically - SBF (sam bankmen freid)
    3. When lockbit reports you to the SEC it falls into investment category 😆 
4. Qnap-related NAS vuln
    1. Don’t let NAS open up ports for UPnP
    2. NAS open ports and have self-hosted services
    3. Self-hosted is synonym for self-managed and unpatched (XD)
    4. Web admin interface usually exposed to internet

## BHIS Memes

- CISA drinking its own Kool-Aid
- Lil-NAS 😆

# TalkinBoutNews - 3/4/2024

## News - Ideas, Takeaways, Tangents

- Executive order to prevent bulk sensitive data access by other countries
    - Prevent the sale of data for sure
    - Class action lawsuit against MS explorer - collecting telemetry from users - judge dismissed the whole thing because Computer Fraud abuse act requires 5000 dollars damage against people
    - It’s hard to show the value of privacy when the damages are against interests and not as concrete.  The damages are hidden when it comes to privacy
    - Strava app was mapping out bases based on exercise data
- Leaky database exposing 2fa codes
    - log data plane and control plane events in the cloud
    - usually data plane is ignored
- Phishing op against ebay, vmware, and mcaffee
    - People are phishing with abandoned website domains because they are trusted by SPF records
    - 

## BHIS Memes

- 

# TalkinBoutNews - 2/28/2024

## News - Ideas, Takeaways, Tangents

1. Mr Cooper leak
    1. Is there pushback with vulnerability analysis during IR engagement? 
2. ConnectWise ScreenConnect
    1. 10 score?
    2. Great handling of the incident.  Told community what was going on.  Huntress and them built IOCs and Sigma rules in a day
    3. 

## BHIS Memes

- 

# TalkinBoutNews - 2/21/2024

## News - Ideas, Takeaways, Tangents

1. If it is a risk for business, then it doesn’t matter if it’s not production…it’s all production
    1. Hackers use non-prod to get to prod accounts
2. Bank of America
    1. You can’t build a checklist that covers everything, but you can prioritize
3. Internet Corp
    1. The guy we fired years ago left something on
    2. They were abusing their URL shield application to automatically redirect people using the service to malicious servers
4. Cisco 
    1. getting on the AI and restructuring train for investors
    2. stick to routing and switching bro  
    3. determination benefits estimated at 800 million for restructuring
    4. acquiring Splunk at 28 billion?
    5. these companies have lots of bloat
    6. bought Duo as well
5. Air Canada gave customer low price
    1. chatbot legal war
    2. $500 settlement…lol
6. FCC orders telecom to reports breaches within 30 days
    1. Start a data aggregation company that streams data
        1. always available to be blamed
        2. companies can use you as a scapegoat
        3. weaccepttherisk[.]xyz
        4. referral link from “we’re sorry” to credit monitoring then they get a kickback from credit card company
        5. opposite of notification canary
        6. 

## BHIS Memes

- Agile is just lazy
- it’s just the SaaS vendor and not our laziness with the excuse of moving fast
- GRC…it’s all just luck
- The best strategy…luck
- Don’t bring up other breaches with public comms
- There are innovators and there are acquirers
- Airliners have bad customer service
    - thinking about stacking seats
    - you’ll know if someone farts
- Rat bastard breach - selling data
- 

# TalkinBoutNews - 2/12/2024

## News - Ideas, Takeaways, Tangents

1. Crowdstrike superbowl ad
    1. they had layoffs too
    2. why are they marketing to normal people? - well they aren’t.  They are trying to inject themselves into everyone
2. AppSec is getting better because devs are using popular library for IAM.  However, lots of teams will still always have their own JSON and XML parsing and crypto.
3. Job board stuff
    1. People are posting fake job boards to get resumes and extract PII
    2. Job posting websites are also being web app hacked to get this data and sell it on dark web or telegram
    3. Transmitting SSNs
        1. who’s handling the data
        2. how are we securing this data?
        3. how are we sending it
        4. have the handlers had background checks?
        5. “over half of the time they’re like …. no we’re good”
    4. Companies will say “hey u need to be SOC 2 type 2”, but then ask you to violate that by sharing SSNs with people
4. 

## BHIS Memes

- 

# TalkinBoutNews - 2/6/2024

## News - Ideas, Takeaways, Tangents

1. 2023 Thanksgiving Cloudflare Breach
    1. great writeup
    2. triaged and forensics on 4800 devices? How? What you mean?
    3. 2 million Jira tickets
    4. “nation state actors” detected on hosted Atlassian server and code repos, but nothing crazy
    5. took 10 days for complete investigation and remediation
    6. Credential rotation and getting rid of sticky persistence
    7. They rolled ALL of the creds
    8. Great job CF for execution but 0 for style
2. AnyDesk
    1. To date, “we have no evidence” that end user devices have been affected.  Definitely written by lawyers
    2. Without logs, you don’t have evidence
    3. Why you never had a pentest
        1. if we don’t know about it, then we aren’t liable
        2. Lawyer sent that same thing in an email
        3. If you commit that to an email, then you can be criminally negligent
    4. revoked certs, so they probably had security relate certificates.  Crown jewels of SaaS companies
    5. Code signing certificates - they are remediating by revoking code signing certs and getting new one
    6. Revoke and reset all passwords, but everyone reset their binaries.  Might be injected malware with code signing certs.  Solarwind style attack.
3. 

## BHIS Memes

- 

# TalkinBoutNews - 11/7/2023

## News - Ideas, Takeaways, Tangents

1. Geez Okta third hack in a row.  
    1. DON’T allow people to log into Google instead of through Okta
    2. There’s lots of creds in the browser
2. 4 dozen countries declared they won’t pay ransomware ransoms and HIPPA violations
    1. Sometimes paying a taking the fine from HIPPA is better than taking the hit
    2. “Don’t negotiate with terrorists” - it’s tough.  Firm refused to pay the ransom despite not exposing PHI and things like that.  Not paying ransom gets like 100k fine, but HIPPA compliance monitoring will cost a lot in the long run.  People who refuse to pay get beat up with fines and what not…it’s a lot more enticing to take the hit and throw the breach under the rug so you don’t get fined into the ground for not having things done ahead of time such as proper pentesting.
    3. Paying vs Not Paying doesn’t prevent attacks?
        1. There’s cases of getting attacked numerous times, but not necessarily the same attack group each time.  You’ll be a target any way.  They know you’ll pay and you’re susceptible
        2. Police station paid twice in this way
3. Why bad forensics and pentests reports?
    1. Why are forensics reports getting smaller?
    2. Lots of class action lawsuits ag - customers suing forensics businesses because something in a forensics document can show negligence
    3. It’s hard to define willful or knowledgeable negligence from other types

## BHIS Memes

- 

# TalkinBoutNews - 10/03/2023

## News - Ideas, Takeaways, Tangents

1. Webp vuln - was a 10, not anymore
    1. then webp lib has a zero click with specially crafted webp images 

## BHIS Memes

- You can’t get supply chained if you never patch
- 

# TalkinBoutNews - 7/11/2023

## News - Ideas, Takeaways, Tangents

1. The FBI hacked Hive (ransomware group)
    1. hack-back organizations
    2. Ransomware groups have tons of countries and internationals in their groups
    3. The hackers’ worst enemy is other hackers
    4. Tons of companies in other countries call pentesting groups to try to get revenge
    5. Back in 2018, someone from the Westpoint digital warfare college had ran a tabletop exercise that did a hackback, but one of the IP ranges they hit was a dialysis pump at a hospital which killed the son of a Chinese ambassador (TABLETOP SO NOT REAL)
2. Cisco warns of a bug that lets attackers break traffic encryption
    1. To find out if CloudSec encryption is being used across ACI suite, just go through like 9 MENUs 🤣
        1. (in news reporter voice) “organizations estimate figuring out whether this is enabled will need a certified pro”
        2. If you need to hire a company to do silly stuff like click through menus please contact Optiv   (SHOTS FIRED).
    2. Traffic Interception and Decryption RARELY gets used in actual attacks
    3. Network equipment talking and being able to take away privacy measures is used with nation states all the time
        1. People in SIGINT will be arguing (PAA or DAA - program accrediting authority or designated crediting authority) and duking it out.  “We need to fix this” vs. “we can use this against the Russians.”
3. LetMeSpy compromise
    1. data breached the data breach app
    2. Spouseware or employee tracking or stalkerware
    3. 

## BHIS Memes

- People sometimes say “if we get offensive with the hackers, then they’ll hack harder.”  Ok bub…try hacking from jail 😆
- Commercial of a ransomware company and normal company and how they have poor SecOps
    - “we can do security ourself..it’s a cost center.”  They think the same stuff
- Hack-back laws?? - find who they are then go make a deal
- John’s inner CISSP is like “hack back bad.”  Other John, “let’s GOO.”
- “They didn’t notice the ransomware”… (other ransomware operator) “print it off their printer?”
- META-sploit - facebook knockoff for red teaming 🤣
- 

# TalkinBoutNews - 6/7/2023

## News - Ideas, Takeaways, Tangents

1. Gigabyte had components for motherboards in gaming pcs which had tools that could easily be exploited
    1. They made some BIOS update to get rid of the backdoors

# TalkinBoutNews - 5/12/2023

## News - Ideas, Takeaways, Tangents

1. Computer science education
    1. IT concepts suck compared to 2 year technical colleges

# TalkinBoutNews - 4/3/2023

## News - Ideas, Takeaways, Tangents

1. Leaked IT contractor files show Kremlin has stockpiled cyberweapons
    1. not surprising
    2. Putin and Xi Jinping have intent to rule the world of AI and infosec
    3. Most of these contractors probably don’t have actual access to the good good malicious stuff
2. 3CX thought supply chain attack was a false positive
    1. Crypto companies were targeted more aggressively
3. Twitter open sourced the algorithm
    1. lots of memes 

# TalkinBoutNews - 2023-03-20

## News - Ideas, Takeaways, Tangents

1. Outlook Vuln - CVE 2023-23397
    1. Devs wanted people to be able to send an email to trigger a notification sound that they want.
        1. UNC path into an MAPI parameter to play a specific sound when you get a reminder, and you want to be able to use a UNC path
    2. Essentially, allows someone to send an email that triggers NTLM auth to an arbitrary endpoint
        1. relies on SMB or NTLM traffic internally
    3. They yanked the feature right out of the client
    4. Most home network ISPs don’t allow SMB (445) outbound.
2. BreachForums - posted lots of OSINT data
    1. Not an onion site which are slow
    2. Headed by Pompourin
    3. Posted DC health data breach
        1. comment: “take this down before we get raided….”…*gets raided*
3. [Two U.S. Men Charged in 2022 Hacking of DEA Portal – Krebs on Security](https://krebsonsecurity.com/2023/03/two-us-men-charged-in-2022-hacking-of-dea-portal/) 
    1. Where’s the line between security research and what these guys are doing?  Where do we draw the line between data brokers and hackers, because most of the brokers likely get data this way too. Threat intel feeds included.
    2. The DOJ has a definition for good faith security researcher
    3. Do everything as if it’s in front of a judge in court
    4. You can publish breach data if nobody listen…unless it’s a senator
    5. Consumer Fairness Protection Act allows you to talk about goods and services you can purchase.

## BHIS Memes

- John Strand threatens to break the law on stream and go onto Shodan. The Shodan rabbit hole is deep and scary.
- Look at all your outbound 445 traffic and ask why you shouldn’t be screaming
- SecurityScorecard memes
    - see you after class
    - what is this “S”?
- John quick turn this misdemeanor into a felony!
- Data breach announcement - “oh look another breach notification using Mandiant boilerplate”
- BreachForums - Posted DC health data breach
    1. comment: “take this down before we get raided….”…*gets raided*
1. If you’re young and live in a five eyes country, don’t do dark crap on the internet

# TalkinBoutNews - 2023-03-14

## News - Ideas, Takeaways, Tangents

1. Silicon Valley Bank Fail
    1. Silicon Valley Bank was willing to give money to companies with negative cashflows
    2. Most banks diversify and have liquid cash on hand.  
    3. When the Fed Taps the Brakes, Not All Banks Slow Down. Some go through the windshield
    4. VC strategies - invest and wait for them to sell or get acquired, or you go IPO and once the stock goes public you make a bunch
        1. Very few companies are cash flow positive and making money. Traditional banks don’t touch this.
    5. “Move fast…break things”
    6. VC firms are going to start saying “we can’t pay you” to lots of startups because things are done in payment installments. They will pull their money out of the water to wait for the storm to pass and have cash on hand. As they do the startups lose so much money that they can’t even handle the law suit or settle it.
2. FBI data breach with house members and staff
    1. Biden administration cyber strategy
        1. Liabilities on software manufacturers - not gonna happen, lobbyists EVERYWHERE
3. Acronis data breach
    1. Don’t downplay a breach, but also don’t ring the dinner bell for other attacks
4. Acer data breach
    1. People will get pentests during breaches and ask “how did they get in”, when there are actually 8 other ways to get in.  Cover as many of the bases as possible.
    2. You are on the clock by the state attorney general or by contractual clauses to reveal breaches quickly

## BHIS Memes

- History doesn’t repeat itself, but it rhymes
- VC security startups are snake oil
- It’s not a problem, till it’s my problem

# TalkinBoutNews - 2023-02-27

## News - Ideas, Takeaways, Tangents

1. [A Basic iPhone Feature Helps Criminals Steal Your Entire Digital Life - WSJ](https://www.wsj.com/articles/apple-iphone-security-theft-passcode-data-privacya-basic-iphone-feature-helps-criminals-steal-your-digital-life-cbf14b1a) 
    1. Everything is stored in our phones
    2. It’s worse to get your phone stolen than it is your wallet
    3. Never give your phone to somebody in public to make a call. Call them and put them on speaker for them.
2. [Sensitive US military emails spill online | TechCrunch](https://techcrunch.com/2023/02/21/sensitive-united-states-military-emails-spill-online/) 
    1. Azure Gov Cloud
    2. A good fatih security researcher found this vulnerability and turned it in, then got almost immediately raided and investigated. 
    3. If you ever see something exposed in the government, call your local FBI
3. [Fruit giant Dole suffers ransomware attack impacting operations](https://www.bleepingcomputer.com/news/security/fruit-giant-dole-suffers-ransomware-attack-impacting-operations/) 
    1. They sent out a message to other grocery chains about the event.  Lawyers usually review big releases like the ones they made. Contracts, SLAs, and other stuff defined by their lawyers are reused and capitalized to point to other documentation, so that they can cover their butts.
    2. 

## BHIS Memes

- Built in breathalyzer in phones that can be used with apps
    - text your ex?…breathalyzer!!!
- Once BHIS start becoming profitable again, they’ll make movies about hackers.
- Die Hard has a somewhat realistic view of what could happen with pentesters
    - They now have a Die Hard clause in their contracts
- You’re gonna go BANANAS for this Dole hack

# TalkinBoutNews - 2023-02-06

## News - Ideas, Takeaways, Tangents

1.  [Cybercrime job ads on the dark web pay up to $20k per month](https://www.bleepingcomputer.com/news/security/cybercrime-job-ads-on-the-dark-web-pay-up-to-20k-per-month/)
    1. Indeed for hackers on the dark web? 😆
    2. They don’t need certs though. Why does everyone want SANs certs?
2. [Discrepancies Discovered in Vulnerability Severity Ratings](https://www.darkreading.com/application-security/discrepancies-discovered-in-vulnerability-severity-ratings) 
    1. 20% of the CVEs had 2 severity scores
    2. It’s always been this way though. It’s not that big of a deal
    3. Your security is the weakest link
        1. The old CVE scoring had people averaging out their severities and saying “oh we’re fine because we average a 5.6.” That’s not how a chain link works.
    4. Don’t build security programs around CVSS scores
    5. Prioritization of vulnerability tools is a dilemma or problematic issue
        1. They try to say “this is what these attackers in this market vertical are going after”
        2. They are trying to give you the easy out with security
        3. The number for the environmental part requires good data and network mapping and good asset management, and organizations tend to suck at visibility.
    6. Who decides when vulnerabilities get names, logos, or more polished notoriety? 
    7. Visibility needs to get easier
        1. we need better collab and visibility in organizations
    8. Everyone needs automated patch deployment on software
3. [GitHub Breach: Hackers Stole Code-Signing Certificates for GitHub Desktop and Atom](https://thehackernews.com/2023/01/github-breach-hackers-stole-code.html)
    1.  Does the detectability affect CVE
        1. Can it be 10.0 if it gets detected?? 😆
    2. The DVIR allows submission of incident response data through Veras.  This is done through Verizon.
    3. HIBP doesn’t have an ID for breaches…no universal ID for breaches
4. [Ex-Ubiquiti worker pleads guilty to data theft, extortion, and smear plot](https://www.bitdefender.com/blog/hotforsecurity/ex-ubiquiti-worker-pleads-guilty-to-data-theft-extortion-and-smear-plot/)
    1. The FBI figured out an insider with Ubiquitti
        1. He was using SurfShark VPN to hide IP
        2. VPN got disconnected for short time
        3. Real IP revealed in logs
        4. FBI correlated this with credit card payment of SurfShark
        5. FBI subpoenaed SurfShark for their logs, which they had, and it connected him to the crime
    2. Ubiquitti was extorted then and lost 4 billion in stocks
    3. Guy got 35 years in prison
    4. The moral of the story is:
        1. Use a better VPN
        2. Fake credit cards
        3. VPN with automatic network kill switch
5. [North Korean hackers stole research data in two-month-long breach](https://www.bleepingcomputer.com/news/security/north-korean-hackers-stole-research-data-in-two-month-long-breach/) 
    1. People focus too much on ransomware, but forget about attackers that like to dwell and sniff
    2. The attack campaign was “no pineapple” - an error seen transmitted by the malware when uploading data to the North Korean attacker servers
    3. Worse than China taking it, because they can trade that data with China
    4. Lazarus is stealing billion dollars of Crypto
        1. Coinsec podcast
    5. It’s illegal to touch a packet from a sanctioned entity like North Korea
6. [Hacker Group Releases 128GB Of Data Showing Russia's 'Wide-Ranging' Illegal Surveillance Of Citizens](https://www.ibtimes.com/hacker-group-releases-128gb-data-showing-russias-wide-ranging-illegal-surveillance-citizens-3663530) 
    1. Wade - 
        1. If Russia and China are doing this to sniff out spies, so shouldn’t we be okay with it since Facebook does it too.
    2. Intel Gathering on US Citizens has heavy rules
        1. Snowden released a lot of programs. John worked on one of those programs and helped build it. You have to get FISA warrants to do anything - probable cause, etc. 
        2. They replaced the information you need to get a FISA warrant. 
            1. Why do you need this ?
                1. at the bottom of the reasons it said “OTHER”
        3. Countries can’t spy on their own citizens (Western and developed), but can other countries ??? 🤣
            1. having other countries spy on your citizens, then you trade data like trading Pokemon cards
        4. Most law enforcement agencies have figured out that it’s easier to buy data from data brokers, than it is to directly access the data. FBI has docs saying ‘we use these data brokers because it’s easier than getting a warrant…we just buy it.’
    3. “Founder” is a 3 letter agency?
        1. go look up Inquetel - founded for national security agencies
        2. Palantir - founded for DARPA
    4. Check public stuff for your data
        1. automate it with simple workflows if you can

## BHIS Memes

- We lose the cyberwar when the other side starts hiring better - John Strand
- Is there SOC with groups on the dark web?
- “Ya know. I’ve been doing illegal stuff illegally for my entire adult career, and it just doesn’t have as much allure as it used to” - John Strand
- “So, you too, haven’t paid for WinRar yet.” - WadingThruLogs
- “A 10.0 has to be a bad one and no one knows about it” - John Strand
- Create a breach database and give every breach a GUID or Breach ID 🤣
- 6
    - “KGB isn’t about surveillance” - Cory
    - “This seems like a smear campaign” - Ralph May
    - Countries can’t spy on their own citizens (Western and developed), but can other countries ??? 🤣
        - having other countries spy on your citizens, then you trade data like trading Pokemon cards
    - Most law enforcement agencies have figured out that it’s easier to buy data from data brokers, than it is to directly access the data. FBI has docs saying ‘we use these data brokers because it’s easier than getting a warrant…we just buy it.’
        - Our sponsor today is “BROKER HEAVY” - “the zero day broker than uses all VPNs and TOR NODES AT ONCE.”
        - If it hasn’t been shut down before, is it really a good data broker - Cory