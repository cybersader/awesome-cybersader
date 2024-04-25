---
publish: true
---
# Golden Ticket to the Cloud

# Cloud Threat Landscape

- Post covid cloud adoption
- Lack of security feature awareness
- Misconfiguration of tenant settings

## Basic Stats

- Most of the time its misconfiguration and almost always the customers responsibility

# Common Attack Methods

## Rogue Devices and Shadow IT

- Unauthorized machines
- Apps lacking security
- Internet facing remote management
- Unpatched applications
- IT admin backdoor

## Cred compromise via phish

- Phish email creds then do pw reset

## Cred compromise via endpoint exploit

- Email or web client vector to malware install.  Bypass firewall to cloud infrastructure

## Publicly exposed creds

- Use exposed apis or passwords to get in.  Scan repos or other osint

## Cloud platform service attack

- Recon to find api
- Find vuln in contained based API
- Functions in cloud instances
- Exhilarating data with cloud functions

## Lateral movement prem to cloud with cloud app (hubrid environment)

- Limit with iam and rbac

## 3rd party library supply chain attack

- Put malicious code into library that subverts cloud security

## More

- Data stores without AC

# Golden SAML Attack

Get into any cloud system

## SAML 2

- Cloud to id provider to cloud to unlock

## Golden saml attack

- Hacked id provider
- Noe they want to maintain access

### Steps

- Get creds and certs from hacked id provider
- Make and supply cloud provider with forged saml assertion

## Detection

- Correlate logging of id provider and cloud service IAM
- Aggregate by user
- Filter based on the MFA sessions