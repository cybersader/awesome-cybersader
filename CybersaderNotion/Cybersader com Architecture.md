# Cybersader.com Architecture

---

### Projects

[Contribution Workflow](Cybersader%20com%20Architecture/Contribution%20Workflow.md)

---

# Current Website Architecture

- cybersader.com
    - Mission
    - Portfolio
    - Blog
    - Cybersade Knowledgebase Base / Index / Curation
    - Roadmap

## Web Design

- Webflow
    - [Most Liked Websites - Webflow](https://webflow.com/made-in-webflow/likes?cloneable=true)
    - [HTML5 responsive website templates | Webflow](https://webflow.com/templates)

## Page Workflows and Tech Stacks

### Landing Page

- Cybersader Options
    - Website Builders
        - Webflow
            - Combine templates and cloned pages
        - Notion-Based
            - [Super — Create Websites with Notion](https://super.so/)
        - JAMStack-Related (MarkDown/MDX)
            - [Astro | Build faster websites](https://astro.build/?ref=lapaninja)
                - [https://astro.build/themes/featured/](https://astro.build/themes/featured/)
                - [https://jamstackthemes.dev/](https://jamstackthemes.dev/)
        - Freelancer Coded
            - Fiverr

### Portfolio

- Webflow
- 

### Blog

- Notion → GitHub →  CMS
- [Draftbox | No-code platform to build a blog on JAMstack](https://draftbox.co/)
- [Ghost: The Creator Economy Platform](https://ghost.org/)
    - Netlify integration
- [Storipress | The WordPress alternative for publishers](https://storipress.com/)
- [Notion Blog - Theme Info](https://jamstackthemes.dev/theme/notion-blog/)
- [Next.js Notion Starter Kit - Demo](https://jamstackthemes.dev/demo/theme/nextjs-notion-starter-kit/)
- [Prose · A Content Editor for GitHub](https://prose.io/) - useful if you want to use Jekyll
- Tina CMS → Gatsby → Netlify
- (Strapi OR ) NextJS → GitHub → Netlify

### Cyber Knowledge Base

- CMS:
    - [https://docs.github.com/en/communities/documenting-your-project-with-wikis/about-wikis](https://docs.github.com/en/communities/documenting-your-project-with-wikis/about-wikis) - GitHub wiki with GitHub Pages
    - [Notaku](https://notaku.so/) - Another Notion as a CMS
    - Super.so
        - Cluster
        - Aether
    - Typedream
        - Bombtion
    - Simple
        - [https://www.simple.ink/template-category/docs-wiki-templates-for-notion](https://www.simple.ink/template-category/docs-wiki-templates-for-notion)
    - [Obsidian Publish](https://obsidian.md/publish)

---

---

## DNS

- [Cloudflare DNS](https://www.cloudflare.com/dns/) - DNS, WAF, Analytics
    - Landing Page
        - www.cybersader.com
    - Blog
        - blog.cybersader.com
    - Knowledge Base
        - base.cybersader.com
    - Portfolio
        - ben.cybersader.com
- [Integrations | Cloudflare](https://www.cloudflare.com/integrations/)
- [Apps - Cloudflare Apps](https://www.cloudflare.com/apps/)

## Hosting

- Landing Page, Portfolio
    - [Netlify](https://www.netlify.com/)
        - CMS → Netlify
            - Options:
                - Git, Manual
        - Manual
- Blog
    - Ghost
- Knowledge Base
    - Notaku

## CMS

- Landing Page: Webflow → Netlify → Cloudflare CDN
- Blog: Ghost → Cloudflare CDN
- Knowledge Base: Notion → Notaku → Cloudflare CDN

## Side projects / Connected Websites

- [cynar.io](http://cynar.io)

# Design Stuff

## Javascript Libraries Useful with webflow projects

- [https://codemirror.net/](https://codemirror.net/)
    - [How to Build a Code Editor using Codemirror | Engineering Education (EngEd) Program | Section](https://www.section.io/engineering-education/how-to-build-a-code-editor-using-codemirror/)
- Copy to clipboard Webflow
    - [How do you add a Copy to Clipboard button in Webflow?](https://www.webflow-tools.refokus.com/tools/copy-to-clipboard)

## Webflow Integrations

[Webflow integrations | Webflow University](https://university.webflow.com/integrations?search=contact) 

- [Connect your Notion to Webflow integration in 2 minutes | Zapier](https://zapier.com/apps/notion/integrations/webflow)

## Webflow Templates or Cloneable Websites

### Websites for Templates & Cloneables

[Webflow Showcase - Free Webflow Cloneables](https://showcased.webflow.io/) 

[Popular Websites - Webflow](https://webflow.com/made-in-webflow) 

[Free Webflow Cloneable Templates - BRIX Templates](https://brixtemplates.com/cloneables) 

[Webflow Free Cloneables | Flowbase](https://www.flowbase.co/clone?community-tags=landing%7Ccustom-code%7Cnavigations) 

[Webflow Cloneables | SketchzLab](https://www.sketchzlab.com/resources/cloneables) 

[T.RICKS Public Code](https://www.notion.so/9c289f61652d457797b1251cdf9beb61?pvs=21) 

[My Sandbox - design+code like interaction](https://sab.webflow.io/designcode-like-interaction) 

[https://webflow.com/webflowtips](https://webflow.com/webflowtips) 

### Search Terms

- Navbar, nav, hamburger
- responsive

### Cloneables & Templates

- carousels
    - [Timeline Cloneable - Webflow](https://webflow.com/made-in-webflow/website/timeline-cloneable-section?ref=made-in-webflow-search&searchValue=timeline)
    - [Netflix clone (+ carousel) - Webflow](https://webflow.com/made-in-webflow/website/netflix-carousel?ref=made-in-webflow-search&searchValue=carousel)
    - [Swipeflow・Swiper JS & Webflow Integration - Webflow](https://webflow.com/made-in-webflow/website/SwipeflowSwiper-JS-and-Webflow-Integration?ref=made-in-webflow-search&searchValue=carousel)
    - [Image Slider with Transition Effect - Webflow](https://webflow.com/made-in-webflow/website/Image-Slider-with-Transition-Effect?ref=made-in-webflow-search&searchValue=carousel)
    - [Webflow Tips : Autoplayer Carousel - Webflow](https://webflow.com/made-in-webflow/website/Webflow-Tips-Autoplayer-Carousel?ref=made-in-webflow-search&searchValue=carousel)
    - [MM—002: Stacking Slider - Webflow](https://webflow.com/made-in-webflow/website/Stacking-Slider?ref=made-in-webflow-search&searchValue=carousel)
    - [Horizontal Gallery Slideshow for Photographers - Webflow](https://webflow.com/made-in-webflow/website/Horizontal-Gallery-Slideshow-for-Photographers?ref=made-in-webflow-search&searchValue=carousel)
- Other useful widgets
    - [Translate Webflow Website - Webflow](https://webflow.com/made-in-webflow/website/Translate-Webflow-Website)
    - [Calculator - Webflow](https://webflow.com/made-in-webflow/website/Calculator-jug3qtnl)
    - [Automatic Link Preview - Webflow](https://webflow.com/made-in-webflow/website/Automatic-Link-Preview)
- Dark Mode
    - [Night Mode for Blogs & Articles | Cloneable - Webflow](https://webflow.com/made-in-webflow/website/Night-Mode-for-Blogs-and-Articles-or-Cloneable)
    - [Darkweb X - Dark Mode Webflow Template | BRIX Templates - Webflow](https://webflow.com/made-in-webflow/website/darkwebtemplate-showcase?ref=made-in-webflow-search&searchValue=dark%20theme)
- Design Packs or UI Kits
    - [Web Elements 3D - Webflow](https://webflow.com/made-in-webflow/website/Web-Elements)
    - [Webflow UI Kit - NoCodeTribe - Webflow](https://webflow.com/made-in-webflow/website/NoCodeTribe-Webflow-UI-Kit)
    - [CARBON DESIGN (CLONEABLE) - Webflow](https://webflow.com/made-in-webflow/website/CARBON-DESIGN-SYSTEM)
- Forms
    - [T.RICKS Multi-Step Form - Webflow](https://webflow.com/made-in-webflow/website/TRICKS-Multi-Step-Form)
- One Page - Links
    - [Link in Bio Webflow Template | BRIX Templates - Webflow](https://webflow.com/made-in-webflow/website/link-in-bio-cloneable-brixtemplates)
    - [Aiko — All in one link in bio - Webflow](https://webflow.com/made-in-webflow/website/aiko-bio)
- Portfolios
    - [https://webflow.com/made-in-webflow/website/Demo-Portfolio?ref=made-in-webflow-search&searchValue=progress](https://webflow.com/made-in-webflow/website/Demo-Portfolio?ref=made-in-webflow-search&searchValue=progress)
    - [jt-design-ca - Webflow](https://webflow.com/made-in-webflow/website/jt-design-ca)
    - [Portfolio Website - LaOlu - Webflow](https://webflow.com/made-in-webflow/website/folio-tkl)
    - [Greg Christian - Portfolio - Webflow](https://webflow.com/made-in-webflow/website/Greg-Christian-Portfolio)
    - [NCK - Designer Portfolio - Webflow](https://webflow.com/made-in-webflow/website/NCK-Designer-Portfolio)
    - [mrbenburns - Webflow](https://webflow.com/made-in-webflow/website/mrbenburns)
    - [Portfolio Website - Free Template - Webflow](https://webflow.com/made-in-webflow/website/Portfolio-Website-Free-Template)
    - [Jimmy Makes Things - Design + Development Collective - Webflow](https://webflow.com/made-in-webflow/website/Jimmy-Makes-Things-Design-Development-Collective)
    - [portfolio2-16469f - Webflow](https://webflow.com/made-in-webflow/website/portfolio2-16469f?gspk=ZHVuY2FuaGFtcmE1MTg5&gsxid=kAhFV1yk6O5W&utm_medium=affiliate)
    - [Personal Portfolio - Webflow](https://webflow.com/made-in-webflow/website/portfolio-f9f6fe)
    - [Deji - Portfolio Website - Webflow](https://webflow.com/made-in-webflow/website/deji?gspk=ZHVuY2FuaGFtcmE1MTg5&gsxid=HpyVE7u3Dz9Y&utm_medium=affiliate)
    - [rigocm - Portfolio - Webflow](https://webflow.com/made-in-webflow/website/rigocm)
    - [Personal Portfolio Cloneable - Webflow](https://webflow.com/made-in-webflow/website/Personal-Portfolio-Cloneable)
    - [Personal Portfolio - Webflow](https://webflow.com/made-in-webflow/website/portfolio-f9f6fe)
    - [Coty.Design - Webflow](https://webflow.com/made-in-webflow/website/coty-design)
    - [J.M.& Co. - Webflow](https://webflow.com/made-in-webflow/website/joshmaynard)
    - [damienconchon - Webflow](https://webflow.com/made-in-webflow/website/damienconchon)
    - [Resume Template Cloneable - Webflow](https://webflow.com/made-in-webflow/website/Resume-Template-Cloneable)
    - [Professional Resume Website - Webflow](https://webflow.com/made-in-webflow/website/Professional-Resume-Website)
    - [Free Simple CV Resume Template - Webflow](https://webflow.com/made-in-webflow/website/simple-cv-template)
    - 
- SaaS or General Tech Company Landing or Company
    - [Da Monti Finance - Webflow](https://webflow.com/made-in-webflow/website/damonti-finance?gspk=ZHVuY2FuaGFtcmE1MTg5&gsxid=ZpnEPoQuPlYj&utm_medium=affiliate)
    - [awesomic-tt-ijbd - Webflow](https://webflow.com/made-in-webflow/website/awesomic-tt-ijbd)
    - [Plink Webflow Rebuild - Webflow](https://webflow.com/made-in-webflow/website/Plink-Webflow-Rebuild)
    - [Segev Digital | Agency website - Webflow](https://webflow.com/made-in-webflow/website/segevdigital)
    - [Free Template for Churches - Webflow](https://webflow.com/made-in-webflow/website/Free-Template-for-Churches)
    - [History Virtual Museum - Webflow](https://webflow.com/made-in-webflow/website/history-virtual-museum)
    - [Nature Parallax - Webflow](https://webflow.com/made-in-webflow/website/Nature-Parallax)
    - [mntn - Webflow](https://webflow.com/made-in-webflow/website/mntn)
    - [Caddyflow | Webflow Agency Landing Page Two - Webflow](https://webflow.com/made-in-webflow/website/caddyflow-webflow-agency-lapa-two)
    - [Caddyflow Webflow Agency - Landing Page : Hush - Webflow](https://webflow.com/made-in-webflow/website/Caddyflow-Webflow-Agency-Landing-Page-Hush)
    - [Creative Agency Template - Webflow](https://webflow.com/made-in-webflow/website/Creative-Agency-Template)
    - [Caddyflow Webflow Agency - NFT Landing Page - Webflow](https://webflow.com/made-in-webflow/website/Caddyflow-Webflow-Agency-NFT-Landing-Page)
    - [iThrive Academy - Learn Functional Nutrition - Webflow](https://webflow.com/made-in-webflow/website/ithrive-academy?gspk=ZHVuY2FuaGFtcmE1MTg5&gsxid=8XNbhFWTi3AN&utm_medium=affiliate)
    - [N2TF Community Weeknd Build Challenge - Webflow](https://webflow.com/made-in-webflow/website/weekly-68a378?gspk=ZHVuY2FuaGFtcmE1MTg5&gsxid=ap6mMNsjOiSh&utm_medium=affiliate)
    - [Paralect - Dark Landing Template - Webflow](https://webflow.com/made-in-webflow/website/dark-landing-template?gspk=ZHVuY2FuaGFtcmE1MTg5&gsxid=zoeXqVBoPmiP&utm_medium=affiliate)
    - [filebox-template - Webflow](https://webflow.com/made-in-webflow/website/filebox-template?gspk=ZHVuY2FuaGFtcmE1MTg5&gsxid=2Ub9tZ9taeYs&utm_medium=affiliate)
    - [Punch I.T. - Webflow](https://webflow.com/made-in-webflow/website/punchit?gspk=ZHVuY2FuaGFtcmE1MTg5&gsxid=HX714zcC6fyO&utm_medium=affiliate)
    - [WordPress naar Webflow - Webflow](https://webflow.com/made-in-webflow/website/wordpress-naar-webflow?gspk=ZHVuY2FuaGFtcmE1MTg5&gsxid=biSIzeWs9k2H&utm_medium=affiliate)
    - [Webflow Mastery Project - Webflow](https://webflow.com/made-in-webflow/website/webflowmasteryproject1?gspk=ZHVuY2FuaGFtcmE1MTg5&gsxid=jt4FzuW8cuks&utm_medium=affiliate)
    - [Out Frame - Webflow](https://webflow.com/made-in-webflow/website/Out-Frame?ref=made-in-webflow-search&searchValue=framed%20tabs)
    - 
- Video Landings
    - [copy-of-realkit - Webflow](https://webflow.com/made-in-webflow/website/copy-of-realkit)
    - [Moving Video Background - Webflow](https://webflow.com/made-in-webflow/website/Moving-Video-Background?gspk=ZHVuY2FuaGFtcmE1MTg5&gsxid=ARmylayxKNIn&utm_medium=affiliate)
- Other UX and Elements
    - [👍👌 Easy CSS-only Marquees! 👍👌Easy CSS-only Marquees! 👍👌Easy CSS-only Marquees! 👍👌 - Webflow](https://webflow.com/made-in-webflow/website/Easy-CSS-only-Marquees-Easy-CSS-only-Marquees-Easy-CSS-only-Marquees)
    - [Parallax template - Webflow](https://webflow.com/made-in-webflow/website/Parallax-template-cloneable)
    - [How it works -Scroll into view - Webflow](https://webflow.com/made-in-webflow/website/How-it-works-Scroll-into-view)
    - [Perfect Accordion - Webflow](https://webflow.com/made-in-webflow/website/Perfect-Accordion)
    - [NEW Slider Interactions! - Dribbble Series Ft. M S Brar - Webflow](https://webflow.com/made-in-webflow/website/NEW-Slider-Interactions-Dribbble-Series-Ft-M-S-Brar)
    - [🪗 Full-Height Funky Accordions 🪗 - Webflow](https://webflow.com/made-in-webflow/website/Full-Height-Funky-Accordions)
    - [WebGL Grid to Fullscreen | Flowbase Guide - Webflow](https://webflow.com/made-in-webflow/website/WebGL-Grid-to-Fullscreen-or-Flowbase-Guide)
    - [Inertia / Momentum Scrolling - Webflow](https://webflow.com/made-in-webflow/website/gsap-tweenmax-scroll)
    - [MM—008: Direction-Aware Slider - Webflow](https://webflow.com/made-in-webflow/website/MM008-Direction-Aware-Slider)
    - [Flowbase - Card Hovers - Webflow](https://webflow.com/made-in-webflow/website/Flowbase-Card-Hovers)
    - [Infinite Text Rotation / Changer (Seamless Loop) - Webflow](https://webflow.com/made-in-webflow/website/Infinite-Text-Rotation-Changer-Seamless-Loop)
    - [Canvas Slider - Webflow](https://webflow.com/made-in-webflow/website/Canvas-Slider)
    - [Infinite Clients Slider - Webflow](https://webflow.com/made-in-webflow/website/Infinite-Clients-Slider)
    - [Project Countdown - Webflow](https://webflow.com/made-in-webflow/website/Project-Countdown)
    - [type-writer - Webflow](https://webflow.com/made-in-webflow/website/type-writer)
    - [Reactive Type Effect - Webflow](https://webflow.com/made-in-webflow/website/Reactive-Type-Effect)
    - [https://webflow.com/made-in-webflow/website/How-to-create-custom-highlight-and-underline-text?ref=made-in-webflow-search&searchValue=text animation](https://webflow.com/made-in-webflow/website/How-to-create-custom-highlight-and-underline-text?ref=made-in-webflow-search&searchValue=text%20animation)
- Animations & Interactions
    - [Descramble Hover - Webflow](https://webflow.com/made-in-webflow/website/descramble-hover?gspk=ZHVuY2FuaGFtcmE1MTg5&gsxid=oWogqIRHgine&utm_medium=affiliate)
    - [Motion Hover Effect - Webflow](https://webflow.com/made-in-webflow/website/Motion-Hover-Effect)
    - [180 Beautiful Gradients - Webflow](https://webflow.com/made-in-webflow/website/180-Beautiful-Gradients)
    - [Blur scroll effect for long screenshots in your portfolio - Webflow](https://webflow.com/made-in-webflow/website/Blur-scroll-effect-for-long-screenshots-in-your-portfolio)
    - [Typing Text (Typed.js) - Webflow](https://webflow.com/made-in-webflow/website/Typing-Text-Typedjs)
    - [Joseph Berry Text Effects - Webflow](https://webflow.com/made-in-webflow/website/Joseph-Berry-Text-Effects)
    - [how-it-works-scroll-horizontal - Webflow](https://webflow.com/made-in-webflow/website/how-it-works-scroll-horizontal)
    - [Variable Font Interactions - Webflow](https://webflow.com/made-in-webflow/website/Variable-Font-Interactions)
    - [Changing words in a sentence - Webflow](https://webflow.com/made-in-webflow/website/Changing-words-in-a-sentence)
    - [WebGL Image Slider - Webflow](https://webflow.com/made-in-webflow/website/WebGL-Image-Slider)
    - [Sleepy Interactions - Webflow](https://webflow.com/made-in-webflow/website/Sleepy-Interactions)
    - [20 Line Hover Animations - Webflow](https://webflow.com/made-in-webflow/website/20-Link-Effects)
    - [Rich Text Enhancer (by Refokus) - Webflow](https://webflow.com/made-in-webflow/website/Rich-Text-Enhancer-by-Refokus)
    - [Text reveal masking on scroll - Webflow](https://webflow.com/made-in-webflow/website/Text-reveal-masking-on-scroll)
    - [SVG Map - Webflow](https://webflow.com/made-in-webflow/website/SVG-Map)
    - [PARTICLES EFFECT - How to integrate Particles.js in Webflow - Webflow](https://webflow.com/made-in-webflow/website/Tutorial-How-to-integrate-Particlesjs-in-Webflow)
    - [three-js-stars - Webflow](https://webflow.com/made-in-webflow/website/three-js-stars)
    - [Pipeline Animation - Webflow](https://webflow.com/made-in-webflow/website/Pipeline-Animation?gspk=ZHVuY2FuaGFtcmE1MTg5&gsxid=KMNEA0JFDGry&utm_medium=affiliate)
    - [Scroll Interactions - Webflow](https://webflow.com/made-in-webflow/website/Scroll-Interactions)
    - [Knockout Text with Video Background - Webflow](https://webflow.com/made-in-webflow/website/Knockout-Text-with-Video-Background?ref=made-in-webflow-search&searchValue=framed%20tabs)
    - [Formatically 2 - Webflow](https://webflow.com/made-in-webflow/website/Formatically-20?ref=made-in-webflow-search&searchValue=code%20format)
    - 
- Navbars & Menus & Hamburgers
    - [[CLONEABLE] Dropdown Menu - Webflow](https://webflow.com/made-in-webflow/website/nav-drop)
    - [Simple Menu - Webflow](https://webflow.com/made-in-webflow/website/Simple-Menu?gspk=ZHVuY2FuaGFtcmE1MTg5&gsxid=oMImdObL5E2v&utm_medium=affiliate)
    - [Clone: Simple Mega Nav Menu - Webflow](https://webflow.com/made-in-webflow/website/Simple-Mega-Menu)
    - [NAV challenge - Webflow](https://webflow.com/made-in-webflow/website/NAV-challenge)
    - [Lottieflow - Menu Nav Pack - Webflow](https://webflow.com/made-in-webflow/website/Lottieflow-Menu-Nav-Pack)
    - [Show/hide navbar on scroll - Webflow](https://webflow.com/made-in-webflow/website/navbar-show-hide-on-scroll-1)
    - [Webflow Website Navbar and Mega Menu - Webflow](https://webflow.com/made-in-webflow/website/Webflow-Website-Navbar-and-Mega-Menu)
    - [awesomic-tt-ijbd - Webflow](https://webflow.com/made-in-webflow/website/awesomic-tt-ijbd)
    - [Nav 13 - Webflow](https://webflow.com/made-in-webflow/website/Nav-13)
    - [Cloneable navbar (#1) - Webflow](https://webflow.com/made-in-webflow/website/teams-wondrous-site-6af77d)
    - [Cloneable navbar (#2) - Webflow](https://webflow.com/made-in-webflow/website/navbars-1)
    - [responsive-navigation-menu - Webflow](https://webflow.com/made-in-webflow/website/responsive-navigation-menu)
    - [Navbar resize - Webflow](https://webflow.com/made-in-webflow/website/Navbar-resize)
    - [Hide/Reveal Nav On Scroll - Webflow](https://webflow.com/made-in-webflow/website/HideReveal-Nav-On-Scroll)
    - [Navbar Color Change - Webflow](https://webflow.com/made-in-webflow/website/navbar-color-chaning)
    - [Navbar with index and progressbar - Webflow](https://webflow.com/made-in-webflow/website/progress-navbar-index)
    - [Stripe Nav - Webflow](https://webflow.com/made-in-webflow/website/stripe-menu-tricks)
    - [Mega-Menu challenge - Webflow](https://webflow.com/made-in-webflow/website/Mega-Menu-challenge?gspk=ZHVuY2FuaGFtcmE1MTg5&gsxid=3KgU3pPSAHn8&utm_medium=affiliate)
    - [Webflow Website Navbar and Mega Menu - Webflow](https://webflow.com/made-in-webflow/website/Webflow-Website-Navbar-and-Mega-Menu?gspk=ZHVuY2FuaGFtcmE1MTg5&gsxid=HZjFeLIMK2Xb&utm_medium=affiliate)
    - [navigation-menu - Webflow](https://webflow.com/made-in-webflow/website/explayn-fantastic-site?gspk=ZHVuY2FuaGFtcmE1MTg5&gsxid=zYebJKstzk3P&utm_medium=affiliate)
    - [Full Screen Menu Navigation - Webflow](https://webflow.com/made-in-webflow/website/Full-Screen-Menu-Navigation?gspk=ZHVuY2FuaGFtcmE1MTg5&gsxid=HQxKvEaTQrWN&utm_medium=affiliate)
    - [Darkweb X - Dark Mode Webflow Template | BRIX Templates - Webflow](https://webflow.com/made-in-webflow/website/darkwebtemplate-showcase?ref=made-in-webflow-search&searchValue=dark%20theme)
    - 
- Cool Hero Sections
    - [https://webflow.com/made-in-webflow/website/jpthedio-v13?gspk=ZHVuY2FuaGFtcmE1MTg5&gsxid=gYDvgLHCo1Ur&utm_medium=affiliate](https://webflow.com/made-in-webflow/website/jpthedio-v13?gspk=ZHVuY2FuaGFtcmE1MTg5&gsxid=gYDvgLHCo1Ur&utm_medium=affiliate)
    - [Agency Cloneable Hero Section - Webflow](https://webflow.com/made-in-webflow/website/Agency-Cloneable-Hero-Section)
    - [DF Communications - Webflow](https://webflow.com/made-in-webflow/website/DF-Communications)
- Parallax Landing Page
    - [Evmos Rebuild - Webflow](https://webflow.com/made-in-webflow/website/evmos-rebuild?gspk=ZHVuY2FuaGFtcmE1MTg5&gsxid=IGUCID9qlBGX&utm_medium=affiliate)
- Cards
    - [Responsive Card Slider - Webflow](https://webflow.com/made-in-webflow/website/Responsive-Card-Slider)
    - [Stories by BuildBites - Webflow](https://webflow.com/made-in-webflow/website/Stories-by-BuildBites)
    - [section-scroll-tennis-court - Webflow](https://webflow.com/made-in-webflow/website/section-scroll-tennis-court)
- Tabs
    - [Webflow Tabs Template - Made with Client-first - Webflow](https://webflow.com/made-in-webflow/website/Webflow-Tabs-Template-Made-with-Client-first?ref=made-in-webflow-search&searchValue=framed%20tabs)
    - [NoCode - Tab List as Dropdown - Webflow](https://webflow.com/made-in-webflow/website/NoCode-Tab-List-as-Dropdown?ref=made-in-webflow-search&searchValue=framed%20tabs)
    - [Turn Tabs Into a Dropdown Menu on Mobile Devices. - Webflow](https://webflow.com/made-in-webflow/website/Webflow-Tabs-as-Dropdown-Menus-on-Mobile?ref=made-in-webflow-search&searchValue=framed%20tabs)
    - [Tabs Style - Webflow](https://webflow.com/made-in-webflow/website/Tabs-Style?ref=made-in-webflow-search&searchValue=framed%20tabs)
    - [Cloneable Tabs Section - Webflow](https://webflow.com/made-in-webflow/website/Cloneable-Tabs-Section?ref=made-in-webflow-search&searchValue=framed%20tabs)
    - [3 Website Tabs Webflow Template | BRIX Templates - Webflow](https://webflow.com/made-in-webflow/website/3-Website-Tabs-Webflow-Template-or-BRIX-Templates?ref=made-in-webflow-search&searchValue=framed%20tabs)
    - [Webflow Tab Auto Rotation - Webflow](https://webflow.com/made-in-webflow/website/Webflow-Tab-Auto-Rotation?ref=made-in-webflow-search&searchValue=framed%20tabs)
    - [Landing Page ( Dark Mode ) with Tabs, Progress bar and Dark/Light Switch - Webflow](https://webflow.com/made-in-webflow/website/Landing-Page-Dark-Mode-with-Tabs-Progress-bar-and-DarkLight-Switch?ref=made-in-webflow-search&searchValue=framed%20tabs)
    - [Various tab navigation and tab content animations - Webflow](https://webflow.com/made-in-webflow/website/tab-nav-animation?ref=made-in-webflow-search&searchValue=dark%20tabs)
    - [Custom Responsive Tabs - Webflow](https://webflow.com/made-in-webflow/website/custom-responsive-tabs?ref=made-in-webflow-search&searchValue=dark%20tabs)
- File Upload
    - [Animated button for downloading files - Webflow](https://webflow.com/made-in-webflow/website/gig-share-upload-button?ref=made-in-webflow-search&searchValue=multiple%20files)
    - [Flowbase - File Upload - Webflow](https://webflow.com/made-in-webflow/website/Free-File-Upload?ref=made-in-webflow-search&searchValue=file%20upload)
- Resources Page / Webflow Resources
    - [Webflow Resources - Webflow](https://webflow.com/made-in-webflow/website/Webflow-Resources?ref=made-in-webflow-search&searchValue=tools)
    - [Flowsource - Webflow](https://webflow.com/made-in-webflow/website/Flowsource?ref=made-in-webflow-search&searchValue=tools)
    - [Refokus Tools - Webflow](https://webflow.com/made-in-webflow/website/Refokus-Tools?ref=made-in-webflow-search&searchValue=tools)
    - [FlowTools - Webflow](https://webflow.com/made-in-webflow/website/flowtools?ref=made-in-webflow-search&searchValue=tools)
    - [Notionery - Webflow](https://webflow.com/made-in-webflow/website/notionery-new?ref=made-in-webflow-search&searchValue=tools)
    - [Darkweb X - Dark Mode Webflow Template | BRIX Templates - Webflow](https://webflow.com/made-in-webflow/website/darkwebtemplate-showcase?ref=made-in-webflow-search&searchValue=dark%20theme)
    - 
- Webflow tools
    - [Class Adder Interactions Tool - How To - Webflow](https://webflow.com/made-in-webflow/website/Class-Adder-Interactions-Tool-How-To?ref=made-in-webflow-search&searchValue=tools)
    - 
- Tables
    - [jsistudio-interactive-table - Webflow](https://webflow.com/made-in-webflow/website/jsistudio-interactive-table?ref=made-in-webflow-search&searchValue=framed%20tabs)
- App / Solution Knowledgebase
    - [Notionery - Webflow](https://webflow.com/made-in-webflow/website/notionery-new?ref=made-in-webflow-search&searchValue=tools)
    - 
- Code / Text Editor / Snippets
    - [Rich Text Editor For WEBFLOW! - Webflow](https://webflow.com/made-in-webflow/website/Rich-Text-Editor-For-WEBFLOW?ref=made-in-webflow-search&searchValue=code%20editor)
    - [Cloneable Code Snippets Copy Box Embed - Webflow](https://webflow.com/made-in-webflow/website/Cloneable-Code-Snippets-Copy-Box-Embed?ref=made-in-webflow-search&searchValue=text%20box)
    - [Copy to Clipboard (by Refokus) - Webflow](https://webflow.com/made-in-webflow/website/Copy-to-Clipboard-by-Refokus?ref=made-in-webflow-search&searchValue=text%20box%20copy)
- Gradient
    - [Ultra Gradients in Webflow (Cloneable) - Webflow](https://webflow.com/made-in-webflow/website/ultra-gradients)

## Animations for Webflow

- [LottieFiles - Download Free Lottie Animations, Integrations & Plugins](https://lottiefiles.com/)
    - [https://lottiefiles.com/109382-technology-network](https://lottiefiles.com/109382-technology-network)
- [particles-js](https://particles-js.webflow.io/)
    - [https://vincentgarreau.com/particles.js/](https://vincentgarreau.com/particles.js/)
- https://github.com/matteobruni/tsparticles