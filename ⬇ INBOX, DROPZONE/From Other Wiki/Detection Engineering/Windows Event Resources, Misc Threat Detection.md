# Misc Threat Detection
- [meirwah/awesome-incident-response: A curated list of tools for incident response](https://github.com/meirwah/awesome-incident-response)
	- https://github.com/meirwah/awesome-incident-response?tab=readme-ov-file#knowledge-bases 
		- [sbousseaden/EVTX-ATTACK-SAMPLES: Windows Events Attack Samples](https://github.com/sbousseaden/EVTX-ATTACK-SAMPLES) 
		- https://github.com/meirwah/awesome-incident-response?tab=readme-ov-file#log-analysis-tools 

- [PaulSec/awesome-windows-domain-hardening: A curated list of awesome Security Hardening techniques for Windows.](https://github.com/PaulSec/awesome-windows-domain-hardening) 
	- [Active Directory Security – Active Directory & Enterprise Security, Methods to Secure Active Directory, Attack Methods & Effective Defenses, PowerShell, Tech Notes, & Geek Trivia…](https://adsecurity.org/) 
	- [Windows Security Log Encyclopedia](https://www.ultimatewindowssecurity.com/securitylog/encyclopedia/default.aspx) 

# Analytics Content
- [Welcome to the Cyber Analytics Repository | MITRE Cyber Analytics Repository](https://car.mitre.org/)

# Threat Intel, Prioritization (Mitre, Windows Events, Sensors, Logs), Gap Analysis, Stats Related to Mitre ATT&CK, Purple Team
- Data Sources to Techniques MAPPING - STIX
	- [mitre/cti: Cyber Threat Intelligence Repository expressed in STIX 2.0](https://github.com/mitre/cti) 
	- [cti/USAGE.md at master · mitre/cti](https://github.com/mitre/cti/blob/master/USAGE.md)
	- [attack-scripts/scripts at master · mitre-attack/attack-scripts](https://github.com/mitre-attack/attack-scripts/tree/master/scripts)
	- Python Mitre stuff - STIX to Pandas, Excel, etc.
		- [Installation — mitreattack-python 2.0.0 documentation](https://mitreattack-python.readthedocs.io/en/latest/installation.html)
		- https://github.com/mitre-attack/mitreattack-python/tree/master/mitreattack/attackToExcel#interfaces - excel, pandas, and other related functions
		- [mitreattack-python/mitreattack/navlayers at master · mitre-attack/mitreattack-python](https://github.com/mitre-attack/mitreattack-python/tree/master/mitreattack/navlayers)
		- [mitreattack-python/mitreattack/attackToExcel at master · mitre-attack/mitreattack-python](https://github.com/mitre-attack/mitreattack-python/tree/master/mitreattack/attackToExcel)
	- Stix to dict
		- 
	- Updated, STIX 2.1
		- https://oasis-open.github.io/cti-documentation/resources.html
		- https://docs.oasis-open.org/cti/stix/v2.0/csprd01/part2-stix-objects/stix-v2.0-csprd01-part2-stix-objects.html#_Toc476230920
		- Retrieving STIX content (dict format) from STIX
			- https://stix2.readthedocs.io/en/latest/guide/environment.html#Storing-and-Retrieving-STIX-Content
				- https://stix2.readthedocs.io/en/latest/api/stix2.environment.html#stix2.environment.Environment.get
			- https://github.com/mitre-attack/mitreattack-python/tree/master/mitreattack/attackToExcel
			- 
		- [mitre-attack/attack-stix-data: STIX data representing MITRE ATT&CK](https://github.com/mitre-attack/attack-stix-data) 
		- [attack-stix-data/USAGE.md at master · mitre-attack/attack-stix-data](https://github.com/mitre-attack/attack-stix-data/blob/master/USAGE.md)
		- https://github.com/mitre-attack/attack-stix-data/blob/master/USAGE.md#the-attck-spec
		- [oasis-open/cti-python-stix2: OASIS TC Open Repository: Python APIs for STIX 2](https://github.com/oasis-open/cti-python-stix2)
		- https://github.com/mitre-attack/attack-stix-data/blob/master/USAGE.md#accessing-attck-data-in-python
		- https://github.com/mitre-attack/attack-stix-data/blob/master/USAGE.md#python-recipes
	- [Comparing STIX 1.X/CybOX 2.X with STIX 2](https://oasis-open.github.io/cti-documentation/stix/compare) 
	- [Contribute](https://oasis-open.github.io/cti-documentation/contribute.html) 
	- [Introduction to STIX](https://oasis-open.github.io/cti-documentation/stix/intro) 
	- [oasis-open/cti-python-stix2: OASIS TC Open Repository: Python APIs for STIX 2](https://github.com/oasis-open/cti-python-stix2)
	- [Introduction — ATTACK Python Client](https://attackcti.com/intro.html)
		- [Explore ATT&CK Data Sources — ATTACK Python Client](https://attackcti.com/playground/4-Explore_Data_Sources.html#grouping-techniques-with-data-sources-by-data-source)
		- [Get Techniques from Data Sources — ATTACK Python Client](https://attackcti.com/playground/5-Collect_Techniques_by_Data_Sources.html) 
	- Local Attack CTI
		- https://github.com/mitre/cti/blob/master/USAGE.md#access-local-content 
- [attack-datasources/ATT&CK-Data-Sources.ipynb at main · mitre-attack/attack-datasources](https://github.com/mitre-attack/attack-datasources/blob/main/ATT&CK-Data-Sources.ipynb)
- Mitre Attack Data Sources
	- https://github.com/mitre-attack/attack-datasources?tab=readme-ov-file#identification-of-relevant-data-sources-and-components
	- https://github.com/mitre-attack/attack-datasources?tab=readme-ov-file#identification-of-relevant-data-sources-and-components-a-graph-perspective 
	- https://github.com/mitre-attack/attack-datasources?tab=readme-ov-file#identification-of-relevant-security-events
- [(8) MITRE ATT&CK Techniques popularity, Data Sources and Mitigations - calculating priorities | LinkedIn](https://www.linkedin.com/pulse/mitre-attck-techniques-popularity-data-sources-jakub-szumera/) 
- [MITRE ATT&CK visualizations | snake-attack](https://jkb-s.github.io/snake-attack/)
- Mitre Center for Threat Informed Defense
	- [Sightings Ecosystem: A Data-driven Analysis of ATT&CK in the Wild](https://web.mitre-engenuity.org/hubfs/Center%20for%20Threat%20Informed%20Defense/CTID-Sightings-Ecosystem-Report.pdf) 
	- [THREAT REPORT ATT&CK MAPPER (TRAM) - MITRE Engenuity](https://mitre-engenuity.org/cybersecurity/center-for-threat-informed-defense/our-work/threat-report-attck-mapper-tram/) 
	- [ATT&CK Workbench - MITRE Engenuity](https://mitre-engenuity.org/cybersecurity/center-for-threat-informed-defense/our-work/attck-workbench/) 
	- [CTI Blueprints - MITRE Engenuity](https://mitre-engenuity.org/cybersecurity/center-for-threat-informed-defense/our-work/cti-blueprints/) 
		- [center-for-threat-informed-defense/cti-blueprints: CTI Blueprints is a free suite of templates and tools that helps Cyber Threat Intelligence analysts create high-quality, actionable reports more consistently and efficiently.](https://github.com/center-for-threat-informed-defense/cti-blueprints)
	- [Attack Flow | Threat-Informed Defense Project](https://mitre-engenuity.org/cybersecurity/center-for-threat-informed-defense/our-work/attack-flow/) 
	- [Top ATT&CK Techniques | Threat-Informed Defense Project](https://mitre-engenuity.org/cybersecurity/center-for-threat-informed-defense/our-work/top-attack-techniques/) 
		- [center-for-threat-informed-defense/top-attack-techniques: Top ATT&CK Techniques provides defenders with a systematic approach to prioritizing ATT&CK techniques.](https://github.com/center-for-threat-informed-defense/top-attack-techniques)
	- [Insider Threat TTP Knowledge Base | Threat-Informed Defense Project](https://mitre-engenuity.org/cybersecurity/center-for-threat-informed-defense/our-work/insider-threat-ttp-knowledge-base/) 
	- [Mapping ATT&CK to CVE | Threat-Informed Defense Project](https://mitre-engenuity.org/cybersecurity/center-for-threat-informed-defense/our-work/mapping-attck-to-cve-for-impact/) 
	- [CTI Blueprints DRAFT 6.7.23](https://info.mitre-engenuity.org/hubfs/Cyber/Center%20for%20Threat%20Informed%20Defense/CTI_Blueprints_One_Pager.pdf?utm_campaign=CTID_CTI_Blueprints&utm_source=CTI_Blueprints_Project) 
	- [center-for-threat-informed-defense/attack-sync: ATT&CK Sync is a Center for Threat-Informed Defense project that aims to improve the ability for organizations to consume MITRE ATT&CK® version updates into their internal systems and processes.](https://github.com/center-for-threat-informed-defense/attack-sync?tab=readme-ov-file#getting-started) 
	- [center-for-threat-informed-defense/attack-control-framework-mappings: Security control framework mappings to MITRE ATT&CK provide a critically important resource for organizations to assess their security control coverage against real-world threats and provide a bridge for integrating ATT&CK-based threat information into the risk management process.](https://github.com/center-for-threat-informed-defense/attack-control-framework-mappings)
	- [center-for-threat-informed-defense/attack_to_cve: A methodology for mapping MITRE ATT&CK techniques to vulnerability records to describe the impact of a vulnerability.](https://github.com/center-for-threat-informed-defense/attack_to_cve)
	- Sensor/Product/Log Sources ATT&CK mappings
		- [center-for-threat-informed-defense/sensor-mappings-to-attack: Sensor Mappings to ATT&CK is a collection of resources to assist cyber defenders with understanding which sensors and events can help detect real-world adversary behaviors in their environments.](https://github.com/center-for-threat-informed-defense/sensor-mappings-to-attack) 
		- [sensor-mappings-to-attack/mappings/layers/enterprise at main · center-for-threat-informed-defense/sensor-mappings-to-attack](https://github.com/center-for-threat-informed-defense/sensor-mappings-to-attack/tree/main/mappings/layers/enterprise)
	- (old) Security Stack Mappings
		- [center-for-threat-informed-defense/security-stack-mappings: This project empowers defenders with independent data on which native security controls of leading technology platforms are most useful in defending against the adversary TTPs they care about.](https://github.com/center-for-threat-informed-defense/security-stack-mappings)
- [Visualizing ATT&CK. To coincide with RSA this year, we’re… | by Andy Applebaum | MITRE ATT&CK® | Medium](https://medium.com/mitre-attack/visualizing-attack-f5e1766b42a6) 
- https://github.com/infosecn1nja/awesome-mitre-attack
	- [SecurityRiskAdvisors/VECTR: VECTR is a tool that facilitates tracking of your red and blue team testing activities to measure detection and prevention capabilities across different attack scenarios](https://github.com/SecurityRiskAdvisors/VECTR) 
	- [mitre/caldera: Automated Adversary Emulation Platform](https://github.com/mitre/caldera)
	- [OTRF/Security-Datasets: Re-play Security Events](https://github.com/OTRF/Security-Datasets)
- [Assess your data potential with ATTACK Datamap | by Olaf Hartong | Medium](https://medium.com/@olafhartong/assess-your-data-potential-with-att-ck-datamap-f44884cfed11)
- [center-for-threat-informed-defense/attack-flow at 43202149f538dba1badf90ca977953213b5d1a08](https://github.com/center-for-threat-informed-defense/attack-flow/tree/43202149f538dba1badf90ca977953213b5d1a08)
- Mitre D3FEND
	- [Resources | MITRE D3FEND™](https://d3fend.mitre.org/resources/)
	- [Taxonomies | MITRE D3FEND™](https://d3fend.mitre.org/taxonomies/) 
- [RE&CT - ATT&CK® Navigator](https://atc-project.github.io/react-navigator/)
- [redcanaryco/atomic-red-team: Small and highly portable detection tests based on MITRE's ATT&CK.](https://github.com/redcanaryco/atomic-red-team)
	- [ATT&CK Coverage - Explore Atomic Red Team](https://atomicredteam.io/coverage/)
# Sysmon Tools
- [nshalabi/SysmonTools: Utilities for Sysmon](https://github.com/nshalabi/SysmonTools)
- [olafhartong/sysmon-cheatsheet: All sysmon event types and their fields explained](https://github.com/olafhartong/sysmon-cheatsheet)
# Subscription Tools
- .
# Sysmon Configs
- [Operational Look at Sysinternals Sysmon 6.20 Update](https://www.darkoperator.com/blog/2017/11/24/operational-look-at-sysinternals-sysmon-620-update) 
- [Sysinternals Sysmon unleashed | Microsoft Learn](https://learn.microsoft.com/en-us/archive/blogs/motiba/sysinternals-sysmon-unleashed) 
- [Sysinternals Sysmon suspicious activity guide | Microsoft Learn](https://learn.microsoft.com/en-us/archive/blogs/motiba/sysinternals-sysmon-suspicious-activity-guide) 
- [EventLogging/DEFCON3/sysmon at master · blackhillsinfosec/EventLogging](https://github.com/blackhillsinfosec/EventLogging/tree/master/DEFCON3/sysmon) 
- [SwiftOnSecurity/sysmon-config: Sysmon configuration file template with default high-quality event tracing](https://github.com/SwiftOnSecurity/sysmon-config) - not as heavy
- [olafhartong/sysmon-modular: A repository of sysmon configuration modules](https://github.com/olafhartong/sysmon-modular) - HEAVY
- [Neo23x0/sysmon-config: Sysmon configuration file template with default high-quality event tracing](https://github.com/Neo23x0/sysmon-config) 
- [deep-security/sysmon-config](https://github.com/deep-security/sysmon-config) 

# Mitre ATT&CK & Sensor/Log & Data Sources, Mappings

- [center-for-threat-informed-defense/security-stack-mappings: This project empowers defenders with independent data on which native security controls of leading technology platforms are most useful in defending against the adversary TTPs they care about.](https://github.com/center-for-threat-informed-defense/security-stack-mappings/tree/main?tab=readme-ov-file) 
- 

- [ATT&CK® Evaluations](https://attackevals.mitre-engenuity.org/using-attack-evaluations/)

- [ATT&CK 2021 Roadmap. A review of how we navigated 2020 and… | by Amy L. Robertson | MITRE ATT&CK® | Medium](https://medium.com/mitre-attack/att-ck-2021-roadmap-68bab3886fa2) - converted data sources to objects to have examples of platforms and tools that have those data sources
	- [Defining ATT&CK Data Sources, Part I: Enhancing the Current State | by Jose Luis Rodriguez | MITRE ATT&CK® | Medium](https://medium.com/mitre-attack/defining-attack-data-sources-part-i-4c39e581454f) 

- [OTRF/OSSEM-DM: OSSEM Detection Model](https://github.com/OTRF/OSSEM-DM)
	- [OSSEM-DM/use-cases/mitre_attack at main · OTRF/OSSEM-DM](https://github.com/OTRF/OSSEM-DM/tree/main/use-cases/mitre_attack)
- [OTRF/OSSEM-DD: OSSEM Data Dictionaries](https://github.com/OTRF/OSSEM-DD?tab=readme-ov-file)
- https://github.com/OTRF/OSSEM-DM?tab=readme-ov-file#d-security-telemetry-mapping-security_events 
- https://github.com/OTRF/OSSEM-DM?tab=readme-ov-file#b-attck-data-sources-mapping-attack
- https://github.com/OTRF/OSSEM-DM?tab=readme-ov-file#available-documents 

- [Sigma - SIEM Detection Format | The shareable detection format for security professionals.](https://sigmahq.io/)
	- https://sigmahq.io/docs/basics/rules.html#logsources
	- [Introducing Sigma Rule Packages & Releases | by Nasreddine Bencherchali | Sigma_HQ](https://blog.sigmahq.io/introducing-sigma-rule-packages-releases-76043ce42e81)
	- [sigconverter.io - sigma rule converter](https://sigconverter.io/) 
	- [Sigma Search Engine](https://sigmasearchengine.com/) 
	- 

-  [mdecrevoisier/EVTX-to-MITRE-Attack: Set of EVTX samples (>270) mapped to MITRE Att@k tactic and techniques to measure your SIEM coverage or developed new use cases.](https://github.com/mdecrevoisier/EVTX-to-MITRE-Attack) 
 - [mitre-attack/attack-datasources: This content is analysis and research of the data sources currently listed in ATT&CK.](https://github.com/mitre-attack/attack-datasources) 

- [Mapping MITRE ATT&CK with Window Event Log IDs - Security Investigation](https://www.socinvestigation.com/mapping-mitre-attck-with-window-event-log-ids/) 

- [Connecting cyber tools and events with adversary TTPs | MITRE-Engenuity](https://medium.com/mitre-engenuity/understanding-the-connection-cybersecurity-events-and-mitre-att-ck-58e977c9fd5a) 
- [Center for Threat-Informed Defense | MITRE Engenuity](https://mitre-engenuity.org/cybersecurity/center-for-threat-informed-defense/)
- [Sensor Mappings to ATT&CK - MITRE Engenuity](https://mitre-engenuity.org/cybersecurity/center-for-threat-informed-defense/our-work/sensor-mappings-to-attack/) 
	- [Sensor Mappings to ATT&CK — Sensor Mappings to ATT&CK v1.0.0 documentation](https://center-for-threat-informed-defense.github.io/sensor-mappings-to-attack/) 
	- [sensor-mappings-to-attack/mappings/layers/enterprise at main · center-for-threat-informed-defense/sensor-mappings-to-attack](https://github.com/center-for-threat-informed-defense/sensor-mappings-to-attack/tree/main/mappings/layers/enterprise) 
	- [sensor-mappings-to-attack/mappings/stix/enterprise at main · center-for-threat-informed-defense/sensor-mappings-to-attack](https://github.com/center-for-threat-informed-defense/sensor-mappings-to-attack/tree/main/mappings/stix/enterprise)
	- [Overview — Sensor Mappings to ATT&CK v1.0.0 documentation](https://center-for-threat-informed-defense.github.io/sensor-mappings-to-attack/overview/#stix-representation-and-mapping-tools) 
		- [Use Cases — Sensor Mappings to ATT&CK v1.0.0 documentation](https://center-for-threat-informed-defense.github.io/sensor-mappings-to-attack/use_cases/)

- [MITRE_ActiveDefenseCapabilitySet_TechnicalManual.pdf](https://info.mitre-engenuity.org/hubfs/ATTACK%20Evals/MITRE_ActiveDefenseCapabilitySet_TechnicalManual.pdf)

- [center-for-threat-informed-defense/security-stack-mappings: This project empowers defenders with independent data on which native security controls of leading technology platforms are most useful in defending against the adversary TTPs they care about.](https://github.com/center-for-threat-informed-defense/security-stack-mappings?tab=readme-ov-file#security-stack-mappings)

- [ATT&CK Data & Tools | MITRE ATT&CK®](https://attack.mitre.org/resources/attack-data-and-tools/)
# Windows Events Management, IDs, Enrichment, Analysis, Cheat Sheets
- [What2Log - Home](https://what2log.com/)

- [Appendix L - Events to Monitor | Microsoft Learn](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-l--events-to-monitor)

- [mdecrevoisier/Microsoft-eventlog-mindmap: Set of Mindmaps providing a detailed overview of the different #Microsoft auditing capacities for Windows, Exchange, Azure,...](https://github.com/mdecrevoisier/Microsoft-eventlog-mindmap)

- [palantir/windows-event-forwarding: A repository for using windows event forwarding for incident detection and response](https://github.com/palantir/windows-event-forwarding)

- [Incident Response: Windows Account Logon and logon Events - Hacking Articles](https://www.hackingarticles.in/incident-response-windows-account-logon-and-logon-events/) 
- [Incident Response: Windows Account Management Event (Part 2) - Hacking Articles](https://www.hackingarticles.in/incident-response-windows-account-management-event-part-2/) 

- [Windows Advanced Audit Policy Map to Event IDs - Google Sheets](https://docs.google.com/spreadsheets/d/1Lquvy7FHMXN_lRt-JYHnrUar5e2LAfldy-HTyhGcPoQ/edit#gid=0) 

- [Win10/EventLogs at master · kacos2000/Win10](https://github.com/kacos2000/Win10/tree/master/EventLogs)
	- [Win10/EventLogs/keywords.md at master · kacos2000/Win10](https://github.com/kacos2000/Win10/blob/master/EventLogs/keywords.md) 
	- [kacos2000/Win10: Win 10/11 related research](https://github.com/kacos2000/Win10) 

- [Sysmon 12.0 — EventID 24. Sysmon 12 is out, with a new event ID… | by Olaf Hartong | FalconForce | Medium](https://medium.com/falconforce/sysmon-12-0-eventid-24-31e0109c78e3) 

- [Profile Sysmon logs to discover which LOLBAS binaries have ran and what they're command line arguments were](https://gist.github.com/leoloobeek/a3a4d9af3bf7fb37b6d82a7a17e7176d)

- [Tuned and curated Winlogbeats config file](https://gist.github.com/ecapuano/70e823b033ec49b9aebac9301f353bb4) 

- [Cheat-Sheets — Malware Archaeology](https://www.malwarearchaeology.com/cheat-sheets/)

- [JPvRiel/wef-reference: Scripts to compare Windows event queries and cross-reference the queries to metadata/manifest extracts.](https://github.com/JPvRiel/wef-reference)

- https://github.com/rmusser01/Infosec_Reference/blob/master/Draft/L-SM-TH.md#winlog
	- [Domain Controller Security Logs – how to get at them *without* being a Domain Admin – GirlGerms online](https://girl-germs.com/?p=1538)
	- [Download Windows 10 and Windows Server 2016 security auditing and monitoring reference from Official Microsoft Download Center](https://www.microsoft.com/en-us/download/details.aspx?id=52630)
	- [Download Windows security audit events from Official Microsoft Download Center](https://www.microsoft.com/en-us/download/details.aspx?id=50034)
	- [Windows+Logging+Cheat+Sheet_ver_Oct_2016.pdf](https://static1.squarespace.com/static/552092d5e4b0661088167e5c/t/580595db9f745688bc7477f6/1476761074992/Windows+Logging+Cheat+Sheet_ver_Oct_2016.pdf)
	- [Windows+Splunk+Logging+Cheat+Sheet+v2.2.pdf](https://static1.squarespace.com/static/552092d5e4b0661088167e5c/t/5a3187b4419202f0fb8b2dd1/1513195444728/Windows+Splunk+Logging+Cheat+Sheet+v2.2.pdf)
	- [Windows+Registry+Auditing+Cheat+Sheet+ver+Nov+2017.pdf](https://static1.squarespace.com/static/552092d5e4b0661088167e5c/t/5a00963153450a8779b23489/1509987890282/Windows+Registry+Auditing+Cheat+Sheet+ver+Nov+2017.pdf)
	- [Windows+PowerShell+Logging+Cheat+Sheet+ver+Sept+2017+v2.1.pdf](https://static1.squarespace.com/static/552092d5e4b0661088167e5c/t/59c1814829f18782e24f1fe2/1505853768977/Windows+PowerShell+Logging+Cheat+Sheet+ver+Sept+2017+v2.1.pdf)
	- [Windows+File+Auditing+Cheat+Sheet+ver+Nov+2017.pdf](https://static1.squarespace.com/static/552092d5e4b0661088167e5c/t/5a0097e5f9619a8960daef69/1509988326168/Windows+File+Auditing+Cheat+Sheet+ver+Nov+2017.pdf)
	- [nsacyber/Event-Forwarding-Guidance: Configuration guidance for implementing collection of security relevant Windows Event Log events by using Windows Event Forwarding. #nsacyber](https://github.com/nsacyber/Event-Forwarding-Guidance)
	- [palantir/windows-event-forwarding: A repository for using windows event forwarding for incident detection and response](https://github.com/palantir/windows-event-forwarding)
	- [Windows Event Forwarding for Network Defense | by Palantir | Palantir Blog](https://blog.palantir.com/windows-event-forwarding-for-network-defense-cb208d5ff86f)
	- [End-Point Log Consolidation with Windows Event Forwarder - Black Hills Information Security](https://www.blackhillsinfosec.com/end-point-log-consolidation-windows-event-forwarder/)
	- [The Windows Event Forwarding Survival Guide | HackerNoon](https://hackernoon.com/the-windows-event-forwarding-survival-guide-2010db7a68c4)
	- [jepayneMSFT/WEFFLES: Build a fast, free, and effective Threat Hunting/Incident Response Console with Windows Event Forwarding and PowerBI](https://github.com/jepayneMSFT/WEFFLES)
	- [Windows Event Log Reference - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/wes/windows-event-log-reference?redirectedfrom=MSDN)
	- [Event Logging Structures - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/eventlog/event-logging-structures)
	- [Log Everything Right?. November 14, 2018 | by Edward Ruprecht | Medium](https://medium.com/@e_rupert/log-everything-right-13d86224ef7f)
	- [blackhillsinfosec/EventLogging: Automation scripts to deploy Windows Event Forwarding, Sysmon, and custom audit policies in an Active Directory environment.](https://github.com/blackhillsinfosec/EventLogging)
	- [Windows Event Log Resources | Event ID Lookup](https://www.myeventlog.com/)
	- [Windows Security Log Encyclopedia](https://www.ultimatewindowssecurity.com/securitylog/encyclopedia/)
	- [JSCU-NL/logging-essentials: A Windows event logging and collection baseline focused on finding balance between forensic value and optimising retention.](https://github.com/JSCU-NL/logging-essentials)
	- [Blumira/Logmira: Logmira by Blumira has been created by Amanda Berlin as a helpful download of Microsoft Windows Domain Group Policy Object settings.](https://github.com/Blumira/Logmira)
	- [Appendix A, Security monitoring recommendations for many audit events - Windows Security | Microsoft Learn](https://learn.microsoft.com/en-us/windows/security/threat-protection/auditing/appendix-a-security-monitoring-recommendations-for-many-audit-events)
	- [About hcs0 | Articles and Notes by hcs0](https://hannahsuarez.github.io/about/)
	- [ohjeongwook/WindowsEventTools: Collection Of Scripts And Utilities For Windows Event Hunting](https://github.com/ohjeongwook/WindowsEventTools)
	- [Audit logon events - Windows Security | Microsoft Learn](https://learn.microsoft.com/en-us/windows/security/threat-protection/auditing/basic-audit-logon-events)
	- [A Sysmon Event ID Breakdown - Updated to Include 29!! - Black Hills Information Security](https://www.blackhillsinfosec.com/a-sysmon-event-id-breakdown/)
	- [nshalabi/SysmonTools: Utilities for Sysmon](https://github.com/nshalabi/SysmonTools)
	- [JPCERTCC/SysmonSearch: Investigate suspicious activity by visualizing Sysmon's event log](https://github.com/JPCERTCC/SysmonSearch)
	- [microsoft/MSTIC-Sysmon: Anything Sysmon related from the MSTIC R&D team](https://github.com/microsoft/MSTIC-Sysmon)
	- [SwiftOnSecurity/sysmon-config: Sysmon configuration file template with default high-quality event tracing](https://github.com/SwiftOnSecurity/sysmon-config)
	- [Neo23x0/sysmon-config: Sysmon configuration file template with default high-quality event tracing](https://github.com/Neo23x0/sysmon-config)
	- [deep-security/sysmon-config](https://github.com/deep-security/sysmon-config)
	- [olafhartong/sysmon-modular: A repository of sysmon configuration modules](https://github.com/olafhartong/sysmon-modular)
	- [mdecrevoisier/Microsoft-eventlog-mindmap: Set of Mindmaps providing a detailed overview of the different #Microsoft auditing capacities for Windows, Exchange, Azure,...](https://github.com/mdecrevoisier/Microsoft-eventlog-mindmap)

# Windows Event Analysis
- [JPCERTCC/LogonTracer: Investigate malicious Windows logon by visualizing and analyzing Windows event log](https://github.com/JPCERTCC/LogonTracer) 
- 
# Local Windows Event Analysis
- [Event Log Observer: Versatile Tool for Windows Event Log Viewing](https://lizard-labs.com/event_log_observer.aspx) 

# Adversary Simulation, Purple Team
- [ScarredMonk/SysmonSimulator: Sysmon event simulation utility which can be used to simulate the attacks to generate the Sysmon Event logs for testing the EDR detections and correlation rules by Blue teams.](https://github.com/ScarredMonk/SysmonSimulator) 

# Misc
- [marcosd4h/sysmonx: SysmonX - An Augmented Drop-In Replacement of Sysmon](https://github.com/marcosd4h/sysmonx) 
- [Welcome to the Cyber Analytics Repository | MITRE Cyber Analytics Repository](https://car.mitre.org/)

- [infosecn1nja/awesome-mitre-attack: A curated list of awesome resources related to Mitre ATT&CK™ Framework](https://github.com/infosecn1nja/awesome-mitre-attack?tab=readme-ov-file)