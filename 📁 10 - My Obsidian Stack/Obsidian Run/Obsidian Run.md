---
aliases: 
tags: 
publish: true
date created: Thursday, April 25th 2024, 9:32 pm
date modified: Saturday, October 26th 2024, 10:50 pm
---

[Obsidian Plugins and Ideas for Contributions](../../📁%2051%20-%20Cyberbase/Obsidian%20Plugins%20and%20Ideas%20for%20Contributions/Obsidian%20Plugins%20and%20Ideas%20for%20Contributions.md)
[Obsidian Run Testing](../../📦%20VAULT%20SANDBOX%20TESTING/Obsidian%20Run%20Testing.md)

>[!info] Awesome plugin from Yomaru Hananoshika

This plugin is an abstraction that can be used to generate markdown potentially for any rendering plugin? -- maybe

- [ ] Figure out how to get run to work on schedule or when linting ➕ 2024-04-26

# Turning Plugins into Markdown For Obsidian Publish

- Install the plugin "Obsidian Run" and the plugin "Custom Save"
- Activate both plugins
- To make sure it doesn't break other plugins, I instead set the "Save file" back to Ctrl + S and changed Custom Save to use Ctrl + Alt + S
- You only need \%\% run start 3+4 \%\%
- 

# Running Dataview Queries to Generate Markdown for Obsidian Publish

- [Clarifying Question: Does this support DQL? · Issue #21 · HananoshikaYomaru/obsidian-run](https://github.com/HananoshikaYomaru/obsidian-run/issues/21) 

# Example: For Tasks Query 

Is there a way to use "Run" to generate markdown from a "Tasks" query like dataview or no? If you have a workaround to generate markdown or HTML from this, I'm all ears.

---
Dev:

Currently no, I didn't implement a tasks helper. I only implement `dv` helper. you can auto generate Dataview to markdown like this

```js
const query = `
TABLE dateformat(file.mtime, "dd.MM.yyyy - HH:mm") AS "Last modified" 
FROM !"node_modules"  
SORT file.mtime DESC LIMIT 100`

return dv.tryQueryMarkdown(query)
```

---

Me:

Is there a tool I could use to rerun the JS? I'm not sure how to approach getting this to run on some condition (after every save, on a schedule, etc)?