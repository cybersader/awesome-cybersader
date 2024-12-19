---
permalink:
aliases: [Obsidian Wiki Drop]
tags: []
publish: true
date created: Friday, April 26th 2024, 11:33 am
date modified: Sunday, December 15th 2024, 11:44 am
---

%% Begin Waypoint %%
- **[[Microsoft Graph API in Obsidian]]**

%% End Waypoint %%

- [ ] Fix issue with using Obsidian Publish between two devices and having to republish the whole vault everytime 🔺 ➕ 2024-11-03
- [ ] Linter that can be given conditions, bulk handling, or ability to ask user about certain cases before linting the file? ➕ 2024-11-06
- [ ] Vault crawler tool that uses AI to find connections in the vault - kind of like Omnisearch + File Organizer 2000 ➕ 2024-11-07
- [ ] Short URLs for Obsidian Publish ➕ 2024-11-10

- https://dentropy.github.io/1f1f914c-8e6e-48b7-9068-bc7b290b6b64/
- Per device obsidian customizing
	- obsidian per device
	- https://forum.obsidian.md/t/separate-settings-for-multiple-mobile-devices/20607
	- https://www.reddit.com/r/ObsidianMD/comments/zwvn1v/method_for_separating_settings_between_desktop/
	- https://forum.obsidian.md/t/how-to-have-different-themes-on-seperate-devices/73334
- Per client
	- ovveride config folder - stored locally so network shares and things like that don't matter
- Define users somehow with a Templater user script?  This may be possible

- Live sync in part of note, but then use something like Git or Syncthing in other parts
	- Atomic and granular power over syncing and collaboration
- Wikilink vs Markdown Link Use Cases

# Plugins to look at 

- [Latticework: Unifying annotation and freeform text editing for augmented sensemaking](https://www.matthewsiu.com/Latticework)
- Semantic Canvas
- Telegraph Publish
- Folders to Graph
- Tags Routes
- Graph Banner
- InfraNodus
- Textgrams
- Symlink Creator (symlinks in general)
- Immich
- Abbrlink
- Link Formatter
- Link Range
- Tabout
- Grappling Hook
- Hover Editor
- Ordered List Style
- Copy Block Link
- Links
- Link Favicons
- Note Linker
- Better File Link
- Link Converter
- Influx
- Topic Linking
- Wikilink to MDLinks
- Link Exploder
- Backlink Cache
- Update Relative Links
- At People
- Auto Embed
- GitHub Link
- Import Attachments++
- External Links
- Canvas Explorer
- Block Link Plus
- Alias Picker
- 

# Custom Plugins

[Obsidian Plugins and Ideas for Contributions](../Contributable%20Obsidian%20Wiki/Obsidian%20Plugins%20and%20Ideas%20for%20Contributions/Obsidian%20Plugins%20and%20Ideas%20for%20Contributions.md)

- Whitespace cleaning on pasting with hotkeys
	- [zlovatt/obsidian-trim-whitespace: Trims unnecessary whitespace from your Obsidian documents.](https://github.com/zlovatt/obsidian-trim-whitespace)
	- Trim blank spaces please
- Plugin to save and use regex transformations on selections or on page and bind to a hotkey
- Hallow or Ascension plugin
- Plugin that can use parent folders to add/prepend (even w/regex) the parent folders to the title of a note to create additional aliases
- Plugin to automatically remove tokens and clean URLs
- Plugin that makes pretty permalinks based on wiki page name and duplicates in the vault
- Plugin that uses AI to ask you about your day and smartly write and log about it for you in a daily note either through voice or text chat
- Plugin to fetch titles and fix highlighted links
- AI-based note enricher 
	- adds bullet points in a code block at bottom of note with AI-generated summaries and takeaways in text along with ontologically distant or adjacent ideas and special terms like with embeddings to make it easier to find with search and embeddings
	- Enrich notes with text at bottom to help with finding with search
	- Kind of inspired by my old "rexplorer" idea
- Modify refactor plugin to have 
	- option for copying md to README.md for github applicability
	- Ability to add sub folders or pages from within note like Notion
- Youtube links
	- [Embed YouTube Videos in Notes & Link Timestamps to Embedded Video - Feature archive - Obsidian Forum](https://forum.obsidian.md/t/embed-youtube-videos-in-notes-link-timestamps-to-embedded-video/36779/4) 
- Look for plugins that generate ascii, markdown, HTML with styles, and plaintext
	- Timeline plugin like this?
- Auto headings and bullets?
- Plugin to automatically put bullet point when clicking directly below a bullet list
- Plugin to use regex replacements with pasting

# Ideas

- Make extension for usage in Github.dev for helping do markdown without code in innovative and safe ways
  - If this doesn't work then look at how other in-the-browser code editors are safe and if they could somehow be implemented
- Obsidian GitHub action for running code like a vault would
- StackEdit with GitHub as alternative to Github.dev?
- Linting for filenames and folders to make sure that they work on Windows (No ":" and other characters)
- [ ] Plugin or pull request to current plugin to clean youtube and amazon links of cookie and reference code stuff ➕ 2024-11-03 
- [ ] Add saving current workspace layout to custom save ⏫ ➕ 2024-11-03
- [ ] Smarter changelog plugin ⏫ ➕ 2024-11-04

# Workflow Examples

- [My Project Management Workflow; An In-Depth Explanation - Share & showcase - Obsidian Forum](https://forum.obsidian.md/t/my-project-management-workflow-an-in-depth-explanation/82508)
- 

# Obsidian in the Web?

- https://www.reddit.com/r/ObsidianMD/comments/10sj378/web_version_of_obsidian/
- https://github.com/sytone/obsidian-remote
- https://vscode.dev/
- https://github.dev
- https://neverinstall.com/

# Obsidian Conflicts and Syncing on Network Share?

- [📁 09 - My Obsidian Stack/Syncing Obsidian/Syncing Obsidian.md](/📁 09 - My Obsidian Stack/Syncing Obsidian/Syncing Obsidian.md)

- Somehow use a WebDav client and have the vault stored in cloud

# Misc

- [ ] BUG with deleting files taking a long time 🔺 ➕ 2024-04-29
- Have AI generate smart permalinks for pages
	- [Permalinks - Publish and unpublish notes - Obsidian Help](https://help.obsidian.md/Obsidian+Publish/Publish+and+unpublish+notes#Permalinks)
- Color gradient based on how recently visited a page/folder was
- Way to upload videos to YouTube when pasted as unlinked to YouTube account?
- [ ] Decide on strategy for connecting, linking, backlinks - helps with pages that could be in two places ⏫ ➕ 2024-04-26
- [ ] Github style readme with badges implementation for Obsidian pages or properties? ➕ 2024-04-26
- [ ] Obsidian page templates when new pages are opened? ➕ 2024-04-26
- [ ] Automatically go to image size with pasting an image to choose size immediately without having to click ➕ 2024-04-27
- [ ] Reimplement last modified time check with Linter or another plugin (that actually works with Obsidian Publish) to use hashes of content to update even when hitting Ctrl S or linting 🔽 ➕ 2024-04-28
- [ ] Auto folder note title name by selecting text to turn into folder note - [File Organizer 2000](../Auto%20-%20Tagging,%20Linking,%20Dropzones%20&%20Organizers/File%20Organizer%202000/File%20Organizer%202000.md) 🔽 ➕ 2024-04-28
- [ ] Changelog page that can work like dataview or summarize your past work based on collection of pages (some query) - "Study was done this week on __" ➕ 2024-04-28
- [ ] Obsidian Plugin that uses an LLM funnel or other LLM and AI technology to take recently added to pages (using content hashes?) and summarizes work done in a certain format along with layers of templates.  Then a "firehose" folder is generated with pages of summaries based on schedules ⏬ ➕ 2024-04-29