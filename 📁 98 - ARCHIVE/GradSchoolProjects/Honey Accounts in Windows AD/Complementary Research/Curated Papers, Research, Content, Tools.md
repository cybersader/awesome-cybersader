# Research
- [Information | Free Full-Text | A Novel Authentication Method That Combines Honeytokens and Google Authenticator](https://www.mdpi.com/2078-2489/14/7/386) 
	- Not a great reputable paper, but could be theoretical
- 
# Password Sprays
## Attacks & Detections
### KQL - Kusto Query Language
- [reprise99/awesome-kql-sentinel: A curated list of blogs, videos, tutorials, queries and anything else valuable to help you learn and master KQL and Microsoft Sentinel](https://github.com/reprise99/awesome-kql-sentinel) 

- https://github.com/alexverboon/Hunting-Queries-Detection-Rules/blob/354e2576651c188366626ed25e55a718f083fede/Defender%20365/MD365-PasswordSprayAttacks.md 
- [Sentinel-Queries/Security Alert/SecurityAlert-FindBlastRadiusofPasswordSpray.kql at 66b2d7fa13985eabd864ce4a965b52bec60c1dec · reprise99/Sentinel-Queries](https://github.com/reprise99/Sentinel-Queries/blob/66b2d7fa13985eabd864ce4a965b52bec60c1dec/Security%20Alert/SecurityAlert-FindBlastRadiusofPasswordSpray.kql) 
- [Threat-Hunting-and-Detection/Credential Access/Password Spray.md at 7866d9e9c59212cf7cc2da52d012199af6c64dbe · Cyb3r-Monk/Threat-Hunting-and-Detection](https://github.com/Cyb3r-Monk/Threat-Hunting-and-Detection/blob/7866d9e9c59212cf7cc2da52d012199af6c64dbe/Credential%20Access/Password%20Spray.md?plain=1) 
- [AzureAD-Attack-Defense/PasswordSpray.md at f862468fc19bf7f67ace5ee75e50ad516525f870 · Cloud-Architekt/AzureAD-Attack-Defense](https://github.com/Cloud-Architekt/AzureAD-Attack-Defense/blob/f862468fc19bf7f67ace5ee75e50ad516525f870/PasswordSpray.md?plain=1) 
- [Azure_Active_Directory/Log Analytics/Password Spray KQL at 4ca4a72f73ca4847863a6e7ece866c02b2d87d8f · chadmcox/Azure_Active_Directory](https://github.com/chadmcox/Azure_Active_Directory/blob/4ca4a72f73ca4847863a6e7ece866c02b2d87d8f/Log%20Analytics/Password%20Spray%20KQL) 
- [https://github.com/mosesrenegade/AzureAD-Attack-Defense/blob/9cf7a942d1a0395098b0002664c8e11fcc1198f0/PasswordSpray.md?plain=1 > L50](https://github.com/mosesrenegade/AzureAD-Attack-Defense/blob/9cf7a942d1a0395098b0002664c8e11fcc1198f0/PasswordSpray.md?plain=1#L50) 
- [https://github.com/ep3p/Sentinel_KQL/blob/8b3dc8c195140c6c97162d7b022ebaba8965b43a/Queries/Azure AD Identity Protection/Multiple-Password Spray.kql > L6](https://github.com/ep3p/Sentinel_KQL/blob/8b3dc8c195140c6c97162d7b022ebaba8965b43a/Queries/Azure%20AD%20Identity%20Protection/Multiple-Password%20Spray.kql#L6) 
- 
### Sigma
- [Password Spraying via Explicit Credentials | Detection.FYI](https://detection.fyi/sigmahq/sigma/unsupported/windows/win_security_susp_failed_logons_explicit_credentials/) 
```
title: Password Spraying via Explicit Credentials
id: 196a29c2-e378-48d8-ba07-8a9e61f7fab9
status: unsupported
description: Detects a single user failing to authenticate to multiple users using explicit credentials.
references:
    - https://docs.splunk.com/Documentation/ESSOC/3.22.0/stories/UseCase#Active_directory_password_spraying
author: Mauricio Velazco, Zach Mathis
date: 2021/06/01
modified: 2023/02/24
tags:
    - attack.t1110.003
    - attack.initial_access
    - attack.privilege_escalation
logsource:
    product: windows
    service: security
detection:
    selection:
        EventID: 4648
    filter:
        SubjectUserName|endswith: '$' # There will be much noise from computer accounts to UMFD-0, DWM-1, etc...
    timeframe: 1h
    condition: selection and not filter | count(TargetUserName) by SubjectUserName > 10
falsepositives:
    - Terminal servers
    - Jump servers
    - Other multiuser systems like Citrix server farms
    - Workstations with frequently changing users
level: medium

```
### Misc Attacks & Detection Related
- https://github.com/redcanaryco/atomic-red-team/blob/master/atomics/T1110.003/T1110.003.md 
- https://learn.microsoft.com/en-us/defender-for-identity/credential-access-alerts#suspected-brute-force-attack-kerberos-ntlm-external-id-2023 
- https://www.splunk.com/en_us/blog/security/detecting-password-spraying-attacks-threat-research-release-may-2021.html 
- https://www.splunk.com/en_us/blog/learn/password-spraying.html 
- https://viperone.gitbook.io/pentest-everything/everything/everything-active-directory/credential-access/brute-force/password-spraying
	- Password spraying uses one password (e.g. 'Password01'), or a small list of commonly used passwords, that may match the complexity policy of the domain. Logins are attempted with that password against many different accounts on a network to avoid account lockouts that would normally occur when brute forcing a single account with many passwords.
- [Password Spraying Attack | OWASP Foundation](https://owasp.org/www-community/attacks/Password_Spraying_Attack)
### Main Tooling
- [dafthack/DomainPasswordSpray: DomainPasswordSpray is a tool written in PowerShell to perform a password spray attack against users of a domain. By default it will automatically generate the userlist from the domain. BE VERY CAREFUL NOT TO LOCKOUT ACCOUNTS!](https://github.com/dafthack/DomainPasswordSpray)
	- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Complementary%20Research/IMG-20231120090525171.png)
### Additional Password Spray Tools
- [ustayready/fireprox: AWS API Gateway management tool for creating on the fly HTTP pass-through proxies for unique IP rotation](https://github.com/ustayready/fireprox) 
# Mitre Techniques - ATT&CK, D3FEND
- Password spray - "T1110.003"
- [mitre d3fend - Google Scholar](https://scholar.google.com/scholar?hl=en&as_sdt=0%2C15&as_ylo=2019&q=mitre+d3fend&btnG=) 
- ["T1110.003" - Google Scholar](https://scholar.google.com/scholar?start=0&q=%22T1110.003%22&hl=en&as_sdt=0,15&as_ylo=2019) 

- https://d3fend.mitre.org/offensive-technique/attack/T1110.003/ 
	- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Complementary%20Research/IMG-20231120083026709.png)
	- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Complementary%20Research/IMG-20231120083717297.png)
- https://attack.mitre.org/techniques/T1110/003/
	- APTs
		- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Complementary%20Research/IMG-20231120083956763.png)
	- Mitigations and Detection
		- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Complementary%20Research/IMG-20231120084013746.png)

## Wordlist Generation for Password Spraying
- https://www.horizon3.ai/the-unreasonable-effectiveness-of-password-spray/
	- NodeZero generates probable passwords to spray based on commonly known breached passwords, context-specific terms such as the company name or domain name, or a custom dictionary supplied by the user.
	- Attackers know that most companies have set up a password policy to enforce a minimum password length of 8 characters, password complexity rules (including lowercase, uppercase, digits, and special characters), and periodic rotation of passwords. Password complexity and rotation policies have ironically led users to creating more predictable passwords such as passwords starting with an uppercase letter, ending in 1!,, or containing seasons and years. NodeZero optimizes for these cases to maximize the likelihood of success.
	- In addition to spraying probable weak passwords, NodeZero also attempts to spray any passwords it finds organically during the course of a pentest, just like a real-world attacker would do. These are passwords that may be found through unintended data exposure or exploitation, and they may not necessarily be weak. This form of password spray is used to exploit password reuse across multiple accounts.
- 

## Stats, Annual Reports
- [Advancing Password Spray Attack Detection - Microsoft Community Hub](https://techcommunity.microsoft.com/t5/microsoft-entra-azure-ad-blog/advancing-password-spray-attack-detection/ba-p/1276936) 
	- Password spray is one of the most popular attacks, accounting for more than a third of account compromise in organizations.
- [2020 State of Password and Authentication Report - YubiKey - Yubico](https://www.yubico.com/blog/yubico-releases-2020-state-of-password-and-authentication-security-behaviors-report/)
- [The State of Password Security 2023 Report | Bitwarden Resources](https://bitwarden.com/resources/the-state-of-password-security/)
- [Password Manager Industry Report and Market Outlook in 2023 | Security.org](https://www.security.org/digital-safety/password-manager-annual-report/) 
- [jacobdjwilson/awesome-annual-security-reports: A curated list of annual cyber security reports](https://github.com/jacobdjwilson/awesome-annual-security-reports) 
- 