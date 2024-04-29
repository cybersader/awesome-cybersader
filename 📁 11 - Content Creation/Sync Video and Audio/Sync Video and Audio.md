---
aliases: 
tags: 
publish: true
date created: Sunday, April 28th 2024, 8:37 pm
date modified: Sunday, April 28th 2024, 9:00 pm
---

- [ ] Fix audio video sync issue ➕ 2024-04-28
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
	- ![](_attachments/Sync%20Video%20and%20Audio/IMG-20240428210012111.png)
- VOICEMEETER settings
	- ![](_attachments/Sync%20Video%20and%20Audio/IMG-20240428210012192.png)
- Input 1 turns into virtual output B1
	- ![](_attachments/Sync%20Video%20and%20Audio/IMG-20240428210012281.png)

- Delay not working
	- [How would I add a delay on a virtual output? - VB-Audio's Forums](https://forum.vb-audio.com/viewtopic.php?t=1501)

> [!quote] Forgive me if I'm mistaken but as I understand it you want to delay the audio from your mic to match delayed video from your webcam (so the sound matches the movement of your lips, right?)....  I'd say rather than delaying _all_ inputs via that output, you should be delaying the audio input from the mic (since that's the only thing that actually is 'early'). You can easily do this using the ASIO Inserts. There are lots of tutorials online about how to do this so I won't reinvent the wheel by explaining the 'how' of it here but just leave you a link: [https://www.youtube.com/results?search_ ... ter+insert](https://www.youtube.com/results?search_query=voicemeeter+insert).

[User Guide: Connect audio apps to the VoiceMeeter Insert Driver | VOICEMEETER by VB-AUDIO](https://voicemeeter.com/user-guide-connect-audio-apps-to-the-voicemeeter-insert-driver/)