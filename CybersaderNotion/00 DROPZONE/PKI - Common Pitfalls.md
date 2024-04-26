# PKI - Common Pitfalls

# PKI Stuff Lately

- Golden cert attacks
- A lot of press this year
- Pkint issues
- Certified pre owned by Schroeder and Christensen
- Certifried and other tools

# Overview

- Common operational and security issues

# Terminology

- Issued to
    - Person, email, or something
- Issued by
    - ca
- Time Values
    - Valid from to dates
- Certificate extensions
- CRL
    - Cert revocation list

# How certs are validated

- Standards from RFC.
1. Subject verification
2. Time validity
3. Revocation check
    1. Marking as not to be trusted
    2. CRL- list of untrustworthy certs
        1. Small serial numbers in txt files.
- Most of these values are cached or else PKI would be inconvenient

# PKI and CRLs

- Hard to build
- CRLs are arguably most important part of a PKI
- CRL are integral to trust.  People need to understand that and obey rules
- CRLs are written by CAs
- If CRLs are not found then the search will automatically fail
- CRLs becoming unavailable cause huge losses

# Operational Issues

## CDP - CRL Distribution Points

- Where to find crls
- You want availability and redundancy
- Maybe stored in ad but even then some clients won't find it
    - Location is important
- There is no easy approach
- Most configuration is done at CA level
- OS specific rules for location and caching

### Issues in orgs

- Out of band movements of crls
- CDP role on CA or other systems
- Poor location design
    - Active directory can be bad for things that aren’t connected to domain like phones
    - At the CA level
    - Order matters
    - Usually out 3 locations
    - To LDAP or not LDAP
- Lack of redundancy
    - Points of failure exists within or between locations

# Security Issues

DCs are important.  Someone becoming a CA is bad.

## Templates

- Part of windows domain joined pki
- Configuration at template level
- Templates have permissions
    - Read- download the templates
    - Enroll - manual enroll
    - Auto enroll
    - Write/FC - Shouldn't ever be checked

## Problems

- Overly broad rights
- Any write/fc
    - PKI administration sometimes has this
- Bloat / Defaults

## CA permissions

- Managed CA is basically god…be careful
- Bloat / defaults
- Service Accounts
    - Be careful with apps that have these
- Enrollment agents (MDM)
    - Most of these need service accounts
    - Threat model these situations
- Local groups / admin?

## Powerful certs

- Templates that allow enrolle supplied info like the cert subject
    - Can allow spoofing or impersonating
- Templates for DC and other critical systems
- Templates with SAN (subject alternative) names
    - Dangerous but hs legitimate usage
    - Some things require built in SAN names

# Closing thoughts

- Formal assessment of your PKI
- Training for people who do PKI ops