# Home Network - Monitoring & Tests

# Bettercap w/Monitoring & IDS

## Getting Ubuntu 20.04 on VMware

[How To Install Ubuntu 20.04 LTS On Windows Using VMware Workstation Player | Tutorials24x7](https://ubuntu.tutorials24x7.com/blog/how-to-install-ubuntu-20-04-lts-on-windows-using-vmware-workstation-player) 

## Bettercap for ARP Spoofing

[Install Bettercap on Ubuntu 18.04 and use the Events Stream](https://linuxhint.com/install-bettercap-on-ubuntu-18-04-and-use-the-events-stream/) 

### Better Networking

[Networking 101: VLANs and Network Layers — McCann Tech](https://evanmccann.net/blog/networking-101/vlans-and-network-layers) 

### How ARP works?

[What Is an ARP Table? Address Resolution Protocol 101 | Auvik](https://www.auvik.com/franklyit/blog/what-is-an-arp-table/) 

[Address Resolution Protocol Tutorial, How ARP work, ARP Message Format](https://www.omnisecu.com/tcpip/address-resolution-protocol-arp.php)

[ARP (Address Resolution Protocol) explained](https://study-ccna.com/arp/) 

- Each node in a network **(hosts, gateways)**
    - have an ARP table which has **(MAC, IP) pairs**.
- Addresses
    - physical: MAC (media access control)
    - network: IP (internet protocol)

![Untitled](Home%20Network%20-%20Monitoring%20&%20Tests%2094bef3bb7b0744ec8ecfca0ab5363f93/Untitled.png)

- Host A wants to communicate with host B.
    - It knows Host B’s IP address, but not its MAC address
- Host A sends out ARP request to find Host B’s MAC address
    - It lists the IP of Host B and the MAC addressFF:FF:FF:FF:FF:FF (Ethernet broadcast)
        - everyone knows this means - “I don’t know the MAC address”
- The switch forwards this request to all neighboring interfaces
- The interface that has the matching IP address will reply
    - the other interfaces (hosts, computers) will just drop the packet
- All operating systems maintain ARP caches that are checked before sending ARP request messages
- HOST A can communicate with HOST B

### What is ARP Spoofing

[ARP Poisoning: What it is & How to Prevent ARP Spoofing Attacks](https://www.varonis.com/blog/arp-poisoning) 

![Untitled](Home%20Network%20-%20Monitoring%20&%20Tests%2094bef3bb7b0744ec8ecfca0ab5363f93/Untitled%201.png)

## Installing Bettercap

- Outdated tutorial - [Install Bettercap on Ubuntu 18.04 and use the Events Stream](https://linuxhint.com/install-bettercap-on-ubuntu-18-04-and-use-the-events-stream/)
    - https://github.com/bettercap/bettercap/releases
- `sudo apt-get install build-essential libpcap-dev net-tools`
- `sudo mv -v bettercap /usr/bin`
- For https://github.com/bettercap/bettercap/releases/tag/v2.4 (Insomniac Gopher)
    - [Install Bettercap on Ubuntu 18.04 and use the Events Stream](https://linuxhint.com/install-bettercap-on-ubuntu-18-04-and-use-the-events-stream/)
    - extra steps to get libpcap.so
    - `sudo find / -name [libpcap.so](http://libpcap.so/) 2> /dev/null`
    - `sudo ln -s /usr/lib/x86_64-linux-gnu/libpcap.so /usr/lib/x86_64-linux-gnu/libpcap.so.1`
    - `sudo apt-get install libnetfilter-queue-dev`

## Running Bettercap GUI

- [Web UI :: bettercap](https://www.bettercap.org/usage/webui/)
- Running Bettercap from command line:
    - `sudo bettercap -eval "caplets.update; ui.update; q”`
    - `sudo bettercap -caplet http-ui`
    - `sudo bettercap -caplet https-ui`
- Arp Spoofing in the “advanced” section
    
    ![Untitled](Home%20Network%20-%20Monitoring%20&%20Tests%2094bef3bb7b0744ec8ecfca0ab5363f93/Untitled%202.png)
    
    ![Untitled](Home%20Network%20-%20Monitoring%20&%20Tests%2094bef3bb7b0744ec8ecfca0ab5363f93/Untitled%203.png)
    
- Found the subnet for the network using “Fing”
    
    ![Screenshot.png](Home%20Network%20-%20Monitoring%20&%20Tests%2094bef3bb7b0744ec8ecfca0ab5363f93/Screenshot.png)
    
- Changed to full duplex, so that we MITM the replies, and I changed the targets to work with the current subnet
    
    ![Untitled](Home%20Network%20-%20Monitoring%20&%20Tests%2094bef3bb7b0744ec8ecfca0ab5363f93/Untitled%204.png)
    
- ARP Spoofing DIDN’T WORK
    - Seems to be an issue with the type of networking being used for the Ubuntu VM
    - [Configuring Bridged Networking](https://docs.vmware.com/en/VMware-Workstation-Pro/16.0/com.vmware.ws.using.doc/GUID-BAFA66C3-81F0-4FCA-84C4-D9F7D258A60A.html) or [Configure Bridged Networking for an Existing Virtual Machine](https://docs.vmware.com/en/VMware-Workstation-Pro/16.0/com.vmware.ws.using.doc/GUID-826323AD-D014-475D-8909-DFA73B5A3A57.html)
        - With bridged networking, the virtual network adapter in the virtual machine connects to a physical network adapter in the host system. The host network adapter enables the virtual machine to connect to the LAN that the host system uses. Bridged networking works with both wired and wireless host network adapters.
        
        ![Untitled](Home%20Network%20-%20Monitoring%20&%20Tests%2094bef3bb7b0744ec8ecfca0ab5363f93/Untitled%205.png)
        
- Reset the Home Network Completely
    
    ![Untitled](Home%20Network%20-%20Monitoring%20&%20Tests%2094bef3bb7b0744ec8ecfca0ab5363f93/Untitled%206.png)
    
    - reconnected devices
- Trying ARP spoofing on Secondary mesh router
    - Checking IP and MAC of VM
        
        ![Untitled](Home%20Network%20-%20Monitoring%20&%20Tests%2094bef3bb7b0744ec8ecfca0ab5363f93/Untitled%207.png)
        
    - Made sure that it matches up with the NETGEAR router
    - Activating arp spoof with full duplex for replies
        - spoofing keeps failing
        
        ![Untitled](Home%20Network%20-%20Monitoring%20&%20Tests%2094bef3bb7b0744ec8ecfca0ab5363f93/Untitled%208.png)
        
    - Logged into the gateway router to check security settings
        
        ![Untitled](Home%20Network%20-%20Monitoring%20&%20Tests%2094bef3bb7b0744ec8ecfca0ab5363f93/Untitled%209.png)
        
- Trying ARP spoofing on modem-connected router
    - Switched to the wifi network straight from the gateway
        
        ![Untitled](Home%20Network%20-%20Monitoring%20&%20Tests%2094bef3bb7b0744ec8ecfca0ab5363f93/Untitled%2010.png)
        
    - still not working

# Trying SPAN or Mirrored Port

## Xfinity Modem

- I’m gonna try changing it to bridged mode to see if that changes anything
- Nevermind. My family doesn’t want me to

![Untitled](Home%20Network%20-%20Monitoring%20&%20Tests%2094bef3bb7b0744ec8ecfca0ab5363f93/Untitled%2011.png)

![Untitled](Home%20Network%20-%20Monitoring%20&%20Tests%2094bef3bb7b0744ec8ecfca0ab5363f93/Untitled%2012.png)

# Why Network Monitoring is Hard

![1000000687.jpg](Home%20Network%20-%20Monitoring%20&%20Tests%2094bef3bb7b0744ec8ecfca0ab5363f93/1000000687.jpg)

![1000000688.jpg](Home%20Network%20-%20Monitoring%20&%20Tests%2094bef3bb7b0744ec8ecfca0ab5363f93/1000000688.jpg)

![1000000731.jpg](Home%20Network%20-%20Monitoring%20&%20Tests%2094bef3bb7b0744ec8ecfca0ab5363f93/1000000731.jpg)

![Untitled](Home%20Network%20-%20Monitoring%20&%20Tests%2094bef3bb7b0744ec8ecfca0ab5363f93/Untitled%2013.png)