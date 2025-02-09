/* ========================================================
   publish.js – Insert GitHub links below title & in footer
   ======================================================== */

   console.log("publish.js loaded");

   // Build GitHub links based on the current URL path
   function buildGitHubLinks() {
     // 1) Get the current path (e.g., "/⬇ INBOX, DROPZONE/⬇️ New Tools/⬇️ New Tools")
     const currentUrlPath = decodeURIComponent(window.location.pathname);
   
     // 2) Remove leading/trailing slash -> "⬇ INBOX, DROPZONE/⬇️ New Tools/⬇️ New Tools"
     const relativePath = currentUrlPath.replace(/^\/|\/$/g, "");
   
     // 3) Your repo details
     const githubUser   = "cybersader";
     const githubRepo   = "awesome-cybersader";
     const githubBranch = "main";
   
     // 4) Encode each segment properly (spaces -> %20, not +)
     const encodedPath = relativePath
       .split("/")
       .map(encodeURIComponent)
       .join("/");
   
     // 5) Construct final GitHub links
     const githubView = `https://github.com/${githubUser}/${githubRepo}/blob/${githubBranch}/${encodedPath}.md`;
     const githubEdit = githubView.replace("/blob/", "/edit/");
     const githubRaw  = `https://raw.githubusercontent.com/${githubUser}/${githubRepo}/${githubBranch}/${encodedPath}.md`;
     const githubDev  = `https://github.dev/${githubUser}/${githubRepo}/blob/${githubBranch}/${encodedPath}.md`;
   
     // 6) Build the HTML snippet. Use <span class="git-footer"> because you have CSS for it.
     //    We'll show 3 links as examples (Edit, Raw, Download Vault). 
     //    You can add more or rename them as you like (e.g., the githubDev link).
     const footerLinksHTML = `
       <span class="git-footer">
         <!-- "Edit" link uses the pencil icon from your CSS -->
         <a class="external-link"
            title="git-hub-edit-note"
            href="${githubEdit}"
            target="_blank">Edit Note</a>
   
         <!-- "Raw" link uses the copy icon from your CSS -->
         <a class="external-link"
            title="git-hub-copy-note"
            href="${githubRaw}"
            target="_blank">Raw Note</a>
   
         <!-- "Download Vault" link uses the download icon from your CSS.
              This example downloads the entire repo as ZIP. -->
         <a class="external-link"
            title="git-hub-download-vault"
            href="https://github.com/${githubUser}/${githubRepo}/archive/refs/heads/${githubBranch}.zip"
            target="_blank">Download Vault</a>
   
         <!-- Optional: Add "Open in GitHub.dev"? 
              <a class="external-link"
                 title="git-hub-open-dev"
                 href="${githubDev}" target="_blank">
              Open in GitHub.dev
              </a>
         -->
       </span>
     `;
   
     return footerLinksHTML;
   }
   
   // Insert the GitHub links below the page title
   function insertLinksBelowTitle(linksHTML) {
     // Locate the page-header: <div class="mod-header mod-ui"><div class="page-header">README</div></div>
     const pageHeader = document.querySelector(".mod-header.mod-ui .page-header");
     if (!pageHeader) {
       console.warn("No .page-header found for inserting GitHub links below title.");
       return;
     }
     // Insert the new HTML after the .page-header
     pageHeader.insertAdjacentHTML("afterend", linksHTML);
     console.log("Inserted GitHub links below the page title.");
   }
   
   // Insert the GitHub links in the footer
   function insertLinksInFooter(linksHTML) {
     // The footer container: <div class="mod-footer mod-ui"> ... </div>
     const footer = document.querySelector(".mod-footer.mod-ui");
     if (!footer) {
       console.warn("No .mod-footer.mod-ui found for inserting GitHub links.");
       return;
     }
     // Insert at the top of the footer content
     footer.insertAdjacentHTML("afterbegin", linksHTML);
     console.log("Inserted GitHub links at the footer.");
   }
   
   // Main initialization
   function init() {
     console.log("Initializing publish.js...");
     const linksHTML = buildGitHubLinks();
     insertLinksBelowTitle(linksHTML);
     insertLinksInFooter(linksHTML);
   }
   
   // DOM ready
   if (document.readyState === "loading") {
     document.addEventListener("DOMContentLoaded", init);
   } else {
     init();
   }
   