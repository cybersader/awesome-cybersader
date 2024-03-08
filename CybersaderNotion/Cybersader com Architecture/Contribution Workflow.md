# Contribution Workflow

# Connecting GitHub and Notion

## Contribution Architecture

![Untitled](Contribution%20Workflow/Untitled.png)

## Contributions through GitHub

- CONTRIBUTIONS:
    
    Requirements:
    
    - Add button automatically for notaku pages to update or contribute via GitHub
        - GitHub contribution workflows:
            - Fork & Pull Request
            - Individual contribution Per Page??

## Resources

- Delete Commit History
    - [https://stackoverflow.com/questions/13716658/how-to-delete-all-commit-history-in-github](https://stackoverflow.com/questions/13716658/how-to-delete-all-commit-history-in-github)
- Notion → Git Repo
    - https://github.com/richartkeil/notion-guardian
        - backs up the notion workspace onto a git repository
        - this is better than using an automation service, because it will update intermittently as things are updated in Notion
        - this can be manually activated with another service intermittently via Python code or some other workflow
        - schedule this to run on each notaku sync or during each page update
        - this allows for special contributors and members to consistently update the notion
        - this also allows for accurate versioning of the notion knowledgebase
        - FIGURE OUT HOW TO NAME EACH UPDATE/COMMIT
    - Tommy from Notaku is going to develop an automation to push Notion page to GitHub Repo
- Git Repo → Notion
    - [Connect APIs, Remarkably Fast - Pipedream](https://pipedream.com/)
    - https://github.com/NarekA/git-notion
    - Use https://github.com/asmeurer/git-workflow for contribution workflow
    - Link Contribution somehow in Notaku and in Notion
- Random
    - [Make | Work the way you imagine](https://www.make.com/en)
    - [Connect APIs, Remarkably Fast - Pipedream](https://pipedream.com/)
    - [Zapier | Automation that moves you forward](https://zapier.com/)
    - [IFTTT](https://ifttt.com/)
    - [n8n.io - a powerful workflow automation tool](https://n8n.io/)
    - GITHUB or SCRIPTED SOLUTIONS:
        - https://github.com/NarekA/git-notion
        - https://github.com/richartkeil/notion-guardian
        - https://github.com/upleveled/notion-backup
        - https://github.com/5hay/notionbackup
        - [Automated Notion backups. I’ve been using Gitlab for years to… | by Artur Burtsev | Medium](https://artur-en.medium.com/automated-notion-backups-f6af4edc298d)
    - GitHub Apps & Actions
        - Static Website Generators
            - https://github.com/marketplace/motionlink
        - Notion to Github
            - [notion-md-gen · Actions · GitHub Marketplace](https://github.com/marketplace/actions/notion-md-gen)
            - [Notion Exporter · Actions · GitHub Marketplace](https://github.com/marketplace/actions/notion-exporter)
            - [notion-to-markdown · Actions · GitHub Marketplace](https://github.com/marketplace/actions/notion-to-markdown)
        - GitHub to Notion
            - [Readme to Notion Action · Actions · GitHub Marketplace](https://github.com/marketplace/actions/readme-to-notion-action)
            - [Notion Sync MD Page · Actions · GitHub Marketplace](https://github.com/marketplace/actions/notion-sync-md-page)
    - COMMUNITY ANALYTICS:
        - [crowd.dev | Community-led Growth Platform](https://www.crowd.dev/)
- Notion API
    - API Reference
        - [https://developers.notion.com/reference/intro](https://developers.notion.com/reference/intro)
        - [https://developers.notion.com/reference/get-block-children](https://developers.notion.com/reference/get-block-children)
    - API Wrappers
        - Javascript for Appsmith
            - [https://github.com/search?l=JavaScript&q=notion+API+wrapper&type=Repositories](https://github.com/search?l=JavaScript&q=notion+API+wrapper&type=Repositories)
            - https://github.com/makenotion/notion-sdk-js

## Notion to Git

## Developing Git-to-Notion Integration

### **Notion Sync MD Page -** [https://github.com/marketplace/actions/notion-sync-md-page](https://github.com/marketplace/actions/notion-sync-md-page)

- Made sure to put Notion API Key into GitHub environment - [Secrets in GitHub Actions - Octopus Deploy](https://octopus.com/blog/githubactions-secrets)
- Got API Key from [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
- Using GitHub Action:
    - had to paste in Notion page URL to connect it

### Readme to Notion - [https://github.com/marketplace/actions/readme-to-notion-action](https://github.com/marketplace/actions/readme-to-notion-action)

- Didn’t work
- URL error