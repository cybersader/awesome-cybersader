---
aliases: []
tags: []
publish: true
permalink:
date created: Saturday, February 8th 2025, 6:51 pm
date modified: Tuesday, February 11th 2025, 6:47 pm
---

I fixed up part of the code and did some testing.

The biggest issue I found is that, it turns out, the header-based links are the ones causing the page to scroll down as fast as the dom renders and it only happens some amount after scrolling down the page.

Nevermind, I found the core issue.  The parent mod-header mod-ui class didn't have a margin even though its child did.  I'm guessing that inserting after the parent somehow makes the child freak out.  Not sure how to account for that honestly.  

Anyway, I've sort of moved on from that problem and would like to insert some other things onto the page:

1) **Including note frontmatter/properties:** the hardest thing will be making it so that "properties" or the frontmatter data associated with the note is parsed onto the page. If possible, I can make it so that I have to explicitly say what that frontmatter can be. I'll share some examples of how to do that below.
2) Adding buttons fixed to the side for when the user goes into mobile.  It would be awesome if the buttons are double click.  On the first click, they open up and show the text associated with them.  Their regular form just has the svg for them and they're square.  These would be fixed to the side of `.markdown-preview-sizer markdown-preview-section` .  I could also include a share button that allows mobile users to share the note anywhere.
3) I want to include the same buttons under a section on the page under the div with `.outline-view-outer node-insert-event`. I'll show an example of what the element looks like.  I would have a `.list-item published-section-header` div with the text like "Content" or "Actions".  
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
      <a href="${view}"     target="_blank">View</a>
      <a href="${edit}"     target="_blank">Edit</a>
      <a href="${raw}"      target="_blank">Raw</a>
      <a href="${download}" target="_blank">Download</a>
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
/* =============== Header Git Links =============== */
#header-git-links.header-git-links {
  text-align: right;   /* align to the right */
  margin: 1em 0;
}
#header-git-links a {
  margin-left: 1em;
  text-decoration: none;
  font-weight: 500;
  padding: 4px 6px;
  border-radius: 4px;
  color: var(--text-accent, #66c0ff);
  transition: background 0.2s, color 0.2s;
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
```