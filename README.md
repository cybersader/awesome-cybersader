---
permalink: 
aliases: []
tags: []
publish: true
date created: Saturday, March 9th 2024, 8:53 pm
date modified: Monday, February 24th 2025, 10:01 am
title: Welcome to my Cyberbase
cssclasses:
  - list-cards
---

<div style="text-align: center;">
  <h1 style="margin-bottom: 10px;">Cybersader</h1>
  <figure style="display: inline-block; margin: 0;">
    <img src="_attachments/file-20250217124401299.png" alt="Cybersader art" style="width: 400px; max-width: 100%;">
	  <br>
    <figcaption>Welcome to my base in cyberspace</figcaption>
  </figure>
</div>



%%
```js
const pages = dv.pages()
  .sort(f => f.file.mtime, "desc")
  .limit(1);
  
let content;
if (pages.length === 0) {
  content = "No files found.";
} else {
  const lastEdited = pages[0];
  // If your environment has 'moment' loaded, this will work:
  const timeAgo = moment(lastEdited.file.mtime).fromNow();
  // Or you can use a pure JavaScript "time ago" function, if moment is unavailable.
  content = `${timeAgo} – [[${lastEdited.file.name}]]`;
}
`
> Recent Edits
> ${dv.markdownList([content])}
`;
```
%%

%% DATAVIEW_PUBLISHER: start
```dataviewjs
const pages = dv.pages()
  .sort(file => file.file.mtime, "desc")
  .limit(1);

let content;
if (pages.length === 0) {
  content = "No files found.";
} else {
  const lastEdited = pages[0];
  // If 'moment' is available, use format(...) to get a nice timestamp:
  const dateTime = moment(lastEdited.file.mtime).format("ddd, MMM D, YYYY");
  content = `${dateTime} - [[${lastEdited.file.name}]]`;
}

`
> [!note] Latest Edit
> ${content}
`;
```
%%

> [!note] Latest Edit
> Mon, Feb 24, 2025 - [[README]]

%% DATAVIEW_PUBLISHER: end %%

# 🔗 Links

- 📄 [Resume & Portfolio](https://ben.cybersader.com/)
- 🏠 [Home](https://cybersader.com/) 
	- KnowledgeBase, Portfolio, Blog
- <img width="15" alt="" src="https://cdn.svgporn.com/logos/youtube-icon.svg" referrerpolicy="no-referrer"> [YouTube](https://www.youtube.com/@Cybersader)
	- Videos, Playlists
- <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 2160 2160" width="30" height="20"><!-- Based on LinkedIn-InBug-2C.eps from http://press.linkedin.com/Media-Resources?SubjectID=644 --><path fill="#0077b5" d="M 2000.01,0 159.441,0 C 71.4453,0 0,69.77 0,155.62 L 0,2004.141 C 0,2090.1602 71.4453,2160 159.441,2160 l 1840.569,0 c 88.09,0 159.99,-69.8398 159.99,-155.859 L 2160,155.62 C 2160,69.77 2088.1,0 2000.01,0"/><path fill="#ffffff" d="m 480.371,297.38 c 102.422,0 185.664,83.24 185.664,185.71 0,102.57 -83.242,185.82 -185.664,185.82 -102.695,0 -185.703,-83.25 -185.703,-185.82 0,-102.47 83.008,-185.71 185.703,-185.71 m -160.273,512.46 320.507,0 0,1030.789 -320.507,0 0,-1030.789"/><path fill="#ffffff" d="m 841.543,809.84 307.347,0 0,140.78 4.37,0 c 42.78,-81.01 147.31,-166.48 303.17,-166.48 324.18,0 384.06,213.44 384.06,491.09 l 0,565.399 -320,0 0,-501.25 c 0,-119.609 -2.35,-273.359 -166.53,-273.359 -166.71,0 -192.14,130.23 -192.14,264.679 l 0,509.93 -320.277,0 0,-1030.789"/></svg> [LinkedIn](https://www.linkedin.com/in/benjamin-rader-cyber/)
- <svg version="1.1" viewBox="0 0 435.403 189.093" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 60 55" width="30" height="15"><defs><linearGradient id="SoundCloudGradient" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#ff8800" offset="0"/><stop stop-color="#ff3300" offset="1"/></linearGradient></defs><path fill="url(#SoundCloudGradient)" d="m232.77 6.4c-4.043 1.567-5.115 3.171-5.154 6.297v169.97c0.042 3.278 2.586 5.825 5.785 6.145 0.136 0.014 148.45 0 148.45 0 29.577 0 53.551-23.71 53.551-53.29 0-29.581-23.974-53.558-53.551-53.558-7.338 0-14.34 1.488-20.714 4.159-4.26-48.268-44.74-86.131-94.11-86.131-12.082 0-23.858 2.375-34.26 6.4m-19.821 7.494c-1.309 1.08-2.156 2.713-2.18 4.536l-0.013 0.608-2.405 120.04 1.227 22.189 1.192 21.594c0.042 3.197 2.686 5.835 5.9 5.835 3.203 0 5.847-2.638 5.892-5.881v0.05 0.001l2.626-43.788v-0.001l-2.626-120.65c-0.028-2.13-1.189-3.996-2.892-5.026-0.882-0.534-1.906-0.847-3-0.847-1.406 0-2.703 0.506-3.721 1.346m-17.543 9.943c-1.504 0.984-2.519 2.683-2.549 4.612l-0.02 1.043-2.066 109.54c0 0.066 2.086 44.465 2.086 44.465 0.001 0.063 0.009 0.126 0.013 0.188 0.062 1.241 0.533 2.384 1.286 3.285 1.017 1.219 2.54 2.001 4.226 2.001 1.499 0 2.867-0.617 3.867-1.615 0.999-0.995 1.632-2.368 1.66-3.884l0.231-4.395 2.096-40.01-2.327-110.62c-0.032-1.896-1.012-3.572-2.474-4.561-0.878-0.595-1.929-0.943-3.053-0.943-1.092 0-2.114 0.331-2.976 0.896m-20.545 22.263-2.304 92.95 2.305 44.726c0.054 2.849 2.319 5.099 5.154 5.099 2.827 0 5.091-2.25 5.153-5.131v0.037l2.582-44.725-2.582-92.965c-0.062-2.871-2.326-5.126-5.153-5.126-2.835 0-5.1 2.257-5.155 5.135m-17.856-3.528-2.525 96.474 2.527 45.009c0.059 2.643 2.16 4.737 4.782 4.737 2.612 0 4.711-2.094 4.782-4.76v0.032l2.838-45.018-2.838-96.479c-0.071-2.665-2.17-4.752-4.782-4.752-2.622 0-4.723 2.09-4.784 4.757m-17.715-2.533-2.744 98.998 2.747 45.443c0.068 2.433 2.005 4.357 4.41 4.357 2.395 0 4.33-1.923 4.409-4.376l3.092-45.42-3.091-99.004c-0.079-2.46-2.014-4.385-4.41-4.385-2.405 0-4.342 1.928-4.413 4.387m-17.576 3.222c0 0.002-2.963 95.771-2.963 95.771l2.966 45.727c0.075 2.227 1.85 3.987 4.039 3.987 2.177 0 3.95-1.755 4.04-4.005l3.344-45.709-3.344-95.773c-0.089-2.25-1.863-4.012-4.04-4.012-2.189 0-3.964 1.764-4.042 4.014m-17.705 7.608c0 0.005-3.181 88.395-3.181 88.395l3.185 46.204c0.082 2.021 1.693 3.617 3.668 3.617 1.957 0 3.566-1.59 3.665-3.624l3.601-46.197-3.6-88.395c-0.094-2.039-1.705-3.635-3.666-3.635-1.975 0-3.586 1.596-3.672 3.635m7.338 134.58m-24.409-118.42c0 0.002-3.404 71.942-3.404 71.942l3.404 46.492c0.089 1.815 1.538 3.25 3.298 3.25 1.744 0 3.191-1.435 3.295-3.26v0.014l3.851-46.496-3.851-71.945c-0.104-1.829-1.551-3.26-3.295-3.26-1.76 0-3.209 1.434-3.298 3.263m-17.154 27.706-3.625 44.218 3.625 46.496c0.098 1.638 1.355 2.881 2.924 2.881 1.554 0 2.811-1.242 2.925-2.883l4.107-46.494-4.107-44.236c-0.112-1.63-1.37-2.87-2.925-2.87-1.569 0-2.826 1.241-2.924 2.888m-17.015-3.455-3.841 47.669 3.841 46.116c0.107 1.426 1.207 2.505 2.557 2.505 1.332 0 2.429-1.079 2.55-2.505l4.363-46.116-4.363-47.678c-0.121-1.424-1.218-2.501-2.55-2.501-1.35 0-2.45 1.079-2.557 2.51m-16.873 1.267c0 0.002-4.063 46.392-4.063 46.392l4.063 44.699c0.115 1.243 1.033 2.141 2.183 2.141 1.13 0 2.045-0.898 2.179-2.132l4.618-44.708-4.615-46.394c-0.137-1.24-1.052-2.136-2.182-2.136-1.15 0-2.068 0.899-2.183 2.138m-16.732 7.289c0 0.003-4.282 39.099-4.282 39.099l4.282 38.238c0.123 1.023 0.885 1.765 1.81 1.765 0.918 0 1.66-0.723 1.807-1.756l4.872-38.247-4.87-39.101c-0.149-1.039-0.891-1.758-1.809-1.758-0.925 0-1.687 0.74-1.81 1.76m-16.034 14.906-3.183 24.18 3.183 23.76c0.12 1.002 0.838 1.702 1.746 1.702 0.883 0 1.598-0.694 1.743-1.693l3.77-23.777-3.77-24.189c-0.144-0.997-0.86-1.695-1.743-1.695-0.908 0-1.626 0.702-1.746 1.704"/></svg> [Soundcloud](https://soundcloud.com/cybersader)
	- Music
- 📅 [Book a Meeting](https://cal.com/cybersader)
- [Notion](https://notion.cybersader.com/) 
	- Old notion pages (till Oct 2024)
- [Blog](https://blog.cybersader.com/) 
	- Tutorials and random stuff (updating workflow soon here)

# 📊 Cyberbase Activity

%% DATAVIEW_PUBLISHER: start
```dataview
TABLE dateformat(file.mtime, "ccc - f") AS "Last modified" FROM "" SORT file.mtime DESC LIMIT 10
```
%%

| File                                                                                                                                     | Last modified             |
| ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| [[README.md\|README]]                                                                                                                    | Mon - 2/24/2025, 9:54 AM  |
| [[📅 Changelog/📅 Changelog.md\|📅 Changelog]]                                                                                           | Mon - 2/24/2025, 9:50 AM  |
| [[📁 51 - Cyberbase/Static Website Services for Obsidian/Static Website Services for Obsidian.md\|Static Website Services for Obsidian]] | Mon - 2/24/2025, 9:41 AM  |
| [[📁 51 - Cyberbase/📁 51 - Cyberbase.md\|📁 51 - Cyberbase]]                                                                            | Mon - 2/24/2025, 8:49 AM  |
| [[📁 51 - Cyberbase/Obsidian Roadmaps/Dataview and Chronos Roadmap/Dataview and Chronos Roadmap.md\|Dataview and Chronos Roadmap]]       | Sun - 2/23/2025, 9:28 PM  |
| [[📁 51 - Cyberbase/Obsidian Roadmaps/Obsidian Roadmaps.md\|Obsidian Roadmaps]]                                                          | Sun - 2/23/2025, 7:41 PM  |
| [[📁 51 - Cyberbase/Obsidian Roadmaps/Dataview & Mermaid Roadmaps/Dataview & Mermaid Roadmaps.md\|Dataview & Mermaid Roadmaps]]          | Sun - 2/23/2025, 3:51 PM  |
| [[🕸️ UNSTRUCTURED/RSS/RSS.md\|RSS]]                                                                                                     | Sun - 2/23/2025, 12:59 PM |
| [[🕸️ UNSTRUCTURED/🕸️ UNSTRUCTURED.md\|🕸️ UNSTRUCTURED]]                                                                               | Sun - 2/23/2025, 12:59 PM |
| [[🕸️ UNSTRUCTURED/Xbox Home Networking/Xbox Home Networking.md\|Xbox Home Networking]]                                                  | Fri - 2/21/2025, 5:08 PM  |

%% DATAVIEW_PUBLISHER: end %%

> [!info]  [📅 Changelog](📅%20Changelog/📅%20Changelog.md) - view more recent activity here

## GitHub Stats

<a href="https://github.com/cybersader/cyberbase">
	<img width=500 src="https://github-readme-stats.vercel.app/api/pin/?username=cybersader&repo=cyberbase&show_icons=true&theme=github_dark"/>
</a>

![Cybersader's GitHub stats | 500](https://github-readme-stats.vercel.app/api?username=cybersader&show_icons=true&theme=github_dark)

### My Activity (1 Year)

<img width=500 src="https://ghchart.rshah.org/cybersader" alt="cybersader's Github chart" />

## Time Spent in Base

<a href="https://wakatime.com/badge/github/cybersader/awesome-cybersader"><img width=200 src="https://wakatime.com/badge/github/cybersader/awesome-cybersader.svg?style=for-the-badge" alt="wakatime"></a>

![Cybersader Wakatime Stats | 500](https://github-readme-stats.vercel.app/api/wakatime?username=cybersader)

# 📚 About | The Wiki

My public and contributable base/wiki for cybersecurity, cyber resilience, and cyber-related topics. Utilizes Notion, Obsidian, and Github to sync content.  For now this is my "digital garden", "second brain", and fortress of the cybersader.

> A beacon for the assembly and dissemination of cyber wisdom, this platform stands as a formidable citadel, a testament to my dedication as a Cybersader, committed to enriching the collective intellect. Initially serving as a crucible for my own insights, it is adorned with the digital ramparts and moats designed to safeguard knowledge. Yet, its ambition extends far beyond, aspiring to evolve into a dynamic, contributory nexus for the cyber-savvy and the intellectually studious. This endeavor is the essence of social knowledge curation—a concept pioneered by Wikipedia, yet here, under the banner of the Cybersader, I seek to refine and reimagine its potential. My vision is to build not just a platform, but a fortress of wisdom, more intuitive in its use and replicable, allowing others to establish resilient bastions of cyber knowledge across the realm. Here, every contribution is forged in fire, every shared insight a shield to the industry, paving the way for an unprecedented expansion of cyber knowledge landscapes, under the watchful eye of the Cybersader.

# ❤️‍🔥 Support Me or Say Thanks

If you enjoy my work or find value from it, then you can support me below by sharing your thoughts or a small gift.

- 💙 [Share your thoughts! - Write something](https://senja.io/p/cybersader/r/5RzvRy)



<a href="https://www.buymeacoffee.com/cybersader"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=cybersader&button_colour=FFDD00&font_colour=000000&font_family=Inter&outline_colour=000000&coffee_colour=ffffff" width="80%" /></a>