---
aliases: 
tags: 
publish: true
date created: Friday, October 11th 2024, 10:57 am
date modified: Friday, October 11th 2024, 11:37 am
---

[Persona Creation](../../../../📁%2011%20-%20Content%20Creation/Persona%20Creation/Persona%20Creation.md)
[Awesome AI](../../../../📁%2003%20-%20Curations,%20Stacks/Awesome%20AI/Awesome%20AI.md)

- by Anmol Agarwal
- Security researcher in AI
- Researching attacking model
- Founder of Alora Tech

- Deep Fakes Background
	- Another way to exploit our trust in people and socially engineer
	- Also large-scale disinformation and misinformation

- The tech being used to create them is improving, but our technology for detecting it is not

# Where Deep Fakes Came From?

- GANs - generative adversarial networks
- Two neural networks essentially competing with each other
- Generator and a discriminator

# This Person Does Not Exist

- thispersondoesnotexist.com
- background can be the giveaway
- If the photo looks too good, then maybe it's fake haha

# Delineating & Discriminating Deep Fakes

- Background and weird unexpected shapes
- Look at eye contact
- Tools can be developed to help with this
- Videos:
	- Mouth movement - is it limited?
	- Random face muscle movements
	- Bulging eyes
	- Head nods and movements that didn't make sense
- Audio:
	- Weird inflection, pacing, breathing, and the "up and down" part of the voice doesn't seem natural

# Solutions & Approaches

- Look at multiple sources from different entities
	- This takes into account the "game" aspect of cybersecurity and cyberwarfare because different entities will have different interests.  Check ones that align you or your institution
- Reverse image search
- When making content, use complex lighting that would be hard to recreate with AI
- We still need manual adjudication by a person
- Think about the context 
	- Is there urgency?
	- Does it make sense at that time?
- If it's audio and video, then there's more for people to find inconsistencies
- Just like UFO photos, you'll have people who are really good at discriminating between fake and real
- ML and AI-based adjudication is a cat and mouse game and requires validated training by a person
- Tools
	- Video fake detection
		- Deepware - looks for discrepancies in the video pixels?
	- Deepfake Total for audio
- For AI tool makers:
	- If the generated content could be used for scamming, then an additional in-depth validation process could be required
	- The process for determining if it's a deep fake could be something validated by a person

# Mitigation Strategies (Industry and Legislation)

- Tech Accord 
	- watermarking, provenance to detect deep fakes
	- Education
- Global Regulation/Legislation
	- ELVIS act in TN
	- EU Code of Practice on Disinformation
	- UK - funded research
	- US doesn't have anything

- Should there be legislation?
	- Is it illegal to scam?...yes
	- Make illegal activity illegal, but a law shouldn't require, for example, email to all use DMARC
		- (disagree with the speaker on this - at least there should be discussions on whether there should be legislation)

# How Do Businesses Approach This?

## Risks to businesses?

- Crude validation/verification processes.  We may have to rely on initially established authentication material or credentials
- Social engineering is the big issue here since voice cloning doesn't require too much data

# QA

- Solutions?  
	- Rely on video and "liveliness" tests.  Just as authentication processes used to be slow, they are going to get slow again.  Constant game theory between attackers and defenders (just how it goes)
	- 