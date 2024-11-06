---
aliases: 
tags: 
publish: true
date created: Wednesday, November 6th 2024, 8:00 am
date modified: Wednesday, November 6th 2024, 10:12 am
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

## 

# Questions

- Do cmdlet or function makers put error handling in assuming people will put parameters in the wrong place?
- What object types are there?  Are there custom ones with parameters? Does PS store anything about the objects in the background
- 

# Resources

- [janikvonrotz/awesome-powershell: A curated list of delightful PowerShell modules and resources](https://github.com/janikvonrotz/awesome-powershell)
- Lee Holmes - "the PowerShell guy"
- PowerShell Gallery
- 