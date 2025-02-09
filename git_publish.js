/* =========================================================================
   publish.js – Insert GitHub text links after .mod-header + 
                button-like links after .mod-footer, with re-insertion if removed
   ========================================================================= */

   console.log("publish.js loaded");

   /** ------------------------------------------------------------------
    *  waitForElement(selector, callback)
    *  - Checks for presence of `selector`. If missing, uses a MutationObserver
    *    to wait until it appears, then calls `callback(element)`.
    */
   function waitForElement(selector, callback) {
     let el = document.querySelector(selector);
     if (el) {
       callback(el);
       return;
     }
     const observer = new MutationObserver(() => {
       el = document.querySelector(selector);
       if (el) {
         observer.disconnect();
         callback(el);
       }
     });
     observer.observe(document.documentElement, { childList: true, subtree: true });
   }
   
   /** ------------------------------------------------------------------
    *  buildGitHubURLs()
    *  - Returns an object with the final GitHub links (view, edit, raw, dev, downloadVault)
    *    based on the current URL path. Replaces "+" with "%20".
    */
   function buildGitHubURLs() {
     const currentUrlPath = decodeURIComponent(window.location.pathname);
     const relativePath   = currentUrlPath.replace(/^\/|\/$/g, "");
     console.log(`[GitHub Links] Relative Path: ${relativePath}`);
   
     const githubUser   = "cybersader";
     const githubRepo   = "awesome-cybersader";
     const githubBranch = "main";
   
     // Replace + with %20
     const encodedPath = relativePath.replace(/\+/g, "%20");
   
     const view = `https://github.com/${githubUser}/${githubRepo}/blob/${githubBranch}/${encodedPath}.md`;
     const edit = view.replace("/blob/", "/edit/");
     const raw  = `https://raw.githubusercontent.com/${githubUser}/${githubRepo}/${githubBranch}/${encodedPath}.md`;
     const dev  = `https://github.dev/${githubUser}/${githubRepo}/blob/${githubBranch}/${encodedPath}.md`;
     const downloadVault = `https://github.com/${githubUser}/${githubRepo}/archive/refs/heads/${githubBranch}.zip`;
   
     return { view, edit, raw, dev, downloadVault };
   }
   
   /** ------------------------------------------------------------------
    *  buildLinksHTML(urls, containerClass)
    *  - Simple text-based links for the header (aligned right).
    */
   function buildLinksHTML(urls, containerClass) {
     return `
       <div class="${containerClass}">
         <a href="${urls.view}"     target="_blank">View</a>
         <a href="${urls.edit}"     target="_blank">Edit</a>
         <a href="${urls.raw}"      target="_blank">Raw</a>
         <a href="${urls.downloadVault}" target="_blank">Download</a>
       </div>
     `;
   }
   
   /** ------------------------------------------------------------------
    *  buildFooterButtonsHTML(urls)
    *  - Button-like links for the footer, each with icons (title="...")
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
   
   /** ------------------------------------------------------------------
    *  insertLinksBelowHeader()
    *  - Inserts text-based links below .mod-header.mod-ui (only once).
    */
   function insertLinksBelowHeader() {
     // Skip if already inserted
     if (document.querySelector(".header-git-links")) return;
   
     waitForElement(".mod-header.mod-ui", (headerEl) => {
       const urls      = buildGitHubURLs();
       const linksHTML = buildLinksHTML(urls, "header-git-links");
       headerEl.insertAdjacentHTML("afterend", linksHTML);
       console.log("[GitHub Links] Inserted below .mod-header.mod-ui");
     });
   }
   
   /** ------------------------------------------------------------------
    *  insertLinksBelowFooter()
    *  - Inserts button-like links below .mod-footer.mod-ui (only once).
    */
   function insertLinksBelowFooter() {
     // Skip if already inserted
     if (document.querySelector(".footer-buttons")) return;
   
     waitForElement(".mod-footer.mod-ui", (footerEl) => {
       const urls       = buildGitHubURLs();
       const footerHTML = buildFooterButtonsHTML(urls);
       footerEl.insertAdjacentHTML("afterend", footerHTML);
       console.log("[GitHub Links] Inserted buttons below .mod-footer.mod-ui");
     });
   }
   
   /** ------------------------------------------------------------------
    *  reInsertIfMissing()
    *  - Re-check if the header or footer links are missing after a re-render.
    */
   function reInsertIfMissing() {
     if (!document.querySelector(".header-git-links")) {
       insertLinksBelowHeader();
     }
     if (!document.querySelector(".footer-buttons")) {
       insertLinksBelowFooter();
     }
   }
   
   /** ------------------------------------------------------------------
    *  init()
    *  - Main function: insert the links, then watch for re-renders to re-insert
    */
   function init() {
     console.log("[GitHub Links] Initializing...");
     reInsertIfMissing();
   
     // Watch for re-renders on the main container
     const container = document.querySelector(".markdown-preview-sizer.markdown-preview-section");
     if (!container) {
       console.warn("No .markdown-preview-sizer found; can't auto-reinsert on re-renders.");
       return;
     }
   
     const observer = new MutationObserver(() => {
       reInsertIfMissing();
     });
     observer.observe(container, { childList: true, subtree: true });
     console.log("MutationObserver attached to .markdown-preview-sizer.");
   }
   
   // Fire on DOMContentLoaded or immediately if already loaded
   if (document.readyState === "loading") {
     document.addEventListener("DOMContentLoaded", init);
   } else {
     init();
   }
   