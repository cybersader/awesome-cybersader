---
aliases:
  - Adding Another Drive to TrueNAS Scale
  - Expanding a ZFS Pool in TrueNAS
tags: 
publish: true
date created: Sunday, June 30th 2024, 6:05 pm
date modified: Sunday, June 30th 2024, 7:51 pm
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
**VDEVs (Virtual Devices)** are like building blocks for your storage pool in TrueNAS Scale. Imagine you're constructing a wall. Each brick is a VDEV, and the entire wall is your storage pool. When you add a new drive, you're essentially adding another brick to that wall.

Here's a simple way to think about it:

1. **RAID 0** is like stacking bricks one after another. It's fast, but if one brick (drive) fails, the whole wall collapses.
    
2. If you want redundancy (protection against a drive failure), you need a different type of RAID setup within your VDEV. Common choices are:
    
    - **RAID 1 (Mirroring)**: Every brick has an identical twin. If one fails, the twin keeps things standing.
    - **RAID 5**: This is like having a special brick that holds the secret recipe to rebuild any lost brick. You need at least three bricks for this.
    - **RAID 6**: Similar to RAID 5 but with an extra secret recipe brick for even more protection. Requires at least four bricks.

In your case, you’re moving from RAID 0 (no redundancy) to something with redundancy. Let’s say you choose RAID 5. When you add a new drive, you'll reorganize your existing and new drives into a RAID 5 setup within the VDEV. This means if one drive fails, the data can be rebuilt using the information from the remaining drives.

**Steps to do this:**

1. **Backup Your Data:** Always start with a backup.
2. **Add the New Drive:** Physically install the new drive in your TrueNAS system.
3. **Reconfigure the Pool:** Use the TrueNAS Scale interface to change your pool setup from RAID 0 to RAID 5 or another redundant option. This might involve some downtime and data migration.

By doing this, you’re adding that extra layer of protection, ensuring your data stays safe even if a drive fails.
# Adding a Drive to Current Pool, Upgrading to RAID 1 (Two Drives)
- ![600](_attachments/TrueNAS%20Scale%20RAID%20Setup/IMG-20240630195146461.png)

- Some people seem to think it's simple to upgrade from RAID 0 (1 drive without redundancy) to RAID 1 (mirrored mode)
	- [Just delete the pool and recrate a new pool with RAID level you want. Export disconnect/delete....](https://www.truenas.com/community/threads/how-to-upgrade-the-raid.115473/)
- 
# Expanding an Existing Pool
- TL;DR - you can't just add one drive to the pool...well actually you kind of can?

- ZFS uses Data VDEVs
	- ![400](_attachments/TrueNAS%20Scale%20RAID%20Setup/IMG-20240630195146526.png)
- VDEVs don't need same size
	- ![400](_attachments/TrueNAS%20Scale%20RAID%20Setup/IMG-20240630195146576.png)
- VDEV does not need to be symmetrical size or drive count
	- ![400](_attachments/TrueNAS%20Scale%20RAID%20Setup/IMG-20240630195146623.png)
- Mirrors
	- You can use this but it's expensive for storage
	- ![400](_attachments/TrueNAS%20Scale%20RAID%20Setup/IMG-20240630195146696.png)
- You can have many pools
	- Datasets are not shared between pools
	- ![400](_attachments/TrueNAS%20Scale%20RAID%20Setup/IMG-20240630195146794.png)
- Losing a VDEV loses the pool
	- ![400](_attachments/TrueNAS%20Scale%20RAID%20Setup/IMG-20240630195146857.png)
- 