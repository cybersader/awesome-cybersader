---
aliases: 
tags: 
publish: true
date created: Thursday, April 18th 2024, 9:29 pm
date modified: Thursday, April 25th 2024, 1:34 pm
---

%% Begin Waypoint %%
- **[[🐛 Known Base Bugs, Issues]]**
- **[[Auto Publish For Obsidian Publish]]**
- **[[Customizing Obsidian Publish]]**
- **[[GitHub Repo Size Limits]]**
- **[[Handling Obsidian Git Conflicts]]**
- [[Obsidian Plugins and Ideas for Contributions]]
- **[[Obsidian Publish Analytics]]**
- **[[Obsidian Publish SEO]]**

%% End Waypoint %%
# My Vision
The platform agnostic Obsidian as a CMS contributable, sync-able, customizable, collaborative, wiki

The dream:
- Edit page -> then it allows you to edit it as it appear right there
- You can also edit by cloning repo into Obsidian or just from within github dev or edit page in GitHub (3 ways to edit or even more!)
- Edit with someone -> allows you to enter an anonymous secure page to edit with someone live
- Show contributors at top of each page with pic and contributors page
- I like Eleventy and Astro.
- I like the idea of Open Authoring with Decap CMS

One big problem I have is conceptualizing and understanding how Obsidian maps to an SSG like Astro. Not to mention, creating a system where Obsidian Communitiy Plugins can integrate into it (example - getting dataview to run from within something like GitHub actions instead of relying on generated markdown) Instead of requiring plugins to generate markdown to work with "Publish," this logic could run along with the JS framwork or SSG or from within something like GitHub actions. The reason I'm mentioning this is that my dream would be a contributable system where people can use GitHub PRs to contribute, git clone the vault and contribute, or even some custom web-based CMS to contribute to the vault. They could contribute from anywhere based on what's convenient and have the funcionality that community plugins provide. The issue with this and anything like Obsidian Publish is that it seems difficult to make a system where Community Plugins can be applied at any layer. FYI - I'm not a developer and surely not a web developer, but I at least have a vision of what would be awesome. One example of this with a CMS would be Decap CMS from Netlify. It took my awhile to find this, but they have an "Open Authoring" [Open Authoring | Decap CMS | Open-Source Content Management System](https://decapcms.org/docs/open-authoring/ "Open Authoring | Decap CMS | Open-Source Content Management System
(https://decapcms.org/docs/open-authoring/)") The hardest layer here would be creating an engine where some community plugins can run on multiple platforms (Github Actions, custom serverless functions, client-side with a custom CMS web-app, etc.)

I want to allow public contributors that don't want to use Obsidian (via GitHub PR or some custom web-based CMS). However, some of the plugins that manage patterns with tags, linting, and attachment management wouldn't run until someone opens it back up in Obsidian.  

Sounds like I'll have to extend the plugins or copy some of the code into custom GitHub actions to run on PRs.
    
I'm just imagining how cool it would be to go to someone's Obsidian website, click "edit page" and immediately edit the content right there, click submit, and then it generates a PR and runs GitHub actions. 
    
That's the goal for me. Then I could have a cool "Contributors" page and show authors at the top of each page.