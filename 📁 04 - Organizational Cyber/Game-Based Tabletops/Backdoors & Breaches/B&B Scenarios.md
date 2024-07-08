

# First Session
## Theorized Attack Setup

### Omniscient Perspective (Revised Attack Timeline)

---

**Stage 1: Initial Compromise (Credential Stuffing)**

*The attacker gathers a list of email addresses and passwords from previous data breaches. They perform credential stuffing against the company's VPN login portal. Despite MFA being enabled, they focus on user accounts with known weak passwords. After several attempts, they successfully gain access to an account with minimal privileges.*

**Stage 2: Pivot and Escalate (LSASS Credential Dumping via Social Engineering)**

*With access to the compromised account, the attacker uses legitimate remote access software that the organization already uses (e.g., TeamViewer, AnyDesk). They then create a fake issue on the compromised machine, such as a software error or network connectivity problem.*

*Next, the attacker contacts the IT helpdesk or an admin, impersonating the compromised user, and requests assistance with the fake issue. The admin, believing this to be a legitimate request, remotely connects to the compromised machine using RDP to troubleshoot the issue.*

*While the admin is logged into the compromised machine, their credentials are stored in the LSASS process. The attacker uses a tool like Mimikatz to dump these credentials, obtaining high-level admin credentials.*

**Stage 3: Command and Control (C2) and Exfiltration (BITS Disguising)**

*With admin credentials, the attacker sets up a persistent backdoor by creating a hidden scheduled task that communicates with their C2 server using the Windows Background Intelligent Transfer Service (BITS). They begin exfiltrating sensitive data by encoding it and transferring it through the BITS mechanism to avoid detection.*

**Stage 4: Persistence (Spawn Web Shell)**

*To ensure long-term access, the attacker deploys a web shell on a lightly monitored internal web server. This web shell is designed to mimic legitimate traffic and is set up with various backdoor functionalities, allowing the attacker to re-enter the network even if their initial access points are discovered and closed.*

---

### Defender's Introduction

---

"You arrive at your workstation on Monday morning, and everything seems normal at first. However, as you begin your routine checks, you notice some unusual login patterns on the VPN. Multiple failed login attempts were followed by a successful login from an unfamiliar IP address.

You gather your team for an urgent meeting to discuss this anomaly. It could be nothing, or it could be the beginning of a larger issue. Your task is to investigate this incident thoroughly, using all the tools and procedures at your disposal. You'll need to roll the dice to determine the success of your investigative actions, but remember, time is of the essence."

### How it could be detected in a realistic scenario?

**Tools and Techniques:**

- **SIEM (Security Information and Event Management):** To analyze login patterns and identify suspicious activities.
- **Endpoint Detection and Response (EDR):** For detecting and investigating potential malware and unusual behaviors on endpoints.
- **Network Traffic Analysis:** To monitor for unusual outbound connections and data transfers.
- **Log Analysis:** To review server and application logs for signs of tampering or unauthorized access.
- **Memory Forensics:** Using tools like Volatility to analyze memory dumps for traces of credential dumping activities.
- **File Integrity Monitoring (FIM):** To detect unauthorized changes to critical files and directories.
- **Incident Response Playbooks:** Predefined procedures to guide the investigation and response actions.

**Procedures:**

- **Identifying compromised accounts:** Cross-referencing login attempts with known breach lists and analyzing VPN logs.
- **Investigating lateral movement:** Using EDR to trace the steps taken by the attacker post-compromise.
- **Monitoring network traffic:** Using tools like Wireshark to identify unusual C2 communications.
- **Detecting exfiltration:** Analyzing network traffic for small, encrypted data transfers or unusual protocols.
- **Discovering persistence mechanisms:** Scanning for unusual scheduled tasks, services, or added admin accounts.

---

### Explanation of the Attack Steps:

1. **Initial Compromise:**
   - The attacker uses credential stuffing on the VPN login portal to gain initial access.
   - They manage to compromise an account with weak credentials.

2. **Pivot and Escalate:**
   - The attacker uses legitimate remote access software to create a fake issue on the compromised machine.
   - They contact the IT helpdesk/admin, requesting assistance, and the admin logs into the machine via RDP.
   - While the admin is logged in, the attacker uses Mimikatz to dump the admin credentials from the LSASS process.

3. **Command and Control:**
   - The attacker sets up a C2 channel using BITS to disguise their traffic and begin exfiltrating data.

4. **Persistence:**
   - The attacker deploys a web shell on an internal web server to ensure long-term access.

---

By rolling the d20, the defenders simulate the uncertainties and challenges in detecting and responding to the attack. Each successful roll represents a breakthrough in the investigation, bringing them closer to uncovering the full extent of the breach before it's too late.

## Potentials
- Cards
    - Attack Setup
        - Initial Compromise
            - Credential Stuffing
            - Password Spray
            - Vishing
            - Public facing database compromise
        - Pivot
            - Vcenter console coercion
            - Malicious file upload to shared file service
            - Unpatched critical security update
            - Lsass cred dump
        - C2
            - Misuse of Remote Access Software / Authorized Remote Tools
            - GIFs as C2
            - Rotating C2 Server Location
            - HTTPS as Exfil
            - TCP Handshakes as Morse Code
            - Windows Background Intelligent Transfer Service (BITS)
            - DNS as C2
        - Persistence
            - Golden Ticket Attack
            - Malicious Report Macros
            - Spawn Web Shell
            - DLL Attacks
            - Malicious Driver
            - Logon Scripts
            - Application Shimming
            - Malicious Service
            - Malware Injection into Client Software
            - Event Triggered Malware
            
    - Starting Condition Pile
        - Take One Procedure Card Away
        - Cat on Keyboard Deletes Production Database?
        - Honeypots Deployed
        - Legal Takes Your Most Skilled Handler into a Meeting to Explain the Incident
        - Data Uploaded to Pastebin
        - A Little Help From My Friends
        - Security Awareness Training for the Win!
        - Risk Accepted
        - It's a Feature, Not a Bug
        - Communication Infrastructure DDoS
        - Executive Buy-In
        - Crank Up the Pressure
        - Dude, Where's Our Docs?
        - Take One Procedure Card Away
        - Give the Defenders a Random Procedure Card
    - Inject Pile
        - Is it Getting Hot in Here?
        - Bobby the Intern Kills the System You are Reviewing
        - It was a Pentest
        - This Isn't the First Time, and Won't Be the Last
        - Lead Handler has a Baby, Takes FMLA Leave
        - Attackers Timestomp Key Evidence Files
        - Our Friend "Hacky"
        - EDR Compromise?
        - Dangling Domains
        - Back to Basics
        - Alert Fatigue is Real
        - Read to the End
        - Haste Makes Waste
        - Major Failure Alert
        - Cat on Keyboard Deletes Production Database
        - Water, Water Everywhere!
        - Crank Up the Pressure
        - DiscountConsultant.lol
        - Dude, Where's Our Docs?
        - Take One Procedure Card Away
        - Give the Defenders a Random Procedure Card
    - Procedures
        - Established
            - Endpoint Security Protection Analysis
            - Isolation
            - Firewall Log Review
            - Permissions Audit?
        - Other
            - Cyber Deception
            - Permissions Audit
            - Protocol Analysis
            - Endpoint Analysis
            - Server Analysis
            - Call a Consultant
            - Cyber Deception
            - Memory Analysis
            - Crisis Management
            - SIEM Log Analysis
            - Physical Security Review
            - Cloud Event Log Analysis
            - UEBA
                
- Not Included, But Could Draw?
