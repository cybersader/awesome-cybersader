---
aliases:
  - Adding Another Drive to TrueNAS Scale
  - Expanding a ZFS Pool in TrueNAS
tags: 
publish: true
date created: Sunday, June 30th 2024, 6:05 pm
date modified: Saturday, August 10th 2024, 8:08 pm
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

- Going from "Stripe" (no redundancy) to "Mirror" (RAID / redundancy)
	- [Going from Stripe to Mirror, True NAS Scale | TrueNAS Community](https://www.truenas.com/community/threads/going-from-stripe-to-mirror-true-nas-scale.101765/)
	- [SOLVED - Change stripe vdev layout to mirror | TrueNAS Community](https://www.truenas.com/community/threads/change-stripe-vdev-layout-to-mirror.112548/)
	- [Changing a from stripe to mirror in the System Dataset Pool | TrueNAS Community](https://www.truenas.com/community/threads/changing-a-from-stripe-to-mirror-in-the-system-dataset-pool.117444/)
	- [Change storage configuration from striped to mirrored | TrueNAS Community](https://www.truenas.com/community/threads/change-storage-configuration-from-striped-to-mirrored.111544/)
	- [Convert 1 drive stripe to 2 drive mirrored : r/truenas](https://www.reddit.com/r/truenas/comments/pn7vhs/convert_1_drive_stripe_to_2_drive_mirrored/)

# VDEVs & Disks Explained

- VDEVs have drives in them
- They are the logical components to a pool
- You apply RAID to a VDEV

# Adding a Drive to Current Pool, Upgrading to RAID 1 (Two Drives)

- Just to be clear, I'm not rich and therefore I had to slowly buy drives.  I started with 1 drive - hence RAID 0.  Now I have 2 drives which is why I'm moving to a mirrored setup for basic redundancy.

- ![600](_attachments/TrueNAS%20Scale%20RAID%20Setup/IMG-20240810200858070.png)

- Some people seem to think it's simple to upgrade from RAID 0 (1 drive without redundancy) to RAID 1 (mirrored mode)
	- [Just delete the pool and recrate a new pool with RAID level you want. Export disconnect/delete....](https://www.truenas.com/community/threads/how-to-upgrade-the-raid.115473/)
- Can it be easier though?

# Testing "Stripe" to "Mirror" with USB Drives

- Going from "Stripe" (no redundancy) to "Mirror" (RAID / redundancy)
	- [Going from Stripe to Mirror, True NAS Scale | TrueNAS Community](https://www.truenas.com/community/threads/going-from-stripe-to-mirror-true-nas-scale.101765/)
	- [SOLVED - Change stripe vdev layout to mirror | TrueNAS Community](https://www.truenas.com/community/threads/change-stripe-vdev-layout-to-mirror.112548/)
	- [Changing a from stripe to mirror in the System Dataset Pool | TrueNAS Community](https://www.truenas.com/community/threads/changing-a-from-stripe-to-mirror-in-the-system-dataset-pool.117444/)
	- [Change storage configuration from striped to mirrored | TrueNAS Community](https://www.truenas.com/community/threads/change-storage-configuration-from-striped-to-mirrored.111544/)
	- [Convert 1 drive stripe to 2 drive mirrored : r/truenas](https://www.reddit.com/r/truenas/comments/pn7vhs/convert_1_drive_stripe_to_2_drive_mirrored/)

- It looks like the solution to this is called "extending" the pool
	- Go to "Manage Devices."  Notice I have 1 x DISK - 1 wide
		- ![](_attachments/TrueNAS%20Scale%20RAID%20Setup/IMG-20240810200858112.png)
	- Drop into the VDEV
		- ![](_attachments/TrueNAS%20Scale%20RAID%20Setup/IMG-20240810200858162.png)
	- "Extend"
		- ![](_attachments/TrueNAS%20Scale%20RAID%20Setup/IMG-20240810200858208.png)
	- Pick the disk that you want to add on?
		- ![](_attachments/TrueNAS%20Scale%20RAID%20Setup/IMG-20240810200858274.png)

- You may run into "mixed disk capacities" errors
	- Links
		- [Mixing drive sizes in a pool | TrueNAS Community](https://www.truenas.com/community/threads/mixing-drive-sizes-in-a-pool.111999/)
		- [Mixed Disk capacities and strange display of Disks / Status after resilver | TrueNAS Community](https://www.truenas.com/community/threads/mixed-disk-capacities-and-strange-display-of-disks-status-after-resilver.109815/)
		- [Do all the drives have to be the same size in TrueNAS? : r/freenas](https://www.reddit.com/r/freenas/comments/jor672/do_all_the_drives_have_to_be_the_same_size_in/)
		- [TrueNAS Scale incorrectly reporting Mixed Capacity VDEVS | TrueNAS Community](https://www.truenas.com/community/threads/truenas-scale-incorrectly-reporting-mixed-capacity-vdevs.114077/)
		- [Storage Drives of Multiple Sizes? | TrueNAS Community](https://www.truenas.com/community/threads/storage-drives-of-multiple-sizes.85493/)
	- Some conclusions
		- [If you mix drives in the same vdev, the capacity of the vdev will be determined by the smallest drive.](https://www.truenas.com/community/threads/storage-drives-of-multiple-sizes.85493/)
		- 

# Expanding an Existing Pool

- TL;DR - you can't just add one drive to the pool...well actually you kind of can?

- ZFS uses Data VDEVs
	- ![400](_attachments/TrueNAS%20Scale%20RAID%20Setup/IMG-20240810200858360.png)
- VDEVs don't need same size
	- ![400](_attachments/TrueNAS%20Scale%20RAID%20Setup/IMG-20240810200858452.png)
- VDEV does not need to be symmetrical size or drive count
	- ![400](_attachments/TrueNAS%20Scale%20RAID%20Setup/IMG-20240810200858518.png)
- Mirrors
	- You can use this but it's expensive for storage
	- ![400](_attachments/TrueNAS%20Scale%20RAID%20Setup/IMG-20240810200858619.png)
- You can have many pools
	- Datasets are not shared between pools
	- ![400](_attachments/TrueNAS%20Scale%20RAID%20Setup/IMG-20240810200858680.png)
- Losing a VDEV loses the
	- ![400](_attachments/TrueNAS%20Scale%20RAID%20Setup/IMG-20240810200858734.png)