# Subnetting

# Misc links

- [https://medium.com/networks-security/nat-snat-dnat-pat-port-forwarding-b7982fab02cd](https://medium.com/networks-security/nat-snat-dnat-pat-port-forwarding-b7982fab02cd)

# Basics

- IP Addresses used by routers to route data on the internet
- [Subnet Mask Cheat Sheet](https://www.aelius.com/njh/subnet_sheet.html)

**Subnetting**: Subnetting is a networking strategy used to partition a single physical network into smaller, logical sub-networks (or subnets). Each subnet operates as its own smaller network, which can help reduce network traffic, improve security, and simplify management. It's like dividing a large building into several rooms - each room serves a different purpose but all are part of the overall building.

**CIDR Notation**: Classless Inter-Domain Routing (CIDR) is a method for assigning IP addresses without using the traditional method of network class types. In CIDR, an IP network is represented by a prefix, which is an IP address followed by a slash ("/") and the prefix length (a number). For example, in the CIDR address 192.168.1.0/24, "192.168.1.0" is the network address and "24" is the prefix length.

**Why 255?**: The number 255 is used in subnetting because it represents the maximum value that can be obtained with an 8-bit binary number. This is because IP addresses are made up of four 8-bit octets (making them 32 bits in total for IPv4). A maximum-filled octet in binary (11111111) equals to 255 in decimal.

**Ranges of IPv4**: IPv4 uses 32-bit addresses, meaning there are 2^32 (around 4.3 billion) possible unique addresses. However, not all are available for general use. Some ranges are reserved for special purposes like private networks and multicast addresses.

IPv4 addresses are usually divided into five classes:

- Class A: 1.0.0.0 to 126.0.0.0
- Class B: 128.0.0.0 to 191.255.0.0
- Class C: 192.0.0.0 to 223.255.255.0
- Class D: 224.0.0.0 to 239.255.255.255 (Used for Multicast)
- Class E: 240.0.0.0 to 255.255.255.254 (Reserved for future use or Research)

Class A, B, and C are the ones primarily used for subnetting.

**Cheat Sheet in Markdown Format:**

```python
# Subnetting Cheat Sheet

## CIDR to Netmask Table

| CIDR | Netmask           | # Hosts |
|------|-------------------|---------|
| /32  | 255.255.255.255   | 1       |
| /31  | 255.255.255.254   | 2       |
| /30  | 255.255.255.252   | 4       |
| /29  | 255.255.255.248   | 8       |
| /28  | 255.255.255.240   | 16      |
| /27  | 255.255.255.224   | 32      |
| /26  | 255.255.255.192   | 64      |
| /25  | 255.255.255.128   | 128     |
| /24  | 255.255.255.0     | 256     |
| /23  | 255.255.254.0     | 512     |
| /22  | 255.255.252.0     | 1,024   |
| /21  | 255.255.248.0     | 2,048   |
| /20  | 255.255.240.0     | 4,096   |
| /19  | 255.255.224.0     | 8,192   |
| /18  | 255.255.192.0     | 16,384  |
| /17  | 255.255.128.0     | 32,768  |
| /16  | 255.255.0.0       | 65,536  |
| /15  | 255.254.0.0       | 131,072 |
| /14  | 255.252.0.0       | 262,144 |
| /13  | 255.248.0.0       | 524,288 |
| /12  | 255.240.0.0       | 1,048,576 |
| /11  | 255.224.0.0       | 2,097,152 |
| /10  | 255.192.0.0       | 4,194,304 |
| /9   | 255.128.0.0       | 8,388,608 |
| /8   | 255.0.0.0         | 16,777,216 |

## IPv4 Class Ranges

| Class | Start IP    | End IP          | Purpose                       |
|-------|-------------|-----------------|-------------------------------|
| A     | 1.0.0.0     | 126.0.0.0       | General Use                   |
| B     | 128.0.0.0   | 191.255.0.0     | General Use                   |
| C     | 192.0.0.0   | 223.255.255.0   | General Use                   |
| D     | 224.0.0.0   | 239.255.255.255 | Multicast                     |
| E     | 240.0.0.0   | 255.255.255.254 | Reserved (Future use/Research)|
```

Remember, the number of hosts is always 2^(32-CIDR)-2 (subtract 2 for network address and broadcast address).

# Local Ranges

Local ranges, or private IP address ranges, are a set of IP addresses that are not routable over the internet and are reserved for private networks. These addresses are used within private networks and can't be reached directly from the internet; they require a device such as a router to translate the private IP addresses to a public one, a process known as Network Address Translation (NAT). This allows multiple devices to share a single public IP address.

There are three blocks of the IP address space reserved for private networks, in each class of IP addresses (A, B, and C):

1. **Class A**: 10.0.0.0 to 10.255.255.255 (10.0.0.0/8) - This is a single Class A network that can support very large networks with more than 16 million addresses.
2. **Class B**: 172.16.0.0 to 172.31.255.255 (172.16.0.0/12) - This is a set of 16 contiguous Class B network numbers. It's used for medium-sized networks.
3. **Class C**: 192.168.0.0 to 192.168.255.255 (192.168.0.0/16) - This is a set of 256 contiguous Class C network numbers often used for small networks.

It's worth noting that these private ranges can be subnetted and used in any way within a private network, as long as it remains separate from the public internet. For example, a Class A private range of 10.0.0.0/8 could be subnetted into multiple smaller /16 or /24 networks as needed.

Here's a comprehensive set of notes on the topic:

```python
# Private IP Addresses and Local Ranges

## Introduction

- Private IP address ranges, also known as local ranges, are sets of IP addresses reserved for use within private networks.
- These addresses are not routable over the internet.
- Devices with these IPs require Network Address Translation (NAT) to communicate with the internet, where a router translates the private IP addresses to a public one.

## Reserved Private IPv4 Ranges

| Class | Start IP    | End IP          | CIDR Notation   |
|-------|-------------|-----------------|-----------------|
| A     | 10.0.0.0    | 10.255.255.255  | 10.0.0.0/8      |
| B     | 172.16.0.0  | 172.31.255.255  | 172.16.0.0/12   |
| C     | 192.168.0.0 | 192.168.255.255 | 192.168.0.0/16  |

## Key Points

- Class A private range can support very large networks with more than 16 million addresses.
- Class B private ranges are used for medium-sized networks.
- Class C private ranges are often used for small networks.
- Private ranges can be subnetted and used in any way within a private network.
```

# We use NAT to make private IPs possible

> **Understanding Network Address Translation (NAT) and Port Forwarding**
> 

## **Introduction**

Network Address Translation (NAT) is a crucial aspect of the modern internet. It enables multiple devices in a local network to connect to the internet using a single public IP address. Let's dive into how it works and its relevance in the TCP/IP model.

## **Network Address Translation (NAT)**

NAT is a method of remapping one IP address space into another by modifying network address information in the IP header of packets while they are in transit across a traffic routing device.

### **The Role of NAT**

In the context of the TCP/IP model, NAT operates at the Internet layer, specifically on IP addresses. Its main purpose is to conserve the limited number of public IPv4 addresses available and to improve security.

NAT enables several devices (each with its unique private IP address) to share a single public IP address when accessing the internet. This reduces the need for a large pool of public IP addresses.

## **How Does NAT Work?**

Here's a simplified explanation:

1. **Outgoing packets**: When a device in the local network sends a request to the internet (like loading a webpage), the source IP of the packet is the private IP of the device. But before the packet reaches the internet, the router performing NAT replaces this private IP with its public IP. The router also notes down which private IP the changed packet is associated with, in a NAT table.
2. **Incoming packets**: When a response comes back from the internet, the destination IP is the public IP of the router. The router then checks its NAT table to see which private IP address the incoming packet belongs to. It then forwards the packet to the appropriate private IP.
3. **Multiple devices**: For different devices, the router keeps track of the active connections (and which private IP each is associated with) using unique port numbers. Each connection is mapped to a new port number.

# **"Does Google see my IP?" - The Journey of Outgoing Packets (NAT)**

When a device in a local network (say, your home WiFi) tries to access a website, the first step usually involves a DNS query. Let's say you're trying to access **[www.google.com](http://www.google.com/)**.

1. Your device (with a private IP address, say, 192.168.1.100) sends a DNS query to resolve "**[www.google.com](http://www.google.com/)**" to an IP address.
2. The source IP of this packet would initially be the private IP address of your device. But before this packet leaves your network, the router performs NAT on it, changing the source IP from the private IP to the public IP of the router (say, 203.0.113.1).
3. This packet then reaches the DNS server (like Google's 8.8.8.8). So, to the DNS server, the query appears to be coming from the public IP (i.e., 203.0.113.1) and not the private IP of your device.
4. The DNS server then sends the response (IP address corresponding to **[www.google.com](http://www.google.com/)**) back to the public IP, where the router forwards it to your device.

So, to answer the question, "Does Google see my IP?" - Yes, but it's the public IP address of your router, not the private IP address of your individual devices.

# **"The Router's Little Black Book" - NAT Table and Incoming Packets**

Let's continue from the above example. Once Google's server responds to your request, the packet it sends back would have your router's public IP as the destination IP and the unique source port number that the router assigned during the outgoing request.

Now, how does the router know where to send this packet within the local network? That's where the NAT table comes into play.

The NAT table is essentially a "little black book" for the router. For each outgoing request, the router creates an entry in the NAT table. This entry includes the private IP address of the device that made the request and the unique source port number assigned to that request.

So when a response comes back, the router checks the destination port, looks up that port in the NAT table, and forwards the packet to the corresponding private IP address.

# **"The Hero We Need" - Port Forwarding**

While NAT does a great job at allowing multiple devices to share a single public IP, it does present a problem. What if we have a server in our local network that needs to accept unsolicited incoming connections from the internet? For instance, if we are hosting a web server or game server?

Port forwarding to the rescue!

Port forwarding is a feature in many routers that allows you to specify that all incoming connections on a certain port should be automatically forwarded to a specific device in the local network.

For example, you could set up port forwarding such that all incoming connections on port 8080 are sent to the local IP address of your server. This way, even though incoming connections are directed at the public IP (the IP of the router), they'll automatically be forwarded to the appropriate device on the local network. This allows your server to be reachable from the internet even though it's behind a NAT.

# **"Decoding the Matrix" - Source Ports and NAT Tables**

Let's visualize how NAT tables and source ports interact. For this example, we have two devices in the network, Device A and Device B. Both want to access a website at the same time.

```python
Device A (192.168.1.100) wants to access www.example.com
Device B (192.168.1.101) also wants to access www.example.com
```

When the request leaves Device A, the source IP is 192.168.1.100, and the source port is a randomly assigned ephemeral port, let's say 50000. The router changes the source IP to its public IP (203.0.113.1), changes the source port to a unique port number (say, 60000), and makes a note of this in its NAT table.

The same thing happens when the request leaves Device B, but with different source IPs and ports (private IP is 192.168.1.101, ephemeral port may be 50001, and the unique port assigned by the router could be 60001).

```python
Outgoing Packets:

Device A: 192.168.1.100:50000 --> Router --> 203.0.113.1:60000 --> www.example.com

Device B: 192.168.1.101:50001 --> Router --> 203.0.113.1:60001 --> www.example.com
```

So the NAT table in the router may look like this:

| Private IP | Public IP | Source Port | Destination IP | Destination Port |
| --- | --- | --- | --- | --- |
| 192.168.1.100 | 203.0.113.1 | 60000 | IP of http://www.example.com/ | 80 |
| 192.168.1.101 | 203.0.113.1 | 60001 | IP of http://www.example.com/ | 80 |

# **"The Hero's Dilemma" - Port Forwarding, Solicited, and Unsolicited Traffic**

"Solicited" traffic refers to incoming packets that are responses to requests sent from inside the network. In our previous example, responses coming from **[www.example.com](http://www.example.com/)** to Device A and Device B are solicited - they were expected as they are responses to requests.

On the other hand, "unsolicited" traffic refers to incoming packets that the network did not specifically request. This could be an external user trying to access a web server hosted in the private network, for example.

With NAT alone, unsolicited traffic gets blocked. Why? Because the router doesn't have any NAT table entry to map this incoming packet to an internal device, as it was not a response to an outgoing request. This is usually good for security.

However, in some cases, we want to allow certain types of unsolicited traffic. For example, if you're hosting a game server on your local network, you want players from the internet to connect to your server.

This is where port forwarding comes in.

Let's say you set up port forwarding on your router to forward all incoming traffic on port 8080 to Device C (192.168.1.102) in your network. Now, any unsolicited traffic that arrives on port 8080 is not ignored; instead, it's forwarded to Device C.

```python
Incoming Unsolicited Packet:

Internet --> 203.0.113.1:8080 --> Router --> 192.168.1.102 --> Delivered to Device C
```

Remember that port forwarding needs to be set up with care, as it can expose devices in your network to the internet, potentially posing a security risk. But when used properly, it's a powerful tool for running servers and other services in a NAT environment.

# **"A Tale of Two Packets" - Solicited vs. Unsolicited Traffic**

Let's consider two scenarios to understand solicited and unsolicited traffic.

## **Example of Solicited Traffic**

Assume a device in your network, Device A (192.168.1.100), wants to load **[www.example.com](http://www.example.com/)**.

1. Device A sends a request to **[www.example.com](http://www.example.com/)**. The source IP is 192.168.1.100, the source port is an ephemeral port, let's say 50000.
2. Before the packet leaves your network, your router performs NAT. It changes the source IP to its public IP (203.0.113.1) and the source port to a unique port, say, 60000. It creates an entry in its NAT table.

NAT table:

| Private IP | Public IP | Source Port | Destination IP | Destination Port |
| --- | --- | --- | --- | --- |
| 192.168.1.100 | 203.0.113.1 | 60000 | IP of http://www.example.com/ | 80 |
1. The request is received by **[www.example.com](http://www.example.com/)** from the public IP (203.0.113.1) and port 60000.
2. When **[www.example.com](http://www.example.com/)** responds, it sends the response to IP 203.0.113.1 on port 60000.
3. When the router receives this incoming packet, it looks at the destination port (60000), finds the corresponding entry in the NAT table, and forwards the packet to the correct device (Device A, 192.168.1.100).

This is solicited traffic - the incoming packets were expected responses to requests made by Device A.

## **Example of Unsolicited Traffic and Port Forwarding**

Let's say you're hosting a game server on Device B (192.168.1.101) in your network, and you've set up port forwarding on your router for port 8080 to Device B.

1. A player on the internet sends a request to join the game. They send this to your public IP (203.0.113.1) on port 8080.
2. This is unsolicited traffic - your network did not specifically request it.
3. However, because of the port forwarding rule, the router doesn't discard this packet. Instead, it forwards it to Device B (192.168.1.101).
4. When Device B responds, the source IP would be its private IP (192.168.1.101), and the source port would be the port the game server is running on.
5. The router would perform NAT, change the source IP to the public IP, change the source port to a unique port, and send the response to the player. The router creates an entry in the NAT table for this outgoing response.

In this case, the player's subsequent packets to port 8080 become solicited traffic because they are now part of an ongoing connection that your network recognizes. The router would use the NAT table to forward these incoming packets to Device B, just as it does with solicited traffic.

# **"A Tale of Two Packets: Director's Cut" - A Deeper Dive into Solicited vs. Unsolicited Traffic**

Before we start, remember the layers of the TCP/IP model:

1. Application Layer: Responsible for handling protocols that the software relies on, such as HTTP, SMTP, DNS, etc.
2. Transport Layer: This is where TCP or UDP operates, providing communication session management between hosts. It's responsible for port handling.
3. Internet Layer: IP operates here, handling IP addresses and routing.
4. Network Access Layer: Concerns the physical transmission of data.

## **Revisiting Solicited Traffic**

Let's retrace the steps when Device A (192.168.1.100) wants to load **[www.example.com](http://www.example.com/)**. The process involves all four layers of the TCP/IP model.

1. **Application Layer:** Device A's browser sends an HTTP request to **[www.example.com](http://www.example.com/)**. This request is handed to the Transport layer.
2. **Transport Layer:** Wraps the HTTP request in a TCP segment. The source port is an ephemeral port (50000), and the destination port is 80 (HTTP).
3. The request is then sent to the router. The router looks at the source IP and source port (192.168.1.100:50000).
4. **Internet Layer on Router:** The router performs NAT, changing the source IP to the public IP (203.0.113.1), and assigns a unique source port (60000). It records this in the NAT table and sends the packet to **[www.example.com](http://www.example.com/)**.

The NAT table looks like:

| Private IP | Public IP | Original Source Port | New Source Port | Destination IP | Destination Port |
| --- | --- | --- | --- | --- | --- |
| 192.168.1.100 | 203.0.113.1 | 50000 | 60000 | IP of http://www.example.com/ | 80 |
1. When **[www.example.com](http://www.example.com/)** responds, it sends the response to IP 203.0.113.1 on port 60000.
2. The router looks at the destination port (60000), finds the corresponding entry in the NAT table, and forwards the packet to the correct device (Device A, 192.168.1.100) on the original port (50000).

This incoming packet is solicited because it's an expected response to Device A's request.

## **Unmasking Unsolicited Traffic and Port Forwarding**

Assume you're hosting a game server on Device B (192.168.1.101), and you've set up port forwarding on your router for port 8080 to Device B.

1. A player on the internet sends a request to join the game. They send this to your public IP (203.0.113.1) on port 8080.
2. The router doesn't discard this packet (as it would usually do with unsolicited traffic) because of the port forwarding rule. It forwards it to Device B (192.168.1.101).
3. Device B responds. On the Transport Layer, it sets the source port as the port the game server is running on, and the destination port is the port the player used to send the request.
4. As the response packet passes through the Internet Layer on the router, it performs NAT. It changes the source IP to the public IP, assigns a unique source port, and sends the response to the player. It records this in the NAT table.

This sets up a flow of solicited traffic between the player and Device B through the specific port, allowing the game communication to occur.

# **"A Journey Through Layers" - TCP/IP Model**

The TCP/IP model (or Internet Protocol Suite) is a conceptual framework that describes the suite of protocols used for communication over the internet. It consists of four layers:

1. **Application Layer**
2. **Transport Layer**
3. **Internet Layer**
4. **Network Access Layer**

Each layer performs specific tasks and provides services to the layer above it.

## **1. Application Layer**

This is the highest level of the model, closest to the end-user. It defines protocols for data exchange between applications. The Application Layer doesn't know about specific applications but rather provides services that applications need.

**Services:** HTTP, HTTPS, FTP, DNS, SMTP, POP3, IMAP, SSH, DHCP, Telnet

**Data Units:** Messages

**Addresses/Localization:** Uses the hostname or Fully Qualified Domain Name (FQDN)

## **2. Transport Layer**

The Transport Layer provides transparent transfer of data between endpoints and offers quality of service features like reliability, flow control, and multiplexing.

**Services:** TCP, UDP

**Data Units:** Segments (TCP) or Datagrams (UDP)

**Addresses/Localization:** Uses Port Numbers. Ports 0-1023 are well-known ports (like HTTP on port 80), ports 1024-49151 are registered ports, and ports 49152-65535 are dynamic or private ports.

## **3. Internet Layer**

The Internet Layer packages data into IP datagrams, which contain source and destination address information that is used to forward the datagrams between hosts and across networks. It also handles routing through the internet.

**Services:** IP (IPv4, IPv6), ICMP, ARP, RARP

**Data Units:** Packets

**Addresses/Localization:** Uses IP Addresses (IPv4 or IPv6)

## **4. Network Access Layer**

Also known as the Network Interface Layer, it's responsible for placing TCP/IP packets on the network medium and receiving TCP/IP packets off the network medium. It includes the LAN and WAN technologies.

**Services:** Ethernet, Wi-Fi, DSL, ISDN, 4G/5G for mobile networks

**Data Units:** Frames

**Addresses/Localization:** Uses MAC Addresses

**Mediums:** Wired (Ethernet cables, fiber optics), Wireless (Wi-Fi), Mobile Networks

**Devices:** Routers, Switches, Hubs, Modems, Access Points, NICs (Network Interface Cards)

Example flow of data from a web browser (e.g., requesting **[www.example.com](http://www.example.com/)**):

1. **Application Layer:** HTTP forms the GET request for **[www.example.com](http://www.example.com/)**.
2. **Transport Layer:** TCP adds source and destination port numbers, forms a segment.
3. **Internet Layer:** IP adds source and destination IP addresses, forms a packet.
4. **Network Access Layer:** The packet is placed on the physical network (e.g., ethernet), adds MAC addresses, and becomes a frame.

Each step downwards encapsulates the data from the previous layer. When the data arrives at its destination, it goes through the opposite process (decapsulation), moving from the Network Access Layer back up to the Application Layer. At each step, the corresponding addresses or localization information is read to know where to forward the data next.

# **"Decoding the Envelopes" - Solicited vs. Unsolicited Traffic and Encapsulation**

Encapsulation in the TCP/IP model involves each layer adding its own headers (and sometimes trailers) to the data as it moves down through the layers, before it is transmitted over the network. Each layer treats all of the content from layers above it as data to be wrapped in its own envelope, so to speak.

Let's dig deeper into solicited and unsolicited traffic using our previous examples, but this time looking at the encapsulation process and the roles of the different layers of the TCP/IP model.

## **Example of Solicited Traffic**

Suppose Device A (192.168.1.100) wants to load **[www.example.com](http://www.example.com/)**:

1. **Application Layer:** The web browser forms an HTTP request for **[www.example.com](http://www.example.com/)**. This is the data we start with.
    
    ```
    [HTTP: GET www.example.com]
    ```
    
2. **Transport Layer:** The TCP protocol adds a header that includes source port (50000) and destination port (80), creating a TCP segment.
    
    ```
    [TCP: Source Port = 50000, Destination Port = 80]
    [HTTP: GET www.example.com]
    ```
    
3. **Internet Layer:** The IP protocol adds a header that includes the source IP and destination IP, creating an IP packet.
    
    ```
    [IP: Source IP = 192.168.1.100, Destination IP = www.example.com's IP]
    [TCP: Source Port = 50000, Destination Port = 80]
    [HTTP: GET www.example.com]
    ```
    
4. **Network Access Layer:** This layer doesn't play a direct role in recognizing solicited vs unsolicited traffic. It does, however, handle the MAC address involved in the actual transmission of the data on the local network.
    
    At this point, the router changes the source IP to its public IP (203.0.113.1) and the source port to a unique port (60000). It records this in the NAT table and sends the packet to **[www.example.com](http://www.example.com/)**.
    

When **[www.example.com](http://www.example.com/)** sends a response back to 203.0.113.1 at port 60000, the router recognizes it as solicited traffic, because it can match the incoming packet's destination port to an entry in the NAT table. It forwards the response to Device A on the original port 50000.

## **Example of Unsolicited Traffic and Port Forwarding**

Let's consider the game server example again:

1. A player sends a game request to your public IP (203.0.113.1) on port 8080. The router doesn't discard this packet (which it normally does with unsolicited traffic) because of the port forwarding rule. It forwards the packet to Device B (192.168.1.101).
2. The router creates an entry in the NAT table, noting that any traffic coming to port 8080 should be forwarded to 192.168.1.101.

Subsequent packets to port 8080 from the same player are considered solicited traffic because they're part of an ongoing conversation that the router recognizes. It uses the NAT table to forward these packets to Device B.

In summary, the **Transport Layer** is what recognizes the solicited vs unsolicited nature of the traffic. When a response packet comes in, it looks at the destination port in the TCP header. If this port number matches an entry in the NAT table (which was created when an outgoing request was made), it knows that this is a solicited packet. If it doesn't find a match, it treats it as unsolicited traffic. Port forwarding is essentially a pre-defined rule telling the router how to handle certain types