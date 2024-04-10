---
date created: Wednesday, April 10th 2024, 8:20 am
date modified: Wednesday, April 10th 2024, 9:37 am
---

> Linux Forensics by Hal Pomeranz

%% Begin Landmark %%
- **[Linux Intro](./Linux%20Intro/Linux%20Intro.md)**
- **[Live Linux Triage](./Live%20Linux%20Triage/Live%20Linux%20Triage.md)**

%% End Landmark %%
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
# Lab 1 - Running UAC
- Simple to run
- Change the yaml to run commands you want
- 