let id;

function insertMetaDates() {
  const frontmatter = app.site.cache.cache[app.currentFilepath]?.frontmatter;
  if (!frontmatter) {
    return;
  }

  const type = frontmatter["type"]?.replaceAll("-", "/");
  const tags = frontmatter["tags"];
  const aliases = frontmatter["aliases"];

  const tagElms = tags
    ? tags
        .map(
          (tag) => `
  <a href="#${tag}" class="tag" target="_blank" rel="noopener">#${tag}</a>
  `
        )
        .join("")
    : "";

  const aliasElms = aliases
    ? aliases
        .map(
          (alias) => `
  <a class="alias" target="_blank" rel="noopener">${alias}</a>
  `
        )
        .join("")
    : "";

  const frontmatterEl = document.querySelector(".frontmatter");
  if (!frontmatterEl) {
    return;
  }

  frontmatterEl.insertAdjacentHTML(
    "afterend",
    `
      <div class="propertyitemtable">
       <div id="typeproperty" class="propertyitem">type: ${type}</div>
      </div>
      <div id="tagsproperty" class="propertyitemtags">
       ${tagElms}
      </div>
      <div id="aliasesproperty" class="propertyitemaliases">
       ${aliasElms}
      </div>
`
  );

  if (type) {
    document.getElementById('typeproperty').style.display = "";
  } else {
    document.getElementById('typeproperty').style.display = "none";
  }

  if (aliases) {
    document.getElementById('aliasesproperty').style.display = "";
  } else {
    document.getElementById('aliasesproperty').style.display = "none";
  }

  if (tags) {
    document.getElementById('tagsproperty').style.display = "";
  } else {
    document.getElementById('tagsproperty').style.display = "none";
  }

  clearInterval(id);
}

const onChangeDOM = (mutationsList, observer) => {
  for (let mutation of mutationsList) {
    if (
      mutation.type === "childList" &&
      mutation.addedNodes[0]?.className === "page-header"
    ) {
      clearInterval(id);
      id = setInterval(insertMetaDates, 50);
    }
  }
};

const targetNode = document.querySelector(
  ".markdown-preview-sizer.markdown-preview-section"
);
const observer = new MutationObserver(onChangeDOM);
observer.observe(targetNode, { childList: true, subtree: true });
id = setInterval(insertMetaDates, 50);