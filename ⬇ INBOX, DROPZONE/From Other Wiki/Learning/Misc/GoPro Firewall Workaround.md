Used Sysinternals, procexp, and tcpview to figure out what connection is being deleted by firewall
![](__attachments/Misc/IMG-GoPro%20Firewall%20Workaround-2024063021.png)
![](__attachments/Misc/IMG-GoPro%20Firewall%20Workaround-2024063021-7.png)
# Go Pro Firewall Info
## UDP Rule
GoPro Webcam

Allow inbound traffic from GoPro Webcam on UDP port 8554

`C:\Program Files (x86)\GoPro\GoPro Webcam\GoPro Webcam.exe`

Private and Public
# What's Going On
- It looks like the computer is trying to communicate with the GoPro using HTTP ([OpenGoPro HTTP API](https://gopro.github.io/OpenGoPro/http#section/Overview))
- However, this isn't working because we have firewall whitelists for certain applications I'm guessing especially maybe with port 5002
- The outbound HTTP traffic to the GoPro is likely being blocked because my computer is not supposed to be a web server in a way
- Also, we have 127 to 127 traffic which may count as inbound and necessitate firewall rules
# Testing and Solution
- Inbound rule for ports 5002, 8080, 80, and 443
- Outbound for ports 5002, 8080, 80, 443
# Looking at Firewall Logs
- Install Sysmon
- Use default Sysmon modular config.xml file from GitHub
- Use Wireshark and TCP view
- Look at Event Viewer under Applications -> Windows/Microsoft

- [Configure Windows Firewall logging - Windows Security | Microsoft Learn](https://learn.microsoft.com/en-us/windows/security/operating-system-security/network-security/windows-firewall/configure-logging?tabs=gpo) 
- Checking firewall logs for dropped packets

![](__attachments/Misc/IMG-GoPro%20Firewall%20Workaround-2024063021-8.png)
![](__attachments/Misc/IMG-GoPro%20Firewall%20Workaround-2024063021-9.png)

# Looking at Networking
- I used TCPview and Wireshark

