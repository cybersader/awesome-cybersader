---
date created: Saturday, March 30th 2024, 11:40 am
date modified: Saturday, March 30th 2024, 12:52 pm
tags:
  - TrueNAS
  - NAS
  - OpenSourceSoftware
  - HomeLab
---

# Links
- [Immich | TrueNAS Docs](https://www.truenas.com/docs/scale/scaletutorials/apps/communityapps/immich/)
# Immich

> Immich integrates photo and video storage with a web portal and mobile app. It includes features such as libraries, automatic backup, bulk upload, partner sharing, Typesense search, facial recognition, and reverse geocoding.

>TrueNAS SCALE makes installing Immich easy, but you must use the Immich web portal and mobile app to configure accounts and access libraries.
# TrueNAS Immich App Setup
- ![](_attachments/TrueNAS%20Immich%20Setup/IMG-20240330124433935.png)
## Dataset Configuration
> You can allow SCALE to create the datasets Immich requires automatically during app installation. Or before beginning app installation, [create the datasets](https://www.truenas.com/docs/scale/scaletutorials/datasets/datasetsscale/) to use in the **Storage Configuration** section during installation. Immich requires seven datasets: **library**, **pgBackup**, **pgData**, **profile**, **thumbs**, **uploads**, and **video**. You can organize these as one parent with seven child datasets, for example mnt/tank/immich/library, mnt/tank/immich/pgBackup, and so on.

In this case, I'm making an Immich dataset, then 7 child datasets for each of the storage components mentioned in the Immich configuration.

- Add parent dataset under app folders
	- In this case, I have APP_Configs as the parent
	- ![](_attachments/TrueNAS%20Immich%20Setup/IMG-20240330130725907.png)
- 
## Immich Environment Variables
> Before installing the Immich app in SCALE, review their [Environment Variables](https://documentation.immich.app/docs/install/environment-variables) documentation and to see if you want to configure any during installation. You can configure environment variables at any time after deploying the application.


## Immich App Settings
- 
- Allocate GPU resources to Immich if you want
## Note on Updates
- When updates become available, SCALE alerts and provides easy updates.
