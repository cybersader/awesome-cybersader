---
aliases:
  - File Explorer Home Not Loading
tags: 
publish: true
date created: Monday, April 29th 2024, 10:10 pm
date modified: Monday, April 29th 2024, 10:14 pm
---

- I tried to delete anything in Obsidian and it would freeze
- I thought Obsidian was broke till I opened explorer and the Home folder froze
- I reset the computer which fixed it temporarily, then it came back

- I Ultimately ran commands from here - [Use the System File Checker tool to repair missing or corrupted system files - Microsoft Support](https://support.microsoft.com/en-us/topic/use-the-system-file-checker-tool-to-repair-missing-or-corrupted-system-files-79aa86cb-ca52-166a-92a3-966e85d4094e) 
	- I ran `sfc /scannow` which didn't fix it
	- However, I then ran `DISM.exe /Online /Cleanup-image /Restorehealth` which seems to have fixed it for the time being