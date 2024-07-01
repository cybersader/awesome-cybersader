https://www.youtube.com/live/_cTiTHZfewY?feature=shared 

# About Joff
- Malware Pit Boss
# Python "psutil" Module
- Pypi package
	- community agreed 3rd party package resource for python community
- Ubuntu doesn't use pip and now wants apt install python3-psutil
- Cross platform module for process and system information
- Python 2.7 and 3.6+
# Scope of Coverage
- Most functions covered by UNIX like tools
	- ps,top,iotop
	- lsof
	- ifconfig
	- netstat
- BSD3 Clause license
# Why does it matter?
- we often make malware in and around Windows
- Examining process details during malware R&D is helpful
- Great GUI tools like System Informer are helpful
- "speed" of CLI
- Windows Terminal and PS 7.x
- "Research" on Chromium process architecture
	- interprocess communication abstraction lib is used with it
		- MojoM
		- allows Signal, edge, chrome, and more to have dedicated tasks
		- dedicated options like -type  and -utility sub type
		- when chrome is started dedicated tasks are specified on command line
			- types like crashpad handler, renderer, etc
		- utility-sub-type examples
			- Storage.mojom.StorageService
			- Network.mojom.NetworkService
		- Renderer processes talk to Network processes
## Chromium & Mitigations
- not all Chromium processes are protected under Windows
	- there are mitigations via Windows ProcessThreads API - works well
- mitigations applied to renderer and GPU processes are extensive - ASLR, control flow guard, restricted image loading, DEC or DAC?, child process creation disabled, indirect branch prediction, shadow stack
- Chromium process protected from process injection stuff, hijacking instruction pointers, only MS signed images, etc
- Even Win32k system calls disabled
	- ![](__attachments/BHIS%20Videos/IMG-Exploring%20Python%20psutil%20Under%20Windows%20-%20Joff%20Thyer-2024063021.png)
##  Why does this matter?
- Chrome gives access to crazy amount of data
- Renderer processes often attacked via webpages being rendered
	- lots of "heap-based" attacks where we throw a bunch of JS at the DOM to try breaking data structures and somehow get code into instruction pointer for browser
- Attacks can come from internet down or OS up
- We can attack processes easier from browser process than directly from O/S
	- process protection API around that process is crazy hard
	- Attacking network service process is easier - architecture is forced to leave room for O/S to app interactions

![](__attachments/BHIS%20Videos/IMG-Exploring%20Python%20psutil%20Under%20Windows%20-%20Joff%20Thyer-2024063021-25.png)

# Psutil 
- 
![](__attachments/BHIS%20Videos/IMG-Exploring%20Python%20psutil%20Under%20Windows%20-%20Joff%20Thyer-2024063021-26.png)

## Python iterable objects
- Easy to loop through
- 
- ![](__attachments/BHIS%20Videos/IMG-Exploring%20Python%20psutil%20Under%20Windows%20-%20Joff%20Thyer-2024063021-27.png)

## Process class attribute enumeration
- ![](__attachments/BHIS%20Videos/IMG-Exploring%20Python%20psutil%20Under%20Windows%20-%20Joff%20Thyer-2024063021-28.png)

## Memory info attribute
- ![](__attachments/BHIS%20Videos/IMG-Exploring%20Python%20psutil%20Under%20Windows%20-%20Joff%20Thyer-2024063021-29.png)

## memory maps method - 
- part of Process class
- 
- ![](__attachments/BHIS%20Videos/IMG-Exploring%20Python%20psutil%20Under%20Windows%20-%20Joff%20Thyer-2024063021-30.png)

# What is happening on Windows?
- Uses behind the scenes APIs and libs from Windows C code for process info
- ![](__attachments/BHIS%20Videos/IMG-Exploring%20Python%20psutil%20Under%20Windows%20-%20Joff%20Thyer-2024063021-31.png)

# Challenges looking at Windows processes
- process doesn't exist, access denied (system user and other user processes)
- ![](__attachments/BHIS%20Videos/IMG-Exploring%20Python%20psutil%20Under%20Windows%20-%20Joff%20Thyer-2024063021-32.png)
# Objectives and Preferences
- clear unambiguous process listing and info
- sort loaded modules by memory footprint and display
- filtering options

# Joff's ps.py script
- ![](__attachments/BHIS%20Videos/IMG-Exploring%20Python%20psutil%20Under%20Windows%20-%20Joff%20Thyer-2024063021-33.png)
# Python3 language elements 
![](__attachments/BHIS%20Videos/IMG-Exploring%20Python%20psutil%20Under%20Windows%20-%20Joff%20Thyer-2024063021-34.png)

# Command Line Args
- ![](__attachments/BHIS%20Videos/IMG-Exploring%20Python%20psutil%20Under%20Windows%20-%20Joff%20Thyer-2024063021-35.png)

# Script Core
- ![](__attachments/BHIS%20Videos/IMG-Exploring%20Python%20psutil%20Under%20Windows%20-%20Joff%20Thyer-2024063021-36.png)
