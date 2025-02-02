---
permalink:
aliases: [Obsidian Git Plugin]
tags: []
publish: true
date created: Friday, April 26th 2024, 9:42 pm
date modified: Sunday, February 2nd 2025, 11:55 am
---

# Links

- [Tips-and-Tricks - Git Documentation - Obsidian Publish](https://publish.obsidian.md/git-doc/Tips-and-Tricks) 
- [Start here - Git Documentation - Obsidian Publish](https://publish.obsidian.md/git-doc/Start+here) 
- [[Guide] Using Git to sync your Obsidian vault on Android devices - Share & showcase - Obsidian Forum](https://forum.obsidian.md/t/guide-using-git-to-sync-your-obsidian-vault-on-android-devices/41887)

# Disable Git on Certain Clients

- Settings > Obsidian Git > "Advanced" > "Disable on this device"

# What is Backup?

- Merely a combination of the stage, commit, pull, and push steps 🙂

# Excluding Sensitive Data from Repo

It's easy to use the `.gitignore` file to ignore putting files into the repo. However, if the file was already in the repo before you added the sensitive data, then you will need to remove it first.

## Removing Files from Repo

- Links
  - https://stackoverflow.com/questions/2047465/how-do-i-delete-a-file-from-a-git-repository
  - https://docs.github.com/en/repositories/working-with-files/managing-files/deleting-files-in-a-repository

- Using CLI
  - `git rm --cached file.txt`

- Using GitHub
  - Browse to the file or directory and delete it 
  - https://docs.github.com/en/repositories/working-with-files/managing-files/deleting-files-in-a-repository#deleting-a-directory
  - Make sure to save a version of the files if you need to. I'm not sure this option retains the data locally or tries to delete it when pulling from the repo.

  