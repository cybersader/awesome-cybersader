---
aliases: []
tags: []
publish: true
permalink:
date created: Thursday, December 5th 2024, 8:09 pm
date modified: Saturday, December 14th 2024, 3:52 pm
---

# IPv6 Tunneling and NAT

- Your parts may jump around a lot.  If you're having party issues, go to Network settings > Advanced and look at alternate port selection.  Make sure that port is open (NAT / firewall rules in your router panel).  Getting to this panel requires you be on your home network, then connect to the likely IP address on the back on your router by typing that IP in your browser to get to the admin panel.

# Ports to Open on NAT/Firewall to Xbox

- [Network ports used by the Xbox network on the Xbox console | Xbox Support](https://support.xbox.com/en-US/help/hardware-network/connect-network/network-ports-used-xbox-live)
- [Tweaking4All.com - pfSense 2.x - How to fix Strict NAT for XBox One](https://www.tweaking4all.com/network-internet/pfsense-strict-nat-xbox-one/)
- 

- Port 88 (UDP)
- Port 3074 (UDP and TCP)
- Port 53 (UDP and TCP)
- Port 80 (TCP)
- Port 500 (UDP)
- Port 3544 (UDP)
- Port 4500 (UDP)

# Don't Buy a Netgear

- The amount of issues I've had thus far after adding a Netgear to [Router IP Passthrough](../../📁%2007%20-%20Cybersader%20Arsenal/Home%20Network/Bridging%20New%20Home%20Router/Bridging%20New%20Home%20Router.md) with my ATT router is frustrating.  I wish it did Bridged, but here we are.  If I could afford a nice Pfsense or Unifi, then I would do it.

- [Solved: Netgear Address Reservation - Invalid MAC Address [Workaround] - iFixit Repair Guide](https://www.ifixit.com/Guide/Solved:+Netgear+Address+Reservation+-+Invalid+MAC+Address+%5BWorkaround%5D/162994)
- ![](_attachments/file-20241205201805625.png)