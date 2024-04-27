---
aliases: 
tags:
  - decentralized
  - syncthing
  - Backups
  - file_syncing
publish: true
date created: Friday, April 26th 2024, 4:05 pm
date modified: Friday, April 26th 2024, 10:04 pm
---

- [ ] Implement Syncthing for Obsidian Desktop and mobile clients ➕ 2024-04-26

> [!tldr] Syncing an Obsidian vault from desktop to mobile / other desktops. 
> 
> It all depends on the initial "source of truth" for your files to first sync to other destinations/clients. In this case, I set up Syncthing on desktop to sync my files to an obsidian folder on my phone.  

> [!info] [Obsidian Git](https://github.com/denolehov/obsidian-git) does work for this as well. However, I ran into several issues related to git conflicts that were the result of plugins that modify the edit date with a plugin like "[obsidian-linter](https://github.com/platers/obsidian-linter)" or "[update-time-on-edit-obsidian](https://github.com/beaussan/update-time-on-edit-obsidian)"
# Preparing Obsidian on Mobile
1. Download Syncthing from an app store
	1. The Android app is available on [Google Play](https://play.google.com/store/apps/details?id=com.nutomic.syncthingandroid) and [F-Droid](https://f-droid.org/packages/com.nutomic.syncthingandroid/).
2. Choose and/or create a new local folder from "Create new vault" in Obsidian Mobile
	1. ![300](_attachments/Syncthing%20for%20Obsidian%20Notes/IMG-20240426220404992.png)
	2. ![300](_attachments/Syncthing%20for%20Obsidian%20Notes/IMG-20240426220405069.png)
3. .
# Syncthing Desktop Setup
- [Download](https://github.com/Bill-Stewart/SyncthingWindowsSetup/releases/) Syncthing for Desktop (Windows)
	- https://syncthing.net/downloads/ 

> [!example] [Getting Started — Syncthing documentation](https://docs.syncthing.net/intro/getting-started.html)

- Start Syncthing

> [!warning] You'll need firewall rule exceptions (it will likely ask to enable for certain ports). Considerations need to be made in a professional or corporate setting on associated risks.
> 
> [Firewall Setup — Syncthing documentation](https://docs.syncthing.net/users/firewall.html#firewall-setup)

- "Add Remote Device"
	- ![450](_attachments/Syncthing%20for%20Obsidian%20Notes/IMG-20240426220405191.png)

- Select the ID of the associated mobile device (assuming you're on the same LAN)
	- ![](_attachments/Syncthing%20for%20Obsidian%20Notes/IMG-20240426220405322.png)

- If you aren't on the same network, then obtain the ID from mobile Syncthing.  Device ID does not need to be kept secret .[^1]
![300](_attachments/Syncthing%20for%20Obsidian%20Notes/IMG-20240426220405450.png)

- On the mobile device or other client, follow the same process
	- On mobile
		- ![](_attachments/Syncthing%20for%20Obsidian%20Notes/IMG-20240426220405627.png)
	- Clicked button to use camera with QR code
	- On PC, opened up identification
		- ![](_attachments/Syncthing%20for%20Obsidian%20Notes/IMG-20240426220405737.png)

# Syncing Obsidian Vault to Other Clients (PC to Mobile)
- On PC > Syncthing Web UI > "Add Folder"
	- General
		- Name the folder label
		- Use a folder ID that will be used on all cluster devices
		- Copy and paste the folder path of the applicable existing Obsidian vault
		- Ignore the quote I put at the end accidentally
			- ![](_attachments/Syncthing%20for%20Obsidian%20Notes/IMG-20240426220405816.png)
	- Sharing
		- Select clients you want to sync to, add a password if you need to.
	- Advanced
		- [ ] Figure out what advanced sharing options to use with - extended attributes? ➕ 2024-04-26
		- You can begin as "send only" at first, then switch it up once things have been synced just to be safe
		- ![](_attachments/Syncthing%20for%20Obsidian%20Notes/IMG-20240426220405941.png)

- To set up mobile, set up a folder and use the same exact "Folder ID"
	- ![200](_attachments/Syncthing%20for%20Obsidian%20Notes/IMG-20240426220406114.png)
	- ![300](_attachments/Syncthing%20for%20Obsidian%20Notes/IMG-20240426220406211.png)

- Scanning progress
	- ![](_attachments/Syncthing%20for%20Obsidian%20Notes/IMG-20240426220406300.png)
- Syncing Progress
	- ![](_attachments/Syncthing%20for%20Obsidian%20Notes/IMG-20240426220406432.png)
# Issues and Limitations?
- [Obsidian + Syncthing = Killer Combination](https://deepakness.com/blog/obsidian-syncthing/)

> [!quote] I have decided to subscribe to [Obsidian Sync](https://obsidian.md/sync) which is $5 per month (if billed monthly).
> 
> While Obsidian + Syncthing works great, I started to have some issues with it.
> 
> The issue is, both your devices need to be connected to the same wifi network otherwise the changes will not sync immediately. Plus, the Syncthing mobile app keeps always running in the background and drains the battery fast.
> 
> Also, if you make some changes in a note from one device and then again make some changes from the other device without letting Syncthing sync the first change, there will be conflicts in syncing. And, you will have to resolve it manually every single time.
> 
> For my use case, it wasn’t working efficiently and that’s why I decided to get Obsidian Sync.
> 
> However, if all your devices are always connected to the same network, you can keep using the Obsidian and Syncthing setup.

- If it's true that you have to be on the same LAN, then this might be a deal breaker
# Related Links
- [How do you share your files? - User Stories - Syncthing Community Forum](https://forum.syncthing.net/t/how-do-you-share-your-files/2515)
- [Link to share files - Feature - Syncthing Community Forum](https://forum.syncthing.net/t/link-to-share-files/2825/2) 
- [Syncthing | Downloads](https://syncthing.net/downloads/)
- [LBF38/obsidian-syncthing-integration: Obsidian plugin for Syncthing integration](https://github.com/LBF38/obsidian-syncthing-integration)
- [Syncthing vs Obsidian Sync? : r/ObsidianMD](https://www.reddit.com/r/ObsidianMD/comments/xrn9ul/syncthing_vs_obsidian_sync/) 
- [One way sync (backup to remote system) - Support - Syncthing Community Forum](https://forum.syncthing.net/t/one-way-sync-backup-to-remote-system/20341) 
- [How does conflict resolution work? - General - Syncthing Community Forum](https://forum.syncthing.net/t/how-does-conflict-resolution-work/15113) - long story short, conflict resolution with syncing content is HARD
- [A Comparison of Syncthing and Obsidian Sync | by Len_dde | Apr, 2024 | Medium](https://medium.com/@lennart.dde/a-comparison-of-syncthing-and-obsidian-sync-fd0c2376cc04#:~:text=In%20conclusion%2C%20both%20Syncthing%20and,conscious%20users%20with%20technical%20expertise.)
- [How Syncthing provides secure file syncing without sharing your files with a third party - Advanced Web Machinery](https://advancedweb.hu/how-syncthing-provides-secure-file-syncing-without-sharing-your-files-with-a-third-party/) 
- [syncing two already filled folders - Support - Syncthing Community Forum](https://forum.syncthing.net/t/syncing-two-already-filled-folders/21161)
## YouTube Links
- [(39) How to Sync Local Files - YouTube](https://www.youtube.com/watch?v=dBVTedUWbfg)
- [Why We Use Syncthing, The Open Source Private File Syncing Tool instead of NextCloud - YouTube](https://www.youtube.com/watch?v=bNiiJe8NpEw)
- [Syncthing - The Based Way to Sync Your Files - YouTube](https://www.youtube.com/watch?v=Uag8PJaO0N4)
- [Backing Up My Home Server Files - Setting Up Syncthing - YouTube](https://www.youtube.com/watch?v=V4kWJ8JcdtM)
- [(39) Syncthing Made EASY - YouTube](https://www.youtube.com/watch?v=PSx-BkMOPF4)

[^1]: This is like a public key, so it's not bad if other people have it.  Connections have to be mutual to work.