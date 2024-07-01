- [Regulatory Framework for Compliance](#Regulatory%20Framework%20for%20Compliance)
	- [The Regulatory Framework Stack](#The%20Regulatory%20Framework%20Stack)
	- [Why Compliance](#Why%20Compliance)
	- [Identifying Which Regulatory Frameworks Apply](#Identifying%20Which%20Regulatory%20Frameworks%20Apply)
	- [How Regulatory Frameworks Apply to Networks](#How%20Regulatory%20Frameworks%20Apply%20to%20Networks)
- [Various Regulatory Frameworks, Laws, and Acts](#Various%20Regulatory%20Frameworks,%20Laws,%20and%20Acts)
- [Learn to Develop Security Policies](#Learn%20to%20Develop%20Security%20Policies)
- [Other Admin Security Controls/Measures](#Other%20Admin%20Security%20Controls/Measures)

---
# Module Labs 2

## Managing Windows Group Policy with GPMC
- scriptable
- single tool for managing group policy across org
### Configuring Group Policy Objects
- Group Policy components (common):
	- drive mappings
	- registry settings
	- local users and groups
	- services
	- files
	- folders
	- password history, age, length, and complexity
	- store passwords with reversible encryption policies for users' passwords
- The AD domain contains two default GPOs:
	- Default domain policy, which is linked to the domain
	- Default domain controllers policy, which is linked to the domain controller’s organizational unit (OU).

**Order of Processing Group Policies**:
- Local computer policy (applied locally to the system and user)
- AD policies (site -> domain-> OU)
- Site: Applied to all members of a site; will override settings that are configured at the local level
- Domain: GPOs linked to the domain; will override the GPO linked at the local and site level.
- Organizational unit: GPOs linked to OU will override any other GPOs, other than those linked to a sub-OU, or a GPO that is marked as “Enforced”
- Enforced: Will override all other GPOs, unless blocked by Block Inheritance.

## Implementing Password Policies in Linux

**Overview of PAM**
Pluggable authentication module (PAM) (pam_pwquality) is used to enforce password complexity. The PAM module is responsible for account verification and password checks such as password expiry and rejecting passwords that do not meet the specified requirements in the configuration file.

Change the file configuration and reboot.

## Monitoring Activities on a Remote User System
- Using employee Spyware
	- Spytech SpyAgent



---
# Regulatory Framework for Compliance
## The Regulatory Framework Stack
- Regulatory frameworks
	- PCI-DSS
- Policies
- Standards
- Procedures, Practices, and Guidelines

## Why Compliance
- Better security - more thorough
- Maintain trust with customers

## Identifying Which Regulatory Frameworks Apply
- Look deeply at what applies
## How Regulatory Frameworks Apply to Networks
- Focus on what the acts require for management of IT systems
# Various Regulatory Frameworks, Laws, and Acts
## PCI DSS (Payment Card Industry Data Security Standard)
- Anyone involved with payment card processing
### High Level
- Secure network
- Strong Access Control
- Vuln MGMT
- Monitoring
- Sec Policy
## HIPAA 
- Patient Data Security
- Every provider must use the same health care transactions, code sets, and identifiers
- Privacy rules
- Safeguards for CIA of electronic protected health info
- National Identifier requirements - standard national numbers that identify them on standard transactions
- Enforcement rule - standards for enforcing all Administration Simplification Rules - 

## SOX - Sarbanes Oxley Act
- Standards for publicly traded company boards, management, and account firms
- Section 302:
	- Requires senior management to certify accuracy of the reported financial statement via signed statements -- these must be protected
- Section 404:
	- Management must have internal controls and reporting methods on the adequacy of those controls
## GLBA (Gramm-Leach-Bliley Act)
- financial transfers between institutions
- Protect consumer information held by institutions and their service providers
- Officers and directors of institution subject to 10k for each fine
## ISO Standards
- ISO/IEC standards for all sorts of cyber and IT controls and methods
- ISMS & ITIL 
## FISMA
- framework for IT security controls for federal operations
- categorize and secure systems

## Patriot Act of 2001
- Made it easy for govt to get access to people's information

## FOIA
- Easier to get information from the government



# Learn to Develop Security Policies

## What is a Security Policy
- Well documented plans, procedures, standards, and guidelines
- Inform people how to work in safe and secure manner
- Provides legal protection
- Quickly respond
- Data and network security

## Good Security Policies
- High Level Requirements
- Policy description based on requirements
- security concept of operation
	- roles, responsibilities, and functions

Typical documents:
Consistent document layout and nomenclature and tracking of components (contacts, time, version, etc.)

## Policy Statements
- Clear and formal - must be specific enough
- Get people together multiple times annually to update and write policy

## Steps to Create and Implement Policy
- Do risk assessment (quant or qual)
- Learn from guidelines of other orgs
- Include senior management in policy development
- Set clear penalties and enforce them
- Publish final version to everyone in the org
- Ensure every member reads, signs, and understands the policy
- Deploy tools to enforce policies
- Trian employees and educate them about the policy
- Regularly review and update the policies

## Considerations Before Designing a Sec Policy
- What is the purpose?  Does it add values or not?
- Policy in line with training?
- Policy comply with org objectives?
- Does it need to be based on a standard?
- How many people involved
- Least amount of info needed for each person to do their job?
- Are all details required in the policy?
- Can the policies be linked? Methods for this?
- What does staff need to understand from it
## Designing Policy
- Description of policy issues
- Functionalities of those affected by the policy
- Compatibility level of the policy is necessary
- Consequences of non compliance
- Policy status 
- Applicability to the environment
## Types of InfoSec Policy
- Enterprise
- Issue Specific
- System Specific

### Internet Access
- Promiscuous - no restrictions
- Permissive - dangerous stuff blocked -- blacklist
- Paranoid - whitelist
- Prudent - All services are blocked, safe necessary services enabled individually, nonessential services/procedures that cannot be made safe are not allowed, everything logged

### Acceptable Use Policy
- proper use IT systems, processes, accounts, components, etc.
- What are you allowed to do with the systems?
### User Account Policy
- creation process of user accounts and includes user rights and responsibilities
- RBAC, etc.
### Remote Access Policy
- Who is allowed remote access?
- What methods can they use?
- Extra requirements?
- Any restrictions if accessing remotely?
### DLP and Information Protection Policy
- Processing, storing, and transmitting sensitive information
- Level?
- Who?
- What can be printed?
- Scanning stuff for DLP?
### Firewall Management Policy
- Who has access
- Who gets requests to fix it
- Who can approve requests to change the config?
- Who can see rules?
- How often should the lists be reviewed?
### Email Security Policy
- Super important
- Be consistent
### Password Policy
- Also super important
- Have a way to apply this to technology if possible, e.g. use password manager with default requirements
### Physical Security
- Review regularly
- Process to identify outsiders
- Adequate lighting?
- Entry points blocked?
- Video surveillance?
- Inventory of orgs assets?
### Information Security Policy
- Safeguard orgs information and processes
### BYOD Policy
- Data considerations
- Protections and trust

### AppSec Policy
- Config mgmt
- Auth
- Error Handling
- Logging
- User and Session mgmt
- Data protection
- Authz
### Data Backup Policy
- policy for requiring backups and schedules for them

### IDS/IPS Policy
- Logging of it, change of signatures,etc
## Policy Implementation Checklist
Hardest part is deploying it 
- Approved by senior management
- Adopted as a company policy
- Review each policy and decide how to enforce it
- Ensure appropriate tools and techniques are in place for it
- Develop a policy change plan for both the network and the policy itself
- Coordinate with other departments to develop procedures based on the policies
- Provide basic information security awareness training to employees

# Conduct Security Awareness Training
- Train on social engineering techniques
- Train employees to know information classifications
- Staff hiring and leaving process
	- HR needs a policy for this which can apply to security on many levels
	- The personnel need to know policy when they get into the organization.  There needs to be an organized period in the beginning so that they are properly onboarded
	- When they leave, collect all company assets and remove access rights to applications
- Employee Monitoring
	- Indiscriminate monitoring of employees' activities to detect any act related to policy violation
	- Use spyware to monitor employees
# Other Admin Security Controls/Measures