
# Self Hosting Costs

- Self-hosted support requires an Enterprise license
    - https://community.bitwarden.com/t/pricing-for-business-solutions-and-cost-of-self-hosting/58772/2
- You can use self-hosted version like vaultwarden, but you could have drastic issue later on due to them not being officially through Bitwarden

# Links
- [How to Setup Self Hosted Bitwarden](https://www.youtube.com/watch?v=SSLGa0LjTrA)
- https://bitwarden.com/help/install-on-premise-linux/
- https://bitwarden.com/help/backup-on-premise/
- 

# Setting Up Bitwarden On-Prem
- Caveats/Pre-reqs
    - You need an SMTP server to send sign-ups
    - You need a valid SSL cert
- Can deploy on Linux pretty easily
- Things to think about for scaling:
    - Attachments?
    - Number of users
- Uses docker

## Deploy to clients centrally
- https://bitwarden.com/help/deploy-clients/
- You can use GPO to centrally deploy Bitwarden with the server URL pre-configured
- You can force browsers to install the extension (using the extension ID) - https://bitwarden.com/help/browserext-deploy/#windows

## Login Using SSO
- https://bitwarden.com/help/about-sso/