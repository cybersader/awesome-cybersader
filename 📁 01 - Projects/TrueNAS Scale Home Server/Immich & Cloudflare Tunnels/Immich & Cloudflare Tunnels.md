---
aliases:
  - Immich + Cloudflare Tunnels
  - Immich Proxy Limit
tags: 
publish: true
date created: Monday, June 24th 2024, 8:00 pm
date modified: Monday, June 24th 2024, 8:02 pm
---

> [!tldr] When using Immich with Cloudflare, you may run into errors when uploading photos or video.  It seems that the proxy has inherent limits per request.  Immich needs to implement a "chunked" approach for such cases.

# Related Links
- [Reverse Proxy | Immich](https://immich.app/docs/administration/reverse-proxy)
	- Users can deploy a custom reverse proxy that forwards requests to Immich. This way, the reverse proxy can handle TLS termination, load balancing, or other advanced features. All reverse proxies between Immich and the user must forward all headers and set the `Host`, `X-Real-IP`, `X-Forwarded-Proto` and `X-Forwarded-For` headers to their appropriate values. Additionally, your reverse proxy should allow for big enough uploads. By following these practices, you ensure that all custom reverse proxies are fully compatible with Immich.
- [413 Request Entity Too Large - How to increase the size? - Website, Application, Performance / DNS & Network - Cloudflare Community](https://community.cloudflare.com/t/413-request-entity-too-large-how-to-increase-the-size/330117)
- [Max upload size - Zero Trust / Cloudflare Tunnel - Cloudflare Community](https://community.cloudflare.com/t/max-upload-size/630925)
- [Community Guides | Immich](https://immich.app/docs/community-guides/)
- [Has anyone solved cloudflare's problem with uploading files larger than 1GB?](https://github.com/immich-app/immich/discussions/8299#discussioncomment-9569293)

# Workarounds
- 

# The Solution
- Can't use Cloudflare Tunnels

