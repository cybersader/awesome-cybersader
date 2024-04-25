---
publish: true
---
# First Principles Approach
- I love this approach to problem solving
- It involves embracing studiousness rather than curiosity and skepticism
- Break down things to their fundamental components
- if we want to improve we have to understand the principles of things
# IAM - Identity Access Management
## The Significance of Identity
- Why is identity important.  We have different interests, motivations, and abilities. 
- Defining identity would be a rabbit hole
- Diversity of interests 
	- In the realm of cyber, identity is how we ensure a business operates because it can allow us to only let those who have the same interests have access to control the system in various ways

- We use identity to ensure that the system's operation aligns with the intended goals of those who designed and/or owned it

- Security is piece of mind and identity and access management allows piece of mind despite diversity of interests and its interplay with the abilities and specific subsets of goals of those with matching or similar large scale goals
# AD Basics
## AAD & AADDS
- [Azure AD vs Azure AD Domain Services — key differences and limitations | by Andrei Pavlitchouk | Contino Engineering | Medium](https://medium.com/contino-engineering/azure-ad-vs-azure-ad-domain-services-key-differences-and-limitations-b5fcad59df24) 

- Two cloud offerings for Azure Identity Services for Cloud - Azure AD and Azure  AD Domain Services

### ADDS - active directory domain services
- simple AD - centralized IAM that runs as a role on Windows server
- [Active Directory Domain Services Overview | Microsoft Learn](https://learn.microsoft.com/en-gb/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview) 
	- Directory hierarchical structure that stores information about objects on the network. A directory service like AD DS provides  methods for storing the data and making them available to users and admins
	- Security: integrated with AD through logon auth and ACLs
	- Global catalog server stores objects from all domains in the forest

### AAD - Azure Active Directory
- Cloud-based IAM service.  Helps employees access external resources like O365, Azure portal, and other SaaS apps

![](IMG-20231018143548186.png)
## Azure AD compared to simple AD
- [Compare Active Directory to Microsoft Entra ID - Microsoft Entra | Microsoft Learn](https://learn.microsoft.com/en-gb/azure/active-directory/fundamentals/compare) 
- ![](IMG-20231018143549559.png)
- AAD Features:
	- Communication via REST over internet
	- Auth with cloud-based protocols - OpenID, oAuth2, SAML, WS-Fed
	- Support for MFA, authenticator apps, FIDO keys etc
	- Single IdP
	- Conditional Access Policies
	- ID protection services
	- Privileged ID Management (PIM)

  ### Azure Active Directory Domain Services (AADDS)
  - PaaS that provides managed domain services:
	  - domain join
	  - group policy
	  - LDAP, Kerberos/NTLM auth
  - Managed domains require a unique namspace (domain name) website.com - this is the only way to enable forest level trusts as names have to be unique
  - If any organisation that has on-premises Active Directory Domain Services, uses Azure (so has Azure AD) and when deployed a Azure AD Domain Services managed domain, they would look like this:
	  - ![](IMG-20231018143550322.png)
  - For AADDS instances, Azure deploys two DCs, into a deciated virtual network, in a single region -- called a replica set.
  - Peered with other virtual network, or can be multiple replica sets providing local login for application, protecting if a region goes down
  - Since AADDS is PaaS, then vendor is responsible for updates, backups, monitoring, etc
### Syncronizing AADDS with On-Prem (Hybrid)
- The managed domain has a one-way automatic sync from Azure AD. Azure AD provides the centralised set of users, groups and credentials. This is shown as (1) in the diagram below.
- Azure AD Connect used to sync On-prem AD with Azure AD
![](IMG-20231018143550877.png)
### Limitations & Considerations When Selecting AD Tech
#### Simple AD
- Needs to run on Windows Server - vm cost and license costs
- Each logical location or region needs 2 DCs to be deployed, patched, and monitored. Not easily scalable, but likely cheaper in certain ways
- Enterprise software sometimes relies on legacy protocols provided by simple AD
#### Azure AD
- Can't do Kerberos/NTLM which might be required with some apps
- Can't make LDAP/LDAPs requests to the directory service
- Unable to use GOP's to centrally manage servers
- No Domain join in the traditional sense for Windows Servers
- No Schema Extension
- No Forest trusts, one tenant per organization
- Best features  cost money (CA, PIM, Identity threat protection) - lots of extra costs that are marked up
#### Azure Active Directory Domain Services - AADDS
- No GPO replication from on-prem
- No hybrid Azure AD join
- no Enterprise or Domain Admin
- No AD Cert Services Support
- No Schema extension
- no Forest Trust
- Peering or replica sets are required for geographically distributed Azure environments
- LDAP write back only within the managed domain (cannot update AAD or AD)
- Can get [expensive](https://azure.microsoft.com/en-gb/pricing/details/active-directory-ds/) depending on the size of domain (number of objects) and the amount of replica sets needs for highly available IAM services.
## Some Common Use Cases

### Azure AD

-   Used for Azure, Microsoft 365 and Dynamics 365.
-   Provides modern SSO capability for products,
-   Centralised IDP for 1000’s of other services in use in modern enterprise (Slack, Workday, Trello, Salesforce, Asana)
-   Provides authentication services for an organisation’s own cloud applications.
-   Provides [AAD App Proxy](https://docs.microsoft.com/en-us/azure/active-directory/app-proxy/application-proxy)
-   Provides [AAD Identity Protection](https://docs.microsoft.com/en-us/azure/active-directory/identity-protection/overview-identity-protection)

### Azure AD with Azure AD Domain Services

-   Organisation that is only using Azure Active Directory but needs a legacy application to work with the environment.
-   A line of business application that needs to run on a server, which requires kerberos.
-   A cloud product such as [MSIX app attach](https://docs.microsoft.com/en-us/windows/msix/overview) on Azure Virtual Desktop that needs Kerboros to function.
-   An organisation that wants to join its IaaS servers to a traditional domain service, and wants to use group policies for management and secure configuration.
-   Azure AD Domain services could be a replacement If you don’t want the application to communicate with the on-premises Active Directory environment.
-   There may be security or regulatory issues with syncing password hashes to the cloud from an on-premises environment.

### Active Directory Domain Services, Azure AD & Azure AD Domain Services

-   This is most likely scenario for organisations that are heavily vested in the Microsoft ecosystem.
-   AD will sync (via AD connect) to Azure AD, and then Azure AD to Azure AD Domain Services.
-   One key benefit in this scenario is the reduction in administrative overhead, with the Azure DC’s as a managed service.
-   This scenario could be part of a roadmap that leads to the eventual removal of all on-premises infrastructure.
-   Could be part of a hybrid environment with the organisation intending to run data centre and public cloud services, and that needs to stretch its IAM services with minimal additional overhead.

## Some common mistakes that we have seen:

### Thinking all AD types are the same

-   Azure AD Domain Services is part of Azure AD. This does exist under the tenant but it is a separate resource.
-   Azure AD is not AD domain services — any org that thinks it can just use Azure AD services, especially if that org has a legacy NT domain is incorrect.
-   Azure AD Domain Services is close to traditional Active Directory Domain Services, but it is not exactly the same, there are limitations as has been touched on in this article. See [[FAQs) about Azure Active Directory (AD) Domain Services](FAQs)%20about%20Azure%20Active%20Directory%20(AD)%20Domain%20Services](https://docs.microsoft.com/en-us/azure/active-directory-domain-services/faqs) for additional details.

### Assuming that “in the cloud” means highly available.

-   Assuming Azure AD Domain Services has high availability in the region by default. Replica sets need to be created to ensure high availability.
-   An organisation not understanding the cost. To have 2 or more Azure AD Domain Services Enterprise SKU instances, cost needs to be scrutinised and approved.

### Not making the right choice of SKU

-   Picking the wrong SKU can have a negative impact such as cost. Azure AD Domain Services has three SKUs, with different recommended object counts (for performance) and other features, trusts, backup frequency etc.
-   Whilst any SKU can support any total number of objects, performance of a high object Azure AD will be much worse on Free over Standard or Enterprise. Microsoft provides clear guidelines via [Azure Active Directory Domain Services pricing](https://azure.microsoft.com/en-gb/pricing/details/active-directory-ds/).

### Not taking advantage of PaaS if possible.

-   Running VM’s to run AD DS inside Azure can be a lot of work. Patching, securing, monitoring etc all falls on the client operations teams. It also increases the attack surface in an environment. That’s why the PaaS Azure AD Domain Services is a good option.
-   Organisations that have stringent security or regulatory requirements that might limit the ability to sync identities to the cloud can take advantage of Azure AD Domain Services by using the resource forest type and creating a one-way forest level trust.

### In summary

Hopefully this gives you a better understanding of the difference between Azure Active Directory and Azure AD Domain Services.

Azure Active Directory provides the ability to manage and secure identity across PaaS and SaaS products and services. With Azure Active Directory Domain Services you retain the ability to support enterprise, on-premise, line of business applications that require the functionality that Azure AD cannot provide.

It is important to understand that one Active Directory product will likely not be enough.

A combination of two or more Active Directory products will need to be considered in order to meet the business needs.

# Azure AD Explained
- [[Azure AD) Explained | by Nadeem Khan(NK) | LearnWithNK | Medium](Azure%20AD)%20Explained) 

# AAD 101
- [[AAD) 101. Hello Everyone! | by Kalpani Ranasinghe | Geek Culture | Medium](AAD)%20101.%20Hello%20Everyone!)

![](IMG-20231018143551387.png)