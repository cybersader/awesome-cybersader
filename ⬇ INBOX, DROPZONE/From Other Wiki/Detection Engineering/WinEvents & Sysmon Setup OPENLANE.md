# Approach
- Was looking into Windows Event Logging to fill in some detection gaps
	- EDR and other host-based detection can't do everything
	- I'm looking into implementing Cribl Edge agents which could forward Windows workstation and maybe server events to Cribl, then to our future SIEM
	- Hoping to detect all the things our EDR doesn't and give us more capability during IR and analysis
	- Detect things like failed logins, etc.
- It's pretty simple to setup Sysmon
	- Played around with sysmon modular configs, Wireshark, Tcpview, Event Viewer, and more Sys Internals tools yesterday
- Gonna looking at some of the problems with Hemanth for Cribl agents (potentially) with the cons that come with agents like resources usage. Hoping we can use SCCM and/or GPO to push out the configuration for endpoints.  We would be doing this to start with a small number of devices.   We could atleast store this data in some buckets for IR and investigations that could happen.
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
# Cribl Edge
## Cribl Edge with Windows, Sysmon - LINKS
- [Getting Better Sysmon Data Using Cribl Stream - Cribl](https://cribl.io/blog/getting-better-sysmon-data-using-cribl-stream/) 
- [Exploring Cribl Edge on Windows | Cribl Docs](https://docs.cribl.io/edge/explore-edge-win/)
- [Meet Cribl Search | Cribl Docs](https://docs.cribl.io/search/)
- [Fleets | Cribl Docs](https://docs.cribl.io/edge/fleets/)
- [Windows Event Forwarder | Cribl Docs](https://docs.cribl.io/edge/sources-wef/#clients) 
- [Windows Event Logs | Cribl Docs](https://docs.cribl.io/edge/sources-windows-event-logs/)
- [Windows Observability Using Cribl Edge | Cribl Docs](https://docs.cribl.io/edge/usecase-windows-observability/#source)
- [Windows Observability Using Cribl Edge | Cribl Docs](https://docs.cribl.io/edge/usecase-windows-observability/#locate-windows-event-logs-in-the-server)
- [Exploring Cribl Edge on Windows | Cribl Docs](https://docs.cribl.io/edge/explore-edge-win/#processes)
- [Exploring Cribl Edge on Windows | Cribl Docs](https://docs.cribl.io/edge/explore-edge-win/#files)
- [Exploring Cribl Edge on Windows | Cribl Docs](https://docs.cribl.io/edge/explore-edge-win/#host-metadata)
- [Exploring Cribl Edge on Windows | Cribl Docs](https://docs.cribl.io/edge/explore-edge-win/)
- [Windows Event Forwarder | Cribl Docs](https://docs.cribl.io/edge/sources-wef/#clients)
- [About Cribl Edge | Cribl Docs](https://docs.cribl.io/edge/)
- [Deployment Planning | Cribl Docs](https://docs.cribl.io/edge/deploy-planning/#performance-considerations)

## Collection and Forwarding Approach
- Start with workstations and be careful with servers
- links
	- [Windows Event Forwarder | Cribl Docs](https://docs.cribl.io/edge/sources-wef/)
	- [Windows Event Logs | Cribl Docs](https://docs.cribl.io/edge/sources-windows-event-logs/)
- How Edge works
	- can work as collecting agent, but also forwarding node?
- Edge use combines with cribl stream cost wise
- tracking resource usage for edge on hosts?
## Resource Utilization
- https://docs.cribl.io/edge/deploy-planning/#performance-considerations 
	- all in memory
	- not lots of disk allocation
# Cribl Edge Agent Testing and Setup for Win Events Logging
## Windows Event Local Setup/POC and Docs
### Sysmon Setup (individual and large-scale/GPO-based)
- Links
	- [Deploying Sysmon through GPO -](https://securitynguyen.com/posts/cyber-homelabs/deploying-sysmon-through-gpo/) 
	- [Detecting Sysmon on the Victim Host - Red Team Notes](https://www.ired.team/offensive-security/enumeration-and-discovery/detecting-sysmon-on-the-victim-host)
	- [Operating Offensively Against Sysmon](https://www.darkoperator.com/blog/2018/10/5/operating-offensively-against-sysmon) 
#### Windows Events Index
- [Windows Security Log Encyclopedia](https://www.ultimatewindowssecurity.com/securitylog/encyclopedia/) 
- [Event Identifiers (Event Logging) - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/eventlog/event-identifiers) 
- [Appendix L - Events to Monitor | Microsoft Learn](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-l--events-to-monitor) 
#### Sysmon Configs
- [EventLogging/DEFCON3/sysmon/sysmonconfig.xml at master · blackhillsinfosec/EventLogging](https://github.com/blackhillsinfosec/EventLogging/blob/master/DEFCON3/sysmon/sysmonconfig.xml) 
- [SwiftOnSecurity/sysmon-config: Sysmon configuration file template with default high-quality event tracing](https://github.com/SwiftOnSecurity/sysmon-config) 
- [olafhartong/sysmon-modular: A repository of sysmon configuration modules](https://github.com/olafhartong/sysmon-modular) 
- [palantir/windows-event-forwarding: A repository for using windows event forwarding for incident detection and response](https://github.com/palantir/windows-event-forwarding)
- [Neo23x0/sysmon-config: Sysmon configuration file template with default high-quality event tracing](https://github.com/Neo23x0/sysmon-config)
- [deep-security/sysmon-config](https://github.com/deep-security/sysmon-config) 
- [Working With Sysmon Configurations Like a Pro Through Better Tooling | by Matt Graeber | Posts By SpecterOps Team Members](https://posts.specterops.io/working-with-sysmon-configurations-like-a-pro-through-better-tooling-be7ad7f99a47) 
- [darkoperator/Posh-Sysmon: PowerShell module for creating and managing Sysinternals Sysmon config files.](https://github.com/darkoperator/Posh-Sysmon) 
- 
#### Setting Up Sysmon Locally
- Created config.xml file in Sysinternals folder
- Ran commands 
	- https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon#examples 
	- ![500](__attachments/Detection%20Engineering/IMG-WinEvents%20&%20Sysmon%20Setup%20OPENLANE-2024063021.png)
- Make sure to do this as admin
- Start service or restart computer
	- sysmon starts large-scale after people restart 
	- ![500](__attachments/Detection%20Engineering/IMG-WinEvents%20&%20Sysmon%20Setup%20OPENLANE-2024063021-19.png)

- Checking for evidence of sysmon from red team perspective
	- `Get-Process | Where-Object { $_.ProcessName -eq "Sysmon" }`
	- `Get-Service | where-object {$_.DisplayName -like "*sysm*"}`
	- `ls HKCU:\Software\Sysinternals`
	- To look at sysmon config: `sysmon -c`
- Look at initial results in event viewer
	- Open event viewer
	- Go to Applications and Services Logs > Microsoft > Windows > Sysmon > Operational
	- ![500](__attachments/Detection%20Engineering/IMG-WinEvents%20&%20Sysmon%20Setup%20OPENLANE-2024063021-20.png)

- How to reset sysmon with new config
	- https://github.com/SwiftOnSecurity/sysmon-config?tab=readme-ov-file#uninstall 
- Resource usage
	- bit more with sysmon modular
	- differs based on config
#### Setting Up Additional Windows Logging and Auditing
- Hunters
	- Supported Providers
		- Each Windows Event Logs provider has its own data structure, and Hunters supports the following providers:
			- Security Auditing: `Microsoft-Windows-Security-Auditing`
			- PowerShell event logs: `Microsoft-Windows-Powershell`, `Powershell`
			- DNS client logs: `Microsoft-Windows-Dns-Client`
- Windows Configuration and Deployment
	- [Basic security audit policy settings - Windows 10 | Microsoft Learn](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/basic-security-audit-policy-settings) 
	- [Advanced security audit policy settings - Windows 10 | Microsoft Learn](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/advanced-security-audit-policy-settings) 
	- [Plan and deploy advanced security audit policies - Windows 10 | Microsoft Learn](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/planning-and-deploying-advanced-security-audit-policies) 
	- (LIST) Stuff to enable for Windows Events
		- `Security`
			- Old name in event viewer? -  `Microsoft-Windows-Security-Auditing`
		- `Microsoft-Windows-PowerShell`
			- `Microsoft-Windows-PowerShell/Admin`
			- `Microsoft-Windows-PowerShell/Operational`
		- `Windows PowerShell`
		- `Microsoft-Windows-Dns-Client`
			- `Microsoft-Windows-DNS-Client/Operational`
	
		- `Microsoft-Windows-Sysmon`
			- `Microsoft-Windows-Sysmon/Operational`
	- (DESC) Stuff to enable for Windows Events 
		- Audit Policies (security auditing)
			- [Audit Policy Recommendations | Microsoft Learn](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/audit-policy-recommendations)
			- Enabled remotely (with GPO)
				- [Enabling audit via GPO](https://manuals.gfi.com/en/esm2013administrator/content/acm/topics/config/enablingauditviagpo.htm#:~:text=Click%20Start%20%3E%20Administrative%20Tools%20%3E%20Group,%3E%20Security%20Settings%20%3E%20Audit%20Policy.) 
			- Enabling locally
				- [Chapter 2 Audit Policies and Event Viewer](https://www.ultimatewindowssecurity.com/securitylog/book/page.aspx?spid=chapter2) 
				- Stuff to enable
					- Account Logon (kerberos auth and ticket ops)
					- Logon and Logoff (Other)
					- Object Access (success only)
				- Where to find in Local Security Policy
					- ![](__attachments/Detection%20Engineering/IMG-WinEvents%20&%20Sysmon%20Setup%20OPENLANE-2024063021-21.png)
					- ![](__attachments/Detection%20Engineering/IMG-WinEvents%20&%20Sysmon%20Setup%20OPENLANE-2024063021-22.png)
		- PowerShell auditing
			- [Configure PowerShell logging to see PowerShell anomalies in Splunk UBA - Splunk Documentation](https://docs.splunk.com/Documentation/UBA/5.3.0/GetDataIn/AddPowerShell#:~:text=In%20the%20Windows%20PowerShell%20GPO,on%20Module%20Logging%20to%20enabled.) 
			- Extend PowerShell Auditing to include Script Block Logging (event code 4104).
			- By default, only commands that are categorized as ‘Warning’ are being logged. Configuring Script Block Logging ensures all PowerShell commands are being captured.
			- Script Block Logging can be configured through the GPO: Computer Configuration => Policies => Administrative Templates => Windows Components/Windows PowerShell => Turn on PowerShell Script Block Logging.
			- The option of Log script block invocation start/stop events should remain Disabled.
		- Command Line auditing
			- [Command line process auditing | Microsoft Learn](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/component-updates/command-line-process-auditing) 
			- By default, the security event “A new process has been created” (event code 4688) does not present details of the full command line attached to the new process.
			- Furthermore, it can be useful for Hunters detectors and enrichments. For example, detectors and enrichments that are based on EDR process data would also cover machines that don’t have EDR agent installed or machines whose EDR agent was tampered with.
			- Enabling command line auditing may expose the organization to a risk of a credential leak in case clear text passwords are being used in CLI or batch scripts. For this reason, the configuration is marked as Optional.
		- DNS client events

- Detailed config for sysmon, Security logs, and audit policies
	- Defaults/Recommendations/Sources
		- [Audit Policy Recommendations | Microsoft Learn](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/audit-policy-recommendations) 
		- 
	- FOR LOCAL TESTING CURRENTLY
		- Local Security Policy > Advanced Audit Policy Configuration > System Audit Policies Local Group Policy Object
			- Account Logon
				- Audit Kerberos Authentication Service - Success and Failure
				- Audit Kerberos Service Ticket Operations - Success and Failure
			- Logon/Logoff
				- Audit Account Lockout - Success
				- Audit Logoff - Success
				- Audit Logon - Failure
				- Audit Other Logon/Logoff Events - Success
			- Object Access
				- Audit Other Object Access Events - Success
		- 

### Event Collection and Forwarding with Cribl Edge
- [Windows Event Logs | Cribl Docs](https://docs.cribl.io/edge/sources-windows-event-logs/) 
	- Cribl Edge supports collecting local Windows Event Logs in batches. You can collect the standard event logs – Application, Security, and System – and any other event logs on the machine.
	- Type: **Pull** | TLS Support: **N/A** | Event Breaker Support: **No**
	- General Settings[​](https://docs.cribl.io/edge/sources-windows-event-logs/#general-settings "Direct link to heading")
		- **Input ID**: Enter a unique name to identify this Source definition.
		- **Event logs**: Enter one or more event logs to collect. `Security` is prefilled as a default. Click **Add log** to specify more event logs (e.g., `Application` or `System`).
		- This Source can collect events from the Forwarded Events log when **Event format** is set to **XML**.
		- For more information about how to locate Windows event logs on a Windows server, see [Locate Windows Events Logs in the Server](https://docs.cribl.io/edge/usecase-windows-observability#locate-windows-event-logs-in-the-server).
- [Windows Observability Using Cribl Edge | Cribl Docs](https://docs.cribl.io/edge/usecase-windows-observability/#source) 
	- Local deployment steps:
		- create windows specific fleet
		- create windows_logs subfleet
		- [Installing Cribl Edge on Windows | Cribl Docs](https://docs.cribl.io/edge/deploy-windows/)
			- use bootstrap script to add edge node - run in CLI/terminal
				- ![500](__attachments/Detection%20Engineering/IMG-WinEvents%20&%20Sysmon%20Setup%20OPENLANE-2024063021-23.png)
				- Getting script to run
					- Admin, run, and wait
- Collecting Windows events with Cribl Edge config
	- Links
		- [Locate Windows Event Logs](https://docs.cribl.io/edge/usecase-windows-observability/#locate-windows-event-logs-in-the-server)
		- [Configure Windows Events Logs Source](https://docs.cribl.io/edge/usecase-windows-observability/#configure) 
		- [Windows Observability Using Cribl Edge | Cribl Docs](https://docs.cribl.io/edge/usecase-windows-observability/#configure) 
	- Steps
		- Locate the paths of the logs you wanted collected and forwarded
			- Use event viewer, right click on event folders you want collected, > properties, then copy full log path
			- ![500](__attachments/Detection%20Engineering/IMG-WinEvents%20&%20Sysmon%20Setup%20OPENLANE-2024063021-24.png)
			- `%SystemRoot%\System32\Winevt\Logs\Microsoft-Windows-Sysmon%4Operational.evtx`
		- Add it to Windows Event Logs sources under "Sources" for fleet or subfleet

#### Breaking Out Subfleets by Types of Windows Events Gathered
- Sysmon isn't present on some devices, so we need to make a subfleet that applies only to endpoints
	- ![500](__attachments/Detection%20Engineering/IMG-WinEvents%20&%20Sysmon%20Setup%20OPENLANE-2024063021-25.png)
- 
### Managing Cribl Edge Nodes
- Making fleet or subfleet for workstations
	- Manage > Add subfleet
		- ![](__attachments/Detection%20Engineering/IMG-WinEvents%20&%20Sysmon%20Setup%20OPENLANE-2024063021-26.png)
	- 

- How to turn off edge node config on an endpoint
	- Uninstalling Cribl Edge
		- [Uninstalling Cribl Edge from Linux | Cribl Docs](https://docs.cribl.io/edge/uninstalling/)
		- [Uninstalling Cribl Edge from Windows | Cribl Docs](https://docs.cribl.io/edge/uninstalling-win/#uninstalling-cribledge-from-windows)
			- Run `msiexec /x cribl-<version>-<build>-<arch>.msi`
			- Remove folder data?
				- https://docs.cribl.io/edge/edge-common-challenges/#local-files-when-uninstalling-windows
				- ![](__attachments/Detection%20Engineering/IMG-WinEvents%20&%20Sysmon%20Setup%20OPENLANE-2024063021-27.png)
		- Manually and locally
			- Add or remove programs?
				- ![](__attachments/Detection%20Engineering/IMG-WinEvents%20&%20Sysmon%20Setup%20OPENLANE-2024063021-28.png)
			- Remove folder data?
				- https://docs.cribl.io/edge/edge-common-challenges/#local-files-when-uninstalling-windows
				- ![](__attachments/Detection%20Engineering/IMG-WinEvents%20&%20Sysmon%20Setup%20OPENLANE-2024063021-27.png)
			- Services.msc
				- Remove the service?
				- ![](__attachments/Detection%20Engineering/IMG-WinEvents%20&%20Sysmon%20Setup%20OPENLANE-2024063021-29.png)
	- Remote uninstall?
		- TODO
	- Remove 
### Event Transformation and Routing with Cribl Stream
- [Getting Better Sysmon Data Using Cribl Stream - Cribl](https://cribl.io/blog/getting-better-sysmon-data-using-cribl-stream/) 
### Cribl Results and Testing
#### Testing with Resources
- Start with small subset
- watch CPU, memory, disk iops
- watch changes throughout day

- Disk iops is MOST IMPORTANT
	- put WECs on SSDs if you can
### Event Analysis in Hunters
- [Hunters SIEM - Microsoft Windows Event Logs](https://docs.hunters.ai/docs/microsoft-windows-event-logs) 
	- Supported Providers
		- Each Windows Event Logs provider has its own data structure, and Hunters supports the following providers:
			- Security Auditing: `Microsoft-Windows-Security-Auditing`
			- PowerShell event logs: `Microsoft-Windows-Powershell`, `Powershell`
			- DNS client logs: `Microsoft-Windows-Dns-Client`
	- 
## Large-Scale WinEvents & Sysmon Setup
- Deployment
	- They use GPO option with UNC path for updates and sysmon archive log
	- Use SCCM?
	- archive log can only be emptied by NT AUTHORITY account
	- PS1 on scheduled task that updates config on all host systems with GPO
- 
### Sysmon Config Shared Store
- put it on SYSVOL with read 
- make sure permissions are locked down appropriately
- it's a scheduled task, so it could be bad if it's replaced with something malicious
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