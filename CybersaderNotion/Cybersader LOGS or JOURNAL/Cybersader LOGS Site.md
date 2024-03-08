# Cybersader LOGS Site

# Workspace

[Cybersader Logs - Notes](Cybersader%20LOGS%20Site/Cybersader%20Logs%20-%20Notes.md)

# Cybersader Logs Tech Stack, Architecture, Flow

Generally it’ll go:

- Obsidian as a CMS:
    - Content is managed in an obsidian vault locally
- Obsidian-to-GitHub Repo:
    - Use to the Git Obsidian Plugin to push to Github
- GitHub repo:
    - Obsidian vault is stored completely in the repo
- GitHub-to-Eleventy:
    - Use Eleventy fetch to get the markdown content dynamically from the GitHub repo
- Netlify or another serverless function to build
- Deploy

# Logs Features, Design, and Ideas

## Home Page

- Home page will have a navigation bar with home, archive, tags, and social links for Linkedin, and GitHub.
- Below the navigation bar, there will be animated text that looks cool which is GPT generated using the OpenAI API with GPT 3.5. This text should summarize some date range of the most recent logs/journal entries (past week/month/year). This text should be changing or rotating to show different summaries of past work and should say something like “Cybersader has been working on….<GPT generated stuff>”
- Below the rotating GPT summary the most recent posts in order with an easy to read timedate format, along with a description and tags.
- Posts should be paginated, and there should be a filter for them
- The filter can be comprehensive too.

## Archives Page

- Archive Page to explore the logs over time rather than just the most recent ones
    - Page should have a breadcrumb organization system to put journal/logs pages into a structure that can be easily navigated. Ideally, an innovative and cool CSS or JS-powered client-side UI thing would be really cool to navigate.
- Feature datavisualization in archives that shows tag usage across time or trends in a graphical format.  This could use nivo dataviz components or something else that is hoverable and stuff

# Ideas

- When //TODO shows up a todo item is automatically added somehow or something like that — maybe
- Try using Turborepo or Nx for a big monorepo? - [Turbo](https://turbo.build/) and [Nx: Smart, Fast and Extensible Build System](https://nx.dev/) … I probably don’t need this though lol.

# Cybersader Logs - Tech Stack, Arch, Solutions

## Logseq > GitHub

- [https://hub.logseq.com/integrations/aV9AgETypcPcf8avYcHXQT/logseq-sync-with-git-and-github/krMyU6jSEN8jG2Yjvifu9i](https://hub.logseq.com/integrations/aV9AgETypcPcf8avYcHXQT/logseq-sync-with-git-and-github/krMyU6jSEN8jG2Yjvifu9i)

## Obsidian > GitHub

- [Create Blog/documentation using obsidian + 11ty + github pages - Share & showcase - Obsidian Forum](https://forum.obsidian.md/t/create-blog-documentation-using-obsidian-11ty-github-pages/20775/2)
- [Plugins - Obsidian](https://obsidian.md/plugins?search=git) - plugins for obsidian
    - https://github.com/markbase-obsidian/obsidian-markbase - Official [Markbase](https://markbase.xyz/)
     plugin to share your Obsidian notes online in your own digital garden. Easily sync and publish your docs, notes, and digital gardens.
    - https://github.com/yaleiyale/obsidian-emo-uploader - Use image/file hosting in Obsidian by clipboard or draging file.
    - https://github.com/ObsidianPublisher/obsidian-github-publisher - A plugin to easily publish note to github using a frontmatter state entry.
    - https://github.com/denolehov/obsidian-git - Backup your [Obsidian.md](http://obsidian.md/) vault with git.
    - https://github.com/oleeskild/obsidian-digital-garden - Publish your notes in your own personal digital garden. Publish your notes to the web, for free. In your own personal garden.
    - https://github.com/kometenstaub/copy-publish-url - Copy or open the Obsidian Publish URL of a note. You can also open its Git commit history on GitHub.
    - https://github.com/kometenstaub/obsidian-version-history-diff - Get a diff view of your Obsidian Sync, File Recovery and Git version history.
- Some options to interface my Obisidian vault with the JAMStack
    1. Git-based workflow: Obsidian allows you to store your notes as plain text Markdown files, which can be easily synced to a Git repository like GitHub, GitLab, or Bitbucket. You can use a Git-based CMS like Netlify CMS, Forestry.io, or TinaCMS to manage and edit your notes from a web interface, and then generate your static site using a site generator like Gatsby, Next.js, or Hugo.
    2. API-based workflow: Obsidian can also be configured to automatically export your notes to a cloud storage service like Dropbox, Google Drive, or OneDrive. You can then use a headless CMS like Strapi, Ghost, or Contentful to connect to these cloud storage services via their APIs, and use the CMS to manage and edit your notes. You can then generate your static site using a site generator that supports your headless CMS.
    3. Obsidian as CMS (fully managed): If you prefer to use Obsidian as your primary content management system, you can generate your static site directly from your Obsidian vault using a plugin like Obsidian Publish or Publish with Obsidian. These plugins allow you to export your notes as a static website, which can then be deployed to a hosting service like Netlify or GitHub Pages.

# Random Resources

## JAMStack - Headless CMS, SSG

- https://github.com/b-long/awesome-static-hosting-and-cms
- [myles/awesome-static-generators: A curated list of static web site generators.](https://github.com/myles/awesome-static-generators#wikis)
- [Static Site Generators - Top Open Source SSGs | Jamstack](https://jamstack.org/generators/)
- [Headless CMS - Top Content Management Systems | Jamstack](https://jamstack.org/headless-cms/)

### Headless CMS

- [Strapi - Open source Node.js Headless CMS 🚀](https://strapi.io/)
- [Prose · A Content Editor for GitHub](https://prose.io/) - [Prose | Jamstack](https://jamstack.org/headless-cms/prose/) - edit GitHub markdown and Jekyll content - for GitHub pages
- [Coisas | Jamstack](https://jamstack.org/headless-cms/coisas/) - edit GitHub files from Coisas
- [Build contextual editing into your site | Tina](https://tina.io/) - git-based, MDX, Next-JS
- [Spinal | Jamstack](https://jamstack.org/headless-cms/spinal/) - cool but wont help with Obsidian

### Site Generators

- [Astro | Jamstack](https://jamstack.org/generators/astro/) - really flexible and I think it has everything I want. I just need to figure out how to interface the GitHub repos with the site generator automatically. Maybe I can use serverless functions for this with a custom API of something?
- [Eleventy, a simpler static site generator](https://www.11ty.dev/) - everything I need a really fast.

### Misc Templates & Boilerplate

- [Starter Projects — Eleventy](https://www.11ty.dev/docs/starter/)
- [50 Best Eleventy Starter Themes [2021] | EASEOUT](https://www.easeout.co/blog/2021-01-28-50-best-eleventy-starter-themes-2021/)
- https://github.com/marcamos/jet - just 11ty and tailwind
- [Tailwind Toolbox - Free Starter Templates](https://www.tailwindtoolbox.com/starter-templates)
- https://github.com/philhawksworth/eleventyone

## Journal / Logs to Website Options/Ideas

- **Obsidian —> GitHub —> Serverless Function to Migrate Parts of Repo (Netlify, AWS CodeBuild, Cloudflare) —> 11ty repo —> Build with Netlify or Cloudflare Pages → Deploy**
    - Obsidian > GitHub (obsidian markdown repo)
        - Push to GitHub using Obsidian Git Plugin
    - GitHub to Parsing (parse into 11ty repo)
        - Serverless Function uses Webhook to watch for pushes
        - At build time, it parses the markdown using a configuration, and puts the code into the 11ty repo
    - Buildtime in Netlify or Cloudflare
        - build the 11ty code from the 11ty code repo
- **Obsidian —> GitHub —> GitHub Actions —> 11ty**
- **Obsidian —> GitHub repo (with vault content) —> GitHub Action —> GitHub repo with Eleventy Code and Content (”_data”) —> Build Time (GitHub actions, Cloudflare, Netlify) —> 11ty**
- **Obsidian —> Serverless API maker —> 11ty repo —> Build with Netlify or Cloudflare Pages**
- **Obsidian —> GitHub repo (with vault content) — [REST API] —> 11ty repo —> Build with Netlify or Cloudflare Pages**

### Building from GitHub Markdown

- [Cloudflare Pages documentation · Cloudflare Pages docs](https://developers.cloudflare.com/pages/)
- [Netlify Build](https://www.netlify.com/products/build/)
- GitHub Actions Marketplace items around 11ty
    - [https://github.com/marketplace?type=&verification=&query=11ty+](https://github.com/marketplace?type=&verification=&query=11ty+)
    - [https://github.com/marketplace?query=eleventy+](https://github.com/marketplace?query=eleventy+)
    - [Eleventy Action · Actions · GitHub Marketplace](https://github.com/marketplace/actions/eleventy-action)

### Connecting GitHub Repo with Vault Content to Eleventy Repo

- [Integrating Eleventy with GitHub Flat Data](https://www.raymondcamden.com/2021/07/14/integrating-eleventy-with-github-flat-data)
    - [GitHub Next | Flat Data](https://githubnext.com/projects/flat-data)

### GitHub REST API Stuff

- GitHub REST API documentation: **[https://docs.github.com/en/rest](https://docs.github.com/en/rest)**
- Creating a personal access token: **[https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)**

### Converting Wiki Links in Obsidian to MD

- https://github.com/alexjv89/markdown-it-obsidian
- https://github.com/agathauy/wikilinks-to-mdlinks-obsidian

### Example Projects

- https://github.com/switchless-io/docs, https://github.com/alexjv89/echoalex_com

# Eleventy Stuff

- Builing 11ty with Tailwind
    - [Detailed Guide to build a 11ty / eleventy & tailwindCSS static site | 5 Balloons](https://5balloons.info/guide-tailwindcss-eleventy-static-site/)
- Fetching Content
    - [Adding dynamic content from an API to a static website at build time - griffa.dev](https://griffa.dev/posts/adding-dynamic-content-from-an-api-to-a-static-website-at-build-time/)
    - [Fetch — Eleventy](https://www.11ty.dev/docs/plugins/fetch/)
- Learning 11ty and how the content connects to the code:
    - [Learn Eleventy From Scratch | Learn Eleventy From Scratch](https://learneleventyfromscratch.com/)
    - [I Finally Understand Eleventy's Data Cascade.](https://benmyers.dev/blog/eleventy-data-cascade/#step-7-computed-data) - how the content gets attached to the Eleventy code (which generates the site from content + template + html & css)
    - [Data Cascade — Eleventy](https://www.11ty.dev/docs/data-cascade/)
    - [Deployment — Eleventy](https://www.11ty.dev/docs/deployment/)
- Misc
    - [Static site delivery automation with Eleventy & Buddy | Buddy: The DevOps Automation Platform](https://buddy.works/guides/buddy-eleventy)
    - [Glitch: The friendly community where everyone builds the web](https://glitch.com/) - run and edit Eleventy projects online
    - [Hosting Eleventy on GitHub Pages - Quinn Dombrowski](https://quinndombrowski.com/blog/2022/05/07/hosting-eleventy-on-github-pages/)
    - [Integrating Eleventy with GitHub Flat Data](https://www.raymondcamden.com/2021/07/14/integrating-eleventy-with-github-flat-data)

# Misc Obsidian CMS

## Obsidian Git

- [How to sync Obsidian vault for free using Git? | Samuel Wong — Hong Kong UI/UX Designer | Desktop of Samuel](https://desktopofsamuel.com/how-to-sync-obsidian-vault-for-free-using-git)
- [Sync Your Obsidian Vault for Free with Github – Curtis McHale](https://curtismchale.ca/2022/05/18/sync-your-obsidian-vault-for-free-with-github/)

## CMS articles

- [How to Publish Your Obsidian Notes Online For Free | by Prakash Joshi Pax | Medium](https://beingpax.medium.com/how-to-publish-your-obsidian-notes-online-for-free-851af90e797) - Gatsy based
- [Using Obsidian as a CMS | Frank Noirot](https://franknoirot.co/posts/obsidian-cms) - Next-Js based with GitHub action
- [Using Obsidian as CMS for a Website: Benefits & Considerations](https://www.simaec.net/website-development/using-obsidian-as-cms/) - Jekyll and GitHub pages
- [Static Site Generators: any guides? - Resolved help - Obsidian Forum](https://forum.obsidian.md/t/static-site-generators-any-guides/8915)
    - [Foam | A personal knowledge management and sharing system for VSCode](https://foambubble.github.io/foam/)

# GPT Q&A

[GPT convo](Cybersader%20LOGS%20Site/GPT%20convo.md)

[GPT Convo](Cybersader%20LOGS%20Site/GPT%20Convo.md)