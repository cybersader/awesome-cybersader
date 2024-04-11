---
date created: Wednesday, April 10th 2024, 8:20 am
date modified: Wednesday, April 10th 2024, 8:43 pm
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
	- Programming language that you can use 
## Lab 3 - Honeypot Part 2 
- a good place to look in the UAC output in the `hash_executables/list_of_executable_files.txt` for executables in weird directories
- grep 
	- E - extended regex
	- v - invert
- `grep -Ev '/(usr|lib|etc|bin|sbin|opt|boot|home|var/lib)/' hash_executables/list_of_executable_files.txt`
- Scheduled Tasks:
	- Linux can have lots of systems and ways of doing scheduled tasks
	- `find \[root\] -name \*cron\* -ls`
		- find in the root saved stuff folder anything with cron in the name
	- `ls -lrt \[root\]/etc/cron.* \[root\]/etc/crontab`
		- look in app-related directory for any cron-related folders and folders with the name `crontab`
		- `-t` sorts by last modified date
	- checking through the various configurations for these cron jobs will show benign patterns and the activation of legitimate executables
	- Checking files under `/var/spool/cron`
		- Cron config with "atjob"/one shot job.  
<<<<<<< Updated upstream
		- ![](_attachments/Linux%20Forensics/IMG-20240410203409674.png)
=======
		- ![](_attachments/Linux%20Forensics/IMG-20240410194852149.png)
>>>>>>> Stashed changes
		- Turns out this is the scheduled task that is designed to remove coin miners from the system using a bash script
- Network misbehavior:
	- ![](_attachments/Linux%20Forensics/IMG-20240410194852143.png)
	- All of the foreign/external IPs are super sus
	- The agettyd process is definitely a crypto miner
## Lab 4 - Honeypot Part 3
- Lab goals:
	1. Identify the process owner of our suspicious processes
	2. Find other related suspicious processes
	3. Find potentially suspicious files in the file system
	4. Audit user accounts and authorized_keys files for potential backdoors
	5. Audit the system Sudo configuration and related groups
	6. Check for suspicious set-UID and set-GID files
- Bad, bad users
	- ![](_attachments/Linux%20Forensics/IMG-20240410194852084.png)
	- All of the suspicious processes we noted in the earlier lab are listed here, Plus we can now see the bash processes that are the parent processes for PIDs 15853 and 21785. Also, perhaps unsurprisingly, we see that the web server process ("/usr/bin/httpd") is running as user "daemon". This aligns with our theory that all of the suspicious processes were spawned due to the CVE-2021-41773 web vulnerability.
	- This essentially means that somehow httpd had a web vuln that spawned a listening process "agettyd" that's now a C2 for the the cryptominer 
- Pivoting into the filesystem
	- We can use the 5th column from `bodyfile/bodyfile.txt` and the `etc/passwd` file to find the UID of the daemon user (UID 1) and `awk` to find files in `bodyfile` that are owned by UID 1.
		- UAC does not make a complete forensic image of the file system, but it does capture file metadata in bodyfile/bodyfile.txt. This file is just a pipe-delimited text file
		- The fifth field in each line is the numeric UID of the file owner. We need to figure out the numeric UID of user "daemon". Fortunately, UAC grabs a copy of the /etc/passwd file from the machine
		- User "daemon" is UID 1, and we use a little AWK-fu to find files in the bodyfile that are owned by this UID.
		- Aside from files related to the "atd" system, we see our old friends /var/tmp/dk86 and /run/lock/dk86. This leads us to suspect that these files may have been dropped via the Apache web vulnerability.
- User account audit
- Authorized_keys file
- Sudo config and related groups
- Set-UID and Set-GID 
## Lab 5 - Bulk Extractor
- Goals For This Lab
	1. Run bulk extractor on the memory image of a compromised honeypot
	2. Recognize suspicious URLs
	3. Gather additional context from string data
	4. Explore network data in recovered PCAP
- Not enough time -- laptop missing fan, overheating, and is slowing down
## Lab 9 - Disk Mounting 
- You will deal with this with Synology, QNAP, and RAID-based stuff
- Goals For This Lab
	1. Convert E01 images with ewfmount
	2. Activate RAID sets through loopback mounts
	3. Enable LVM Volume Groups manually
	4. Mount "dirty" (underplayed) file systems
	5. Reverse the process and deactivate mounted images
# Linux Filesystem
<<<<<<< Updated upstream
- ![](_attachments/Linux%20Forensics/IMG-20240410203409673.png)
=======
- ![](_attachments/Linux%20Forensics/IMG-20240410194852175.png)
>>>>>>> Stashed changes
- 3rd party software in usr/local , but also sometimes in opt for optional software
- `usr` is rarely changed, so you can check for changes here
- Think of `etc` as the system32 config or registry for Linux
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
- ![](_attachments/Linux%20Forensics/IMG-20240410194852176.png)
- `pstree` command shows process hierarchy in Linux
- ssh is normal
- Nested SSH shell from another process is a bad sign - SSH is bad when you see bash shell coming out of web server
	- ![](_attachments/Linux%20Forensics/IMG-20240410194852077.png)
- Square bracket processes are kernel made processes - some attackers hide their coin miners and malware as these
	- You shouldn't see spontaneous processes ran out of interactive user shells
	- They will still have higher PID values and the start time will be hours, days, or weeks after systemd and first startup
## Orphaned Processes
- ![](_attachments/Linux%20Forensics/IMG-20240410194852135.png)
- When process that started you goes away, then PS can show process ID as systemd as if it started the program.
- What's really happening is some background process was started and the shell was closed
- There is a way to differentiate between orphaned processes and systemd started processes
	- look at proc status file at the `NSsid` value - that's the original parent process
	- You can see the same thing with `stat file` under `proc` folder
	- UAC captures this, but you could call it off with a custom YAML as well
## Scheduled Tasks and Persistence
- ![](_attachments/Linux%20Forensics/IMG-20240410203837740.png)
- Linux has a lot of overlapping task scheduling systems
- cron and spool are common names
- Linux has at least 3 that happen simultaneously
- `ls /etc/*cron*`
- systemd timers is also common - [(13) All About Linux Systemd Timers w/ Hal Pomeranz - YouTube](https://www.youtube.com/watch?v=rAe9Iw08Fn0) 
## Process Network Behavior
- Most malware beacons out to a website - it happens fast though.  Look for process listening in the netstat output
- ![](_attachments/Linux%20Forensics/IMG-20240410194852065.png)
- UAC grabs a lot of this and netstat_-lpeanut is a good place to start
- Is it normal for this process to be listening on this port?
- To understand what's normal, look at the netstat peanut output of all machines on the network and stack the outputs 
# User Context & Identity
- ![](_attachments/Linux%20Forensics/IMG-20240410194852111.png)
- groups in Linux merely allow sharing of projects
- users have UIDs and belong to one or more groups (with at least the group GID that corresponds to their user) -- creation of user also creates a group associated specifically with that user
- only root files can change ownership on files
## Analytics Notes
- What user is that process running as?
	- Can backtrack where they broke in
- Who owns the malicious executable?
	- Can also backtrack to compromise

- What other processes are running as the bad user?
- What other files/dirs do they own?

- We can use UAC
	 - ![](_attachments/Linux%20Forensics/IMG-20240410194852178.png)

## UID Notes
- UID 0 is admin rights
- Normally only "root" has UID 0
- Accounts with UID < 1000 are service accounts
	- Should be locked
	- No interactive logins like user accounts have
- Use `sort -t: -k3,3 -n /etc/passwd` to find UID 0 accounts with a file/directories 
	- ![](_attachments/Linux%20Forensics/IMG-20240410194852095.png)
	- www-data is an account dropped by web application - these should have UIDs under 1000
- The service accounts should have `sbin/nologin` and `/bin/false` to use them as backdoors
- Attackers have to set a password in the `etc/shadow` file to have a usable password instead of `*`.  Service accounts have `*` which means no password, so it's obvious when an attacker adds one
## Sudo
![](_attachments/Linux%20Forensics/IMG-20240410194852177.png)
- Job of attacker in Linux is to get admin access on box unless you just want a coin miner
- They need root to have guaranteed persistence 
- Sadly, priv esc Linux vulns come out monthly
- The `/etc/sudoers` file gives UIDs/users root access
- Looking in the sudo config file isn't enough.  
- There's a `sudo` group that allows you to run ANY command on ANY user.  Check the `etc/group` file for evidence of this.
## Set-Id Bits
- The password program to change password is set-id
- It's a special permissions flag `-rwsr` - program runs as owner of the binary rather than the account - can run as root instead of the user running it
- Allowing set-id permission on a program can introduce a priv esc vulnerability
- Adding set-id to shell can also allow anyone to use root user when running commands

- Stack and compare a program on multiple machines for set-id permission to know if it's normal

## Authorized Keys
- You don't need a user and password to login.  For example, you can use SSH instead
- ![](_attachments/Linux%20Forensics/IMG-20240410194852105.png)
- Attackers will drop their own keys into root's authorized keys file for persistence
- Check the `$HOME/.ssh/authorized_keys` file 
- If you see the same key over multiple machines, then that points to an automated attack
# Post-Exploitation Checklist
- ![](_attachments/Linux%20Forensics/IMG-20240410194852157.png)
- authorized_keys entries are popular lately

# The Bad Old Days - Memory, Bulk Extractor, Before Volatility
- Memory analysis before Volatility was HARD
- Needles in lots of haystacks
- Bulk extractor - agnostic memory data extractor
	- agnostic data extractor
	- understands compressed file formats
	- Can extract PCAPs from memory
	- histograms of output
	- Finds important data types/fields - URLs, hostnames, IPs, emails, etc.
	- Forensics like this is an artform and more akin to gambling in the streets than something flashy
	- Bulk extractor can work better for those 4 TB images than Volatility 
	- ![](_attachments/Linux%20Forensics/IMG-20240410194852150.png)
	- You can use `b e viewer` the Java GUI to look at memory with the BE image 
	- `strings -a -t d victoria-v8.memdump.img | gzip >hc07/strings.asc.gz`
		- string indexes the common strings
		- 
	- The command-line "tshark" program is excellent for quickly extracting a few fields from each packet and letting me create a quick histogram with some command line kung fu:
		- `tshark -n -r packets.pcap -Tfields -e ip.src -e tcp.srcport -e ip.dst -e tcp.dstport | sort | uniq -c`
	- Tcpflow
		- You could manually go in with Wireshark and "Follow TCP stream", but I prefer to use "tcpflow" to extract all of the TCP streams at once
		- `tcpflow -r packets.pcap -o flows -e http`
		- `ls –lh flows/`
		- The 25/tcp traffic is nothing but long strings of 'A' characters. This makes me wonder if it is somebody trying some sort of buffer overflow against the email server on 192.168.56.102.
# Disk Acquisition & Access
- Memory capture and analysis is hard on Linux, so you should also know disk-based analysis
- 3 situations where disk acq is good:
	- Public Cloud
		- follow vendor procedures
		- Cloud providers have guidelines for acquisition 
			- for Amazon and Cloud Providers, you usually dump into object storage
	- Private cloud
		- snapshot and copy (qemu-img to translate)
	- Local Cloud
		- `ewfacquire`
		- `dc3dd`
		- Esxi cluster - snapshot it -> extract it from the backend storage
		- Sometimes they lack the storage overhead to take the snapshot #IncidentResponse #management 
		- You want a flat `.vmdk` format usually - raw disk image with everything you need
		- Depending on virtualization environment, you may not be able to use analysis tool natively
			- Use `qemu-img` to convert from various disk formats with VMware, HyperV, VBox, etc.
		- Sometimes Bare Metal Linux
			- Can you get a root shell? - yes?..awesome! -- use `dc3dd` 
			- Most forensics tools use EWF and other compressed formats (also eliminates long runs of nulls)
			- `ewfacquire`- runs in CLI to get compressed image
			- Maybe pull out disk and use write blocker last resort -- good luck
- Default Disk Geometries
<<<<<<< Updated upstream
	- ![](_attachments/Linux%20Forensics/IMG-20240410203409675.png)
=======
	- ![](_attachments/Linux%20Forensics/IMG-20240410203837742.png)
>>>>>>> Stashed changes
	- Linux does weird stuff with disk boxes
		- Example: Software RAID interface -> LVM (logical volume mgmt) layer -> then maybe ZFS
		- Commercial forensics suite can't do this, so you need open source tools to do it
	- File systems can be dirty or corrupted if unplugged
- Layers
	- ![](_attachments/Linux%20Forensics/IMG-20240410194852144.png)
	- Lots are in expert witness EWF or E01 format
	- You have to assemble them, then they might be encrypted or have software RAID
	- You have to get all the way to unencrypted disk volumes to use this data with your forensics tools
## Example 
- ![](_attachments/Linux%20Forensics/IMG-20240410203837741.png)
- you can use `ewfmount` with the E01 (first piece) and it will find and use E02, E03, etc.
- `ewfmount` quickly runs by lying to the Linux OS
	- It's a file system and userspace driver
	- Accessing the fake file talks to the ewfmount program and pulls data out of the EWF files
	- It's a software layer to go through the data.  It's better than unpacking huge TB files
- Now we can examine the raw disk image with tools like `mmls` from Sleuthkit
- `mmls` dumps partition table from the front of the disk
- Standard geometry with MBR (master boot record)
	- ![](_attachments/Linux%20Forensics/IMG-20240410194852112.png)
- Time to figure out how to boot
	- ![](_attachments/Linux%20Forensics/IMG-20240410194852151.png)
	- Ext2 filesystem 
	- It mounted last on the `/boot` directory which has everything we need to boot into the Linux OS
	- We need to replicate what the OS does during boot with our own tools manually since we're working with an image
	- Trick the OS to think it's talking to a boot device
- Making a readonly view of the data for Linux OS to use
	- ![](_attachments/Linux%20Forensics/IMG-20240410154848647.png)
	- `file -s /dev/loop0` to look at it
- Now we need to activate the soft partitions in the volume
	- ![](_attachments/Linux%20Forensics/IMG-20240410194852079.png)
	- The device nodes you see on the slide are the actual Linux file systems. If you wanted to acquire an image of the raw file system, then use ewfacquire or dc3ddon /dev/VulnOSv2-vg/root. But I’m more interested in mounting this file system so that I can find and extract artifacts with standard Linux command-line tools.
	- swap space in linux is messy.  No tools that get much from it, but you can use bulk extractor and strings
- To run some tools over the file system, we need to mount
	- ![](_attachments/Linux%20Forensics/IMG-20240410194852145.png)
	- mount read only, no execution
	- The file system is dirty - usually the filesystem driver looks at the filesystem journal on disk so it knows what happened
		- This doesn't keep your data safe, but only your filesystem
	- If we can get the filesystem driver to ignore the journal, then we can get it to work
		- use `noload`
		- We still also have the `/boot` filesystem
			- mount command has an option to not have to make loopback without "losetup"
			- ![](_attachments/Linux%20Forensics/IMG-20240410203837743.png)
			- TURNS OUT THIS DOESN'T WORK EITHER, because it will overlap with the other existing loopback device
			- We can also mount the /boot partition directly. We need to set up a loopback device for this, but the mount command will accept “loop” and “offset” options and set up the loopback device for us. If you recall, /boot is an EXT2 file system, and EXT2 does not have a file system journal. So the “noload” option is not necessary here.
- Tearing all this down manually
<<<<<<< Updated upstream
	- ![](_attachments/Linux%20Forensics/IMG-20240410203409676.png)
=======
	- ![](_attachments/Linux%20Forensics/IMG-20240410194852127.png)
>>>>>>> Stashed changes
	- unmount backwards
	- turn off the volume groups with "n"
	- losetup -d to get rid of loopback devices
	- unmount ewf mount 
## Linux Disk Acquisition Cheatsheet
- ![](_attachments/Linux%20Forensics/IMG-20240410194852152.png)
- Also look here - [Microsoft PowerPoint - dm-crypt LVM2.pptx](https://deer-run.com/users/hal/CEIC-dm-crypt-LVM2.pdf) 


# Q&A
- Do you bring tuned artifact YAMLs and configs with you to an investigation or just start from scratch each time?
	- 
- Are proactive antiforensics measures common as opposed to reactive antiforensics measures? More specifically, does malware ever monitor for forensics activities?
	- anti EDR, process dumps
	- more common on Windows though
	- There are kernel-level ways of hiding forensics activities
- When should responders/investigators hide their forensics activities?
	- 
- How can security teams and companies make it easier for forensicators, incident responders, and investigators to do their jobs on sprawling networks and systems?
	- 
- Any bad experiences with how cyber insurance interplays with investigations?
	- Definitely have to do the CBA on it.  A lot of the times insurance companies will charge a lot more than you will ever need and not give you enough for an actual incident.  Cyber insurance usually lets you use certain forensics firms and not others