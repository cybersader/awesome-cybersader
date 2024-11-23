---
aliases: 
tags: 
publish: true
date created: Friday, March 29th 2024, 12:43 pm
date modified: Friday, November 22nd 2024, 2:33 pm
---

# Links

- ["Bad Gateway" when creating Cloudflare tunnel using mDNS name - Feedback / Feature Request Submitting & Feedback - Cloudflare Community](https://community.cloudflare.com/t/bad-gateway-when-creating-cloudflare-tunnel-using-mdns-name/453511)
- [Easy Tunnels + Private Network + Warp macOS: No routing - Zero Trust / Cloudflare Tunnel - Cloudflare Community](https://community.cloudflare.com/t/easy-tunnels-private-network-warp-macos-no-routing/385877)
- [Private networks · Cloudflare Zero Trust docs](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/private-net/) 
- [Connect private networks · Cloudflare Zero Trust docs](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/private-net/cloudflared/) 
- [Private DNS · Cloudflare Zero Trust docs](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/private-net/cloudflared/private-dns/) 

# mDNS and Cloudflare Tunnels Issue

Person: 
- Okay I've got a TrueNAS scale OS running nextcloud and cloudflare tunnels.  I was trying to set up the cloudflare tunnel and had cloudflared as a TrueNAS app.  TrueNAS Scale in this case has `truenas.local` to resolve to 192.168.1.96, but I'm confused where this is configured.  In Tunnels, I was trying to map a public hostname nextcloud.example.com to https://truenas.local:9001, but that wouldn't work.  Instead, what worked was using the actual local IP address instead.  This confuses me because I would think truenas.local would just resolve to that anyway

ChatGPT: 
- It sounds like you've encountered an issue with DNS resolution in the context of your Cloudflare Tunnel setup. The difference in behavior when using `truenas.local` versus the direct IP address `192.168.1.96` for your TrueNAS SCALE system, especially in routing traffic through Cloudflare Tunnels, can be due to several factors. Here's a breakdown of potential issues and considerations: 
1. ** Domains:**  The `.local` domain is typically used for mDNS (Multicast DNS) within local networks, primarily for zero-configuration networking. Devices that support mDNS can resolve `.local` hostnames without any additional DNS server. However, when you're configuring services that interact with external systems (like Cloudflare Tunnels), the external resolver (in this case, Cloudflare's resolver) might not be able to resolve `truenas.local` because it's a local domain name intended for mDNS within your network. 
2. **External DNS Resolvers:**  Cloudflare and other external services rely on publicly accessible DNS records to resolve domain names. Since `truenas.local` is not a publicly resolvable domain, Cloudflare cannot resolve it to an IP address, leading to the failure when you try to map `nextcloud.example.com` to `https://truenas.local:9001`. On the other hand, using the IP address `192.168.1.96` directly bypasses the need for DNS resolution, allowing Cloudflare to route the traffic accordingly. 
3. **Solutions and Workarounds:**  
- **Use IP Address Directly:**  As you've discovered, using the direct IP address avoids the issue entirely. This is a straightforward solution but might not be ideal if the IP address changes. 
- **Internal DNS Server:**  If you have an internal DNS server (like pfSense, Pi-hole, or another DNS service on your network), you can create a DNS record for `truenas.local` or another hostname that points to `192.168.1.96`. Then, configure Cloudflare Tunnel to use a hostname that is resolvable both internally (by your devices) and externally (by mapping a public domain to the internal one using Cloudflare DNS). 
- **Hosts File:**  Modifying the `hosts` file on specific machines to resolve `truenas.local` to `192.168.1.96` can work for local resolutions but is not scalable and does not address the core issue with Cloudflare Tunnels. 
4. **Best Practice:**  It's generally recommended to use a fully qualified domain name (FQDN) that you control for services exposed through Cloudflare Tunnels. This FQDN should have a DNS record in Cloudflare pointing to the Tunnel's public hostname. For accessing services internally, ensure your local DNS resolver can resolve the FQDN to the internal IP address, providing seamless access both internally and externally.

In summary, the issue arises from the nature of `.local` domains and their incompatibility with external DNS resolution systems. Using an IP address directly is a functional workaround, but for a more robust and scalable solution, consider setting up internal DNS resolutions that align with your external DNS configurations.

Person: 
- When I type truenas.local into my browser, how is that resolved?  Where does mDNS have to be supported. Does my browser implement mDNS?  I'm just trying to understand where and how this works. Can you use textual diagrams as well?

ChatGPT: 
- Understanding how your browser resolves `truenas.local` involves delving into the mDNS (Multicast DNS) protocol and where it operates in your network. mDNS is part of the Zeroconf (Zero Configuration Networking) suite, which allows devices on the same local network to discover each other and establish communication using human-readable names without the need for a central DNS server. Here's a step-by-step explanation, including a textual diagram to illustrate the process:

### How mDNS Works 

1. **mDNS Support:**  For `truenas.local` to be resolved, both the source (e.g., your computer) and the target (e.g., your TrueNAS SCALE system) must support mDNS. Most modern operating systems, including Windows (after installing the Bonjour service), macOS, Linux, and various IoT devices, support mDNS. 
2. **Query Broadcast:**  When you type `truenas.local` into your browser, if the operating system supports mDNS, it recognizes `.local` as a special domain. Instead of querying a standard DNS server, it broadcasts an mDNS query over the local network (LAN) on a special multicast IP address (224.0.0.251 for IPv4 or ff02::fb for IPv6) and a specific port (5353).

```css
[Your Browser/OS] --mDNS query for truenas.local--> [Local Network Multicast]
```

 
1. **Response from TrueNAS SCALE:**  Your TrueNAS SCALE system, configured with the hostname `truenas.local` and supporting mDNS, listens for mDNS queries on the network. Upon receiving a query for `truenas.local`, it responds directly to the querying device with its IP address, `192.168.1.96`.

```css
[TrueNAS SCALE] --mDNS response: 192.168.1.96--> [Your Browser/OS]
```

 
1. **Browser Connects:**  With the IP address resolved via mDNS, your browser can now connect directly to the TrueNAS SCALE interface or service using the IP address it received.

```css
[Your Browser] --HTTP/S request--> [TrueNAS SCALE at 192.168.1.96]
```

### Textual Network Diagram

```scss
[Browser] ---> [mDNS Query] ---> [Local Network Multicast on 224.0.0.251:5353]
                |
                | (Looking for truenas.local)
                V
[Local Network] <--- [mDNS Response] <--- [TrueNAS SCALE (truenas.local at 192.168.1.96)]
                |
                | (IP Address 192.168.1.96)
                V
[Browser] ---> [Connects to TrueNAS SCALE using 192.168.1.96]
```

### Considerations 

- **Browser and OS Support:**  Modern browsers delegate DNS resolution to the operating system's network stack. Therefore, if your OS supports mDNS (which most do, either natively or via additional software), then your browser will be able to resolve `.local` domains through mDNS. 
- **mDNS Limitations:**  mDNS is designed to work within a single broadcast domain, typically a local network. It does not route across different networks or the internet. 
- **Security and Performance:**  While mDNS is convenient for local network discovery, it's worth being mindful of security and performance considerations, especially in larger networks or environments with many IoT devices.

Understanding mDNS and its role in local DNS resolution can clarify how devices like your TrueNAS SCALE system are easily discoverable and accessible by name within your local network.

