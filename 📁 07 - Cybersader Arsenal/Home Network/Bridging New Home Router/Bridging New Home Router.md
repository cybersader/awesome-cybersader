---
aliases: [Router IP Passthrough, Using New Home Router with ISP Modem]
tags: []
publish: true
date created: Saturday, November 23rd 2024, 6:08 pm
date modified: Sunday, November 24th 2024, 2:55 pm
---

# Netgear Nighthawk Router Issues 

Trying to Get [NAT Loopback](../NAT%20&%20Self-Hosting/NAT%20&%20Self-Hosting.md) Working for Self-Hosted Services (Servers)

- Essentially you have to go to Home Network > IP Allocation.  Then, look for the IP address that the ATT router gave to the new router
- Use this in your browser instead

- Original subnets
	- 
	- 

# Bridging Your ISP Router to Your Own: A Guide

So, you've got a shiny new router and you're ready to take full control of your home network. The first step? Configuring your ISP's router to bridge mode. Let's dive right in.

---

## **Why Bridge Mode?**

- **Eliminate Double NAT:** Prevent network conflicts by avoiding two routers handling NAT.
- **Improve Performance:** Gain better control over your network settings and potentially boost speeds.
- **Enhanced Features:** Leverage advanced functionalities of your new router without interference.

---

## **Step-by-Step Guide**

### **1. Access Your ISP Router**

- **Connect Directly:** Plug your computer into the ISP router via Ethernet.
- **Find the IP Address:** Common defaults are `192.168.0.1` or `192.168.1.1`.
- **Login:** Use your admin credentials. If unsure, check the router's manual or the label on the device.

### **2. Enable Bridge Mode**

- **Navigate to Settings:** Look for sections labeled **"WAN," "Internet,"** or **"Connection Type."**
- **Select Bridge Mode:** It might be called **"Modem Only," "Pass-through,"** or **"Transparent Mode."**
- **Save Changes:** Apply the new settings. The router may reboot.

### **3. Connect Your New Router**

- **Physical Connection:** Connect an Ethernet cable from the ISP router's LAN port to your router's WAN port.
- **Power Up:** Turn on your new router and let it initialize.

### **4. Configure Your New Router**

- **Access Router Interface:** Enter your router's IP address in a browser (often `192.168.1.1`).
- **Run Setup Wizard:** Follow prompts to configure your internet connection.
    - **Connection Type:** Usually **DHCP/Automatic.** Some ISPs require **PPPoE**—enter credentials if needed.
- **Set Up Wi-Fi:** Customize your SSID and password.

### **5. Test Your Connection**

- **Check IP Address:** Ensure your router receives a public IP from the ISP.
- **Internet Access:** Browse to a website to confirm connectivity.
- **Speed Test:** Run a test to verify performance.

---

## **Pro Tips**

- **Disable ISP Wi-Fi:** Turn off the wireless function on the ISP router to reduce interference.
- **Update Firmware:** Keep your new router's firmware up to date for security and performance enhancements.
- **Backup Settings:** Save your configurations in case you need to reset.
- **Consult ISP Support:** Some ISPs require contacting support to enable bridge mode.

---

## **Potential Pitfalls**

- **VoIP and IPTV Services:** Bridging might affect these services. Verify with your ISP.
- **ISP Restrictions:** Not all ISP routers support bridge mode. Alternatives include DMZ or IP Passthrough.
- **Double NAT Issues:** If bridge mode isn't possible, configure your new router to operate in access point mode.

---

## **Conclusion**

By bridging your ISP router, you unlock the full potential of your home network. Enjoy better performance, advanced features, and the satisfaction of a network tailored to your needs.

# Configuring IP Passthrough on Common Routers

If bridging your ISP's router isn't an option, **IP Passthrough** is the next best thing. It allows your new router to receive the public IP address directly, effectively bypassing the ISP router's NAT. Let's explore how to set this up.

---

## **Understanding IP Passthrough**

- **Single Device Exposure:** IP Passthrough assigns the ISP-provided public IP address to one device on your network—your new router.
- **Bypass NAT Limitations:** It reduces double NAT issues without fully disabling the ISP router's routing capabilities.
- **Alternative to Bridge Mode:** Ideal when your ISP router doesn't support true bridge mode.

---

## **Step-by-Step Configuration Guide**

### **1. Prepare Your Network**

- **Disconnect Devices:** Temporarily unplug devices connected to your ISP router.
- **Reset if Necessary:** If previous configurations exist, consider resetting to factory defaults for a clean setup.

### **2. Access Your ISP Router's Interface**

- **Connect via Ethernet:** Plug your computer directly into the ISP router.
- **Login to the Router:**
    - **IP Address:** Commonly `192.168.0.1` or `192.168.1.1`.
    - **Credentials:** Use admin username and password (check the router label or manual).

### **3. Enable IP Passthrough**

- **Navigate to the Appropriate Section:**
    - Look for settings like **"Firewall," "NAT/Gaming,"** or **"IP Passthrough."**
- **Enable Passthrough Mode:**
    - **Passthrough Mode:** Set to **"On"** or **"Enabled."**
    - **Allocation Mode:** Choose **"Passthrough"** or **"DHCPS-fixed."**
- **Select Your Device:**
    - **By MAC Address:** Enter the MAC address of your new router's WAN interface.
    - Alternatively, select your router from a connected devices list.
- **Save Settings:** Apply changes and allow the router to reboot if prompted.

### **4. Configure Your New Router**

- **Connect Routers:**
    - Plug an Ethernet cable from the ISP router's LAN port to your router's WAN port.
- **Access Your Router's Interface:**
    - Enter its default IP address in your browser (e.g., `192.168.1.1`).
- **Set WAN Connection Type:**
    - Choose **"Automatic IP," "Dynamic IP,"** or **"DHCP."**
- **Disable DHCP (If Necessary):**
    - In some setups, you might need to disable DHCP on the ISP router to prevent conflicts.

### **5. Verify the Setup**

- **Check IP Address:**
    - Your new router's WAN IP should now be the public IP provided by your ISP.
- **Internet Connectivity:**
    - Test by accessing multiple websites.
- **Run Diagnostics:**
    - Perform a ping test or traceroute to ensure minimal hops and latency.

---

## **Pro Tips**

- **MAC Address Cloning:**
    - If required, clone the MAC address of a device previously connected to the ISP router.
- **Firmware Updates:**
    - Ensure both routers have the latest firmware for optimal performance.
- **Disable Unnecessary Services:**
    - Turn off Wi-Fi and DHCP on the ISP router to minimize interference.
- **Static IP Assignment:**
    - If you have a static IP from your ISP, enter it manually in your router's WAN settings.

---

## **Common Scenarios with Popular Routers**

### **AT&T Gateways**

- **Access IP Passthrough:**
    - Go to **"Home Network" > "IP Passthrough."**
- **Allocation Mode:**
    - Select **"Passthrough."**
- **Passthrough Mode:**
    - Choose **"DHCPS-fixed."**
- **Device Selection:**
    - Enter your router's MAC address.

### **Netgear Routers**

- **Enable Bridge Mode:**
    - Under **"Advanced" > "Advanced Setup" > "Router/AP/Bridge/Repeating Mode."**
- **Set to **"Router Mode"** if acting as the primary router receiving the public IP.

### **Cisco Routers**

- **Access Setup Menu:**
    - Navigate to **"Internet Settings."**
- **Set Connection Type:**
    - Choose **"Automatic Configuration - DHCP."**

---

## **Potential Pitfalls**

- **ISP Limitations:**
    - Some ISPs restrict IP Passthrough functionality or require additional steps.
- **VoIP and IPTV Services:**
    - Services provided by the ISP may require the ISP router's NAT; consult your ISP if issues arise.
- **Double NAT Persistence:**
    - If not configured correctly, double NAT may still occur. Ensure only your new router is handling NAT.

---

## **Alternative Solutions**

- **DMZ Hosting:**
    - Place your new router in the ISP router's DMZ to forward all incoming traffic.
- **Port Forwarding:**
    - Manually forward necessary ports from the ISP router to your router—less ideal but sometimes necessary.

---

## **Conclusion**

Configuring IP Passthrough allows you to harness the full capabilities of your new router while working within the constraints of your ISP's equipment. With careful setup, you can optimize your home network for performance, control, and reliability.

# Understanding IP Passthrough Modes: DHCPS-Dynamic, DHCPS-Fixed, and Manual

When setting up IP Passthrough on your ISP router, selecting the appropriate passthrough mode is crucial for optimal network performance and stability. Here's a concise guide to help you understand the differences between **DHCPS-Dynamic**, **DHCPS-Fixed**, and **Manual** modes, along with considerations for each.

* * *

## **IP Passthrough Modes at a Glance**

| **Mode** | **Description** | **Best For** |
| --- | --- | --- |
| **DHCPS-Dynamic** | Assigns public IP dynamically to the first device requesting it | Flexible setups with changing devices |
| **DHCPS-Fixed** | Assigns public IP to a specific device based on its MAC address | Stable setups with a designated main router |
| **Manual** | Manually configures the public IP on your device | Advanced configurations with static IPs |

* * *

## **1. DHCPS-Dynamic Mode**

### **How It Works**

- **Dynamic Assignment**: The ISP router assigns the public IP to the first device that requests it via DHCP.
- **Flexibility**: Useful when devices connecting to the network may change frequently.

### **Considerations**

- **Potential IP Misassignment**: If multiple devices boot simultaneously, the public IP might go to the wrong device.
- **Less Control**: Not ideal if you need the public IP consistently assigned to a specific router.

### **When to Use**

- In environments where the main device can vary.
- When you prefer automatic IP assignment without specifying a device.

### **Configuration Steps**

1. **Access ISP Router Settings**:
    - Navigate to the **IP Passthrough** or **NAT/Gaming** section.
2. **Enable IP Passthrough**:
    - Set **Passthrough Mode** to **"DHCPS-Dynamic"**.
3. **Save and Reboot**:
    - Apply changes and restart the ISP router.

* * *

## **2. DHCPS-Fixed Mode**

### **How It Works**

- **Fixed Assignment**: Assigns the public IP to a specific device based on its MAC address.
- **Consistency**: Ensures the same device (e.g., your new router) always receives the public IP.

### **Considerations**

- **Device Specific**: If you replace your router, you'll need to update the MAC address in the settings.
- **Preferred Method**: Provides stability and avoids IP conflicts.

### **When to Use**

- When you want your new router to consistently receive the public IP.
- In setups where network stability is paramount.

### **Configuration Steps**

1. **Access ISP Router Settings**:
    - Go to the **IP Passthrough** section.
2. **Enable IP Passthrough**:
    - Set **Passthrough Mode** to **"DHCPS-Fixed"**.
3. **Specify Device**:
    - Enter your new router's WAN **MAC Address**.
    - Alternatively, select it from the list of connected devices.
4. **Save and Reboot**:
    - Apply changes and restart both routers.

* * *

## **3. Manual Mode**

### **How It Works**

- **Manual Configuration**: You manually set the public IP address on your new router.
- **Direct Control**: Bypasses DHCP, giving you full control over IP settings.

### **Considerations**

- **Complex Setup**: Requires entering IP address, subnet mask, gateway, and DNS manually.
- **Static IP Required**: Usually used when your ISP provides a static public IP address.

### **When to Use**

- If your ISP has given you a static IP.
- For advanced network configurations requiring specific IP settings.

### **Configuration Steps**

1. **Access New Router Settings**:
    - Go to the **WAN** or **Internet** settings section.
2. **Set Connection Type**:
    - Choose **"Static IP"** or **"Manual Configuration"**.
3. **Enter IP Information**:
    - Input the public IP address, subnet mask, gateway, and DNS servers provided by your ISP.
4. **Disable DHCP on ISP Router (if necessary)**:
    - Turn off DHCP services to prevent IP conflicts.
5. **Save and Reboot**:
    - Apply changes and restart both routers.

* * *

## **Summary Table**

| **Feature** | **DHCPS-Dynamic** | **DHCPS-Fixed** | **Manual** |
| --- | --- | --- | --- |
| **IP Assignment** | Dynamic via DHCP | Fixed via DHCP to a specific MAC | Manually configured |
| **Setup Complexity** | Low | Medium | High |
| **IP Consistency** | Variable | Consistent | Consistent |
| **Use Case** | Flexible device environments | Stable networks with fixed devices | Advanced setups with static IPs |

* * *

## **Additional Considerations**

- **MAC Address Changes**: Ensure you update the MAC address in settings if you replace your router.
- **Device Boot Order**: In DHCPS-Dynamic mode, start your main router first to increase the chance it receives the public IP.
- **ISP Limitations**: Some ISPs may restrict certain modes or require additional configuration—consult your ISP if unsure.

* * *

## **Pro Tips**

- **Prefer DHCPS-Fixed for Stability**: It offers a balance between ease of setup and consistent IP assignment.
- **Backup Configurations**: Save your router settings after configuration for easy recovery.
- **Firmware Updates**: Keep both routers updated to ensure compatibility and security.
- **Disable Unused Services**: Turn off Wi-Fi and DHCP on the ISP router to minimize interference and conflicts.

* * *

## **Conclusion**

Choosing the right IP Passthrough mode is essential for a smooth and efficient home network setup. By understanding the differences between DHCPS-Dynamic, DHCPS-Fixed, and Manual modes, you can make an informed decision that suits your networking needs.