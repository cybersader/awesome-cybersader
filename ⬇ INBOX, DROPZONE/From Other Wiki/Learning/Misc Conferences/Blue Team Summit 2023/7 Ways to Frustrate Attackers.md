--- 

--- 
# Blue Team is Doing Better
- Backdoors beat ransomware for top actions on objectives
# What are the Attackers Doing?
- Phishing as always

# Attack & Defense Techniques
- Spearphished based on open source research
- Bloodhound domain enumeration
	- Detect LDAP enumeration in general
- Unconstrained delegation
	- They used misconfiguration to steal DC access
	- Detect kerberoasting and golden SAML
	- Ensure logging of event ID 4769
	- PowerShell v5 and script block logging enabled
		- 4100, 4103, 4104 to get PS Kerberos ticket requests
- Lateral movement
	- used AppDomainManager and DLL hijacking
	- Use WMI event subscriptions
	- impersonated accounts to avoid detection - relied on SMB pipe binds
	- Break out admin accounts by asset tier (workstations, servers, DCs, etc.)
	- Use LAPS
	- IDS
	- Harden admin network
		- block wkstn to wkstn with admin
		- WinRM to allow traffic from certain hosts
		- admins should have dedicated hosts
- Unsecured Creds
	- accidentally typing in passwords
	- make sure login is convenient to systems
- C2
	- Cobalt Strike and Merlin
	- Use things like Onion, Zeek, or RITA
	- Catch beaconing activity
- 