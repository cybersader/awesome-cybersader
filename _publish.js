/* =========================================================================
publish.js – 
  1) 
  2) 
  3) 
========================================================================= */

console.log("[publish.js] loaded");

/** 
* buildGitHubURLs():
*   Generate the GitHub links from the current URL, replacing "+" with "%20".
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
*   If .mod-header.mod-ui exists and #header-git-links is not in DOM, insert new block.
*/
function insertHeaderLinksIfMissing() {
  if (document.getElementById("header-git-links")) {console.log("already exists"); return;}  // Already inserted?

  const headerEl = document.querySelector(".mod-header.mod-ui");
  if (!headerEl) return; // Not present yet

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
  console.log("[GitHub Links] Inserted #header-git-links below .mod-header.");
}

/**
* insertFooterBlockIfMissing():
*   If .mod-footer.mod-ui exists and #footer-action-block is not in DOM, insert HR + "Interact..." + buttons.
*/
function insertFooterBlockIfMissing() {
  if (document.getElementById("footer-action-block")) return; // Already inserted?

  const footerEl = document.querySelector(".mod-footer.mod-ui");
  if (!footerEl) return; // Not present yet

  // Build the HTML with an HR + heading + button row
  const { edit, raw, download, dev } = buildGitHubURLs();
  const html = `
    <div id="footer-action-block">
      <hr class="footer-divider" />
      <div class="footer-action-container">
        <h4>Interact with this page</h4>
        <div class="footer-buttons">
          <a class="btn" title="git-hub-edit-note" href="${edit}"     target="_blank">Edit Note</a>
          <a class="btn" title="git-hub-copy-note" href="${raw}"      target="_blank">Raw Note</a>
          <a class="btn" title="git-hub-download-vault" href="${download}" target="_blank">Download Vault</a>
          <a class="btn" title="git-hub-open-dev" href="${dev}"       target="_blank">GitHub.dev</a>
        </div>
      </div>
    </div>
  `;
  footerEl.insertAdjacentHTML("beforeend", html);
  console.log("[GitHub Links] Inserted #footer-action-block inside .mod-footer.");
}

/**
* insertRightColumnEditButtonIfMissing():
*   If .site-body-right-column-inner is present (desktop?), 
*   insert a single "Edit" button at the top (only once).
*/
function insertRightColumnEditButtonIfMissing() {
  if (document.getElementById("right-col-edit-btn")) return; // Already inserted?

  const rightCol = document.querySelector(".site-body-right-column-inner");
  if (!rightCol) return; // Not present on mobile or not available

  // Use the "edit" link from buildGitHubURLs()
  const { edit } = buildGitHubURLs();
  const btnHTML = `
    <div id="right-col-edit-btn" class="right-column-edit-button">
      <a class="btn" title="git-hub-edit-note" href="${edit}" target="_blank">
        Edit Note
      </a>
    </div>
  `;
  // Insert at the top
  rightCol.insertAdjacentHTML("afterbegin", btnHTML);
  console.log("[GitHub Links] Inserted #right-col-edit-btn in right column.");
}

/**
* reInsertIfMissing():
*   Called on each DOM mutation, ensures all 3 sections are present if needed.
*/
function reInsertIfMissing() {
  insertHeaderLinksIfMissing();
  insertFooterBlockIfMissing();
  insertRightColumnEditButtonIfMissing();
}

/**
* init():
*   Setup the main observer on .markdown-preview-sizer to detect re-renders.
*   Insert once at startup too.
*/
function init() {
  console.log("[GitHub Links] init() called.");
  reInsertIfMissing(); // Insert once

  const container = document.querySelector(".markdown-preview-sizer.markdown-preview-section");
  if (!container) {
    console.warn("[GitHub Links] No .markdown-preview-sizer found. Cannot re-insert if removed.");
    return;
  }

  const observer = new MutationObserver(() => {
    reInsertIfMissing();
  });
  observer.observe(container, { childList: true, subtree: true });
  console.log("[GitHub Links] MutationObserver attached to .markdown-preview-sizer.");
}

// Fire when DOM is loaded (or if already loaded)
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}