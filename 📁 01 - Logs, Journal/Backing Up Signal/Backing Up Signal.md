---
aliases: 
tags: 
publish: true
date created: Saturday, April 27th 2024, 11:21 am
date modified: Saturday, April 27th 2024, 11:50 am
---

- [Windows BCDR](../../⬇%20INBOX,%20DROPZONE/Windows%20BCDR/Windows%20BCDR.md) 
- [Backups Tech](../../📁%2003%20-%20Curations,%20Stacks/Backups%20Tech/Backups%20Tech.md) 
# Links
- [Backup and Restore Messages – Signal Support](https://support.signal.org/hc/en-us/articles/360007059752-Backup-and-Restore-Messages#desktop_restore)
- [Backing up Signal messages on a PC Desktop? : r/signal](https://www.reddit.com/r/signal/comments/nkitnx/backing_up_signal_messages_on_a_pc_desktop/) - Desktop didn't have an option based on forum discussions - at least in the past nobody had found an obvious solution
- [Signal Backup Rebuild: Dane Kouttron](https://transistor-man.com/restoring_android_signal_from_desktop.html) - for the specific case of rebuilding old Signal messages from desktop Signal file in the Appdata/Roaming folder
	- [bepaald/signalbackup-tools: Tool to work with Signal Backup files.](https://github.com/bepaald/signalbackup-tools) 
# Where is Signal Data Stored on Desktop?
- Data is all stored in User/Appdata/Roaming/Signal
- This data can't be restored onto mobile though without special tools as outlined in the below blogpost.
- [Signal Backup Rebuild: Dane Kouttron](https://transistor-man.com/restoring_android_signal_from_desktop.html) 

> [!info] If you're looking to backup your messages for Signal, the better option is to use a one-way syncing utility from mobile to remote storage - you could use Syncthing, Nextcloud, etc.

#syncthing #file_syncing 
# Setting Up Backups on Mobile
- Go into Chats settings on Signal mobile
	- ![300](_attachments/Backing%20Up%20Signal/IMG-20240427115025745.png)
- Make a folder for Signal Backups
	- ![300](_attachments/Backing%20Up%20Signal/IMG-20240427115025861.png)
	- ![300](_attachments/Backing%20Up%20Signal/IMG-20240427115025921.png)
- 