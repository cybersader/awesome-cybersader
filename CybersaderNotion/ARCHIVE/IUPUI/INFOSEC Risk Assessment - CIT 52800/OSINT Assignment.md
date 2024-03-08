# OSINT Assignment

# Some OSINT Facts

- Expertise and Popularity
    - In the recent [2020 Cyber Threat Intelligence Report](https://www.cybersecurity-insiders.com/portfolio/2020-cyber-threat-intelligence-report/), 34% of OSINT practitioners reported that they had no prior experience with OSINT collection and 85% have received little or no training in OSINT techniques and risks. In accordance with this – we at Media Sonar thought it might be helpful to cover some OSINT investigation concepts that are beneficial to keep in mind as you collect open source intelligence.

# OSINT Scope (Legality & Ethics)?

**OSINT** is publicly produced and publicly available data that can be collected and shared without breaking laws or policies.

The main qualifiers to open-source information:

- it does not require any type of clandestine collection techniques to obtain it
- it must be obtained through means that entirely meet the copyright and commercial requirements of the vendors where applicable

## What is Legal?

It’s not just the traditional “Law” that needs to be considered – but even corporate “laws” and policies. In order for OSINT to remain OSINT, [the collection and use of the data need to be legal and legit](https://mediasonar.com/2020/03/11/10-tips-for-doing-osint-legally/https://mediasonar.com/2020/03/11/10-tips-for-doing-osint-legally/).

## OSINT Guidelines from the Department of Justice

1. **It is not illegal to access the Dark Web** for passive research, even illicit forums and markets where criminal activity is discussed or undertaken if there is no criminal intent.
2. **Do review the terms of service** of the site and consider your legal obligations therein.
3. **Do create fake identities**, but do not claim that your fake identity has a special status (such as a government official).
4. **Don’t impersonate someone else** or use someone else’s credentials without their consent.
5. **Don’t exploit a vulnerability** or “hack” to access the data. If your organization does something illegal, your good intentions might not be enough to shield you from prosecution.
6. **Don’t communicate with other persons on the Dark Web** unless your organization has seriously considered how the risks might outweigh the outcome. This will open you up to serious dangers from malicious intent. Don’t be a victim.
7. **Don’t share information** that could be used to commit a crime. Security professionals ought to be very careful when communicating with people on the Dark Web.
8. **Don’t purchase stolen data** that does not belong to you, or tools you know to be illegal. Do not transact with Dark Web cybercriminals, unless your organization has seriously considered the legal implications.
9. **Do keep a record**, such as screen captures, to use as an audit trail in case you end up being investigated for your cybersecurity team’s activity on illicit forums.
10. **Do create detailed organizational guidelines** for cybersecurity intelligence gathering. Take into consideration your own corporate interests, legal obligations, and the terms of service of the sites you are using. Especially for certain types of organizations, it is important to weigh this all against public opinion.

Read the full DOJ report “[Legal Considerations when Gathering Online Cyber Threat Intelligence and Purchasing Data from Illicit Sources](https://www.justice.gov/criminal-ccips/page/file/1252341/download)“

# OSINT Tools & Frameworks

## OSINT Tools & Lists

- [OSINT Framework](https://osintframework.com/)
- [GitHub - jivoi/awesome-osint: A curated list of amazingly awesome OSINT](https://github.com/jivoi/awesome-osint)
- [https://osint.link](https://osint.link/?__cf_chl_jschl_tk__=pmd_CEaiWyUzVy52D1DJcLEvkmUzPgNNIqTDN7zqDJpJnsQ-1629737832-0-gqNtZGzNAdCjcnBszQhl)
- [Top 10 OSINT (Open Source Intelligence) Software & Tools | SEON](https://seon.io/resources/the-best-tools-for-osint/)
- Recon-ng
- https://github.com/lorien/awesome-osint
- https://github.com/priyankvadaliya/AwsomeOSINT
- Youtube - [https://www.youtube.com/watch?v=xHBDRIRH-FY](https://www.youtube.com/watch?v=xHBDRIRH-FY)
    
    ![Untitled](OSINT%20Assignment/Untitled.png)
    

# KAR Investigation

## Information from karglobal.com

- Is it public?
    - [https://www.investopedia.com/terms/p/publiccompany.asp](https://www.investopedia.com/terms/p/publiccompany.asp)
    - [https://www.investopedia.com/ask/answers/08/how-to-find-out-what-indexes-a-company-is-on.asp](https://www.investopedia.com/ask/answers/08/how-to-find-out-what-indexes-a-company-is-on.asp)
    - Just type it up on Google
        
        ![Untitled](OSINT%20Assignment/Untitled%201.png)
        
- Finding Business Units
    - [https://www.sec.gov/edgar/search/#/q=KAR%2520Global](https://www.sec.gov/edgar/search/#/q=KAR%2520Global)
    - They are under “KAR Auction Services” a lot
    - Tried searching up Business Unit
        
        ![Untitled](OSINT%20Assignment/Untitled%202.png)
        
    - Searched up Subsidiary
        - [https://www.sec.gov/edgar/search/#/q=Subsidiary&dateRange=1y&category=form-cat1&locationCode=IN&entityName=KAR%2520Auction%2520Services](https://www.sec.gov/edgar/search/#/q=Subsidiary&dateRange=1y&category=form-cat1&locationCode=IN&entityName=KAR%2520Auction%2520Services)
        - 10-K form
            
            ![Untitled](OSINT%20Assignment/Untitled%203.png)
            
        - more search
            
            ![Untitled](OSINT%20Assignment/Untitled%204.png)
            
- Investor Relations on their website - [https://ir.karglobal.com/investor-relations/financials/financial-reports/default.aspx](https://ir.karglobal.com/investor-relations/financials/financial-reports/default.aspx)
    - All of their Financial Reports
        
        ![Untitled](OSINT%20Assignment/Untitled%205.png)
        
- KAR Global Brands
    - Business Units or Subsidiaries
        
        ![Untitled](OSINT%20Assignment/Untitled%206.png)
        
- 

## Company Research

- Public vs Private
- Business Units vs Subsidiaries
    - Share ownership
        - A "share" of a company is a certain amount of ownership that investors and business owners can buy, sell or trade on the stock exchange. A business unit is an independent entity of a parent company with its own shares. One of the primary differences between a subsidiary and a business unit is the share ownership of each. In a subsidiary, the parent company typically owns a majority of the company's shares on the stock exchange. This gives the company more control over business operations.
- Finding out if it is publicly traded / public company
    - [https://www.marketwatch.com/](https://www.marketwatch.com/)
    - Google
- Finding Company Subsidiaries or Business Units
    - [http://orbisdirectory.bvdinfo.com/version-20161014/OrbisDirectory/Companies](http://orbisdirectory.bvdinfo.com/version-20161014/OrbisDirectory/Companies)
    - Capital IQ
    - Nexis Dossier
    - Data Axle Reference Solutions
    - Osiris
    - Refinitiv Workspace
    - [https://www.sec.gov/edgar/search/](https://www.sec.gov/edgar/search/)
- Company and Financial Documents (if public)
    - [https://www.sec.gov/edgar/search/](https://www.sec.gov/edgar/search/)

# Aggregate Websites of BUs/Subsidiaries

## Domain from Company Name Tools

- Terms
    - bulk company name-to-domain
    - bulk company name-to-URL
- Paid
    - [https://clearbit.com/platform](https://clearbit.com/platform)
    - [https://www.marcomrobot.com/blog/how-to-find-website-url-from-company-name-in-bulk](https://www.marcomrobot.com/blog/how-to-find-website-url-from-company-name-in-bulk)
    - [https://companyurlfinder.com/](https://companyurlfinder.com/)
- Free
    - [https://medium.com/the-red-fish/automate-finding-a-company-url-with-a-company-name-on-google-sheets-for-free-in-3-easy-steps-7ea77280bcdc](https://medium.com/the-red-fish/automate-finding-a-company-url-with-a-company-name-on-google-sheets-for-free-in-3-easy-steps-7ea77280bcdc)
    - https://github.com/twistedgitbox/CompanyNames2URL_CSVs_Clearbit
    - [https://open.blockspring.com/lists/browse/enr01CJQ1MD3FCZC0HXN9M3W8CQZC](https://open.blockspring.com/lists/browse/enr01CJQ1MD3FCZC0HXN9M3W8CQZC)
        - Put down the list of companies and business units from previous steps.  Then, I imported that list into the tool
            
            ![Untitled](OSINT%20Assignment/Untitled%207.png)
            
            - Gives me a relatively good list except for Openlane
                
                ![Untitled](OSINT%20Assignment/Untitled%208.png)
                

## Domain & Subdomain Enumeration/Discovery Tools

- [https://owasp.org/www-project-amass/](https://owasp.org/www-project-amass/)
    - [https://owasp-amass.com/](https://owasp-amass.com/)
    - https://github.com/OWASP/Amass
- [https://sidxparab.gitbook.io/subdomain-enumeration-guide/introduction/whats-the-need](https://sidxparab.gitbook.io/subdomain-enumeration-guide/introduction/whats-the-need)
- [https://pentester.land/cheatsheets/2018/11/14/subdomains-enumeration-cheatsheet.html](https://pentester.land/cheatsheets/2018/11/14/subdomains-enumeration-cheatsheet.html)
- [https://0xffsec.com/handbook/information-gathering/subdomain-enumeration/#brute-force-enumeration](https://0xffsec.com/handbook/information-gathering/subdomain-enumeration/#brute-force-enumeration)
- https://github.com/Sab0tag3d/Jesus-s-domains-enumeration
- [https://securitytrails.com/blog/subdomain-enum-script](https://securitytrails.com/blog/subdomain-enum-script)
- [https://www.nmmapper.com/sys/tools/subdomainfinder/](https://www.nmmapper.com/sys/tools/subdomainfinder/)
- [https://geekflare.com/find-subdomains/](https://geekflare.com/find-subdomains/)
- https://github.com/projectdiscovery/subfinder

## Backlinks?

- [https://www.openlinkprofiler.org/](https://www.openlinkprofiler.org/)

## Sub-domain

- [https://intelx.io/](https://intelx.io/)
    - helped automatically pull results from a few sites about the domain (karglobal.com)
- Sub-Domains and Technology Lookups
    - My own tool - https://github.com/cybersader/WebsiteTechMiner-py

# Location

## Address

[11299 N Illinois StreetCarmel, IN 46032](https://goo.gl/maps/JCTzUfbYqQEMvrh16)

![Untitled](OSINT%20Assignment/Untitled%209.png)

## LAT LONG

39.9498580503456, -86.15990771754674

![Untitled](OSINT%20Assignment/Untitled%2010.png)

# Wifi

[https://wigle.net/](https://wigle.net/) 

- Some Statistics on Encryption and traffic
    
    ![Untitled](OSINT%20Assignment/Untitled%2011.png)
    
- Some guest wifi networks and other networks can definitely be viewed from the street.  Maybe potentially from across the street
    
    ![Untitled](OSINT%20Assignment/Untitled%2012.png)
    

# Reverse Whois Lookup

[https://viewdns.info/reversewhois](https://viewdns.info/reversewhois) 

- Gives you all publicly known domains registered by a particular email.

![Untitled](OSINT%20Assignment/Untitled%2013.png)

# Bulk Sub-Domain Enumeration & Technology Profiling

[https://github.com/cybersader/WebsiteTechMiner-py](https://github.com/cybersader/WebsiteTechMiner-py)

![Untitled](OSINT%20Assignment/Untitled%2014.png)

# Aggregating Domains

- Using Power Query we can aggregate all of the data we have and get rid of duplicates

![Untitled](OSINT%20Assignment/Untitled%2015.png)

# Bulk Domain Lookup, Domain → IP

Enhanced Bulk Domain NS, MX and A record lookup tool

[https://www.dnsissue.com/bulkdnslookup.php](https://www.dnsissue.com/bulkdnslookup.php) 

[https://www.bulkseotools.com/bulk-check-nameserver.php](https://www.bulkseotools.com/bulk-check-nameserver.php)  

[https://www.domainiq.com/bulk_dns](https://www.domainiq.com/bulk_dns)  

[https://mxtoolbox.com/BulkLookup.aspx](https://mxtoolbox.com/BulkLookup.aspx) 

Bulk nslookup

[https://github.com/laramies/theHarvester](https://github.com/laramies/theHarvester) 

[https://github.com/blechschmidt/massdns](https://github.com/blechschmidt/massdns)  

[https://www.bulkseotools.com/bulk-domain-to-location.php](https://www.bulkseotools.com/bulk-domain-to-location.php) 

[https://www.scrapebox.com/bulk-domain-resolver](https://www.scrapebox.com/bulk-domain-resolver) 

- [Bulk SPF lookup - Public tools - Wux](https://www.wuxwebtools.com/bulk-spf-lookup)
- [Bulk Lookup Tool - Bulk IP and Domain Lookup Tool - MxToolBox](https://mxtoolbox.com/BulkLookup.aspx?id=5ddcec57-b97b-42a9-8f01-f598f4f4e746)
- [Reverse DNS Lookup Online Tool | HackerTarget.com](https://hackertarget.com/reverse-dns-lookup/)
- [Domain to IP. Find Location of Websites or Domains | Bulk Seo Tools](https://www.bulkseotools.com/bulk-domain-to-location.php)
- [domaintoipconverter.com | 524: A timeout occurred](https://domaintoipconverter.com/index.php)
- [Bulk Domain Resolver - ScrapeBox](https://www.scrapebox.com/bulk-domain-resolver)
- [Free nslookup tool for Windows with GUI – DNSDataView – 4sysops](https://4sysops.com/archives/free-nslookup-tool-for-windows-with-gui-dnsdataview/)
- [DNS Tools - Best DNS lookup tools for Windows, Linux and Mac](https://dnspropagation.net/dns-tools/#WindowsDNSTools)
- [EzTK, The easiest toolkits. Product EzDig](http://www.eztk.com/products/ezdig.php)
- [Dig Dns Gui Tool](https://stanublofi1985.mystrikingly.com/blog/dig-dns-gui-tool)
- [RedDirtBits/PyLookupGUI: This is a simple implementation of nslookup up in a Python based GUI using PySimpleGUI](https://github.com/RedDirtBits/PyLookupGUI)
- [DNSLookupView is a free DNS Lookup Tool for Windows computers](https://www.thewindowsclub.com/dnslookupview-is-a-free-dns-lookup-tool)
- [DNS Lookup Viewer for Windows 10](https://www.nirsoft.net/utils/dns_lookup_view.html)
- https://github.com/RedDirtBits/PyLookupGUI
- Most of these seem to be limited to 500 domains per each call
- Unless you want to pay money, you will have to break it up into pieces

![Untitled](OSINT%20Assignment/Untitled%2016.png)

![Untitled](OSINT%20Assignment/Untitled%2017.png)