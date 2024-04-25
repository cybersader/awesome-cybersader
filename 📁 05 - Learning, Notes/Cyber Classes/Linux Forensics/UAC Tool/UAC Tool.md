---
date created: Wednesday, April 10th 2024, 9:52 am
date modified: Wednesday, April 10th 2024, 9:52 am
publish: true
---

# UAC
## Running UAC
- ir_triage - default system collection
- full - user browser and application artifacts
- also grabs ALL file metadata in body file
## Basic Results of UAC
- bodyfile - text file with file metadata
- chkrootkit is usually empty because people haven't installed it for a long time
- hash_executables - hashes images, text files, and anything marked with execution bit 
- you can use `uac.log` to tune UAC for your system
	- there's timestamps between commands
	- you can find where the most time is being taken