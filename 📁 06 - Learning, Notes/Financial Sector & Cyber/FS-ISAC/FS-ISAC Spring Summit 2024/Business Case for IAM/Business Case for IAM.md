---
aliases: 
tags: 
publish: true
permalink:
date created: Wednesday, January 29th 2025, 3:40 pm
date modified: Wednesday, January 29th 2025, 3:40 pm
---
- Common case
    - Pace of IAM platform is slow for development integration and new apps
    - Audit findings with legacy IAM functions
    - Cost of maintaining current IAM
- Better
    - Less access approvals
    - Less entitlement approvals
    - Decrease cost and IAM transaction volume
- Cost I IAM is provisioning and certifying access then deprovisioning
- Certification emails are the “hey should this guy have this access” emails. 90% of these are rubber stamped and they don't care
- How do you eliminate need? Look at the entitlements being used in 90 days - if not then write a script to revoke or delete it - or go to RBAC - TODO
- We still rely on manual provisioning. - TODO. How to automate?
- You can use a matrix or 2 value based condition
- Outliers or deviants can be deprovisioned
- IAM then turns into an analyst flow instead
- Use dynamic provisioning by looking at patterns

PANEL

- Intentionally changed functions to lower operating costs?
    - Focused on provisioning and deprovisioning
    - Automation helps but also requires protocols and integration that works long term
- Calculated wait time in recert process. Time frame was ten business days. Counted all the wait time in recert. 325 years added up and brought that up with senior leaders
- Feasibility?
- Start with cost and not risk reduction - we are going to be more operationally resilient and efficient
- NIST 800 53 has roadmaps with maturity levels for IAM
- Where has data science and AI helped with users?
    - UEBA is a simpler place to start. Pick a tool or SIEM or extend an existing ones
    - DLP programs are focused on tools and not business context
    - Leverage the identities and what's typical or atypical - relies on roles
- Avoid trying to follow the new models by feeding summary information to a person with identity stuff. Don't feed the data to a human.
- Use intelligence to drive automation and not humans - TODO
- How to bring internal and external regulators along for these changes? Internal auditors should be recognized stakeholders of your initiatives.
- Technology teams need to influence the internal auditor work
- Auditors have to find the actual risk that we are trying to address. Forget the control - what are you worried about here? What's the problem we are solving for?
- Ask devs and other teams what problem they are solving for or what risk? What are they worried?
- Implications for IAM teams for talent development. Data analytics is important.
- Put a long term focus around identity, authentication, and authorization - simplify it, delegate it, automate it - TODO
- Being able to work with CSV files and make our processes more efficient - TODO