---
aliases: []
tags: []
publish: true
date created: Friday, November 22nd 2024, 3:46 pm
date modified: Friday, November 22nd 2024, 3:53 pm
---

[Active Directory](../../Active%20Directory/Active%20Directory.md)

# The Relation Between NTFS, Active Directory, and DACLs | Setting Context for Data Governance

- **DACL Placement**: Initially, it might have been unclear where DACLs are stored. DACLs are tied to resources like files, folders, and Active Directory objects, not users directly.
- **Effective vs. Physical Permissions**: Understanding the difference between explicit permissions (physical) set on a resource and effective permissions, which include inherited permissions and group memberships, was clarified.
- **Role of LDAP**: LDAP is a protocol for querying and updating directory data but does not directly interact with NTFS file systems. Its role in Active Directory is limited to managing directory objects like users, groups, and computers.
- **Kerberos Functionality**: Kerberos handles authentication within Active Directory environments and ensures secure access to resources but does not directly manage DACLs or permissions.
- **Inheritance in Permissions**: The realization that inheritance allows permissions set on parent objects (like folders) to flow down to child objects, simplifying but sometimes complicating access control.
- **DACL Modifications**: Only users with specific permissions, administrators, or the resource owner can modify DACLs, ensuring controlled access to permission settings.
- **Network Share Access Control**: NTFS permissions on file systems manage access to network shares, and the role of Active Directory is primarily to group and authenticate users who attempt access.
- **Storage of ACL Data**: ACL data is part of the NTFS file system metadata, not stored in Active Directory or managed by LDAP.
- **Mapping Permissions**: Mapping out permissions involves understanding both group memberships in Active Directory and inherited NTFS permissions, which together form the effective permissions for a user.
- **Overlap of Protocols and Services**: The distinction between the functions of LDAP, Kerberos, and NTFS in Active Directory ecosystems may have been initially conflated, but their roles were clarified.
    

These insights collectively clarify how permissions, authentication, and directory services interact in Active Directory environments. Let me know if you'd like to explore any of these points further!

# ChatGPT

**You:**

“Hello, I want to understand Active Directory better when it comes to DACLs, or Discretionary Access Control Lists, how they map to resources, how all this maps to users. I mean, what I'm trying to do is...”

* * *

**ChatGPT:**

Hey there! Understanding DAC

* * *

**You:**

“We're going to network shares and get users to map roles to things in their network shares. But in order to do that, I need to understand how these permissions to certain network shares are given to users or groups. What an object actually is an Active Directory and things like that. So I'm just trying to learn.”

* * *

**You:**

“So you don't map the user and store those DACLs on the user to the resources, but the resources have the DACLs stored to map to the users, question mark?”

* * *

**ChatGPT:**

Exactly! In Active Directory, the DACLs are associated with the resources, not the users. Each resource, like a network share or a file, has a DACL that contains Access Control Entries (ACEs). Each ACE specifies the permissions a user or group has on that resource. So, when a user tries to access a resource,

* * *

**You:**

“Where are all of these stored, though?”

* * *

**ChatGPT:**

The DACLs for resources are stored with the resources themselves. For example, in the case of a file or folder on a Windows file server, the DACLs are part of the file system's metadata, managed by NTFS. In Active Directory, objects like user accounts, groups, and computers have their security descriptors, including DACLs, stored

* * *

**You:**

“Okay, okay, okay. But how is NTFS mapped into things like LDAP and Kerberos? Is any of that related here?”

* * *

**ChatGPT:**

Great questions! Let's break it down:

1. **NTFS**: This is the file system used by Windows. It's responsible for storing files and folders on disk, along with their associated DACLs. These DACLs determine who can access those files and folders and what actions they can perform.
    
2. **LDAP (Lightweight Directory Access Protocol)**: This is a protocol used to access and manage directory information services, like Active Directory. While LDAP is used to query and modify information in Active Directory, it doesn't directly interact with NTFS.
    
3. **Kerberos**: This is a network authentication protocol used within Active Directory environments. It helps authenticate users and computers, allowing them to access resources on the network securely. While Kerberos is crucial for accessing resources like file shares, it doesn't directly manage DACLs on NTFS. Instead, it provides the authentication piece to verify the user's identity

* * *

**You:**

“So, so, so.”

* * *

**ChatGPT:**

So, in a nutshell:

* * *

**You:**

“Kerberos lets you get to the FileShare server, but it won't give you access to certain resources on that FileShare server, like certain paths. That would be where you implement the DACLs, right?”

* * *

**ChatGPT:**

Exactly! Kerberos authenticates you to the file server, confirming your identity. Once you're in, the DACLs on the file system determine what you can actually do with specific files and folders. This way, even if you're authenticated to the server, your access to resources is controlled based on the permissions defined in the DACLs.

* * *

**You:**

“Okay, okay, okay. I'm trying to think about...”

* * *

**ChatGPT:**

Take your time! What aspect are

* * *

**You:**

“start to map these things out because I mean I don't I understand this but I'm trying to understand the hierarchy and how to approach this with groups because you also have to think about inheritance and how that works with this so if I want to get to a point where I could map this into a tree map I'm just trying to understand in a table format the sorts of tables I would need to combine to build that information so let me give you an example so we have the permissions information which might be the NTFS permissions but then at some point I have to know what groups a user is in so that if I want to figure out network shares that a user has access to and where they're getting those permissions such as the group I'm not sure how to approach that I need to understand where all this maps together”

* * *

**ChatGPT:**

Got it! To map out permissions, groups, and inheritance in Active Directory, especially for network shares, you'll need to consider a few key components:

1. **Resources (Network Shares)**: Start by listing all the network shares you want to manage. Each share will have associated permissions.
    
2. **Groups**: Identify the groups in Active Directory that will have access to these shares. Groups are a crucial way to manage permissions efficiently.
    
3. **Users**: Determine which users belong to each group. This will help trace how users inherit permissions.
    
4. **Inheritance**: Understand how permissions are inherited in your directory and file system. Inheritance allows permissions to flow from parent folders to child items, streamlining permission management.
    

To build a table or tree map, you can create a table with columns for

* * *

**You:**

“Is there a general difference between, I heard this one time, but somebody said effective permissions versus physical permissions. I'm not sure how this relates, but the inheritance problem I have right now is that I can put in a user and figure out what file paths they have access to, but what I really want to know is the rules that say file path and things below it gives access to this group, which indirectly gives access to the user. Because my goal is I'll be able to feed a list of users into this process, and then it shows me the things they have access to and where that access is coming from.”

* * *

**ChatGPT:**

Got it! The distinction between "effective" and "physical" permissions is key here:

- **Physical Permissions**: These are the explicit permissions set directly on a resource, like a file or folder. They are the permissions you assign to a user or group on that specific resource.
    
- **Effective Permissions**: These are the actual permissions a user has on a resource, taking into account physical permissions, inherited permissions, group memberships, and any denied permissions. Effective permissions show what a user can actually do with a resource.
    

To map this out, you'll need to:

1. **Identify Physical Permissions**: Look at the explicit permissions set on your network shares. This includes permissions granted directly to users and groups.
    
2. **Consider Inheritance**: Check if the permissions are inherited from parent folders. Inherited permissions flow down the folder structure, affecting child folders and files.
    
3. **Analyze Group Memberships**: Determine which groups each user belongs to. This is crucial because permissions are often assigned to groups rather than individual users.
    
4. **Calculate Effective Permissions**: Combine physical permissions, inherited permissions, and group memberships to determine what each user can actually do with a resource. This is your effective permissions.
    

For your project, you

* * *

**You:**

“Okay, so what are some places that I get this information and how do I essentially left join it to create a table that would have all of this data in each row?”

* * *

**ChatGPT:**

To gather this information and create a comprehensive table, you'll need to pull data from various sources within your Active Directory environment:

1. **User and Group Information**: Use tools like PowerShell or LDAP queries to extract user and group memberships. PowerShell's `Get-ADUser` and `Get-ADGroup` cmdlets can be very useful for this.
    
2. **Permission Details**: For NTFS permissions on network shares, you can use tools like the `Get-Acl` cmdlet in PowerShell. This will show you the Access Control List (ACL) for each resource.
    
3. **Inheritance Information**: This is part of the ACL data. You'll need to check whether permissions are inherited or explicitly set on each resource.
    
4. **Effective Permissions**: This can be complex to calculate.

* * *

**You:**

“So you're saying the ACL data and the inheritance comes from within NTFS rather than on LDAP with Active Directory, so it's not stored there?”

* * *

**ChatGPT:**

Correct. The ACL data, including inheritance information, is stored within the NTFS file system on the file server, not in LDAP or directly within Active Directory. Active Directory primarily

* * *

**You:**

“Okay, okay. But, okay, if it's stored on the file server with NTFS, how can a regular user not change the information? Like, how is it protected?”

* * *

**ChatGPT:**

Good question! NTFS has a robust permission system that controls who can change ACLs. This is managed through a combination of permissions:

- **Owner**: The owner of a file or folder has the inherent right to modify its permissions. By default, the creator is the owner, but this can be transferred.
    
- **Administrators**: Members of the Administrators group have full control over files and folders, including changing ACLs.
    
- **Specific Permissions**: You can grant specific users or groups the permission to change permissions on a file or folder.
    

Regular users typically don't have the permissions needed to modify ACLs unless explicitly granted. This ensures that only

* * *

**You:**

“Okay, so let me get this right. LDAP has all the information you need to figure out memberships, but all of the other important information about inheritance and actual permissions to files comes from within NTFS. Are you 100% sure of that?”

* * *

**ChatGPT:**

Yes, that's correct. LDAP, through Active Directory, provides information about user and group memberships. This is crucial for understanding who has potential access to resources.

On the other hand, NTFS handles the actual file and folder permissions, including inheritance. This is where the detailed access control for resources

* * *

**You:**

“Does Windows have its own implementation of LDAP, or I mean, I've heard that LDAP can be implemented in Linux with something like LDAP, or OpenLDAP, so is LDAP just a part of Active Directory? I'm kind of confused on how to relate that with groups, objects, and all the Active Directory stuff.”

* * *

**ChatGPT:**

Sure, let me clarify.

LDAP is a protocol used for accessing and maintaining distributed directory information services. It's not exclusive to any platform and can be implemented in various environments, including Windows (Active Directory) and Linux (OpenLDAP).

In Windows, Active Directory is a directory service that uses LDAP as one of the protocols to communicate with directory services. Active Directory stores information about objects like users, groups, and computers in a hierarchical structure. LDAP is used to query and update this information.

In Active Directory:

- **Objects** represent entities like users, groups, or devices.
- **Attributes** are properties of these objects (e.g., a user's email address).
- **Groups** are collections of users or other objects, used to simplify permission management.

LDAP enables you to interact with this data, allowing you to search for objects, retrieve attributes, and manage directory entries. So, while LDAP is a protocol, Active Directory is a directory service that uses LDAP among other protocols.

* * *

**You:**

“What are the other protocols as opposed to LDAP that could do the same thing?”

* * *

**ChatGPT:**

In addition to LDAP, Active Directory uses several other protocols to perform various functions:

1. **Kerberos**: Primarily used for authentication. It's a secure method for verifying the identity of users and services on a network.
    
2. **DNS

* * *

**You:**

Build a bullet list based on for all of the different misunderstandings or linchpins that happened in this conversation.  I want some of the realizations or insights that came out of it in terms of things I misunderstood

* * *

**ChatGPT:**

Here’s a list of potential misunderstandings or realizations that emerged from the discussion:

- **DACL Placement**: Initially, it might have been unclear where DACLs are stored. DACLs are tied to resources like files, folders, and Active Directory objects, not users directly.
- **Effective vs. Physical Permissions**: Understanding the difference between explicit permissions (physical) set on a resource and effective permissions, which include inherited permissions and group memberships, was clarified.
- **Role of LDAP**: LDAP is a protocol for querying and updating directory data but does not directly interact with NTFS file systems. Its role in Active Directory is limited to managing directory objects like users, groups, and computers.
- **Kerberos Functionality**: Kerberos handles authentication within Active Directory environments and ensures secure access to resources but does not directly manage DACLs or permissions.
- **Inheritance in Permissions**: The realization that inheritance allows permissions set on parent objects (like folders) to flow down to child objects, simplifying but sometimes complicating access control.
- **DACL Modifications**: Only users with specific permissions, administrators, or the resource owner can modify DACLs, ensuring controlled access to permission settings.
- **Network Share Access Control**: NTFS permissions on file systems manage access to network shares, and the role of Active Directory is primarily to group and authenticate users who attempt access.
- **Storage of ACL Data**: ACL data is part of the NTFS file system metadata, not stored in Active Directory or managed by LDAP.
- **Mapping Permissions**: Mapping out permissions involves understanding both group memberships in Active Directory and inherited NTFS permissions, which together form the effective permissions for a user.
- **Overlap of Protocols and Services**: The distinction between the functions of LDAP, Kerberos, and NTFS in Active Directory ecosystems may have been initially conflated, but their roles were clarified.
    

These insights collectively clarify how permissions, authentication, and directory services interact in Active Directory environments. Let me know if you'd like to explore any of these points further!