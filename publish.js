/* =========================================================================
   publish.js – Insert GitHub links to the right side of the page header
                and as buttons in the footer (with waitForElement helpers).
   ========================================================================= */

   console.log("publish.js loaded");

   /**
    *  waitForElement(selector, callback)
    *  - Checks if `selector` is in the DOM. If not, uses a MutationObserver
    *    to wait until it appears, then fires `callback(element)`.
    */
   function waitForElement(selector, callback) {
     // Check if the element is already in the DOM:
     let el = document.querySelector(selector);
     if (el) {
       callback(el);
       return;
     }
   
     // Otherwise, observe changes until it appears:
     const observer = new MutationObserver(() => {
       el = document.querySelector(selector);
       if (el) {
         observer.disconnect();
         callback(el);
       }
     });
     observer.observe(document.documentElement, { childList: true, subtree: true });
   }
   
   /**
    * buildGitHubURLs()
    * - Returns an object of GitHub links based on the current URL path.
    */
   function buildGitHubURLs() {
     // Example currentUrlPath: "/⬇ INBOX, DROPZONE/⬇️ New Tools/⬇️ New Tools"
     const currentUrlPath = decodeURIComponent(window.location.pathname);
     const relativePath   = currentUrlPath.replace(/^\/|\/$/g, ""); // remove leading/trailing slash
   
     const githubUser   = "cybersader";
     const githubRepo   = "awesome-cybersader";
     const githubBranch = "main";
   
     // Properly encode each segment (spaces -> %20, not "+")
     const encodedPath = relativePath
       .split("/")
       .map(encodeURIComponent)
       .join("/");
   
     // Construct the final .md links
     const view = `https://github.com/${githubUser}/${githubRepo}/blob/${githubBranch}/${encodedPath}.md`;
     const edit = view.replace("/blob/", "/edit/");
     const raw  = `https://raw.githubusercontent.com/${githubUser}/${githubRepo}/${githubBranch}/${encodedPath}.md`;
     const dev  = `https://github.dev/${githubUser}/${githubRepo}/blob/${githubBranch}/${encodedPath}.md`;
     const downloadVault = `https://github.com/${githubUser}/${githubRepo}/archive/refs/heads/${githubBranch}.zip`;
   
     return { view, edit, raw, dev, downloadVault };
   }
   
   /**
    * buildHeaderLinksHTML(urls)
    * - Returns text-based links for the header (aligned to the right).
    */
   function buildHeaderLinksHTML(urls) {
     // Only showing “Edit Note” and “Raw Note” in text form as an example
     return `
       <div class="header-links">
         <a class="header-link-item" href="${urls.edit}" target="_blank">Edit Note</a>
         <a class="header-link-item" href="${urls.raw}"  target="_blank">Raw Note</a>
       </div>
     `;
   }
   
   /**
    * buildFooterButtonsHTML(urls)
    * - Returns button-like links for the footer, each with icons or titles.
    */
   function buildFooterButtonsHTML(urls) {
     return `
       <div class="footer-buttons">
         <a class="btn" title="git-hub-edit-note" href="${urls.edit}" target="_blank">
           Edit Note
         </a>
         <a class="btn" title="git-hub-copy-note" href="${urls.raw}" target="_blank">
           Raw Note
         </a>
         <a class="btn" title="git-hub-download-vault" href="${urls.downloadVault}" target="_blank">
           Download Vault
         </a>
         <a class="btn" title="git-hub-open-dev" href="${urls.dev}" target="_blank">
           GitHub.dev
         </a>
       </div>
     `;
   }
   
   /**
    * insertLinksInHeaderRight()
    * - Waits for the .page-header inside .mod-header.mod-ui
    * - Wraps it in a flex container that positions the page title on the left
    *   and the links on the right.
    */
   function insertLinksInHeaderRight() {
     waitForElement(".mod-header.mod-ui .page-header", (pageHeaderEl) => {
       const urls         = buildGitHubURLs();
       const linksHTML    = buildHeaderLinksHTML(urls);
   
       // 1) Create a new container for flex layout
       const headerRow = document.createElement("div");
       headerRow.className = "header-row";
   
       // 2) Move the existing pageHeaderEl into this row
       headerRow.appendChild(pageHeaderEl);
   
       // 3) Insert the new link items on the right side
       const linksContainer = document.createElement("div");
       linksContainer.innerHTML = linksHTML;
       headerRow.appendChild(linksContainer);
   
       // 4) Place 'headerRow' back into the DOM where .page-header used to be
       const parent = document.querySelector(".mod-header.mod-ui");
       if (parent) {
         parent.appendChild(headerRow);
         console.log("[GitHub Links] Inserted header links to the right side.");
       } else {
         console.warn(".mod-header.mod-ui not found, cannot insert header links.");
       }
     });
   }
   
   /**
    * insertLinksInFooter()
    * - Waits for the .mod-footer.mod-ui
    * - Appends button-like links that wrap on narrow screens.
    */
   function insertLinksInFooter() {
     waitForElement(".mod-footer.mod-ui", (footerEl) => {
       const urls       = buildGitHubURLs();
       const footerHTML = buildFooterButtonsHTML(urls);
       footerEl.insertAdjacentHTML("beforeend", footerHTML);
       console.log("[GitHub Links] Inserted button-like links in the footer.");
     });
   }
   
   /**
    * init()
    * - Main entry point: call both insertions
    */
   function init() {
     console.log("Initializing publish.js...");
     insertLinksInHeaderRight();
     insertLinksInFooter();
   }
   
   // Fire on DOMContentLoaded (or immediately if already loaded)
   if (document.readyState === "loading") {
     document.addEventListener("DOMContentLoaded", init);
   } else {
     init();
   }
   