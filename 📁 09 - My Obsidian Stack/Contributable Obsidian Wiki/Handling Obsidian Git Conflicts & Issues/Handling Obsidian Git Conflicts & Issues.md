---
aliases: 
tags: 
publish: true
date created: Wednesday, April 10th 2024, 8:27 pm
date modified: Sunday, November 3rd 2024, 7:59 pm
---

[Gitignore Folder Tracking Removal](../../../📁%2021%20-%20Development/Git/Gitignore%20Folder%20Tracking%20Removal/Gitignore%20Folder%20Tracking%20Removal.md)

# Feature Requests for Obsidian Git

- Related
	- [[Feature]: newest file feature · Issue #740 · Vinzent03/obsidian-git · GitHub](https://github.com/Vinzent03/obsidian-git/issues/740)
	- [[feature] Make auto commit a per device setting · Issue #789 · Vinzent03/obsidian-git · GitHub](https://github.com/Vinzent03/obsidian-git/issues/789)
	- 

- Conflicts often happen with the workspace.json file
	- You can see how to fix it @ [Obsidian Setup for Corporate](../../Obsidian%20Setup%20for%20Corporate/Obsidian%20Setup%20for%20Corporate.md)
	- Here's the issue:
		- workspace.json is constantly updated by whatever windows are up
		- You go onto a different device and go to sync with the "remote" repo or the one actually in GitHub
		- The problem is that `workspace.json` changes fast even as the merge is happening
- Conflicts that occur after fixing the issue with [Gitignore Folder Tracking Removal](📁%2021%20-%20Development/Git/Gitignore%20Folder%20Tracking%20Removal/Gitignore%20Folder%20Tracking%20Removal.md#3%20Untrack%20All%20Files%20Listed%20in%20gitignore)
	- When you attempted to sync your repository on your other laptop and encountered conflicts, it's because Git detected discrepancies between your local files and the changes from the remote repository. Let's break down why this happened and how you can resolve it efficiently.
- 

# Git Merging and Conflicts

- [How to Resolve Merge Conflicts in Git – A Practical Guide with Examples](https://www.freecodecamp.org/news/resolve-merge-conflicts-in-git-a-practical-guide/)

# Links

- [Whats the best way to compare and merge differences from sync issue - Help - Obsidian Forum](https://forum.obsidian.md/t/whats-the-best-way-to-compare-and-merge-differences-from-sync-issue/57736/2)
- [My favorite tools to resolve git merge conflicts | Xoxzo Official Blog](https://blog.xoxzo.com/2019/03/29/my-favorite-tools-to-resolve-git-merge-conflicts/) 
- [The most powerful Git client for Mac and Windows | Tower Git Client](https://www.git-tower.com/windows) 
- [GitKraken Client | Free Git GUI + Terminal | Mac, Windows, Linux](https://www.gitkraken.com/git-client) 
- 