---
aliases: []
tags: []
publish: true
date created: Sunday, November 24th 2024, 5:03 pm
date modified: Sunday, November 24th 2024, 5:23 pm
---

Long story short, I "bridged" with "IP passthrough" from my ATT router/modem to a replacement router to get [NAT Loopback](../../../Home%20Network/NAT%20&%20Self-Hosting/NAT%20&%20Self-Hosting.md) to work and because the new one used 10.0 addresses instead of 192.168 addresses, all the apps broke.

- [Bridging New Home Router](../../../Home%20Network/Bridging%20New%20Home%20Router/Bridging%20New%20Home%20Router.md)

Here's me attempting to fix the TrueNAS issues and re-network it.

# The Error

Forum post with error below:
- [[EFAULT] Unable to determine default interface - TrueNAS General - TrueNAS Community Forums](https://forums.truenas.com/t/efault-unable-to-determine-default-interface/21716)

Related links:
- [Changed router, now truenas scale server can't connect or be connected to. (Please help I've spent like 6 hours on this) : r/truenas](https://www.reddit.com/r/truenas/comments/11ctd4c/changed_router_now_truenas_scale_server_cant/)
- [SOLVED - Cant connect to Truenas after changing router | TrueNAS Community](https://www.truenas.com/community/threads/cant-connect-to-truenas-after-changing-router.111060/)
- [Moving networks | TrueNAS Community](https://www.truenas.com/community/threads/moving-networks.107346/)
- [New modem/router broke Scale connectivity to outside - TrueNAS General - TrueNAS Community Forums](https://forums.truenas.com/t/new-modem-router-broke-scale-connectivity-to-outside/5563)
- [Changed my network, how to access now? | TrueNAS Community](https://www.truenas.com/community/threads/changed-my-network-how-to-access-now.105285/)

# The Solution - Easy

- In TrueNAS Scale, change your Network > Global Configuration > Nameservers and Default Route settings to reflect the new gateway server (the new router)
- Then, restart TrueNAS Scale 

## Fixing Reverse Proxies

- You'll have to remap to the internal services
- Look in TrueNAS at each app and click "Web UI" after clicking on the app, redirect to the browser, and grab the address with the port.  Put these into something like Nginx Proxy Manager.