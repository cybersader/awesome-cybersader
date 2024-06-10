# 5/2024
    - FCC might require telecoms to report on securing internet's BGP technology
        ○ https://therecord.media/fcc-proposed-requirement-isps-bgp-security
        ○ BGP Prefix Attacks
            § Two ASNs may have overlap of IP addresses and claim responsibility
            § The ASN that is more "specific" with the fewest entries is going to win, and you can reroute the traffic through that ASN
            § To do this, you have to be an ISP that can broadcast BGP
        ○ Some companies started monitoring changes to BGP broadcasts and the ASNs.  They would do alerts on these changes
        ○ One defense was to require PKI with it
        ○ If top 10 ISPs start doing security with these, you can still have people not following
        ○ BGP security is not a smooth migration but rather a cliff because everyone has to do it
        ○ BGP attacks are going to be nation-state level
        ○ The big question: "what precipitated this?"
            § Likely someone saw intel on a country debating using BGP attack as a precursor or part of larger attack
        ○ John: "We have used BGP attacks against other countries."
            § This is in US offensive tool chest
        ○ The concerns:
            § Maybe someone in FCC found this
            § US found attack method that uses BGP that's better than this old one - they are ready to shut it down?
        ○ Maybe the equities aren't in the favor of US cyber defense
        ○ There should be a sitcom about cyber offensive teams - they lose tool kits - the Office, but it's an APT group
        
    - Linux maintainers infected for over 2 years
        ○ They wanted to stay long term and steal wallets
        ○ People were aware in 2011 that kernel.org was compromised.  Kernel.org was supposed to show what had happened, but they never wrote it up
        ○ Companies can avoid divulging too much information if they use news cycles and PR correctly
        ○ 15 years of the smartest people being compromised in the Linux community
        ○ Whoever was operating, spent tons of time researching the networks they were on.  They ARP spoofed too (old attack) to steal some SSH stuff
        ○ Leveraged sophisticated LD preload rootkit
        
    - Targeting corporate exec's children
        ○ https://www.msn.com/en-ie/money/other/hackers-are-now-targeting-the-children-of-corporate-executives-in-elaborate-ransomware-attacks/ar-BB1mfoek?ocid=weather-verthp-feeds
        ○ SIM swap exec's child, then use it to convince exec to do something bad - likely visit a website or text or something
        ○ Dad I need your 2FA key for your Okta portal
    - CISA "Vulnrichment"
        ○ https://www.linkedin.com/feed/update/urn:li:activity:7193995615737901056/ 
        ○ https://jericho.blog/2024/05/09/thoughts-on-cisas-vulnrichment-initiative/
    - https://www.bleepingcomputer.com/news/security/online-sellers-targeted-by-new-information-stealing-malware-campaign/
        ○ Targets online eCommerce sites
        ○ Magecart type attacks
        ○ They like to generate backups of site databases to steal and extort customer information as well
    - https://www.bleepingcomputer.com/news/security/nsa-warns-of-north-korean-hackers-exploiting-weak-dmarc-email-policies/
        ○ Bad DMARC policies are being exploited
        ○ APT43 from North Korea at work
        ○ They're exploiting them for spearphishing attacks
        ○ Remediation: 
            § In these attacks, they exploit missing DMARC policies or DMARC policies with "p=none" configurations, which tell the receiving email server to take no action on messages that fail DMARC checks.
            § To mitigate this threat, the FBI, U.S. Department of State, and the NSA advise defenders to update their organization's DMARC security policy to use "v=DMARC1; p=quarantine;" or "v=DMARC1; p=reject;" configurations.
            § The first instructs email servers to quarantine emails that fail DMARC and tag them as potential spam, while the second tells them to block all emails that fail DMARC checks.
    - https://www.bleepingcomputer.com/news/software/bitwarden-launches-new-mfa-authenticator-app-for-ios-android/
        ○ Bitwarden launches authenticator app
        ○ 
    - [CISA urging devs to fix path traversal vulns](https://www.bleepingcomputer.com/news/security/cisa-urges-software-devs-to-weed-out-path-traversal-vulnerabilities/)
        ○ They use these to overwrite critical files, execute code, or bypass security mechanisms
        ○ Used in BlackBasta attacks (Ascension Health) - ScreenConnect CVE chained in as well
    - [Japanese police create fake payment cards to warn victims](https://www.bleepingcomputer.com/news/security/japanese-police-create-fake-support-scam-payment-cards-to-warn-victims/)
        
        
