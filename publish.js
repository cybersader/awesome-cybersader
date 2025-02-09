// ================================
// Posthog Analytics
// ================================

!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug getPageViewId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
posthog.init('phc_599knGAT15HiAYE5nHJjTqIlAY3O6e2F3QdlFzIRHKb', {
    api_host: 'https://us.i.posthog.com',
    person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
})

// // ================================
// // GitHub Buttons for Obsidian Publish
// // ================================

// // Set your GitHub repository URL here:
// const githubRepo = "https://github.com/cybersader/awesome-cybersader";

// // A helper function to compute the relative file path based on window.location.pathname.
// // (Adjust this logic if your URL structure differs.)
// function getCurrentFilePath() {
//   let path = window.location.pathname; // e.g. "/Notes/Home"
//   if (path === "/" || path === "") {
//     return "Index.md"; // default page
//   }
//   // Remove any trailing slash, remove the leading slash, and append .md if missing.
//   path = path.replace(/^\/+|\/+$/g, "");
//   if (!path.endsWith(".md")) {
//     path += ".md";
//   }
//   return path;
// }

// // Create the GitHub URLs based on the current file path.
// function generateGitHubLinks() {
//   const filePath = getCurrentFilePath();
//   return {
//     view: `${githubRepo}/blob/main/${filePath}`,
//     edit: `${githubRepo}/edit/main/${filePath}`,
//     download: `${githubRepo}/raw/main/${filePath}`,
//   };
// }

// // Create a button element with an inline SVG icon.
// function createButton(label, link, svgIcon) {
//   const a = document.createElement("a");
//   a.href = link;
//   a.target = "_blank";
//   a.classList.add("github-button");
//   // The innerHTML includes the SVG icon and the label.
//   a.innerHTML = svgIcon + " " + label;
//   return a;
// }

// // Inline SVG icons for each button (you can adjust these as desired)
// const svgView = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
//   <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8z"/>
//   <path d="M8 5.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z"/>
// </svg>`;
// const svgEdit = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
//   <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-9.5 9.5a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l9.5-9.5zM11.207 2L3 10.207V13h2.793L14 4.793 11.207 2z"/>
// </svg>`;
// const svgDownload = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
//   <path d="M.5 9.9a.5.5 0 0 1 .5-.5H5v-7a.5.5 0 0 1 1 0v7h4a.5.5 0 0 1 .354.854l-4 4a.5.5 0 0 1-.708 0l-4-4A.5.5 0 0 1 .5 9.9z"/>
//   <path d="M5.5 14.5a.5.5 0 0 1 0-1H10a.5.5 0 0 1 0 1H5.5z"/>
// </svg>`;

// // Create a container holding the buttons.
// function createGitHubButtons() {
//   const links = generateGitHubLinks();
//   const container = document.createElement("div");
//   container.classList.add("github-buttons");
  
//   // Create buttons for "View", "Edit", and "Download"
//   const btnView = createButton("View", links.view, svgView);
//   const btnEdit = createButton("Edit", links.edit, svgEdit);
//   const btnDownload = createButton("Download", links.download, svgDownload);
  
//   container.appendChild(btnView);
//   container.appendChild(btnEdit);
//   container.appendChild(btnDownload);
//   return container;
// }

// // Insert the buttons into the page at desired locations.
// function insertGitHubButtons() {
//   const buttons = createGitHubButtons();

//   // Insert right after .page-header if it exists.
//   const pageHeader = document.querySelector(".page-header");
//   if (pageHeader) {
//     pageHeader.parentNode.insertBefore(buttons.cloneNode(true), pageHeader.nextSibling);
//   }
//   // Insert right above .backlinks if it exists.
//   const backlinks = document.querySelector(".backlinks");
//   if (backlinks) {
//     backlinks.parentNode.insertBefore(buttons.cloneNode(true), backlinks);
//   }
// }

// // When the DOM is ready, run the insertion.
// document.addEventListener("DOMContentLoaded", insertGitHubButtons);


/* ========================================================
   publish.js
   Minimal Publish JS
   - Logs console messages to help testing on publish
   - Sets up keyboard shortcuts:
       • Ctrl+K (or ⌘+K) to focus a search bar (if one exists)
       • Ctrl+T to toggle between dark (Atom) and light (Nord) themes
   - Parses a hidden YAML frontmatter block and displays its properties nicely
   - Reads a “github:” property from frontmatter and inserts GitHub links for
     viewing, editing, downloading, and copying the raw URL
======================================================== */

console.log("publish.js loaded");

/* --------------------------------------
   Search Bar Keyboard Shortcut (Ctrl+K / ⌘+K)
----------------------------------------- */
function setPlaceholder() {
  const searchBar = document.querySelector(".search-bar");
  if (searchBar) {
    if (navigator.userAgent.indexOf("Mac") !== -1) {
      searchBar.placeholder = "Search lab using ⌘+K";
    } else {
      searchBar.placeholder = "Search lab using Ctrl+K";
    }
    console.log("Search bar placeholder set.");
  } else {
    console.warn("Search bar element not found.");
  }
}

function setupKeyboardShortcut(event) {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    const searchBar = document.querySelector(".search-bar");
    if (searchBar) {
      searchBar.focus();
      console.log("Search bar focused via keyboard shortcut (Ctrl+K).");
    }
  }
}

/* --------------------------------------
   Theme Toggling Keyboard Shortcut (Ctrl+T)
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
document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key.toLowerCase() === "t") {
    event.preventDefault();
    toggleTheme();
  }
});

/* --------------------------------------
   Insert Frontmatter Properties
   - Looks for a hidden .frontmatter pre element,
     parses its YAML-like content, and displays a table.
----------------------------------------- */
function insertFrontmatterProperties() {
  const fmEl = document.querySelector(".frontmatter");
  if (!fmEl) {
    console.warn("Frontmatter element not found.");
    return;
  }
  const fmText = fmEl.textContent.trim();
  if (!fmText) {
    console.warn("No frontmatter content found.");
    return;
  }
  // Very simple YAML parser: split lines at ":" (assumes no colons in values)
  const lines = fmText.split("\n").map(line => line.trim()).filter(line => line !== "");
  const properties = {};
  lines.forEach(line => {
    const parts = line.split(":");
    if (parts.length >= 2) {
      const key = parts.shift().trim();
      const value = parts.join(":").trim();
      properties[key] = value;
    }
  });
  console.log("Parsed frontmatter properties:", properties);

  // Create a container to display properties
  const container = document.createElement("div");
  container.className = "frontmatter-display";
  let html = "<h2>Frontmatter Properties</h2><table>";
  for (const key in properties) {
    html += `<tr><td>${key}</td><td>${properties[key]}</td></tr>`;
  }
  html += "</table>";
  container.innerHTML = html;

  fmEl.parentNode.insertBefore(container, fmEl.nextSibling);
  console.log("Frontmatter properties displayed.");
}

/* --------------------------------------
   Insert GitHub Links
   - Searches the frontmatter for a line beginning with "github:"
   - Constructs links for view (as given), edit, raw (and download)
   - Adds a “Copy Raw URL” button that uses the Clipboard API
----------------------------------------- */
function insertGitHubLinks() {
  const fmEl = document.querySelector(".frontmatter");
  if (!fmEl) {
    console.warn("Frontmatter element not found. Cannot insert GitHub links.");
    return;
  }
  const fmText = fmEl.textContent.trim();
  let githubURL = "";
  const regex = /^github:\s*(.+)$/im;
  const match = fmText.match(regex);
  if (match && match[1]) {
    githubURL = match[1].trim();
  }
  if (!githubURL) {
    console.warn("GitHub URL not found in frontmatter.");
    return;
  }
  console.log("GitHub URL found:", githubURL);

  // Create different URLs by replacing /blob/ with /edit/ and /raw/
  const viewURL = githubURL;
  const editURL = githubURL.replace("/blob/", "/edit/");
  const rawURL = githubURL.replace("/blob/", "/raw/");
  const downloadURL = rawURL; // For now, raw URL serves as the download link

  // Create a container for GitHub links
  const container = document.createElement("div");
  container.className = "github-links";
  container.innerHTML = `
    <h2>GitHub Links</h2>
    <ul>
      <li><a href="${viewURL}" target="_blank">View on GitHub</a></li>
      <li><a href="${editURL}" target="_blank">Edit on GitHub</a></li>
      <li><a href="${downloadURL}" target="_blank">Download</a></li>
      <li><a href="#" id="copy-raw-url">Copy Raw URL</a></li>
    </ul>
  `;
  // Insert the GitHub links at the top of the .content area, or at the body start if not found
  const mainContent = document.querySelector(".content");
  if (mainContent) {
    mainContent.insertBefore(container, mainContent.firstChild);
    console.log("GitHub links inserted into the page.");
  } else {
    document.body.insertBefore(container, document.body.firstChild);
    console.log("GitHub links inserted at the top of the body.");
  }

  // Attach a click listener for the “Copy Raw URL” link
  const copyBtn = document.getElementById("copy-raw-url");
  if (copyBtn) {
    copyBtn.addEventListener("click", function (e) {
      e.preventDefault();
      navigator.clipboard.writeText(rawURL).then(() => {
        console.log("Raw GitHub URL copied to clipboard:", rawURL);
        alert("Raw GitHub URL copied to clipboard!");
      }).catch((err) => {
        console.error("Could not copy raw URL:", err);
      });
    });
  }
}

/* --------------------------------------
   Initialization on DOMContentLoaded
----------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  setPlaceholder();
  document.addEventListener("keydown", setupKeyboardShortcut);

  insertFrontmatterProperties();
  insertGitHubLinks();
});

