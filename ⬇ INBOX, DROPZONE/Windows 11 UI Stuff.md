---
aliases: 
tags: 
date created: Sunday, March 10th 2024, 5:27 pm
date modified: Saturday, April 27th 2024, 11:32 pm
created: Sunday, Mar 10, 2024 05:27 PM
updated: Tuesday, Mar 19, 2024 08:27 PM
publish: true
---

# Getting Rid of "Show more options" and using old Win 10 default
- [Windows 11 right click explorer menu - Show More as Default - Microsoft Community](https://answers.microsoft.com/en-us/windows/forum/all/windows-11-right-click-explorer-menu-show-more-as/ba8dafe4-306a-403b-af0d-10a6d1ca0a9a) - "I cannot stand the new drop down when I right click on a file. Could you please update windows 11 so we can set the show more option as the default?"
	- `reg add HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32 /ve /d "" /f`
	- Open task manager and restart explorer task