---
date created: Thursday, April 18th 2024, 8:11 pm
date modified: Thursday, April 18th 2024, 8:16 pm
---

After moving almost 2 TB of media onto my NAS via SMB share, I noticed the available space dropped in the Dataset UI in TrueNAS Scale.

Current available space incorrect in picture below.
![](_attachments/Dataset%20Available%20Space%20Bug/IMG-20240418201329650.png)

Notice that file explorer shows the correct original size of 10.7 TB rather than 8.91 TB.
- Also, 1.84 + 8.91 = 10.75 TB (the original size)
![](_attachments/Dataset%20Available%20Space%20Bug/IMG-20240418201356638.png)

I guess I'm not sure how the available space is affected in TrueNAS scale.  It seems that something weird is going on with my SMB share and how TrueNAS takes that storage use out of the whole quota.