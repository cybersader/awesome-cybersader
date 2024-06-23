---
aliases: 
tags: 
publish: true
date created: Sunday, June 23rd 2024, 12:57 pm
date modified: Sunday, June 23rd 2024, 1:01 pm
---

# Threat Model
- With GitHub repo workflow
	- Exposed secrets
	- Malicious contributions
- With Obsidian Plugins
	- Malicious community plugins

## GitHub - Hiding Secrets
Some plugins expose secrets in their respective plugin folder under `.obsidian`.  

To account for this, we can do a couple things: 
1) add it to the `.gitignore` to hide it when pushing to the repo, or 
2) ask the maintainer to change how the API token or secret is stored.

