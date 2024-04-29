---
aliases: 
tags: 
publish: true
date created: Sunday, April 28th 2024, 8:37 pm
date modified: Sunday, April 28th 2024, 8:37 pm
---

# Works with Streaming but not Zoom
- Links
	- [(2) 🎙️How to Sync Audio in OBS - YouTube](https://www.youtube.com/watch?v=xM7bJQb3rK0) 
	- [(2) How To Sync Audio to Video for Livestreams Using OBS - YouTube](https://www.youtube.com/watch?v=ZkYr1e9xTcE) 
	- 

Question:
> [!quote] I'm brand new and just setting up a system for live hybrid zoom business meetings. (recording with Zoom built in recorder) If I use OBS for my virtual camera and my mixer's output directly to Zoom, will there be a delay that I need to worry about? Thanks !

Answer:
> [!quote] My set up is similar and yes, I get the delay. The video chain lags audio quite a bit. It actually made me stop using OBS for Teams. I don't think the virtual camera has a "virtual microphone" channel to tune the delay into Zoom or Teams.

- When using [Go Pro as a Webcam](../../⬇%20INBOX,%20DROPZONE/Go%20Pro%20as%20a%20Webcam.md), there is some latency with these video.  To line them up, the audio has to be delayed.

# Fix for Zoom
- Use [VOICEMEETER](https://voicemeeter.com/) 
- Use video editor to get time delta/difference
	- Used [LosslessCut](https://mifi.no/losslesscut/) (free and open source) to get millisecond delay for GoPro
	- ![](_attachments/Sync%20Video%20and%20Audio/IMG-20240428203723763.png)
- VOICEMEETER settings
	- ![](_attachments/Sync%20Video%20and%20Audio/IMG-20240428203723839.png)
- 