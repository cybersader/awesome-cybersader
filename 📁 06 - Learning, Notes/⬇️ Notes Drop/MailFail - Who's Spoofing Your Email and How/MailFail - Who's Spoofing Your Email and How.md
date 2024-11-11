
- [MailFail: Who's Spoofing your Email, and How are they Doing it?](https://www.youtube.com/watch?v=UbdMAmsWus8)
- https://github.com/ACK-J/MailFail/

- Jack Hyland - mainly works with web app and API pentesting

- SMTP
    - written in early 80s
    - mail transfer agents and email servers use this to communicate
- STMP Commands - not many
    - HELO/EHLO - start SMTP sessions
    - STARTTLS - starts secure cxn
    - RCPT TO - SMTP to addr
    - Data - email body
- SPF - Sender Policy Framework
    - Allow senders based on their IP
    - email sender's domain is used - makes a DNS query, looks at TXT records, and compares to SPF records
    - SPF Bypass
        - FROM header and SMTP FROM header can be different
        - SMTP FROM can be evil[.]com with a FROM as good[.]com
    - The takeaways
        - SPF ensures that the SMTP FROM domain explicitly allows the connecting IP address
        - SPF does not ensure that the email address seen by the user is the one which is checked
        - The attacker domain will show up in the MAIL FROM, but the user will see the good domain

https://www.youtube.com/live/UbdMAmsWus8?si=ol7FvY6j9SNZX5sJ&t=1483

- DKIM - DomainKeys Identified Mail
    - 