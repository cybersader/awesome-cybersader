---
aliases: 
tags: 
publish: true
date created: Wednesday, October 30th 2024, 7:49 am
date modified: Wednesday, October 30th 2024, 8:13 am
---

[Organization Documentation & Wikis](../../📁%2004%20-%20Organizational%20Cyber/Organization%20Documentation%20&%20Wikis/Organization%20Documentation%20&%20Wikis.md)
[Obsidian Vault Security](../Obsidian%20Vault%20Security/Obsidian%20Vault%20Security.md)
[Scalable Project Management](../../🕸️%20UNSTRUCTURED/Scalable%20Project%20Management.md)


- [ ] Create guide for Obsidian corporate use 🔺 ➕ 2024-10-30

# Misc Links

- [TrustedSec | Obsidian, Taming a Collective Consciousness](https://trustedsec.com/blog/obsidian-taming-a-collective-consciousness)
- [Obsidian Publish: Authentication for corporate use (Single Sign On) - Feature requests - Obsidian Forum](https://forum.obsidian.md/t/obsidian-publish-authentication-for-corporate-use-single-sign-on/19255)
- [GitHub - brush701/obsidian-multiplayer: Real time collaboration for Obsidian](https://github.com/brush701/obsidian-multiplayer)
- [Syncing for teams - Obsidian Help](https://help.obsidian.md/Teams/Syncing+for+teams)
- [Collaborate on a shared vault - Obsidian Help](https://help.obsidian.md/Obsidian+Sync/Collaborate+on+a+shared+vault)
- [Obsidian Publish: Support individual user authentication and management (subscriber-only access) - Feature requests - Obsidian Forum](https://forum.obsidian.md/t/obsidian-publish-support-individual-user-authentication-and-management-subscriber-only-access/27854/2)
- [Access control in Obsidian : r/ObsidianMD](https://www.reddit.com/r/ObsidianMD/comments/15sp8sw/access_control_in_obsidian/)
- 

# Syncing & Collaboration

[Collaboration in Obsidian](../Contributable%20Obsidian%20Wiki/Collaboration%20in%20Obsidian/Collaboration%20in%20Obsidian.md)
[Syncing Obsidian](../Syncing%20Obsidian/Syncing%20Obsidian.md)

- This is the hardest part of solving the using Obsidian in corporate problem.  Plugins can at least be controlled and whitelisted.  The goal with using Obsidian is to cheat the system by having a really cheap, valuable, extensible, universal system, all with plaintext on the backend for compatibility and flexibility.
- You may be thinking, why not just use git with "[Obsidian Git](../Obsidian%20Git/Obsidian%20Git.md)"?  Yes...that will work most of the time, unless you have plugins that add data right when you open pages or the vault.  Constantly having conflicts and git errors is a chore.
	- [ ] Solve the constant Obsidian Git error issues 🔺 ➕ 2024-10-30

- Asynchronous Options:
	- Obsidian Git
- Live Sync Options
	- Obsidian Sync

# IAM and User Management?

- obsidian sharing collaboration user control active directory

# Version Control

- Obsidian Git

# Obsidian Plugin Security

- [Obsidian Vault Security](../Obsidian%20Vault%20Security/Obsidian%20Vault%20Security.md)
- Firewall should already have a whitelist approach and general network security controls
- Endpoints should have application whitelisting implemented
- Whitelist the Obsidian application to run
	- [Scripting vs Development Risks on Endpoints](../../📁%2004%20-%20Organizational%20Cyber/Scripting%20vs%20Development%20Risks%20on%20Endpoints/Scripting%20vs%20Development%20Risks%20on%20Endpoints.md)
	- [Secure Cyber Environment](../../📁%2004%20-%20Organizational%20Cyber/Secure%20Cyber%20Environment/Secure%20Cyber%20Environment.md)
	- [Securing Python on Workstations](../../📁%2004%20-%20Organizational%20Cyber/Secure%20Cyber%20Environment/Securing%20Python%20on%20Workstations/Securing%20Python%20on%20Workstations.md)
- Whitelist certain URLs from the Obsidian plugin repo so that the vault can install the plugin data from that particular whitelisted repo path
- Do this for each whitelisted and approved plugin
- Have a process for this approval through help desk and/or InfoSec teams

# Plugins

- Plugins from my main cybersader repo are good plugins for the most part

## Useful Plugins for Business

- Plugins for exporting pages in different formats

## Project Management

- Tasks
- Project Management
- Changelog page
- Dataview

## General Vault Layout

- Folder Notes

## Better Vault Functionality

- Omnisearch
- 