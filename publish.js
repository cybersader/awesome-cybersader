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
                    link.innerText=y;
                    linkContainer.innerHTML='';
                    linkContainer.appendChild(link);
                }
            }
        }
    }
}

const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length > 0) {
            folderPages();
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

folderPages();