---
aliases: 
tags: 
publish: true
date created: Thursday, November 7th 2024, 1:17 pm
date modified: Thursday, November 7th 2024, 1:20 pm
---

[Immich & Cloudflare Tunnels](../../📁%2001%20-%20Projects/Home%20Lab,%20Home%20Server/TrueNAS%20Scale%20Home%20Server/Immich%20&%20Cloudflare%20Tunnels/Immich%20&%20Cloudflare%20Tunnels.md)

# The Problem

- Often, you need to transfer a lot of data and doing so requires breaking up the data into pieces by "chunking" it then reassembling it back at the destination.  This is especially true when proxies like Cloudflare are involved which bottleneck or limit the size of requests going through them.  This problem isn't trivial and requires special solutions and implementations.  

# Solution Tech

- [dropzone/dropzone: Dropzone is an easy to use drag'n'drop library. It supports image previews and shows nice progress bars.](https://github.com/dropzone/dropzone)
- [Uppy](https://uppy.io/)
- [23/resumable.js at stackshare](https://github.com/23/resumable.js?ref=stackshare)
- [tus - resumable file uploads](https://tus.io/)

