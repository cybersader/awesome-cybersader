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
date modified: Sunday, June 16th 2024, 10:03 pm
---

# Links
- [Storj | TrueNAS Documentation Hub](https://www.truenas.com/docs/scale/scaletutorials/apps/communityapps/addstorjnode/)
- [Backing Up TrueNAS | TrueNAS Documentation Hub](https://www.truenas.com/docs/scale/gettingstarted/configure/setupbackupscale/#:~:text=Create%20an%20iX%20Storj%20account,Storj%20iX%20provider%20is%20preselected.)
- [Managing Scrub Tasks | TrueNAS Documentation Hub](https://www.truenas.com/docs/scale/scaletutorials/dataprotection/scrubtasksscale/)
- [Adding a Storj Cloud Sync Task | TrueNAS Documentation Hub](https://www.truenas.com/docs/scale/scaletutorials/dataprotection/cloudsynctasks/addstorjcloudsynctask/#setting-up-the-storj-cloud-sync-task)
- 
# Scheduling Backups for iX-Storj with TrueNAS Scale 
> [!summary] The goal is to avoid all of the crazy errors I've been getting when doing backups of my TrueNAS Scale server to IX-Storj.  By turning off apps at night, I may be able to have successful backups.

- 