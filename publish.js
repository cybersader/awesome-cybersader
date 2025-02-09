/* ========================================================
   publish.js – GitHub Links and Frontmatter Properties
   ======================================================== */

   console.log("publish.js loaded");

   // -------------------------------------------------------------------
   // Helper: Get frontmatter from the app cache
   // -------------------------------------------------------------------
   function getFrontmatterFromCache() {
     // Compute the file path from the URL.
     var path = decodeURI(window.location.pathname).replaceAll("+", " ");
     var str = path.substring(1) + ".md"; // e.g. "README.md"
     if (
       window.app &&
       app.site &&
       app.site.cache &&
       app.site.cache.cache &&
       app.site.cache.cache[str] &&
       app.site.cache.cache[str].frontmatter
     ) {
       console.log("Found frontmatter in cache for:", str);
       return app.site.cache.cache[str].frontmatter;
     } else {
       console.warn("Frontmatter not found in cache for:", str);
       return null;
     }
   }
   
   // -------------------------------------------------------------------
   // Example 1: Insert meta tags (from frontmatter) into document head
   // -------------------------------------------------------------------
   function example1_insertMetaTags() {
     var fm = getFrontmatterFromCache();
     if (!fm) return;
     var metas = {};
     metas["title"] = fm.title;
     metas["description"] = fm.description;
     Object.keys(metas).forEach(function (key) {
       var metaTag = document.createElement("meta");
       metaTag.name = key;
       metaTag.content = metas[key];
       document.head.appendChild(metaTag);
       console.log("Inserted meta tag for", key, ":", metas[key]);
     });
   }
   
   // -------------------------------------------------------------------
   // Example 2: Insert a table of selected frontmatter properties
   // -------------------------------------------------------------------
   function example2_insertMetaDates() {
     var fm = getFrontmatterFromCache();
     if (!fm) return;
   
     // Create a container to hold the properties.
     var container = document.createElement("div");
     container.className = "propertyitemtable";
     container.innerHTML = `
       <div id="updatedateproperty" class="propertyitem">Last Update on ${fm.lastupdate ? fm.lastupdate.replaceAll("-", "/") : "N/A"}</div>
       <div id="fullnameproperty" class="propertyitem">Full Name: ${fm.fullname || "N/A"}</div>
       <div id="birthproperty" class="propertyitem">Birth: ${fm.birth || "N/A"}</div>
       <div id="deathproperty" class="propertyitem">Death: ${fm.death || "N/A"}</div>
       <div id="jurisdictionproperty" class="propertyitem">Jurisdiction: ${fm.jurisdiction || "N/A"}</div>
       <div id="typeproperty" class="propertyitem">Type: ${fm.type || "N/A"}</div>
       <div id="urlproperty" class="propertyitem"><a href="${fm.url || "#"}">URL</a></div>
     `;
     // Insert the container at the top of the main content (or body if not found)
     var content = document.querySelector(".content") || document.body;
     content.insertBefore(container, content.firstChild);
     console.log("Inserted frontmatter meta dates.");
   }
   
   // -------------------------------------------------------------------
   // Example 3: Insert a custom property ("up") if present
   // -------------------------------------------------------------------
   function example3_insertUp() {
     var fm = getFrontmatterFromCache();
     if (!fm) return;
     if (!fm.up) {
       console.log("No 'up' property in frontmatter.");
       return;
     }
     var container = document.createElement("div");
     container.className = "properties";
     container.innerHTML = `<div class="up">UP: ${fm.up}</div>`;
     var content = document.querySelector(".content") || document.body;
     content.insertBefore(container, content.firstChild);
     console.log("Inserted 'up' property from frontmatter.");
   }
   
   // -------------------------------------------------------------------
   // GitHub Links Insertion: (if frontmatter includes a "github:" property)
   // -------------------------------------------------------------------
   function insertGitHubLinks() {
     var fm = getFrontmatterFromCache();
     if (!fm) {
       console.warn("No frontmatter available for GitHub links.");
       return;
     }
     if (!fm.github) {
       console.warn("No 'github' property found in frontmatter.");
       return;
     }
     var githubURL = fm.github.trim();
     console.log("GitHub URL from frontmatter:", githubURL);
     var viewURL = githubURL;
     var editURL = githubURL.replace("/blob/", "/edit/");
     var rawURL = githubURL.replace("/blob/", "/raw/");
     var downloadURL = rawURL; // Use raw URL as download link
   
     var linksHTML = `
       <h2>GitHub Links</h2>
       <ul>
         <li><a href="${viewURL}" target="_blank">View on GitHub</a></li>
         <li><a href="${editURL}" target="_blank">Edit on GitHub</a></li>
         <li><a href="${downloadURL}" target="_blank">Download</a></li>
         <li><a href="#" id="copy-raw-url">Copy Raw URL</a></li>
       </ul>
     `;
     var container = document.createElement("div");
     container.className = "github-links";
     container.innerHTML = linksHTML;
     var content = document.querySelector(".content") || document.body;
     content.insertBefore(container, content.firstChild);
     console.log("Inserted GitHub links.");
   
     // Set up copy-to-clipboard for raw URL
     var copyBtn = document.getElementById("copy-raw-url");
     if (copyBtn) {
       copyBtn.addEventListener("click", function (e) {
         e.preventDefault();
         navigator.clipboard.writeText(rawURL)
           .then(function () {
             console.log("Copied raw URL to clipboard:", rawURL);
             alert("Raw URL copied to clipboard!");
           })
           .catch(function (err) {
             console.error("Error copying raw URL:", err);
           });
       });
     }
   }
   
   // -------------------------------------------------------------------
   // Main Initialization
   // -------------------------------------------------------------------
   function init() {
     console.log("Initializing publish.js functions...");
     // Uncomment the example(s) you wish to test:
     // example1_insertMetaTags();
     // example2_insertMetaDates();
     // example3_insertUp();
     // insertGitHubLinks();
   }
   
   // Use DOMContentLoaded (or run immediately if document.readyState !== "loading")
   if (document.readyState === "loading") {
     document.addEventListener("DOMContentLoaded", function () {
       console.log("DOMContentLoaded event fired.");
       init();
     });
   } else {
     console.log("Document already loaded.");
     init();
   }
   
   // -------------------------------------------------------------------
   // Additional: MutationObserver to log DOM changes (for testing)
   // -------------------------------------------------------------------
   var targetNode = document.querySelector(".markdown-preview-sizer.markdown-preview-section");
   if (targetNode) {
     var observer = new MutationObserver(function (mutations) {
       mutations.forEach(function (mutation) {
         console.log("Mutation observed:", mutation);
       });
     });
     observer.observe(targetNode, { childList: true, subtree: true });
     console.log("MutationObserver attached to target node:", targetNode);
   } else {
     console.warn("No target node found for MutationObserver.");
   }
   
   // Uncomment the following line to manually trigger a custom event for testing:
   // document.dispatchEvent(new Event("DOMContentLoaded"));
   