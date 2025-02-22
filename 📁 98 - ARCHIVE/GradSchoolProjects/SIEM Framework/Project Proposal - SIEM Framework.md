---
publish: true
---
TL;DR (too long didn't read):
- I want to design a principled framework for log management and SIEM (security information and event management) systems. The goal is to produce a cost-effective system that can be used to obtain IT event visibility in an organization, namely, for security events.

Most SIEMs are essentially data processing platforms.  My hypothesis is that using one as a SIEM could be more flexible and powerful than using something like Splunk.  I could gather some netflow datasets with authentication anomalies or denial of service attacks to use as a dataset.  I'm sure I could find event datasets for this or even create my own on my local network with various tools.
# Topic Background & Motivation

My current job is technically as an Information Security and Data Privacy Analyst. This is quite a broad title. However, my real job could be more accurately labeled as the Security Operations Center (SOC) Engineer or Technical Support. Recently, I’ve been spearheading the design of event-driven architectures, log management, and engineering solutions for our “detection stack.” It’s hard to describe my current job in one phrase. However, the security part of the job could be summarized by its end goal for security – Detection Engineering.

Detection Engineering usually refers to the systems, tools, and processes related to detecting certain events in an IT system. This is typically done with a SIEM (Security Information and Event Management) system. Most security practitioners think of developing queries and detection commands for SIEM systems. What I’m most interested in is the subject of log management in relation to detection engineering. Both methods overlap to form a system that allows businesses to make decisions based off information from their various IT systems.

Most organizations are not proficient in detection engineering or log management. The result of falling short on both is an overall lack of visibility. In order to implement security or privacy, organizations must first have visibility. Proper visibility means that the organization is able to analyze IT system events and information in the organization enough to the point of reducing risk and providing peace of mind.
# Proposal & Intentions – Log Management Framework

My goal is to develop a log management framework that achieves consistent and cost effective visibility in modular fashion and without using unaffordable proprietary technology. I want to take the philosophical approach and understand the deep principles that affect costs of various log management architectures, approaches, and models. For instance, the cloud service model usually relies of computation and storage costs. Cost effectiveness should be defined by not only monetary value, but also based on the time and expertise necessary for various log management solutions in relation to SIEM solutions.

For application of a log management framework, I would like to implement or develop a simple modular event visibility architecture that is based on free or open source tooling as my resources are somewhat limited. Preliminary research will also be utilized to inform and guide the development of the framework. I anticipate that research on this particular area may be somewhat limited, and the project may ultimately be quite novel. In the industry, I have observed other organizations utilizing Databricks as a SIEM. I will first look into this as a SIEM option, then I will combine other processes, solutions, and the proposed framework to combine a simple proof-of-concept.