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