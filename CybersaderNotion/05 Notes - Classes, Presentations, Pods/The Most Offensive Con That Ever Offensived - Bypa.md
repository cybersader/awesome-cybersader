---
publish: true
---
# The Most Offensive Con That Ever Offensived - Bypass Edition 3_13_24

# Panel Discussion

> John Strand, Ralph May, Steve Borosh, Eric Taylor, Joff Thyer, Zach Hill, Jason Blanchard, Corey Ham

- Is offensive getting harder or easier?
    - Attack surface and reach to companies (log hanging fruit) increasing, but detection capability also increasing
    - Corey Ham - Harder. More products are integrating security. Better firewalls, web apps, mobile phones, and email clients.  Complexity increase for pentesters.
    - Eric Taylor - wider spread of cloud usage and endpoint spread.  BECs a lot because pentesters can live on infra that doesn’t have good logging and auditing.
    - Pentesters make tools so that they can become irrelevant.  They make something with the goal of it being temporarily used (at least partly with the attack content).  Our job is to make our job harder
    - No one person knows the whole surface in an org.
    - Copilot AI makes post exploitation a bit easier, but not point and shoot.  Can help find emails and internal spearphishing.
- For those working incidents, what about the stale vulns? Are we preaching to the choir?
    - CISA - Jen Easterly is doing good stuff, BUT they’re putting out the same stuff like “security awareness.”  We are rebranding the same stuff when it comes to patching and awareness.
- Involving lawyers
    - BHIS has never involved when talking to their clients about vulns in their software
- How many times has BHIS got seize and desist orders?
    - twice…they don’t last long
        - They do “good faith” security research
            - definition by DoJ
            - 90 day window
            - big difference between “I found something and here’s how we can use it and we have a legal binding” AND “Yo slack or discord I found weird vuln. Look what it does to my friends as an example.”
- Red teamers and zero-day builders that define everything around building zero-days are lame.
- Offensive and defensive are both cool and they both help appreciate both sides
- DFIR is not cool.  Brought up when stuff hits the fan, they don’t generate costs, and are not always liked.  It’s cool though in reality.
- We are really all blue teamers in the end.  Red teamers tears taste the best.
- It used to be doom and gloom on the defensive side, but not really anymore.

# **Evasive Facility Breach: From Ingress to Egress in 15 Minutes or Less**

> Ralph May, Travis Weathers

[Evasive Facility Breach](https://mwgroup.slides.com/mwgroup/evasive-facility-breach#/1/0/0) 

- Most of your bulk is remote recon, onsite surveillance, and threat profiling
    - Facility access and post exploit (usually less than 15 minutes)
    - Workplace dress code
    - lunch and break venues
    - operating hours
    - badge design (orientation, logos, photos)
    - Google, Facebook, Instagram
    - Searches on insta:
        - company name, address, hashtags, tagged section, analyze who follows/comments/shares posts
    - geospatial recon
        - arial map
            - ArcGIS, Bing, Google
        - Street View Map analysis
            - camera placement and viewing angles
            - chokepoints for badge cloning
            - in-person surveillance
            - parking ingress and egress
        - use multiple types of map sources
    - Street view
        - trash receptacle placement
        - structure floor plan
        - areas to avoid
    - on-site surveillance
        - sound, light, movement & reflection awareness
        - Stick to the plan
    - Dynamic analysis - vehicle in motion
        - phone, dashcam, gopro
        - body posture - reduced but normal
        - no more than two passes (20 minutes apart)
    - Static analysis - stationary vehicle
        - telephoto capable camera
        - notetaking
        - adjacent parking lots/businesses if possible
    - mobile recon
        - employees
            - operating hours
            - tailgating
        - guards
            - armed/LEO
            - roaming guard frequency
        - reader protocol
            - prox, EM, iClass, multiclass

## Prioritization

- Badge Cloning
    - cloneable badges
    - coffee houses
    - exposed outside org
- Social Engineering
- Surreptitious Entry
    - Access to unprotected door 2nd balcony, picking, grappling hooks
    - Roaming guards

## 15 Minute Access Window

- Tooling
    - HID prox reader w/doppelganger for cloning
    - Proxmark3
    - Replica ID Card
    - Unlock / shell devices for computers or drop-device
    - UDT and lockpicks
    - authorization letter
- Clone in the morning
- 9 - 11 write card data
- Start into facility 12:30 to 12:45
- Depart facility (1pm)

# **Bypass Like It's 1999: Decades of Fraggles, Doozers, and Desync**

>John Askew

## 90s - The IDS Era

- Snort popular in 1998
- Zeek/Bro in 1998
- IPS in the 90s
- Garter says IDS will die by 2005

## Fraggle-Rock Show

- Little guys that make buildings out of radishes, these guys that eat the buildings, then guys that rebuild those buildings
- From one construction to another there’s desynchronization and lack of consistency between two perspectives

## Browser Development

- parsing and processing engines developed at different speeds with browsers so security was implemented better at some layers than others

## Powershell and LOLBins in the Beginning

- super wild west in the 90s
- scripting was everything here

## Fragrouter

- Getting around IDS (part of Kali) by changing packets

# **How to annoy your colleagues, lose friends and throw away your social life: Bypassing EDRs**

>Christopher Taylor (IR and Purple Team Manager), Hani Momeninia (Founder of Invest Cyber)

![Untitled](The%20Most%20Offensive%20Con%20That%20Ever%20Offensived%20-%20Bypa/Untitled.png)

![Untitled](The%20Most%20Offensive%20Con%20That%20Ever%20Offensived%20-%20Bypa/Untitled%201.png)

![Untitled](The%20Most%20Offensive%20Con%20That%20Ever%20Offensived%20-%20Bypa/Untitled%202.png)

- How to lose friends:
    - Complain about the recent campaign all the time
    - Sit in a dark room trying to replicate a PoC
- Street knowledge
    - EDR prison story
        - prisons use to throw tennis balls to smuggle drugs
        - they used a net to stop it - “thatll work right?”
        - They started using ice cubes
        - “tighter weave net” - they just used weak points in net
    - EDR is cat and mouse
- The “perfect” EDR, by the nature of computation, would brick an endpoint
- Looking for the open window
    - AMSI, PS Doangrade, payload rename and encoding
    - Block or DNS sinkhole EDR network traffic?
        - do they have offline agents?
- Don’t assume
    - Blue are not the NSA
    - Red aren’t APT groups
        - they have reduced scope, time, and increased worry over hurting your assets
- How to keep friends, colleagues, and sanity
    - Scope better, talk more, try the low hanging fruit
    - collab with blue: you aren’t adversaries
    - You don’t need PoCs.  Keep it simple stupid. The evasion and the report (and brief)
- Whose skills do you celebrate when you’re unsuccessful in engagements
    - Sad for a bit, but then move into a purple engagement

# **Less but Better: Lessons Learned From Red Teaming Esoteric Environments**

> Graham Helton (Red Team Specialist at Google)

- Linux infra focus
- Issues with tech complexity
    - differing specialties on red teams
    - increased r&d time to learn tech being tested
    - obscure issues that require institutional knowledge
        - ME: use team wikis and AI attached to those to curate knowledge, organize it, and utilize it
- Testing air gapped networks
    - borrow from your devops friends
    - get as much info as you can beforehand
    - good printer workflow //cursed
    - Declarative deployments: docker, nixOS
        - really helps to make things portable for engagements
        - you can use NixOS for Linux distro as code to bring your stuff with you
        - Helps when companies ask for SBOM (software bill of materials)
- How to quickly learn new tech stacks
    - talk to engineers
    - ask for the docs given to new employees
    - start with a threat model
    - expense a whiteboard
    - books are underutilized resource
- SUM - increasing tech complexity
    - modern solutions require R&D time

# Job Hunt Like a Hacker with OSINT

>Jason Blanchard

- LinkedIn
    - soc analyst -senior -sr -lead
- What kind of person are you?
    - startups vs corporate
        - autonomy and chaos vs bureaucracy and process
- Look at companies and not jobs
- Spreadsheet with OSINT data
    - companies you like first
- Start bottom up (least to most) and work your way up
    - at top of list you get worried about being blacklisted and what not
- Company websites and job websites
    - press kit?
        - press release requires quotes from senior execs on teams
        - use names in LinkedIn
    - Careers
        - Join talent community and watchlists
- Best jobs are the ones not listed
- Type up company in LinkedIn
    - Posts - talk about projects happening
- Send a message to higher-ups?
    - Yes..you can
    - You have no control over the other person
    - Work like a salesmen and don’t be afraid of failure
- Reach out and ask how they got where they were
    - What advice would you have for someone like me?
    - Students, vets, and people out of military
    - You have to reach out A LOT
    - Always talk about your takeaways and then what you’re going to do about it.
    - Can I reach back out in 6 months to talk about how things are going for me?
- People tab in LinkedIn
    - Recruiter people
    - talk to them!
- Message to recruiters
    - Why I’m reaching out
    - Who am I
    - Why I care about you
    - What I’m asking for (10-15 min phone call to introduce myself)
- For salary negotiation, go through list fast so you have multiple offers on the table

# Wireless for Red Teams

>Alex Sanders

Explore key tactics for red teams across various wireless protocols, including Wi-Fi, Bluetooth, RFID, and more, in this focused talk. Delve into reconnaissance, exploitation, and custom tool development, offering actionable insights for security professionals to elevate offensive strategies in a concise 20-minute presentation.

- Find your niche
- digital tool loadout
    - GQRX
    - Aircrack suite
    - PoC code for exploits
    - Rtl_443
    - Pagermon
    - Multimon-ng
- long-range equipment and drones helpful
- agriculture use 5G apps
- Don’t get stuck on Wifi
- Recon and Intel
    - Pager networks - hospitals
    - POCSAG/Flex
        - lots of unencrypted comms
        - door and gate codes sometimes
    - Tracking security
        - Radio: FRS, GMRS, MURS, Trunked Radio
        - TPMS data from fleet vehicles: direct TPMS only
    - Bluetooth/BLE
        - Forced Pairing with HID and keystroke injection device
        - BLUR and BLUFFS from francozappa research with Daniele Antonioli
        - BLE enabled access controls
    - For wifi APs
        - WPA3 look for MFPC downgrade to WPA2
- Enterprise Auth
    - Wifi phishing kits
    - printers
    - Wireless attacks - [vanhoefm (Mathy Vanhoef)](https://github.com/vanhoefm)
- Company issued phones
    - NFC payload on a ring
    - BT/BLE attacks
    - Ultrasonic sounds
- Operation comms
    - hardware implants
        - disguised device as surge protector, RPI, SFF cellular components, storage, etc
        - [rift.stacktitan.com/chi_part_1](http://rift.stacktitan.com/chi_part_1)
- Contributions
    - no more aircrack-ng wrappers
    - we need new tools
- Tempest shields?
- Stay for Hilton?

# **In Cloud We Trust: Common M365 Attack Techniques to Bypass Defenses**

>Alex Martirosyan

Ready to learn common attacks to bypass defenses in Microsoft 365? This session will explore techniques used by red teamers to achieve initial access or evade detections. The three examples we will focus on include:

- Bypassing the Microsoft Teams Splash Page
- Conducting Direct Send Phishing attacks
- Exploiting CDNs and Static Websites for abuse

The rapid adoption of cloud services has unfortunately led many organizations to trust defaults, inherit unwanted services, and misunderstand the shared responsibility model. A prime example is the widespread adoption of Microsoft 365 to support remote workforces. Hint: You get more than just Outlook and Teams…

Although these techniques are not new, the shift from on-premises to cloud infrastructure has significantly broadened the attack surface for threat actors. As a penetration tester we often times surprise our clients with these techniques. This is primarily due to a lack of awareness and information overload from how recent these bypasses are discovered. By gaining an understanding of how these bypasses work, attendees will be better equipped to strengthen their cloud defenses. Defenders attending this session will ensure their Organization is prepared for these bypasses for the next penetration test or attack!

## Outline

- Cloud Security Risks
- Bypass for MS Teams Splash page
- Abusing CDNs and static websites
- M365 mitigations

## Notes

- Entra and MS-based groups are different
- MS Teams Bypass
- It’s not a complete bypass if you leave artifacts.  It’s revasion.

![Untitled](The%20Most%20Offensive%20Con%20That%20Ever%20Offensived%20-%20Bypa/Untitled%203.png)

# Greeting from the Red Team

>Michael Allen

[2024_03_13_Offensive-Con-2024_Michael-Allen.pdf](The%20Most%20Offensive%20Con%20That%20Ever%20Offensived%20-%20Bypa/2024_03_13_Offensive-Con-2024_Michael-Allen.pdf)

"Attack where your opponent is weakest.

Be in the place your opponent cannot see.

Do what your opponent does not expect."

These are the principles that led to the development of a wildly successful (but admittedly simple) social engineering attack that I've been using to breach customer networks during red team and phishing exercises over the last six months.

During this talk you'll learn how the attack works and why relatively simple techniques are sometimes the best at overcoming advanced defenses. I'll also share the methodology I used to increase my chances of success and make detection as difficult as possible. References will be provided for all the tools and techniques I discuss, so red teamers and pentesters will leave the talk able to perform the same attack, themselves.

Finally, I'll share some suggestions for preventing this and future attacks that side-step security products and take their victims by surprise.

- The good ol days
    - email defenses were nonexistent
    - AV was bad
    - No EDR
    - Phishing was unheard of but happened
- Common defenses today
    - Email filtering
        - domain age and rep
        - SPF, DKIM
        - Message content
    - Chat messages
        - internal only
    - Awareness
    - EDR, AV
    - Network defenses
        - egress controls
        - traffic decryption and inspection
        - web traffic filtering
    - External access controls
        - MFA
        - geolocation
- Some defenses
    - FIDO 2 MFA
    - Login only from VPN