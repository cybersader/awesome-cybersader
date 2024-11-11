---
aliases: 
tags: 
publish: true
date created: Sunday, July 14th 2024, 7:19 pm
date modified: Monday, July 29th 2024, 11:27 am
---

[Secure Cyber Environment](../Secure%20Cyber%20Environment/Secure%20Cyber%20Environment.md) 

# Does Development or Analytics Need Local Admin?

## Admin for dev PCs? - opinions

- https://stackoverflow.com/questions/701214/should-developers-have-administrator-permissions-on-their-pc

- https://www.reddit.com/r/sysadmin/comments/16z0oe3/do_developers_really_need_local_admin/
	- When you need to boss around hardware, you need admin to access the hardware. - This is true with something like numpy - Python Setup & Development
	- Yes, unless you have special tools to elevate apps that need it.  Beyond trust privilege access management can elevate apps by a combination of things such as file name, folder path, digital signature, or file hash in policy.  0 users in my org have local admin rights on workstations.
            

## Using PAM to Develop without Local Admin?

- https://www.beyondtrust.com/blog/entry/privilege-management-development-teams
	- Application development tools like Visual Studio and XCode need administrative rights to compile the code.
	- Third party add-ons and plugins for development tools require administrative rights to operate and perform specific functions like creating or using certificates.
	- The installation or removal of software typically requires administrative rights on Windows or a Mac for testing an application.
	- Any third-party extensions, drivers, or modifications to key system files, including the Windows registry requires administrative privileges
- Kernel extensions on MacOS and Accessibility Functions used as workarounds (for functions like right-click menus) need administrative rights to enable.

## What about Application Whitelisting?

- This should be a piece to securing environments
- Some applications can be whitelisted to be available at the user level

# Related Links

- https://www.infosecinstitute.com/resources/management-compliance-auditing/top-10-common-misconceptions-application-whitelisting/
- https://www.blackhillsinfosec.com/how-to-bypass-application-whitelisting-av/
- https://www.reddit.com/r/Python/comments/zg4cku/friends_work_does_not_allow_developers_to_use/
- https://security.stackexchange.com/questions/90659/security-concerns-with-user-python-scripts
- https://security.stackexchange.com/questions/78676/python-security-hardening?noredirect=1&lq=1
- https://security.stackexchange.com/questions/256697/would-it-be-useful-from-a-security-perspective-to-harden-an-interpreter-like-pyt?rq=1
- 

# Executive Summary: Implementing a Local Development and Analytics Environment

- **Purpose Difference**:
    
    - **Development & Analytics**: Focused on creating and analyzing code and data.
    - **Scripting & System Admin**: Involves system-level permissions to manage and configure systems.
- **Permission Requirements**:
    
    - **Development & Analytics**: Requires access only to specific project files and datasets.
    - **Scripting & Admin**: Requires higher system-level permissions, potentially affecting system stability and security.
- **Security Considerations**:
    
    - **Containment**: Development and analytics environments are confined to a few users, reducing exposure.
    - **Endpoint Configuration**: Security depends on robust endpoint configurations rather than the environment itself.
    - **Minimal Risk**: By limiting permissions to necessary files and isolating the environment, the security risks are minimal.
- **Key Argument**:
    
    - Development and analytics serve different purposes and require different security approaches compared to scripting and system administration. Properly configured, these environments pose little security risk.

* * *

**You:**

Being the devil's advocate, can PowerShell or Python do a lot of damage if it's limited from accessing system files or important things?  There is a lot of power show in Python malware, so I'm confused on whether this is an issue if the user doesn't have permissions to do a lot of stuff

* * *

**ChatGPT:**

# Potential Risks of PowerShell and Python in a Restricted Environment

- **Capabilities**:
    
    - **PowerShell and Python**: Both are powerful scripting languages capable of automating tasks, interacting with APIs, and manipulating files and data.
- **Restricted Permissions**:
    
    - **Limitation**: When access is restricted to non-system files, the potential for damage is significantly reduced.
    - **Scope of Action**: Scripts can only manipulate files and data within the allowed directories.
- **Potential Damage**:
    
    - **Data Manipulation**: Malicious scripts can still alter, delete, or exfiltrate data within their access scope.
    - **Network Actions**: Scripts can potentially interact with network resources, though network-level security measures can mitigate this.
- **Mitigation Strategies**:
    
    - **Access Controls**: Implement strict access controls and monitoring to ensure scripts only interact with necessary files and data.
    - **Network Security**: Use network segmentation and firewalls to limit the potential impact of any malicious network activity.
    - **Endpoint Security**: Ensure robust endpoint protection to detect and prevent unauthorized script execution.
- **Conclusion**:
    
    - While PowerShell and Python are powerful, the risk is manageable with proper access restrictions and security measures. The main risk is limited to the data and resources within the allowed scope.
