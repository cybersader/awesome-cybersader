---
aliases: 
tags: 
publish: true
date created: Saturday, October 12th 2024, 11:16 am
date modified: Saturday, October 12th 2024, 11:16 am
---

- All the vendors have AI
- AI RMF ehhhhh
- 8 categories
- He did forensics on the hunter Biden laptop lol for Washington post
- When vendors are transparent, it's easy
- Non deterministic AIs are bad for high risk scenarios
- In house AI doesn't mitigate the risk for vendors but it does allow tuning for some parameters
- When threat modeling apps, analyze data flow and find where AI is used - usually not in a lot of places
- Identify inputs and outputs
- Identify trust boundaries
- Document stuff please! Doesn't matter if you use AGILE make your wiki and documenting better. Use AI to help generate approximate documentation which is better than none. Risk assessment on that too lol.

# Risk AIssessment

- Understand risks with AI enabled applications
- Owasp top ten - necessary but not sufficient
- Think holistically

## Categories

- 8 is just a nice number but there could be more
- Conventional cyber risks
- Data privacy
- Bias
- Transparency
- IP
- BC risk

## Conventional cyber risks

- Use CIA Triad
- Owasp falls in here
- Insecure plugin design
- Plugins leak data out of the LLM with responses sometimes
- Tampering of response for integrity
- Rate limits for availability
- Encrypted comms with LLMs

## Data privacy risks

- Wide range
- Regulated data
- Training data is responses
- Logging of sensitive data
- Post variables should not be logged in a web log lol
- Anonymization of data or pseudoanonymization. Least amount of entity-resolved data
- Use of data for training
- Regurgitation of your data is crazy small - like one in a billion quadrillion

## Bias risks

- Bias in data
- Data selection
- Alignment - rules that skew results
- Inappropriate model selection
- Just make sure the bias aligns with the objectives and the it's moral, ethical, etc.
- Understand the bias bottlenecks and risks with it
- Truth discernment and all that is talked about a bit too much…it's not that complicated of an issue in essence just in how it plays out
- Executive order 0140110?? (Not sure I spelled that out right) - bias testing is a part of red team testing
- It's a fools errand, so just make sure the bias aligns with values.

## Transparency risks

- They are black boxes of abstractions that can't really be distilled by nature and how weblike they are
- Alignment problem
- Show which parts of workflow use AI
- Just as IT systems can be used to exploit so can data with AI, so the same transparency approach should be taken in terms of communication, audits, etc.

## IP risks

- Provenance and licensing of data in training
- Ownership of generated output
- Copyright issues

## Regulatory risks

- Be careful using it with business purposes
- Be careful with EU regs
- GDPR applies to everyone to a degree
- Regulatory risk evolves so do the risk assessment early

## Vendor BCP

- Lots of these vendors will collapse
- Scaling resources to meet demand is hard for these vendors
- Most providers using third parties for hardware which presents more risks
- Where is your computer coming from? Computer credits?

## Reputational risks

- Hallucinations are a problem for high risk scenarios. Guardrails when interacting with customers
- The moderation and tools are expensive (very expensive)

# Evaluating risks

- Logarithmic risks
- Low med high
- 1, 4, 10
- Add up to get risk rating of application or use case

# When to use the tool

- You need enough transparency
- Use this when the risk is high for relationship with vendor and business operations
- Mitre atlas and NIST AI RMF
    - Use this if you're actually developing AI
    - These are the wrong tool for the job

# Vendors are jerks sometimes

- 3rd party risk management can make your costs go up be cuz vendors have to spend resources to help you
- New license costs may go up - big vendors may be like this