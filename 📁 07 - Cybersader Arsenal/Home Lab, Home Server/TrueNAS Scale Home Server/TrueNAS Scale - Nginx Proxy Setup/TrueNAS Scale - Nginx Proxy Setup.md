---
permalink:
aliases: []
tags: [cgnat, CGNAT, "#truenas", "#setup-guide", "#nginx-proxy", "#nginx", "#cloudflare", SSL, TLS]
publish: true
date created: Saturday, August 10th 2024, 7:07 pm
date modified: Monday, December 23rd 2024, 11:58 am
---


- [ ] Implement Nginx reverse proxy ➕ 2024-08-18

[TrueNAS Immich Setup](../TrueNAS%20Immich%20Setup/TrueNAS%20Immich%20Setup.md)
[Immich & Cloudflare Tunnels](../Immich%20&%20Cloudflare%20Tunnels/Immich%20&%20Cloudflare%20Tunnels.md)
[PfSense with Local Services](../../PfSense%20with%20Local%20Services/PfSense%20with%20Local%20Services.md)

# Links

Most of these quite recent

- [No more Cloudflare Tunnels for me... - RaidOwl - YouTube](https://www.youtube.com/watch?v=2fA6u9eahNw) - accounts for being behind consumer-grade NAT (CGNAT) where you can't port forward. 
- [Self Hosting on your Home Server - Cloudflare + Nginx Proxy Manager - Easy SSL Setup - YouTube](https://www.youtube.com/watch?v=GarMdDTAZJo)
- [Nginx Proxy Manager Setup | TrueNAS Community](https://www.truenas.com/community/threads/nginx-proxy-manager-setup.116682/)
- [Guide | Nginx Proxy Manager](https://nginxproxymanager.com/guide/)
- [Secure Your Domain with NGINX Proxy Manager and Cloudflare (Including Uptime Kuma Demonstration) - YouTube](https://www.youtube.com/watch?v=rj7DZdWMK2k)
- [Nginx Proxy Manager Tutorial - Easy SSL Certificates - YouTube](https://www.youtube.com/watch?v=JNFQOJP5VY0)
- [Wildcard Certificate in Nginx Proxy Manager Using Cloudflare | PengWin Tech](https://pengwin.ca/posts/npm-cloudflare/)

## Learning

- [What is a reverse proxy? | Proxy servers explained | Cloudflare](https://www.cloudflare.com/learning/cdn/glossary/reverse-proxy/)
- 

# Setting Up Nginx Reverse Proxy on TrueNAS

[Turning Old PC into NAS in 2024](../Turning%20Old%20PC%20into%20NAS%20in%202024/Turning%20Old%20PC%20into%20NAS%20in%202024.md)

## Prerequisites, Requirements, Caveats

- Nginx Proxy Manager app will only install onto an SSD-based dataset?
	- [Note: Ngnix will only sucessfully install on a SSD - not HDD](https://www.truenas.com/community/threads/step-by-step-instructions-to-set-up-nextcloud-and-nginx-official-apps-for-newbies.115072/)
	- [Nginx proxy Manager - Container Startup Probe Failed: NOT OK | TrueNAS Community](https://www.truenas.com/community/threads/nginx-proxy-manager-container-startup-probe-failed-not-ok.114767/)
	- [Can't install Nginx Proxy Manager | TrueNAS Community](https://www.truenas.com/community/threads/cant-install-nginx-proxy-manager.111184/)
	- [There is a dirty hack to fix this issue is using s6 hook](https://www.truenas.com/community/threads/nginx-proxy-manager-wont-deploy.113904/)
	- [Nginx Proxy Manager won't deploy - Apps and Virtualization - TrueNAS Community Forums](https://forums.truenas.com/t/nginx-proxy-manager-wont-deploy/8076)
		- the issue is that the startup probes are misconfigured, simply kubernetes waits for the app to start up and restarting it if it fails to start within a given amount of time combined with the startup scripts that take ownership of a directory very slowly… it leads to an endless restart during first run on most systems. the environment variable just skips the take-ownership script, blindly hoping that this reduces the time enough that it actually might start this time… the real solution is to just disable startup probes but the ix “official” apps don’t give you the option to do so, this is also a problem with Plex/Jellyfin or any app that does lengthy migrations too, they usually just get corrupted badly by a restart loop. the custom app button does give you most of the required options though… and can be used to side-step fundamentally broken charts like this one (which has had this issue for at least a year but since a lot in the past simply used truecharts, no one has cared till now)

- S6_STAGE2_HOOK
	- `sed -i $d /etc/s6-overlay/s6-rc.d/prepare/30-ownership.sh`

## Prepare TrueNAS Datasets for Nginx App

- If we want to save the data for Nginx app so that we can move the data to another TrueNAS or recover, then we just need to use host path

First, make the datasets.

- ![600](_attachments/IMG-20240928182245473.png)

- ![600](_attachments/IMG-20240928182245567.png)
- We have to add 2 datasets for each storage components of the Nginx Proxy Manager app
- Dataset configs 
	- Set the appropriate names for each like "Nginx_Data" and "Nginx_Cert_Data" or whatever you want

## Setting Nginx App ACL/Permissions

- Still unsure of how this should look in TrueNAS
- Nginx user and group config
- Make sure the datasets are configured to the same User ID (likely "apps")

## Add Nginx App to TrueNAS

- Apps > Discover Apps > Networking > Nginx Proxy Manager
- "Install"
- Storage configuration
	- ![](_attachments/IMG-20240928182245700.png)

### Environment Variables

These are also required for Apps like Immich

- [Nginx Proxy Manager won't deploy | TrueNAS Community](https://www.truenas.com/community/threads/nginx-proxy-manager-wont-deploy.113904/) 
	- NGINX won't deploy if you don't put your datasets on an SSD...usually.  You can use a weird environment variables for now.
	- You have to put in the below environment variables for things to work:
		- `S6_STAGE2_HOOK=sed -i $d /etc/s6-overlay/s6-rc.d/prepare/30-ownership.sh`

## Set Up Nginx DNS + SSL, Router Firewall Rules

- [Full Setup Instructions | Nginx Proxy Manager](https://nginxproxymanager.com/setup/)
	- Use default creds from instructions
	- ![](_attachments/IMG-20240928182245869.png)

### Cloudflare / DNS Records Setup

![](_attachments/Drawing%202024-09-28%2018.39.28.excalidraw.svg)

- Follow the instructions:
	- [HomeLab: Nginx-Proxy-Manager: Setup SSL Certificate with Domain Name in Cloudflare DNS | by Life-is-short--so--enjoy-it | Medium](https://medium.com/@life-is-short-so-enjoy-it/homelab-nginx-proxy-manager-setup-ssl-certificate-with-domain-name-in-cloudflare-dns-732af64ddc0b)

This gives the self-hosted Nginx Proxy Manager an API token, so that it can dynamically change the DNS for Cloudflare and point to the home server network...at least it seems to be the case.

To add "proxy hosts" that point to local services or TrueNAS Scale Apps - [How to Expose Services with the Nginx Proxy Manager | Linode Docs](https://www.linode.com/docs/guides/using-nginx-proxy-manager/#configuring-the-nginx-proxy-manager)

Use this article to initially get things going - [Ultimate Home Lab – Dynamic IPs, CloudFlare & Nginx Proxy Manager – ApexLemons](https://apexlemons.com/devops/ultimate-home-lab-dynamic-ips-cloudflare-nginx-proxy-manager/)

- [HomeLab 4: Install and configure Nginx Proxy Manager with SSL Wildcard Certs | Claudiu's Blog](https://claudiu.psychlab.eu/post/homelab-4-install-and-configure-nginx-proxy-manager-with-ssl-wildcard-certs/)

## DNS Records in Cloudflare - DNS Only or Proxied?

- 

## Solving HTTP 522 Errors - "Connection timed out"

- [Community Tip - Fixing Error 522: Connection timed out - Tutorial - Cloudflare Community](https://community.cloudflare.com/t/community-tip-fixing-error-522-connection-timed-out/42325)

## Do I Use HTTP or HTTPS in Nginx Proxy Manager?

- When setting up "Proxy Hosts"
- Use "http" unless you care about hiding traffic on the local network, then you'll need to do some TLS stuff
- https://youtu.be/2fA6u9eahNw?si=uLVbPklc5ZYCap1m&t=399

## Whitelisting Only Cloudflare to Talk to Nginx (NPM)

- [How to use the real_ip_header in Nginx Proxy Manager, whilst using still using access lists for Cloudflare? : r/selfhosted](https://www.reddit.com/r/selfhosted/comments/zp2vsf/how_to_use_the_real_ip_header_in_nginx_proxy/)
- .

# SSL Certificate Setup in Nginx Proxy Manager w/Cloudflare API Token

- [HOWTO: Add a wildcard certificate in Nginx Proxy Manager using Cloudflare. : r/unRAID](https://www.reddit.com/r/unRAID/comments/kniuok/howto_add_a_wildcard_certificate_in_nginx_proxy/)
- Still getting HTTP Error code 526 - failed SSL certificate

# Home Router NAT Rules

![800](_attachments/file-20240929201859379.png)

- For ATT BGW routers
	- Go to Firewall > NAT/Gaming
	- Custom Services
	- Make a service name
		- https_proxy or something similar
		- Host port should match the Nginx proxy manager port when you click "Web portal" in Truenas
		- The global port range should just be 443 for HTTPS
		- What this means is that 443 (a request from a browser @ the immich.example.com domain will actually forward to the Nginx Proxy Manager server automatically with the request
		- Fast forward to the end of "SSL Certificate Issues" to see how I originally messed up.

# SSL Certificate Issues

- Still getting errors
	- HTTP 526
	- ![600](_attachments/file-20240929143050170.png)
	- "nginx wildcard certificate cloudflare dns challenge"
		- [Wildcard Certificate in Nginx Proxy Manager Using Cloudflare | PengWin Tech](https://pengwin.ca/posts/npm-cloudflare/) 
	- I've tried 
		- 1) the "DNS challenge" method where the certs are automatically renewed via the Cloudflare API
		- 2) Installing a custom cert from the "Origin Server" screen in cloudflare and putting it into Nginx UI as ".pem" files
- Tried looking at nginx logs
	- ![](_attachments/file-20240929171053880.png)
- Checked "date" and found it using PDT time
	- Assuming this is not an issue even though it supposedly can be with some certs - doubt it for this case
- Bypassing using DNS only didn't help either in Cloudflare for the A record
- NPM settings are all correct for SSL and domains
- Testing ports on router from outside
	- ![400](_attachments/file-20240929172222474.png)
- Outdated browsers? ... nope
	- [General SSL errors | Cloudflare SSL/TLS docs](https://developers.cloudflare.com/ssl/troubleshooting/general-ssl-errors/) 
	- [Server Name Indication | Can I use... Support tables for HTML5, CSS3, etc](https://caniuse.com/sni) - table with supported browser for "SNI"
- More Cloudflare troubleshooting
	- ![](_attachments/file-20240929181729417.png)
- Pausing Cloudflare proxying (DNS only) and testing
	- [Pause Cloudflare | Cloudflare Fundamentals docs](https://developers.cloudflare.com/fundamentals/setup/manage-domains/pause-cloudflare/)
	- [Error 526 Invalid SSL certificate (running nginx) - Website, Application, Performance / Security - Cloudflare Community](https://community.cloudflare.com/t/error-526-invalid-ssl-certificate-running-nginx/255486)
	- 
	- ![](_attachments/file-20240929182400166.png)
	- ssl shopper
		- ![](_attachments/file-20240929182917441.png)
	- Oh...so this is the issue
- Okay. This is weird. When turning everything to DNS only and using SSL checker online, I can see that the issue is the SSL certificate. I used the DNS challenge so I thought everything should be okay. The common name somehow said localhost and SANs localhost with iXsystems as the organization since I'm using TrueNAS. This must be a self-signed certificate from using port 443 with TrueNAS scale. This is where I'm confused since Nginx proxy uses a specific port on my local network, but everything online acts like it automatically is contacted via port 443 into my network. It could be that I need to map 443 to the actual port for it on TrueNAS Scale. It's hard to tell. Understanding how to see the SSL despite proxying it with Cloudflare could also be helpful by hitting my public IP with the 443 port.
- Looked at nginx configuration in TrueNAS Scale
	- ![](_attachments/file-20240929200355351.png)
	- Turns out HTTPS Port is 30022, so that means my firewall/ISP router needs to map to that port from 443 instead
	- Changed home router configuration
	- Found the solution...I'm an idiot.  Go back in time and tell my parents not to have me.  
		- ![](_attachments/file-20240929201449073.gif)
	- ![](_attachments/file-20240929201846556.png)

# Misc

## Testing SSL Security

- https://www.ssllabs.com/ssltest/analyze.html?d=example.com