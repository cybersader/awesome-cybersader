---
aliases: 
tags: 
publish: true
date created: Friday, May 3rd 2024, 12:59 pm
date modified: Friday, May 3rd 2024, 1:29 pm
---

Here was my desired workflow to avoid having to use Obsidian Sync:
- Obsidian Git in vault to backup and version
- Desktop --- one way ---> mobile sync with Syncthing
	- Allows my mobile device to be in sync with Desktop
- Desktop is in sync with Git so that mobile changes don't cause conflicts 

Issues with workflow:
- If the mobile and desktop client are open at the same time, there's like to be conflicting changes created and this won't be noticed for 15 - 30 minutes
- Syncthing immediately syncs .git files which means that the mobile client never detects changes - git files show nothing is changed

![](_attachments/Syncthing%20Incompatible%20with%20Git/IMG-20240503132924641.png)

> [!failure] In conclusion, this workflow is not ideal and a new workflow will need to be designed to balance operability with Git repo, syncing between clients, control over scheduling, and sync-related conflicts