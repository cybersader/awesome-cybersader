---
aliases: []
tags: []
publish: true
permalink:
date created: Saturday, February 8th 2025, 6:51 pm
date modified: Tuesday, February 11th 2025, 9:34 pm
---

I fixed up part of the code and did some testing.

The biggest issue I found is that, it turns out, the header-based links are the ones causing the page to scroll down as fast as the dom renders and it only happens some amount after scrolling down the page.

Nevermind, I found the core issue.  The parent mod-header mod-ui class didn't have a margin even though its child did.  I'm guessing that inserting after the parent somehow makes the child freak out.  Not sure how to account for that honestly.  

Anyway, I've sort of moved on from that problem and would like to insert some other things onto the page:

1) **Including note frontmatter/properties:** the hardest thing will be making it so that "properties" or the frontmatter data associated with the note is parsed onto the page. If possible, I can make it so that I have to explicitly say what that frontmatter can be. I'll share some examples of how to do that below.
2) Adding buttons fixed to the side for when the user goes into mobile.  It would be awesome if the buttons are double click.  On the first click, they open up and show the text associated with them.  Their regular form just has the svg for them and they're square.  These would be fixed to the side of `.markdown-preview-sizer markdown-preview-section` .  I could also include a share button that allows mobile users to share the note anywhere or on other platforms.
3) I want to include the same buttons under a section on the page under the div with `.outline-view-outer node-insert-event`. I'll show an example of what the element looks like.  I would have a `.list-item published-section-header` div with the text like "Content" or "Actions".  

I've noted sections below for the above items.

# current publish.js

```js
/* =========================================================================
publish.js – Minimal setInterval approach to insert top links + footer block
========================================================================= */

console.log("[publish.js] loaded");

// A small ID for our repeating check
let insertIntervalId;

/**
* buildGitHubURLs():
*   Build final .md links from current URL path, replacing "+" with "%20".
*/
function buildGitHubURLs() {
  const currentUrlPath = decodeURIComponent(window.location.pathname);
  const relativePath   = currentUrlPath.replace(/^\/|\/$/g, "");

  const githubUser   = "cybersader";
  const githubRepo   = "awesome-cybersader";
  const githubBranch = "main";

  // Convert "+" => "%20"
  const encodedPath = relativePath.replace(/\+/g, "%20");

  const view = `https://github.com/${githubUser}/${githubRepo}/blob/${githubBranch}/${encodedPath}.md`;
  const edit = view.replace("/blob/", "/edit/");
  const raw  = `https://raw.githubusercontent.com/${githubUser}/${githubRepo}/${githubBranch}/${encodedPath}.md`;
  const dev  = `https://github.dev/${githubUser}/${githubRepo}/blob/${githubBranch}/${encodedPath}.md`;
  const download = `https://github.com/${githubUser}/${githubRepo}/archive/refs/heads/${githubBranch}.zip`;

  return { view, edit, raw, dev, download };
}

/**
* insertHeaderLinksIfMissing():
*   - If #header-git-links doesn't exist and .mod-header.mod-ui does, insert.
*/
function insertHeaderLinksIfMissing() {
  const existingHeaderBlock = document.getElementById("header-git-links");
  if (existingHeaderBlock) {
    return; // It's already there
  }

  const headerEl = document.querySelector(".page-header");
  if (!headerEl) {
    return; // Header not rendered yet
  }

  // Build the block
  const { view, edit, raw, download } = buildGitHubURLs();
  const html = `
    <div id="header-git-links" class="header-git-links">
      <a href="${view}"     target="_blank">View Source</a>
      <a href="${edit}"     target="_blank">Edit Page</a>
      <a href="${raw}"      target="_blank">Copy</a>
      <a href="${download}" target="_blank">Download Vault</a>
    </div>
  `;
  headerEl.insertAdjacentHTML("afterend", html);
    // TODO - the above line creates a scrolling issue when using mod-header mod-ui for the selector
    // stll not sure why
  console.log("[GitHub Links] Inserted #header-git-links below .mod-header.");
}

/**
* insertFooterBlockIfMissing():
*   - If #footer-action-block doesn't exist and .mod-footer.mod-ui does, insert
*     an <hr> + "Interact with this page" heading + 4 button-like links.
*/
function insertFooterBlockIfMissing() {
  const existingFooterBlock = document.getElementById("footer-action-block");
  if (existingFooterBlock) {
    return; // Already inserted
  }

  const footerEl = document.querySelector(".mod-footer.mod-ui");
  if (!footerEl) {
    return; // Footer not rendered yet
  }

  // Build the block
  const { edit, raw, download, dev } = buildGitHubURLs();
  const html = `
    <div id="footer-action-block">
      <hr class="footer-divider" />
      <div class="footer-action-container">
      <div class="published-section-header">  
        <h4>Interact with this note</h4>
      </div>
        <div class="footer-buttons">
          <a class="btn" title="git-hub-edit-note" href="${edit}"     target="_blank">Edit Note</a>
          <a class="btn" title="git-hub-copy-note" href="${raw}"      target="_blank">Raw Note</a>
          <a class="btn" title="git-hub-download-vault" href="${download}" target="_blank">Download Vault</a>
          <a class="btn" title="git-hub-open-dev" href="${dev}"       target="_blank">GitHub.dev Editor</a>
        </div>
      </div>
    </div>
  `;
  footerEl.insertAdjacentHTML("beforeend", html);
  console.log("[GitHub Links] Inserted #footer-action-block in .mod-footer.");
}

/**
* checkAndInsert():
*   Called repeatedly by setInterval. 
*   If a block is missing, re-insert it. 
*/
function checkAndInsert() {
  insertHeaderLinksIfMissing();
  insertFooterBlockIfMissing();
  // You could also do insertRightColumnEditButtonIfMissing() here if you want
}

/**
* init():
*   Start a setInterval that calls checkAndInsert() every 100ms.
*   If you want to automatically stop it once inserted, see note below.
*/
function init() {
  console.log("[GitHub Links] init() called.");

  // Start the repeating interval
  // We can store the ID if we want to stop it after success, but often 
  // it's simplest to keep it running so if the user navigates or Publish re-renders,
  // the blocks get re-inserted if needed.
  insertIntervalId = setInterval(checkAndInsert, 100);

  // Kick off an immediate check so there's no 100ms delay initially
  checkAndInsert();
}

// Fire init once DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

```

# current publish.css

```css
/* .published-container {
  --background-color: var(--background-primary);
  --code-radius: var(--radius-m);
  --footer-display: fixed;
  --page-title-size: 34px;
  --page-title-weight: 500;
  --page-title-line-height: 1.1;
  --page-title-variant: all-small-caps;
  --page-title-color: var(--color-base-60);
  --page-title-style: normal;
  --sidebar-right-background: var(--background-primary);
  --site-name-size: 14px;
  --site-name-color: var(--text-accent);
  --site-name-color-hover: var(--color-base-80);
  --site-name-weight: 600
} */

.site-footer a {
  display: none;
}

.site-footer::after {
  content: 'by @cybersader';
  color: grey;
}

.site-body-left-column-site-name {
	color: var(--h1);
}

.site-body-left-column-site-name {
    transition: color 0.5s ease;
}

.site-body-left-column-site-name:hover {
    color: var(--ax1);
}

/* .site-header-logo {
	display: none;
}

.site-body-left-column-site-logo img {
  width: 100px;
  filter: var(--logo-mode);
}

.site-body-left-column-site-logo {
text-align: left;
} */

/* =============== Header Git Links =============== */
#header-git-links.header-git-links {
  text-align: left;   /* align to the right */
}
#header-git-links a {
  margin-right: 1em;
  text-decoration: none;
  font-size: 1em;
  font-weight: 500;
  padding: 4px 6px;
  border-radius: 4px;
  color: var(--text-accent, #66c0ff);
}
#header-git-links a:hover {
  background: rgba(255,255,255,0.1);
  color: var(--text-on-accent, #fff);
}

/* =============== Footer Action Block =============== */
#footer-action-block {
  margin: 1em 0;
}

.footer-divider {
  margin-bottom: 1em;
  border: 0;
  border-top: 1px solid var(--background-modifier-border, #aaa);
}

.footer-action-container h4 {
  margin: 0.5em 0;
  font-size: 1.1em;
}

/* The row of button-like links */
.footer-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.5em;
  padding-top: 0.7em; /* Adjust the value as needed */
}


.footer-buttons .btn {
  text-decoration: none;
  border-radius: 4px;
  padding: 6px 12px;
  background: var(--interactive-normal, #eee);
  color: var(--text-normal, #333);
  font-weight: 600;
  transition: background 0.2s, color 0.2s;
}

/* Hover effect */
.footer-buttons .btn:hover {
  background: var(--interactive-accent-hover, #ddd);
  color: var(--text-on-accent, #000);
}

/* Icons from title="git-hub-*" if desired */
.footer-buttons .btn[title="git-hub-edit-note"]::before {
  content: url('data:image/svg+xml,...pencil...');
  margin-right: 4px;
}


/* Show frontmatter / properties */

.frontmatter {
  display: block !important; 
}
```

# 1. Examples of including frontmatter

You can get the frontmatter to show in a code block by doing:

```css
.frontmatter {
  display: block !important;
}
```

It looks really ugly though.

```html
<div class="el-pre mod-frontmatter mod-ui"><pre class="frontmatter language-yaml" tabindex="0" style="display: none;"><code class="language-yaml is-loaded"><span class="token key atrule">aliases</span><span class="token punctuation">:</span> 
<span class="token key atrule">tags</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> IAM
  <span class="token punctuation">-</span> Identity
  <span class="token punctuation">-</span> AuthN
  <span class="token punctuation">-</span> AuthZ
  <span class="token punctuation">-</span> Authentication
  <span class="token punctuation">-</span> Authorization
  <span class="token punctuation">-</span> Identity<span class="token punctuation">-</span>Governance
<span class="token key atrule">publish</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">date created</span><span class="token punctuation">:</span> Friday<span class="token punctuation">,</span> September 6th 2024<span class="token punctuation">,</span> 9<span class="token punctuation">:</span>50 am
<span class="token key atrule">date modified</span><span class="token punctuation">:</span> Saturday<span class="token punctuation">,</span> September 7th 2024<span class="token punctuation">,</span> 11<span class="token punctuation">:</span>46 am</code><button class="copy-code-button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon lucide-copy"><rect x="8" y="8" width="14" height="14" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg></button></pre></div>
```

## example 1

```js
var path = decodeURI(window.location.pathname).replaceAll("+", " ");
var str = path.substring(1) + ".md";
var frontmatter = window.app.site.cache.cache[str].frontmatter;

var metas = {}
metas["title"] = frontmatter.title;
metas["description"] = frontmatter.description;

Object.keys(metas).forEach(function(key){
  var metaTag = document.createElement('meta'); 
  metaTag.name = key; 
  metaTag.content = metas[key]; 
  document.head.appendChild(metaTag);
});
```

## example 2

```js
/* == Publish Frontmatter code from tadashi-aikawa 
https://forum.obsidian.md/t/show-properties-of-a-note-in-the-published-pages/68164/5?u=sigrunixia */

let id;

function insertMetaDates() {
  const frontmatter = app.site.cache.cache[app.currentFilepath].frontmatter;
  if (!frontmatter) {
    return;
  }

  const lastupdate = frontmatter["lastupdate"]?.replaceAll("-", "/");
  const fullname = frontmatter["fullname"]?.replaceAll("-", "/");
  const birth = frontmatter["birth"]?.replaceAll("-", "/");
  const death = frontmatter["death"]?.replaceAll("-", "/");
  const type = frontmatter["type"]?.replaceAll("-", "/");
  const jurisdiction = frontmatter["jurisdiction"]?.replaceAll("-", "/");
  const url = frontmatter["url"];
  const tags = frontmatter["tags"]

  const frontmatterEl = document.querySelector(".frontmatter");
  if (!frontmatterEl) {
    return;
  }

  const tagElms = tags
  .map(
    (tag) => 
  <a href="#${tag}" class="tag" target="_blank" rel="noopener">#${tag}</a>
  
  )
  .join("");

  frontmatterEl.insertAdjacentHTML(
    "afterend",
    
<div class="propertyitemtable">
    <div id="updatedateproperty" class="propertyitem">Last Update on ${lastupdate}</div>
    <div id="fullnameproperty" class="propertyitem">full name: ${fullname}</div>
    <div id="birthproperty" class="propertyitem">birth: ${birth}</div>
    <div id="deathproperty" class="propertyitem">death: ${death}</div>
    <div id="jurisdictionproperty" class="propertyitem">jurisdiction: ${jurisdiction}</div>
    <div id="typeproperty" class="propertyitem">type: ${type}</div>
    <div id="urlproperty" class="propertyitem"><a href="${url}"> URL </a></div>
</div>
<div class="propertyitemtags">
        ${tagElms}
</div>

  );

if (!lastupdate) {
    document.getElementById('updatedateproperty').style.display = "none"
} else {
    document.getElementById('updatedateproperty').style.display = ""
}

if (!fullname) {
    document.getElementById('fullnameproperty').style.display = "none"
} else {
    document.getElementById('fullnameproperty').style.display = ""
}

if (!birth) {
    document.getElementById('birthproperty').style.display = "none"
} else {
    document.getElementById('birthproperty').style.display = ""
}

if (!death) {
    document.getElementById('deathproperty').style.display = "none"
} else {
    document.getElementById('deathproperty').style.display = ""
}

if (!jurisdiction) {
  document.getElementById('jurisdictionproperty').style.display = "none"
} else {
  document.getElementById('jurisdictionproperty').style.display = ""
}

if (!url) {
  document.getElementById('urlproperty').style.display = "none"
} else {
  document.getElementById('urlproperty').style.display = ""
}

if (!type) {
  document.getElementById('typeproperty').style.display = "none"
} else {
  document.getElementById('typeproperty').style.display = ""
}

  clearInterval(id);
}

const onChangeDOM = (mutationsList, observer) => {
  for (let mutation of mutationsList) {
    if (
      mutation.type === "childList" &&
      mutation.addedNodes[0]?.className === "page-header"
    ) {
      clearInterval(id);
      id = setInterval(insertMetaDates, 50);
    }
  }
};

const targetNode = document.querySelector(
  ".markdown-preview-sizer.markdown-preview-section"
);
const observer = new MutationObserver(onChangeDOM);
observer.observe(targetNode, { childList: true, subtree: true });
id = setInterval(insertMetaDates, 50);
```

## example 3

```js
let id;

function insertMetaData() {
  const frontmatter = app.site.cache.cache[app.currentFilepath].frontmatter;
  if (!frontmatter) {
    return;
  }

  const up = frontmatter["up"]
  if (!up) {
    return;
  }

  const frontmatterEl = document.querySelector(".frontmatter");
  if (!frontmatterEl){
    return;
  }

  frontmatterEl.insertAdjacentHTML(
    "afterend",
    
    <div class="properties">
      <div class="up">UP:${up}</div>
    
  );

  clearInterval(id);
}

const onChangeDOM = (mutationsList, observer) => {
  for (let mutation of mutationsList) {
    if (
      mutation.type === "childList" &&
      mutation.addedNodes[0]?.className === "page-header"
    ) {
      clearInterval(id);
      id = setInterval(insertMetaData, 50);
    }
  }
};

const targetNode = document.querySelector(
  ".markdown-preview-sizer.markdown-preview-section"
);
const showMetaDataObserver = new MutationObserver(onChangeDOM);
showMetaDataObserver.observe(targetNode, { childList: true, subtree: true });
id = setInterval(insertMetaData, 50);
```

## example 4 (my previous work that didn't seem to work)

```js
/* ========================================================
   publish.js – GitHub Links and Frontmatter Properties
   ======================================================== */

console.log("publish.js loaded");

// -------------------------------------------------------------------
// Helper: Get frontmatter from the app cache
// -------------------------------------------------------------------
function getFrontmatterFromCache() {
  // Compute the file path from the URL.
  var path = decodeURI(window.location.pathname).replaceAll("+", " ");
  var str = path.substring(1) + ".md"; // e.g. "README.md"
  if (
    window.app &&
    app.site &&
    app.site.cache &&
    app.site.cache.cache &&
    app.site.cache.cache[str] &&
    app.site.cache.cache[str].frontmatter
  ) {
    console.log("Found frontmatter in cache for:", str);
    return app.site.cache.cache[str].frontmatter;
  } else {
    console.warn("Frontmatter not found in cache for:", str);
    return null;
  }
}

// -------------------------------------------------------------------
// Example 1: Insert meta tags (from frontmatter) into document head
// -------------------------------------------------------------------
function example1_insertMetaTags() {
  var fm = getFrontmatterFromCache();
  if (!fm) return;
  var metas = {};
  metas["title"] = fm.title;
  metas["description"] = fm.description;
  Object.keys(metas).forEach(function (key) {
    var metaTag = document.createElement("meta");
    metaTag.name = key;
    metaTag.content = metas[key];
    document.head.appendChild(metaTag);
    console.log("Inserted meta tag for", key, ":", metas[key]);
  });
}

// -------------------------------------------------------------------
// Example 2: Insert a table of selected frontmatter properties
// -------------------------------------------------------------------
function example2_insertMetaDates() {
  var fm = getFrontmatterFromCache();
  if (!fm) return;

  // Create a container to hold the properties.
  var container = document.createElement("div");
  container.className = "propertyitemtable";
  container.innerHTML = `
    <div id="updatedateproperty" class="propertyitem">Last Update on ${fm.lastupdate ? fm.lastupdate.replaceAll("-", "/") : "N/A"}</div>
    <div id="fullnameproperty" class="propertyitem">Full Name: ${fm.fullname || "N/A"}</div>
    <div id="birthproperty" class="propertyitem">Birth: ${fm.birth || "N/A"}</div>
    <div id="deathproperty" class="propertyitem">Death: ${fm.death || "N/A"}</div>
    <div id="jurisdictionproperty" class="propertyitem">Jurisdiction: ${fm.jurisdiction || "N/A"}</div>
    <div id="typeproperty" class="propertyitem">Type: ${fm.type || "N/A"}</div>
    <div id="urlproperty" class="propertyitem"><a href="${fm.url || "#"}">URL</a></div>
  `;
  // Insert the container at the top of the main content (or body if not found)
  var content = document.querySelector(".content") || document.body;
  content.insertBefore(container, content.firstChild);
  console.log("Inserted frontmatter meta dates.");
}

// -------------------------------------------------------------------
// Example 3: Insert a custom property ("up") if present
// -------------------------------------------------------------------
function example3_insertUp() {
  var fm = getFrontmatterFromCache();
  if (!fm) return;
  if (!fm.up) {
    console.log("No 'up' property in frontmatter.");
    return;
  }
  var container = document.createElement("div");
  container.className = "properties";
  container.innerHTML = `<div class="up">UP: ${fm.up}</div>`;
  var content = document.querySelector(".content") || document.body;
  content.insertBefore(container, content.firstChild);
  console.log("Inserted 'up' property from frontmatter.");
}

// -------------------------------------------------------------------
// GitHub Links Insertion: (if frontmatter includes a "github:" property)
// -------------------------------------------------------------------
function insertGitHubLinks() {
  var fm = getFrontmatterFromCache();
  if (!fm) {
    console.warn("No frontmatter available for GitHub links.");
    return;
  }
  if (!fm.github) {
    console.warn("No 'github' property found in frontmatter.");
    return;
  }
  var githubURL = fm.github.trim();
  console.log("GitHub URL from frontmatter:", githubURL);
  var viewURL = githubURL;
  var editURL = githubURL.replace("/blob/", "/edit/");
  var rawURL = githubURL.replace("/blob/", "/raw/");
  var downloadURL = rawURL; // Use raw URL as download link

  var linksHTML = `
    <h2>GitHub Links</h2>
    <ul>
      <li><a href="${viewURL}" target="_blank">View on GitHub</a></li>
      <li><a href="${editURL}" target="_blank">Edit on GitHub</a></li>
      <li><a href="${downloadURL}" target="_blank">Download</a></li>
      <li><a href="#" id="copy-raw-url">Copy Raw URL</a></li>
    </ul>
  `;
  var container = document.createElement("div");
  container.className = "github-links";
  container.innerHTML = linksHTML;
  var content = document.querySelector(".content") || document.body;
  content.insertBefore(container, content.firstChild);
  console.log("Inserted GitHub links.");

  // Set up copy-to-clipboard for raw URL
  var copyBtn = document.getElementById("copy-raw-url");
  if (copyBtn) {
    copyBtn.addEventListener("click", function (e) {
      e.preventDefault();
      navigator.clipboard.writeText(rawURL)
        .then(function () {
          console.log("Copied raw URL to clipboard:", rawURL);
          alert("Raw URL copied to clipboard!");
        })
        .catch(function (err) {
          console.error("Error copying raw URL:", err);
        });
    });
  }
}

// -------------------------------------------------------------------
// Main Initialization
// -------------------------------------------------------------------
function init() {
  console.log("Initializing publish.js functions...");
  // Uncomment the example(s) you wish to test:
  // example1_insertMetaTags();
  // example2_insertMetaDates();
  // example3_insertUp();
  // insertGitHubLinks();
}

// Use DOMContentLoaded (or run immediately if document.readyState !== "loading")
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    console.log("DOMContentLoaded event fired.");
    init();
  });
} else {
  console.log("Document already loaded.");
  init();
}

// -------------------------------------------------------------------
// Additional: MutationObserver to log DOM changes (for testing)
// -------------------------------------------------------------------
var targetNode = document.querySelector(".markdown-preview-sizer.markdown-preview-section");
if (targetNode) {
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      console.log("Mutation observed:", mutation);
    });
  });
  observer.observe(targetNode, { childList: true, subtree: true });
  console.log("MutationObserver attached to target node:", targetNode);
} else {
  console.warn("No target node found for MutationObserver.");
}

// Uncomment the following line to manually trigger a custom event for testing:
// document.dispatchEvent(new Event("DOMContentLoaded"));
```

```css
/* Container for property table (Example 2) */
.propertyitemtable {
  border: 1px solid #ccc;
  background: #f9f9f9;
  padding: 1em;
  margin: 1em 0;
  font-size: 0.9em;
}
.propertyitemtable .propertyitem {
  padding: 0.5em;
  border-bottom: 1px solid #ddd;
}
.propertyitemtable .propertyitem:last-child {
  border-bottom: none;
}

/* Container for Example 3 ("up" property) */
.properties {
  border: 1px solid #ccc;
  background: #f0f0f0;
  padding: 0.75em;
  margin: 1em 0;
}

/* Responsive adjustments for smaller screens */
@media screen and (max-width: 750px) {
  .github-links,
  .propertyitemtable,
  .properties {
    margin: 0.5em;
    padding: 0.5em;
  }
}
```

# 2. Fixed buttons for mobile

I would want these to start out simply as square rounded buttons with an svg in the middle.  These would emulate the current edit, copy (raw), and source (code symbol) actions related to github.  I would want these buttons about a fifth of the way down aligned to right side of the `markdown-preview-sizer markdown-preview-section` class.

# 3. Extra sections on the side under the graph

 Want to add more `list-item` type sections under the `outline-view-outer`.   I would like to have one that allows people to share the URL to different platforms.

```html
<div class="outline-view-outer node-insert-event">
  <div class="list-item published-section-header">
    <span class="published-section-header-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon lucide-list">
        <line x1="8" y1="6" x2="21" y2="6"></line>
        <line x1="8" y1="12" x2="21" y2="12"></line>
        <line x1="8" y1="18" x2="21" y2="18"></line>
        <line x1="3" y1="6" x2="3.01" y2="6"></line>
        <line x1="3" y1="12" x2="3.01" y2="12"></line>
        <line x1="3" y1="18" x2="3.01" y2="18"></line>
      </svg>
    </span>
    <span>On this page</span>
  </div>
  <div class="outline-view">
    <div class="tree-item">
      <div class="tree-item-self is-clickable">
        <div class="tree-item-inner">Misc</div>
      </div>
      <div class="tree-item-children"></div>
    </div>
    <div class="tree-item">
      <div class="tree-item-self is-clickable">
        <div class="tree-item-inner">Daily Drivers</div>
      </div>
      <div class="tree-item-children"></div>
    </div>
    <div class="tree-item">
      <div class="tree-item-self is-clickable">
        <div class="tree-item-inner">Cyber</div>
      </div>
      <div class="tree-item-children"></div>
    </div>
    <div class="tree-item">
      <div class="tree-item-self is-clickable">
        <div class="tree-item-inner">Notetaking</div>
      </div>
      <div class="tree-item-children"></div>
    </div>
    <div class="tree-item">
      <div class="tree-item-self is-clickable">
        <div class="tree-item-inner">Windows Tools</div>
      </div>
      <div class="tree-item-children"></div>
    </div>
    <div class="tree-item">
      <div class="tree-item-self is-clickable">
        <div class="tree-item-inner">Misc</div>
      </div>
      <div class="tree-item-children">
        <div class="tree-item">
          <div class="tree-item-self is-clickable">
            <div class="tree-item-inner">Misc misc</div>
          </div>
          <div class="tree-item-children"></div>
        </div>
        <div class="tree-item">
          <div class="tree-item-self is-clickable">
            <div class="tree-item-inner">CSS Framework Stuff</div>
          </div>
          <div class="tree-item-children">
            <div class="tree-item">
              <div class="tree-item-self is-clickable">
                <div class="tree-item-inner">Tailwind</div>
              </div>
              <div class="tree-item-children"></div>
            </div>
          </div>
        </div>
        <div class="tree-item">
          <div class="tree-item-self is-clickable">
            <div class="tree-item-inner">Portfolio</div>
          </div>
          <div class="tree-item-children"></div>
        </div>
      </div>
    </div>
    <div class="tree-item">
      <div class="tree-item-self is-clickable">
        <div class="tree-item-inner">AI and GPT Stuff</div>
      </div>
      <div class="tree-item-children"></div>
    </div>
    <div class="tree-item">
      <div class="tree-item-self is-clickable">
        <div class="tree-item-inner">Blogs</div>
      </div>
      <div class="tree-item-children"></div>
    </div>
  </div>
</div>
```

