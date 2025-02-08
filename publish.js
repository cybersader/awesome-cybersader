document.addEventListener("DOMContentLoaded",function(){let e="https://github.com/cybersader/awesome-cybersader",t=window.location.pathname.replace(/^\/|\/$/g,"");t||(t="README"),t.endsWith(".md")||(t+=".md");let n=`${e}/edit/main/${t}`,i=`${e}/${t}`,o=`https://raw.githubusercontent.com/cybersader/awesome-cybersader/main/${t}`,a=`
      <a class="github-button" href="${n}" target="_blank" title="Edit on GitHub">
        <!-- Edit (pen) icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="github-icon edit-icon">
          <path d="M11 4H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 0 3L12 11l-4 1 1-4 6.5-6.5a2.121 2.121 0 0 1 3 0z"></path>
        </svg>
        <span>Edit</span>
      </a>
      <a class="github-button" href="${o}" target="_blank" title="Download raw file">
        <!-- Download (down arrow) icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="github-icon download-icon">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        <span>Download</span>
      </a>
      <a class="github-button" href="${i}" target="_blank" title="View on GitHub">
        <!-- View (external link) icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="github-icon view-icon">
          <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
        <span>View</span>
      </a>
    `;function r(){let e=document.createElement("div");return e.className="github-buttons",e.innerHTML=a,e}let l=document.querySelector(".page-header");if(l){let s=r();l.parentNode.insertBefore(s,l.nextSibling)}let _=document.querySelector(".backlinks");if(_){let d=r();_.parentNode.insertBefore(d,_)}});