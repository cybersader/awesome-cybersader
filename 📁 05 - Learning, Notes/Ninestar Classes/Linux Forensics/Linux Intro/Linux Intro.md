---
date created: Wednesday, April 10th 2024, 8:32 am
date modified: Wednesday, April 10th 2024, 8:32 am
---

# Why is Linux Everywhere?
- Cloud instances
- Embedded devices ("IoT")
- Android
	- Linux forensics works on mobile too if you get the captures
- ChromeOS
## Attack Patterns
- Lots of smash and grab
- Lots of botnets that use IoT 
# Why is Linux Different?
- No registry - scattered info sources
- Different file system 
	- XFS, ZFS, and BTRFS are all getting popular - not great forensics tools for these
	- Most forensics tools can do the basic EXT
	- metadata zeroed when files deleted
	- Access time updates are intermittent
	- Older filesystems don't have file creation dates
- FIles/data are mostly plaintext
	- String searching is powerful