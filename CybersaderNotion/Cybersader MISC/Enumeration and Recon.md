# Enumeration and Recon

# Misc Enumeration

- OneDrive user enumeration - [OneDrive to Enum Them All - TrustedSec](https://www.trustedsec.com/blog/onedrive-to-enum-them-all/)
    - URLs are automatically created when a new O65 user uses pretty much any service
    - You can check for valid username (UPN - user principal names) by doing HEAD requests for certain URLs with a particular format
    - You must know the Azure tenant name to form the URLs
        - these can be all sorts of abbreviations
        - It’s difficult to look them up or figure them out
        - ADD internal tools can be used to find them with the TREVORspray tool
    -