# Presentation 1 - SECProv- Trustworthy and Efficient Provenance Management in the Cloud

# Requirements

- 13 slides at least
- Cool
- Story line.
- Not much technical crap

# Pres Notes:

1. TITLE
2. Cloud is a black box
    1. Control differs at each layer
        1. As we’ve discussed control or management differs at each layer
        2. The higher the levels we manage for infrastructure, the more difficult it is to have consistent or secure logging to ensure we have Confidentiality, Integrity, and Availability of our data
        3. Users cannot flexbily use functions from lower layers to gather this sort of knowledge, so they have to trust that the cloud provider is doing so
    2. Visibility is S tier
        1. When people plug in USBs from the parking lot, or your databases get held for ransom, then you’ll wish you had more logging and verifiable evidence to go along with it
        2. Logs are like cats. You can never have too much.
3. Why is this important?
    1. Compliance and forensics love their frameworks
        1. In the legal and forensics side of things, everything has to have a proven chain of custody
    2. In a court case with digital forensics or during a breach, it might not work out too well if you mention you know the evidence is true because your custom tool says so
        1. Tried and true is the way to go
    3. Not to mention, it’s all about the data
        1. We need as much as possible, and we need to know when it’s mysteriously gone, or who touched it
    4. Cloud is great, but it can be a pain when you have to meet standards or you get audited
    5. I work in data privacy, and although the privacy work isn’t mature yet in the United States, one day these will be privacy audits that will look right into your databases to see what sorts of user data your storing. They will need to be sure that you haven’t tampered with it either.
    6. We need simple solutions
4. SECProv focuses in on the data storage layer, which can be thought as the 2nd highest layer
    1. We don’t have much control here
5. Zero Trust
    1. It all comes down to zero trust
    2. If a system is designed with some goal in mind, but that goal can be subverted or exploited by individuals with conflicting interests, then the interface for those individuals should not be trusted
    3. In the case of something as simple as a search box, a hacker might be interested in deleting all of your data by 
6. Cloud Provenance?
    1. Simply put, a complete record of the history of entities in an IT system, their actions, etc.
    2. In a cloud setup, there are some untrusted entities for sure
    3. This diagram shows an example of how things could properly and improperly react
    4. To uphold security we need CIA:
        1. who accessed and what they did
        2. history of changes made
        3. location of data and status of systems
    5. History needs to be tamper evident
7. CloProv
    1. Useful for developing secure provenance management solutions.
        1. Look at threats and dilemmas with entities to find weakpoints
    2. Entities- the things to log
    3. Activities- involves entities
    4. Agent- who’s responsible for an activity
    5. State- value of entity at a time
    6. provenance chain- entity change over time
8. Example threat
    1. Malicious cloud provider
    2. Malicious USERS TOO
9. SECProv - applying the threat model
    1. A fancy type of hash chaining as part of a larger process
10. High level
    1. Trading around signatures
    2. Uses the Boneh-Lynn-Shacham (BLS) aggregate signature scheme
11. Combining user signatures
    1. Better storage with more users
12. OpenStack Swift
    1. can be stored anywhere
13. .

# Outline & Overview

Slide 1: The problems and the solution

- Cloud can be a black box
    - Just as a login form can't be trusted from a user ("zero trust"), I assume the cloud falls into the same problem where because users cannot use functionalities from lower layers of the cloud that they don't control, then CIA and non-repudiation and attaining trustworthiness and accountability becomes difficult.
    - Everything can essentially be man-in-the-middled or proxied (although not everyone is evil).
    - Not to mention, having automated management, controls, and functionality at certain layers (how cloud works), can make it really difficult to have consistent and strong security. It’s just a hard problem to solve and there aren’t super simple solutions.
- Data on Cloud Systems
    - This paper is referring to “entities” which is any type of data or information or resource stored or processed within a cloud-based system.
- Cloud Provenance
    - Provenance, in this case, refers to the complete record of the history of the entity, including its origin, changes made to it, and its current state. This can include information such as who created the data, when it was created, how it was modified, and who accessed it. By having a complete record of an entity's history, it can provide valuable insights into the integrity and authenticity of the data, which can be important for ensuring data quality and regulatory compliance.
    - In contemporary research, Cloud providers are generally as considered as trustworthy as a crappy masterlock.

Slide 2: Why is this important?

- Here come the buzzwords
- Zero Trust
    - Just as with a login form, you never trust the input.
    - If a system is designed with some goal in mind, but that goal can be subverted or exploited by individuals with conflicting interests, then the interface for those individuals should not be trusted
    - For cloud providers this means not trusting locally hosted provenance systems that lack repudiation and integrity security. In other words, we can’t really prove that the system has been used correctly to its intended purpose
- Existing Cloud Provenance is…eh
    - Vulnerable to some attacks
    - For instance, a “state-of-the-art” secure provenance scheme - “SProv”
    - Users have control over the data and provenance information generated by the users - not zero trust
    - Great for some situations though
    - In the cloud though,
        - Data and provenance records are under the control of the cloud provider - untrusted.
        
        ![Untitled](Presentation%201%20-%20SECProv-%20Trustworthy%20and%20Efficien/Untitled.png)
        
- Cloud Compliance is complicated
    - creating a tried and true method that can be applied to various layers of the cloud and flex to the situation can make it easier for companies to use the cloud when they have to be compliant with things like Sarbanes-Oxley or the Health Insurance Portability and Accountability Act (HIPPA)
- Forensics
    - Not to mention, in forensics one needs to be able to verify the chain of custody for every piece of data used in an investigation. Simply put, if the data could maliciously be modified and unaccounted for at some point, then an evil person may not get their due justice
- Data Privacy
    - Proving correct use of customer data. GDPR committee investigations, etc.

Slide 3: CloProv Model

- A provenance model
    
    ![Untitled](Presentation%201%20-%20SECProv-%20Trustworthy%20and%20Efficien/Untitled%201.png)
    
    - In this updated graph, we've added three components to show the dilemmas in achieving provenance in the cloud:
    1. Shared data: The shared data component represents the fact that in a cloud environment, multiple users may be storing their data in the same storage system, making it difficult to attribute changes to a specific user. This can make it challenging to collect provenance information from multiple users and maintain the integrity and accountability of the data.
    2. Untrusted storage: The untrusted storage component represents the fact that cloud service providers may be malicious and collude with other stakeholders to tamper with or hide data. This can make it challenging to collect provenance information from untrusted storage systems and maintain the integrity and accountability of the data.
    3. Untrusted database: The untrusted database component represents the fact that insiders within the cloud service provider may be malicious and collude with other stakeholders to tamper with or hide data. This can make it challenging to collect provenance information from untrusted databases and maintain the integrity and accountability of the data.
- Includes: entities like users, apps, data, cloud providers, and other system or hardware components.
- Useful for developing secure provenance management solutions.
    - Look at threats and dilemmas with entities to find weakpoints
- CloProv is a very general model that applies to data storage situations in the cloud
    - Entity (E): Represents different types of elements, such as files, applications, VMs, etc.
    - Activity (AC): Occurs over a period of time and acts upon or with entities.
    - Agent (A): Responsible for an activity taking place on an entity. Depending on the types of the entity and activity, an agent can be a person or a software/hardware.
    - State (S): The state of an entity at a given time represents the value of various attributes of the entity. The attributes can vary depending on the types of entities.
    - Provenance Record (PR): Represents how an entity comes to a given state from its previous state. Includes information about the entity, agent, activity, and the various relations between these three core elements, such as generation, usage, communication, derivation, attribution, association, delegation, and started time.
    - Provenance Chain (PC): Presents how an entity evolves over time, and is the sequence of provenance records of the entity ordered by time.
    - Provenance Block (PB): Holds the provenance records and provenance chain information of a certain epoch.
    - Provenance Block Chain (PBC): The time-ordered sequence of provenance blocks for an entity.
    - System Provenance (SP): Contains information about all the provenance blocks generated during an epoch.
    - Proof of System Provenance (PSP): A publicly available proof to ensure the integrity of the system provenance.
    
    ![Untitled](Presentation%201%20-%20SECProv-%20Trustworthy%20and%20Efficien/Untitled%202.png)
    
    ![Untitled](Presentation%201%20-%20SECProv-%20Trustworthy%20and%20Efficien/Untitled%203.png)
    

Slide 4: Threat Model & SECProv

- SECProv, on the other hand, is a concrete scheme for secure provenance management in a multi-user, shared, cloud-based data storage system.
- Threat model considered in the SECProv scheme
- Types of attackers and the attacks they can launch

![Untitled](Presentation%201%20-%20SECProv-%20Trustworthy%20and%20Efficien/Untitled%204.png)

- You can have malicious insiders, malicious cloud providers, or even malicious users in situations where the provenance db is controlled by the user (not shown here)

Slide 5: Block-wise Provenance Management

- Explain the block-wise approach used in SECProv for managing provenance records
    
    ![Untitled](Presentation%201%20-%20SECProv-%20Trustworthy%20and%20Efficien/Untitled%205.png)
    
    ![Untitled](Presentation%201%20-%20SECProv-%20Trustworthy%20and%20Efficien/Untitled%206.png)
    
- Highlight the benefits of this approach for security and efficiency

Slide 6: Aggregate Signatures

- Introduce the concept of aggregate signatures and how they are used in SECProv
- Describe the properties of the Boneh-Lynn-Shacham (BLS) aggregate signature scheme

Slide 7: Architecture

- Present the system architecture for integrating SECProv with OpenStack Swift storage
- Highlight the key components and their roles in the system

Slide 8: Provenance Gateway

- Describe the provenance gateway and its five modules
- Explain how users interact with the gateway to upload and delete files

Slide 9: Performance Evaluation

- Present the results of performance evaluation for SECProv in terms of overhead, CPU utilization, and storage requirements
- Compare the performance of SECProv with SProv

Slide 10: Provenance Verification

- Explain the verification process for provenance records in SECProv
- Describe how the VerifyBlockChain and VerifyProvenanceChain algorithms are used

Slide 11: Related Work

- Provide an overview of related work in secure provenance management
- Highlight the differences between SECProv and existing schemes

Slide 12: Conclusion

- Summarize the key contributions of the SECProv scheme and its advantages over existing schemes
- Discuss the potential impact of SECProv on cloud-based data storage systems

Slide 13: Future Work

- Describe potential avenues for future research and development in secure provenance management, such as incorporating SECProv with SQL interfaces or more complex distributed data management systems

# Visuals