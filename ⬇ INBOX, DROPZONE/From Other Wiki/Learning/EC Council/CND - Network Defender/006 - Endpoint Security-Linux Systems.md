# Linux
- most services and systems use Linux or Unix at some layer
# Overview
- Linux OS sec
- Installation and patching
- hardening
- users and access
- management
# Linux OS and Security Concerns
![](__attachments/CND%20-%20Network%20Defender/IMG-006%20-%20Endpoint%20Security-Linux%20Systems-2024063021.png)

- system libs
- daemons - services that run to perform tasks like printing, scheduling them, etc.
- Graphical server - sub system for displaying graphics; called "X"
- Not graphical by default
## Features
- modular and portable
- open source
- multiuser
- shell - interpreter program
- authentication, controlled access to files, and encryption
# Linux Installs and Patching
- Minimal install - only what's necessary - reduce attack surface
- Password protect BIOS and Bootloader
	- Protects from changing BIOS setting
	- Booting system
	- bootloader is usually "grub"
	- Protects from:
		- accessing another OS with dual boot
	- Grub and LILO bootloaders are common
## Patch Management
- manually from website or 3rd party
	- `sudo apt-get update && apt-get upgrade`
	- `sudo apt-get dist-upgrade`
# Linux OS Hardening
- Disable unnecessary services
	- use `systemctl`
	- to kill a process `sudo sudo kill -9 [pid]`
- remove software
	- apt-get, dpkg, or yum package managers
	- apt-get autoremove - remove auto installed packages
- AV
	- use ClamAV with clamscan or some other AV
- Settings
	- restrict core dump
	- remove legacy services
	- remove stuff started by xinetd or inetd 
	- disable server services
	- syslog service enabled and running
	- NTP service to have clock accuracy
	- restrict cron and at services
- passwords
	- use PAM (pluggable auth module)
	- No accounts with empty passwords
		- awk with etc/shadow to ensure this isn't true
-  Accounts
	- disable interactive user accounts that aren't being used
- secure shared memory
	- run/shm read only without permissions
- delete X11 or X-Windows
- separated disk partitions for linux system
	- file systems mounted on separate partitions
		- usr, var, hom, var/tmp
		- tmp
- disk quota for all users
- permissions for certain files and dirs
	- ![](__attachments/CND%20-%20Network%20Defender/IMG-006%20-%20Endpoint%20Security-Linux%20Systems-2024063021-3.png)
- disable unwanted SUID and SGID binaries
- remove perms for world-writable files?
- disable usb storage sometimes
	- ![](__attachments/CND%20-%20Network%20Defender/IMG-006%20-%20Endpoint%20Security-Linux%20Systems-2024063021-4.png)
- config sysctl to secure Linux kernel
	- execshield
	- syn flood
	- ip addr verify
- Firewall
	- iptables is built-in
	- sudo apt-get install iptables
- Monitor open ports and services
	- netstat -tulpn or ss-tulpn
- Turn off ipv6 if not in use
	- misconfigured ipv6 can be used in certain attacks
- Secure SSH login root login
	- disable SSH root login 
		- disable permit root login in sshd_configf
		- add root user in DenyUsers sshd_config
	- enable detailed logging for ssh
- Chroot SFTP
- Netsec and Remote access
	- no IP forwarding
	- firewall
	- IP ignore broadcast requests
	- SSH version 2 with INFO log level and permitemptypasswords to NO
	- disable root login over SSH
# Auditing 
- use Lynis for health scan and compliance testing
- AppArmor - Linux kernel security module; restrict program capabilities
- SELinux - kernel-level MAC implementation for Linux
- OpenSCAP - automated config, vuln, and patch checking, technical control compliance activities.
