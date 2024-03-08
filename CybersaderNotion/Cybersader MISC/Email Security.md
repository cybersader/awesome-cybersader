# Email Security

Email Security (DKIM, DMARC, BIMI, ARC, etc) and implementation of them, or any problem related to Email Security (even phishing related).

# Resources for Learning

- [Weak Links in Authentication Chains: A Large-scale Analysis of Email Sender Spoofing Attacks | USENIX](https://www.usenix.org/conference/usenixsecurity21/presentation/shen-kaiwen)
- 

# Solutions

## Mimecast

- They do email security, but also training and awareness too
    - AI and looking for abnormalities
- TL;DR / Aerial View of Platform
    - No on prem servers, etc. - SaaS cloud service - container-based
    - Handle data privacy seriously, GDPR, CCPA, etc.
    
    ![Untitled](Email%20Security/Untitled.png)
    
    - you don’t need custom scripts or SOAR platforms to scrape through and search emails to delete stuff
    - Data retention and archiving - useful for legal cases and things of that nature?
    - They have managed incident response which utilizes automations and threat intelligence to help them make decisions
- Integrating DNS and Google properly for Email Sec
    - They have a pro service team to do so
    - Lots of configuration to change email flows
    - High friction point with C suite
-