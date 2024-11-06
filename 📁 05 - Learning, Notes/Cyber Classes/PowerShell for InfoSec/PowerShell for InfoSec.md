---
aliases: 
tags: 
publish: true
date created: Wednesday, November 6th 2024, 8:00 am
date modified: Wednesday, November 6th 2024, 11:51 am
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

# 

- .

# Questions

- Do cmdlet or function makers put error handling in assuming people will put parameters in the wrong place?
- What object types are there?  Are there custom ones with parameters? Does PS store anything about the objects in the background
- Does EDR or SIEM look for editing of these history files?  
	- Looking for editing of "HistorySaveStyle" and other parameters can be interesting behavior to look for
- 

# Resources

- [janikvonrotz/awesome-powershell: A curated list of delightful PowerShell modules and resources](https://github.com/janikvonrotz/awesome-powershell)
- Lee Holmes - "the PowerShell guy"
- PowerShell Gallery
- 