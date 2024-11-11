---
aliases: 
tags: 
publish: true
date created: Saturday, April 27th 2024, 9:54 pm
date modified: Saturday, April 27th 2024, 10:57 pm
---

> [!tldr] This documentary focuses in on the Stuxnet virus.  Known as one of the most sophisticated state-sponsored malware ever.  It was used to attack critical infrastructure including the sabotage of a nuclear reactor.

- A lot of what's known about Stuxnet is in the public domain, and yet, any official involved has the reply of "it's classified."
- Nobody is happy about confessing or owning up to Stuxnet, because it would change the conversation about the blurring line between cyber and kinetic attacks
- Luckily the malware code was accessible to some

- It used a complex zero day / previously undisclosed and new vulnerability
- Security and AV companies share general information and binary samples - not always complete malware

- Ran "strings" over binary to find a few words and form "STUXnet"
- ICS consultant - "it was beyond our worst fears" - the more we analyzed, the more bizarre

> [!quote] Bad things everywhere. We try to track motivation and stop it at the root. We were consumed by this work and in the zone. We grinded at code.  We needed to pick the malware apart piece by piece.

> [!quote] It usually takes minutes to find the purpose of the malware.  STUXnet took months.  Every piece of code did something for the attack.

> [!quote] We were surprised STUXnet used a zero day. 

> [!quote] Zero days are valuable - can be sold for $100,000s

- 4 zero days in one malware points to millions of dollars when attached to specific target vertical
- STUXnet had a few hints or IOCs left behind
- STUXnet needed a digital cert directly from Microsoft to get low-level access.  Tells what company it came from.  They had stolen these from two companies in Taiwan.
	- The companies the creds were stolen from were in the same geolocation
	- These certs were behind levels of physical security
	- Spies or insiders had stolen them for sure

> [!quote] Like coming onto the set of a James Bond movie

- There was something related to Siemens or OT/ICS PLCs - factory and critical infra type stuff
- This was aimed at critical infrastructure

- Malware was probing the controller more than it was manipulating
- It would only attack if specific conditions were met - specific target

- STUXnet was showing up around the world
- Iran was an obvious hotspot on the map
- Pipeline explosions were unexplained at the same time - also murders of nuclear scientists

- The AV and malware analysis engineers were legitimately fearing for their own lives
- They (Symantec) was contacted by a PLC and ICS expert from Holland
	- He said that all PLCs have a unique ID number that gives the make and model of the device
- They found this in the code

- They found the exact PLCs involved - frequency converters made from Iranian manufacturers 
- These PLCs were export controlled by the U.S Nuclear Regulatory Commision
- They were attacked nuclear facilities

- There was an engineer that was expert in the intersection of 3 related topics: cybersecurity, nuclear science, and espionage.

- Iranian Nuclear Program
- How did Iran get their first reactor? - through the U.S
- We liked the "Shah" of Iran
- They were wanting to have nuclear weapons - viewing themselves as the police of the Persian Gulf
- We denied them nuclear technology after their revolution that resulted in the downfall of the Shah and their old government
- Pakistan had Abdul who started their nuclear program
- Pakistan transferred blueprints and hardware through Dubai to Iran
- The nuclear program and building weapons were spurred by the taking down of Sadam Hussein
- They stopped for a bit - scared of the U.S. Once the US was busy with Afghanistan, they started their program back up 
- They had 7000 centrifuges deep underground to enrich Uranium to be used to produce energy and for bombs

> [!quote] They account for every gram.

- At Natanz, they found isotope 236 which is only present in states with nuclear weapons
- They realized this equipment was from a black market.
- They had professional manufacturing and quality control

- Centrifuges - uranium gas in, 1000s of centrifuges, enriched uranium out
- They spin FAST - 300 m/s
- Hard to manufacture - incredibly delicate systems that can be broke by temperature change of carbon fiber and metallic material or small vibrations

- They became public with this
- "National Nuclear Day" - we will fight for our right

- Israel was saying they are going to bomb Iran. The U.S., an ally of Israel, did scenarios of what would happen - all bad.  Doing this would put the U.S at war with Iran.  
- Israel and the U.S cooperated well with intel together.
- US and Israeli intelligence joined forces.

> [!quote] Israel: Let's do it differently then

- Israeli intelligence officials showed up at the US intelligence office: 

> [!quote] We have an idea. There's a big risk, but here it is.

