---
aliases:
  - Scheduled TrueNAS Power
  - Scheduled Storj Backups
  - TrueNAS Scheduled Apps Downtime
  - Scheduled Shutoff
  - TrueNAS Scale Power Saving
tags:
  - HomeLab
  - home/server
  - home/lab
  - home/server/power_saving
publish: true
date created: Sunday, June 16th 2024, 9:19 pm
date modified: Saturday, October 26th 2024, 1:56 pm
---

[iX-Storj Overcharging or Overusing Storage](../iX-Storj%20Overcharging%20or%20Overusing%20Storage/iX-Storj%20Overcharging%20or%20Overusing%20Storage.md) - **solution to most issues actually relates to this issue**
[Home Server Power](../Home%20Server%20Power/Home%20Server%20Power.md) 

> [!tldr] Most of the information, I found out, was really due to TrueNAS Scale not having a good backup solution for iX-Storj until the later 24.10 version

# Links

- [Storj | TrueNAS Documentation Hub](https://www.truenas.com/docs/scale/scaletutorials/apps/communityapps/addstorjnode/)
- [Backing Up TrueNAS | TrueNAS Documentation Hub](https://www.truenas.com/docs/scale/gettingstarted/configure/setupbackupscale/#:~:text=Create%20an%20iX%20Storj%20account,Storj%20iX%20provider%20is%20preselected.)
- [Managing Scrub Tasks | TrueNAS Documentation Hub](https://www.truenas.com/docs/scale/scaletutorials/dataprotection/scrubtasksscale/)
- [Adding a Storj Cloud Sync Task | TrueNAS Documentation Hub](https://www.truenas.com/docs/scale/scaletutorials/dataprotection/cloudsynctasks/addstorjcloudsynctask/#setting-up-the-storj-cloud-sync-task)

# Relevant Info & Questions

## TrueNAS Scale Replication Vs. Cloud Sync

- .
- .

## Remote or Time Power On/Off

- [Home Server Power](../Home%20Server%20Power/Home%20Server%20Power.md) 
- [Power On Hosts Out of Band with IPMI and PowerShell - Richard J Green](https://richardjgreen.net/power-on-hosts-out-of-band-ipmi-powershell/)
- [SOLVED - Automatically turn on and shutdown | TrueNAS Community](https://www.truenas.com/community/threads/automatically-turn-on-and-shutdown.95459/)
- 

# Scheduling Backups for iX-Storj with TrueNAS Scale 

> [!summary] The goal is to avoid all of the crazy errors I've been getting when doing backups of my TrueNAS Scale server to IX-Storj.  By turning off apps at night, I may be able to have successful backups.

[TrueNAS Cloud Backups](../TrueNAS%20Cloud%20Backups/TrueNAS%20Cloud%20Backups.md) 

- 