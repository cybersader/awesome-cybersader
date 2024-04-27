# Darknet diaries episode 76

- July 2014 hold security - external Cyber threat intelligence firm
- Found a 4.5 billion credential dump
- They would share weather companies had a credential in the league if they would pay them $120
- Alex Holden was interviewed by Forbes.  There was quite a bit of skepticism
- Breach had been from 420,000 different websites including email credential pairs
- This was a large chunk of the world wide web at the time
- JP Morgan spends hundreds of millions of dollars on cybersecurity alone.
- HAP Morgan analyst read this report from hold security
- Showed that a charity race sponsored by JP Morgan had been breached via the charity website
- The website was hosted by simco data systems
- Turned out Simco was mentioned in the report as well
- Looks like the hackers had stolen an SSL cert and started calling around the network
- JP Morgan started to gather IOCs from the simco bridge and using it to query their own systems for signs of compromise
- They found the same 11 IP addresses

- JP Morgan contacted the FBI and handed this data over to the financial services and information analysis sharing center - they circulate this data to banks and financial institutes
- They weren't sure how the hackers jumped from the charities website into their own servers
- It's possible the hackers attacked simco, the hosting provider, and then tried to attack hosted websites and servers from there
- Maybe they accessed creds from there
- Credential stuff with used passwords likely
- Ultimately the accurate a valid login to a JPMorgan server

- In large companies there's a lot of stale assets and technical debt.  In this case one of the old benefits servers was not updated and this server housed a lot of user data for employees
- The server definitely didn't have 2FA
- Hackers created a back door
- These hackers seem to be APTs - elusive and stealthy exfiltration
- Exported multiple databases used for customer information

- Story became public August 7th 2014
- They said it was the work of Russia
- If the Kremlin was attacking a core financial institution then it would be applicable to national security

- Attackers had stolen 70 million PII from households in 70 million from businesses
- At the time this is about 60% of US households
- 2014 was the same time when Putin decided to take the Crimea peninsula
- US and European Union imposed sanctions at the time to demotivate the attack
- Attack on JP Morgan could have been the first phase of retaliation
- Thanks for that size experience attacks on the daily but this attack was different

- CISO resigned some time before ironically
- New security exec James Cummings was appointed in 2014
- The new security execs had a military background so there could have been some bias when claiming that the attack came from Russia
- The FBI is analysis did not line up with the analysis from Cummings and new CISO rattray
- FBI wasn't convinced that this was a threat to national security or a state sponsored attack
- Looks like they're logging systems had ran out of storage and even though the attack data was captured it wasn't retained for long enough.  This is a common issue for a company this size and it all depends on the risk appetite and how they optimize the storage and infrastructure and how much money they're willing to spend

- Assistant director of FBI had a meeting with multiple executives from JP Morgan including the security related ones
- If this attack was a matter of national security then they were not legally obligated to notify their customers of the breach
- The FBI and JP Morgan reached the truce and handed over all of the day that they had on the attack

- A Bloomberg reporter was the first person to talk about the discrepancy or inconsistency between the FBIs statements and the statements of JP Morgan
- The private sector has more financially motivated attacks whereas the military usually has espionage related attacks
- The secret service was also involved in the investigation
- The secret service threatened to subpoena the attack data

- Hackers purposefully deleted log files that would have left the data necessary to attribute the activities on their network
- The IPs were from various countries
- All the IPs were from various hosting providers
- Timeline analysis showed that the attackers stopped using one server in Egypt after the JP Morgan report came out on the news

- Jason Morgan had not been the only target in multiple financial institutions had been hit
- None of the other companies had officially come forward about the breaches
- Some of the other banks included Fidelity, ADP, HSBC, citigroup, and the Bank of the West
- Some of the banks found poking around and some found evidence of theft
- 13 banks
- Regional lender included
- Regulators and prosecutors were also involved

- 7 months later and JP Morgan was still working on the investigation
- They were calling this investigation the  Rio investigation
- Tech executives and outside experts were brought together to form a control board panel
- Investigate remediate and prevent future attacks
- eBay, Target, and home Depot Auburn hacked within a year of this attack with huge data breaches

- On July 21st in 2015, he Israeli police made two coordinated attacks
- They did this at the request of the FBI
- Two rich guys for arrested for securities fraud
- In 2009 did established a company called WeboLogic Limited for web marketing
- One guy Gary was down as the manager and ziv was not down in the books at all
- 30 employees had reported that ziv was the real guy in charge
- Somehow all this was linked to the JPMorgan attack
- There was evidence of Joshua the third guy walking into the servers that were used for the attacks

- They didn't steal any money!
- The only stole email addresses of bank customers
- There's a number of ways to steal money from a bank from cyberspace.  They could have gone the gift card route, reward points route, or even using money to push a stock price up
- There was all say Florida man attached to the attack

- Turns out the FBI had found Anthony the Florida man right after the JP Morgan attack and were watching him to see if they could find connections to the other hackers
- Anthony was only arrested for coin mx and used to find Gary in Israel
- Joshua moved to Israel because he had been caught defrauding in the US and was banned from all the financial institutions
- Webologic logic was really a cover for a stock fraud outfit
- It wasn't really Russia. It was a bunch of fraudsters

- The lawsuit on them came from the SEC - securities and exchange commission
- 36 20
- Here's some of the indictment. They were buying stock from a South Carolina medical equipment company. Launched a marketing campaign to pump up the stock prices.
- This is the classic pump and dump scheme
- How they did it
    - Forged documents to look like legitimate stock brokers
    - They seek out investment opportunities for clients
    - Three companies equated to about $460,000
    - Altogether they made 3.5 million in a couple of years
- Pump and dump was not the only scheme that they had making money for them
- They found some stock for motors to help them find companies that were good targets for a pump and dump scheme
- IPOs are a long process - lots of auditing
- Gary would find lots of private companies that would be easily and falsely promoted for a pump and dumb scheme. But how could he get these companies to go public?
- Over the years Gary had set up numerous shell companies
- Gary's strategy for turning private into public companies and then pumping and dumping them went like this
    - He would first find companies that were good targets
    - Then he would reverse merge them with one of his publicly traded shell companies
    - He did this under the guise of a hopeful stockbroker just helping companies become public
    - Gary and his friends could set up their stock before these mergers to make it easy for them to exit with money later on
    - Ziv was the ops and IT manager.  He also managed all the brokerage accounts, websites, and more
- The fact that they sold so many emails is connected to their campaign
- A lot of these pump and dumb schemes use email as a medium for spamming
- They wanted to have an accurate list of actual stock market investors but they didn't know how to require such a list.  Traders are always looking for a hot stock.
- The JP Morgan hack was merely to get leads for their marketing campaign
- Bank PII and customer data are great sources to get targets for financial scams, fraud, and other deceptive campaigns

- Gary and ziv ironically were part of a even larger online gambling scam related set of companies including a website called revenue jet and affactive
- The gaming software that was used for these was called rival NRTG
- The casino sites were unreliable for payouts
- Tons of delays and fake security procedures to slow and stop the withdrawal process
- Then after they're 90 days of waiting there would be some excuse like you haven't been here for a few weeks so we can't give you a payout
- The house always wins
- These online casinos crumbled right after the indictments

- The US was still trying to get them extradited for the stock fraud charges
- It was still unclear who conducted the hack against JP Morgan and Chase and all of the other financial institutions
- These guys were market manipulators but not exactly hackers

- Tons of stock brokers we're revealing that their customer data had been compromised
- Even Dow Jones who publishes stock information was hacked.  They only found the theft of contact and payment data and suspected the hackers could have been there for 3 years

- November 10th 2015. The superseding indictment came out for the three individuals
- Altogether this was information for over 100 million customers
- Even a market risk intelligence company was hacked
- 83 million from JP Morgan and Chase
- Schemes were operated through over 75 shell companies
- 200 false identification documents
- 30 false passports from 17 different countries
- New indictment had 23 accounts including computer fraud, hacking, why are fraud, securities fraud, money laundering, identity theft, etc
- hundreds of millions of dollars and they had to launder a lot of it
- There are a few ways that they went about laundering this money
- They started using the same shell companies they'd used for the reverse mergers
- Take invoices from fake transactions over time across all of their shell companies and deposited into banks in cyprus
- Gary had 75 different shell companies

- In 2011 the same year that Gary had started his pump and dump schemes, he created two online payment processing companies - ID pay and two-door
- This was used to deposit into gaming accounts in his casinos
- 84
-