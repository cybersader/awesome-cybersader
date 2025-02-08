document.addEventListener("DOMContentLoaded", function () {
    // Configuration: Set your repository's base URLs and branch.
    const baseGithubUrl = "https://github.com/cybersader/awesome-cybersader";
    const branch = "main";
    const rawBaseGithubUrl = "https://raw.githubusercontent.com/cybersader/awesome-cybersader/main";
  
    // Get the current page's path (for example: "/README" or "/notes/my-note")
    // Remove leading/trailing slashes
    let filePath = window.location.pathname.replace(/^\/|\/$/g, "");
  
    // If no path exists (for the homepage), assume "README"
    if (!filePath) {
      filePath = "README";
    }
  
    // Append the ".md" extension if it’s not already there
    if (!filePath.endsWith(".md")) {
      filePath += ".md";
    }
  
    // Build the URLs based on the file path:
    const editUrl = `${baseGithubUrl}/edit/${branch}/${filePath}`;
    const viewUrl = `${baseGithubUrl}/${filePath}`;
    const downloadUrl = `${rawBaseGithubUrl}/${filePath}`;
  
    // Build the HTML for the GitHub buttons using inline SVG icons.
    // You can adjust the SVG paths to use your preferred icons.
    const githubButtonsHTML = `
      <a class="github-button" href="${editUrl}" target="_blank" title="Edit on GitHub">
        <!-- Edit (pen) icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="github-icon edit-icon">
          <path d="M11 4H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 0 3L12 11l-4 1 1-4 6.5-6.5a2.121 2.121 0 0 1 3 0z"></path>
        </svg>
        <span>Edit</span>
      </a>
      <a class="github-button" href="${downloadUrl}" target="_blank" title="Download raw file">
        <!-- Download (down arrow) icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="github-icon download-icon">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        <span>Download</span>
      </a>
      <a class="github-button" href="${viewUrl}" target="_blank" title="View on GitHub">
        <!-- View (external link) icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="github-icon view-icon">
          <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
        <span>View</span>
      </a>
    `;
  
    // Helper function to create a container for the buttons
    function createGithubButtonsContainer() {
      const container = document.createElement("div");
      container.className = "github-buttons";
      container.innerHTML = githubButtonsHTML;
      return container;
    }
  
    // Insert the buttons immediately after the page header (.page-header)
    const pageHeader = document.querySelector(".page-header");
    if (pageHeader) {
      const topButtons = createGithubButtonsContainer();
      pageHeader.parentNode.insertBefore(topButtons, pageHeader.nextSibling);
    }
  
    // Insert a duplicate set of buttons immediately before the backlinks (.backlinks)
    const backlinks = document.querySelector(".backlinks");
    if (backlinks) {
      const bottomButtons = createGithubButtonsContainer();
      backlinks.parentNode.insertBefore(bottomButtons, backlinks);
    }
  });
  