---
aliases: 
tags: 
publish: true
date created: Monday, May 27th 2024, 1:35 pm
date modified: Monday, May 27th 2024, 1:45 pm
---

[TrueNAS mDNS](../TrueNAS%20mDNS/TrueNAS%20mDNS.md)

# Issue with Truenas.local
- Went off of this [post](https://www.reddit.com/r/truenas/comments/11wtou4/laptop_cant_access_windows_smb/) and tried the local address like `\\192.168.1.96` instead.  
- This activated a login process which may make sense since `truenas.local` isn't resolving to the login screen for TrueNAS at the moment.
- ![400](_attachments/Cannot%20Connect%20to%20Truenas%20SMB/IMG-20240527133723685.png)
- I made sure to use a non-root/non-admin user account that I had created
- Worked then
- Solution: Use the actual IP if the `.local` isn't working from mDNS
