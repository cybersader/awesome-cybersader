---
aliases: 
tags: 
created: Wednesday, Mar 20, 2024 02:37 PM
updated: Thursday, Mar 21, 2024 08:23 PM
date created: Wednesday, March 20th 2024, 2:37 pm
date modified: Saturday, April 27th 2024, 11:31 pm
publish: true
---

# Issues
1. Latency
	- Anywhere from 150 - 500 ms
	- Add delay to audio - [Lag when using hero10 as webcam : r/gopro](https://www.reddit.com/r/gopro/comments/rxqc8j/lag_when_using_hero10_as_webcam/) 
		- ![](_attachments/Go%20Pro%20as%20a%20Webcam/IMG-20240428134807354.png)
1. How the camera networks to the computer
	- You have to set firewall rules to get this to work correctly and you can't be on some types of VPNs
# Tools for Advanced Troubleshooting
- Windows Firewall
- TCPView
- Wireshark
	- Seems to use mDNS or other establishment protocols
	- Webcam uses its own interface 