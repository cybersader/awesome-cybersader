---
publish: true
---
# Framework, Architecture, Components
Framework that fundamentally maps users to a local service or application via an IAM architecture of some kind. What I'm trying to do is create principled framework for self hosting that accounts for confidentiality, convenience, and other aspects. I imagine that there are two approaches to doing secured self hosting. 1. Use an IAM system that connects to a locally hosted service, server, or application by using certain protocols for authorization, software defined networking, or specific protocols. 2. The other way involves tunneling the user to that local network then using things like overlay networks, VPNs, or other systems. Somehow authorization is also used here. What I'm trying to do is create a framework that breaks this down into a diagram with all of the components.

## Components:
- Server Hardware/Infrastructure
	- Physical or virtual hardware that hosts services
	- CPU, RAM, storage, and networking interfaces
- Operating System
	- Interface for hardware to networking, software, applications, etc.
- Networking (in layers):
	- Networking
		- Layer 1,2
			- VLANs
			- Switches
		- Layer 3
			- Layer 3 Switching
			- Layer 3 Packet inspection
			- Routing
			- Firewall
		- Layer 4
			- IDS/IPS
		- Layer 5
	- Security
		- Layer 1,2
			- VLANs
			- Switches
		- Layer 3
			- Layer 3 Switching
			- Layer 3 Packet inspection
			- Routing
			- Firewall
		- Layer 4
			- IDS/IPS
		- Layer 5
- Applications
	- Docker
	- Portainer
	- PostgreSQL Database
- DNS/IP Resolution
- IAM 
	- Authentication
	- Authorization

# Tech Stack
## Hardware & OS
- Raspberry Pi 3
- Virtualization:
	- Docker
- OS - Ubuntu
## Secure Exposition Tech Stacks
### 1. Tunneled Architecture
#### Cloudflare Tunnels
- IAM
	- CloudFlare login acts as authentication
	- Authorization is configured in CloudFlare dashboard
#### TEXT
- Overlay Networks
	- .
- 
- VPN
	- 
- IAM
	- 
### 2. Zero Trust, Interfaced, Granular IAM?
#### TEXT
- Overlay Networks
	- 
- VPN
	- 
- IAM
	- 
#### TEXT
- Overlay Networks
	- 
- VPN
	- 
- IAM
	- 