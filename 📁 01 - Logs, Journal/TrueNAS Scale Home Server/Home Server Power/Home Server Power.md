---
date created: Saturday, April 13th 2024, 2:44 pm
date modified: Saturday, April 13th 2024, 3:44 pm
---

# WoL (wake on lan) - Solution Components
- At&t Modem and Router
- TrueNAS Scale
## Links
- [SOLVED - Enable WOL | TrueNAS Community](https://www.truenas.com/community/threads/enable-wol.95856/) 
- [How to Turn on Your Computer From Across the House With Wake-on-LAN | PCMag](https://www.pcmag.com/how-to/turn-on-computer-from-across-the-house-with-wake-on-lan) 
- [Wake-On-LAN with BGW210 (ATT) Router : r/techsupport](https://www.reddit.com/r/techsupport/comments/9fer8e/wakeonlan_with_bgw210_att_router/)
## AT&T Solution without 3rd party router
- Looks like there's no magic packet setting with my gateway (likely), so time to look for some unorthodox options
# WoL Alternatives
- Smart plug with PC setting to turn on with power
	- [Turn on your PC remotely : r/techsupport](https://www.reddit.com/r/techsupport/comments/136dow6/turn_on_your_pc_remotely/)
		- My work around for remotely accessing a fully powered down PC - Have a smart plug connected, Have your PC boot as soon as it gets power, 'Alexa turn on my PC' or just via the app.
- Remote switch, piston, button, etc.
	- [Amazon.com : Remote Button Pusher](https://www.amazon.com/Remote-Button-Pusher/s?k=Remote+Button+Pusher) 
- AC Recovery - this accounts for 95% of the cases 
	- Last Power State
		- PC will go to last state before losing power
	- ![](IMG-20240413154330173.png)