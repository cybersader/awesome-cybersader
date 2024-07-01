> PCI, Testing, and You

# Focus on Pentesting
- Lots of "seismic" changes to testing
- 300+ pages
# Password Requirements
- Old PCI had terrible password complexity requirements
	- Used to be 7 characters - cracked in under a second
	- This was 8 characters from 1975, because they were worried Russians could crack passwords over months after trying every possible password over 6 months.  Rotary system.  Doing this realistically today would mean changing your password every 0.6 seconds
- They changed it from 7 to 12.....WHAT THE F***!
	- 12 is not strong and not even in effect till March 2025.....BRUH
	- ![](__attachments/BHIS%20Videos/IMG-PCI%204.0%20Rants%20with%20John%20Strand-2024063021.png)
- PCI Mafia
	- some systems don't support requirements above 8 like solaris or AS 400
	- Don't make policies a certain way because of some exceptions...they are EXCEPTIONS
	- Then those exceptions are documented, and THEN you can have conversations about replacing those exceptions
- PCI and MFA
	- PCI mafia - "we can use 12 char if we have MFA" ....... NOOOOOO
	- They should revoke their CISSP --- XD
	- Can you ensure that MFA is implemented everywhere? -- usually no
	- Always something in an org that doesn't require MFA, so you should be consistent
	- PCI Pet Cemetery
	- The 80s called and they want their password requirements back
- The minimum standard is usually gonna be the standard

# Changes
## Change 1: Wireless
- Lots of orgs don't have wireless policies, so they don't test it
- 11.2.1
- both authorized and unauthorized APs
- applies even when a policy prohibits unauthorized WAPs
- Does that include zigbee, wireless keyboards, and things like that?
	- 802.11 tech only
- Test the detection of unauthorized wireless APs
## Change 2: Authenticated Scans
- 11.3.1.2
- Internal vulnerability scans are performed via authenticated scanning
- Why?
	- lots of attacks that don't relate to perimeter/external facing services, but rather the components that make up applications that we use
	- ExifTool - used by apps to parse data; used for RCE
	- Component analysis vulns everywhere
- Greatest workload increase for handling scanning data
- "internal" now means inside "CDE"
- Significant change scan requirement - but it doesn't need to be authenticated
## Change 3: All Vulns
- 11.3.1.1
- Not just critical vulns
	- low - critical
	- Org risk classification
		- "highs and criticals" - most orgs would think of what the tool classifies, but PCI is talking about how the org classifies things rather than tools
		- 
	- FTP???
	- "please disregard that system"
	- Good stuff in the lows and info
		- lots of scanners don't understand context
		- track everything and design processes to start getting value out of these
		- Sort by plugin_id or vuln -- not by IP and vuln score
		- remediate then through ansible, puppet, chef GPO
## Change 4: Methodology
- 11.4.1
- Problem:
	- when orgs do pentests, they say they use NIST, PTES, or whatever 
	- list out vulns and findings
	- not a repeatable testing methodology; customers can't repeat the test from that
- Some testers don't want to show people how they got into something because it's their "secret sauce."  
	- Stop and share it...you're not special
- Smart technical people that can communicate are precious and unicorns
- DOCUMENT YOUR METHODOLOGY alongside your progress and show how you did everything you had done.  Give a high-level approach
- DOCUMENT AS YOU GO
- Debrief report doesn't take much time when this is done
## Change 5: Cloud/SaaS Pentesting Support
- 11.4.7
	- Multi-tenant service providers (cloud/saas)
	- Cloud must support customers for external pentests per 11.4.3 and 11.4.4
- "Yo saas and cloud.  You CANNOT put out a blanket requirement that people can't pentest your cloud infrastructure"
- What this does:
	- they need to support testing activities
	- they need to support pentest firms and their activities when they are being done FROM cloud providers
	- Amazon needs to support scanning activity
	- Testers can't usually stand up botnet infra, so they have to use cloud
- DigitalOcean and AWS
	- Great to work with for pentests
# Why All This Matters
- Commodization of IR Services
	- Patterson Cake
	- IR has been dominated by insurance industry
	- Insurance has been dictating the terms and quality of IR
- IR and Forensics (classes) doesn't talk about quality a lot 
- IR tries to be too cheap allowing insurance to dictate what's important.  IR is now 125 per hour. They offshore lots of the work to India
- IR has a big difference with testing community right now.
	- Forensics and IR needs higher quality
- One standard away from InfoSec Armageddon 
	- AI pentests are a good 80%, but we need skill to go the rest of the way
	- 