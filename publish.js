/* ========================================================
   publish.js
   ======================================================== */

   console.log("publish.js loaded");
   
   /* --------------------------------------
      GitHub Links Insertion
      Look in the frontmatter text for a line beginning with
      "github:" then build links for view, edit, download and a
      copy-to-clipboard button.
   ----------------------------------------- */
   function insertGitHubLinks() {
     const fmEl = document.querySelector(".frontmatter");
     if (!fmEl) {
       console.warn("Frontmatter element not found; GitHub links not inserted.");
       return;
     }
     const fmText = fmEl.textContent.trim();
     const githubMatch = fmText.match(/^github:\s*(.+)$/im);
     if (!githubMatch || !githubMatch[1]) {
       console.warn("No 'github:' property found in frontmatter.");
       return;
     }
     const githubURL = githubMatch[1].trim();
     console.log("GitHub URL from frontmatter:", githubURL);
   
     // Construct alternate URLs
     const viewURL = githubURL;
     const editURL = githubURL.replace("/blob/", "/edit/");
     const rawURL = githubURL.replace("/blob/", "/raw/");
     const downloadURL = rawURL; // Use raw URL as download link
   
     const linksHTML = `
       <h2>GitHub Links</h2>
       <ul>
         <li><a href="${viewURL}" target="_blank">View on GitHub</a></li>
         <li><a href="${editURL}" target="_blank">Edit on GitHub</a></li>
         <li><a href="${downloadURL}" target="_blank">Download</a></li>
         <li><a href="#" id="copy-raw-url">Copy Raw URL</a></li>
       </ul>
     `;
     
     const container = document.createElement("div");
     container.className = "github-links";
     container.innerHTML = linksHTML;
     
     // Insert at the top of the main content if possible
     const mainContent = document.querySelector(".content") || document.body;
     mainContent.insertBefore(container, mainContent.firstChild);
     console.log("GitHub links inserted.");
   
     // Set up the copy-to-clipboard action
     const copyBtn = document.getElementById("copy-raw-url");
     if (copyBtn) {
       copyBtn.addEventListener("click", function (e) {
         e.preventDefault();
         navigator.clipboard.writeText(rawURL)
           .then(() => {
             console.log("Raw GitHub URL copied to clipboard:", rawURL);
             alert("Raw GitHub URL copied!");
           })
           .catch(err => {
             console.error("Error copying raw URL:", err);
           });
       });
     }
   }
   
   /* --------------------------------------
      Initialization on DOMContentLoaded
   ----------------------------------------- */
   document.addEventListener("DOMContentLoaded", () => {
     console.log("DOM fully loaded and parsed.");
     setSearchBarPlaceholder();
     document.addEventListener("keydown", handleSearchShortcut);
     
     // Insert the parsed frontmatter properties and GitHub links.
     displayFrontmatterProperties();
     insertGitHubLinks();
   });
   