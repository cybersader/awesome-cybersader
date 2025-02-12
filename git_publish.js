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
