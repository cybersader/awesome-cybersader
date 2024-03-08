# Top 10 CloudSec Issues

# Overview

![Untitled](Top%2010%20CloudSec%20Issues/Untitled.png)

- External
- Internal
- APIs
    - All CSPs have APIs that can be configured wrong or give external unauthenticated users access or visibility

## IaaS vs SaaS Attack Surface

![Untitled](Top%2010%20CloudSec%20Issues/Untitled%201.png)

- Azure RM vs O365
    - both can be accessed from Azure AD

## Identity vs Resource-Based Policies

![Untitled](Top%2010%20CloudSec%20Issues/Untitled%202.png)

- Enumerating policies of users doesn’t give the full picture of the user’s access
    - Policies can be applied to users, but also to resources
    - Policies may be applied to resources that allow that user too
        - you need to enumerate all stores of policies
        - understand how these things are stored and related on the backend

# Top 10 CloudSec Issues

![Untitled](Top%2010%20CloudSec%20Issues/Untitled%203.png)

![Untitled](Top%2010%20CloudSec%20Issues/Untitled%204.png)

## 1. Data in Public Storage Buckets

![Untitled](Top%2010%20CloudSec%20Issues/Untitled%205.png)

- predictable subdomains with these storage buckets makes enumeration easy
- AI presents a growing risk for enumeration weaknesses with predictably named or identified systems

## Key Disclosures in Public Repositories

![Untitled](Top%2010%20CloudSec%20Issues/Untitled%206.png)

- secrets show up in code repos all the time
    - the repos handle this to an extent usually, but you need to make sense that commit history is scanned and not just the current one

## 2. Microsoft 365 Discovery

![Untitled](Top%2010%20CloudSec%20Issues/Untitled%207.png)

- You can enumerate users if you don’t handle certain configs well

## 3. Password Attacks

![Untitled](Top%2010%20CloudSec%20Issues/Untitled%208.png)

- season and year common
- wordlist gen attacks (dictionary attacks)

## 4. Conditional Access Policies

![Untitled](Top%2010%20CloudSec%20Issues/Untitled%209.png)

![Untitled](Top%2010%20CloudSec%20Issues/Untitled%2010.png)

![Untitled](Top%2010%20CloudSec%20Issues/Untitled%2011.png)

![Untitled](Top%2010%20CloudSec%20Issues/Untitled%2012.png)

![Untitled](Top%2010%20CloudSec%20Issues/Untitled%2013.png)

![Untitled](Top%2010%20CloudSec%20Issues/Untitled%2014.png)

![Untitled](Top%2010%20CloudSec%20Issues/Untitled%2015.png)

![Untitled](Top%2010%20CloudSec%20Issues/Untitled%2016.png)

## 5. Sensitive Data on File Shares

![Untitled](Top%2010%20CloudSec%20Issues/Untitled%2017.png)

- Simple searches on things like Sharepoint can reveal things to help hackers

## 6. Cleartext Creds in Resource Configs

![Untitled](Top%2010%20CloudSec%20Issues/Untitled%2018.png)

![Untitled](Top%2010%20CloudSec%20Issues/Untitled%2019.png)

## 7. Insecure Assume Role Policies

- Related to AWS permissions mostly

![Untitled](Top%2010%20CloudSec%20Issues/Untitled%2020.png)

![Untitled](Top%2010%20CloudSec%20Issues/Untitled%2021.png)

![Untitled](Top%2010%20CloudSec%20Issues/Untitled%2022.png)

- ANY USER in the world (”AWS”: “*”) can assume that role and use that org’s lambda functions

## 8. VM Web Service

![Untitled](Top%2010%20CloudSec%20Issues/Untitled%2023.png)

- all EC2s and Azure VMs have a web service (every VM).
- You can provide creds to VMs with this service
- If you can find an SSRF vuln then you can exploit it to pull temporary creds from that web service on the VM
    - Capital one hack: they accessed the metadata url for the service, exploited it, then accessed some buckets with the temp creds

## 9. Unpatched Systems

![Untitled](Top%2010%20CloudSec%20Issues/Untitled%2024.png)

- Orgs have good patching cycles, but it’s the new devices that show up and miss that cycle that become vulnerable and problematic
- It’s way easier to make things public nowadays and free up resources that are exposed

![Untitled](Top%2010%20CloudSec%20Issues/Untitled%2025.png)

- Recon can be used to find this stuff, but you won’t find everything

## 10. Overprivileged Accounts

![Untitled](Top%2010%20CloudSec%20Issues/Untitled%2026.png)

- Azure allows for subscriptions to “subscribe” users to resources

![Untitled](Top%2010%20CloudSec%20Issues/Untitled%2027.png)

![Untitled](Top%2010%20CloudSec%20Issues/Untitled%2028.png)

- lots of defaults

![Untitled](Top%2010%20CloudSec%20Issues/Untitled%2029.png)

# Additional Tools Resources

![Untitled](Top%2010%20CloudSec%20Issues/Untitled%2030.png)