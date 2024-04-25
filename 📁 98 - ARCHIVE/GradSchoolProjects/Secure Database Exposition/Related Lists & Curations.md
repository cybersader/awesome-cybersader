---
publish: true
---
f# Recon Curations
## Vuln Stuff
- Awesome lists
	- https://github.com/search?q=awesome+vuln&type=repositories
	- [redhuntlabs/Awesome-Asset-Discovery: List of Awesome Asset Discovery Resources](https://github.com/redhuntlabs/Awesome-Asset-Discovery) 
	- 
- Research
	- https://scholar.google.com/scholar?start=20&q=database+attack+enumeration+scan&hl=en&as_sdt=0,15&as_ylo=2019 
- Scanning tools
	- [Zenmap - Official cross-platform Nmap Security Scanner GUI](https://nmap.org/zenmap/) 
	- [Shodan Search Engine](https://www.shodan.io/) 
# Postgres
## Postgres Vulnerabilities
- [PostgreSQL: The PgMiner botnet attacks & Postgres database security | Ubuntu](https://ubuntu.com/blog/postgresql-security-the-pgminer-botnet-attacks-explained) 
- [Security and PostgreSQL - a reminder on various attack surfaces](https://www.cybertec-postgresql.com/en/secure-postgresql-a-reminder-on-various-attack-surfaces/)
- [Attacking PostgreSQL – Penetration Testing Lab](https://pentestlab.blog/2012/04/13/attacking-postgresql/) 
- [Securing PostgreSQL From External Attack](https://momjian.us/main/writings/pgsql/securing.pdf) 
- [Postgres Hacking Part 2 — Code Execution | by Netscylla Cyber Security | Medium](https://medium.com/@netscylla/postgres-hacking-part-2-code-execution-687d24ad2082) 
- [Top PostgreSQL Security Threats | Severalnines](https://severalnines.com/blog/top-postgresql-security-threats/) 
- [Postgres "MITM21" Vulnerabilities](https://www.enterprisedb.com/blog/postgres-mitm21-vulnerabilities) 
- [Postgresql Postgresql : Security vulnerabilities, CVEs](https://www.cvedetails.com/vulnerability-list/vendor_id-336/product_id-575/Postgresql-Postgresql.html) 
- [Securing a PostgreSQL API - DreamFactory Software- Blog](https://blog.dreamfactory.com/securing-a-postgresql-api/) 
- [Defend Against SQL Injection Attacks | EDB](https://www.enterprisedb.com/blog/defend-against-sql-injection-attacks) 
- [Elephants and their vulnerabilities. Most epic CVEs in PostgreSQL – HackMag](https://hackmag.com/security/postgresql-cve-history/) 
- [security - How safe are PostgreSQL triggers against attacks? - Database Administrators Stack Exchange](https://dba.stackexchange.com/questions/239215/how-safe-are-postgresql-triggers-against-attacks) 
## Postgres Tools
- [DBeaver Community | Free Universal Database Tool](https://dbeaver.io/) - DBeaver Community is a free cross-platform database tool for developers, database administrators, analysts, and everyone working with data. It supports all popular SQL databases like MySQL, MariaDB, PostgreSQL, SQLite, Apache Family, and more.
# Networking to Remote & Self-Hosted Servers
- Curated Lists
	- [anderspitman/awesome-tunneling: List of ngrok alternatives and other ngrok-like tunneling software and services. Focus on self-hosting.](https://github.com/anderspitman/awesome-tunneling) 
	- [https://github.com/mikeroyal/Self-Hosting-Guide > vpn](https://github.com/mikeroyal/Self-Hosting-Guide#vpn) 
	- [What are some simple beginner friendly network security practices when self hosting? : r/selfhosted](https://www.reddit.com/r/selfhosted/comments/13tkkyt/what_are_some_simple_beginner_friendly_network/) 
	- [awesome-selfhosted/awesome-selfhosted: A list of Free Software network services and web applications which can be hosted on your own servers](https://github.com/awesome-selfhosted/awesome-selfhosted) 
- 
## Secure Networking, IAM, and Remote Access
- [Authelia - The Single Sign-On Multi-Factor portal for web apps](https://www.authelia.com/) 
	- open-source highly-available authentication server providing single sign-on capability and two-factor authentication to applications running behind [NGINX](https://nginx.org/en/).
- https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/ 
- [Traefik](https://traefik.io/) - Taefik is a modern HTTP reverse proxy and load balancer made to deploy microservices with ease.
- [Cherokee](https://cherokee-project.com/) - Lightweight, high-performance web server/reverse proxy.
- [Cloudflare Tunnel · Cloudflare Zero Trust docs](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/)
- ORY Stuff
	- [ORY Oathkeeper](https://github.com/ory/oathkeeper) is an Identity & Access Proxy (IAP) and Access Control Decision API that authorizes HTTP requests based on sets of Access Rules.
	- [Ory Kratos](https://github.com/ory/kratos) is a developer-friendly, security-hardened and battle-test Identity, User Management and Authentication system for the Cloud. The Kratos identity server (similiar to Auth0, Okta, Firebase) with Ory-hardened authentication, MFA, FIDO2, TOTP, WebAuthn, profile management, identity schemas, social sign in, registration, account recovery, passwordless.
	- [Ory Hydra](https://github.com/ory/hydra) is a hardened, OpenID Certified OAuth 2.0 Server and OpenID Connect Provider optimized for low-latency, high throughput, and low resource consumption. Ory Hydra is not an identity provider (user sign up, user login, password reset flow), but connects to your existing identity provider through a [https://www.ory.sh/docs/hydra/oauth2 > authenticating-users-and-requesting-consent](https://www.ory.sh/docs/hydra/oauth2#authenticating-users-and-requesting-consent).
	- [Ory Keto](https://github.com/ory/keto) is an Open Source (Go) implementation of [Zanzibar: Google's Consistent, Global Authorization System](https://research.google/pubs/pub48190/). It ships gRPC, REST APIs, newSQL, and an easy and granular permission language. Supports ACL, RBAC, and other access models.
- [Tailscale · Best VPN Service for Secure Networks](https://tailscale.com/) - a WireGuard-based app that makes secure, private networks easy for teams of any scale. It works like an overlay network between the computers of your networks using all kinds of NAT traversal sorcery.
	- [Headscale](https://github.com/juanfont/headscale) - open source, self-hosted implementation of the Tailscale coordination server.
- [WireGuard® for Enterprise • Firezone](https://www.firezone.dev/) 
- [Pinecone | Peer-to-Peer overlay router for the Matrix protocol!](https://matrix-org.github.io/pinecone/) 
- [FreeRDP](https://github.com/FreeRDP/FreeRDP) is a free remote desktop protocol library and clients.
- [Rustdesk](https://rustdesk.com/) is an open source virtual/remote desktop infrastructure for everyone. Display and control your PC (Windows, macOS, and Linux) and Android devices.
- [TinyPilot](https://tinypilotkvm.com/) is a tool that enables KVM over IP letting you control any computer remotely.
- [X2Go](https://wiki.x2go.org/) is open source remote desktop software for Linux that uses a modified NX 3 protocol. It gives remote access to a Linux system's GUI
- [Apache Guacamole](https://guacamole.apache.org/) is a clientless remote desktop gateway. It supports standard protocols like VNC, RDP, and SSH.
- [Remmina](https://remmina.org/) is a Remote access screen and file sharing to your desktop. It has Remote Access Protocol Plugins for [RDP](https://remmina.org/remmina-rdp/), [SSH](https://remmina.org/remmina-ssh/), [SPICE](https://remmina.org/remmina-spice/), [VNC](https://remmina.org/remmina-vnc/), [X2Go](https://remmina.org/remmina-x2go/), [HTTP/HTTPS](https://remmina.org/remmina-www/).
- [Remotely](https://github.com/immense/Remotely) is a remote control and remote scripting solution, built with .NET 6, Blazor, SignalR Core, and WebRTC.
- [P2P Remote Desktop](https://github.com/miroslavpejic85/p2p) is a portable, no configuration or installation needed remote desktop tool.
# Network Defenses & Detection
- Firewalls
	- [pfSense](https://www.pfsense.org/about-pfsense/) - pfSense® software is a free, open source customized distribution of FreeBSD specifically tailored for use as a firewall and router that is entirely managed via web interface. In addition to being a powerful, flexible firewalling and routing platform, it includes a long list of related features and a package system allowing further expandability without adding bloat and potential security vulnerabilities to the base distribution.
	- [OPNsense® a true open source security platform and more - OPNsense® is a true open source firewall and more](https://opnsense.org/) 
- IDS- Intrusion Detection System
	- [Snort - Network Intrusion Detection & Prevention System](https://www.snort.org/) - Snort is the foremost Open Source Intrusion Prevention System (IPS) in the world. Snort IPS uses a series of rules that help define malicious network activity and uses those rules to find packets that match against them and generates alerts for users.
	- [Home - Suricata](https://suricata.io/) - Suricata is a high performance, open source network analysis and threat detection software used by most private and public organizations, and embedded by major vendors to protect their assets.
	- 