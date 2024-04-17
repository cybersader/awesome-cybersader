# How to Annoy Attackers so They Cry w/ John Strand | 1-Hour - YouTube

- Cyber deception is always what they recommend for moderate to advanced teams
- Deception is taken the wrong way often
    - queue the ducky scene from Madagascar
- Vendors
    - You can do deception for free, but some vendors are stupid expensive
        
        ![Untitled](How%20to%20Annoy%20Attackers%20so%20They%20Cry%20w%20John%20Strand%201/Untitled.png)
        
    - The low input high value solutions are great
- People always say you can do deception when you’ve done everything else, but that’s silly
- Zero-sum game tradeoff - they think deception means you’re not doing other things
- The high cost solutions
    - Lance Spitzner - Honeypots
    - Started in 2008 or 2009
    - high interaction honeypots
        - full server to gather threat intelligence and facilitate attack research
    - low interaction honeypots
        - simple tripwires, services, and smaller technology that are difficult to exploit for malicious purposes
- [Canarytokens.org](http://Canarytokens.org)
    - lots of good free tokens, but the beaconing type activity can be avoided by attackers
    - Why are lots of attacks coming from East Coast?
        - Companies that are using Security Scorecards were hitting the canary tokens a bunch
        - When they crawl honeytoken websites it will affect their scores
- Security ratings platforms have such a limited view, so it’s irrelevant
    - Started from a good place, but devolved to extortion
- Kerberoasting
    - Kerberoasting canary
        - fires off alert when triggered and set to Critical
    - When canarytokens and kerberoastable accounts are interacted with, then it definitely got hit and you have to look into it immediately
    - These are great fallbacks when the other detection pipelines fail
- CredDefense
    - Toolkit for detection for kerberoasting and LLMNR stuff
    - Help with development
- Effective use of traps?
    - Multiple hosts on the domain were installed as traps. Activities conducted by BHIS revealed that these traps were vulnerable to multiple insecurities and they made tempting targets. Any interaction with these hosts triggered alerts to the customer and these were reported to BHIS during the test. While these should not be relied on as a sole source of protection, they do providee an added layer.
    - We love it when testers cry. Collect their tears… It makes the best wine.
- CanaryTokens
    - GraphRunner was taking advantage of O365, and there’s some research they’re doing in Azure and O365. They found lots of vulnerabilities and issues. Mr. Clippy vuln. Continuous pentesting and research. Microsoft uses API canaries.
- Binary Defense
    - He has an insider
    - Had him generate a bunch of screenshots for their canaries
- AC Hunter CE
    - coupled network threat hunting with canary tokens
    - Agents on systems, honey accounts, and files