# Awesome Nmap

# Misc Resources

- https://github.com/gh0x0st/pythonizing_nmap - A detailed guide showing you different ways you can incorporate Python into your workflows around Nmap.
- [Nmap Cheat Sheet 2023: All the Commands, Flags & Switches](https://www.stationx.net/nmap-cheat-sheet/)
- 

# Tools

- [Chapter 12. Zenmap GUI Users' Guide | Nmap Network Scanning](https://nmap.org/book/zenmap.html)

# Reachability & Exploitability Testing

## Example Outline

**1. Figuring out if hosts are up:**

- Start with a simple ping scan (`nmap -sn <target_IP>`) to see if the host is up.
- If ping fails, try an ARP scan (`nmap -PR <target_IP>`) to see if the host is on the local network.
- If ARP scan fails, try a DNS resolution (`nmap -R <target_IP>`) to see if the host is reachable by name.
- If DNS resolution fails, determine whether to go into port scanning or look for the device sitting in front of the target host.

**2. Figuring out open ports:**

- If it's determined that port scanning is appropriate, start with a TCP SYN scan (`nmap -sS <target_IP>`) or a TCP connect scan (`nmap -sT <target_IP>`) to determine open TCP ports.
- If UDP services are suspected, use a UDP scan (`nmap -sU <target_IP>`).
- If stealth is needed, use TCP NULL scan (`nmap -sN <target_IP>`), TCP FIN scan (`nmap -sF <target_IP>`), or XMAS scan (`nmap -sX <target_IP>`).
- If ports are filtered or closed, try to use service-specific scans (`nmap -sV <target_IP>` or `nmap -sC <target_IP>`).
    - **`nmap -sV`** (version detection scan): This scan attempts to determine the software and version information of the running services by sending probes and analyzing the responses. It does not attempt to exploit any vulnerabilities or weaknesses in the services. This scan is useful for identifying specific services that are running on a target host and for determining the version of the software that is running.
    - **`nmap -sC`** (script scan): This scan uses the Nmap Scripting Engine (NSE) to run a series of scripts that are designed to detect common vulnerabilities and weaknesses in the services running on a target host. This scan can be quite effective at identifying specific vulnerabilities, but it can also be more time-consuming and resource-intensive than a simple version detection scan.
    - **`nmap --allports`** (scan all ports): This scan attempts to scan all 65535 ports on a target host, including both TCP and UDP ports. This scan can be quite time-consuming and resource-intensive, but it can provide a more complete picture of the services running on the target host. This scan is useful for thorough vulnerability assessment and penetration testing, but it may not be necessary or appropriate for all situations.
    - **`nmap -sT -p <port>`** (TCP connect scan): This scan uses a TCP connection to the target port to determine if the service is open and responding. This scan is less stealthy than a SYN scan, but it can be more reliable for detecting services that are running on non-standard ports or that do not respond to SYN probes.
    - **`nmap -sS -p <port>`** (TCP SYN scan): This scan sends a SYN packet to the target port and analyzes the response to determine if the service is open and responding. This scan is stealthier than a TCP connect scan, but it may not be as reliable for detecting services that are running on non-standard ports or that do not respond to SYN probes.
    - **`nmap -sU -p <port>`** (UDP scan): This scan attempts to determine if the UDP service is open and responding. UDP scanning is more difficult than TCP scanning because UDP does not have the same reliable connection-oriented protocol as TCP. As a result, UDP scans are often less reliable and more time-consuming than TCP scans. However, they are necessary to identify UDP-based services and vulnerabilities.

**3. Figuring out devices sitting in front of them if they block requests or are unreachable:**

- If ping requests are blocked or fail, try a port scan without host discovery (`nmap -n -Pn <target_IP>`) to see if the host is up.
- If the host is still unreachable, try using a TCP SYN scan (`nmap -sS <target_IP>`) to determine if any ports are open, as well as the TTL of the response packets.
- If the TTL values indicate that there are one or more routers or gateways between the scanning host and the target host, use traceroute (`tracert <target_IP>` on Windows or `traceroute <target_IP>` on Unix-based systems) to determine the hop count and response times for each hop.
- To perform a traceroute with Nmap and determine the hop count and response times for each hop, use the **`-traceroute`**
 option: `nmap -traceroute <target_IP>` . This will perform a traceroute to the specified IP address and display the hop count and response times for each hop along the way.
- To perform a packet capture and analysis using Nmap's built-in packet sniffer, use the **`--packet-trace`**option: `nmap --packet-trace <target_IP>` . This will capture and display the packets sent and received during the scan, which can help you analyze the network traffic and identify any devices sitting in front of the target host.
    - If necessary, use packet capture and analysis tools (`wireshark`, `tcpdump`, or `tshark`) to inspect the traffic and determine what devices are sitting in front of the target host.

## Misc Nmap Commands

`nmap -p 1 -oX -iL list.txt | grep Host | cut -d' ' -f2`

- Scan a list of IPs for reachability. In XML, I want to know which IPs are reachable.

`nmap -p 22,80,443 -T4 -n <target_IP>`

- Nmap scan that specifies certain ports and won't bog down a server:

## PowerShell

```powershell
# Define the list of IPs to scan
$ip_list = @("192.168.1.1", "192.168.1.2", "192.168.1.3")

# Loop through each IP and run Nmap command
foreach ($ip in $ip_list) {
    $nmap_command = "nmap -sS -sV -oX - $ip"
    $nmap_output = Invoke-Expression $nmap_command

    # Append the XML output to a file
    Add-Content -Path "nmap_scan_results.xml" -Value $nmap_output
}
```

- Go through a list of IPs and run Nmap commands on each of them, then appends the XML output to a file
    - This script first defines a list of IPs to scan, and then loops through each IP using a **`foreach`** loop. Inside the loop, it constructs an Nmap command using the IP as the target, and runs the command using **`Invoke-Expression`**.
    - The output of the Nmap command is stored in the **`$nmap_output`** variable, which is then appended to an XML file named **`nmap_scan_results.xml`** using the **`Add-Content`** cmdlet.
    - You can customize the Nmap command by changing the options and arguments passed to the **`nmap`** command. You can also customize the output format by using a different option instead of **`-oX`** to save the results in a different format, such as text or HTML. Additionally, you can add error handling and other features to the script to make it more robust and flexible.

```powershell
# Read the list of IPs from a file
$ip_list = Get-Content -Path "ip_list.txt"

# Loop through each IP and run Nmap command
foreach ($ip in $ip_list) {
    $nmap_command = "nmap -sS -sV -oX - $ip"
    $nmap_output = Invoke-Expression $nmap_command

    # Append the XML output to a file
    Add-Content -Path "nmap_scan_results.xml" -Value $nmap_output
}
```

- This script reads the list of IP addresses from a file named **`ip_list.txt`** using the **`Get-Content`** cmdlet. The **`Get-Content`** cmdlet reads the contents of the file and returns them as an array of strings, with each line of the file as a separate element in the array.
- The script then loops through each IP address in the array and runs an Nmap command on each one. The Nmap command and output handling are the same as in the previous example.
- To use this script, you need to create a text file named **`ip_list.txt`** in the same directory as the script, and put one IP address per line in the file. You can also specify a different path for the file if it is located elsewhere on your system.
- Note that the **`Get-Content`** cmdlet reads the entire contents of the file into memory at once, so if you have a large file, it may consume a significant amount of memory. In such cases, you may want to use other techniques such as reading the file line by line or using a different method to store the IP addresses, such as a CSV file or a database.

## Zenmap Bulk Scanning

- To add list of targets:
    - Export targets from tool or system
    - Paste IPs into txt file
    - Load into Profile in Zenmap

## Ping Scan Commands

### Pure Nmap

- nmap -sP -iL input.txt -oG - | awk '/Up/{print $2",up";next} {print $2",down"}' | tr -d '\n' | sed 's/Ignored.*$//' > output.csv
    
    This command uses the following options:
    
    - `sP`: Perform a ping scan.
    - `iL input.txt`: Read the list of target IPs from the file input.txt.
    - `oG -`: Output results to STDOUT in "grepable" format.
    - `awk '/Up/{print $2",up";next} {print $2",down"}'`: Filter the output to show only lines that contain the string "Up", and append ",up" to the IP address. For lines that do not contain "Up", append ",down" to the IP address.
    - `tr -d '\\n'`: Remove all newline characters from the output.
    - `sed 's/Ignored.*$//'`: Remove any lines that contain the string "Ignored" (which can appear in the Nmap output when it skips hosts).
    - `> output.csv`: Redirect the output to the file output.csv.

### Bash

```bash
#!/bin/bash

# Set the input file and output file paths
input_file="input.txt"
output_file="output.csv"

# Loop through each line in the input file
while IFS= read -r ip; do
  # Perform a ping scan on the IP
  ping_output=$(nmap -sP "$ip" | grep "Host is up")
  
  # Check if the ping was successful
  if [[ ! -z "$ping_output" ]]; then
    # Write the IP and status to the output file
    echo "$ip,up" >> "$output_file"
  else
    # Write the IP and status to the output file
    echo "$ip,down" >> "$output_file"
  fi
done < "$input_file"
```

- This script reads a list of target IPs from an input file and outputs the results to a CSV file. For each IP in the input file, the script uses Nmap to perform a ping scan and checks if the host is up by searching for the string "Host is up" in the output. If the host is up, the script writes the IP and status "up" to the output file. If the host is down, the script writes the IP and status "down" to the output file.
- To run the script, save it to a file (e.g. [ping-script.sh](http://ping-script.sh/)), make it executable with the command `chmod +x ping-script.sh`, and run it with the command `./ping-script.sh`. Make sure to replace the input\_file and output\_file variables with the correct file paths for your environment.

## Traceroute Commands

TODO

## Banner Grabbing

TODO

# Helpful Commands

| nmap 192.168.1.1 –packet-trace | Show the details of the packets that are sent and received during a scan and capture the traffic. |
| --- | --- |
| nmap -sn [target IP] && nmap -sn -PE -PP -PS21,22,23,25,80,443,3389 [front-facing device IP] | Performs a ping scan to determine if a target system is reachable, and if it is not reachable, performs a traceroute to identify the front-facing device: |
| nmap -sP -iL ips.txt | grep -E '^(Host|MAC|Nmap)' | tee ping_scan.txt && grep -E '^Host' ping_scan.txt | cut -d " " -f 2 | xargs -I {} nmap -A -v --reason {} | tee scan_results.txt && grep -E 'ICMP Time Exceeded' ping_scan.txt | cut -d " " -f 2 | xargs -I {} traceroute -n {} | Uses ping to test the reachability of a list of IP addresses, performs scans on successful ones, and performs traceroute to identify the front-facing device for unsuccessful ones |
| nmap -sn [target subnet] && nmap -p- -A -v --reason -iL reachable_ips.txt && nmap -sS -Pn -p- -iL unreachable_ips.txt | Performs a ping scan using Nmap's -sn option to determine which hosts are up, and saves the IP addresses of the online hosts to a file named reachable_ips.txt. It then performs a full port scan on the reachable hosts using the -p- option to scan all 65,535 TCP ports, and the -iL option to read the IP addresses from the reachable_ips.txt file. Finally, the command performs a TCP SYN scan (-sS) on the unreachable hosts using the -Pn option to skip host discovery and the -p- option to scan all ports, and scans all 65,535 TCP ports to identify the front-facing devices.

Note that a full port scan can take a long time and consume a significant amount of network bandwidth and system resources. You may want to use the -T option to adjust the timing template for the scan, or use the --max-rate option to limit the scan rate to reduce the impact on the network and target systems. |
|  |  |
|  |  |
|  |  |
|  |  |

## Bash Scripts

- 
    - reads a list of IP addresses from a file named **`ips.txt`**
    , loops through each address, and performs a ping scan (-sn) to determine if the IP is reachable. If the IP is not reachable, the script then performs a traceroute to identify the front-facing device in front of the target system.
        
        ```jsx
        #!/bin/bash
        
        # Loop through a list of IP addresses
        for ip in $(cat ips.txt); do
        
          # Check if the IP is reachable with a ping scan (-sn)
          nmap -sn $ip
        
          # If the IP is not reachable, perform a traceroute to identify the front-facing device
          if [ $? -ne 0 ]; then
            traceroute $ip
          fi
        
        done
        ```
        
- Bash Script with Nmap and Traceroute
    - Here's an example bash script that uses Nmap to perform a ping scan, aggressive scans on reachable hosts, and traceroute on unreachable hosts:
        
        ```bash
        #!/bin/bash
        
        # Set the target subnet and output files
        subnet="192.168.1.0/24"
        ping_output="ping_scan.txt"
        scan_output="scan_results.txt"
        traceroute_output="traceroute_results.txt"
        
        # Perform a ping scan on the target subnet and save the results to a file
        nmap -sP $subnet -oG $ping_output
        
        # Loop through the ping scan output file
        while read line; do
          # Extract the IP address and host status from the output line
          ip=$(echo $line | awk '{print $2}')
          status=$(echo $line | awk '{print $4}')
          # If the host is up, perform an aggressive scan and save the results to a file
          if [ "$status" == "Up" ]; then
            nmap -A -v --reason $ip -oN $scan_output
          # If the host is down, perform a traceroute to identify the front-facing device and save the results to a file
          else
            traceroute $ip > $traceroute_output
          fi
        done < $ping_output
        ```
        
- 

## Python Scripts

- Python Script with Nmap and Scapy
    - Here's an example Python script that uses Nmap and Scapy to perform a ping scan, aggressive scans on reachable hosts, and front-facing device scans on unreachable hosts:
        
        ```python
        #!/usr/bin/env python
        
        import os
        import re
        import subprocess
        from scapy.all import *
        
        # Set the target subnet and output files
        subnet = "192.168.1.0/24"
        ping_output = "ping_scan.txt"
        scan_output = "scan_results.txt"
        front_output = "front_results.txt"
        
        # Perform a ping scan on the target subnet using Nmap
        ping_scan = subprocess.Popen(["nmap", "-sP", subnet, "-oG", ping_output], stdout=subprocess.PIPE)
        ping_scan.wait()
        
        # Loop through the ping scan output file
        with open(ping_output, "r") as f:
            for line in f:
                # Extract the IP address and host status from the output line
                match = re.match(r"^(Host:\s)(\d+\.\d+\.\d+\.\d+)\s+(.*)$", line.strip())
                if match:
                    ip = match.group(2)
                    status = match.group(3)
                    # If the host is up, perform an aggressive scan and save the results to a file
                    if status == "Up":
                        nmap_scan = subprocess.Popen(["nmap", "-A", "-v", "--reason", ip, "-oN", scan_output], stdout=subprocess.PIPE)
                        nmap_scan.wait()
                    # If the host is down, perform a front-facing device scan and save the results to a file
                    else:
                        front_scan = subprocess.Popen(["sudo", "scapy", "-c",
        ```