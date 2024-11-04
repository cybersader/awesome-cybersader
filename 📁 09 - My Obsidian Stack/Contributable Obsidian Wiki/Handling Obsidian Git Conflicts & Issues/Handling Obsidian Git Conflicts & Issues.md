---
aliases: 
tags: 
publish: true
date created: Wednesday, April 10th 2024, 8:27 pm
date modified: Sunday, November 3rd 2024, 8:58 pm
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

## The Feature Request

- **"Enhancement: Conflict Resolution Tools for Multi-Device Synchronization in Obsidian Git"**
- **"Feature Request: Bulk Untracking of Ignored Files and Conflict Handling Commands"**
- **"Improve Multi-Device Sync: Untrack Ignored Files and Resolve Conflicts Efficiently"**

### **Feature Request Description:**

**Problem Statement:**

When working with Obsidian across multiple devices, users often encounter synchronization conflicts after updating the `.gitignore` file or untracking files on one device. These conflicts arise because the untracked or ignored files are still tracked on other devices, leading to merge conflicts during pull operations. Resolving these conflicts manually can be time-consuming and requires Git command-line knowledge, which may not be ideal for all users.

**Proposed Solution:**

Introduce new commands and settings in the Obsidian Git plugin to streamline conflict resolution and synchronization across multiple devices. These features aim to automate the untracking of ignored files, provide options for bulk conflict handling, and integrate "ours" and "theirs" merge strategies within the Obsidian interface.

**Proposed Features:**

1. Multi-Device Conflict Resolution / Multi-Device Compatibility
	- In general, there could be a section in the settings for Obsidian Git or even more specifically under the Advanced section.
	- The point of these settings would be to make it easier to use Obsidian Git across multiple devices for asynchronous work.
2. **Command or Setting: `Git: Untrack Ignored Files`**
    - **Description:** Untracks all files currently tracked by Git that match patterns in the `.gitignore` file, preventing future conflicts when syncing across devices.
    - **Implementation:**
        - Execute the equivalent of:
            
            ```bash
            git ls-files -ci --exclude-standard -z | xargs -0 git rm --cached
            ```
            
        - Present the user with a confirmation dialog listing the files to be untracked.
        - Include warnings about the impact of untracking files.
        - This could potentially be in the form of a setting under the 
3. **Command: `Git: Resolve Conflicts by Untracking Ignored Files`**
    - **Description:** During a merge conflict, this command identifies files causing conflicts that are also listed in `.gitignore` and offers to untrack them in bulk.
    - **Implementation:**
        - Detect conflicting files matching `.gitignore` patterns.
        - Prompt the user: "The following tracked files are now ignored and causing conflicts. Would you like to untrack them?"
        - Untrack selected files upon confirmation.
4. **Command: `Git: Use "Ours" Merge Strategy`**
    - **Description:** Resolves merge conflicts by favoring the local version of files.
    - **Implementation:**
        - Execute:
            
            ```bash
            git merge --strategy-option ours
            ```
            
        - Apply to the current merge conflict.
        - Provide a confirmation dialog explaining the impact.
5. **Command: `Git: Use "Theirs" Merge Strategy with Conflicts`**
    - **Description:** Resolves merge conflicts by favoring the remote version of files.  
    - **Implementation:**
        - Execute:
            
            ```bash
            git merge --strategy-option theirs
            ```
            
        - Apply to the current merge conflict.
        - Provide a confirmation dialog explaining the impact.
6. **Command: `Git: Hard Reset to Remote Branch`**
    - **Description:** Resets the local branch to match the remote branch, discarding local uncommitted changes. Useful when you want to synchronize your local repository with the remote state.
    - **Implementation:**
        - Execute:
            
            ```bash
            git fetch origin
            git reset --hard origin/$(git rev-parse --abbrev-ref HEAD)
            ```
            
        - Include a strong warning about the loss of uncommitted local changes.
        - Require user confirmation before proceeding.
7. **Setting: `Enable Advanced Conflict Resolution Commands`**
    - **Description:** An option in the plugin settings to show or hide advanced, potentially destructive commands (like hard reset or cleaning untracked files).
    - **Implementation:**
        - Default to disabled to prevent accidental misuse.
        - When enabled, the advanced commands become available in the command palette.
8. **Feature: Conflict Resolution Prompt During Pull**
    - **Description:** When a pull operation results in conflicts, the plugin can detect the type of conflicts and suggest appropriate commands to resolve them.
    - **Implementation:**
        - If conflicts are due to untracked ignored files, prompt to run `Git: Resolve Conflicts by Untracking Ignored Files`.
        - If appropriate, offer options to use "ours" or "theirs" strategies.
        - Provide clear explanations of each option's impact.

**Pragmatic Reasons for Implementation:**

- **Improves User Experience:** Simplifies conflict resolution for users who may not be comfortable using the command line, making Obsidian more accessible.
- **Enhances Multi-Device Synchronization:** Facilitates smoother workflow for users who use Obsidian on multiple devices.

**Considerations and Safeguards:**

- **User Confirmation and Warnings:**
    - Commands that can lead to data loss (e.g., hard reset) should include clear warnings and require explicit user confirmation.
- **Non-Destructive Defaults:**
    - Default settings should favor non-destructive actions, with advanced options available for experienced users.

* * *

**Summary:**

This feature request proposes the addition of several commands and settings to the Obsidian Git plugin that would help users handle synchronization conflicts, especially when working across multiple devices. By integrating commands for untracking ignored files, offering merge strategies, and providing conflict resolution prompts, the plugin can greatly enhance its utility and user friendliness.

* * *

**Example Usage in Obsidian:**

- **Untracking Ignored Files:**
    - Press `Ctrl + P` and select `Git: Untrack Ignored Files`.
    - Confirm the list of files to untrack when prompted.
- **Resolving Conflicts During Pull:**
    - When a pull results in conflicts, a prompt appears:
        - "Conflicts detected due to untracked ignored files. Would you like to untrack these files to resolve the conflicts?"
    - Choose to untrack files or select a merge strategy (`Ours` or `Theirs`).

* * *

# Git Merging and Conflicts

- [How to Resolve Merge Conflicts in Git – A Practical Guide with Examples](https://www.freecodecamp.org/news/resolve-merge-conflicts-in-git-a-practical-guide/)

# Links

- [Whats the best way to compare and merge differences from sync issue - Help - Obsidian Forum](https://forum.obsidian.md/t/whats-the-best-way-to-compare-and-merge-differences-from-sync-issue/57736/2)
- [My favorite tools to resolve git merge conflicts | Xoxzo Official Blog](https://blog.xoxzo.com/2019/03/29/my-favorite-tools-to-resolve-git-merge-conflicts/) 
- [The most powerful Git client for Mac and Windows | Tower Git Client](https://www.git-tower.com/windows) 
- [GitKraken Client | Free Git GUI + Terminal | Mac, Windows, Linux](https://www.gitkraken.com/git-client) 
- 