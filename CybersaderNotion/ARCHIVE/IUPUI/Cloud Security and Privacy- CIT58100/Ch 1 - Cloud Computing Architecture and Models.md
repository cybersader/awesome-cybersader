# Ch. 1 - Cloud Computing: Architecture and Models

# How You Start a Cloud

- Buy some servers and/or land depending on how much you need
- Get some server racks, setup A LOT of power depending on how many servers or computing devices you have, and set up a system for cooling everything.

## What goes on the racks?

- Server, storage devices, cords, cooling, power, etc.
- Single racks can hold up to 42 servers sometimes

### Types of Servers

- Blade servers - stripped down computer with very modular designs so you they can operate easily on a rack. The enclosure for the blade servers has all of the necessary power and cooling.
    - Performance - Get the hardware closer to the user and get rid of all of the other unnecessary peripherals that you would usually have on a regular PC (mouse, keyboard, etc.)
        - CPU is really important: cores & clock rate in Giga-Hertz
        - Memory - quick storage to be used with execution of commands. This is really important. 32 gigabytes is comfortable. 64 is really comfortable honestly. RAM also has different frequencies like with DDR5.
        - Cache vs Memory - there are tiers for cache which is faster than RAM.
        - Some latency usually comes from the bandwidth of the buses between the different tiers of storage hardware.
        - MOST LATENCY comes from the network outside of the servers.
        
        ![Untitled](Ch%201%20-%20Cloud%20Computing%20Architecture%20and%20Models/Untitled.png)
        

## Setting up a Data Center is HARD

- You need GREAT networking, lots of storage, great cooling, uninterruptable power supply that won’t cause issues, air filters, etc…

### Cost Centers in Data Centers

- Air conditioning - you need certain temps for good performance
- Redundant power just in case anything fails. Shutting down means loss of potential important data in memory
- Fire protection and weather protection
- Physical security - security team, access control
- Monitoring systems - look at performance of hardware and network
- Connectivity - Multiple ISPs/Leased Lines
- Lots of wiring

### Basic Data Center Architecture

![Untitled](Ch%201%20-%20Cloud%20Computing%20Architecture%20and%20Models/Untitled%201.png)

- Typical Applications:
    - outbound web pages
    - internal computation apps like data mining or index computation

### Data Center Communication

- 80% of data stays in the data center
    - Mostly internal computation
- Latency:
    - propagation delay - not important in a data center, but can be tens of milliseconds across the Earth
    - end to end latency:
        - Switching latency - 2.5 usec for storing a forward data; 2 usec (cut-thru)
        - Queuing latency - depends on network load or queue in the router
    - Typical latency across data center: 10-20 usec

### Different Customers Need Different Types of Computation

- Lots of different users
    - Average End User - simple low computation needs, webpages
    - Mobile App Developers - Different OS or architecture
    - Enterprise System Architect
- Cloud provider needs a system, workflow, and interface for deploying virtualization setups and infrastructure to suit their needs

# Types of Cloud Services

## SaaS & Maturity Levels

![Untitled](Ch%201%20-%20Cloud%20Computing%20Architecture%20and%20Models/Untitled%202.png)

- The goal is to make things “elastic” and able to morph to the users’ needs without creating issues and noticeable changes
- How multi-tenancy and making things scalable affect security? How do I map asset like this?
- In order to change things and make them more mature, the application needs to be changed to work with the cloud provider in smarter ways.  Making SaaS products more mature takes a lot of work and engineering.
- You can only vertically scale so much and make the server so strong, so lvl 3 is not great in this regard
- lvl 4 expands out with to have parallel or concurrent computing

## PaaS

- Platforms give you OS, environments, everything you need to run applications.
- They don’t have to be flexible either. Sometimes they might just be an API platform

## IaaS

- leases VMs which can be configured in any manner
- Access to a standard OS and you can configure layers above it
- Virtualization is one of the most important parts of IaaS we can lease out parts of a single device, so that multiple users are operating on one device in separate VMs
- Virtualization also adds more latency into the mix
- multiple tenants on the same hardware creates tons of security problems to solve

# Cloud Stack

![Untitled](Ch%201%20-%20Cloud%20Computing%20Architecture%20and%20Models/Untitled%203.png)

- App: SaaS
- Data: Databases, distributed databases that are software-based management systems or interfaces
- Runtime: Libraries and extra files and stuff that are used to run applications.
- Middleware: management platforms that enable services for running applications in the Cloud
- OS: Connects hardware or virtualized hardware with code
- Virtualization: virtualize resources to look like separate devices and make the whole multi-tenant situation much simpler
    - Amazon uses the Xen virtualization platform

## Containers / Containerization?

- Do cloud providers provide multi-tenant solutions for containerization on one operating system on bare metal just like they do with virtualization?

# Types of Cloud based on control

- Public - Open market for procuring computing resources. No need to manage supply chain or any infrastructure processes that keep data centers, warehouses, and operations up.
- Private - you manage everything
- Hybrid - connect your private cloud to external cloud vendors for some of their vendors or to extend your functionality or your capacity

# Software Service Models

## Traditional Software

### Traditional Software Service Costs

- Software Cost (media and license cost /user) , Support, Mgmt

### What is it

- Deployed on your own clients/workstations/network

## Open Source Software

### What is it

- Free usually
- Same costs for management and setup as traditional

### Open Source Costs

- No software costs
- Infrastructure, setup, and management costs

## Outsourced Software

### What is it?

- Outsource the management for a flat fee

## SaaS - Software as a service

### What is it?

- Offered over the internet as a service
- Low monthly subscription
- Amortize mgmt and support costs over many clients

### Costs

- They are really low because the company can dynamically procure resources as they need them which is lower risk and much easier to manage with the Cloud. They can add costs per user on top of the potentially super cheap costs of the cloud resources.
- Pricing ranges usually vastly differ simply because of cloud resource differences