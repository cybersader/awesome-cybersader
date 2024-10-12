---
aliases: 
tags: 
publish: true
date created: Saturday, October 12th 2024, 11:20 am
date modified: Saturday, October 12th 2024, 11:26 am
---

[Org Data Governance](../../../../📁%2004%20-%20Organizational%20Cyber/Org%20Data%20Governance/Org%20Data%20Governance.md)

- EPS - AD and service desks
- Service desk is overburdened with these requests
- How to engineer AD
- Service desk has made inaccurate incorrect permissions
- Data governance and file shares is hard
- We don't know who needs what access
- How to get to least privilege
- Polp or Plop

# Job functional security

- We need to align security context with job functions

## Strategy

- Job functions need to be in titles in AD
- Pre reqs
    - AD context
- Define job functions and roles and resources
    - HR doesn't know sometimes what the title or description entails
    - Managers prescribe the duties sometimes
    - InfoSec has to know what departments and descriptions do accurately
- Map job functions to resources
    - Really hard to do
    - One or two groups per person with one that controls all the access
    - Break down access into single groups…yes
- Manage exceptions
- Automate
    - Service requests need to automate into all this - valuable

# File shares

- You should have a good data what type of data is used in the org. Understand how departments work…to a degree. Hard in larger business with one team.

# Pre reqs

- Naming conventions
    - Need to be meaningful
    - Users, groups, service accounts, admins, file shares, resources
    - Don't do security by obscurity…name of DA and servers doesn't matter
    - First and last name,
- Acls on file shares should only have groups and not broken SIDs
- Having more groups than users is not bad. It can be good. The people who complain are wrong.
- Naming conventions
    - Users - make it obvious
    - Vendors
    - Contractors
    - Logical
- Limit accident security mistakes
- You avert risk by having meaningful naming conventions

# Who owns the data?

- The org
- Personal photos in the network shares is a violation

# Group naming conventions

- User groups, security groups, mail enabled
- Jugular is a good approach
    - Job functional groups
    - Top group is ALL
    - ALL DEPARTMENTS
    - FIRST ROLE OF JOB FUNCTIONS - ALL SALES
    - some will have one member
- Distribution groups
- JUGULAR
    - J
    - Users
    - Global Groups
        - Job functional security groups
        - Should be one group
    - Universal groups
    - Local access to resources
        - File shares should have one or two
        - Domain local groups named accordingly to local or server access

# Relationships

- HR, department managers, but mostly HR
- pressure HR into understanding this
- Contact HR when on violation of policies or AU
- HR should ratify the policies
- We look at your data/info because we are InfoSec…pretty simple
- Build relationships with HR

# Job functions

- Find them out
- Make job functional groups
- Resource group - design the hierarchical structures
- Apply security groups to ACLs
- Folder redirection might make cleaning up file shares hard.

# Privilege investigation

- HR can't tell you who uses or owns resources
- Lots of interviews - might be months of it - maybe bring in a 3rd party if need be
- Remote work
- Find largest unrolled user groups that doesn't violate Plop and requires privileges
    - This gets the assignment

# Apply permissions to ACLs

- Names will be long
- ALL
- ALL Development
- ALL Development BA
- More groups than users good in this case. It's about choices for the number of users. The work is done in making the groups and shouldn't be in editing them
- ALL SALES READ ACCESS - description for access with file shares

# Exception management

- Enable the service desk to ask why and document it?
    - HR should be involved
    - Exception or everyone who has that job functional group?
    - Enable the staff the edit it right then and there and ask questions
- Special projects
- Dual job functions?
    - Two roles is fine
- Get exceptions done to a job function
- Are we redefining the job description?
- Is there a violation of separation of duties?

# Automation and reporting

- If job title doesn't match group then a report should tell you
- Unexpected department or groups
- Resources overlap
- Exception management

# Questions

- Not a lot of easy buttons
- Data discovery and governance
- Inter department relationships
- Get the board on board - we can make AD easier
- Hybrid entra - it will allow nested groups sometimes

# QA

- How can you automate if department managers decide roles and they can constantly change. Everyone needs the data.
- Do the names just get super long - issues with doing that
- Where to go learn and sandbox AD stuff like this?
- Open source tools to help with this
- How deep are some of the job functional groups structures
    - So two deep with departments and only one group?
- Bring in a 3rd party?