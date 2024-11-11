---
aliases: 
tags:
  - IAM
  - Identity
  - AuthN
  - AuthZ
  - Authentication
  - Authorization
  - Identity-Governance
publish: true
date created: Friday, September 6th 2024, 9:50 am
date modified: Saturday, September 7th 2024, 11:46 am
---

# Authorization, Access Control, Least Privilege - Related to Data Hygiene

To create a scalable and interactive authorization system with guardrails, especially around network shares, here's an approach that integrates policy-driven access control, user interaction, and delegated authority:

## Key Components:

1. **Data Classification and Tagging**:
    
    - Implement a **data classification system** where all sensitive data is tagged based on its type (e.g., PII, financial data, etc.).
    - Integrate this classification into the storage system (e.g., via metadata on files), ensuring that any movement or usage of data is trackable.
2. **Policy-Based Access Control (PBAC)**:
    
    - Use **PBAC** to define where sensitive data can be stored or accessed. Policies should outline who can move or access certain data types and under what conditions.
    - Set up **default guardrails** that only allow sensitive data to be stored in predefined, secure locations such as approved network shares or cloud storage.
    - Policies could be enforced via tools like **Microsoft Information Protection (MIP)** or **Azure Rights Management (RMS)**, which can label, encrypt, and restrict access to data based on its classification.
3. **Interactive User Prompts**:
    
    - When users attempt to move data outside approved locations, implement a **policy enforcement system** that automatically triggers a pop-up or notification.
    - This pop-up should ask for justification and inform them of the policy they’re trying to override.
    - The system can be integrated with tools like **Azure Information Protection**, which automatically flags when sensitive data is moved to unapproved locations.
4. **Delegated Review and Escalation**:
    
    - For cases where users provide a valid reason for needing to move or access data outside the approved locations, a system can be set up to forward these requests to **delegated authorities** (e.g., department heads or data stewards) for review.
    - This delegation could be managed through an **identity governance platform** like **SailPoint**, **Okta**, or **Azure AD**, where team leaders are responsible for handling escalated requests and granting exceptions.
5. **Scalability with Automation and Auditing**:
    
    - Implement an **audit trail** to track all movements of sensitive data and any exceptions granted by delegated authorities. This ensures full visibility into how data is being accessed or moved.
    - To scale this process, integrate **automation** via tools like **Microsoft’s Data Loss Prevention (DLP)**, **OneTrust**, or **Varonis**. These tools can enforce policies in real-time and reduce the manual overhead of managing exceptions.
    - DLP systems can also integrate with messaging services (e.g., email, Teams, or Slack) to streamline communication and escalation for users seeking to justify exceptions.
6. **Training and Awareness**:
    
    - For this approach to succeed, provide **training and guidelines** to users to make them aware of where sensitive data should be stored and why exceptions require justification.
    - Automated prompts can provide brief educational messages that reinforce good data handling practices whenever a user attempts to move data outside of defined guardrails.

## Example Scenario:

A user attempts to move a file containing financial data to a non-secure network share. The system detects the sensitive data tag and triggers a pop-up informing the user of the policy and asking why they are moving the file. The user submits a justification, and the request is automatically sent to the manager overseeing that group for approval. The system tracks this request, and if granted, the file move is allowed while being logged for audit purposes.

This combination of PBAC, user interaction, and delegated oversight will provide the guardrails you need while allowing for flexible, user-driven workflows that scale as your organization grows.