---
publish: true
---
# Darknet diaries EP 52

- Gas pump skimmers are really common because they're out from the open whereas store clerk once are more uncommon to see because somebody's usually watching them
- The credit card data is called track data
- This is almost always done in regions since they have to physically retrieve them
- Safe to buy credit card writers and a bunch of blank credit cards too
- They sometimes like to be strategically away from fed HQs and locations
- They usually immediately buy gift cards or some sort of digital currency that can easily be liquidated

- Website crawling is not just using something like wget usually it's custom JavaScript and crazy infrastructure to spin it up and down usually also crawling the dark web then feeding all of this data into various databases that clients can use
- Find out if malicious websites and dark web markets try to hide credit card numbers and office skate them and chats to make it harder for detection engines #todo
- Timeline analysis related to malware and malicious web pages in dark web pages is useful

- Online store software is a Target for exploitation when it comes to scraping credit card and other payment card info
- E-commerce software is a huge Target for zero days
- Sell canary payment cards as a service.  Would have to be combined with alias or fake personal info
- Supply chain attacks with js snippets on e-commerce software
- Common technique is to take advantage of integration features in these e-comerce platforms by going to sections like Google analytics code and automatically adding it to the footer when really it isn't tied to that integration..it's their custom code
- Supply chain attacks with live chat features
- They have to be in the network for awhile to find injection points
- When you have huge data breach sets of credit cards and other payment card info try to look for a pattern of software where they have been used by looking at the places where they bought things and what software that uses online
- #Business Idea make a company that stores a database that matches websites to their payment software based on the e-commerce store that use etc
- Don't run external third parties or ads on checkout page
- How liable are payment card companies when websites have these sorts of breaches who's to blame, how does the investigation play out, and how does the public see this, and how does the data breach notification play out.

- Mage.php and mage cart and Magento are all from about 2015
- They have code that looks for specific types of field names so you could obfuscate the field names but this does not prevent attacks that are targeted to specific platforms and account for this
- Sometimes they'll be loading content from an SG bucket into the website automatically and these S3 buckets aren't secured so they get injected with malware

- British airways breach from webbskimming
- 380,000 affected customers
- They mentioned if you used the mobile app or ba.com to make a booking change then you may be affected
- They had web crawlers looking at the websites for years so they could tell what code may have done this without British airways mentioning it
- They would modify a common JS file that's used to make the browser work on multiple platforms and they would only modify it for a period of time.  They would send all of the data that they could and then scrub through it later
- Most financial institutions that have a lot of stolen credit cards or payment cards will look for a common point of purchase and then report it to that group
- The ICO is the FTC equivalent of Britain

- After looking at a web skimming related breach we can crawl the internet for that same type of web skimming code and flow and try to notify companies
- Check out processes on the website of things should be audited annually or periodically in some fashion - not to mention rigorously
- One web detection defense that could be useful is to take the value locations of certain elements related to payment card information and be cognizant of what is looking at those values in code so there should be checks to see everything in JavaScript code when a website loads that could be looking at it
- Another large scale detection for web skimming sources would be to use canary credit cards or payment cards and automate using them on websites and as long as the code that is doing the web skimming tries to pull from it and it will be detected to some degree later on but with a different source of payment or use

- Dark web market selling payment cards
- Dark web sellers have to notify where the cards came from and where they're valid so that people can assess the risk of using them in certain places
- Also usually selling by validity rate
- Validity rate normally drops by at least 5%
- Payment cards can be sampled usually from dark web breaches and validated against hashed lists of the payment cards
- Secret service does financial fraud investigations
- Magecart for is a very sophisticated group
- Sometimes taking down their infrastructure can be super effective because this infrastructure is used to receive the cards
- They also take over domains which is supported by some of the big registrars.  They implement DNS sinkholes with technology like Shadow server where they get notified every time someone is redirected
- They had a really nice trick to track back to the domains and then also check the IP space for other malicious infrastructure
- Bullet proof hosters
- Their company is called risk IQ
- They have a UI that you can get access to data sets from. That's what they sell to companies
- Config tracking
- Don't use too many small websites as a consumer or rely on know 3rd part payment card integration
- Software research integrity - checksums for libraries
- Separate payment from website with something like iframe sandboxing
- Csp headers to define where data can come from and go to.  This would make web skimming hard by giving access control for remote website call outs. Csp headers can be hard with ads.
-