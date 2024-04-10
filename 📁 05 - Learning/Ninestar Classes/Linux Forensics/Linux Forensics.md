---
date created: Wednesday, April 10th 2024, 8:20 am
date modified: Wednesday, April 10th 2024, 10:17 am
---

> Linux Forensics by Hal Pomeranz

%% Begin Landmark %%
- **[Linux Intro](./Linux%20Intro/Linux%20Intro.md)**
- **[Live Linux Triage](./Live%20Linux%20Triage/Live%20Linux%20Triage.md)**
- **[UAC Tool](./UAC%20Tool/UAC%20Tool.md)**

%% End Landmark %%
# Exercises
## Lab 1 - Running UAC
- Simple to run
- Change the yaml to run commands you want
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
- 