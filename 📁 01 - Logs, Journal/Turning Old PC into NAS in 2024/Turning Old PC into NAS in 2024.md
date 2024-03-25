---
created: Thursday, Mar 21, 2024 07:04 PM
updated: Thursday, Mar 21, 2024 08:17 PM
date created: Thursday, March 21st 2024, 7:04 pm
date modified: Sunday, March 24th 2024, 7:31 pm
tags:
  - TrueNAS
  - NAS
  - HomeLab
  - Storage
  - Hardware
  - BIOS
  - UEFI
  - Filesystem
---

# Misc Links & Videos
- [(40) Building A Budget NAS with TrueNAS Scale - YouTube](https://www.youtube.com/watch?v=iSpL9LnczVQ)
- [(40) Building A DIY NAS On A Budget - TrueNAS Scale - YouTube](https://www.youtube.com/watch?v=jf_5FaVFnrU)
- [balenaEtcher - Flash OS images to SD cards & USB drives](https://etcher.balena.io/)
- [Total Noob Here: trying to install TrueNas on USB pendrive | TrueNAS Community](https://www.truenas.com/community/threads/total-noob-here-trying-to-install-truenas-on-usb-pendrive.102312/)
- [Ventoy](https://www.ventoy.net/en/index.html)
- [Installing SCALE |](https://www.truenas.com/docs/scale/gettingstarted/install/installingscale/)
- [Download TrueNAS SCALE - Data Storage Software](https://www.truenas.com/download-truenas-scale/?submissionGuid=b256dc43-0345-4eee-9ce8-83b058681d6c)
- [Configuring SCALE Using the UI |](https://www.truenas.com/docs/scale/23.10/gettingstarted/configure/uiconfigurationscale/)
- [Preparing for SCALE UI Configuration |](https://www.truenas.com/docs/scale/gettingstarted/install/installprepnonenterprise/)
- [SCALE Hardware Guide |](https://www.truenas.com/docs/scale/gettingstarted/scalehardwareguide/)
# Hardware
- Old PC
	- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174732455.png)
## HDDs
- The most expensive part of NAS projects 😅
	- [Amazon.com: Seagate IronWolf 12TB NAS Internal Hard Drive HDD – 3.5 Inch SATA 6Gb/s 7200 RPM 256MB Cache for RAID Network Attached Storage – Frustration Free Packaging (ST12000VNZ008) : Electronics](https://www.amazon.com/Seagate-IronWolf-12TB-Internal-Drive/dp/B084ZTSMWF)
  
Choosing the right hard disk drive (HDD) for your Network Attached Storage (NAS) system depends on your specific needs, including capacity, speed, reliability, and budget. However, there are a few models and brands that consistently receive high marks from both consumers and professionals for NAS setups:
1. **Western Digital Red Plus**: Specifically designed for NAS systems, these drives offer a good balance between performance, reliability, and price. They are optimized for 24/7 operation in multi-bay systems, support NASware technology for improved reliability and system performance, and are available in capacities up to 18TB.
2. **Seagate IronWolf**: Another popular choice for NAS setups, Seagate IronWolf drives are built for always-on, always-accessible 24×7 performance. They offer AgileArray technology for optimal reliability and system agility, and are available in capacities up to 18TB. IronWolf Pro models offer higher performance and are designed for commercial and enterprise NAS systems.
3. **Synology HAT5300**: If you are using a Synology NAS, their HAT5300 series drives are optimized for Synology devices, offering high performance and reliability. These drives are engineered to handle high workloads and data-intense environments, making them suitable for business and professional use.
4. **Toshiba N300**: Designed for personal, home office, and small business NAS systems, the N300 series offers high reliability and performance with up to 18TB of capacity. These drives are built to handle high data workloads in a multi-RAID NAS environment.

When selecting a drive, consider the following factors:
- **Capacity**: Ensure the drive meets your storage needs both now and in the foreseeable future.
- **Reliability**: Look for drives designed for 24/7 operation with features like vibration protection and built for NAS systems.
- **Warranty and Support**: Longer warranties and good customer support can be invaluable, especially in a NAS setup where data availability is crucial.
- **Price**: While important, the cheapest option may not always offer the best value in terms of reliability and longevity.

Always check for compatibility with your specific NAS model and consider buying drives from multiple batches to avoid the risk of simultaneous failures from the same production batch.
# Initial Install TrueNAS onto PC
- Steps:
	- Check for necessary hardware on old PC
	- Flash .iso file to a USB drive
	- Plug in a initial install TrueNAS
	- .
## Prepare Old PC - Hardware
- In my case, I didn't have an SSD (NVMe in this case), so I added one from another old laptop
	- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174732515.png)
- Make sure you have SATA cords for data and power to the HDD
	- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174732559.png)
## Flashing TrueNAS to a USB Drive
- Download TrueNAS Scale .iso file
	- [Download TrueNAS SCALE - Data Storage Software](https://www.truenas.com/download-truenas-scale/?submissionGuid=b256dc43-0345-4eee-9ce8-83b058681d6c) 
- "Flash" the .iso file to the USB drive with [balenaEtcher](https://etcher.balena.io/) or [Rufus](https://rufus.ie/en/)
	- balenaEtcher 
		- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174732603.png)
		- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174732680.png)
		- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174732743.png)
		- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174732800.png)
		- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174732846.png)
		- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174732899.png)
		- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174732956.png)
- 
## Installing TrueNAS onto Old PC (w/sidequests)
- Turn it on
- You should get a blue screen that allows TrueNAS install
	- Hit `Enter`
	- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174733007.png)
- Errors:
	- `bad shim signatures` and `you need to load the kernel first`
	- [I can install and boot Truenas Scale on one pc and not another. | TrueNAS Community](https://www.truenas.com/community/threads/i-can-install-and-boot-truenas-scale-on-one-pc-and-not-another.106601/)
		- `Try disabling secure boot from the BIOS.`
	- Restart or Power off your PC, then turn it back on and hit `Delete` or `F2` a bunch of times till you get to BIOS setup
		- Find and disable Secure Boot
		- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174733058.png)
### Wrong SSD Type
- Issue: Old OS on SSD, so it's not showing up in TrueNAS destination list
	- I don't have any sort of access to OS.  Locked down.
	- Solution:
		- Restart to BIOS setup
		- Look for something like "Data Wipe" or "Secure Erase"
			- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174733109.png)
			- Are you sure? 🤔
				- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174733166.png)
			- YESSSSS....ERASE IT ALLL 👿
				- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174733231.png)
- PC not detecting NVMe hard drive
	- [M.2 Interface, Key and Socket explained](https://www.atpinc.com/blog/what-is-m.2-M-B-BM-key-socket-3)
	- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174733279.png)
	- [‎Dell SSD Classification | DELL Technologies](https://www.dell.com/community/en/conversations/inspiron/dell-ssd-classification/647f8d18f4ccf8a8ded8bf24)
		- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174733318.png)
	- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174733365.png)
	- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174733407.png)
	- Ahhhhh it's a SATA SSD 😖
	- Looks like I'll have to buy an actual **NVMe SSD** rather than an **M.2 SATA SSD** unless my XPS 8940 supports it
		- SATA just refers to the connection type
	- M.2 Form Factors
		- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174733478.png)
	- [XPS 8940 Setup and Specifications | Dell US](https://www.dell.com/support/manuals/en-us/xps-8940-desktop/xps-8940-setup-and-specifications/specifications-of-xps-8940?guid=guid-7c9f07ce-626e-44ca-be3a-a1fb036413f9&lang=en-us) 
		- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174733518.png)
	- Ordered one overnight 🥴
		- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174733567.png)
		- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174733620.png)
### SSD Not Showing up in Destination List for Installing as TrueNAS Boot Drive - OS Not Seeing SSD
- TLDR 😆 - [LawrenceTechTips answer/solution to my question - YouTube clip](https://youtube.com/clip/UgkxoJhZaSWuA89uWk8NBZqkMjexvh31yF5N?si=g0mqJ534weA0tIe6)

- Still not detecting in TrueNAS installer, but is detecting in BIOS
	- [Truenas Scale not seeing SSD to install on | TrueNAS Community](https://www.truenas.com/community/threads/truenas-scale-not-seeing-ssd-to-install-on.104153/)
		- Please ignore my previous post. I have fixed the problem.  
		- I reformatted the boot disc to ExFAT, put it back in the NAS system and the installation USB recognised it.
	- I would put it onto my other computer, but it doesn't support Gen 3 PCIE....yayyyyy 😑
	- There's one option only.  USB/live boot Linux onto the machine and reformat everything with GParted.  I swear I run into every issue under the sun with these projects 😆.
		- Since Kali Linux has GParted, I'll just boot with that
		- [Get Kali | Kali Linux](https://www.kali.org/get-kali/#kali-live) 
			- [gparted | Kali Linux Tools](https://www.kali.org/tools/gparted/)
	- Used balenaEtcher to flash to a USB, plugged it in, and got a GNU Grub screen.  I'm pretty sure the CPU supports graphics, so not sure what the issue is
	- Trying to flash Kali to USB with Rufus instead
		- [Rufus - Create bootable USB drives the easy way](https://rufus.ie/en/)
	- Nm I used a Medicat USB I had lying around
	- Couldn't see the drive
	- Tried another SSD with old Windows.  It booted.  However, again, TrueNAS doesn't detect this SSD.
	- Motherboard (mobo) issue? Like seriously?
- SSD not showing up in OS, but showing up in BIOS (basic input output)
	- Here's my thinking.  It's likely a BIOS setting or the drive is in some format that doesn't work with TrueNAS scale installation or being detected by the OS
		- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174733667.png)
	- SSD and storage formatting explained
		- [Filesystems and Partition Schemes](Filesystems%20and%20Partition%20Schemes/Filesystems%20and%20Partition%20Schemes.md) 
			- `Partition schemes are crucial for an OS to recognize, access, and manage the partitions within a storage device.`
		- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174733710.png)
	- RAID and AHCI
		- **BIOS/UEFI Settings and SSD Detection**: If your BIOS is set to RAID mode but you're not using a RAID configuration, your OS might not recognize the SSD unless the correct RAID drivers are installed. Conversely, `setting it to AHCI mode typically allows for immediate recognition and utilization of the SSD by the OS, assuming the OS supports AHCI (which most modern operating systems do).`
		- **MBR and Bootability**: Whether an SSD is formatted as MBR or GPT is more about the disk's partitioning scheme and doesn't directly impact how the BIOS/UEFI detects the SSD in terms of AHCI vs. RAID mode. However, `GPT is required for booting from disks larger than 2TB and for systems that use UEFI instead of traditional BIOS.`
	- Changing settings in BIOS to make it show up:
		- Enable AHCI instead of RAID
			- This fixes things because GPT is required for UEFI-based boots instead of BIOS
			- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174733761.png)
		- Enable SMART Reporting
			- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174733799.png)
	- Boot to another USB like Medicat USB or a Linux distro then apt install or get "gparted", so we can change the partition from basic/classic MBR to GPT ........ *phew* that's a lot of stuff to get this silly SSD working
		- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174733842.png)
		- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174733887.png)
		- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174733926.png)
		- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174733978.png)
	- SOLUTION SUMMARY:
		- [LawrenceTechTips answer to my question - YouTube clip](https://youtube.com/clip/UgkxoJhZaSWuA89uWk8NBZqkMjexvh31yF5N?si=g0mqJ534weA0tIe6)
		- Enable AHCI instead of RAID to see the MBR-formatted partition on SSD, reformat to GPT
### Installing Bootable TrueNAS to SSD from USB
- [Using the TrueNAS Installer Console Setup](https://www.truenas.com/docs/scale/gettingstarted/install/installingscale/#using-the-truenas-installer-console-setup)

- Console Setup:
	- `Spacebar` to select the drive, then `Enter`/ok
		- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174734023.png)
	- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174734064.png)
	- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174734107.png)
	- I had enough space to do this
		- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174734159.png)
# TrueNAS Configuration and Setup
## Links & Resources
- [Configuration Instructions |](https://www.truenas.com/docs/scale/gettingstarted/configure/) 
	- [Logging Into SCALE the First Time |](https://www.truenas.com/docs/scale/gettingstarted/configure/firsttimelogin/) 
	- [Configuring SCALE Using the UI |](https://www.truenas.com/docs/scale/gettingstarted/configure/uiconfigurationscale/) 
	- [Setting Up Storage |](https://www.truenas.com/docs/scale/gettingstarted/configure/setupstoragescale/) 
## Booting Up TrueNAS
- Went into BIOS and saw TrueNAS-0
	- Made sure it was first in the boot sequence
	- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174734201.png)
- Restart PC
- Enter TrueNAS
	- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174734245.png)
## Initial Login for TrueNAS & Networking
- [Logging Into SCALE the First Time |](https://www.truenas.com/docs/scale/gettingstarted/configure/firsttimelogin/) - resources here
- You can watch the monitor till you get the local address for Web UI
- "Web interface could not be accessed"
	- https://www.truenas.com/docs/scale/gettingstarted/configure/firsttimelogin/#web-interface-access 
	- This console popped up during the initial terminal screen
		- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174734296.png)
	- `When powering on a TrueNAS system, the system attempts to connect to a DHCP server from all live interfaces to access the web UI. On networks that support Multicast Domain Name Services (mDNS), the system can use a host name and domain to access the TrueNAS web interface. By default, TrueNAS uses the host name and domain **truenas.local**. To change the host name and domain in the web interface, go to **Network** and click **Settings** on the **Global Configuration** widget.`
		- I don't think mDNS is an options for my current router, so I might have to reconfigure the router to make this work.
	- Make sure we have connection on local network
		- `ping truenas.local`
		- `ip addr show`
	- Wifi on TrueNAS scale?
		- [Wi-Fi on TrueNAS Scale? | TrueNAS Community](https://www.truenas.com/community/threads/wi-fi-on-truenas-scale.107057/) 
		- #cyberMeme If I had a dollar for the amount of gatekeeping, maiden-less, grumpy, outdated, impatient IT professionals then I would be a millionaire
		- No wifi out of the box.  This would require an additional AP with ethernet or install [Proxmox](https://www.proxmox.com/en/) and make TrueNAS a VM in it
		- Solution? - [TrueNAS Scale with WiFi – Clint's Blog](https://clint.id.au/?p=2958#:~:text=In%20the%20web%20interface%20go,Init%2FShutdown%20Scripts%20%3E%20Add.&text=On%20the%20next%20reboot%20it,address%20from%20the%20DHCP%20server.) 
			- Run `lspci` in TrueNAS command line to see if TrueNAS sees wireless adapter
			- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174734382.png)
			- ...actually...no. Above article probably works, but I can just use ethernet somehow
	- Solution: Plug in ethernet or implement bridged connection to look like eternet
- Web interface showed up!
	- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174734432.png)
- Accessing the web interface 
	- Use the local IP that it displays or use the domain it assigned like `truenas.local`
	- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174734479.png)
## Auto Turn On TrueNAS When Powered
- [SOLVED - Automatically turn on and shutdown | TrueNAS Community](https://www.truenas.com/community/threads/automatically-turn-on-and-shutdown.95459/) 
	- Set up Wake on LAN with hardware
	- Use clocked power switch
## Network Settings
https://www.truenas.com/docs/scale/gettingstarted/configure/uiconfigurationscale/#setting-up-networking
- My TrueNAS is accessed via `truenas.local` and I have my router set as the default gateway and nameserver
	- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174734512.png)
## Configure Groups and Users
[Setting Up Users and Groups |](https://www.truenas.com/docs/core/coretutorials/settingupusersandgroups/)

- Create group for regular home users
	- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174734552.png)
	- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174734581.png)
- Create user
	- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174734619.png)
	- Create user under Primary group that you just created
		- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174734654.png)
		- Directories and permissions
			- I just didn't select a directory and used "Create home directory"
			- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174734687.png)
## Setting Up Storage
[Setting Up Storage |](https://www.truenas.com/docs/scale/gettingstarted/configure/setupstoragescale/) - TrueNAS docs
### My Storage Strategy
- For now
	- Start out with one 12 TB HDD in "Stripe" storage mode
		- `While a single-disk pool is technically allowed, it is not recommended.`
		- This is not ideal, but I don't have money to throw around right now
	- Back storage up to cloud via S3, Backblaze, etc
	- Back up boot drive somehow
- Later
	- Add another drive for RAID and redundancy using mirror layout
- (AND/OR) Later
	- Have 3 total drives using RaidZ1 layout
### TrueNAS UI Storage Pool Configuration
- Plugging in my HDD
	- Plugged in the SATA connectors while the computer is on
	- Oops...guess that's a bad idea - [Can I plug in a hard drive while the computer is on? - Quora](https://www.quora.com/Can-I-plug-in-a-hard-drive-while-the-computer-is-on#:~:text=Technically%2C%20it%20is%20possible%20to,surges%2C%20or%20other%20electrical%20issues.) (Yes, but maybe don't)
		- [hard drive - Can I connect and disconnect a SATA harddrive while my computer is running? - Super User](https://superuser.com/questions/221066/can-i-connect-and-disconnect-a-sata-harddrive-while-my-computer-is-running) 
	- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174734722.png)

- Storage Tab
	- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174734763.png)
- Name the pool based on who will access it, what will be stored in it, or its purpose.
	- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174734805.png)
- Use a "stripe" layout since we have only 1 drive
	- Use mirror if you have at least 2 and then RaidZ1 and so on if you have 3+ HDDs
	- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174734845.png)
- I don't need log, spare, cache, etc.
- Review and Create 😄
	- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324174734882.png)
- Errors!
	- I got an error `error fsyncing/closing/dev/sda: input/output error`
	- Hard to tell if this is from losing power during the drive encryption job or the fact that it's encrypted
	- Trying to fix hard drive, but keep getting error to convert to GPT 
	- Found it used "Parted Magic" from Medicat USB:
		- ![](_attachments/Turning%20Old%20PC%20into%20NAS%20in%202024/IMG-20240324220055173.png)
	- Wipe drive and convert to GPT when locked by ATA
		- [Cannot Unlock ATA Security Locked Hard Drive Locked During Secure Erase - Super User](https://superuser.com/questions/1478206/cannot-unlock-ata-security-locked-hard-drive-locked-during-secure-erase) 
		- [Secure Erase - Powerful, easy to use, and inexpensive.](https://partedmagic.com/secure-erase/) 
		- [Parted Magic Secure Erase - Sufficient to wipe a standard HDD? : r/sysadmin](https://www.reddit.com/r/sysadmin/comments/j18b1s/parted_magic_secure_erase_sufficient_to_wipe_a/) 
		- 

