---
date created: Wednesday, April 10th 2024, 8:58 am
date modified: Wednesday, April 10th 2024, 8:58 am
---

# The Case for Live Triage
- You can't visit every freakin' machine
- We need a rapid way to acquire the data
	- Full disk images not practical - images too large
	- Bandwidth limited
- Memory forensics is tricky 
	- kernel version issues
		- For Linux, Volatility needs a profile for kernel version that EXACTLY matches in order to map to the memory and be able to properly look through it
	- lack of dependencies
	- organizational/process issues
- Go "old school" with live collection
- Don't reinvent the wheel
	- UAC and LAC - 
		- a bunch of shell scripts with config file on top
		- Can run on Solaris, Macs, etc.
		- Self-contained:
			- copy tool archive to target host
			- decompress archive on target
			- run tool as root on target
			- collect output archive file from target
- It is a balance between getting your evidence and saving time and resources