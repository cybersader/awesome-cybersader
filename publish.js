/* ========================================================
   publish.js – Insert GitHub links below title & in footer
   with a waitForElement() helper + MutationObserver
   ======================================================== */

   console.log("publish.js loaded");

   // 1. Helper: Wait until a given selector appears, then call callback.
   function waitForElement(selector, callback) {
     // Check if it’s already in the DOM:
     let el = document.querySelector(selector);
     if (el) {
       callback(el);
       return;
     }
   
     // Otherwise, watch for DOM changes until it appears:
     const observer = new MutationObserver(() => {
       el = document.querySelector(selector);
       if (el) {
         observer.disconnect();
         callback(el);
       }
     });
   
     // Observe <html> or document.body for added/removed children
     observer.observe(document.documentElement, { childList: true, subtree: true });
   }
   
   /* --------------------------------------------------------
      2. Build the GitHub links from current URL path
      -------------------------------------------------------- */
   function buildGitHubLinksHTML() {
     // a) Current path example: "/⬇ INBOX, DROPZONE/⬇️ New Tools/⬇️ New Tools"
     const currentUrlPath = decodeURIComponent(window.location.pathname);
   
     // b) Remove leading/trailing slash
     const relativePath = currentUrlPath.replace(/^\/|\/$/g, "");
   
     // c) GitHub repo info
     const githubUser   = "cybersader";
     const githubRepo   = "awesome-cybersader";
     const githubBranch = "main";
   
     // d) Encode each segment so spaces => "%20"
     const encodedPath = relativePath
       .split("/")
       .map(encodeURIComponent)
       .join("/");
   
     // e) Construct the final links
     const githubView = `https://github.com/${githubUser}/${githubRepo}/blob/${githubBranch}/${encodedPath}.md`;
     const githubEdit = githubView.replace("/blob/", "/edit/");
     const githubRaw  = `https://raw.githubusercontent.com/${githubUser}/${githubRepo}/${githubBranch}/${encodedPath}.md`;
     const githubDev  = `https://github.dev/${githubUser}/${githubRepo}/blob/${githubBranch}/${encodedPath}.md`;
   
     // f) Return an HTML snippet: <span class="git-footer"> + your custom links
     return `
       <span class="git-footer">
         <!-- "Edit" link uses the pencil icon from your CSS (title="git-hub-edit-note") -->
         <a class="external-link"
            title="git-hub-edit-note"
            href="${githubEdit}" target="_blank">
            Edit Note
         </a>
   
         <!-- "Raw" link uses the copy icon from your CSS -->
         <a class="external-link"
            title="git-hub-copy-note"
            href="${githubRaw}" target="_blank">
            Raw Note
         </a>
   
         <!-- "Download Vault" link uses the download icon from your CSS -->
         <a class="external-link"
            title="git-hub-download-vault"
            href="https://github.com/${githubUser}/${githubRepo}/archive/refs/heads/${githubBranch}.zip"
            target="_blank">
            Download Vault
         </a>
   
         <!-- Optional: open in GitHub.dev
         <a class="external-link"
            title="git-hub-open-dev"
            href="${githubDev}" target="_blank">
            GitHub.dev
         </a>
         -->
       </span>
     `;
   }
   
   /* --------------------------------------------------------
      3. Insert links below the page title
      -------------------------------------------------------- */
   function insertLinksBelowTitle() {
     // Wait for .page-header inside .mod-header.mod-ui
     waitForElement(".mod-header.mod-ui .page-header", (pageHeaderEl) => {
       const linksHTML = buildGitHubLinksHTML();
       // Insert after .page-header
       pageHeaderEl.insertAdjacentHTML("afterend", linksHTML);
       console.log("[GitHub Links] Inserted below page title.");
     });
   }
   
   /* --------------------------------------------------------
      4. Insert links in the footer
      -------------------------------------------------------- */
   function insertLinksInFooter() {
     // Wait for .mod-footer.mod-ui
     waitForElement(".mod-footer.mod-ui", (footerEl) => {
       const linksHTML = buildGitHubLinksHTML();
       // Insert at the top of the footer
       footerEl.insertAdjacentHTML("afterbegin", linksHTML);
       console.log("[GitHub Links] Inserted in page footer.");
     });
   }
   
   /* --------------------------------------------------------
      5. Main initialization
      -------------------------------------------------------- */
   function init() {
     console.log("Initializing publish.js...");
     insertLinksBelowTitle();
     insertLinksInFooter();
   }
   
   // 6. Fire on DOMContentLoaded (or immediately if document is ready)
   if (document.readyState === "loading") {
     document.addEventListener("DOMContentLoaded", init);
   } else {
     init();
   }
   