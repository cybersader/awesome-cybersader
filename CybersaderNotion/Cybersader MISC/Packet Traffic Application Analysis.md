# Packet/Traffic Application Analysis

# Misc Tools

- [Smarter Packet Analysis for IT & Security Teams | Teleseer](https://teleseer.com/)
- [Wireshark · Go Deep](https://www.wireshark.org/)
- [Zeek: Get Zeek](https://zeek.org/get-zeek/)
- [Home - Suricata](https://suricata.io/)

- ‣
- [Tshark | Search Pcaps](https://tshark.dev/search/)
- [Brim Data, Inc.](https://www.brimdata.io/)
- https://github.com/seladb/PcapPlusPlus
- https://github.com/IQTLabs/packet_cafe
- https://github.com/1ultimat3/PcapViz
- [NetworkMiner - The NSM and Network Forensics Analysis Tool ⛏](https://www.netresec.com/?page=NetworkMiner)

# Getting application interaction from packets

When a packet capture is taken, it records all network traffic that crosses the capture point. With a suitable level of analysis, you can determine:

- **IP addresses**: From the packet headers, you can identify the source and destination IP addresses, effectively mapping which assets are communicating.
- **Ports**: Also from the packet headers, you can identify the source and destination ports for the traffic, giving an indication of which services are being used.
- **Applications**: Some level of application identification is possible by looking at the port numbers (since certain applications commonly use certain ports) and the packet content. However, note that many applications now use dynamic port assignments, or hide behind standard ports like 80 and 443 for HTTP/HTTPS traffic, so this isn't always reliable. Advanced tools or services might use Deep Packet Inspection (DPI) to better identify applications by analyzing the data part of a packet.
- **Volume of traffic**: Analyzing the number and size of packets can provide an indication of the volume of traffic between different assets.

# Network vs Host-Based

Intrusion Detection Systems (IDS), such as Snort, analyze packets by examining both the header and payload of each packet. The specific level to which an IDS analyzes packets depends on the type of IDS in use: network-based (NIDS) or host-based (HIDS).

1. **Network-Based Intrusion Detection System (NIDS)**: A NIDS examines the traffic on the network it is monitoring. It can analyze the network traffic at all layers of the OSI model from Layer 1 (Physical Layer) to Layer 7 (Application Layer), depending on the specific detection techniques used.
    
    For example, a basic NIDS might only examine the IP headers (Layer 3, Network Layer) to identify potential IP spoofing attacks, while a more advanced NIDS might examine TCP/UDP headers (Layer 4, Transport Layer) to identify port scanning or SYN flood attacks, or even the payload (up to Layer 7, Application Layer) to identify attacks against specific software services.
    
    NIDS like Snort typically use a combination of signature-based detection (comparing packet content against a database of known attack signatures), anomaly-based detection (detecting deviations from a baseline of normal network behavior), and stateful protocol analysis (examining network traffic to ensure it adheres to defined protocol standards).
    
2. **Host-Based Intrusion Detection System (HIDS)**: HIDS operates on individual hosts or devices in the network. A HIDS monitors the inbound and outbound packets from the device only and will alert the user or administrator if suspicious activity is detected.
    
    It can analyze information at all levels just like NIDS, but it also has access to system-specific data, like system logs or the state of running processes, which can provide additional context for detection and analysis.
    

Keep in mind that regardless of how deeply an IDS is capable of inspecting packets, in some situations it might be limited by encryption. For example, if network traffic is encrypted using SSL/TLS, the IDS will only be able to inspect the packet headers unless it is set up for SSL/TLS decryption.

In summary, the level of analysis that an IDS can perform depends on its capabilities and the network context. The payload of packets can be analyzed to a very deep level, up to and including application layer data. However, in practical application, deep packet inspection requires more computational resources and can be hindered by encryption, so a balance between thoroughness and efficiency must be struck.

# TCP/IP Layers and Analysis

Here's a breakdown of the TCP/IP layers, their corresponding OSI layers, and the important data relevant to each when analyzing PCAPs:

1. **Network Interface Layer** (OSI Layers 1 & 2: Physical and Data Link)
    - Information: Physical MAC addresses, Ethernet frames
    - Relevance: Can help identify specific devices on a network
2. **Internet Layer** (OSI Layer 3: Network)
    - Information: IP addresses, IP protocol type, ICMP messages
    - Relevance: Can identify hosts involved in communication, can provide information about routing or errors
3. **Transport Layer** (OSI Layer 4: Transport)
    - Information: Source and destination port numbers, TCP flags, window size, sequence and acknowledgement numbers
    - Relevance: Port numbers can identify the application protocol being used (for well-known ports). TCP flags and other values can provide information about the state and control of the TCP connection.
4. **Application Layer** (OSI Layers 5-7: Session, Presentation, Application)
    - Information: The actual application data being transmitted. For HTTP, for example, this would include headers, URIs, cookies, etc. For DNS, it would include domain names and IP addresses.
    - Relevance: Allows for deep analysis of application behavior. Can potentially identify specific actions or requests within an application, or even malicious activity.

- **Layer 5 - Application Layer**
    - Tools: Wireshark, Bro/Zeek IDS, Snort with application layer rules
    - Encryption: SSL/TLS, SSH, application-level encryption (like HTTPS)
    - Data: Application data, HTTP(S) data, FTP data, DNS queries. Syntax layer of various application, encryption, and compression schemes. Session initiation, termination, and management.
    - Inspection/Decryption: SSL/TLS decryption tools (Wireshark can do this if provided the keys), Bro/Zeek IDS can analyze application layer protocols like HTTP, DNS, and SSL/TLS.
- **Layer 4 - Transport Layer**
    - Tools: Wireshark, TCPDump, Snort, Bro/Zeek IDS
    - Encryption: SSL/TLS (if application data is encrypted)
    - Data: TCP/UDP ports, sequence numbers, acknowledgement numbers
    - Inspection/Decryption: TCP stream reassembly (Wireshark and Bro/Zeek IDS can do this), SSL/TLS decryption tools
- **Layer 3 - Network Layer**
    - Tools: Wireshark, TCPDump, Snort, Bro/Zeek IDS
    - Encryption: IPsec
    - Data: IP addresses, ICMP packets, routing information
    - Inspection/Decryption: IP defragmentation tools (like Wireshark and Bro/Zeek IDS)
- **Layer 2 - Data Link Layer**
    - Tools: Wireshark, TCPDump
    - Encryption: WPA/WPA2/WPA3 for Wi-Fi, MACsec for Ethernet
    - Data: MAC addresses, Ethernet frames, VLAN tags
    - Inspection/Decryption: Wi-Fi decryption tools (like Wireshark with WPA keys), MAC address inspection
- **Layer 1 - Physical Layer**
    - Tools: Specialized signal analysis tools, oscilloscopes for wire networks
    - Encryption: Varies by physical medium (e.g., encryption of optical transmissions or RF)
    - Data: Raw bitstream
    - Inspection/Decryption: Requires highly specialized signal analysis/decryption tools