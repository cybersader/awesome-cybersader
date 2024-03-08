# Cyber Resilience

# The Threat - Ross Anderson

[The Threat | Edge.org](https://www.edge.org/conversation/ross_anderson-the-threat) 

## History of Cybersecurity

- Began with cryptography (30 years ago).  Expanded to access control with operating systems and policy models. Rest of it was snake oil and bull crap.

### The Problem of Everything being connected via the Internet

- You used to be able to solve it bureacratically by going to a manager
- Now things are way more complicated.  Suddenly, the security of a system is a function of the self-interests and behavior of large and complex groups of people
- There are groups that understand the system better than other people and can leverage these connections to their own interests

### Social Sciences & Network Economics

- To build systems you need to understand the game theory and the economics of networks of people, systems, and large interconnected groups.
- To build decent systems you need to understand protocols but also the main goals and differing interests
- Network economics is a prerequisite to business and cyber
    - the underlying problems are usually incentives

### System Weaknesses to People Weaknesses

- Over the past 10 years, systems became tougher, but people in the process were weak points
- Facebook utilized people’s interests knowing that they are selling your data but making you feel in a safer place than you really are

### Crime Switched to the Internet

- People’s interests and incentives didn’t change for crime, they just moved to a place that is more of a grey area.
- Crime went online
- Companies got more control of cybercrime and police didn’t have to do as much work.  Not much was done for cybercrime as the crime became more online.

### How cyber practitioners should work?

- Work with the times
- Keep it refreshing and solve the bigger problems

### Cryptography NSA Problem

- They wanted to see everything, but cryptographers and scientists were angry because this defeats the purpose
- They made it so if you shared your keys with the NSA or third party, then you didn’t get a seal of approval for legal stuff.  This stopped companies.

## Solving Problems with Projects

### Cryptographic Mechanisms

- This can do more than just secure things….it can allow for cheaper solutions to very large problems
    - Ex: cryptographic metering for electricity
- Great transportable tech

### Computer Science at its Core

- Complexity
- Writing big programs that can automate human solutions
    - Limits: interactions between app engineers

### Complexity

- We build much larger disasters
- The limiting factor is not lines of code, but social
    - It’s your job to take risks in a company
    - only 30% of large projects succeed in public sector

### Project Management

- IT relates to shipyard management in the same way
- Network effect, tech lockin - all makes it hard to manage big projects

### Understand Network Effects

- Game theory
- Markets
- Social Reasons

### Most Security Failure Happen because of Network Effects

- It’s super important to be first
- The reason Microsoft software is insecure is because they had to be dominant in the market before trying to be secure

## The Future & Engineering IT

### People’s abilities and perceptions are increased by Tools

- Search Engines changed everyone’s abilities
- You don’t have to be smart, you just have to be resourceful

### Data Costs Money Now

- Whoever has the data control can change behavior since we all use tools

## IOT

### Problems

- Sometimes privacy
- Security will be about safety

### Safety

- Cars used to be about doing some engineering and testing, then into production after physical testing
- SOFTWARE and NETWORKING updates to cars:
    - good because you can push out safety quickly
    - safety regulators will have to work much faster though
    - The devices inside the vehicle aren’t always made by the car maker, so updates can be insanely complicated with the network economics
- A safety flaw that can be exploited from afar is serious

### Supply Chain

- With IT suplly chains, vulnerabilities can be exploited on huge scales

## The Internet has Curses & Blessings

- It’s 3 steps forward, 1 step back

### Business IT monopolies

- Nature of business create the economic inequalities
- If one business can charge up to the customer’s willingness to pay, then you have a natural monopoly

## We need more open datasets

- Datasets are not readily available to solve a lot of these data-hungry solutions.
- We need problem-solvers who are willing to do the business and work to get these large datasets ethically and substantially

## Cyber Conflict Thresholds May Be Lowered

- People think attribution is hard and that they can get away with things
- Kinetic actions taken against cyber is a grey area

### Social Media is being used for war

- Some governments have taken action against people on their social media posts

## Echo Chambers

- microtargeted echo chambering will become more prevalent with advertisements and other social-media based techniques
- Politics, fake news, and the like all have this problem

# Cyber Security vs Resiliences

[https://youtu.be/97C-L06QySY](https://youtu.be/97C-L06QySY) 

## Cybersecurity and Resiliency

- Assume that you will be attacked.
- Resilience is the ability to bounce back when failure or attack happens.
- Mind set that you will be attacked.

## Cyber Hygiene

- We have problems because we just get the product out
- We incur technical debt
- Pay off your technical debt consistently

## Prioritize

- Cost of Attack
    - know what attackers can actually do
- Mean time to remediation
- **Make it expensive and be able to remediate quickly**

## Managing the Risk

- Cybersecurity is just another risk
- Keep the people who manage the risk (leaders) informed

## Corporate Board and Policy Makers

- Responsible for oversight of risk
- Be aware of the risks and how they instantiate
    - mindsets have to be set at the board level
- Risk-based problem

## Collaborate with others in the industry

- LEADERSHIP here

## Incident Resilience

- You need technical preparations
- Communications - you need to policies to manage public communications during an incident
- Operations - leadership needs to be managing and making sure people are working the problem.  Leadership needs to know their role.
- Legal - legal team needs to know their part in the operational part of it

# Resilience is More than Availability

M. Bishop, M. Carvalho, R. For and L.M. Mayron. In Proceedings of the 2011 New Security Paradigms Workshop, pp. 95 – 104, ACM, 2011.

## Terminology is ill-defined or applied inconsistently

- Information Assurance has a lot of badly-defined terms people simply use as buzzwords.
    - Examples: resilience, robustness, survivability
- Ill-defined terms cause confusion and misinterpretation of goals and results, hampering communication & complicating collaboration.

## Resilience means what?

- Often used interchangeably with “robustness”
- Attack resilience?
- For a network:
    - as long as the network does its service despite local losses, then it is “robust”, “survivable”, or “resilient.”

### It’s Fuzzy -  Performance vs Confidentiality and Integrity

- A system may not lose performance but compromise confidentiality or integrity of the service

## The Power of Words

- Principle of Linguistic Relativity
    - words and thoughts are linked

## Qualitative Definitions

![Untitled](Cyber%20Resilience/Untitled.png)

### Survivability

- as defined in “Survivable Network Systems”, “the capability of a system to fulfill its mission, in a timely manner, in the presence of attacks, failures,
or accidents.”
- 4 properties:
    - resistance to attack
    - recognition of attacks and damages
    - recovery of full and essential services after attack
    - adaptation and evolution to further attack

### Resilience

- From DHA - Department of Homeland Security
    - For cyber defense purposes, having
    sufficient capacity to simultaneously collect or
    receive and assess security information, execute
    any ACOA [Automated Courses of Action] make
    alterations to the ACOA as needed, and sustain
    agreed upon service levels.
- R4 Framework
    - **Robustness**—the ability of systems, system elements,
    and other units of analysis to withstand disaster forces
    without significant degradation or loss of performance;
    - **Redundancy**—the extent to which systems, system elements, or other units are substitutable, that is, capable of satisfying functional requirements, if significant
    degradation or loss of functionality occurs;
    - **Resourcefulness**—the ability to diagnose and prioritize
    problems and to initiate solutions by identifying and
    mobilizing material, monetary, informational, technological, and human resources; and
    - **Rapidity**—the capacity to restore functionality in a
    timely way, containing losses and avoiding disruptions.

## New Paradigm

### Resilience for Integrity

- Integrity looks like a difficult problem from a resilience
standpoint because how to recover from incorrect or corrupted data is not immediately obvious.
- More robustness does not equate to resilience
    - —a future-looking system has to incorporate aspects of both, and computationally
    may look very different to the deterministic approaches we
    are comfortable with today. These approaches often provide
    solutions that are near optimal, as opposed to exact.
- two-fold approach is needed here.
Individual machines should be able to check that outputs obtained make sense in context. Also, machines must be physically and logically separated so that a single subverted computational device cannot produce a (holistically) damaging result.

### Resilience for Confidentiality

- Can we recover confidentiality in the event of a breach

### Levels of Communication

- Level A. How accurately can the symbols of communication be transmitted? (The technical problem)
- Level B. How precisely do the transmitted symbols
convey the desired meaning? (The semantic problem)
- Level C. How effectively does the received meaning affect the conduct in the desired way? (The effectiveness
problem)

Leverage B & C to create resilient systems with regards to confidentiality

# Achieving Cybersecurity Resilience Using a Lifecycle Approach

## Cybersecurity Maturity

![Untitled](Cyber%20Resilience/Untitled%201.png)

- There is no end game.  You need a team that can efficiently evolve with the technologies and the threats.

## Common Misconceptions

### Cybersecurity is a Goal

- Cybersecurity is not a destination
- Ongoing and evolving process
- Threat environment is changing
- Risk is never completely eliminated
- Risk reduction is a balancing act because solutions to risk are almost always a double-edged sword
    - mitigate, transfer, accept, avoid

### Cybersecurity is an IT Responsibility

- NOPE.  This is an organizational responsibility.
- People, Process, Tech
- People are the weakest link
- You need leadership buy-in
    - resources to support the cyber solution part of an organization
- Cyber needs to be part of a variety of solutions in an organization, and that requires for collaboration and coordination

### Data Breaches Only Happen to Big Orgs

- Threat actors are opportunistic
- Most incidents aren’t reported
- Immature programs = low-hanging fruit
- Path of least resistance

### Cybersecurity is a Cost Center

- Cyber is part of the business solution
- Benefits of cyber are recognized through a well designed program
    - institutional memory
    - business continuity
        - function during events
    - information assurance
        - keeping vital information to the business CIA (confidential, integrity, availability)
    - employee empowerment

## Paradigm Shift - History

Information Security → Cybersecurity

### Information Security

- Financial Institution Compliance Requirements
- Gramm-Leach Bliley Act (GLBA) 1999
    - Financial Services Modernization Act
- Safeguards Rule
    - WISP - written information security plan
    - comprehensive risk analysis against handling non-public info
    - develop, monitor, test program attributes
    - allows for later updates
- Information Security Job:
    - Asset Inventory
    - Finding critical assets
    - Ensure adequate control environment
    - Assess
    - Comprehensive and holistic
    - Who is responsible?

### Evolving Threat Landscape

- Attacks started popping up
    - DDoS attack
    - RCEs
    - Ransomware
    - Zero Day Exploits

### Cybersecurity

- Don’t just focus on critical assets
- Identify, Protect, Detect, Respond, Recover
- Covering more surfaces:
    - forensics firms
    - legal counsel
    - insurance contingencies
    - law enforcement
    - public relations

## Developing Cybersecurity Culture

- People see cyber as cumbersome, unnatural, afterthought, apprehension, imposed upon orgs

### Changing the Narrative

- Baked-in Model:
    - integrate into organization’s mission and solution
    - NOT someone else’s role
- People First:
    - we need a culture to solve problems that include cyber aspects
    - People conceive and design everything

### People Culture

- Leadership, Governance, and Oversight
    - Set the tone
    - Accountability of self and workforce
    - Mission is communicated
    - Directs resources to high-risk problems
- Hiring Process
    - Job descriptions should include cybersecurity responsibilities
    - Background checks prior to hiring
- Training
    - IT training for everyone - demystify tech
    - Get people familiar with terminology
    - Specific training for roles
- Performance Reviews
    - tie things to money
    - publish tests on people with cyber

### Process Culture

- Every process needs learning and improvement
- User and Equipment Provisioning:
    - centrally managed, distributed performance
    - Approval workflows
    - IT system and account retirement
- Change Management:
    - change types based on risks
    - procedure and documentation based on change type
    - all changes performed compared to approved changes
    - Change Advisory Board - regular review of performed and planned changes
- Cyber-Risk Management:
    - risk-criteria statements and standards for organization
    - standard methodology/consistent application for risk
    - schedules for assessments
    - reporting
- Account Review:
    - AD review
    - stale accounts?
- Activity Review:
    - SIEMs
    - Insider threats
    - Collaborate with other departments
- Threat Intelligence:
    - role-based distribution
    - actionable intelligence based on risk
- System Lifecycle Management:
    - acquisition to destruction
    - collaborate with other departments

### Technology Culture

- Perimeter Controls:
    - Firewall
    - IDS/IPS
    - Zero-day Protection
    - MFA for Remote Access
    - Multi-Layer Authentication
- Internal Network Preventative:
    - IDS/IPS
    - Web/Internet/DNS Filtering
    - AV
    - Data Leakage Prevention
- Testing is not practice
- Social Engineering tests
- Audit Change MGMT
- Audit HR processes
- Pentesting, Config Assessments, DRBC/BCDR

## Tyler Cybersecurity Lifecycle

![Untitled](Cyber%20Resilience/Untitled%202.png)