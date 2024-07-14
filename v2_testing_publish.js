let id;

function initialize() {
  document.querySelectorAll('.markdown-preview-view .internal-embed img').forEach(img => {
    if (!img.classList.contains('zoom-event-attached')) {
      img.addEventListener('click', function() {
        this.parentNode.classList.toggle('zoomed');
      });
      img.classList.add('zoom-event-attached');
    }
  });
}

function folderPages() {
  var siteLeft = document.querySelector('.site-body-left-column');
  var siteNav = siteLeft.querySelector('.nav-view-outer');
  var navContainer = siteNav.querySelector('.tree-item').querySelector('.tree-item-children');
  var navItems = navContainer.querySelectorAll(`.is-clickable:not([data-path$=".md"])`);

  for(const item of navItems) {
      var dataPath = item.getAttribute('data-path');
      var [x, y] = dataPath.split('/').slice(-2);
      if(y) {
          var path = `${dataPath}/${y}`;
          var pathMd = `${path}.md`;
          if(app.site.cache.cache[pathMd]) {
              var linkContainer = item.querySelector('div.tree-item-inner');
              var children = item.parentElement.querySelector('.tree-item-children');
              var leafNode = children ? children.querySelector(`a[data-path="${pathMd}"]`) : null;
              if(leafNode) {
                  linkContainer.replaceWith(leafNode);
              } else if(!item.querySelector('a')) {
                  link = document.createElement('a');
                  link.setAttribute('data-path', pathMd);
                  link.setAttribute('href', path);
                  link.classList.add('tree-item-self');
                  link.classList.add('is-clickable');
                  link.innerText = y;
                  linkContainer.innerHTML = '';
                  linkContainer.appendChild(link);
              }
          }
      }
  }
}

// Observer to watch for changes in the DOM
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.addedNodes.length > 0) {
      initialize();
      folderPages();
    }
  });
});

// Start observing the document body for added nodes
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Run initialize at the start to catch any images already in the DOM
initialize();

/* New feature - show properties of a note in the published pages */

function insertMetaDates() {
  const frontmatter = app.site.cache.cache[app.currentFilepath]?.frontmatter;
  if (!frontmatter) {
    return;
  }

  const type = frontmatter["type"]?.replaceAll("-", "/");
  const tags = frontmatter["tags"];
  const aliases = frontmatter["aliases"];

  const tagElms = tags
    ? tags.map(
      (tag) => `
  <a href="#${tag}" class="tag" target="_blank" rel="noopener">#${tag}</a>
  `
    ).join("")
    : "";

  const aliasElms = aliases
    ? aliases.map(
      (alias) => `
  <a class="alias" target="_blank" rel="noopener">${alias}</a>
  `
    ).join("")
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

/* put the properties after the note title */

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
const observerMeta = new MutationObserver(onChangeDOM);
observerMeta.observe(targetNode, { childList: true, subtree: true });
id = setInterval(insertMetaDates, 50);