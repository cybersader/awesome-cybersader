/* =========================================================================
publish.js – Minimal setInterval approach to insert top links + footer block
========================================================================= */

console.log("[publish.js] loaded");

// A small ID for our repeating check
let insertIntervalId;
const welcomePage = "README";
const USE_PROPERTY_TABLE = true; // If false, modifies existing .frontmatter HTML


/**
 * Determines if the current screen width qualifies as mobile (≤ 750px).
 */
function isMobile() {
  return window.matchMedia("(max-width: 750px)").matches;
}

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
 * Inserts different sets of links based on screen size.
 */
function insertHeaderLinksIfMissing() {
  const existingHeaderBlock = document.getElementById("header-git-links");
  if (existingHeaderBlock) {
    return; // Already inserted
  }

  const headerEl = document.querySelector(".page-header");
  if (!headerEl) {
    return; // Header not rendered yet
  }

  // Build URLs
  const { view, edit, raw, download } = buildGitHubURLs();

  // Determine which links to show
  let html;
  if (isMobile()) {
    // Only show first two links on mobile
    html = `
      <div id="header-git-links" class="header-git-links">
        <a href="${view}" target="_blank">View Source</a> |
        <a href="${edit}" target="_blank">Edit Page</a>
      </div>
    `;
  } else {
    // Show all links on larger screens
    html = `
      <div id="header-git-links" class="header-git-links">
        <a href="${view}" target="_blank">View Source</a> |
        <a href="${edit}" target="_blank">Edit Page</a> |
        <a href="${raw}" target="_blank">Copy</a> |
        <a href="${download}" target="_blank">Download Vault</a>
      </div>
    `;
  }

  // Insert the links
  headerEl.insertAdjacentHTML("afterend", html);
  console.log("[GitHub Links] Inserted #header-git-links.");
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
 * getFrontmatter():
 *   Pull frontmatter from Obsidian Publish's in-memory cache, if available.
 */
function getFrontmatter() {
  try {
    const path = decodeURIComponent(window.location.pathname).replace(/\+/g, " ");
    const mdFile = path.substring(1) + ".md"; // e.g. "README.md"
    if (app?.site?.cache?.cache[mdFile]?.frontmatter) {
      return app.site.cache.cache[mdFile].frontmatter;
    }
  } catch (err) {
    console.warn("[publish.js] frontmatter not found:", err);
  }
  return null;
}

/**
 * frontmatterWhitelist: 
 *   An array of objects describing which keys we want to display,
 *   how we label them, and how we transform the value if needed.
 *
 *   key: the actual frontmatter key
 *   label: the displayed label (e.g. "📅 created")
 *   transform: a function(value) => string, or null to leave as-is
 */
const frontmatterWhitelist = [
  {
    key: "date created",
    label: "📅 created",
    transform: null
  },
  {
    key: "date modified",
    label: "📅 updated",
    transform: null
  }/*,
  {
    key: "tags",
    label: "Tags",
    // If it's an array, we join with commas
    transform: (value) => Array.isArray(value) ? value.join(", ") : value
  },
  {
    key: "aliases",
    label: "Aliases",
    transform: (value) => Array.isArray(value) ? value.join(", ") : value
  }*/
  // ... add more items if you wish
];

/**
 * insertFrontmatterIfMissing():
 *   Checks for .frontmatter element + frontmatter data in cache.
 *   If #frontmatter-block not present, build a block with the whitelisted keys.
 */
function insertFrontmatterIfMissing() {
  // If we already inserted #frontmatter-block (for table mode), skip
  if (USE_PROPERTY_TABLE && document.getElementById("frontmatter-block")) {
    return;
  }

  const fmElement = document.querySelector(".frontmatter");
  if (!fmElement) return; // no frontmatter in DOM

  const fmData = getFrontmatter();
  if (!fmData) return; // none in cache

  // Collect the whitelisted keys
  let rows = "";
  frontmatterWhitelist.forEach(({ key, label, transform }) => {
    if (fmData[key]) {
      let val = fmData[key];
      if (typeof transform === "function") {
        val = transform(val);
      }
      rows += `
        <div class="propertyitem">
          <strong>${label}:</strong> ${val}
        </div>
      `;
    }
  });
  if (!rows.trim()) return;

  if (USE_PROPERTY_TABLE) {
    // === Option A: Insert a new #frontmatter-block after .frontmatter ===
    if (document.getElementById("frontmatter-block")) return; // skip duplicates
    const html = `
      <div id="frontmatter-block" class="propertyitemtable">
        ${rows}
      </div>
    `;
    fmElement.insertAdjacentHTML("afterend", html);
    const originalYaml = document.querySelector(".frontmatter.language-yaml");
    originalYaml.remove();
  } else {
    //TODO
  }
}

/**
 * removeEntireLine(span):
 *   Removes the DOM nodes from 'span' until the next newline or <br>.
 *   This effectively hides the entire line for a non-whitelisted key.
 */
function removeEntireLine(span) {
  const parent = span.parentNode;
  if (!parent) return;

  // We'll remove siblings up to the next <br> or end-of-line
  let current = span;
  while (current && current.nodeName.toLowerCase() !== "br") {
    const next = current.nextSibling;
    parent.removeChild(current);
    current = next;
  }
  // Optionally remove the <br> as well if you want that line entirely gone
  if (current && current.nodeName.toLowerCase() === "br") {
    parent.removeChild(current);
  }
}

// Function to remove frontmatter for when we're on the welcome page
function removeFrontmatter() {
  const frontmatter = document.querySelector(".el-pre.mod-frontmatter.mod-ui");
  frontmatter.style.display = "none"; // Hides the element
}

// Function to remove page title for home page
function removeHeader() {
  const header = document.querySelector(".mod-header.mod-ui")
  header.style.display = "none"; // Hides the element
}

// Function to remove frontmatter for when we're on the welcome page
function showFrontmatter() {
  const frontmatter = document.querySelector(".el-pre.mod-frontmatter.mod-ui");
  frontmatter.style.display = "block";
}

// Function to remove page title for home page
function showHeader() {
  const header = document.querySelector(".mod-header.mod-ui")
  header.style.display = "block";
}

/**
* checkAndInsert():
*   Called repeatedly by setInterval. 
*   If a block is missing, re-insert it. 
*/
function checkAndInsert() {
  if (decodeURIComponent(window.location.pathname).replace(/^\/|\/$/g, "") == welcomePage) {
    removeFrontmatter();
    removeHeader();
    document.querySelector(".header-git-links").style.display = "none";
  } else {
    insertHeaderLinksIfMissing();
    insertFooterBlockIfMissing();
    insertFrontmatterIfMissing(); // Show whitelisted frontmatter
    showFrontmatter();
    showHeader();
    // You could also do insertRightColumnEditButtonIfMissing() here if you want
  }
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
