---
aliases:
  - Purple Team Engagement Strategy
tags:
  - "#infosec"
  - "#risk-management"
  - red-team
  - pentesting
  - purple-team
publish: true
date created: Monday, October 21st 2024, 5:41 pm
date modified: Tuesday, October 22nd 2024, 7:49 pm
---

# Should Collaborative Red Teams Ever Be Secretive to the IS Team?

- I'm honestly not sure yet
- [ ] Should Collaborative Red Teams Ever Be Secretive to the IS Team? 🔽 ➕ 2024-10-22

# Solving the Access Problem in Collaborative Pentest Engagements | Enable Pentester Accounts Without Alerting IT

- **Problem:** During collaborative pentest engagements, giving external testers the necessary network and account access can alert the IT team, defeating the purpose of testing realistic attack scenarios. We need a way to provide secure, controlled access without tipping off internal teams.

- **Solution:** Pre-configure dormant accounts and network permissions that can only be activated when requested by InfoSec and approved by an executive or an approved person in upper management. This ensures the pentesters have the necessary access when needed, while maintaining control, oversight, and operational security.

# Q&A

**You:**

How, as an InfoSec team, do I approach the issue of doing a partly collaborative purple team engagement where I need to whitelist access on the network and whitelist accounts for pentesters when I can't let the IT team know.  

* * *

**ChatGPT:**

For a partly collaborative purple team engagement where you need to provide access without involving the IT team, you can consider the following approach:

### 1. **Engage with Leadership First**

- **Get Approval:** Secure explicit approval from senior management or executives to run the purple team engagement under these conditions. Explain the need for stealth to simulate realistic attack conditions and identify gaps without tipping off IT.
- **Define Boundaries:** Clearly define the scope, including which systems or networks will be in play, and ensure the legal and ethical boundaries are documented.

### 2. **Use a Temporary or Covert Access Setup**

- **Dedicated Accounts:** Set up temporary admin accounts for the pentesters with the required permissions. You can do this yourself or ask someone who has the necessary access and is trusted within the InfoSec team.
- **Whitelisted Network Segments:** Create specific network segments or VLANs that are used solely for the engagement. You can ensure access is restricted to only those segments to minimize detection.
- **Hidden SSID or Isolated Connection:** If using Wi-Fi, consider creating a hidden SSID or an isolated network that can be connected to without alerting IT.

### 3. **Use Stealth Techniques for Whitelisting**

- **DNS or IP Whitelisting:** You can add the pentesters' IPs to the firewall or security solutions (like IDS/IPS, proxy, etc.) in stealth mode without raising too many alerts. It’s easier to implement if you have direct control or delegated access over these systems.
- **Covert Entries in the Directory Services:** Add pentester accounts with specific access rights in a way that they won’t show up in regular user monitoring (e.g., by naming them similar to service accounts or admin accounts).

### 4. **Coordinate Directly with Pentesters**

- **Direct Communication Channels:** Have a secure, direct communication line (e.g., encrypted messaging or dedicated channels) with the pentesters for real-time coordination and feedback.
- **Provide Documentation and Walkthrough:** Share any necessary information or credentials securely and ensure pentesters know exactly where their accounts are whitelisted and the limitations to avoid unintentional exposure.

### 5. **Monitor Without IT Team Awareness**

- **Silent Logging:** Monitor pentester activities discreetly, so you are aware of their actions without triggering broader alerts. Set up your logging to send alerts to InfoSec-specific systems that IT might not oversee.
- **Track Custom Network Routes:** If you’re creating whitelisted paths, ensure you can revert them quickly or have audit logs that record the engagement without revealing too much to IT during the testing phase.

### 6. **Have a Backup and Reversion Plan**

- **Quick Revert Mechanism:** Make sure there is a plan to revert any whitelisted accounts or access changes immediately after the engagement.
- **Secure the Evidence:** Store logs and evidence of the engagement securely, ensuring they can’t be tampered with post-engagement.

### 7. **Plan for Post-Engagement Collaboration**

- **Incident Report & Debriefing:** After the engagement, host a debrief with the IT team to explain the findings, highlight areas of improvement, and discuss any observed behaviors. Since the engagement is partly collaborative, be transparent after the fact to help them improve security posture.

This approach allows you to conduct the purple team engagement realistically, without tipping off the IT team, but it’s crucial to ensure all activities are authorized and within legal bounds to avoid compliance issues.

* * *

**You:**

Ideally, couldn't we have a process where we have accounts set up ahead of time but only some executive can approve it and InfoSec request it

* * *

**ChatGPT:**

Yes, implementing a pre-approved account setup can streamline the process significantly while maintaining control and oversight. Here's how you could design this approach:

### 1. **Pre-Configured, Dormant Accounts**

- **Set Up Ahead of Time:** Create the necessary pentester or admin accounts in advance, ensuring they are configured with appropriate permissions and roles. These accounts would remain dormant (disabled or inactive) until needed.
- **Controlled Naming Conventions:** Use a standardized naming convention that doesn’t draw attention (e.g., using service account patterns) but still allows InfoSec to quickly identify and manage them.

### 2. **Executive-Level Approval Process**

- **Approval Workflow:** Establish a formal, documented process where only specific executives or senior leadership can activate these accounts. This adds a layer of oversight and ensures InfoSec cannot bypass the process without proper authorization.
- **Just-In-Time Activation:** Accounts can be temporarily activated for the duration of the engagement and then deactivated immediately afterward. This can be automated or managed through a secure, monitored process.

### 3. **Integration with Access Management Solutions**

- **Automated Activation/Deactivation:** Use Identity and Access Management (IAM) solutions or Privileged Access Management (PAM) tools to automate this workflow. These tools can handle just-in-time account activation based on requests and executive approvals, ensuring a seamless and secure process.
- **Logging and Audit Trail:** Ensure that every request, activation, and deactivation is logged, creating an audit trail. This will help maintain transparency and accountability, especially in post-engagement reviews.

### 4. **Secure Request Mechanism**

- **Dedicated Request Platform:** Set up a secure, dedicated platform (e.g., a ticketing system integrated with the IAM solution) where InfoSec can request account activation. Requests would go directly to the designated executive(s) for approval, ensuring a controlled process.
- **Multi-Factor Authentication (MFA):** Require MFA for both the executives approving the activation and the pentesters accessing the accounts to add an extra security layer.

### 5. **Post-Engagement Review**

- **Reversion to Dormant State:** Once the engagement concludes, all accounts should revert to their dormant, pre-approved state, ensuring they are not left active unnecessarily.
- **Review and Report:** Conduct a post-engagement review to assess how the accounts were used, any issues that arose, and refine the process if needed. Share this review with executives and InfoSec to reinforce transparency.

By pre-configuring accounts and setting up an executive approval process, you can better control access during engagements, maintain security, and ensure compliance without disrupting ongoing operations or alerting IT unnecessarily.