// ================================
// GitHub Buttons for Obsidian Publish
// ================================

// Set your GitHub repository URL here:
const githubRepo = "https://github.com/cybersader/awesome-cybersader";

// A helper function to compute the relative file path based on window.location.pathname.
// (Adjust this logic if your URL structure differs.)
function getCurrentFilePath() {
  let path = window.location.pathname; // e.g. "/Notes/Home"
  if (path === "/" || path === "") {
    return "Index.md"; // default page
  }
  // Remove any trailing slash, remove the leading slash, and append .md if missing.
  path = path.replace(/^\/+|\/+$/g, "");
  if (!path.endsWith(".md")) {
    path += ".md";
  }
  return path;
}

// Create the GitHub URLs based on the current file path.
function generateGitHubLinks() {
  const filePath = getCurrentFilePath();
  return {
    view: `${githubRepo}/blob/main/${filePath}`,
    edit: `${githubRepo}/edit/main/${filePath}`,
    download: `${githubRepo}/raw/main/${filePath}`,
  };
}

// Create a button element with an inline SVG icon.
function createButton(label, link, svgIcon) {
  const a = document.createElement("a");
  a.href = link;
  a.target = "_blank";
  a.classList.add("github-button");
  // The innerHTML includes the SVG icon and the label.
  a.innerHTML = svgIcon + " " + label;
  return a;
}

// Inline SVG icons for each button (you can adjust these as desired)
const svgView = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z"/>
</svg>`;
const svgEdit = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-9.5 9.5a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l9.5-9.5zM11.207 2L3 10.207V13h2.793L14 4.793 11.207 2z"/>
</svg>`;
const svgDownload = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
  <path d="M.5 9.9a.5.5 0 0 1 .5-.5H5v-7a.5.5 0 0 1 1 0v7h4a.5.5 0 0 1 .354.854l-4 4a.5.5 0 0 1-.708 0l-4-4A.5.5 0 0 1 .5 9.9z"/>
  <path d="M5.5 14.5a.5.5 0 0 1 0-1H10a.5.5 0 0 1 0 1H5.5z"/>
</svg>`;

// Create a container holding the buttons.
function createGitHubButtons() {
  const links = generateGitHubLinks();
  const container = document.createElement("div");
  container.classList.add("github-buttons");
  
  // Create buttons for "View", "Edit", and "Download"
  const btnView = createButton("View", links.view, svgView);
  const btnEdit = createButton("Edit", links.edit, svgEdit);
  const btnDownload = createButton("Download", links.download, svgDownload);
  
  container.appendChild(btnView);
  container.appendChild(btnEdit);
  container.appendChild(btnDownload);
  return container;
}

// Insert the buttons into the page at desired locations.
function insertGitHubButtons() {
  const buttons = createGitHubButtons();

  // Insert right after .page-header if it exists.
  const pageHeader = document.querySelector(".page-header");
  if (pageHeader) {
    pageHeader.parentNode.insertBefore(buttons.cloneNode(true), pageHeader.nextSibling);
  }
  // Insert right above .backlinks if it exists.
  const backlinks = document.querySelector(".backlinks");
  if (backlinks) {
    backlinks.parentNode.insertBefore(buttons.cloneNode(true), backlinks);
  }
}

// When the DOM is ready, run the insertion.
document.addEventListener("DOMContentLoaded", insertGitHubButtons);
