# Tribe of Hackers Blue Team Comments

## Comment Analysis

### Deception Support Table

| William Bengston | Yes | 8 | 9 | Deception techniques have been very effective, providing high ROI and catching hard-to-detect exploitations. |
| --- | --- | --- | --- | --- |
| Amanda Berlin | Yes | 7 | 8 | Works for Blumira, which provides honeypot deployment for smaller security teams. |
| John Breth | Yes | 8 | 7 | Implements honey accounts, honey ports, and canary tokens in clients' environments. |
| Lee Brotherston | Mixed | 6 | 6 | Values canary tokens for high-signal, low-risk tripwires but has concerns about other deception technologies. |
| Christopher Caruso | Yes | 7 | 8 | Enabled honeypots in the DMZ, serving as early warning systems. |
| Mark Orlando | Yes | 9 | 9 | Honey tokens offer high-fidelity detections for heavy recon or post-exploitation activities. |
| Mitch Parker | No | 5 | 7 | Market is still maturing; technology has promise but needs to be thought out. |
| Carlos Perez | Yes | 8 | 8 | Sets canaries for known common TTPs; constant review/update is mandatory. |
| Quiessence Phillips | Mixed | 6 | 6 | Deception tools have a place in the security stack, at the right time in program development. |
| Lauren Proehl | Yes | 9 | 9 | Honeypots and honey tokens used as early warning systems and for identifying attack patterns. |
| Josh Rickard | Mixed | 6 | 7 | No deception product but used similar concepts with internally built tooling. |
| Chris Sistrunk | Mixed | 5 | 5 | Honeypots and fake network segments are examples of deception technology. |
| Michael Tanji | Mixed | 6 | 8 | Prefers deception efforts to function as an "early warning" mechanism. |
| Ismael Valenzuela | Yes | 8 | 9 | Deception technology effective for detecting lateral movement; calls them "early warning systems". |
| Dave Venable | Yes | 9 | 9 | Deception technology is inexpensive, easy to maintain, and has a low false positive rate. |
| William Bengston | - | - | - | - |
| Amanda Berlin | - | - | - | - |
| John Breth | - | - | - | - |
| Lee Brotherston | - | - | - | - |
| Christopher Caruso | - | - | - | - |
| Stephen Hilt | Yes | 8 | 7 | Honeypots provide valuable data, but there are risks if the organization is not mature enough to handle incidents. |
| Bea Hughes | Yes | 8 | 8 | Bea has used various deception technologies in the past, including LaBrea and Thinkst Canary, which have low false positive rates. |
| Terence Jackson | Yes | 7 | 8 | Deception tech helped analyze adversary TTPs, but details were not disclosed. |
| April Mardock | Yes | 7 | 7 | Used simple deception technologies like email relays, Kushtaka, and honey tokens for early visibility of probing activities. |
| Bright Gameli Mawudor | Yes | 7 | 7 | Deception tech helps blue team learn adversary evasive techniques, but can cause false positives if not separated from production. |
| Duncan McAlynn | Yes | 8 | 7 | High-fidelity sensors like Kushtaka help prevent infrastructure breaches by decreasing the mean time to detection (MTTD). |
| Donald McFarlane | Yes | 8 | 7 | Used simple honeypots and other false targets for years, and believes good operational security is a valid and useful tool. |
| Nathan McNulty | Yes | 7 | 7 | Used honeytoken accounts and Kushtaka.io, which provide peace of mind and faster response times. |
| James Medlock | Yes | 6 | 6 | Deception technologies are useful for learning and alerting, but can be difficult to correlate with defended attacks on production. |
| Daniel Miessler | Mixed | 4 | 6 | Time spent on deception tech is often better spent on fundamentals like logging, triage, and IR processes. |
| Alyssa Miller | Mixed | 5 | 6 | Deception tech is interesting but hard to correlate with defended attacks on production, and can consume significant resources. |
| Mark Orlando | - | - | - | - |
| Mitch Parker | - | - | - | - |
| Carlos Perez | - | - | - | - |
| Quiessence Phillips | - | - | - | - |
| Lauren Proehl | - | - | - | - |
| Josh Rickard | - | - | - | - |
| Chris Sistrunk | - | - | - | - |
| Michael Tanji | - | - | - | - |
| Tanya Janca | No  |  |  | Tanya has not worked anywhere that implemented deception technology. |
| Brendon Kelley |  |  |  | Brendon has played around with deception techniques personally but has never implemented them in an organization. |
| Marcus J. Carey | No | 2 | 6 |  |
| Danny Akacki | No | 3 | 5 |  |
| William Bengston | Yes | 8 | 9 | Deception techniques have been very effective, providing high ROI and catching hard-to-detect exploitations. |
| Amanda Berlin | Yes | 7 | 8 | Works for Blumira, which provides honeypot deployment for smaller security teams. |
| John Breth | Yes | 8 | 7 | Implements honey accounts, honey ports, and canary tokens in clients' environments. |
| Lee Brotherston | Mixed | 6 | 6 | Values canary tokens for high-signal, low-risk tripwires but has concerns about other deception technologies. |
| Ronald Bushar | No | 2 | 7 |  |
| Christopher Caruso | Yes | 7 | 8 | Enabled honeypots in the DMZ, serving as early warning systems. |
| Mark Orlando | Yes | 9 | 9 | Honey tokens offer high-fidelity detections for heavy recon or post-exploitation activities. |
| Mitch Parker | No | 5 | 7 | Market is still maturing; technology has promise but needs to be thought out. |
| Carlos Perez | Yes | 8 | 8 | Sets canaries for known common TTPs; constant review/update is mandatory. |
| Quiessence Phillips | Mixed | 6 | 6 | Deception tools have a place in the security stack, at the right time in program development. |
| Lauren Proehl | Yes | 9 | 9 | Honeypots and honey tokens used as early warning systems and for identifying attack patterns. |
| Josh Rickard | Mixed | 6 | 7 | No deception product but used similar concepts with internally built tooling. |
| Chris Sistrunk | Mixed | 5 | 5 | Honeypots and fake network segments are examples of deception technology. |
| Michael Tanji | Mixed | 6 | 8 | Prefers deception efforts to function as an "early warning" mechanism. |
| Ismael Valenzuela | Yes | 8 | 9 | Deception technology effective for detecting lateral movement; calls them "early warning systems". |
| Dave Venable | Yes | 9 | 9 | Deception technology is inexpensive, easy to maintain, and has a low false positive rate. |
| Jake Williams | Yes | 7 | 8 | Deception technology should be thought of as a secondary detection technology, a safety net. |
| Robert Willis | Mixed | 5 | 7 | Honeypots are great for gathering data, but only necessary for clients with mature networks. |
| William Bengston |  | 8 | 8 | High return on investment, increased visibility |
| Amanda Berlin |  | 8 | 7 | Learns adversary evasive techniques, high-fidelity sensors |
| John Breth |  | 8 | 8 | Defense-in-depth approach, peace of mind |
| Lee Brotherston |  | 5 | 5 | False positives, limited applicability |
| Christopher Caruso |  | 8 | 7 | Early detection, defense-in-depth approach |
| Stephen Hilt |  | 8 | 7 | Inexpensive and easy to maintain, effective in monitoring activity |
| Bea Hughes |  | 7 | 6 | Useful for monitoring activity and gathering information |
| Terence Jackson |  | 8 | 8 | High-fidelity sensors, increased visibility, early detection |
| April Mardock |  | 7 | 6 | Early warning systems, defense-in-depth approach |
| Bright Gameli Mawudor |  | 8 | 7 | Helps analyze attacker TTPs |
| Duncan McAlynn |  | 8 | 7 | High return on investment, increased visibility |
| Donald McFarlane |  | 8 | 7 | High-fidelity sensors, early detection |
| Nathan McNulty |  | 7 | 6 | High-fidelity sensors, increased visibility, early detection |
| James Medlock |  | 8 | 7 | Inexpensive and easy to maintain, effective in monitoring activity |
| Daniel Miessler |  | 5 | 5 | Difficulty in measuring success, resource-intensive |
| Alyssa Miller |  | 5 | 5 | False positives, growing attack surface |
| Mark Orlando |  | 8 | 7 | High-fidelity detections, low cost |
| Mitch Parker |  | 8 | 7 | Significant promise, market maturation |
| Carlos Perez |  | 8 | 8 | High return on investment, helps analyze attacker TTPs |
| Quiessence Phillips |  | 8 | 6 | Deception tools have a place in the security stack |
| Lauren Proehl |  | 8 | 8 | Identifying attack patterns, legitimate payoffs as a defense strategy |
| Josh Rickard |  | 5 | 5 | False positives, attracted more attackers than intended audience |
| Chris Sistrunk |  | 8 | 7 | Honeypots and fake network segments |
| Michael Tanji |  | 8 | 7 | Early warning mechanism, powerful when used effectively |
| Ismael Valenzuela |  | 8 | 8 | Detecting hard-to-spot tactics, early warning systems |
| Dave Venable |  | 8 | 8 | Inexpensive, easy to maintain, low false positive rate |
| Jake Williams |  | 8 | 7 | Secondary detection technology, safety net |
| Robert Willis |  | 7 | 6 | Useful for monitoring activity and gathering information, consider client's maturity level before implementation |

### General Comments Summary Table

| General Opinion | Degrees of Support (1-10) | Ease of Implementation | Types of Tech Mentioned | Included People | Reasoning |
| --- | --- | --- | --- | --- | --- |
| Positive | 8 | Moderate | Honeypots, honey accounts, canary tokens, DNS sinkhole, beaconing detection, security building blocks, Thinkst Canary, internal email relays, Kushtaka, RedCanary tokens, OpenCanary, honeytoken accounts, early warning systems, credential stuffers | William Bengston, Amanda Berlin, John Breth, Lee Brotherston, Christopher Caruso, Stephen Hilt, Bea Hughes, Terence Jackson, April Mardock, Bright Gameli Mawudor, Duncan McAlynn, Donald McFarlane, Nathan McNulty, James Medlock, Daniel Miessler, Alyssa Miller, Mark Orlando, Mitch Parker, Carlos Perez, Quiessence Phillips, Lauren Proehl, Josh Rickard, Chris Sistrunk, Michael Tanji, Ismael Valenzuela, Dave Venable, Jake Williams, Robert Willis | High return on investment, low false positive rate, increased visibility, helps analyze TTPs, learns adversary evasive techniques, high-fidelity sensors, defense-in-depth approach, peace of mind, early detection, inexpensive and easy to maintain, useful for monitoring activity and gathering information |
| Mixed | 5 | Moderate | Canary tokens, API keys, access tokens, WAF/firewall blocking, server information modification | Lee Brotherston, Ronald Bushar, Sahan Fernando, Brendon Kelley, Daniel Miessler, Alyssa Miller | False positives, growing attack surface, limited applicability, difficulty in measuring success, resource-intensive |
| Negative | 3 | Difficult | Honeypots, honeynets | Marcus J. Carey, Danny Akacki, Ayman Elsawah, Tanya Janca | Difficulty of implementation, immature security, low priority |

## Comment Data on Deception Tech

The question:

> Has your organization implemented any deception technologies, and if so what effect has that had on the blue team’s detection capabilities?
> 
- Marcus J. Carey
    - No
- Danny Akacki
    - Nice try. Fancy Bear.
- William Bengston
    - What is the most bang-for-your-buck security control?
        - The most bang-for-your-buck security control is a deception technique. Chances are the deception technique is not going to cost much from an implementation/maintenance perspective, and when it fires, it can provide you with incredible return on investment. Another one would be a security building block that allows teams to implement a security best practice for free. This is also known as a high-leverage solution to a problem and scales really well by enabling practitioners/developers.
    - Deception techniques have been very effective at my organizations. They have given incredibly high return on investment and have caught exploitations that would have been hard to detect otherwise.
- Amanda Berlin
    - Yes! I currently work for a software-as-a-service provider called Blumira. Our main goal is to collect the logs from customers and provide actionable alerts tied to playbooks for smaller security teams to follow and receive step-by-step instructions on what incident response or remediation procedures should accompany each finding. Many times, especially at smaller organizations without full security teams, deploying any type of deception technology can be extremely daunting. A part of the service we provide is a honeypot deployment automatically built in to the solution inside the organization.
- John Breth
    - I’ve really gotten into reading up on the deception technologies in the past year or two. Shout-out to John Strand at Black Hills Information Security. The information they put out on this topic has been fantastic, and I’m grateful I got to take his Active Defense class at Black Hat last year. I’ve started implementing some of the methodologies and tools that align with this in some of my clients’ environments. Some simple things like honey accounts were really an easy solution that I’m surprised more places don’t implement. I’ve been toying around and testing honey ports (and obviously honeypots), as well as canary tokens. One other toolset that I have worked with aligns more with the Active Defense class (not necessarily deception but more attribution) is beaconing detection with Bro/Zeek/Corelight and Active Countermeasures AI Hunter/Rita. Lastly, for one of the security services that I support, we do have a DNS sinkhole service with redirection to a honeypot for our clients’ infected hosts. So, alerts based on that are quite useful.
- Lee Brotherston
    - Personally, I have mixed feelings with regard to deception technologies. Many of the technologies that get deployed can have a higher than desired false positive rate and in fact themselves introduce vulnerabilities and weaknesses into an environment via growing the attack surface. However, there can be a lot of value in canary tokens such as creating API keys or access tokens that have no access to anything but that generate an alert when used. You can then place these keys on developer laptops, for example, and if an alert comes in, you can assume that a developer laptop has been compromised. Similarly, dummy customer accounts, which generate an alert when accessed (or when seen in a data dump), can be a good indicator of a compromised customer database. By carefully using canary tokens, it is easy to create a highsignal, low-risk method of deploying tripwires around your infrastructure for attackers to trip over.
- Ronald Bushar
    - I have not had much practice with deception systems since my military days. They tend to be fairly specialized and/or not particularly useful for organizations until and unless they are fairly mature in the primary areas of network defense and security operations.
- Christopher Caruso
    - We’ve enabled honeypots in the DMZ. Some honeypots are easy to detect and bypass if they are improperly configured or improperly placed. Configuring a server named Finance located in the DMZ or on the user VLAN should get bypassed by any self-respecting pentester or real hacker who made it past your firewall or physical barriers, so we configure them with web or FTP and name them something that actually can resolve via reverse DNS even if they aren’t NAT’d through the firewall. As for our detection, honeypots really do serve as an early warning system that “something” scanned and then ran enumeration against it. This provides us with a cross-check that confirms the effectiveness of the NIDS in the DMZ. For example, if an attacker is fragmenting packets or sending them out of order, they might be able to bypass triggering a NIDS, but because the honeypot is basically a HIDS that reassembles the packet as the target, what was missed by the network intrusion detection will trigger the host intrusion detection technology on the honeypot. The trick is to have a honeypot, which in effect is a lure or decoy, that looks and behaves like a real high-value target. Too many common off-the-shelf (COTS) products are easily identified as decoys and quickly bypassed by attackers.
- Ayman Elsawah
    - Many of the companies I work with now barely have a handle on their actual data and don’t have large security teams to deploy honeypots and honeynets. I do often put honey tokens, like AWS keys, in my presentations, though, to see whether anyone thinks it was a real token.
- Sahan Fernando
    - In general, my opinion on deception technologies is that they have their place, but most security teams have other priorities to handle first. There are some great tools that are free and easy to implement.
- Stephen Hilt
    - I work for Trend Micro, and we deploy honeypots all the time. I myself have run multiple honeypot projects that research has been published on. With that said, there are of course risks to running honeypots within your own network infrastructure if your organization is not mature enough in security to handle the incidents that might come from the honeypot.
- Bea Hughes
    - If I tell you, then it wouldn’t be a secret. In the past, certainly. Way back in the distant land of the early 2000s I used LaBrea (wow, it’s still up on SourceForge!) to set up tarpits. This was around the time of delights such as the SQL Slammer and Code Red. Generally, SMTP open relay scanning meant it generated a lot of traffic, and the tarpit would happily accept connections from anyone and then ever so slowly respond, keeping whatever it was on the other end on the line waiting. From the logs, I would cross-reference that with the networks that our customers had to helpfully inform them that they may have a compromised machine out there that they might want to look at. Fast-forwarding about 15 years through my so-called career, I’ve used the excellently innovative Thinkst Canary at a number of places and in a number of places. It is kind of an homage to UNIX in a “do one job and do it very well” sense in that their only job is to sit there and “be vewy quiet” all the while looking like an interesting or unguarded target, until someone finds them, and then to alert that someone is poking around. I think one of the reasons that these canaries are so loved by those who use them is the low false positive rate on them. Everyone who’s ever gotten an alert has gotten more alerts than they wanted. I’m not selling PagerDuty perfectly here; we are but the messenger. But reducing false positives and having your alerts be actionable and not noise is so critical to the efficiency of incident response. As an example, in the Target breach of 2014, one of the largest in history, its FireEye malware detection tool actually caught the initial intrusion and alerted on it, but no one acted on the alert because they got so many.
- Terence Jackson
    - We have, and it has helped us analyze the TTPs of the adversary. Obviously, I can’t go into too much detail, but we did go beyond the typical honeypot. This has helped my team observe how quickly assets are scanned when they are deployed to the internet.
- Tanya Janca
    - I have not worked anywhere that has implemented deception technology.
- Brendon Kelley
    - My organization or any other organization I’ve been at has never implemented deception technologies. I’ve played around with them personally but not actually in an organization. However, there are some deception techniques that have been used. For example, when you get blocked by a WAF or just a firewall, you might get a “406 Blocked” response. That can give information to the attackers that they’re getting blocked; instead, we can block the request and change the HTTP response code to be a “404 Not Found” response. Similarly, another technique we’ve done is change the server information to be the opposite of what it actually is, like IIS instead of Apache, or vice versa.
- April Mardock
    - Yes, we’ve leveraged a few simple deception technologies. We’ve turned on internal email relays and set up a simple BLAT alarm when someone tries to use it. We’ve used more elegant tools like Kushtaka to set up a network of “fake” FTP services to capture bad actors looking for unprotected data. We’ve even used honey tokens to mark data extracts so we can fingerprint them if the data shows up elsewhere. All of these give us early visibility of probing activities by both curious students and bad actors.
- Bright Gameli Mawudor
    - On the upside, the blue team gets to learn adversary evasive techniques and gain insights on how to stop them. The downside is surges in false positives if the deception technologies aren’t demarcated from the production environment. This allows the tweaking of honeypots planted in the environment, and a really good example is RedCanary tokens, which can be placed in networks, systems, applications, and web servers.
- Duncan McAlynn
    - High-fidelity sensors, like that of the open source Kushtaka (maintained by fellow Tribe of Hackers contributor Jared Folkins), have their place in the enterprise as part of a defense-in-depth approach. The key is “high fidelity.” When implemented and used properly, these solutions can help prevent an infrastructure breach from becoming a data breach by decreasing the mean time to detection (MTTD). These sensors allow the blue team to be immediately notified once a malicious actor trips on one of the cleverly placed assets. They can then act on the such as blocking the IP address of the attacker or using SOAR playbooks to automate the process.
- Donald McFarlane
    - I’ve been using simple honeypots and other false and misleading targets since the 1990s. Even if there are now a bunch of vendors looking to invade this space and separate some companies from their spare revenue as those companies pursue a “no security tool left behind” approach, the truth is it’s not hard or expensive to do. If you have basic logging and alerting in place, or for that matter a DevOps team that is halfway competent with scripts, then you should already be using some of these techniques (along with some basic configuration monitoring) up and down the stack to separate the wheat from the chaff and to help you identify when there’s a malicious actor at work inside your environments. Security by obscurity is a muchmaligned term: Good operational security is a valid and extremely useful tool in your arsenal. Yes, OpSec is key here. These should be small things, spread across your environment—files, user accounts, API calls, credentials, client settings, networks, etc. Understand the attacker’s TTPs, especially for lateral movement and persistence. I would love to give more concrete examples, but then people would know what to look for. And the same holds true in your organization: Information sharing is important for most things, but this is one of the times where few people should have the whole view up and down the stack. It’s okay for some operational SMEs who need to know about these “tells” to be aware of their piece of the pie, but they don’t need the whole view, and risk/­compliance/audits don’t need a granular view either. As with fraud controls (e.g., forgery detection), one should always keep a few tricks up one’s sleeve.
- Nathan McNulty
    - I have had several honeytoken accounts in place for a few years now, and these are spread across several different permission levels throughout most of our services including AD, Office 365, and G Suite. For honeypots, I originally started with OpenCanary, and I am now using a prerelease version of [Kushtaka.io](http://kushtaka.io/). My sensors go off fairly frequently, but to be fair, I have probably a couple hundred students out of a little more than 40,000 who actually know how to poke around and look for things. They are curious and trying to learn, and this gives me an opportunity to redirect that energy to appropriate learning sources before they get themselves in too much trouble. I really appreciate the peace of mind the sensors give me, and my response time would suffer without them. I like to view it as an insurance policy while I continue to build and enhance my detection capabilities in other areas.
- James Medlock
    - In a previous organization of mine, there were some deception technologies in place. They ranged from honeypots to actively separating origin-based traffic through different unrelated domains to splitting the traffic source and return from the expected corporate traffic domains. In most cases, a business or entity will use these deception techniques as learning and alerting opportunities. When an unauthorized person starts toying with areas they should not be in, they cause an alert to system admins who have the choice to black-hole them or monitor their activities to learn their tools and techniques. It makes it much easier if an invader is nice enough to accidentally announce themselves; it saves time hunting them.
- Daniel Miessler
    - I’ve seen many organizations experiment with deception technologies, but all but a few ended up realizing sometime later (months or years) that the time would have been better spent on the fundamentals. More logging. More automated analysis of logs. Better triage methodologies. Better IR process, etc.
- Alyssa Miller
    - I’m not sure about my current organization, but I have worked with a number of companies in the past that did have honeypots and honeynets in place. The problem I find with these is that it’s really difficult to measure whether they’re successful. Sure, you can look at the attacks coming in, you can try to track metrics on the number of attackers landing there, but at the end of the day, there’s really no context to say if that helped identify an attack that could have or will hit elsewhere. It’s often tough to make that correlation because after getting caught in a deceptive defense system, attackers typically change their approach. From a blue teamer perspective, they are fun to watch. It sometimes is comical to look at the logs and see how attackers behave as they slowly figure out they’ve been attacking a decoy. But at the same time, these systems and networks can take a lot of resource time to manage and keep running. Without a good way to correlate decoy attacks to defended attacks against production systems, it’s hard to really demonstrate that they’re worth the effort
- Mark Orlando
    - I’ve used honey tokens to trigger detections for heavy recon or post-exploitation activities. I love the technology because it’s unsophisticated and inexpensive but highly effective. For blue teams, honey tokens sprinkled throughout the environment offer high-fidelity detections that flag some of the most damaging phases of an attack.
- Mitch Parker
    - We have not implemented these technologies yet because we believe the market is still maturing and that the use of these technologies needs to be very thought out. This technology has significant promise and will eventually be used.
- Carlos Perez
    - Yes, canaries are set for known common TTPs used by attackers. This allows a higher return of investment since setting canaries for things like fake service accounts that will entice attackers to use Kerberoast on the account tends to provide great value since it is a technique many execute. Like anything based on TTPs, a constant review/update is mandatory since attackers change their behavior as new techniques are developed and adopted.
- Quiessence Phillips
    - I will not comment on technologies that my organization has implemented. I personally think that deception tools have a place in the security stack, at the right time in the development of your program.
- Lauren Proehl
    - I love deception. I am a self-proclaimed “blue teamer with a vengeful side.” One time someone phished my grandma, so I wrote a Python-based credential stuffer to flood attackers’ databases full of junk. We have used this on multiple incidents to try to make it a needle-in-the-haystack situation, and it has bought more time before an attacker can use potential legitimate credentials. Our organization has used honeypot and honey token defenses as early warning systems as well. These do tend to generate noise and potential false positives but can be great for identifying attack patterns and teasing out threats that may have been lying dormant. I encourage all blue teams to use deception techniques. They are a blast to execute and have legitimate payoffs as a defense strategy.
- Josh Rickard
    - The organizations I have worked for have not implemented a deception product, but we have used the same concept with internally built tooling. For example, during my time at a previous organization we created and purposely exposed multiple mailbox credentials on multiple different sites (e.g., Pastebin). This was our attempt (before deception products existed really) to lure certain actors into our environment so we could monitor the activities in a controlled manner. This was both successful in some ways but futile in others. We ended up getting lots of activity such as sending of phishing emails from this account, syncing using SMTP/IMAP/ActiveSync to their local machines, etc. The problem was that we attracted more attackers than our intended audience. At another organization, we deployed files that contained canary tokens to different file shares throughout our network. When they were opened, it would send us an alert of this activity. This is a great way to see who is snooping around on your network, but it can lead to false positives, especially if an employee is bored and just nosy.
- Chris Sistrunk
    - am not sure about my organization, but I suppose honeypots and fake network segments are examples.
- Michael Tanji
    - As a former intelligence officer, I have particularly strong opinions about the co-opting of terms like deception in the cybersecurity realm. To me, a deception operation means something very specific, and simulated fake endpoints acting as triggers don’t quite make the cut. That and elaborate deception schemes feed into this pernicious drive in some quarters to get customers to pay for people’s spy-versus-spy fantasies. I understand the arguments, but I’ve yet to run into a client who wanted to extend pwnage because they wanted to develop a deep understanding of threat actors. People want to get back to work. Now, the effectiveness of deception methodology is hard to dispute. Go back to Cliff Stoll and The Cuckoo’s Egg, and you see how powerful such efforts can be. I prefer deception efforts to function as an “early warning” mechanism. A lot of people start with a good idea like a sensor and then try to be all things to all men. I mean, who doesn’t need another pane of glass to look at? Warning that evil is present should be sufficient. If you have a deception tool, you’ve got other tools that can help; you don’t need yet another.
- Ismael Valenzuela
    - I’ve had great success over the years using deception technology to detect things that are pretty hard to spot otherwise, especially tactics like lateral movement. There are few things that can provide more value to detect the presence of an attacker once it’s in the internal network than well-placed tripwires and red herrings, for example in the form of honey tokens. However, I have to admit that I’ve always had a hard time convincing companies that this was a necessary element in a defensible security architecture. The reason is that legal, and sometimes even HR, doesn’t like the word deception at all. In fact, the conversation is typically over as soon as you drop that word in a corporate environment. The reason? Some believe that deception involves enticing somebody to hack into a system, essentially to commit a crime, and no legal team will ever allow you to do that on their systems. The solution? I’ll share a little secret that has worked great for me on multiple occasions. I call it Ismael’s mental Jedi trick! Ready? The key is to change the way you present it. Yes, marketing matters! Instead of saying you’re going to implement a honeypot or any other sort of deception technology, say you’ll deploy “early warning systems.” I remember I was consulting for a large customer that wouldn’t allow me to deploy honeypots under any circumstance. After they suffered an incident, they asked me to come up with a solution to augment their visibility and detection capabilities for lateral movement. I went back to them with a proposal to deploy early warning systems, using virtualization and open source technologies. The project was accepted without any issues! All we changed was the name. As I always say, the industry uses marketing against us. It’s time for us, blue teamers, to use marketing to our advantage. As I always say, the industry uses marketing against us. It’s time for us, blue teamers, to use marketing to our advantage.
- Dave Venable
    - I’m a fan of deception technology because it’s inexpensive, it’s easy to maintain (or even forget about), and it has an extremely low false positive rate. It’s one of the first things I like to implement in any new environment.
- Jake Williams
    - We use deception technologies both in our network and in customer networks. Deception technologies are a great enabler, but they should always be thought of as a secondary detection technology. Too often, CISOs chase the latest buzzwords rather than making more sensible decisions about security controls. Deception technologies should only be thought of as a safety net to be used when primary detection technologies have failed.
- Robert Willis
    - This is definitely a honeypot question—a honeypot being a decoy setup to lure attackers in. I’ve worked with honeypots, and they are great to gather data from to understand what methods and traffic an attacker is creating, but it’s important to make sure that setting up a honeypot is actually necessary for the client’s current maturity level. I say this because a honeypot can be something a possible client asks for, but in many cases I find that a client’s current network may be so immature that they need to concentrate on fixing their own issues before setting up a decoy. A vulnerable decoy would just be one of many vulnerable machines on a network to choose from at that point. If you’re a mature organization, a honeypot is great to gather and analyze information from to see what actual attackers are attempting to do (and how they are attempting to do it). This information can be used in briefings with the blue team and to pinpoint activity to specifically look for (especially if the attacker is attempting advanced tactics to be undetected).