---
aliases: 
tags: 
publish: true
date created: Wednesday, April 10th 2024, 8:27 pm
date modified: Monday, November 4th 2024, 11:00 am
---

[Gitignore Folder Tracking Removal](../../../📁%2021%20-%20Development/Git/Gitignore%20Folder%20Tracking%20Removal/Gitignore%20Folder%20Tracking%20Removal.md)
[Obsidian Setup for Corporate](../../Obsidian%20Setup%20for%20Corporate/Obsidian%20Setup%20for%20Corporate.md)
[Obsidian Git Setup](../Obsidian%20Git%20Setup/Obsidian%20Git%20Setup.md)

# Feature Requests & Problems for Obsidian Git

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
- Conflicts that occur after fixing the issue with [Gitignore Folder Tracking Removal](../../../📁%2021%20-%20Development/Git/Gitignore%20Folder%20Tracking%20Removal/Gitignore%20Folder%20Tracking%20Removal.md#3%20Untrack%20All%20Files%20Listed%20in%20gitignore)
	- When you attempted to sync your repository on your other laptop and encountered conflicts, it's because Git detected discrepancies between your local files and the changes from the remote repository. Let's break down why this happened and how you can resolve it efficiently.

## The Feature Request

- **"Enhancement: Conflict Resolution Tools for Multi-Device Synchronization in Obsidian Git"**
- **"Feature Request: Bulk Untracking of Ignored Files and Conflict Handling Commands"**
- **"Improve Multi-Device Sync: Untrack Ignored Files and Resolve Conflicts Efficiently"**

### **Feature Request Content:**

**Problem Statement:**

When using Obsidian with the Git plugin across multiple devices, I often run into synchronization conflicts. These aren't just from changing the `.gitignore` file—which I know isn't super common—but also from things like plugin data changing in the background or editing notes on different devices around the same time. It's a hassle because these conflicts can interrupt my workflow, and resolving them usually means I have to open up a terminal and run complex Git commands (e.g. hard reset, theirs flag, ours flag when merging), which isn't ideal.

I think a lot of these conflicts could be handled more smoothly if the plugin offered some built-in options to resolve them, like favoring "ours" (local) or "theirs" (remote) during merges, or providing ways to untrack files that are causing issues. It would be great if the plugin could help manage these situations without requiring users to dive into Git's command line, especially for those of us who aren't Git experts.

I'm sure some of the conflict handling tools for Git out there have other perspectives on solving this as well.

***

**Related Issues and Obsidian Git docs:**
- [Files in .gitignore aren't ignored](https://publish.obsidian.md/git-doc/Common+issues#Files+in+%60.gitignore%60+aren)
- [Is there a way to `git pull --force` from the mobile app? · Vinzent03/obsidian-git · Discussion #616](https://github.com/Vinzent03/obsidian-git/discussions/616)
- [Should I `.gitignore` the `workspace.json` file? · Vinzent03/obsidian-git · Discussion #709](https://github.com/Vinzent03/obsidian-git/discussions/709)
- [Is it possible to pull with ours/theirs flags? · Vinzent03/obsidian-git · Discussion #514](https://github.com/Vinzent03/obsidian-git/discussions/514) 

* * *

**Proposed Solution:**

The main goal is to improve multi-device support by adding conflict handling options or a workflow UI or modal directly within the Obsidian Git plugin. This way, users wouldn't need to open a terminal to resolve conflicts—they could do it all from within Obsidian.  The goal would be not to clutter the settings, so some of this could be under the Advanced section.  I understand the Obsidian Git functions may work different in the background, so all of the implementations are just to show how it looks when doing them in a CLI.

Here are some ideas for features and settings that could help:

1. **Flexible Conflict Resolution Settings:**
    - Add a section in the plugin settings (maybe under "Advanced") dedicated to multi-device usage. This section could offer options for how the plugin handles conflicts when syncing between devices.
    - This could be a dropdown in the settings like "Multi-Device" or "Conflict Handling" or whatever is best for the UI
2. **Command: `Git: Untrack Ignored Files`**
    - **Description:** A command that untracks all files currently tracked by Git that match patterns in the `.gitignore` file. This helps prevent conflicts when syncing changes across devices, especially if the `.gitignore` has been updated on one device but not yet applied on others. This would emulate the same behavior talked about in the docs -  [Files in .gitignore aren't ignored](https://publish.obsidian.md/git-doc/Common+issues#Files+in+%60.gitignore%60+aren).
    - **Implementation:**
        - The plugin could execute a command like:
            `git ls-files -ci --exclude-standard -z | xargs -0 git rm --cached`
		- I understand Obsidian Git may work in a specific way to get `git` working in the background, but this is the type of command that would be implemented.  Since the exact command might differ across operating systems, the plugin should handle this internally, ensuring compatibility with Windows, macOS, and Linux.
        - Present the user with a confirmation dialog listing the files to be untracked, along with warnings about the impact.
        - Optionally, provide settings to choose whether to:
            - Automate this process during pulls.
            - Do it manually via the command palette.
            - Untrack files in bulk or one at a time.
3. **Feature: Automatic Detection and Resolution of Conflicts Due to Ignored Files**
    - **Description:** When the plugin detects conflicts caused by files that are now ignored (perhaps because the `.gitignore` changed on another device), it could prompt the user with options to resolve the conflict.
    - **Implementation:**
        - The plugin notices when a pull results in conflicts with ignored files.
        - A modal pops up, saying something like:
            "We noticed that some tracked files are now in your `.gitignore` and are causing conflicts. Would you like to untrack these files to resolve the conflicts?"
        - Options in the modal could include:
            - **Bulk Untrack Ignored Files:** Untracks all the conflicting files at once.
            - **Review Files:** Allows the user to see the list of files and choose which ones to untrack.
            - **Edit `.gitignore`:** Opens the `.gitignore` file for editing, in case the user wants to adjust it.
            - Provide a brief explanation or bullet points about each option to help the user decide.
4. **Commands for Merge Strategies with Inclusion/Exclusion Options:**
    - **`Git: Use "Ours" Merge Strategy`**
        - **Description:** Resolves merge conflicts by favoring your local version of files (the "ours" strategy).
        - **Implementation:**
            - Execute something like:
                `git merge --strategy-option ours`
            - Before running, the plugin could offer options to:
                - Apply to all conflicts.
                - Apply only to specific files or folders (with inclusion/exclusion paths), which is helpful if you only want to favor local changes for certain plugins or directories.  This could be implemented with a `+` button under Advanced Obsidian Git settings where you give the paths to them.
            - Provide a confirmation dialog explaining what will happen if need be.
    - **`Git: Use "Theirs" Merge Strategy`**
        - **Description:** Resolves merge conflicts by favoring the remote version of files (the "theirs" strategy).
        - **Implementation:**
            - Execute something like:
                `git merge --strategy-option theirs`
            - Similar to the "ours" command, offer options to include or exclude certain files or folders.  This could be implemented with a `+` button under Advanced Obsidian Git settings where you give the paths to them.
            - Provide a confirmation dialog explaining what will happen if need be.
5. **Command: `Git: Hard Reset to Remote Branch`**
    - **Description:** Resets your local branch to match the remote branch exactly, discarding all local changes—even those that aren't in conflict. This is different from the "ours/theirs" strategies because it replaces your entire local state with the remote state, not just resolving conflicts.
    - **Implementation:**
        - Execute something like:
            `git fetch origin git reset --hard origin/$(git rev-parse --abbrev-ref HEAD)`
        - Before running, show a strong warning that this will discard all local changes, including any uncommitted work.
        - Require the user to confirm before proceeding.
6. **Conflict Resolution Modal with Advanced Options:**
    - **Description:** When conflicts occur, the plugin could present a modal dialog that provides various options for resolving them, similar to tools like GitHub Desktop.
    - **Implementation:**
        - The modal could include:
            - **List of Conflicting Files:** Shows which files are in conflict.
            - **Options to Resolve Each Conflict:**
                - **Use Local Version ("Ours")**
                - **Use Remote Version ("Theirs")**
                - **Manual Merge:** Open the file to manually resolve conflicts.
            - **Bulk Actions:**
                - Apply "ours" or "theirs" strategy to all conflicts.
                - Exclude or include certain files or folders in the bulk action.
            - **Advanced Settings:**
                - Allow users to set default behaviors for future conflicts.
                - Option to enable advanced conflict handling features.
7. **Settings for Conflict Handling Behavior:**
    - **Description:** Provide settings where users can configure how the plugin should handle conflicts by default.
    - **Implementation:**
        - Options could include:
            - **Automatically Untrack Ignored Files:** Enable or disable automatic untracking of ignored files during pulls.
            - **Default Merge Strategy:** Set a default preference for "ours" or "theirs" when conflicts occur.
            - **Exclusions/Inclusions:** Specify files or folders to always exclude or include when applying bulk conflict resolutions.
            - **Enable Advanced Conflict Handling:** A setting to show or hide advanced options and commands, preventing accidental use by less experienced users.
8. **Platform Compatibility Considerations:**
    - **Description:** Ensure that any command implementations are compatible across different operating systems (Windows, macOS, Linux) and their respective command-line interfaces.
    - **Implementation:**
        - Use platform-agnostic methods within the plugin when executing Git commands.
        - For commands that differ between OS's, the plugin should detect the OS and run the appropriate version.
        - For example, the command to untrack ignored files might differ:
            - On Unix-based systems:
                `git ls-files -ci --exclude-standard -z | xargs -0 git rm --cached`
            - On Windows Command Prompt:
                `for /F %f in ('git ls-files -ci --exclude-standard') do git rm --cached "%f"`
            - The plugin would handle these differences internally.

---

**Why This Would Help:**
- **Improves Multi-Device Support:** By providing tools to handle conflicts that commonly occur when working across multiple devices, the plugin would make it much easier to keep notes in sync.
- **User-Friendly:** Users wouldn't need to open a terminal or know complex Git commands to resolve conflicts—they could do it all within Obsidian.
- **Flexible and Customizable:** Advanced users could configure settings to suit their workflow, while less experienced users could rely on sensible defaults and helpful prompts.

---
**Additional Considerations:**

- **Safety Measures:**
    - Any command that could lead to data loss (like hard reset) should have clear warnings and require confirmation.
    - The plugin should provide explanations of what each option does, so users can make informed decisions.
- **Conflict Detection:**
    - The plugin should be able to detect when conflicts are likely to occur (e.g., after a pull that fails due to conflicts) and proactively offer solutions.
- **Mobile Support:**
    - Recognizing that Git setup on mobile devices can be tricky, any improvements that could make syncing on mobile smoother would be appreciated. If implementing these features on mobile isn't feasible due to platform limitations, perhaps provide guidance or alternatives.
- **Plugin Data Conflicts:**
    - Since plugins can change data in the background and cause conflicts, perhaps provide specific options for handling conflicts in the `.obsidian/plugins` directory. For example, always favoring local plugin data or providing an option to exclude certain plugins from synchronization.

---
**Example Usage:**

- **Untracking Ignored Files:**
    - Press `Ctrl + P`, type `Git: Untrack Ignored Files`, and select the command.
    - A dialog appears showing the files that will be untracked, with options to proceed or cancel.
- **Resolving Conflicts During Pull:**
    - After attempting to pull and encountering conflicts, a modal pops up:
        - "Conflicts detected. How would you like to resolve them?"
        - Options:
            - **Use Local Changes ("Ours")**
            - **Use Remote Changes ("Theirs")**
            - **Untrack Ignored Files Causing Conflicts**
            - **Manual Resolution**
            - **Hard Reset to Remote** (with warnings)
- **Setting Default Conflict Handling Behavior:**
    - Go to Obsidian Git plugin settings.
    - Under a new "Multi-Device Sync" section, configure:
        - **Default Conflict Resolution Strategy:** Choose between "Ask Every Time," "Use Ours," "Use Theirs," or "Manual."
        - **Automatically Untrack Ignored Files:** Enable or disable.
        - **Exclude/Include Paths:** Specify any files or folders to exclude from automatic conflict resolution.

---
**Final Thoughts:**

I believe these features would make a significant difference for users who rely on Obsidian across multiple devices. By integrating conflict resolution tools directly into the plugin, it would simplify the merging process and reduce the friction caused by conflicts—especially for those of us who aren't Git wizards.

Let me know if this makes sense or if there's anything I can clarify!

# Git Merging and Conflicts

- [How to Resolve Merge Conflicts in Git – A Practical Guide with Examples](https://www.freecodecamp.org/news/resolve-merge-conflicts-in-git-a-practical-guide/)

# Links

- [Whats the best way to compare and merge differences from sync issue - Help - Obsidian Forum](https://forum.obsidian.md/t/whats-the-best-way-to-compare-and-merge-differences-from-sync-issue/57736/2)
- [My favorite tools to resolve git merge conflicts | Xoxzo Official Blog](https://blog.xoxzo.com/2019/03/29/my-favorite-tools-to-resolve-git-merge-conflicts/) 
- [The most powerful Git client for Mac and Windows | Tower Git Client](https://www.git-tower.com/windows) 
- [GitKraken Client | Free Git GUI + Terminal | Mac, Windows, Linux](https://www.gitkraken.com/git-client) 
- 