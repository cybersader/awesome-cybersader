---
aliases:
  - Immich + Cloudflare Tunnels
  - Immich Proxy Limit
tags:
  - CloudflareTunnels
  - cloudflare
publish: true
date created: Monday, June 24th 2024, 8:00 pm
date modified: Wednesday, June 26th 2024, 7:23 pm
---
 
> [!tldr] When using Immich with Cloudflare, you may run into errors when uploading photos or video.  It seems that the proxy has inherent limits per request.  Immich needs to implement a "chunked" approach for such cases.

# Related Links
- [Reverse Proxy | Immich](https://immich.app/docs/administration/reverse-proxy)
	- Users can deploy a custom reverse proxy that forwards requests to Immich. This way, the reverse proxy can handle TLS termination, load balancing, or other advanced features. All reverse proxies between Immich and the user must forward all headers and set the `Host`, `X-Real-IP`, `X-Forwarded-Proto` and `X-Forwarded-For` headers to their appropriate values. Additionally, your reverse proxy should allow for big enough uploads. By following these practices, you ensure that all custom reverse proxies are fully compatible with Immich.
- [413 Request Entity Too Large - How to increase the size? - Website, Application, Performance / DNS & Network - Cloudflare Community](https://community.cloudflare.com/t/413-request-entity-too-large-how-to-increase-the-size/330117)
- [Max upload size - Zero Trust / Cloudflare Tunnel - Cloudflare Community](https://community.cloudflare.com/t/max-upload-size/630925)
- [Community Guides | Immich](https://immich.app/docs/community-guides/)
- [Has anyone solved cloudflare's problem with uploading files larger than 1GB?](https://github.com/immich-app/immich/discussions/8299#discussioncomment-9569293)
- [How To Bypass Cloudflare Max Upload Size 100 MB Limit - YouTube](https://www.youtube.com/watch?v=V61Z0WEbVtE&feature=youtu.be)
- [Alternative to Cloudflare zero trust tunnel with >1GB upload : r/CloudFlare](https://www.reddit.com/r/CloudFlare/comments/18vhu4p/alternative_to_cloudflare_zero_trust_tunnel_with/)
- [[Guide] Cloudflare Tunnels with SSO/OAuth working for immich · immich-app/immich · Discussion #8299](https://github.com/immich-app/immich/discussions/8299)
- [Max upload size - Zero Trust / Cloudflare Tunnel - Cloudflare Community](https://community.cloudflare.com/t/max-upload-size/630925)
- [413 Request Entity Too Large - How to increase the size? - Website, Application, Performance / DNS & Network - Cloudflare Community](https://community.cloudflare.com/t/413-request-entity-too-large-how-to-increase-the-size/330117)
- 
# The Why/Issue
- Cloudflare uses other networks and limits request sizes to 100 MB.  Even if you chunk it with [Chunked transfer encoding](https://en.wikipedia.org/wiki/Chunked_transfer_encoding#:~:text=Chunked%20transfer%20encoding%20is%20a,received%20independently%20of%20one%20another.), you still run into the issue where the cache for Cloudflare [fills up](https://github.com/immich-app/immich/discussions/1674). The mobile app allows, seemingly, up to 1 GB now. 

# The Solution
Can't use Cloudflare Tunnels until Immich implements chunking from their clients to the server. This will need to be done on the mobile app and the web client.

The request needs to be broken up into pieces on the client application side and then streamed over to the server in chunks.  There are libraries for doing this that they're trying to implement.

There is a feature request for this currently - [[Feature]: Upload large files in chunks · immich-app/immich · Discussion #1674](https://github.com/immich-app/immich/discussions/1674)

Ironically, this was mentioned last week.


