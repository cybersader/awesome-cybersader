- [BHIS | Intro to Windows Event Collecting | Nick & Noah | 1 Hour - YouTube](https://www.youtube.com/watch?v=Eix5BPta56E) 
- Intro to windows event collecting and forwarding
	- forwarding windows event logs
	- collecting event logs
	- using sysmon
	- manual setup
	- deployment
# LINKS
- [https://github.com/DefensiveOrigins/AtomicPurpleTeam](https://github.com/DefensiveOrigins/AtomicPurpleTeam)
* [https://github.com/olafhartong/sysmon-modular](https://github.com/olafhartong/sysmon-modular)
* [https://github.com/palantir/windows-event-forwarding](https://github.com/palantir/windows-event-forwarding)

# Curated Windows Events & Subscriptions for Security
- 
# Windows Event Collecting?
## General Arch
- Forwarding
	- sending logs from Event Viewer
- Collection
	- centralized hosts to store logs and forward to SIEM or store
- Characteristics
	- Uses WinRM port 5985
	- Encrypts using Kerberos domain env
## Deployment
- WinRM - 2012 R2 and later default
- policy applied to endpoints to collect from
- policy tells endpoints the collector to communicate with
## Event Forwarding Subscriptions
- Can be source or collector initiated
- Define what to forward
- defines hosts in scope
## Why Sysmon?
- Sysmon adds way more
	- hashes
	- parent process IDs, names, command line
	- process creations
	- network connections
	- DNS lookups
	- file actions
	- powershell transcript logs
	- auto-archive deleted logs (really cool)
## Ways to Query Sysmon
- Usually sent to SIEM stack, but you don't need that
- Builtin event collecting using "Event Viewer"
	- You'll need to increase max log store size, but at least it's free
	- You can use filters and event IDs
	- Find for certain keywords
	- not fast at all
	- Use a better search engine like Elastic or OpenSearch
- WEC for MSP style thing?
# Win Event Stack
- sysmon > Win Event Logs > (WEF > WEC server)
## Sysmon
- Choose your config
	- [EventLogging/DEFCON3/sysmon at master · blackhillsinfosec/EventLogging](https://github.com/blackhillsinfosec/EventLogging/tree/master/DEFCON3/sysmon) 
	- [SwiftOnSecurity/sysmon-config: Sysmon configuration file template with default high-quality event tracing](https://github.com/SwiftOnSecurity/sysmon-config) 
	- [olafhartong/sysmon-modular: A repository of sysmon configuration modules](https://github.com/olafhartong/sysmon-modular) 
- Resource usage
	- bit more with sysmon modular
	- differs based on config
- Deployment
	- They use GPO option with UNC path for updates and sysmon archive log
	- Use SCCM?
	- archive log can only be emptied by NT AUTHORITY account
	- PS1 on scheduled task that updates config on all host systems with GPO
## WEF/WEC Setup
- WEF GPO
	- computer config/ policies / administrative templates / windows components / event forwarding
		- enable
		- specify FQDN of the collector with subscription manager path
- if collector is on different network then watch for firewall blockage
	- can look like sus HTTP traffic
- WinRM on all endpoints
	- they prefer automatic delayed start
	- can be created on WEF GPO, but usually not desirable and should be separate policy
	- ![](../../__attachments/Detection%20Engineering/IMG-Windows%20Event%20Collecting%20to%20SIEM-2024020614-1.png)
- enabling event collector service
	- ![](../../__attachments/Detection%20Engineering/IMG-Windows%20Event%20Collecting%20to%20SIEM-2024020614-2.png)
- Creating subscriptions
	- best to make them separate by category, type, etc.  Don't collect all of them.  
	- DON'T OVERLOAD HOSTS
	- Break them up your way
	- 
	- ![](../../__attachments/Detection%20Engineering/IMG-Windows%20Event%20Collecting%20to%20SIEM-2024020614-3.png)
	- ![](../../__attachments/Detection%20Engineering/IMG-Windows%20Event%20Collecting%20to%20SIEM-2024020614-4.png)
		- You can use destination log as folder,
			- but forwarded events is great for stuff like "log beats?"
		- Types
			- Collector initiated
				- You can't specific AD groups of endpoints
				- MS wants you to have knowledge of exact endpoints 
			- Source computer initiated
				- You can specify AD user groups with this type
				- You can cover old and new (anything that's domain joined)
- subscription filters
	- ![](../../__attachments/Detection%20Engineering/IMG-Windows%20Event%20Collecting%20to%20SIEM-2024020614-5.png)
	- There is an XML tab that can be "automated" with PS shell stuff (maybe)
## Pitfalls to Watch Out For
### Resource Usage, LOTS of Logs
- Sysmon can crash your computer
### NetworkService Account
- NetworkService Account needs to have access to the log readers group
- security log on DCs won't allow NetworkService account access (after applying GPO) usually till DC has been reset 
- Might have to restart DCs - lots of change control
### WinRM Required
- WinRM is required
- If WEC is firewalled off, then you'll need to make rules to allow WinRM
	- port 5985 or 5986 allowed
- you can use HTTPS too, but youll need SSL certs
	- PKI hard
### WEC Sizing
- Right-size WEC or multiple WECs
- Guides and calculators to WEC sizing
#### Testing with Resources
- Start with small subset
- watch CPU, memory, disk iops
- watch changes throughout day

- Disk iops is MOST IMPORTANT
	- put WECs on SSDs if you can
#### VMs or Physical Hardware?
- prefer VMs for resizing
#### Multiple WECs
- avoids egress and shipping over expensive WAN links
# How to in 5 Minutes
- Sysmon config 
	- [EventLogging/DEFCON3/sysmon at master · blackhillsinfosec/EventLogging](https://github.com/blackhillsinfosec/EventLogging/tree/master/DEFCON3/sysmon) 
	- Assumes sending to Elastic Stack with logbeats
- Event Viewer
	- Look at subscriptions
		- nothing set
- Use WEC configurator from Blackhills repo
	- [EventLogging/DEFCON3/sysmon at master · blackhillsinfosec/EventLogging](https://github.com/blackhillsinfosec/EventLogging/tree/master/DEFCON3/sysmon) 
	- ![](../../__attachments/Detection%20Engineering/IMG-Windows%20Event%20Collecting%20to%20SIEM-2024020615.png)
- Setting up GPO on DC
	- Use Default DC for Demo
	- Use DC-Configurator no audit
		- audit - Extra GPOs for enhanced auditing
		- ![](../../__attachments/Detection%20Engineering/IMG-Windows%20Event%20Collecting%20to%20SIEM-2024020615-1.png)
	- Sites.csv
		- add in multiple sites for AD
		- location, wecmain, web01.labs.local
	- ![](../../__attachments/Detection%20Engineering/IMG-Windows%20Event%20Collecting%20to%20SIEM-2024020615-2.png)
	- GP mgmt screen
		- new policies shown
		- ![](../../__attachments/Detection%20Engineering/IMG-Windows%20Event%20Collecting%20to%20SIEM-2024020615-3.png)
		- Link to domain
			- ![](../../__attachments/Detection%20Engineering/IMG-Windows%20Event%20Collecting%20to%20SIEM-2024020615-4.png)

- Run Sysmon configurator on DC
	- ![](__attachments/Detection%20Engineering/IMG-WinEvents%20&%20Sysmon%20Setup%20OPENLANE-2024063021-30.png)
	- UNC path
		- network share file to help put config file with sysmon version to be running and other details
		- Just make a file on DC in shared folder
			- ![](__attachments/Detection%20Engineering/IMG-WinEvents%20&%20Sysmon%20Setup%20OPENLANE-2024063021-31.png)
			- ![](__attachments/Detection%20Engineering/IMG-WinEvents%20&%20Sysmon%20Setup%20OPENLANE-2024063021-32.png)
			- Allow read, but only DAs can change the files
- Link GPO
	- ![](__attachments/Detection%20Engineering/IMG-WinEvents%20&%20Sysmon%20Setup%20OPENLANE-2024063021-33.png)
	- ![](__attachments/Detection%20Engineering/IMG-WinEvents%20&%20Sysmon%20Setup%20OPENLANE-2024063021-34.png)
	- ![](__attachments/Detection%20Engineering/IMG-WinEvents%20&%20Sysmon%20Setup%20OPENLANE-2024063021-35.png)
- GP update on workstations
	- you can force it in cmd
	- ![](__attachments/Detection%20Engineering/IMG-WinEvents%20&%20Sysmon%20Setup%20OPENLANE-2024063021-36.png)
	- restarts

- takes time for subscriptions to roll into workstations

- subscriptions
	- ![](../../__attachments/Detection%20Engineering/IMG-Windows%20Event%20Collecting%20to%20SIEM-2024020615-12.png)
# Don't Use Event Viewer For Large Deployments
- Event Viewer usage is okay for less than like 10 systems with very small business
# MISC
## Taking it to Next-Level with Deployment
- Use agent like
	- Cribl Edge
	- Win LogBeats service
## Windows Endpoint for WEC? VM?
- Do not use DC
- Use a standard windows base image with windows server, then use the scripts from GitHub repos
## Central SIEM for 300 People
- They use ELK stack
- For Splunk just use splunkd and ship to Splunk
- align costs with log usage
## Advanced Audit Policies
- (question) Do you need this enabled?
	- GP audit policies
- The subscriptions say "if you have this log, then give me it"
- Doesn't requires advanced audit policies to be ran
- Advanced audit policies are extra

- How to manage stale log sources?
	- WEC get to point where server works, but event viewer definitely can't work with all the logs
	- drop to CLI if you have to troubleshoot
	- likely resource retention problem on the WEC
	- check disk iops and use SSDs instead if you can

## WinRM Exposition and Out of Band Hosts Access
- Exposing ports for WinRM
	- port 5985 or 5986 allowed
- If you have out of band hosts
	- They store logs in local events store
		- can be limited on server and workstations
		- Can store days worth of logs without sysmon
	- Happens if you're a salesmen and only need O365
## Sysmon Config Shared Store
- put it on SYSVOL with read 
- make sure permissions are locked down appropriately
- it's a scheduled task, so it could be bad if it's replaced with something malicious


