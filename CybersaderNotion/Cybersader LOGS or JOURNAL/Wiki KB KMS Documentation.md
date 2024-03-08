# Wiki/KB/KMS/Documentation

# My Picks

## Personal

- Free, Publish, Features, Sync
    - [Obsidian](https://obsidian.md/) - might be difficult to use large-scale. Also uses markdown
        - Use Obsidian Git community plugin
        - Use gitignore wisely
        - Community plugins to make markdown and attachment use easy for looking at MD in GitHub
            - Attachment Management
            - Copy Image and URL context menu
            - Paste URL into selection
            - Recent Files
            - Various Complements
- Where syncing needs to always work, you want unlimited storage, and you don’t care about turning into a website via CMS workflow
    - Notion

## Business

- In a business, to make things easy always stick with plaintext and Markdown
- Obsidian with the Git plugin is awesome, but it’s $4.2 per month (50 dollars a year) per user
    - Can have some security concerns (give and take) with community plugins.  Just don’t trust them 100%
- Use Logseq with Git
    - I haven’t tried this, but from what I can tell, this platform is free, open source, and you just have to integrate it with something like Git
    - To make this work large scale so that wikis can be operated via GitHub and seen in GitHub, there are things that one MUST get right:
        - Find a way to easily use relative paths for images and internal links in the tool
        - Use markdown formatted links and not Wikilinks
    - [Logseq sync with Git and GitHub – Logseq Community Hub](https://hub.logseq.com/integrations/aV9AgETypcPcf8avYcHXQT/logseq-sync-with-git-and-github/krMyU6jSEN8jG2Yjvifu9i)
- If you don’t care about spending 8 dollars per month per user, then you can go with Notion, but migration out of it is not easy
- Other Self-Hosted Options:
    - AppFlowy
        - Pros: A lot like Notion. Web-based. Self-hosted.
        - Cons: Not as many integrations as Notion
    - CodiLIA - self hosted version of HackMD
    - Outline
        - Pros: lots of features and integrations. Web-based. Collaborative. Price that can cover lots of users.
        - Cons: Might be hard to migrate to.
    - Wiki.js
        - Pros: Very extensive and flexible. Can use lots of formats. Tons of features. Can host in various setups. Full-blown wiki.
        - Cons: Takes awhile to setup and manage (Digital Ocean does have a 1-click option though.) Might have a very steep learning curve. Clunky.

# Curated

## Can do Collab

- HackMD - uses Markdown format for notes
    - [HackMD - Collaborative Markdown Knowledge Base](https://hackmd.io/)
    - ‣ - CodiMD - Realtime collaborative markdown notes on all platforms. Built atop HackMD
        - [LiaScript/CodiLIA - Buttons - Heroku Elements](https://elements.heroku.com/buttons/liascript/codilia)
        - [https://hackmd.io/c/codimd-documentation/%2Fs%2Fcodimd-documentation](https://hackmd.io/c/codimd-documentation/%2Fs%2Fcodimd-documentation)
- [Obsidian](https://obsidian.md/) - might be difficult to use large-scale. Also uses markdown
    - Can do collab through a git-based workflow with an Obsidian plugin, or utilize an API
    - Maybe Obsidian Sync can do this
- [Notion – Your wiki, docs & projects. Together.](https://www.notion.so/product)
- [AppFlowy.IO](https://appflowy.io/) - alternative to Notion. Can be self-hosted
    - [appflowyio's Profile | Docker Hub](https://hub.docker.com/u/appflowyio)
- [Slite – Your Modern Knowledge Base](https://slite.com/?redirect=no) - proprietary. Bit too expensive IMO.
- [Outline – Team knowledge base & wiki](https://www.getoutline.com/)
    - [https://elements.heroku.com/search/buttons?q=wiki](https://elements.heroku.com/search/buttons?q=wiki)
    - [https://elements.heroku.com/buttons/outline/outline](https://elements.heroku.com/buttons/outline/outline)
    - [outlinewiki/outline - Docker Image | Docker Hub](https://hub.docker.com/r/outlinewiki/outline)
- Wiki-Focused
    - [Wiki.js](https://js.wiki/) - pretty awesome and open source so you can host it yourself and “own your data.”
        - [Wiki.js | DigitalOcean Marketplace 1-Click App](https://marketplace.digitalocean.com/apps/wiki-js)
        - [https://azuremarketplace.microsoft.com/en-us/marketplace/apps?search=wiki&page=1](https://azuremarketplace.microsoft.com/en-us/marketplace/apps?search=wiki&page=1)
        - [https://elements.heroku.com/buttons/salin1810/tailscale-heroku-wiki-quick-deploy](https://elements.heroku.com/buttons/salin1810/tailscale-heroku-wiki-quick-deploy)
        - [https://aws.amazon.com/marketplace/search/results?searchTerms=wiki](https://aws.amazon.com/marketplace/search/results?searchTerms=wiki)
        - [requarks/wiki - Docker Image | Docker Hub](https://hub.docker.com/r/requarks/wiki)
    - [https://tiki.org/HomePage](https://tiki.org/HomePage)
        - [https://azuremarketplace.microsoft.com/en-us/marketplace/apps?search=wiki&page=1](https://azuremarketplace.microsoft.com/en-us/marketplace/apps?search=wiki&page=1)
        - [https://aws.amazon.com/marketplace/search/results?searchTerms=wiki](https://aws.amazon.com/marketplace/search/results?searchTerms=wiki)
    - [XWiki - The Advanced Open Source Enterprise and Application Wiki (XWiki.org)](https://www.xwiki.org/xwiki/bin/view/Main/)
        - [xwiki - Official Image | Docker Hub](https://hub.docker.com/_/xwiki)
    - [MediaWiki](https://www.mediawiki.org/wiki/MediaWiki) - Wikipedia runs on this
        - [https://azuremarketplace.microsoft.com/en-us/marketplace/apps?search=wiki&page=1](https://azuremarketplace.microsoft.com/en-us/marketplace/apps?search=wiki&page=1)
        - [https://aws.amazon.com/marketplace/search/results?searchTerms=wiki](https://aws.amazon.com/marketplace/search/results?searchTerms=wiki)
        - [mediawiki - Official Image | Docker Hub](https://hub.docker.com/_/mediawiki)
- [https://www.nuclino.com/](https://www.nuclino.com/) - proprietary
    - [https://azuremarketplace.microsoft.com/en-us/marketplace/apps?search=wiki&page=2](https://azuremarketplace.microsoft.com/en-us/marketplace/apps?search=wiki&page=2)
- https://github.com/BookStackApp/BookStack - A platform to create documentation/wiki content built with PHP & Laravel
    - [linuxserver/bookstack - Docker Image | Docker Hub](https://hub.docker.com/r/linuxserver/bookstack)
- https://github.com/gollum/gollum - git based wiki - really barebones - not fun editing in my opinion
    - [https://elements.heroku.com/buttons/naoa/gollum-on-heroku](https://elements.heroku.com/buttons/naoa/gollum-on-heroku)
    - [gollumwiki/gollum - Docker Image | Docker Hub](https://hub.docker.com/r/gollumwiki/gollum)
- [Boost Note | Chronicle your Stories](https://boostnote.io/)
- [Etherpad](https://etherpad.org/)
    - [etherpad/etherpad - Docker Image | Docker Hub](https://hub.docker.com/r/etherpad/etherpad)
- [Dendron](https://www.dendron.so/) - too nerdy, but cool. A little bit too much work
- [AFFiNE - All In One Workos](https://affine.pro/)
    - [Package affine-self-hosted](https://github.com/toeverything/AFFiNE/pkgs/container/affine-self-hosted)
- [Joplin](https://joplinapp.org/)
    - [Unofficial alternative Joplin distributions - Lounge - Joplin Forum](https://discourse.joplinapp.org/t/unofficial-alternative-joplin-distributions/23703)
    - [joplin/server - Docker Image | Docker Hub](https://hub.docker.com/r/joplin/server)
- [Logseq: A privacy-first, open-source knowledge base](https://logseq.com/)

## Unique

- [Visual & Spatial Knowledge Tool – Infinity Maps](https://infinitymaps.io/en/knowledge-tool/?utm_medium=social&utm_source=producthunt&utm_campaign=launch&ref=producthunt)

## Misc Docs/Notes

- [foambubble/foam: A personal knowledge management and sharing system for VSCode](https://github.com/foambubble/foam)
- [Reflect](https://reflect.app/home)
- [Typed — Connecting the Docs](https://typed.do/?ref=producthunt)
- [Hyperdraft](https://hyperdraft.rosano.ca/)
- [A simpler way to organize your work - Workflowy](https://workflowy.com/)
- [Home - Dynalist](https://dynalist.io/)
- [Transno - Outlines, Notes, Mind Map](https://transno.com/)
- [Notesnook | Open source & zero knowledge private note taking app](https://notesnook.com/)
- [A Markdown Editor for the 21st Century | Zettlr](https://www.zettlr.com/)
- [Choose your plan | Boost Note](https://boostnote.io/pricing)
- https://github.com/WuTheFWasThat/vimflowy
    - [vimflowy/vimflowy - Docker Image | Docker Hub](https://hub.docker.com/r/vimflowy/vimflowy)
- [GitJournal](https://gitjournal.io/) - phone notes you can hook up to a github repo
- https://github.com/notea-org/notea - Self hosted note taking app stored on S3
- [tiddlyroam · your open source external brain](https://tiddlyroam.org/)
- [RemNote](https://www.remnote.com/)
- Athens - [Collaborative Knowledge Graph for Startups Teams](https://www.athensresearch.org/) - only collaborative in beta

# Deployment

## Deploying to cloud with Docker

- 

# Email

**Web-based:**

- Notion -
    - Pros: tons of features and integrations, well-known.
    - Cons: Not easy to migrate to. Prices can add up. Lots of lockin. Sometimes clunky. Security/Privacy????
- Confluence -
    - Pros: enterprises use this a lot. Part of Atlassian, so it's good if you use Atlassian already.
    - Cons: might be pricey. Might have a lot of vendor lockin. Don't know this one as much.
- HackMD - simply a collaborative markdown knowledgebase
    - Pros: universal markdown (MD) format. Online. Can be selfhosted with CodiLIA.
    - Cons: Takes a bit of time to get used to Markdown setup. Lack of features or integrations. Security/Privacy????
- Outline
    - Pros: lots of features and integrations. Web-based. Collaborative. Price that can cover lots of users. Might still be cheaper than Notion.
    - Cons: Cloud-based can be expensive 80 a month. Security/Privacy????
- Slite - don't know much, but kinda expensive.

**Desktop options with collab plugins:**

- Obsidian -
    - Pros: very popular with security and privacy pros. Has a sync option and tons of plugins to create a connection to the cloud. Can be COMPLETELY FREE with Git plugin and nothing else. Everything is saved in GitHub repo using that workflow.
    - Cons: requires a desktop app...pretty sure. Git plugin may be clunky.

**Want to manage it yourself / open source:**

- AppFlowy
    - Pros: A lot like Notion. Web-based. Self-hosted.
    - Cons: Not as many integrations as Notion
- CodiLIA - self hosted version of HackMD
- Outline
    - Pros: lots of features and integrations. Web-based. Collaborative. Price that can cover lots of users.
    - Cons: Might be hard to migrate to.
- Wiki.js
    - Pros: Very extensive and flexible. Can use lots of formats. Tons of features. Can host in various setups. Full-blown wiki.
    - Cons: Takes awhile to setup and manage (Digital Ocean does have a 1-click option though.) Might have a very steep learning curve.

## Links

• Confluence - if you're using Atlassian already...might be good
    ◦ [https://www.atlassian.com/software/confluence/pricing](https://www.atlassian.com/software/confluence/pricing)
• HackMD - uses Markdown format for notes
    ◦ [HackMD - Collaborative Markdown Knowledge Base](https://hackmd.io/)
    ◦ [https://github.com/LiaScript/CodiLIA](https://github.com/LiaScript/CodiLIA) - CodiMD - Realtime collaborative markdown notes on all platforms. Built atop HackMD
        ▪ [LiaScript/CodiLIA - Buttons - Heroku Elements](https://elements.heroku.com/buttons/liascript/codilia)
        ▪ [https://hackmd.io/c/codimd-documentation/%2Fs%2Fcodimd-documentation](https://hackmd.io/c/codimd-documentation/%2Fs%2Fcodimd-documentation)
• [Obsidian](https://obsidian.md/) - might be difficult to use large-scale. Also uses markdown
    ◦ Can do collab through a git-based workflow with an Obsidian plugin, or utilize an API
    ◦ Maybe Obsidian Sync can do this
• [Notion – Your wiki, docs & projects. Together.](https://www.notion.so/product)
• [AppFlowy.IO](https://appflowy.io/) - alternative to Notion. Can be self-hosted
    ◦ [appflowyio's Profile | Docker Hub](https://hub.docker.com/u/appflowyio)
• [Slite – Your Modern Knowledge Base](https://slite.com/?redirect=no) - proprietary. Bit too expensive IMO.
• [Outline – Team knowledge base & wiki](https://www.getoutline.com/)
    ◦ [https://elements.heroku.com/search/buttons?q=wiki](https://elements.heroku.com/search/buttons?q=wiki)
    ◦ [https://elements.heroku.com/buttons/outline/outline](https://elements.heroku.com/buttons/outline/outline)
    ◦ [outlinewiki/outline - Docker Image | Docker Hub](https://hub.docker.com/r/outlinewiki/outline)
• Wiki-Focused
    ◦ [Wiki.js](https://js.wiki/) - pretty awesome and open source so you can host it yourself and “own your data.”
        ▪ [Wiki.js | DigitalOcean Marketplace 1-Click App](https://marketplace.digitalocean.com/apps/wiki-js)
        ▪ [https://azuremarketplace.microsoft.com/en-us/marketplace/apps?search=wiki&page=1](https://azuremarketplace.microsoft.com/en-us/marketplace/apps?search=wiki&page=1)
        ▪ [https://elements.heroku.com/buttons/salin1810/tailscale-heroku-wiki-quick-deploy](https://elements.heroku.com/buttons/salin1810/tailscale-heroku-wiki-quick-deploy)
        ▪ [https://aws.amazon.com/marketplace/search/results?searchTerms=wiki](https://aws.amazon.com/marketplace/search/results?searchTerms=wiki)
        ▪ [requarks/wiki - Docker Image | Docker Hub](https://hub.docker.com/r/requarks/wiki)