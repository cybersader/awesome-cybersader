---
date created: Friday, March 22nd 2024, 10:58 am
date modified: Monday, April 1st 2024, 8:15 pm
tags:
  - BHIS
  - BHISTalkinBoutNews
  - NewsCyber
---

# [BHIS - Talkin' Bout [infosec] News 2024-03-25 #infosecnews - YouTube](https://www.youtube.com/watch?v=1-GlU7nxV6o&t=9s)
#BHISTalkinBoutNews 
1. [Cisco acquires Splunk - Cisco](https://www.cisco.com/site/us/en/about/corporate-strategy-office/acquisitions/splunk/index.html) 
	1. #Splunk #Cisco 
	3. 50/50 chance of this working
	4. They took over Duo and just let it do it's thing
	5. You have to wonder what they'll do with the pricing
	6. A good place to look for vulns is to look at when something was integrated.  They should keep developers or a lot of holes open up with patched together products
2. [General Motors Quits Sharing Driving Behavior With Data Brokers - The New York Times](https://www.nytimes.com/2024/03/22/technology/gm-onstar-driver-data.html)
	1. #privacy #databroker 
	2. GM was sharing speed with a data broker and selling it
	3. They backed out of LexisNexis deal after getting dogged on 
	4. Actively evaluating privacy policies and procedures
	5. Hard no to be jaded w/companies and how they handle user data
	6. They may have been listening to the news and their customers
	7. Data brokering can be used to lower prices like ads with free apps, but this is only the case if the market is competitive enough
3. [Florida’s DeSantis signs social media law requiring age verification - The Verge](https://www.theverge.com/2024/3/25/24087979/florida-desantis-social-media-age-verification-parental-consent-law)
	1. #childprivacy #persuasivetech #techethics #politics #internet 
	2. Under 16 requiring social media platforms to use 3rd party verification systems
	3. HB3 law 
	4. up to 50k per violation
	5. Tech is harmful and parents should have control 
	6. How will tourism be affected?
	7. How do the social media companies potentially try to circumvent this?
	8. Lots of edge cases with how this is handled in cases of moving to another state
	9. Disney and DeSantis battle - Disney has a self-governed area - Reedy Creek District could be tied Disney
	10. What counts as social media? - anywhere where other people can share interests and affect other users' behavior in a direct way
4. [House passes bill banning sale of US personal data to foreign adversaries - The Verge](https://www.theverge.com/2024/3/20/24106991/house-data-broker-foreign-adversaries-bill-passes)
	1. #politics #FTC 
	3. [The Protecting Americans’ Data from Foreign Adversaries Act, or HR 7520](https://www.congress.gov/bill/118th-congress/house-bill/7520/text)
	4. You know it's an issue when America has to say "no you can't sell data to foreign adversaries" #cyberMeme 
	5. Imposes a broad limit on data brokers’ ability to “sell, license, rent, trade, transfer, release, disclose, provide access to, or otherwise make available sensitive data of a United States individual” to foreign adversaries or organizations they control
	6. The sensitive data covered by the bill includes biometric and genetic information, Social Security numbers, health diagnoses or treatments, and precise geolocation data.
	7. FTC enforces the legislation, so it really falls on them.  They probably need more resources now since they handle most if not all privacy enforcement.
5. [Unsaflok | Unsaflok is a series of serious security vulnerabilities in the Saflok brand of hotel locks.](https://unsaflok.com/)
	1. [Hackers Found a Way to Open Any of 3 Million Hotel Keycard Locks in Seconds | WIRED](https://www.wired.com/story/saflok-hotel-lock-unsaflok-hack-technique/)
	2. Malicious cards can get around deadbolt on the hotel room doors too
	3. Saflok-brand doors
	4. NFC Taginfo app can check the type of keycard
	5. Not just cloning a badge.  It's a skelton key to Saflok brand locks as long as you have one.  
	6. The company is Dormakaba
	7. Attack can be performed with any device capable of reading and writing or emulating MIFARE Classic cards. Proxmark3 and Flipper Zero, but also an NFC capable Android phone can do it
6. [Canada revisits decision to ban Flipper Zero | Malwarebytes](https://www.malwarebytes.com/blog/news/2024/03/canada-revisits-decision-to-ban-flipper-zero)
	1. They may not ban it but rather appeal it and let some individuals have it. Only legitimate actor
7. [Cloud Email Filtering Bypass Attack Works 80% of the Time](https://www.darkreading.com/cloud-security/cloud-email-filtering-bypass-attack) 
8. [Truck-to-truck worm could infect entire US fleet • The Register](https://www.theregister.com/2024/03/22/boffins_tucktotruck_worm/) 
	1. #wireless #bluetooth #CISA #CyberWar
	2. Big rigs are very connected.  They have ELDs (electronic logging devices) that track tons of metrics and telemetry
	3. ELDs can be accessed over Bluetooth and Wifi too
	4. Some vulns with weak firmware
	5. They can disable the truck remotely in under 14 seconds
	6. This could be used in war.  We RELY on groceries. It only takes a day to lose all the important food at a grocery store
	7. Reported to CISA and manufacturer.
	8. Large variety of ELD and firmware, so it's not easy to make a worm that covers all of them.


# [BHIS - Talkin' Bout [infosec] News 2024-03-18 - YouTube](https://www.youtube.com/watch?v=yXDejLVOlSk) 
#BHISTalkinBoutNews 
1. [NIST Releases Version 2.0 of Landmark Cybersecurity Framework | NIST](https://www.nist.gov/news-events/news/2024/02/nist-releases-version-20-landmark-cybersecurity-framework) 
	1. #NIST #CSF2 #KelliTarala
	2. Additions:
		1. Supply Chain risk
		2. How to apply for all org sizes
	3. Was this spurred by the 2021 executive order or was it always the plan?
		1. [Executive Order on Improving the Nation's Cybersecurity | The White House](https://www.whitehouse.gov/briefing-room/presidential-actions/2021/05/12/executive-order-on-improving-the-nations-cybersecurity/) - 2021 #executiveorder #POTUS 
	4. Supply chain security - lots of SBOMs (software bill of material)
2. [The FCC has finally decreed that 25Mbps and 3Mbps are not ‘broadband’ speed - The Verge](https://www.theverge.com/2024/3/14/24101313/fcc-new-broadband-definition-100mbps-20mbps) 
	1. Is DSL and DSL-max still broadband?
		1. DSL can do multiple channels on same circuit to increase bandwidth, but lots of DSL wouldn't qualify as "broadband" anymore 
		2. #FCC #ISPs #DSL 
	2. We have minimum standards for electricity and water so we should for internet #KelliTarala 
	3. Starlink has brought options to people without terrestrial broadband
	4. Opens the door for rural development grant programs:
		1. [Biden-Harris Administration Announces Over $770 Million for Rural Infrastructure Projects During Investing in America Tour | USDA](https://www.usda.gov/media/press-releases/2024/02/21/biden-harris-administration-announces-over-770-million-rural) 
		2. Boondocks can have Stranza glass running down powerlines
		3. Allows you $10 a month for 100 up and down Gbps 😄
3. [Welcome to the Red Canary 2024 Threat Detection Report](https://redcanary.com/threat-detection-report/)
	1. [2024ThreatDetectionReport_RedCanary.pdf](https://resource.redcanary.com/rs/003-YRU-314/images/2024ThreatDetectionReport_RedCanary.pdf?version=0)
	2. Attackers getting smarter about standing up cloud assets
	3. #RedCanary #StealerLogs 
	4. It gets confusing talking about threat intel when there's tons of different unique groups and affiliates of those groups 
	5. Hacking is an exceptionally organized crime domain
	6. Cookies:
		1. not initially for auth schemes
		2. Google turning off tracking cookies last year
		3. cookies and JWTs and session serialization all store signed crypto stuff.  Problem is cloud provider allowing refresh token behavior. Lots of providers invalidate sessions based on changes in context (fingerprints, IPs, etc) #ContiuousAuth #JWT #cookies 
		4. [What is Continuous Authentication? | Okta](https://www.okta.com/blog/2018/03/what-is-continuous-authentication/) 
		5. Session cookies live too long.  There should be a mandatory refresh period and if login from new device or location then invalidate. Costs money and time to do all that though.
		6. Continuous auth with session anomaly detection requires implementing algorithms and a whole system to organize and process the data 
		7. Lots of web tech used in ways they weren't meant to be used for
		8. #financeSec Continuous authentication useful and valuable in financial scenarios
	7. Stealer logs
		1. usually trading subscriptions, VPN logins, and crypto auth material
		2. found stealer log password from 2 years back that was still valid
	8. Remove reset MFA from help desk if you can
		1. generate alerts when MFA is reset
		2. If you can't stop it, then generate manual alerts
	9. Enabling refresh token for OAuth is not considered best practice
		1. [OAuth 2.0 Security Best Current Practice](https://oauth.net/2/oauth-best-practice/) 
	10. #SSO 
		1. Single sign-on is easy
		2. Single "sign-out" is HARD to detect
			1. auto-expiry and deleting tokens across apps is cumbersome
			2. lots of those parties have different views of how long sessions should last
			3. requires APIs and controls for each case
4. [NSA Releases Top Ten Cloud Security Mitigation Strategies > National Security Agency/Central Security Service > Press Release View](https://www.nsa.gov/Press-Room/Press-Releases-Statements/Press-Release-View/Article/3699169/nsa-releases-top-ten-cloud-security-mitigation-strategies/)
	1. #NSA #DoD #CISA #CIS
	2. NSA missions:
		1. act defensively
		2. signal intelligence
		3. secure critical infrastructure 
	3. Shared responsibility - leaving that S3 bucket public is your "assets"
		1. #S3 
		2. You don't get as many warning through CLI, #Terraform , etc.
	4. For those going to the cloud, what's the responsibility? 
		1. CSPs aren't cyber insurance providers 
	5. This is how far behind the curve we are
	6. The ten strategies are covered in the following reports:
		1. [Uphold the cloud shared responsibility model](https://media.defense.gov/2024/Mar/07/2003407863/-1/-1/0/CSI-CloudTop10-Shared-Responsibility-Model.PDF)
		2. [Use secure cloud identity and access management practices](https://media.defense.gov/2024/Mar/07/2003407866/-1/-1/0/CSI-CloudTop10-Identity-Access-Management.PDF) (Joint with CISA)
		3. [Use secure cloud key management practices](https://media.defense.gov/2024/Mar/07/2003407858/-1/-1/0/CSI-CloudTop10-Key-Management.PDF) (Joint with CISA)
		4. [Implement network segmentation and encryption in cloud environments](https://media.defense.gov/2024/Mar/07/2003407861/-1/-1/0/CSI-CloudTop10-Network-Segmentation.PDF) (Joint with CISA)
		5. [Secure data in the cloud](https://media.defense.gov/2024/Mar/07/2003407862/-1/-1/0/CSI-CloudTop10-Secure-Data.PDF) (Joint with CISA)
		6. [Defending continuous integration/continuous delivery environments](https://media.defense.gov/2023/Jun/28/2003249466/-1/-1/0/CSI_DEFENDING_CI_CD_ENVIRONMENTS.PDF) (Joint with CISA)
		7. [Enforce secure automated deployment practices through infrastructure as code](https://media.defense.gov/2024/Mar/07/2003407857/-1/-1/0/CSI-CloudTop10-Infrastructure-as-Code.PDF)
		8. [Account for complexities introduced by hybrid cloud and multi-cloud environments](https://media.defense.gov/2024/Mar/07/2003407865/-1/-1/0/CSI-CloudTop10-Hybrid-Multi-Cloud.PDF)
		9. [Mitigate risks from managed service providers in cloud environments](https://media.defense.gov/2024/Mar/07/2003407859/-1/-1/0/CSI-CloudTop10-Managed-Service-Providers.PDF) (Joint with CISA)
		10. [Manage cloud logs for effective threat hunting](https://media.defense.gov/2024/Mar/07/2003407864/-1/-1/0/CSI_CloudTop10-Logs-for-Effective-Threat-Hunting.PDF)
	7. Pay for a dedicated KMS
		1. Attacks won't be lateral towards you if you have one
	8. Governance advice for stale and hard-to-track cloud assets?
		1. #assetManagement #assetGovernance #assetDiscovery
		2. #CIS came out with governance for CIS controls in cloud
		3. How to address additional workloads and identities in cloud
		4. #GRC has to be a bit more technical to help hold teams accountable on this front
5. [The FTC and DOJ want it to be legal to fix McDonald’s ice cream machines - The Verge](https://www.theverge.com/2024/3/14/24101023/ftc-doj-comment-dmca-ifixit-ice-cream-machines) 
	1. #FTC #DoJ #antitrust #copyright
	2. FTC and DoJ antitrust division filed comment with US copyright office for expanded exemption to copyright law for the right to repair certain devices.
	3. Exemptions to DMCA Section 1201 are issued every three years, as per the Register of Copyrights’ recommendation. Prior [exemptions](https://www.theverge.com/2021/10/27/22747310/us-copyright-office-dmca-section-1201-exemption-rulemaking-report) have been issued for jailbreaking cellphones and repairing certain parts of video game consoles. The FTC and DOJ are asking the Copyright Office to go a step further, extending the right to repair to “commercial and industrial equipment.” 
	4. The comment singles out four distinct categories that would benefit from DMCA exemptions: **commercial soft serve machines; proprietary diagnostic kits; programmable logic controllers; and enterprise IT**.
	5. The average estimated cost of “unplanned manufacturing downtime” was $260,000 per hour, the comment notes, citing research from Public Knowledge and iFixit. As for soft serve machines, breakdowns can lead to $625 in lost sales each day.
	6. Business owners can’t legally fix them on their own or hire an independent technician to do so...takes about 90 days to fix them
	7. #cyberMeme develop stuxnet malware to fix all soft-serve machines and remove limitations
6. [Department of Homeland Security Unveils Artificial Intelligence Roadmap, Announces Pilot Projects to Maximize Benefits of Technology, Advance Homeland Security Mission | Homeland Security](https://www.dhs.gov/news/2024/03/18/department-homeland-security-unveils-artificial-intelligence-roadmap-announces) 
	1. #NewsAI 
	2. Bias and slippery slope
	3. Find criminal suspects when it comes to crossing US borders
	4. Using AI to generate versions of aged or changed appearance suspects
	5. How will it stand up in court?
	6. #cyberMeme AI that generates warrant, then AI deciding whether to wake up judge or not for the warrant 
