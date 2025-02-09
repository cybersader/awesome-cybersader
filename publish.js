/* =========================================================================
   publish.js – Insert top links below .mod-header (aligned right),
                Insert a single block under the .mod-footer's backlinks,
                avoid repeated insertion & preserve scroll position.
   ========================================================================= */

   console.log("[publish.js] loaded");

   /**
    * buildGitHubURLs():
    *   Build final .md links from the current URL path, converting "+" -> "%20".
    */
   function buildGitHubURLs() {
     const currentUrlPath = decodeURIComponent(window.location.pathname);
     const relativePath   = currentUrlPath.replace(/^\/|\/$/g, "");
   
     const githubUser   = "cybersader";
     const githubRepo   = "awesome-cybersader";
     const githubBranch = "main";
   
     // Replace "+" with "%20"
     const encodedPath = relativePath.replace(/\+/g, "%20");
   
     const view = `https://github.com/${githubUser}/${githubRepo}/blob/${githubBranch}/${encodedPath}.md`;
     const edit = view.replace("/blob/", "/edit/");
     const raw  = `https://raw.githubusercontent.com/${githubUser}/${githubRepo}/${githubBranch}/${encodedPath}.md`;
     const dev  = `https://github.dev/${githubUser}/${githubRepo}/blob/${githubBranch}/${encodedPath}.md`;
     const downloadVault = `https://github.com/${githubUser}/${githubRepo}/archive/refs/heads/${githubBranch}.zip`;
   
     return { view, edit, raw, dev, downloadVault };
   }
   
   /** 
    * buildHeaderLinksHTML():
    *   Creates a right-aligned container with text links. 
    *   We'll give it an ID #git-header-links so we can detect if it's present.
    */
   function buildHeaderLinksHTML(urls) {
     return `
       <div id="git-header-links" class="header-git-links">
         <a href="${urls.view}" target="_blank">View</a>
         <a href="${urls.edit}" target="_blank">Edit</a>
         <a href="${urls.raw}"  target="_blank">Raw</a>
         <a href="${urls.downloadVault}" target="_blank">Download</a>
       </div>
     `;
   }
   
   /**
    * buildFooterBlockHTML():
    *   Creates a single container #git-footer-block with your "Interact with this page" 
    *   header and the 4 button-like links. We'll detect #git-footer-block to avoid duplicates.
    */
   function buildFooterBlockHTML(urls) {
     return `
       <div id="git-footer-block">
         <div class="published-section-header custom-interact-header">
           <span class="published-section-header-icon">
             <!-- Example icon -->
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
               <path d="M10 13a5 5 0 0 0 7.54.54l3-3
                        a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
               <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3
                        a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
             </svg>
           </span>
           <span>Interact with this page</span>
         </div>
         <div class="footer-buttons custom-git-buttons">
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
       </div>
     `;
   }
   
   /**
    * insertHeaderLinksIfMissing():
    *   Checks if .mod-header.mod-ui is present and #git-header-links is NOT.
    *   If so, insert the top links below the header, preserving scroll.
    */
   function insertHeaderLinksIfMissing() {
     // If #git-header-links is already in the DOM, skip
     if (document.getElementById("git-header-links")) return;
   
     const headerEl = document.querySelector(".mod-header.mod-ui");
     if (!headerEl) return;  // header not yet in DOM
   
     // Preserve scroll position
     const scrollX = window.scrollX;
     const scrollY = window.scrollY;
   
     const urls     = buildGitHubURLs();
     const html     = buildHeaderLinksHTML(urls);
     headerEl.insertAdjacentHTML("afterend", html);
   
     // Restore scroll position to avoid any forced scrolling
     window.scrollTo(scrollX, scrollY);
   
     console.log("[GitHub Links] Inserted #git-header-links below .mod-header.");
   }
   
   /**
    * insertFooterBlockIfMissing():
    *   Checks if .mod-footer.mod-ui .backlinks exists and #git-footer-block is not present.
    *   If so, inserts the block below .backlinks, preserving scroll.
    */
   function insertFooterBlockIfMissing() {
     // If #git-footer-block is already present, skip
     if (document.getElementById("git-footer-block")) return;
   
     const footerEl = document.querySelector(".mod-footer.mod-ui");
     const backlinksEl = footerEl?.querySelector(".backlinks");
     if (!footerEl || !backlinksEl) return;  // not yet in DOM
   
     // Preserve scroll position
     const scrollX = window.scrollX;
     const scrollY = window.scrollY;
   
     const urls  = buildGitHubURLs();
     const block = buildFooterBlockHTML(urls);
     // Insert AFTER the .backlinks container
     backlinksEl.insertAdjacentHTML("afterend", block);
   
     // Restore scroll 
     window.scrollTo(scrollX, scrollY);
   
     console.log("[GitHub Links] Inserted #git-footer-block under .backlinks in .mod-footer.");
   }
   
   /**
    * reInsertIfMissing():
    *   Called by observer whenever the page re-renders. 
    *   Ensures both top and bottom blocks are present if needed.
    */
   function reInsertIfMissing() {
     insertHeaderLinksIfMissing();
     insertFooterBlockIfMissing();
   }
   
   /**
    * init():
    *   Sets up the main observer on the .markdown-preview-sizer to detect re-renders.
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
     console.log("[GitHub Links] MutationObserver attached.");
   }
   
   // Fire init on DOMContentLoaded or immediately if doc is ready
   if (document.readyState === "loading") {
     document.addEventListener("DOMContentLoaded", init);
   } else {
     init();
   }
   