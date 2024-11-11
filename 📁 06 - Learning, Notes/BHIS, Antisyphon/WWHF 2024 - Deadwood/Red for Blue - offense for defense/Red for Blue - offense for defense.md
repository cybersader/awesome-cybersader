---
aliases: 
tags: 
publish: true
date created: Saturday, October 12th 2024, 11:18 am
date modified: Saturday, October 12th 2024, 11:18 am
---

- Passwordless - it's still authentication
- Credit stuffing is a real issue
- Guessable is bad
- Generate a word list to use as a filter list in AD. It doesn't have to be perfect. Put out something talking about it while you do
- Incremental increase in password security is fine - take the little wins
- Uptime and speed is important to DBAs - you need to secure the service account
- MFA sweep - looks for services without MFA
- What about vendor tech that doesn't support MFA
- Use Bloodhound with Plumhound by ingesting data from AD
- Hacking is more like data archaeology
- File shares - often they find passwords, vmdk, sensitive document
- Powerview, Snaffler
- File shares mean hackers don't have to escalate to get to users
- Fileshare goals - no creds, proper access control, honey files, unusual port 445 activity.
- AD CS is hard to understand
- I used ADCS to fix one problem and now I have 2
- ADCS has common misconfigurations
- Certipy
- LockPick from Trimarc
- Outputs of some of these feed into bloodhound
- Rotating a password never saved a company and only creates friction. It's all speculation
- What does the bad guy want? Simple game theory
- Perfect is the enemy of good
- Layering multiple available pieces of Swiss cheese is easier than engineering the Swiss cheese to not have holes