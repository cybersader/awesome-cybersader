/* ========================================================
   publish.js
   ======================================================== */

   console.log("publish.js loaded");

   /* --------------------------------------
      Search Bar & Keyboard Shortcut (Ctrl+K / ⌘+K)
   ----------------------------------------- */
   function setSearchBarPlaceholder() {
     const searchBar = document.querySelector(".search-bar");
     if (searchBar) {
       if (navigator.userAgent.indexOf("Mac") !== -1) {
         searchBar.placeholder = "Search lab using ⌘+K";
       } else {
         searchBar.placeholder = "Search lab using Ctrl+K";
       }
       console.log("Search bar placeholder set.");
     } else {
       console.warn("No .search-bar element found.");
     }
   }
   
   function handleSearchShortcut(e) {
     if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
       e.preventDefault();
       const searchBar = document.querySelector(".search-bar");
       if (searchBar) {
         searchBar.focus();
         console.log("Focused search bar via keyboard shortcut (Ctrl+K).");
       }
     }
   }
   
   /* --------------------------------------
      Theme Toggle (Ctrl+T)
   ----------------------------------------- */
   function toggleTheme() {
     const body = document.body;
     if (body.classList.contains("theme-dark")) {
       body.classList.remove("theme-dark");
       body.classList.add("theme-light");
       console.log("Switched to light theme (Nord).");
     } else {
       body.classList.remove("theme-light");
       body.classList.add("theme-dark");
       console.log("Switched to dark theme (Atom).");
     }
   }
   document.addEventListener("keydown", (e) => {
     if (e.ctrlKey && e.key.toLowerCase() === "t") {
       e.preventDefault();
       toggleTheme();
     }
   });
   
   /* --------------------------------------
      Frontmatter Parsing & Display
      This function looks for a hidden <pre class="frontmatter">
      element (written in YAML format) and then parses it into
      an HTML table.
   ----------------------------------------- */
   function displayFrontmatterProperties() {
     const fmEl = document.querySelector(".frontmatter");
     if (!fmEl) {
       console.warn("Frontmatter element not found.");
       return;
     }
     const fmText = fmEl.textContent.trim();
     if (!fmText) {
       console.warn("Frontmatter is empty.");
       return;
     }
     // Simple YAML parsing: assume each line is "key: value"
     const lines = fmText.split("\n").map(line => line.trim()).filter(line => line);
     const props = {};
     lines.forEach(line => {
       const parts = line.split(":");
       if (parts.length >= 2) {
         const key = parts.shift().trim();
         const value = parts.join(":").trim();
         props[key] = value;
       }
     });
     console.log("Frontmatter properties parsed:", props);
   
     // Build an HTML table
     let html = "<h2>Frontmatter Properties</h2><table>";
     for (const key in props) {
       html += `<tr><td>${key}</td><td>${props[key]}</td></tr>`;
     }
     html += "</table>";
     
     // Create a container and insert after the .frontmatter element
     const container = document.createElement("div");
     container.className = "frontmatter-display";
     container.innerHTML = html;
     fmEl.parentNode.insertBefore(container, fmEl.nextSibling);
     console.log("Frontmatter display inserted.");
   }
   
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
   