

[Securing Speed: Safeguarding CI/CD Pipelines for Robust Software Delivery](https://www.youtube.com/watch?v=vd5JpQB_owg)

- Some companies do "chaos engineering" to test operational resilience
- There are lots of jobs where AGILE move fast and break things is not tenable or pragmatic
- DevSecOps model
    - Plan, develop, build, test, release, operate, observe
- The real phases of devsecops
    - Pre-Source Control
        - lives on computers
    - In Source Control
    - Deployment
    - Operations - is it still running?
- Principles
    - Automate everything
    - Be lazy
    - Scale all the things
    - Measure
- Automating helps you understand the systems better

# Mission 1 - Secure the Code
- AI makes it easy to generate bad and not scalable code
- Humans make insecure code

# Mission 2 - Secure the Repo
- People overlook the IAM of code repos
- Secure the Github Org
    - Public Org - allows forks, public repos, OSS
    - Secure Org - No Forks, no public repos, strict tags
- Your code as code but with code
    - Terraform
    - IAC workflows are good - transparency - devs don't have full admin and visibility on policies, so IAC sort of documents things 
    - Control with IAC is still connected with personal access tokens in GitHub - it's annoying but we have to live with it for now
- Intent-based security
    - Start with intention and map abstractions to your actual intentions to be sure
- Use strict tagging in github to drive access models and implementation
- Branch protection
    - Ensure that reviews are required - enforce minimum security standards

https://www.youtube.com/live/vd5JpQB_owg?si=V3j4Z4QM_hYRKk5-&t=1240