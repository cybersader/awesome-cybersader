---
date created: Friday, March 22nd 2024, 9:27 am
date modified: Friday, March 22nd 2024, 10:32 am
---

%% Begin Landmark %%
- **[[03 - March BHIS]]**
- **[[03 - March Cyber News]]**
- **[[05 - May Cyber News]]**
- **[[06 - June Cyber News]]**
- **[[07 - July Cyber News]]**
- **[[08 - August Cyber News]]**
- [[US Privacy News]]

%% End Landmark %%

# October

## 10/1/2024

- Passwords and requirements
    - PCI went from 7 to 14, but NIST still only requires 8 -- ugh
    - They are on the right track with 15 characters and only caring about length, but didn't qualify the 8 character requirement to only be a thing for orgs that need it
    - Nothing about dictionary words - lol because it can't be defined easily - but just because it's not easy doesn't mean they shouldn't
    - We can have short and bad words under NIST - case closed - needs refactored
    - https://youtu.be/sluhtC6o7m4?feature=shared&t=2823
    - Teen Vogue had better password guidance than NIST
- CUPS RCE vuln in Linux
    - Not technically installed on many machines by default
    - Let's assumee billions of machines use this
    - You also need CUPS browse-d?
    - CUPS browse-d also someone to register a new printer without authentication
    - Chain this to printer definition
    - You can put a file onto the computer when you register a printer and that can execute a command.  You have to randomly print to the fake evil printer though.  The user has to be coerced.
    - On Debian CUPs doesn't run as root anyone
    - It's a nothing burger
    - There's 75k people with it on Shodan
- 

# September

## 9/17/2024

https://www.youtube.com/watch?v=nxw8Nvp7Pj8

- Fortinet breach for .3% of customer base
    - Diagnostic data?..maybe
    - Hopefully not bad
    - Might be part of fallout from Snowflake
    - Watch dark web for related vulns or talk related to your infrastructure

## 9/24/2024

- Pagers kinetic attack in Israel
    - They were worried about being monitored, so they got pagers
    - Pagers receive broadcasts, then you call the person back
    - It doesn't have to be a payphone, burner, etc.
    - Pagers are not better. You can secure cell phone comms.
    - Cyber people are in the know, but the non-techy people are scared
    - Pagers have reception and ease of use
    - Messages come in like "hey trauma is coming in."
    - Pager networks broadcast the messages
    - Why are they used? - batteries last forever, separate device notifications
- Fake CAPTCHA phishing
    - Convinces user to paste payload to HTA file in their command prompt
- Fake GitHub scanner phish
    - Looks legit by using GitHub infra to send email
- Companies are targeting people looking for jobs by requiring them to download software
- LinkedIn caught making opt-out setting for training AI
    - Companies do this anyway. At least they are saying that they are doing it and allowing you to turn it off
- COPPA, child privacy, and ethics
    - https://www.youtube.com/live/_sCeVWOOt9A?feature=shared&t=2689 
    - We don't have AI or privacy regulation
    - 3 states have AI and privacy governance laws - California, Illinois, and Maryland
    - They are vacuuming up data and we don't know what they're doing with it
    - FTC report - all the big media platforms are feeding children's and adult's data to AI models - despite COPPA being a thing
    - COPPA fines can destroy a company - seemingly
    - 9 companies listed
    - They are concerned because it hurts our goals, creates an anti-competitive environment, creates wall gardens, and it doesn't protect consumers
    - https://www.youtube.com/live/_sCeVWOOt9A?feature=shared&t=2938