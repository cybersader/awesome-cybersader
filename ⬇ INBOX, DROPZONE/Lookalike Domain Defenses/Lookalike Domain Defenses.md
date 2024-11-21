
# Don't Focus on Takedown - Focus on Demotivation, Blacklists and Email Security
- [Public Threat Actor Reporting, Blacklists](./Public%20Threat%20Actor%20Reporting,%20Blacklists.md)
- https://www.reddit.com/r/cybersecurity/comments/1893wgk/any_services_that_help_take_down_malicious_domains/
- 

# Curated Stacks

## Misc
- Similar Domains, Lookalikes
    - https://dnpedia.com/
    - https://dnslytics.com/
    - https://dnstwister.report/
- URL Scans, URL Screenshots
    - https://urlscan.io/
    - https://phishfinder.io/
- Domain intel
    - https://www.domainiq.com/
- Domain records
    - https://www.whois.com/
    - https://www.whoxy.com/
    - https://mxtoolbox.com/

## Agent-Based, Automated
- Infoblox - BloxOne
- 

## Manual Options
- Generate, Validate, Takedown Requests
    - https://github.com/search?q=domain+lookalike&type=repositories

### Common terms that are used with lookalikes
- support

# Components and Landscape
- https://www.icann.org/en/system/files/files/guidance-domain-seizures-07mar12-en.pdf
    - a seizure affects 3 operational elements of the Internet name system - domain name registration services, the DNS and WHOIS service, and encourages preparers of legalor regulatory actions to consider each when they prepare documentation for court action.


## General Process
1. Detection and Monitoring
    - Automated tooling: Takedown tools have to scan and crawl the internet for suspicious activities, newly registered domains that resemble legitimate ones, and other threat feeds
    - User reports: Orgs can manually reports domains or activities to the takedown service
2. Verification & Validation
    - Assessment: suspicious domains have to be verified for malicious intent in order for registrars to take them down.
    - Proof Gathering: collecting evidence to support the takedown requests, such as screenshots, domain registration details, and examples of misuse.
3. Takedown Requests
    - Engaging with ISPs and Registrars: Takedown services coordinate with ISPs, domain registrars, and hosting providers to initiate the takedown process.
    - Legal Processes: In some cases, legal action may be necessary. This involves cease-and-desist letter, filing complaints with relevant authorities, or even pursuing court orders.

## Identity Verification
- Proof of Ownership: requesting party has to prove ownership or legit interest in the domain or content being targeted for takedown.
    - Official documents: trademark registration, domain ownership certificates, and other legal docs
    - Contact information: verify organizational affiliations to ensure the requestor is authorized to act on the behalf of the organization
- Verification Process:
    - Domain: WHOIS and other domain registration details
    - Email and Phone: sending verification codes to contact points
- Authentication
    - MFA
    - Digital signatures