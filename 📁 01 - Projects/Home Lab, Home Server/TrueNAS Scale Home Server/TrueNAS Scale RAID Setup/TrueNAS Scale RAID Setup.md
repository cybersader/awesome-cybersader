---
aliases:
  - Adding Another Drive to TrueNAS Scale
  - Expanding a ZFS Pool in TrueNAS
tags: 
publish: true
date created: Sunday, June 30th 2024, 6:05 pm
date modified: Saturday, August 10th 2024, 6:51 pm
---

I'm finally adding another drive to my home server.

# Links

- [Disks | TrueNAS Documentation Hub](https://www.truenas.com/docs/scale/scaletutorials/storage/disks/)
- VDEV, zpool, ZIL, and L2ARC
	- [Slideshow explaining VDev, zpool, ZIL and L2ARC for noobs! | TrueNAS Community](https://www.truenas.com/community/threads/slideshow-explaining-vdev-zpool-zil-and-l2arc-for-noobs.7775/)
	- 
- Upgrading RAID in TrueNAS Scale
	- [How to upgrade the raid | TrueNAS Community](https://www.truenas.com/community/threads/how-to-upgrade-the-raid.115473/)
	- [Built system with 1 drive, now want to add second drive and set to raid 1 | TrueNAS Community](https://www.truenas.com/community/threads/built-system-with-1-drive-now-want-to-add-second-drive-and-set-to-raid-1.6832/)
	- 
- [(1) TrueNAS: How To Expand A ZFS Pool - YouTube](https://www.youtube.com/watch?v=11bWnvCwTOU)
- [(1) The EASIEST way to Expand Your ZFS Pool in TrueNAS (But is it the Best?) - YouTube](https://www.youtube.com/watch?v=Uzk6Janio0g) 
- SMR vs CMR
	- [(5) CMR vs SMR | LinkedIn](https://www.linkedin.com/pulse/cmr-vssmr-ben-moore/)
	- 

# VDEVs & Disks Explained

- VDEVs have RAID
- VDEVs have drives in them
- They are the logical components to a pool

# Adding a Drive to Current Pool, Upgrading to RAID 1 (Two Drives)

- Just to be clear, I'm not rich and therefore I had to slowly buy drives.  I started with 1 drive - hence RAID 0.  Now I have 2 drives which is why I'm moving to a mirrored setup for basic redundancy.

- ![600](_attachments/TrueNAS%20Scale%20RAID%20Setup/IMG-20240810185119151.png)

- Some people seem to think it's simple to upgrade from RAID 0 (1 drive without redundancy) to RAID 1 (mirrored mode)
	- [Just delete the pool and recrate a new pool with RAID level you want. Export disconnect/delete....](https://www.truenas.com/community/threads/how-to-upgrade-the-raid.115473/)
- 

# Expanding an Existing Pool

- TL;DR - you can't just add one drive to the pool...well actually you kind of can?

- ZFS uses Data VDEVs
	- ![400](_attachments/TrueNAS%20Scale%20RAID%20Setup/IMG-20240810185119221.png)
- VDEVs don't need same size
	- ![400](_attachments/TrueNAS%20Scale%20RAID%20Setup/IMG-20240810185119276.png)
- VDEV does not need to be symmetrical size or drive count
	- ![400](_attachments/TrueNAS%20Scale%20RAID%20Setup/IMG-20240810185119339.png)
- Mirrors
	- You can use this but it's expensive for storage
	- ![400](_attachments/TrueNAS%20Scale%20RAID%20Setup/IMG-20240810185119427.png)
- You can have many pools
	- Datasets are not shared between pools
	- ![400](_attachments/TrueNAS%20Scale%20RAID%20Setup/IMG-20240810185119472.png)
- Losing a VDEV loses the![400](_attachments/TrueNAS%20Scale%20RAID%20Setup/IMG-20240810185119535.png)6857.png)
- 