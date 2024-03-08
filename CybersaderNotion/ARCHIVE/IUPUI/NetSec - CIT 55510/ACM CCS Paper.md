# ACM CCS Paper

# ACM CCS Papers

**OpenSquare: Decentralized Repeated Modular Squaring Service**

**Out of Sight, Out of Mind: Detecting Orphaned Web Pages at Internet-Scale**

**Chunk-Level Password Guessing: Towards Modeling Refined Password Composition Representations**

**Periscope: A Keystroke Inference Attack Using Human Coupled Electromagnetic Emanations**

**When Machine Unlearning Jeopardizes Privacy**

**Deterrence of Intelligent DDoS via Multi-Hop Traffic Divergence**

**Warmonger: Inflicting Denial-of-Service via Serverless Functions in the Cloud**

**MaMIoT: Manipulation of Energy Market Leveraging High Wattage IoT Botnets**

**Fuzzy Message Detection**

**Meteor: Cryptographically Secure Steganography for Realistic Distributions**

# Steps to Present

- atleast 12 sildes
- more images
- basic idea and solution
- finish the presentation in 18 minutes
- practice

# **Deterrence of Intelligent DDoS via Multi-Hop Traffic Divergence**

## Abstract

- Simple, provably effective, usable deterrence against dynamic DDoS attacks.
- A big part of DDoS defense and any defense for that matter is demotivating the attacker.
- Multi-Hop Traffic Divergence - strategy is motivated by the fact that countermeasures tend to lag behind evolving attack methods with DDoS
- No single-hop defense can perfectly differentiate unknown DDoS and legit traffic.
- Lay DDoS out as a game between attacker and defender
- EID - Economical Intelligent DDoS Demotivation protocol
    - Combines Local Weak (yet divergent) filters
    - Encourages multi-hop defenders to cooperate with boosted local service availability.
    - Resilient to traffic dynamics & manipulations
    - readily deployable with random drop filters today

## Overview

- What is DDoS
- Number of publications consistently increasing
- Why is it hard to eliminate?
    - Attack capacity > defense capacity
        - Defense capacity is way more expensive
    - Attack surface > defense coverage
    - Disguising is way easier than detecting
- Threat model of DDoS
    - evolutionary game
    - ATTACKERS:
        - zero-days
        - mimic legit traffic
    - DEFENDERS:
        - maximize network service availability under DDoS
    - Single Hop vs Multi-hop
        - Single-hop
            - DEFENSE
                - Block DDoS and keep availability
                - How: Stateless random-drop filter
                    - Generative Adversarial Net (GAN) - maximize differentiation between fake and legit traffic
            - ATTACK
                - maximize the benefit-cost ratio
                    - More botnets are used for bitcoin mining and not DDoS when bitcoin prices rise
                    - Darknet market prices for DDoS as a service
            - ANALYSIS
                - No single-hop optimal filters can differentiate traffic
                    - WHAT DO FILTERS LOOK LIKE
                - Attackers can mimic legit traffic
                - Undiminished Attack gains
                - Sensitive to traffic dynamics
                    
                    ![Untitled](ACM%20CCS%20Paper/Untitled.png)
                    
                - Defender cannot obtain an optimal filter (legit traffic distribution) at all times
                - Passive defenses cannot mitigate intelligent, unknown DDoS
                - We should demotivate attackers
                    - Cost needs to outweigh the benefits
- What to do about unknown intelligent DDoS?
    - EID - Economical Intelligent DDoSS Demotivation
    - Multi-hop traffic divergence
        - Ability to detect illegitimate traffic
        - Attack gain nulling by divergence
        - On-demand demotivation
    - What is multi-hop divergence?
        - “Distance” is difference of two traffic distributions at two nodes
            - harmonic mean
        - How much of node 1 remains after node 2
            
            ![Untitled](ACM%20CCS%20Paper/Untitled%201.png)
            
    - Multi-hop divergence by recursion
        
        ![Untitled](ACM%20CCS%20Paper/Untitled%202.png)
        
    - Deterrence - benefit-cost ratio will decrease
        - They can’t pick which node’s traffic to mimic
        - They will have to lose traffic along the way, so there will surely be costs
    - Availability? False Positives?
        - Multi-hop traffic divergence persists despite temporal dynamics
    - How to deploy EID
        - It doesn’t demand perfect filters at each hops
        - Different hop’s filter’s need to be divergent enough to deter attacks
        - EID will always demotivate DDoS with this
- More EID
    - Composable filters to scale up inside each hop
    - On-demand, signaling-free hop pruning to scale out to multi-hops
    - Incremental deployments in moden networks
    - Co-existence with other DDoS defenses
- Evaluation
    - Reflection amplification attack
        - Bandwidth amplification factor was always less than one
    - direct flooding attack
        - benefit-cost ratio close to 0
    - Defender costs
        - High service availability under irrational attacks