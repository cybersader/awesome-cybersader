---
date created: Wednesday, April 10th 2024, 8:20 am
date modified: Wednesday, April 10th 2024, 12:05 pm
tags:
  - Linux
  - "#HalPomeranz"
  - DFIR
  - Forensics
  - DigitalForensics
  - IncidentResponse
  - BlueTeam
  - DataAcquisition
  - UAC
---

> Linux Forensics by Hal Pomeranz

%% Begin Landmark %%
- **[Exercises](./Exercises/Exercises.md)**
- **[Linux Intro](./Linux%20Intro/Linux%20Intro.md)**
- **[Live Linux Triage](./Live%20Linux%20Triage/Live%20Linux%20Triage.md)**
- **[UAC Tool](./UAC%20Tool/UAC%20Tool.md)**

%% End Landmark %%
# Exercises
## Lab 1 - Running UAC
- Simple to run
- Change the yaml to run commands you want
## Lab 2 - Honeypot Part 1
- Goals:
	- Spot suspicious process executable paths
	- Recognize suspicious process working directories
	- Get more detailed information about suspicious processes
	- Understand parent/child process relationships
- Quick Wins
	- `grep -F '> /' live_response/process/running_processes_full_paths.txt | grep -Fv /usr`
	- grep -F doesn't have to set up regex engine, so it's a lot faster with fixed strings (-F)
- Awk
	- reads input one line at a time
	- 
# Linux Filesystem
- ![](_attachments/Linux%20Forensics/IMG-20240410100320912.png)
- 3rd party software in usr/local , but also sometimes in opt for optional software
- `usr` is rarely changed, so you can check for changes here
- Thing of `etc` as the system32 config or registry for Linux
- user stuff under `home/USER`
- root user home is just `/root` and at top of Linux filesystem
- Lots of backdoors usually set up in `root` directory
- Linux has globally shared `tmp` directories (bad idea but oh well)
	- `dev/shm` in memory filesystem - great for putting volatile attacker content and malware - can still be captured during live collection
- FTK and Encase don't account for EXT and other Linux filesystem
- `root` is right up at the top to make it easy with mounting
- executables are typically under `/usr/bin`,`/usr/sbin`,`/user/libexec`, etc
- exception include `/opt` 3rd-party software
- Be sus of programs in user-writable directories `/tmp`, `/var/tmp`, `/dev/shm`
- Directories starting with `.` are uncommon and hidden with `-a` flag for `ls`
- You have to specify `./` when running programs as a pointer to current directory or else attackers could put malicious LoLbins in a commonly used directory that would likely run
# Processes Running from Deleted Binaries
-  A program can start running, delete the executable, and then run from an image in memory so it's volatile
- UAC recognizes this and grabs a copy from memory of the executable
# What to do when compromised?
- Maybe don't pull the plug
- If you pull the plug, then they might find out
- They might be more aggressive or scuttle/destroy the network and evidence
# Way to timeline large-scale investigations
- Look at security tickets and troubleshoot tickets - sometimes little tickets point to larger campaigns
- 
# Dormant malware and sleepers
- can be reactivated by a scheduled task
- list of hashed executables from UAC can be useful for this
- look in UAC `hash_executables` folder for hidden files and dirs
	- look for executables outside of `/usr`
- `[root]` look for hidden dirs
- live_response/process/lsof_-nPl.txt
- bodyfile/bodyfile.txt

# Linux Processes
- Windows malware like to use servicehost under explorer to run malware
- Knowing the Linux process hierarchy helps find bad
- ![](_attachments/Linux%20Forensics/IMG-20240410114115080.png)
- `pstree` command shows process hierarchy in Linux
- ssh is normal
- Nested SSH shell from another process is a bad sign - SSH is bad when you see bash shell coming out of web server
	- ![](_attachments/Linux%20Forensics/IMG-20240410114814870.png)
- Square bracket processes are kernel made processes - some attackers hide their coin miners and malware as these
	- You shouldn't see spontaneous processes ran out of interactive user shells
	- They will still have higher PID values and the start time will be hours, days, or weeks after systemd and first startup
## Orphaned Processes
- ![](_attachments/Linux%20Forensics/IMG-20240410114826273.png)
- When process that started you goes away, then PS can show process ID as systemd as if it started the program.
- What's really happening is some background process was started and the shell was closed
- There is a way to differentiate between orphaned processes and systemd started processes
	- look at proc status file at the `NSsid` value - that's the original parent process
	- You can see the same thing with `stat file` under `proc` folder
	- UAC captures this, but you could call it off with a custom YAML as well
## Scheduled Tasks and Persistence
- ![](_attachments/Linux%20Forensics/IMG-20240410115643521.png)
- Linux has a lot of overlapping task scheduling systems
- cron and spool are common names
- Linux has at least 3 that happen simultaneously
- `ls /etc/*cron*`
- systemd timers is also common - [(13) All About Linux Systemd Timers w/ Hal Pomeranz - YouTube](https://www.youtube.com/watch?v=rAe9Iw08Fn0) 
## Process Network Behavior
- Most malware beacons out to a website - it happens fast though.  Look for process listening in the netstat output
- ![](_attachments/Linux%20Forensics/IMG-20240410120128233.png)
- UAC grabs a lot of this and netstat_-lpeanut is a good place to start
- Is it normal for this process to be listening on this port?
- To understand what's normal, look at the netstat peanut output of all machines on the network and stack the outputs 
- 
# Q&A
- Do you bring tuned artifact YAMLs and configs with you to an investigation or just start from scratch each time?
	- 
- Are proactive antiforensics measures common as opposed to reactive antiforensics measures? More specifically, do they watch for forensics activities?
	- 