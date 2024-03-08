# Cloud Computing Overview

# Why Cloud?

- Newer technologies and apps are DATA HUNGRY and entities are using MORE DATA
    - between AI, utilizing databases, and more users, more apps are going to requires larger systems to utilize data
    - Video games used to fit on a disk…let that sink in
- Scaling vertically or horizontally is hard
    - It is hard to scale systems to compute this data physically, and companies cannot afford to risk paying for huge warehouses to store servers, and blah blah blah….it’s A LOT
- Security also means more space
    - if you want redundancy and business continuity, then you have to store data in multiple physical places and have the data duplicated (RAID arrays and stuff like that)

## Data Lifecycle and Lineage

- Data is used generally in many ways with the frame of focus on various entities
    - Data sources, inputs, and ingestion
    - Store and process
    - Access
    - Encrypt

## Interfaces and Data

- All data and its lifefcycle and engineering are managed by humans through interfaces
- Interfaces actually have to evolve to be efficient and interact with complex cloud architectures
    - Humans can’t manage data engineering on a large-scale because we don’t have time. Interfaces have to be improved in parallel with data engineering systems

## Mobile Devices cannot store much

- Limited room on hardware
- We can fetch what we need from flexible and efficient databases and cloud stores
- This is the equivalent of building an aqueduct instead of using a bucket multiple times daily to fetch the water

## Only pay for what you use

- Someone inherents the risks of setting up cloud systems and allows other people to essentially rent parts of it for their own use
- There are caveats with this though because procuring the service when you want to use it may take time or indirectly subvert your original reason for using the scalable service

# What is Cloud Computing?

- Simply transforming IT from a product to a service
- Cloud computing service that must have:
    - business flexibility
    - convenience - connection speed, location
    - resilience - weather, security
    - performance
        - distributed computing
    - INTERFACE and configuration to specific solutions
        - Web 3.0
    - Dynamic allocation to users and problem-solvers / Ease of programmability
        - utility computing
    - Large storage
    - Efficient Maintenance processes
    - Virtualization and Resource Sharing
        - Must be a rapid response to user needs
        - Scalability & Elasticity
            - System that is easy to scale without errors or complex processes

# Applications or Situations with Cloud

- High Growth Apps
    - Startup businesses
        - Focus on product development and don’t worry about backend issues or trying to procure server hardware and places to house it
- Bursting or Seasonal Applications
    - US shopping season
    - Shopping websites
- On-Off Data Intensive Applications
    - one time applications or experiments
    - huge simulations or renders

# Problems with Cloud

- Security and Privacy
- Data Loss
- Attacks against hardware, networks, and application-based attacks.
- Stealing intellectual property

## Security Problems

- CIA (confidentiality, integrity, availability)
    - C
        - Fear of loss of control of data
        - is it confidentials - in storage & while in transit to server?
        - Does cloud provider look at it still?
        - Will compromises leak data?
    - I
        - How do we know the data isn’t modified by the cloud provider?
        - How do we know that hardware is working correctly or configured correctly?
    - A
        - Is the provider safe from denial of service attacks?
        - What if cloud provider goes out of business?
        - What is weather hits a building?
        - Does cloud scale well enough?
- Privacy issues
    - Cloud providers can do massive data mining or give data to governments when presented with a warrant
- Increased attack surface
    - cloud provider human resource social engineering
    - target connections between org and cloud
    - target orhestration systems of cloud providers for scaling and user allocation, virtualization, and even resource sharing vulnerabilities
- Auditability and forensics (out of control)
    - difficult to audit data held outside of the organization in a cloud
    - forensics is difficult since now clients don’t locally maintain the data
- Legal and trust issues
    - who is responsible?
    - is subcontracting to other providers secure?
-