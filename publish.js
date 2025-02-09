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
     console.log(`Relative Path - ${relativePath}`)
     const githubUser   = "cybersader";
     const githubRepo   = "awesome-cybersader";
     const githubBranch = "main";
   
     const encodedPath = relativePath.replace(/\+/g, "\%20");

     // Properly encode each segment (spaces -> %20, not "+")
    //  const encodedPath = relativePath
    //    .split("/")
    //    .map(encodeURIComponent)
    //    .join("/");
   
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
   function buildLinksHTML(urls, containerClass) {
    return `
      <div class="${containerClass}">
        <a href="${urls.view}"     target="_blank">View</a>
        <a href="${urls.edit}"     target="_blank">Edit</a>
        <a href="${urls.raw}"      target="_blank">Raw</a>
        <a href="${urls.download}" target="_blank">Download</a>
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
   
   function insertLinksBelowHeader() {
    waitForElement(".mod-header.mod-ui", (headerEl) => {
      const urls      = buildGitHubURLs();
      const linksHTML = buildLinksHTML(urls, "header-git-links");
  
      // Insert right AFTER the .mod-header.mod-ui div
      headerEl.insertAdjacentHTML("afterend", linksHTML);
  
      console.log("[GitHub Links] Inserted below .mod-header.mod-ui");
    });
  }

   function insertLinksBelowFooter() {
     waitForElement(".mod-footer.mod-ui", (footerEl) => {
       const urls       = buildGitHubURLs();
       const footerHTML = buildFooterButtonsHTML(urls);
       // Insert right AFTER the .mod-footer.mod-ui div
      footerEl.insertAdjacentHTML("afterend", footerHTML);
       console.log("[GitHub Links] Inserted button-like links in the footer.");
     });
   }
   
   /**
    * init()
    * - Main entry point: call both insertions
    */
   function init() {
     console.log("Initializing publish.js...");
     insertLinksBelowHeader();
     insertLinksBelowFooter();
   }
   
   // Fire on DOMContentLoaded (or immediately if already loaded)
   if (document.readyState === "loading") {
     document.addEventListener("DOMContentLoaded", init);
   } else {
     init();
   }
   