---
aliases: 
tags: 
publish: true
date created: Monday, May 27th 2024, 3:53 pm
date modified: Tuesday, May 28th 2024, 9:37 pm
---

# DNS Exfiltration & Attack from India?
## Day 1: Sus Detected
- Malformed packet going to a phone company in India?  Why???
	- ![](_attachments/Home%20Network%20Wars/IMG-20240528220548576.png)
- Quick IP rep checks
	- https://www.virustotal.com/gui/ip-address/114.69.235.183/detection
		- ![](_attachments/Home%20Network%20Wars/IMG-20240528220548635.png)
	- https://talosintelligence.com/reputation_center/lookup?search=114.69.235.183
		- ![](_attachments/Home%20Network%20Wars/IMG-20240528220548695.png)
	- https://www.whois.com/whois/114.69.235.183
		- ![](_attachments/Home%20Network%20Wars/IMG-20240528220548756.png)
- Okay, but why am I sending malformed mDNS packets (destination port 5353) on a periodic basis?
- Scanning their IP with Nmap
	- ![](_attachments/Home%20Network%20Wars/IMG-20240528220548805.png)
	- Found SSL cert stuff from China
		- `443/tcp open   ssl/https | ssl-cert: Subject: commonName=192.168.1.1/organizationName=ZTE/stateOrProvinceName=JiangSu/countryName=CN | Issuer: organizationName=ZTE/stateOrProvinceName=JiangSu/countryName=CN
- Worldphone company in India?
	- ![](_attachments/Home%20Network%20Wars/IMG-20240528220548875.png)
	- https://www.url2png.com/
		- ![](_attachments/Home%20Network%20Wars/IMG-20240528220548922.png)
## Day 2: Investigation - more Wireshark, netstat, SysInternals
- Running `netstat` and `tasklist` in Windows to find network connection and "listening" processes
	- `netstat -bano | findstr :5353`
	- Port 5353 is mDNS
	- Netstat and tasklist results:
		- ![](_attachments/Home%20Network%20Wars/IMG-20240528220548967.png)
	- Opened process explorer (from SysInternals) to look at related processes
		- ![400](_attachments/Home%20Network%20Wars/IMG-20240528220549014.png)
		- ![400](_attachments/Home%20Network%20Wars/IMG-20240528220549085.png)
- Wireshark filter for non-local destination with mDNS
	- You have to also exclude the broadcast address in ipv4 and v6
	- `(_ws.col.protocol == "MDNS") && !(ip.dst==10.0.0.0/8) && !(ip.dst==192.168.0.0/16) && !(ip.dst==224.0.0.251) && !(ipv6.dst == ff02::fb)`
	- Nothing is showing up
- TCP View Results
	- ![](_attachments/Home%20Network%20Wars/IMG-20240528220549148.png)
- 
# ChatGPT Convo
## Netstat and Sysinternals
Let's break down the NetStat commands and then discuss Sysinternals tools for a more thorough forensic analysis.

NetStat Commands

 Windows 
1. **netstat -ano | findstr :5353** : 
- **netstat** : Displays network connections, routing tables, and interface statistics. 
- **-a** : Shows all active connections and listening ports. 
- **-n** : Displays addresses and port numbers in numerical form (rather than resolving names). 
- **-o** : Shows the owning process ID (PID) associated with each connection. 
- **| findstr :5353** : Filters the output to show only lines containing `:5353`, which is the default port for mDNS.

This command helps you identify which process is using the mDNS port by providing the PID. 
2. **tasklist | findstr PID** : 
- **tasklist** : Lists all currently running processes by name and PID. 
- **| findstr PID** : Filters the output to show only lines containing the specific PID obtained from the previous command.

This helps you determine which application or service is associated with the PID.

Linux/macOS 
1. **sudo lsof -i :5353** : 
- **lsof** : Lists open files and the processes that opened them. 
- **-i :5353** : Filters to show only network connections on port 5353.

This command shows which processes are using the mDNS port. 
2. **netstat -anp | grep :5353** : 
- **netstat** : Similar to Windows, displays network connections. 
- **-a** : Shows all active connections and listening ports. 
- **-n** : Displays addresses and port numbers in numerical form. 
- **-p** : Shows the PID and name of the program to which each socket belongs. 
- **| grep :5353** : Filters the output to show only lines containing `:5353`.

This helps identify the PID and program using the mDNS port.

Sysinternals Tools for Forensics

Sysinternals tools, developed by Microsoft, offer a robust set of utilities for system monitoring and troubleshooting. Here are a few that can be particularly useful for network forensic analysis: 
1. **Process Explorer** :
- An advanced task manager that shows detailed information about running processes, including their network activity.
- Allows you to see which processes are opening network connections and their associated files, registry keys, and threads. 
2. **TCPView** :
- A GUI-based application that shows detailed listings of all TCP and UDP endpoints on your system, including local and remote addresses and state of TCP connections.
- Useful for real-time monitoring of network activity. 
3. **Procmon (Process Monitor)** :
- Monitors and logs all file system activity, registry changes, and process/thread activity in real time.
- Helps trace the origin of network connections by showing detailed process activity. 
4. **Autoruns** :
- Shows what programs are configured to run during system bootup or login.
- Helps identify potentially malicious software that might be starting automatically. 
5. **Wireshark** :
- While not a Sysinternals tool, Wireshark is essential for deep packet inspection and network traffic analysis.
- Allows you to capture and analyze the network traffic to and from your machine in great detail.
### Steps Using Sysinternals and Wireshark 
1. **Use TCPView** :
- Launch TCPView to monitor all network connections in real-time.
- Identify suspicious connections, particularly those involving the mDNS port and known malicious IPs. 
2. **Analyze Processes with Process Explorer** :
- Use Process Explorer to investigate processes identified by TCPView.
- Check the properties of these processes, including open network connections, to find suspicious activity. 
3. **Monitor with Procmon** :
- Run Procmon to capture detailed system activity.
- Filter for network-related operations to trace back suspicious network traffic to specific processes and actions. 
4. **Capture and Analyze Network Traffic with Wireshark** :
- Start a capture on your network interface using Wireshark.
- Use filters to focus on mDNS traffic and packets to/from known malicious IPs.
- Analyze the captured traffic to understand the nature of the malformed packets and identify the source process.

By combining these tools and steps, you can perform a comprehensive forensic analysis to identify and mitigate the source of suspicious network activity.

## Netstat Results
You: 
- Can you explain the below results of netstat?

  UDP    0.0.0.0:5353           *:*                                    2612
  UDP    192.168.1.97:5353      *:*                                    5548
  UDP    192.168.1.97:5353      *:*                                    5772
  UDP    192.168.78.1:5353      *:*                                    5772
  UDP    192.168.78.1:5353      *:*                                    5548
  UDP    192.168.159.1:5353     *:*                                    5548
  UDP    192.168.159.1:5353     *:*                                    5772
  UDP    [::]:5353              *:*                                    2612
  UDP    [::1]:5353             *:*                                    5548
  UDP    [::1]:5353             *:*                                    5772

ChatGPT: 
- The `netstat` command output provides details on the current network connections, specifically focusing on UDP connections to port 5353, which is used by mDNS. Here's a breakdown of the results:

Explanation of Columns 
1. **Protocol** : Indicates the protocol used for the connection. In this case, all entries are UDP. 
2. **Local Address** : Shows the IP address and port number on the local machine. 
- `0.0.0.0`: Indicates that the process is listening on all available IPv4 interfaces. 
- `192.168.1.97`, `192.168.78.1`, `192.168.159.1`: These are specific IP addresses on the local machine, likely corresponding to different network interfaces (e.g., Ethernet, Wi-Fi, virtual network adapters). 
- `[::]`: Indicates listening on all available IPv6 interfaces. 
- `[::1]`: Refers to the IPv6 loopback address (equivalent to 127.0.0.1 in IPv4). 
3. **Foreign Address** : Shows the remote address and port number, which in this case are all `*:*`, meaning they are listening for incoming connections from any remote address and port. 
4. **PID** : The process ID associated with the connection.

Detailed Breakdown 
- ** 2612** 
- A process with PID 2612 is listening for mDNS traffic on all IPv4 interfaces. 
- ** 5548** 
- ** 5772** 
- Two processes (with PIDs 5548 and 5772) are listening for mDNS traffic on the specific IP address 192.168.1.97. 
- ** 5772** 
- ** 5548** 
- The same two processes (PIDs 5772 and 5548) are also listening for mDNS traffic on the IP address 192.168.78.1. 
- ** 5548** 
- ** 5772** 
- The same two processes (PIDs 5548 and 5772) are additionally listening on the IP address 192.168.159.1. 
- ** 2612** 
- The process with PID 2612 is listening on all available IPv6 interfaces for mDNS traffic. 
- ** 5548** 
- ** 5772** 
- The processes with PIDs 5548 and 5772 are also listening on the IPv6 loopback address for mDNS traffic.
### Identifying the Processes
To identify which processes correspond to the PIDs 2612, 5548, and 5772, you can use the `tasklist` command: 
1. **For PID 2612** :

```sh
tasklist | findstr 2612
``` 
2. **For PID 5548** :

```sh
tasklist | findstr 5548
``` 
3. **For PID 5772** :

```sh
tasklist | findstr 5772
```

This will provide the names of the applications or services associated with these PIDs.

 Using Sysinternals for Detailed Analysis
For more detailed analysis, you can use Sysinternals tools: 
1. **Process Explorer** :
- Open Process Explorer and find the processes with PIDs 2612, 5548, and 5772.
- Check their properties to see additional details like the executable path, network activity, and open handles. 
2. **TCPView** :
- Open TCPView to visualize network connections in real-time.
- Look for connections on port 5353 to see which processes are using it and their remote addresses. 
3. **Procmon** :
- Use Process Monitor to capture system activity and filter for network operations.
- Look for operations related to the identified PIDs to trace their network activities.

By using these tools, you can gain deeper insights into the processes associated with the mDNS traffic and investigate any suspicious activity further.