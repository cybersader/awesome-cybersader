# Common Mobile Usage Policies
- Security starts with policy from the top down
- BYOD has lots of caveats and friction - start this early rather than later in a business
- COPE - company owned and personally enabled - gets complicated with privacy nowadays
- CYOD - choose your own device
- COBO phone holsters lol.  Easier to manage and avoid weird legal cases probably.
# Security Risks and Guidelines with Enterprise Mobile Usage
- Has changed how organizational security is approached
## Risks with BYOD, CYOD, COPE, COBO
- confidential data on unsecured networks
- DLP, data leakage
- improper device disposal
- lost or stolen devices
- bypassing network policies
- infra complexity
- personal and private data mixing
## Guidelines
- Educate employees 
- who owns what data and apps?
- encrypted channels for data transfers
- whitelist and blacklist
- procedure for removing corporate data
- AV and DLP
- remote locate and wiping
- MDM (mobile device management) agent-based solution
	- intune
	- airwatch
	- mobileiron
	- app47
	- scalefusion
- Mobile content management solution
	- secure corporate data
	- vaultize, mobileiron, APPTEC
- mobile threat defense
	- mobileiron, lookout, wandera
	- mobile and network-related attacks
- Mobile email management (MEM)
	- ManageEngine Mobile Device Manager Plus
	- 42Gears
	- 1Mobility
- EMM Enterprise Mobility Management
	- ManageEngine, 42Gears, 1Mobility
- Unified Endpoint Management
	- provisioning remotely, securing, management
	- Mobileiron's UEM
	- Ivanti UEM
	- Workspace ONE
	- API frameworks for custom apps
# Security Implementation
- Mobile AppSec
	- Don't save passwords
	- 2FA
	- SSL/TLS
	- Don't cache too much app data
	- Sanitize inputs
	- Secure session management
	- Protect application settings
## Mobile NetSec
- Disable interfaces you're not using - a little annoying to keep track of
- non-discoverable mode for Bluetooth
- Avoid public wifi unless it's Wifi 6-based guest network
- Use work VPN
- Be careful with automatic reconnect related to various SSID-based attacks
# Guidelines and Tools for Android
- Android Device Admin API
	- Can administer lots of security directly with an API
- Find my device
- AV tools - not Kaspersky
- Vuln scanners
	- 10storlab, Quixxi, BlueBorne
- Life360, iHound, Hoverwatch, track my Android
# Guidelines and Tools for iOS
- Tracking - FindMyiPhone, Phonty, SpyBubble,iLocalis
- Endpoint - Norton, Lookout, SplashID
- 