---
aliases: 
tags: 
publish: true
date created: Wednesday, October 30th 2024, 7:49 am
date modified: Monday, November 4th 2024, 1:25 pm
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

- Related links:
	- [Syncing for teams - Obsidian Help](https://help.obsidian.md/Teams/Syncing+for+teams)
	- [Sync your notes across devices - Obsidian Help](https://help.obsidian.md/Getting+started/Sync+your+notes+across+devices)
	- 

- Asynchronous Options:
	- Obsidian Git
- Live Sync Options
	- Obsidian Sync
		- 

## Syncing Workspaces Between Devices 

- Links:
	- [Obsidian Git - tips on how to use it for reliable sync? : r/ObsidianMD](https://www.reddit.com/r/ObsidianMD/comments/18dt1ok/obsidian_git_tips_on_how_to_use_it_for_reliable/)
	- [You can also have separate folders synced across devices by using GIT sparse-checkout approach. On each device you can set what folders it will sync with main repository. Thus, you can keep work related notes updated in your main vault and on your work compputer without sharing personal notes on your work machine. Same approach can be used on smartphones, if you can get GIT working on that device. I sync my phone in my selfhosted cloud solution with Obsidian app.](https://forum.obsidian.md/t/yet-another-obsidian-git-tutorial-desktop-pc-ipad-sync/67531)
	- [Creating a Partial Clone of a Git Repo - Tyler Mercer](https://tylermercer.net/posts/software/partial-clone-git-repo/)
	- [Handling Obsidian on multiple devices? : r/ObsidianMD](https://www.reddit.com/r/ObsidianMD/comments/1ca9758/handling_obsidian_on_multiple_devices/)
	- [Different workspaces per device : r/ObsidianMD](https://www.reddit.com/r/ObsidianMD/comments/x4246k/different_workspaces_per_device/)
	- [Obsidian on multiple devices? : r/ObsidianMD](https://www.reddit.com/r/ObsidianMD/comments/v9ccoo/obsidian_on_multiple_devices/)
- Plugins
	- Workspaces Plus
- Files to not sync
	- Generally, don't sync the workspace and other `.obsidian` folders or files.  You'll get conflicts usually as you try sync at the same time while Obsidian updates those files as they change
- 

## Working On Two Devices at the Same Time?

- Obsidian Sync works for it
	- [Not a problem. Sync just works.](https://www.reddit.com/r/ObsidianMD/comments/18inzz8/curious_about_obsidian_sync_two_devices_open_at/)
- 

## Avoiding and Handling Git Conflicts

- [Handling Obsidian Git Conflicts & Issues](../Obsidian%20Git/Handling%20Obsidian%20Git%20Conflicts%20&%20Issues/Handling%20Obsidian%20Git%20Conflicts%20&%20Issues.md)
- [🐛 Known Base Bugs, Issues](../Contributable%20Obsidian%20Wiki/🐛%20Known%20Base%20Bugs,%20Issues/🐛%20Known%20Base%20Bugs,%20Issues.md)
- [Obsidian Git Setup](../Obsidian%20Git/Obsidian%20Git%20Setup/Obsidian%20Git%20Setup.md)
- [Syncthing Incompatible with Git](../Syncing%20Obsidian/Syncthing%20Incompatible%20with%20Git/Syncthing%20Incompatible%20with%20Git.md)

### Obsidian Git Options

- Merge strategy
- Auto Commit
- Disable on this device
- Shouldn't there be a setting to ask if you want to commit/push?

### Solutions to Git Conflict Issues with 'Obsidian Git" plugin

#### 1) Add some folders and files to gitignore

Add a `.gitignore` file with the following lines:

```
.obsidian/workspace-mobile.json
.obsidian/workspace.json
.obsidian/workspace
.obsidian/plugins/home-tab/data.json
```

To ensure that Git ignores certain files or folders without having to manually remove them from tracking, you can set up a pre-commit hook. This hook will automatically check if any files in `.gitignore` are still tracked and will remove them from tracking if they are. Here's how you can set it up:

- [Gitignore Folder Tracking Removal](📁%2021%20-%20Development/Git/Gitignore%20Folder%20Tracking%20Removal/Gitignore%20Folder%20Tracking%20Removal.md#3%20Untrack%20All%20Files%20Listed%20in%20gitignore)

Once you've ran the commands from above to stop tracking the files in `.gitignore`, then it should work smoothly on other devices when pulling and syncing as well.

#### 2) Use Lazy Loading pl?

**For data.json plugin settings files that need to be synced but cause issues**.

You can try the Lazy load plugin to load the setting long after the vault opens so that Obsidian Git can do its job before breaking with the plugin loading.  

# IAM and User Management?

- obsidian sharing collaboration user control active directory

## SSO and MFA

- Related links:
	- [Account security](https://help.obsidian.md/Teams/Security+considerations+for+teams#Account+security)

# Version Control

- Obsidian Git

# AI Risks?

- Related links:
	- [AI and Your Obsidian Vault — Practical Advice to Protect Your Privacy | by TfTHacker | Obsidian Observer | Medium](https://medium.com/obsidian-observer/ai-and-your-obsidian-vault-practical-advice-to-protect-your-privacy-27a75d28965a)
	- 

# Network and Plugin Risk Reduction

## Firewall Rules for Obsidian

[Endpoint Firewall](../../🕸️%20UNSTRUCTURED/Endpoint%20Firewall/Endpoint%20Firewall.md)

- [Security considerations for teams - Obsidian Help](https://help.obsidian.md/Teams/Security+considerations+for+teams)
- [Security and privacy - Obsidian Help](https://help.obsidian.md/Obsidian+Sync/Security+and+privacy#Managing+access+to+Obsidian+Sync+on+your+network)
- [What domains does Obsidian use? - Help - Obsidian Forum](https://forum.obsidian.md/t/what-domains-does-obsidian-use/75800)
- [Network and access - Connections and Firewall](https://help.obsidian.md/Teams/Security+considerations+for+teams#Network+and+access)
- 

## Obsidian Plugin Security

- [Obsidian Vault Security](../Obsidian%20Vault%20Security/Obsidian%20Vault%20Security.md)
- [Plugin security - Obsidian Help](https://help.obsidian.md/Extending+Obsidian/Plugin+security)
- 
- Firewall should already have a whitelist approach and general network security controls
- Endpoints should have application whitelisting implemented
- Whitelist the Obsidian application to run
	- [Scripting vs Development Risks on Endpoints](../../📁%2004%20-%20Organizational%20Cyber/Scripting%20vs%20Development%20Risks%20on%20Endpoints/Scripting%20vs%20Development%20Risks%20on%20Endpoints.md)
	- [Secure Cyber Environment](../../📁%2004%20-%20Organizational%20Cyber/Secure%20Cyber%20Environment/Secure%20Cyber%20Environment.md)
	- [Securing Python on Workstations](../../📁%2004%20-%20Organizational%20Cyber/Secure%20Cyber%20Environment/Securing%20Python%20on%20Workstations/Securing%20Python%20on%20Workstations.md)
- Whitelist certain URLs from the Obsidian plugin repo so that the vault can install the plugin data from that particular whitelisted repo path
- Do this for each whitelisted and approved plugin
- Have a process for this approval through help desk and/or InfoSec teams

- Related links:
	- [Securing Obsidian - Boxes and Walls](https://ohm.one/securing-obsidian-boxes-and-walls/)
	- [Obsidian Sync being blocked by firewall - Help - Obsidian Forum](https://forum.obsidian.md/t/obsidian-sync-being-blocked-by-firewall/69622)
	- [How can I check if the community plugin is safe? - Help - Obsidian Forum](https://forum.obsidian.md/t/how-can-i-check-if-the-community-plugin-is-safe/15258)
	- [Security of the plugins - Meta - Obsidian Forum](https://forum.obsidian.md/t/security-of-the-plugins/7544/51)
	- [Is Obsidian And The Plugins Secure To Use At Work - Help - Obsidian Forum](https://forum.obsidian.md/t/is-obsidian-and-the-plugins-secure-to-use-at-work/52164)
	- [How do I whitelist a dynamically changing application sync server IP? - Developers: Plugin & API - Obsidian Forum](https://forum.obsidian.md/t/how-do-i-whitelist-a-dynamically-changing-application-sync-server-ip/66967)
	- [Per-plugin connections in Obsidian? : r/ObsidianMD](https://www.reddit.com/r/ObsidianMD/comments/11xd1r9/perplugin_connections_in_obsidian/)
	- [Third-party plugins leverage the Obsidian API](https://help.obsidian.md/Teams/Deploy+Obsidian+across+your+team#Plugins)
	- 

## Application Firewalls

- [Securing Obsidian - Boxes and Walls](https://ohm.one/securing-obsidian-boxes-and-walls/)
	- [Safing Portmaster - Easy Privacy](https://safing.io/) - firewall they recommended

## Whitelisting Per-Plugin with Firewall

- Related links:
	- [Per-plugin connections in Obsidian? : r/ObsidianMD](https://www.reddit.com/r/ObsidianMD/comments/11xd1r9/perplugin_connections_in_obsidian/)
	- [Obsidian Help | GitHub-sourced connections](https://help.obsidian.md/Teams/Security+considerations+for+teams#GitHub-sourced+connections)
- 

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