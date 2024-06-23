---
aliases: 
tags: 
publish: true
date created: Sunday, June 23rd 2024, 12:57 pm
date modified: Sunday, June 23rd 2024, 2:16 pm
---

# Threat Model
- With GitHub repo workflow
	- Exposed secrets
	- Malicious contributions
- With Obsidian Plugins
	- Malicious community plugins

## Curated Obsidian Plugin Threats
- [A place for Plugin's sensitive data? - Developers: Plugin & API - Obsidian Forum](https://forum.obsidian.md/t/a-place-for-plugins-sensitive-data/18308)
- [{{environment}} - Shell commands documentation - Obsidian Publish](https://publish.obsidian.md/shellcommands/Variables/%7B%7Benvironment%7D%7D)
## GitHub - Hiding Secrets
Some plugins expose secrets in their respective plugin folder under `.obsidian`.  

To account for this, we can do a couple things: 
1) add it to the `.gitignore` to hide it when pushing to the repo, or 
2) ask the maintainer to change how the API token or secret is stored.

### Hiding Specific Data with Gitignore?
- [How to tell git to ignore individual lines, i.e. gitignore for specific lines of code - Stack Overflow](https://stackoverflow.com/questions/16244969/how-to-tell-git-to-ignore-individual-lines-i-e-gitignore-for-specific-lines-of)
- [Store secrets like api key outside of data.json - Developers: Plugin & API - Obsidian Forum](https://forum.obsidian.md/t/store-secrets-like-api-key-outside-of-data-json/56035)
	- `We don’t take feature requests for community plugins here. Plugins can already store secrets in a different location. Please open a feature request on the plugin repository.`

### Example Gitignores
- [Obsidian-Vault-Structure/.gitignore at main · trustedsec/Obsidian-Vault-Structure](https://github.com/trustedsec/Obsidian-Vault-Structure/blob/main/.gitignore)
- 