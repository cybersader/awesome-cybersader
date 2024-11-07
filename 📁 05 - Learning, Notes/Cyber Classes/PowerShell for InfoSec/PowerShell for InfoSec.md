---
aliases: 
tags: 
publish: true
date created: Wednesday, November 6th 2024, 8:00 am
date modified: Thursday, November 7th 2024, 1:04 pm
---

- IEUser: Passw0rd!

- Much easier to kick applications over and hack them than build them with security and all of the features that you want

# What is PowerShell

- It's a language, but also an application that wraps around the Windows OS
- You can use PowerShell (the language) without the "exe"
- PowerShell runs out of the .NET dll in Windows - you can't technically block that

# Why PowerShell

- Easy, powerful, extensible, free and open source, cross-platform
- Easy to use:
	- Installed by default
	- No need to compile
	- Object-oriented - ultimately makes scripts easier to write and understand
- CMD exe is ugly when doing anything more than the barebones basic commands
- Where it runs from?
	- .Net, COM, WMI, XML and Active Directory Built-In
- Error Handling support
- Security Minded
- Cross-platform
	- 2016 -> Windows  PowerShell
	- 2018 -> PowerShell Core
	- 2020 -> v7 aka "PowerShell"

# PowerShell Fundamentals

## Providers

- They have "providers" in PowerShell that are essentially virtual filesystems or stores for certain data useful in PS like aliases, registries, etc.

## Variables

- `$` refers to variables
- Where do these come from?
- `Get-Variable` 
- `Get-PSProvider`
- `ls variable:` - shows all your available variables

## Interacting with Registry

- `ls` or `Get-ChildItem` or `dir` with `'HKCU:\Control Panel\'`
	- Lists out the keys for Control Panel

## Aliases

- Use `Get-Alias` to see what a command's origin command is - where the alias is coming from
- Aliases only persist in the window/session that you set them in
- There is a way to have them persist across the system 

## Cmdlet vs Function

- `Cmdlet` uses a Compiled `.NET` dll in the background
- PS `Functions` are using complete PowerShell in the background

## Naming Convention

- `Verb-Noun`
- They have certain approved verbs like "Remove" instead of "Delete"
- `Get-Verb` shows approved verbs

## Environment Variables

- comes from an environment provider
- `gci env:` - get child item environment variable provider

## Parameters

- 2 types:
	- One you say parameter:value
	- Switch parameters / flags
		- "--Do-This" - means "Do-This" is turned on
- Can you stack flag/switch parameters like in Linux?
	- .

## Get-Help

- Use `Get-Help` with the name of a function to get the manual
- Use "Full" switch parameter to get full manual
- `SYNTAX` section:
	- brackets ("\[\]") means that the parameter is optional
- You can only leave out the parameter names if the function support "positional" parameters
- Usually `-example` gives you everything you need
- Support wildcard "\*" searches

## Piping

- Take the output of one command and make it the input to another command
- Piping to `more` is common - actually points to more.com (an executable) 

## Regular Expressions

- `match` function support regex

## Getting the Full Object Returned by a Command

- Can return a ton of information
- If you want to show everything from an object, then you can pipe a command like `Get-User` to `Select-Object`
- You can pipe to `Select-Object -Property *` to see all of the data in an object

## Pretty Printing

- use `ft - AutoSize` (format table) or `fl` (format list)

## Working with Objects

- `Get-Member` 
	- Shows properties of the object 
	- methods (aka functions) - things you can do with the object
- Lots of the PS functios and modules utilize objects as inputs and outputs
- You can pipe to `Select-Object -Property *` to see all of the data in an object
- Looping through object:
	- Use `Where-Object` then `$_` to refer to the current object in the loop of what was passed  to the `Where-Object` cmdlet

## Line Continuation

- Use \` at the end of a line to continue to the next line
- Sometimes hitting ENTER will go to the next line and add this 
- You don't need to add them when ending with a `|` (pipe)
- It will also do a ">>" sign when waiting for more input

# Files & Scripts

- When trying to run things you'll have to access files in the "current" folder with a "./" in the front.  
- To make things easy, use TAB as much as possible to autocomplete and find things
- Dot sourcing:
	- Do something like `. .\script.ps` to put the running script into the "global" scope
	- You will then be able to use the internal functions

## Why use no profile when running PS?

- Sysadmins use `powershell -nop` so that profiles don't have aliases and things that affect their script
- `-WindowStyle Hidden` - also used by sysadmins to hide the window from end users when they need to run scripts

# Encoded Commands

- PS uses UTF-16LE which can bring in some issues with how commands are encoded or when you are pasting code in
- `powershell -enc $encodedCommand` - useful if you have a bunch of quote issues and you don't want to escape a bunch of characters when pasting things in or using outside code

# Download Cradles - Ways to Download & Run

- Useful to hackers - never writes to disk / volatile / in-memory
- Commands that automatically download and run code from sources like URLs
- AMSI - anti-malware scan interface - looks into memory - partly made for reasons like this

# Dealing with Proxies 

- PS uses system proxy by default
- If proxy needs auth use the below:

```PowerShell
(New-Object System.Net.WebClient).Proxy.Credentials = [System.Net.CredentialCache]::DefaultNetworkCredentials
```

# Getting Around PowerShell Restrictions

## Execution Policies

- Avoid accidental script execution
- Not a security boundary - really just a warning
- Policies have scopes:
	- Machine (Group Policy) > User (Group Policy) > Process > Current User > Local Machine (requires admin)
- Most corporate settings restrict or allow at the `UserPolicy` 

## Execution Policy Bypass

- [15 Ways to Bypass the PowerShell Execution Policy](https://www.netspi.com/blog/technical-blog/network-pentesting/15-ways-to-bypass-the-powershell-execution-policy/)
- #12 works even when GPO is blocking - most don't work because of the precedence

## Unblock-File

- Windows has ADS (alternate data stream)
- You can attach other files to a normal file as an alternate data stream
- `Zone.Identifier` (Mark of the Web - MotW) - how PS knows something came from the web - related to "RemoteSigned"
- If you still want to run a file you can use `Unblock-File` to remove the Alternate Data Stream (mark of the web) to make it look like it was created locally
- `Unblock-File .\runit-remote.ps1` - makes it not remote anymore

# PowerShell Command History

- `h` - alias for `get-history`
- `r` - alias for `Invoke-History` 

- History file:
	- CTRL+R/CTRL+S to search
	- `Get-PSReadLineOption` 

- Hackers can literally edit the history file
	- Open it with `notepad (Get-PSReadLineOption).HistorySavePath`

## History File Bypass

- The history file isn't for security but moreso convenience - lots of ways to hide things in history file.
- Use PowerShell logging instead. 

# Lab 1: Exploring PowerShell

- Basic commands:
	- `$pwd` - print working directory
	- `$pid` - process ID
	- `$profile` - current profile
- More basic commands

# Modules & Scripts

- Module benefits
	- Have version control advantages
	- Scope/visibility control
	- Easy to update and share
	- Consolidation
- Modules scale better
- PowerShell Gallery
	- You can have your own private gallery as well for your small-medium-sized company
- `Install-Script -Namem Install-VSCode`
	- Easier than finding the download in the browser

## Module Types

- PSM 
	- PowerShell module
- PSD
	- PowerShell Data File
- Script Module + Module Manifest
	- PSM1 + PSD1
- Binary Modules
	- .NET dll
- Dynamic Modules
	- in memory only

## Script Module - File Extension

- Ps1 - script
- Psm1 - script module
- Some cmdlets and functions can run from psm1 that can't from scripts or CLI

## Import-Module & Dot Sourcing

- Don't use dot sourcing..use `Import-Module`

## Name Conflicts

- Alias, Fucntion, Cmdlet, Application

## Releasing your own module

- You'll make a data psd and psm1 file with the psd file referencing the psm1 file with "RootSource"

# Obfuscation

- `Invoke-Obfuscation` - obfuscate commands and bypass signature-based detection
- `Revoke-Obfuscation` - determine likelihood of obfuscation of a script

# Search/Run Order Hijacking

- `Get-Variable` hijack
- A function or script needs to run, so the malware makes an executable named `Get-Variable` and PowerShell has to look for `Get-Variable` the other ones were deleted or affected so, at some point, PS is used and the malware is ran
- A powershell module that is well-known should not somehow be running from a user's Temp directory

# Integrated Development Environments (IDE)

- Powershell ISE (integrated scripting environment)
- Use VS Code with the PowerShell plugin.  
- Debugging works great for larger complex scripts

# Logging & Logging Bypasses

- Script Block Logging came in v4
- Module and transcription logging came in v5
- JEA (Just enough administration) came in v5

- PowerShell logging is set up separately from all other Microsoft logging

- One bypass is to run older PowerShell versions (these older versions should be blocked)

## Default Logging

- Really doesn't show much at all except suspicious events like those using `Add-Type`
- Also pipeline lifecycle stuff
- Suspicious terms:
	- Microsoft has a big list
	- The big ones are add-type, GetField, and NonPublic
	- It's literal string matching

## Script Block Logging

- PowerShell Operational Log - the source
- Logs processing of commands, script bloacks, functions, and scripts (interactive or automated)
- Event ID 4104 (optional start/stop logging 4105/4106)
- HKLM...EnableScriptblockLogging
	- Enable in Group Policy

## Module Logging

- More logs

## Transaction Logging

- More logs

## Transcription Logging

- Over-the-shoulder logging
- You will just see what they see in the window and not what's running in the background

## Protected Event Logging

- Introduced in Windows 10
- Allows application to encrypt sensitive data written to logs
- Sysadmins sometimes put sensitive data in logs, so this is a way of mitigating the risks from that

## Script Block & Module Logging Bypass

- https://github.com/cobbr/cobbr.io/blob/master/_posts/2017-05-02-ScriptBlock-Warning-Event-Logging-Bypass.md

```powershell
[ScriptBlock].GetField('signatures','NonPublic,Static').GetValue($null)

[ScriptBlock]."GetFiel`d"('signatures','N'+'onPublic,Static').SetValue($null,(New-Object Collections.Generic.HashSet[string]))
```

```powershell
([ref].Assembly.definedTypes | ? Name -like "PSEtwLogProvider")."GetFie`ld"('etwProvider','Non'+'Public,Static').getValue($null).dispose()
```

ETW = Event Tracing for Windows
Transcripts still show, but not that helpful

https://connect.ed-diamond.com/MISC/misc-104/evolution-de-la-securite-de-powershell-et-techniques-de-contournement

```powershell
$EtwProvider = [Ref].Assembly.GetType('System.Management.Automation.Tracing.PSEtwLogProvider').GetField('etwProvider','NonPublic,Static');
$EventProvider = New-Object System.Diagnostics.Eventing.EventProvider -ArgumentList @([Guid]::NewGuid());
$EtwProvider.SetValue($null, $EventProvider);
```

## Logging Recommendations

- Deploy the latest version of PowerShell (v5.1+)
- Enable, and collect PowerShell logs, optionally including Protected Event Logging. Incorporate these logs into your signatures, hunting, and incident response workflows.
- Implement Just Enough Administration on high-value systems to eliminate or reduce unconstrained administrative access to those systems.
- Deploy Windows Defender Application Control policies to allow pre-approved administrative tasks to use the full capability of the PowerShell language, while limiting interactive and unapproved use to a limited subset of the PowerShell language.
- Deploy Windows 10 or later to give your antivirus provider full access to all content (including content generated or de-obfuscated at runtime) processed by Windows Scripting Hosts including PowerShell.
- Increase Log sizes (Mandiant recommends 1GB+)

# Popular PS Attack Tools

- 10 tools:
	- Mimikatz
	- NinjaCopy
	- Inveigh
	- Get-Keystrokes
	- Get-GPPPassword 
	- PowerUp
	- PowerView
	- BloodHound
	- Get-Information
	- AMSI Bypass

## Mimikatz

- Dumps credentials from the LSASS process memory
- Gentle Kiwi figured out how to pull the credentials out of Microsoft's data structures in memory
- Microsoft changed to not have passwords in cleartext in memory, but you still see the hashes
- The problem is that Windows accepts hashes for auth - "Pass the Hash" attack

## NinjaCopy

- Allows hackers to copy files that are protected by the OS from being copied
- allows you to copy something like the "SAM" or "Security" hive database from `system32/config`
	- You can even remote with the tool to the DC to get the `NTDS.dit` file

## Inveigh

- Insecure multicast protocols - LLMNR/NBNS, DNS/mDNS, DHCP, ICMP, Proxy Auth
- Inveigh takes advantage of how insecure multicast protocols work
- Attackers have to gather the challenge and response NTLMv2-SSP hashes to crack offline

## Get-Keystrokes

- Grabs keystrokes...simple enough

## GetGPPPassword

- Grabs passwords from Group Policy preference files 
- Stored in `sysvol`
- MS released a change saying people shouldn't be setting passwords in their password files

## PowerUp

- Privilege Escalation checks
- Checks for things like:
	- Service enumeration abuse
	- DLL hijacking
	- Registry checks

## PowerView

- AD Recon information gatherer
	- Domain users and computers
	- Network Shares
	- Domain trust
- Network share recon
- They often find files in IT folders that have scripts with passwords in it

## BloodHound

- AD enumerator and mapper.
- Maps out AD landscape, permissions, and user structures
- LDAP enumeration

## Get-Information 

- Gathers random juicy information from the target
- Really benign information

## AMSI Bypass

- AMSI is our last defense against something like a "download cradle"
- Easy for red teamers to do this on engagements
	- Since bypass techniques are a cat-and-mouse game, they will typically test on their machine with the same versions before trying on target machines

# Obfuscation - Weaponization & Delivery - Pentesters vs Hackers

I want to know if tools work against hackers.  Do these tools and emulation platforms like Atomic Red Team account for evasion and obfuscation tactics during the weaponization and delivery phases?  Does the time constraint for pentesters make it hard to realistically emulate these attacks or do they tend to be more noisy?  This would account for tooling that's signature-based as well - where they would fail with a bit of obfuscation and stealth/evasion.  Pentesters are pressed for time, so sometimes you'll have to be noisy.

- How does this differ between pentesters and script kiddie hackers in terms of noise and workflow?
- How to test this with a purple teaming approach with ART (Atomic Red Team) and other tools to test your detection tools
- Obfuscation with download cradles?
	- As long, as you get around AMSI you're pretty much good since it's only in memory (in that session)
	- Chrome or proxy or firewall sometimes blocks things because of the URL, so they may have to deliver it from a different location and play around with the delivery mechanism/source
- EDRs tend to be a big crutch on this topic of attacks
- Pentesting is easier to be systematic with - also purple teaming or emulation engagements - red teaming is supposed to be realistic, so usually they need longer time windows and are working against the blue teamers

# AMSI, Logging, and Security Vendors

- A big question - is this the only place security vendors can grab information about PowerShell from?
- Do most EDR vendors use these interfaces or make their own - just watching system calls and ignore PS application activity?
	- They have to register/talk to the AMSI interface pretty much across the board
- Legitimate reason to turn off AMSI?
	- No not really, but the values have to be stored somewhere in the system and that's why it can be turned off

# AMSI (AntiMalware Scan Interface)

- Any Antimalware or EDR vendor can use it
- File and stream scanning
- Lots of the AMSI bypass techniques exist because PowerShell can "look inside itself."

# PowerShell Language Modes

- FullLanguage
- ConstrainedLanguageMode
	- Limit Permitted Type
- RestrictedLanguageMode
	- No script blocks
- NoLanguage

- JEA - just enough administration - start with no language and slowly give more

## The wrong way to setup CLM (ConstrainedLanguageMode)

- Set up with the environment variable `__PSLockDownPolicy Environment Variable`
- `[Environment]::SetEnvironmentVariable(‘__PSLockdownPolicy‘, ‘4’, ‘Machine‘)`

## CLM (ConstrainedLanguageMode) Bypass

- Use a script with “System32” somewhere in the file path

## The right way to set CLM (ConstrainedLanguageMode)

- Windows Defender Application Control (WDAC) (Windows 10 build 1903+)
- AppLocker (Windows 7+)

## What works under CLM (ConstrainedLanguageMode)?

- All of the above tools except `Get-Information`

# Credentials and Remoting

- DPAPI Protects SecureStrings
- Cmdlets that support Credentials:
	- There's 70+ commands that take the SecureString type of hidden password
- You can get the password still from `$cred.GetNetworkCredential.password`
- If you have a script that needs credentials to run, then store them on disk in an encrypted format.  
	- `(Get-Credential).Password | ConvertFrom-SecureString | Out-File cred.txt`
	- You need the private key to decrypt cred.txt.  This is the best way to use creds with a script so you don't have to type in the password.
	- Rehydrating the cred.txt file:
		- `$secureString = Get-Content cred.txt | ConvertTo-SecureString`

## PowerShell Remoting

- Execute code on a remote machine using WinRM
- Always encrypted
- Enabled default on Windows servers
	- Trusted or domain network
	- Local Area Network
- Work cross-platform
	- Remoting over SSH for Linux/macOS
- Ports 5985 (HTTP) and 5986 (HTTPS)
- Connections allowed from:
	- Administrators Group
	- Remote Management Users
- Lots of commands that take PSSession objects
	- `Get-Command -ParameterType PSSession`

- `Enter-PSSession`
	- You pass credentials either manually or leaving out the credential parameter to use the same one as the current PowerShell session

- Remote mgmt w/o PS Remoting:
	- SOAP or RPC based Cmdlets
	- if you're in an environment with WMI, then you can just use related WMI cmdlets
	- Limited functionality but they have high performance

- `Invoke-Command` 
	- Specifying a session is better than using just a computer name
	- If you give it a session, then you can get a lot more information from the terminal

# JEA (Just Enough Administration)

[Securing Python on Workstations](../../../📁%2004%20-%20Organizational%20Cyber/Secure%20Cyber%20Environment/Securing%20Python%20on%20Workstations/Securing%20Python%20on%20Workstations.md)
[Scripting vs Development Risks on Endpoints](../../../📁%2004%20-%20Organizational%20Cyber/Scripting%20vs%20Development%20Risks%20on%20Endpoints/Scripting%20vs%20Development%20Risks%20on%20Endpoints.md)

- How do we allow people to administer systems and do their jobs without being full admins
- PS v5+
- Reduce # of admins
- Limit what a user can do
- PS Remoting must be enabled

## Role Capabilities First (psrc)

- Defines cmdlets, functions, providers and external programs
- psrc - "powershell role capabilities"
- PSRC extension on the file
- Name must match name of the role

## Session Configuration File (pssc)

- Limits connecting user to role defined during registration
- Register the endpoint with `New-PsSessionConfiguration`

## Automating JEA on the Domain?

- Use ps1 scripts for JEA to go out and set up files for role capabilities and session configuration

## Session Endpoint Logging

- Local:
	- Get-Credential
	- Enter-PSSession
- Remote:
	- Session Configuration File
	- Role Capabilities File
	- Get-Comamnd
	- Get-Service

## Console Session Configuration

- Force SP to connect to local JEA endpoint
- Example usage:
	- Jumpbox
	- Kiosk
- Registry setting

## Desired State Configuration (DSC)

- This is dying out / deprecated
- Define end goal with JSON
- Push/Pull deployment options

## Managed Object Format (MOF) Files

- Let's you describe Common Information Model (CIM) classes
- Human readable text files
- Some attacks involved modifying MOF files

# PowerShell without PowerShell.exe

- PowerShell.exe is a Front End
	- Simply a Front End to System.Management.Automation DLL: 
		- .Net
		- COM
		- Windows Management Instrumentation (WMI) 
		- Common Information Model (CIM)
		- XML 
		- Active Directory
- PSwoPS.exe

## Installing PowerShell

- [Installing PowerShell on Windows - PowerShell | Microsoft Learn](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.4)
- You can use `winget install --id Microsoft.Powershell`

## PWSH Logging

- Use Windows PowerShell Policy Settings
- Non-Windows:
	- Linux: syslog
	- macOS: os_log
- look for `$PSHOME/powershell.config.json`

## Switching Versions in VS Code

- use Ctrl+P and powershell version to switch between Core (older) and regular

## Remoting Between Operating Systems

| Local Computer | Remote Computer | Prereqs                                                                                                        |
| -------------- | --------------- | -------------------------------------------------------------------------------------------------------------- |
| Windows        | Windows         | 1) Remote must have PowerShell Remoting enabled                                                                |
| Windows        | Linux, macOS    | 1) Local must have PowerShell Core installed<br>2) Remote must be configured for PowerShell Remoting over SSH  |
| Linux, macOS   | Windows         | 1) Local must have PowerShell Core installed <br>2) Remote must be configured for PowerShell Remoting over SSH |

# Tools for Emulation or Purple Teaming with PowerShell - Assessing PS Risks

Other comprehensive methods for testing detections when it comes to PowerShell - especially in collaboration with teams on the frontlines of security operations?

Maybe we want to systematically go through utilities or interfaces like PowerShell to see if we are logging enough from them for detections.  Are tools like AtomicRedTeam good for doing that.  We just don't want to have to research the attacks ourselves and it may be hard to keep up with as a small team. 
- This would help teams figure out  exactly what they need to log and help them automate detection from those logs.

- [redcanaryco/atomic-red-team: Small and highly portable detection tests based on MITRE's ATT&CK.](https://github.com/redcanaryco/atomic-red-team) 
	- Great tool for testing out detections from PowerShell
	- Essentially unit tests you can go and run to see if you're logging enough or detecting the attacks
- [VECTR | Collaborate. Benchmark. Improve.](https://vectr.io/)

# Questions

- Do cmdlet or function makers put error handling in assuming people will put parameters in the wrong place?
- What object types are there?  Are there custom ones with parameters? Does PS store anything about the objects in the background
- Does EDR or SIEM look for editing of these history files?  
	- Looking for editing of "HistorySaveStyle" and other parameters can be interesting behavior to look for
- Onboarding PS tools onto victim machines?
	- Do you have to obfuscate attack tools before using them or do the developers provide a common workflow with their tools?
	- 

# Action Items

- Where does your team get their baseline/default configuration for Microsoft logging and settings
- How does your team do desktop/endpoint/workstation provisioning
- Do you have PowerShell logging turned on
- What does your EDR and SIEM rules/detections cover?
- JIT and JEA?
- Purple teaming and emulation for detections?
- How do we figure out who can have/needs PowerShell in the org?  Do we have UEBA (user behavior analytics) - alerting on users trying to run PS who never do?
- Why aren't we trying out AtomicRedTeam
- Why don't teams hire at least one internal pentester that can internally "purple team?"
- Look at how to implement JEA in PowerShell at work
- Look at how admins do remote administration
- 

# Resources

- [janikvonrotz/awesome-powershell: A curated list of delightful PowerShell modules and resources](https://github.com/janikvonrotz/awesome-powershell)
- Lee Holmes - "the PowerShell guy"
- PowerShell Gallery
- Lee Holmes table