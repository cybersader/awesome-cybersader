---
aliases:
  - File Explorer Home Not Loading
tags: 
publish: true
date created: Monday, April 29th 2024, 10:10 pm
date modified: Tuesday, April 30th 2024, 10:35 am
---

- I tried to delete anything in Obsidian and it would freeze
- I thought Obsidian was broke till I opened explorer and the Home folder froze
- I reset the computer which fixed it temporarily, then it came back

- I Ultimately ran commands from here - [Use the System File Checker tool to repair missing or corrupted system files - Microsoft Support](https://support.microsoft.com/en-us/topic/use-the-system-file-checker-tool-to-repair-missing-or-corrupted-system-files-79aa86cb-ca52-166a-92a3-966e85d4094e) 
	- I ran `sfc /scannow` which didn't fix it
	- However, I then ran `DISM.exe /Online /Cleanup-image /Restorehealth` which seems to have fixed it for the time being
- Still hanging

- Guess I'll try the below solutions
	- [File Explorer Freezes Every Time I Try to Delete a File on Network - Microsoft Community](https://answers.microsoft.com/en-us/windows/forum/all/file-explorer-freezes-every-time-i-try-to-delete-a/95dc1a91-6a28-487a-8741-5569226e9a36) 
	- [File Explorer Freezes Every Time I Try to Delete a File on Network - Microsoft Community](https://answers.microsoft.com/en-us/windows/forum/all/file-explorer-freezes-every-time-i-try-to-delete-a/95dc1a91-6a28-487a-8741-5569226e9a36)
	- [Why is my Home Folder in File Explorer not working - Microsoft Community](https://answers.microsoft.com/en-us/windows/forum/all/why-is-my-home-folder-in-file-explorer-not-working/575a8531-1c74-4042-bff3-3ae3bce5fad4) 
- Attempt #1
	- Paste into Terminal > `Run as Administrator` > `del /F /Q %APPDATA%\Microsoft\Windows\Recent\*`
	- `del /F /Q %APPDATA%\Microsoft\Windows\Recent\AutomaticDestinations\*`
		- ![](_attachments/Obsidian%20Delete%20Hanging/IMG-20240430103554922.png)
		- ![](_attachments/Obsidian%20Delete%20Hanging/IMG-20240430103554956.png)
		- ![](_attachments/Obsidian%20Delete%20Hanging/IMG-20240430103554995.png)
		- ProcessExplorer64 from [Sysinternals](https://learn.microsoft.com/en-us/sysinternals/) 
			- ![](_attachments/Obsidian%20Delete%20Hanging/IMG-20240430103555042.png)
			- ![](_attachments/Obsidian%20Delete%20Hanging/IMG-20240430103555106.png)
			- ![](_attachments/Obsidian%20Delete%20Hanging/IMG-20240430103555159.png)
	- `del /F /Q %APPDATA%\Microsoft\Windows\Recent\CustomDestinations\*`
- Seems to have worked so far
	- ![](_attachments/Obsidian%20Delete%20Hanging/IMG-20240430103555186.png)