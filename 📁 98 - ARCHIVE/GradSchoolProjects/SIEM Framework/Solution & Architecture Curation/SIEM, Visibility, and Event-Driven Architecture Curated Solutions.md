# SIEM Components, Features, Constraints
- Data models, compatibility, or normalization approaches and/or logic
- Query language/syntax, building analytics?
	- Sigma rules?
- Infrastructure model and approach?
- Detection Engineering
	- Machine Learning and AI 
		- Anomaly Detection Models
		- Types of functions
		- Correlation
	- Community Marketplace / Database for Queries/Detections
# Curated Solutions
## Research & Consulting
- SIEM Matrices
	- ![](../../__attachments/SIEM%20Framework/Solution%20&%20Architecture%20Curation/IMG-20231108213438736.png)
## Curated Lists
- [[SOAR)" awesome list.](SOAR)"%20awesome%20list.](https://github.com/correlatedsecurity/Awesome-SOAR) 
- https://github.com/meirwah/awesome-incident-response#playbooks 
- https://github.com/Correia-jpv/fucking-awesome-incident-response#playbooks 
- https://github.com/cyb3rxp/awesome-soc/blob/main/README.md 
- https://github.com/cyb3rxp/awesome-soc/blob/main/threat_intelligence.md 
- https://github.com/academic/awesome-datascience#miscellaneous-tools 
- https://github.com/academic/awesome-datascience#visualization-tools 
- https://github.com/igorbarinov/awesome-data-engineering#databases 
- https://github.com/igorbarinov/awesome-data-engineering#data-ingestion 
- https://github.com/igorbarinov/awesome-data-engineering#workflow 
- https://github.com/igorbarinov/awesome-data-engineering#data-lake-management 
- https://github.com/igorbarinov/awesome-data-engineering#elk-elastic-logstash-kibana 
- https://github.com/newTendermint/awesome-bigdata#data-ingestion 
- https://github.com/newTendermint/awesome-bigdata#data-visualization 
- https://github.com/0x4D31/awesome-threat-detection#detection-alerting-and-automation-platforms
- https://github.com/LetsDefend/awesome-soc-analyst#network-devices-logs 
- https://github.com/pawl/awesome-etl 
## Acronyms
- SIEM - aggregating data and doing analysis
- SOAR - logic to react to analysis (integrates with SIEM)
	- SOAR tools are a combination of threat intelligence platforms, Security Incident Response Platforms (SIRP) and Security Orchestration and Automation (SOA).
- SIRP - security incident response platform
- TIP - threat intel platform
## Security-Focused Analytics Platforms (SIEM, SIRP)
### search terms
- .
### Open-Source
- [Matano - (SIEM alternative) for threat hunting, detection & response, and cybersecurity analytics at petabyte scale on AWS](https://github.com/matanolabs/matano) 
- [TheHive Project](http://thehive-project.org/) 
	- [Microsoft Azure Marketplace](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/azuresentinel.azure-sentinel-solution-thehive?tab=Overview) 
- Graylog- User-friendly interface and powerful log management and analysis features. It offers easy log centralization, analysis, and alerting capabilities. : https://graylog.org/
- Wazuh- Security monitoring platform that combines intrusion detection, vulnerability detection, and log analysis. It integrates with the ELK Stack and offers real-time threat detection : https://wazuh.com/
	- [GitHub - wazuh/wazuh: Wazuh - The Open Source Security Platform. Unified XDR and SIEM protection for endpoints and cloud workloads.](https://github.com/wazuh/wazuh) 
	- [Linode Hosting - Wazuh Infrastructure Security Analytics Application | Akamai](https://www.linode.com/marketplace/apps/linode/wazuh/)
- Security Onion- Network security monitoring, intrusion detection, and log management. It incorporates tools like Suricata, Zeek (formerly Bro), and Elasticsearch. : https://securityonionsolutions.com/ 
	- [Microsoft Azure Marketplace](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/securityonionsolutions.securityonion?tab=Overview) 
- [Enhance Security with OSSIM | AT&T Cybersecurity](https://cybersecurity.att.com/products/ossim)
- [UTMStack | Open Source SIEM, XDR and Compliance Solution](https://utmstack.com/) 
### Proprietary
- [Pricing | Blumira](https://www.blumira.com/pricing/)
	- [Microsoft Azure Marketplace](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/blumirainc1649268714103.blumira-detection-response?tab=Overview) 
- [Gurucul | Global Leader in Advanced Cybersecurity Solutions](https://gurucul.com/?utm_adgroup=%7Badgroup%7D&utm_term=gurucul) 
- [Microsoft Sentinel - Cloud SIEM Solution | Microsoft Security](https://www.microsoft.com/en-us/security/business/siem-and-xdr/microsoft-sentinel)
- [Chronicle SIEM | Google Cloud](https://cloud.google.com/chronicle-siem) 
- [Dynatrace | Modern cloud done right](https://www.dynatrace.com/) 
- [Cloud Log Management, Monitoring, SIEM Tools | Sumo Logic](https://www.sumologic.com/) 
	- [Sumo Logic - Add-ons - Heroku Elements](https://elements.heroku.com/addons/sumologic) 
- [Securonix: Security Analytics at Cloud Scale](https://www.securonix.com/) 
- [Exabeam SIEM - Exabeam](https://www.exabeam.com/product/siem/) 
- [FortiSIEM | SIEM Solutions & Tools | Get Best Enterprise SIEM Software](https://www.fortinet.com/products/siem/fortisiem) 
	- [Microsoft Azure Marketplace](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/fortinet.fortinet-fortisiem?tab=Overview)
- [QRadar | IBM Security SIEM](https://www.ibm.com/products/qradar-siem) 
	- [Microsoft Azure Marketplace](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/ibm-usa-ny-armonk-hq-6275750-ibmcloud-asperia.ibm-security-qradar-siem?tab=Overview)
- [Elastic SIEM | SIEM & Security Analytics | Elastic Security](https://www.elastic.co/security/siem)
	- [ELK Blueprint | DigitalOcean Marketplace 1-Click App](https://marketplace.digitalocean.com/apps/elk-blueprint)
- [LogSentinel SIEM and XDR | Next-gen cloud-first | Affordable for SMEs](https://logsentinel.com/) 
	- [Microsoft Azure Marketplace](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/logsentinel.logsentinel-siem?tab=Overview) 
- [Arcsight - Security Information and Event Management Tool | SIEM Software | CyberRes](https://www.microfocus.com/en-us/cyberres/secops/arcsight-esm) 
- [Devo: Cloud-Native Integrated SIEM | SOAR | UEBA | AI Solution](https://www.devo.com/)
- [Hunters SOC Platform: SIEM Alternative | Automate Detection & Response](https://www.hunters.security/) 
- [Comodo NxSIEM | Security Information and Event](https://www.nxsiem.com/) 
- [Intelligent Security Operations Platform (ISOP) | NSFOCUS](https://nsfocusglobal.com/products/intelligent-security-operations-platform-isop/)
- [LogRhythm SIEM Security & SOC Services | Cloud & Self-Hosted](https://logrhythm.com/) 
- [Trellix | Revolutionary Threat Detection and Response](https://www.trellix.com/en-sg/)
- [Security Analytics | Datadog](https://www.datadoghq.com/solutions/security-analytics/) 
- [Splunk | The Key to Enterprise Resilience](https://www.splunk.com/) 
- [Logz.io: Cloud Observability & Security Powered by Open Source](https://logz.io/)
	- [Microsoft Azure Marketplace](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/logz.logzio-elk-as-a-service-pro?tab=Overview) 

## Security-Focused Data Engineering
### Security Data Lakes
- [Matano | Cloud native SIEM](https://matanosecurity.com/) 
- [The Average SIEM Deployment Costs $18M Annually…Clearly, Its time for a change! | by Dan Schoenbaum | Medium](https://schoenbaum.medium.com/the-average-siem-deployment-costs-18m-annually-cf576f6c740d)
	- Security-driven data can be dimensional, dynamic, and heterogeneous, thus, data warehouse solutions are less effective in delivering the agility and performance users need.
	- A data lake is considered a subset of a data warehouse, however, in terms of flexibility, it is a major evolution. The data lake is more flexible and supports unstructured and semi-structured data, in its native format and can include log files, feeds, tables, text files, system logs, and more.
	- For example, .03 cents per/GB/per month if in an S3 bucket. This capability makes the data lake the penultimate evolution of the SIEM.
* [Why Your Security Data Lake Project Will SUCCEED! | by Omer Singer | Medium](https://osinger.medium.com/why-your-security-data-lake-project-will-succeed-3f6484d17b3)
	* It turned out that security teams didn’t have time for a science project like Apache Spot or Metron.
	* The Hadoop data lake was causing enough headaches for the core business units that depended on it, and security had alternatives available in purpose-built SIEM and log management systems.
	* Apache Spot
	* One reason why they are being chosen over legacy incumbents in the SIEM market is that these providers don’t have to spend precious cycles developing and maintaining their data backend.
* [Security Operations on the Data Lakehouse: Hunters SOC Platform is now available for Databricks customers | Databricks Blog](https://www.databricks.com/blog/2023/03/29/security-operations-data-lakehouse-hunters-soc-platform-now-available.html)
* [What is a Medallion Architecture?](https://www.databricks.com/glossary/medallion-architecture)
* [Why Security Teams Are Adopting Security Data Lakes As Part Of A SIEM Strategy](https://www.hunters.security/en/blog/security-data-lake-snowflake-siem)
* [What is a SIEM-less Architecture | Anvilogic](https://www.anvilogic.com/solutions/siem-less)
* [Why Your Security Data Lake Project Will SUCCEED! | by Omer Singer | Medium](https://osinger.medium.com/why-your-security-data-lake-project-will-succeed-3f6484d17b3)
* [Connected Apps | Missing Layer in the Modern Data Stack | by Arunim Samat | Medium](https://medium.com/@arunim_98451/connected-apps-missing-layer-in-the-modern-data-stack-70a69abb7d68)
* [Modernizing Enterprise SOC’s: Anvilogic’s Automated Detection Engineering On Snowflake Security Data Lake Using Generative AI | by Ravi Kumar | Medium](https://medium.com/@ravikuma2003/modernizing-enterprise-socs-anvilogic-s-automated-detection-engineering-on-snowflake-security-d26461aa1747)
* [Security Data Lake | Gurucul Scalable Architecture](https://gurucul.com/products/security-data-lake)
* [Security Risk Advisors - Security Data Pipeline Modernization](https://sra.io/security-data-pipeline-modernization/)
* [Improve SOC Efficiency with Cribl Observability Pipelines in Cloud-Native SIEM - Exabeam](https://www.exabeam.com/security-operations-center/revolutionizing-soc-efficiency-cribl-observability-pipelines-in-cloud-native-siem/) 
* [What a Robust Security Data Pipeline is Critical in 2023](https://cribl.io/blog/why-a-robust-observability-pipeline-is-critical-for-security-professionals/) 
* [Security Operations on the Data Lakehouse: Hunters SOC Platform is now available for Databricks customers | Databricks Blog](https://www.databricks.com/blog/2023/03/29/security-operations-data-lakehouse-hunters-soc-platform-now-available.html) 
* [What is a Medallion Architecture?](https://www.databricks.com/glossary/medallion-architecture) 
* [Why Security Teams Are Adopting Security Data Lakes As Part Of A SIEM Strategy](https://www.hunters.security/en/blog/security-data-lake-snowflake-siem)
* [What is a SIEM-less Architecture | Anvilogic](https://www.anvilogic.com/solutions/siem-less)
* [Connected Apps | Missing Layer in the Modern Data Stack | by Arunim Samat | Medium](https://medium.com/@arunim_98451/connected-apps-missing-layer-in-the-modern-data-stack-70a69abb7d68) 
* [Modernizing Enterprise SOC’s: Anvilogic’s Automated Detection Engineering On Snowflake Security Data Lake Using Generative AI | by Ravi Kumar | Medium](https://medium.com/@ravikuma2003/modernizing-enterprise-socs-anvilogic-s-automated-detection-engineering-on-snowflake-security-d26461aa1747) 
* [Security Data Lake | Gurucul Scalable Architecture](https://gurucul.com/products/security-data-lake) 
* [circulate.dev/blog/security-logs-and-asset-data-in-2023-pt1-the-foundation](https://www.circulate.dev/blog/security-logs-and-asset-data-in-2023-pt1-the-foundation) 
- [Why Security Teams Are Adopting Security Data Lakes As Part Of A SIEM Strategy](https://www.hunters.security/en/blog/security-data-lake-snowflake-siem)
- [The Average SIEM Deployment Costs $18M Annually…Clearly, Its time for a change! | by Dan Schoenbaum | Medium](https://schoenbaum.medium.com/the-average-siem-deployment-costs-18m-annually-cf576f6c740d)
	- Security-driven data can be dimensional, dynamic, and heterogeneous, thus, data warehouse solutions are less effective in delivering the agility and performance users need. A data lake is considered a subset of a data warehouse, however, in terms of flexibility, it is a major evolution. The data lake is more flexible and supports unstructured and semi-structured data, in its native format and can include log files, feeds, tables, text files, system logs, and more. You can stream all of your security data, none is turned away, and everything will be retained. This can easily be made accessible to a security team at a low cost. For example, .03 cents per/GB/per month if in an S3 bucket. This capability makes the data lake the penultimate evolution of the SIEM.
	- The value of the process is to compare newly observed behavior with historical trends, sometimes comparing to datasets spanning 10 years. This would be cost-prohibitive in a traditional SIEM.
	- Interesting companies to power your security data lake:
		- If you are planning on deploying a security data lake or already have, here are **three cutting edge companies** you should know about. I am not an employee of any of these companies, but I am very familiar with them and believe that each will change our industry in a very meaningful way and can transform your own security data lake initiative.
		- 1. [**Panther:**](https://schoenbaum.medium.com/proxy?q=http%3A%2F%2Fwww.panther.com)Snowflake is a wildly popular data platform primarily focused on mid-market to enterprise departmental use. It was not a SIEM and had no security capabilities. Along came engineers from AWS and Airbnb who created Panther, a platform for threat detection and investigations. The company recently connected Panther with Snowflake and is able to join data between the two platforms to make Snowflake a “next-generation SIEM” or — perhaps better positioning — evolve Snowflake into a highly-performing, cost-effective, security data lake. It is still a newer solution, but it’s a cool idea with a lot of promise and has been replacing Splunk implementations at companies like Dropbox and others at an impressive clip. If you want to get a sense for what the future will look like, [you can even try it for free here.](https://schoenbaum.medium.com/proxy?q=https%3A%2F%2Fpanther.com%2Ffree-trial%2F)
		- 2. [**Team Cymru**](https://schoenbaum.medium.com/proxy?q=https%3A%2F%2Fteam-cymru.com%2F) is the most powerful security company you have yet to hear of. They have assembled a global network of sensors that “listen” to IP-based traffic on the internet as it passes through ISP’s and can “see” and therefore know more than anyone in a typical SOC. They have built the company by selling this data to large, public security companies such as Crowdstrike, [FireEye](https://schoenbaum.medium.com/proxy?q=https%3A%2F%2Fwww.fireeye.com%2Fmandiant%2Fthreat-intelligence%2Fthreat-intelligence-subscriptions.html), [Microsoft](https://schoenbaum.medium.com/proxy?q=https%3A%2F%2Fwww.microsoft.com%2Fen-us%2Fsecurity%2Fbusiness%2Fsolutions), and now Palo Alto Networks, with their acquisition of [Expanse, which they snapped up for a cool $800M](https://schoenbaum.medium.com/proxy?q=https%3A%2F%2Fwww.cnbc.com%2F2020%2F11%2F16%2Fpalo-alto-networks-ceo-new-acquisition-provides-security-from-hackers-view.html). In addition, cutting-edge SOC teams at JPMC and Walmart are embracing Cymru’s telemetry data feed. Now you can get access to this same data, you will want their 50+ data types and 10+ years of intelligence inside of your data lake to help your team to better identify adversaries and bad actors based on certain traits such as IP or other signatures.
		1. [**Varada.io**:](https://schoenbaum.medium.com/proxy?q=http%3A%2F%2Fwww.varada.io) The entire value of a security data lake is easy, rapid, and unfettered access to vast amounts of information. It eliminates the need to move and duplicate data and offers the agility and flexibility users demand. As data lakes grow, queries become slower and require extensive data-ops to meet business requirements. Cloud storage may be cheap, but compute becomes very expensive quickly as query engines are most often based on full scans. Varada solved this problem by indexing and virtualizing all critical data in any dimension. Data is kept closer to the SOC — on SSD volumes — in its granular form so that data consumers can leverage the ultimate flexibility in running any query whenever they need. The benefit is a query response time up to 100x faster at a much cheaper rate by avoiding time-consuming full scans. This enables workloads such as the search for attack indicators, post-incident investigation, integrity monitoring, and threat-hunting. Varada was so innovative that data vendor [Starburst](https://schoenbaum.medium.com/proxy?q=http%3A%2F%2Fwww.starburst.io) recently acquired them.
	- The Security Data lake, while not a simple, “off the shelf” approach, centralizes all of your critical threat and event data in a large, central repository with simple access. It can still leverage an existing SIEM, which may leverage correlation, machine learning algorithms and even AI to detect fraud by evaluating patterns and then triggering alerts. However configured, the security data lake is an exciting step you should be considering, along with the three innovative companies I mentioned in this article.
	- 

### Security Data Pipelines
- [Tenzir's security data pipeline platform optimizes SIEM, cloud, and data costs - Help Net Security](https://www.helpnetsecurity.com/2023/08/09/tenzir-security-data-pipeline-platform/)
	- collection, shaping, enrichment, and routing of data between any security and data technology using a rich set of data types and security-native operators purpose-built for security use cases
* [Tenzir | Open Source Data Pipelines for Security Teams](https://tenzir.com/) 
* [Why you need Data Engineering Pipelines before an enterprise SIEM | by Alex Teixeira | Oct, 2023 | Detect FYI](https://detect.fyi/why-you-need-data-engineering-pipelines-before-an-enterprise-siem-0be553584aa9)
	* Content engineering and detection engineering
	* Benefits: log viz, data quality, data collab, routing.
* [What a Robust Security Data Pipeline is Critical in 2023](https://cribl.io/blog/why-a-robust-observability-pipeline-is-critical-for-security-professionals/) 
* [Launch YC: Tarsal: Data pipeline built for modern security teams | Y Combinator](https://www.ycombinator.com/launches/IU6-tarsal-data-pipeline-built-for-modern-security-teams) 
	* [Tarsal - #1 Security Data Platform](https://www.tarsal.co/) 
* [Telemetry Data Pipeline & Log Analysis Solutions | Mezmo](https://www.mezmo.com/)
## Innovative, Unorthodox Visibility and Analysis (not marketed for security)
### search terms
- General Data Engineering, Storage, Analytics, Visualization?
	- multi-language, agnostic analytics engine 
	- data engineering platform
	- distributed data analytics
	- data warehouse analytics
	- data lake analytics

### Open-Source
- Kibana- While commonly used with the ELK (Elasticsearch, Logstash, Kibana) stack for log analysis, Kibana can be adapted for non-security-related data visualization and exploration. : https://www.elastic.co/kibana/ 
- Pentaho-  Is an open-source business analytics and data integration platform. It's utilized for data visualization, reporting, and ETL (Extract, Transform, Load) tasks. : https://www.hitachivantara.com/en-us/products/pentaho-platform/data-integration-analytics.html
- Metabase- Is a business intelligence and data exploration tool that allows users to create interactive dashboards and analyze data stored in various databases. : https://www.metabase.com/ 
- Jupyter- Is an open-source web application that allows you to create and share documents that contain live code, equations, visualizations, and narrative text. It's widely used in data science and research for data analysis and visualization. : https://jupyter.org/
### Cloud - Proprietary
- General Data Engineering, Storage, Analytics, Visualization, Data Lakehouse
	- [Data Lakehouse Architecture and AI Company | Databricks](https://www.databricks.com/) 
		- Platform for working with Apache Spark.
		- Automated infra management
		- Microsoft Azure Databricks (integrated into Azure)
	- [Datadog Log Management | Datadog](https://www.datadoghq.com/dg/logs/benefits/)
	- [Dremio | The Easy and Open Data Lakehouse Platform](https://www.dremio.com/) 
	- Microsoft Fabric
		- [Data Analytics | Microsoft Fabric](https://www.microsoft.com/en-us/microsoft-fabric) 
		- [[Public Preview)? - YouTube](Public%20Preview)?%20-%20YouTube](https://www.youtube.com/watch?v=-f0XIVEP7bE) 
		- Azure Synapse
			- [Secure a data lakehouse on Synapse - Azure Architecture Center | Microsoft Learn](https://learn.microsoft.com/en-us/azure/architecture/example-scenario/analytics/secure-data-lakehouse-synapse) 
			- [Azure Synapse Analytics | Microsoft Azure](https://azure.microsoft.com/en-us/products/synapse-analytics/?ef_id=_k_CjwKCAjw-eKpBhAbEiwAqFL0mq1U7WMBFCbbVpJUnMUT0o93peXfbkcUf9jg9ptLtYxMWzShRY8UtRoCZ7UQAvD_BwE_k_&OCID=AIDcmm5edswduu_SEM__k_CjwKCAjw-eKpBhAbEiwAqFL0mq1U7WMBFCbbVpJUnMUT0o93peXfbkcUf9jg9ptLtYxMWzShRY8UtRoCZ7UQAvD_BwE_k_&gad=1&gclid=CjwKCAjw-eKpBhAbEiwAqFL0mq1U7WMBFCbbVpJUnMUT0o93peXfbkcUf9jg9ptLtYxMWzShRY8UtRoCZ7UQAvD_BwE) 

- Databases, Data Storage, Data Indexing, Data Warehouse, Data Lakes
	- Curations
		- [Home - Database of Databases](https://dbdb.io/)
			- [Browse - Database of Databases](https://dbdb.io/browse?tag=time-series&type=commercial&type=open-source&q=) - timeseries, OS, commercial
			- 
	- Related to Log Management
		- [Cloud Object Storage – Amazon S3 – Amazon Web Services](https://aws.amazon.com/s3/) 
		- [What is OneLake? - Microsoft Fabric | Microsoft Learn](https://learn.microsoft.com/en-us/fabric/onelake/onelake-overview) 
		- [InfluxDB Times Series Data Platform | InfluxData](https://www.influxdata.com/) 

- Automation, IFTTT, Integration Platform as a Service (iPaaS), APIs, Cloud Integration, ESB (enterprise service bus), EAI (enterprise application integration), Middleware
	- [Power Automate | Microsoft Power Platform](https://powerautomate.microsoft.com/en-us/) 
	- [IBM App Connect - Application integration software](https://www.ibm.com/products/app-connect) 
	- [n8n.io - a powerful workflow automation tool](https://n8n.io/) 
	- [Connect APIs, Remarkably Fast - Pipedream](https://pipedream.com/)
	- [Make | Automation Software | Connect Apps & Design Workflows](https://www.make.com/en) 
	- [Zapier | Automation that moves you forward](https://zapier.com/)
	- [8 Million+ Ready Automations For 1100+ Apps | Integrately](https://integrately.com/) 
	- [IFTTT - Automate business & home](https://ifttt.com/) 
	- [Unified, AI-powered iPaaS for every team to automate at scale | Tray.io](https://tray.io/) 
	- [The Modern Leader in Automation | Workato](https://www.workato.com/) 
	- [Albato — a single no-code platform for all automations](https://albato.com/) 
	- [Celigo: A New Approach to Integration and Automation](https://www.celigo.com/) 
	- https://github.com/huginn/huginn 
	- [[Microsoft)](Microsoft)](https://azure.microsoft.com/en-us/services/logic-apps/)
	- [WayScript](https://github.com/wayscript)
	- [https://www.ondiagram.com/ > features](https://www.ondiagram.com/#features) 
	- ESB
		- [Anypoint Platform](https://www.mulesoft.com/platform/enterprise-integration) - A comprehensive API management and integration platform that simplifies connecting applications from Mulesoft.
		- [Apache ServiceMix](https://servicemix.apache.org/) - An open-source integration container that combines the functionality of Apache ActiveMQ, Camel, CXF, and Karaf, providing a flexible solution.
		- [ArcESB](https://www.arcesb.com/integration/) - A versatile integration platform that seamlessly synchronizes data across applications, integrates with partners, and provides data accessibility.
		- [IBM App Connect](https://www.ibm.com/cloud/app-connect) - An integration platform that can connect applications, irrespective of the message formats or protocols they use, formerly known as IBM Integration Bus.
		- [[⭐1.9k)](⭐1.9k)](https://github.com/Particular/NServiceBus) - A .NET-based service bus that offers an intuitive developer-friendly environment.
		- [Oracle Service Bus](https://www.oracle.com/middleware/technologies/service-bus.html) - An integration platform that connects, virtualizes, and manages interactions between services and applications.
		- [Oracle SOA Suite](https://www.oracle.com/middleware/technologies/soasuite.html) - A platform that enables system developers to set up and manage services and to orchestrate them into composite applications and business processes.
		- [Red Hat Fuse](https://www.redhat.com/en/technologies/jboss-middleware/fuse) - A cloud-native integration platform that supports distributed integration capabilities.
		- [Software AG webMethods Integration Server](https://www.softwareag.com/en_corporate/platform/integration-apis/webmethods-integration.html) - An integration platform that enables faster integration of any application.
		- [TIBCO BusinessWorks](https://www.tibco.com/products/tibco-businessworks) - A platform that implements enterprise patterns for hybrid integrations.
		- [UltraESB](https://www.adroitlogic.com/products/ultraesb/) - An ESB that supports zero-copy proxying for extreme performance utilizing Direct Memory Access and Non-Blocking IO.
		- [[⭐352)](⭐352)](https://github.com/wso2/product-ei) - An API-centric, cloud-native, and distributed integration platform designed to provide a robust solution for software engineers.
	- https://github.com/stn1slv/awesome-integration#ipaas 
		- [Anypoint Platform](https://www.mulesoft.com/platform/saas/cloudhub-ipaas-cloud-based-integration) - A powerful integration platform that combines API management and integration capabilities in a single platform, enabling software engineers to integrate various applications with ease.
		- [Boomi AtomSphere](https://boomi.com/platform) - A cloud-native, unified, open, and intelligent platform that connects everything and everyone, allowing software engineers to create and manage integrations easily.
		- [Jitterbit Harmony](https://www.jitterbit.com/platform/ipaas) - A comprehensive integration platform that provides pre-built templates and workflows to automate business processes. It integrates thousands of applications and simplifies integration for software engineers.
		- [IBM Cloud Integration](https://www.ibm.com/cloud/integration) - A next-generation integration platform that uses AI to provide software engineers with an innovative approach to integration. This platform accelerates integration processes, making it faster and more scalable.
		- [Informatica Intelligent Cloud Services](https://www.informatica.com/products/cloud-integration.html) - A suite of cloud data management products designed to accelerate productivity and improve speed and scale. Software engineers can use this platform to manage data and integrate applications efficiently.
		- [OpenText Alloy](https://businessnetwork.opentext.com/enterprise-data-management/) - A powerful enterprise data management platform that empowers organizations to move beyond basic integration and turn data into insights and action. Software engineers can use this platform to manage data and improve business outcomes.
		- [Oracle Integration Cloud Service](https://www.oracle.com/integration/application-integration/) - A robust platform that accelerates time to go live with pre-built connectivity to any SaaS or on-premises application. Software engineers can use this platform to simplify integration processes and streamline operations.
		- [SnapLogic Intelligent Integration Platform](https://www.snaplogic.com/products/intelligent-integration-platform) - A comprehensive integration platform that connects various applications and data landscapes. Software engineers can use this platform to integrate data and applications quickly and efficiently.
		- [Software AG webMethods Hybrid Integration Platform](https://www.softwareag.com/en_corporate/platform/integration-apis/application-integration.html) - An all-in-one integration platform that enables software engineers to integrate all their applications in a single platform. This platform simplifies integration processes and improves efficiency.
		- [TIBCO Cloud Integration](https://www.tibco.com/products/cloud-integration) - A flexible platform that enables software engineers to integrate anything with API-led and event-driven integration. This platform empowers everyone to integrate anything, making integration processes faster and more efficient.
		- [Workato](https://www.workato.com/) - A single platform for integration and workflow automation across your organization, providing software engineers with a powerful platform for simplifying integration processes and streamlining operations.

- Analytics & Visualization
	- [Grafana: The open observability platform | Grafana Labs](https://grafana.com/) 

- Data Ingestion & Aggregation
	- [Grafana Loki OSS | Log aggregation system](https://grafana.com/oss/loki/)
		- [grafana/loki: Like Prometheus, but for logs.](https://github.com/grafana/loki)
		- [Grafana Loki | DigitalOcean Marketplace 1-Click App](https://marketplace.digitalocean.com/apps/grafana-loki) 
## Threat Intel?
### Open Source
- [MISP Open Source Threat Intelligence Platform &amp; Open Standards For Threat Information Sharing](https://www.misp-project.org/) 
- OpenDXL- Framework designed for the integration of security tools and the management of security events. It's built to enhance the interoperability of security products. : https://www.opendxl.com/filebase/
- [Patrowl/PatrowlManager: PatrOwl - Open Source, Smart and Scalable Security Operations Orchestration Platform](https://github.com/Patrowl/PatrowlManager) 
	- [Exposure Management and External Security Posture Management with Patrowl](https://www.patrowl.io/) 
### Cloud - Proprietary
- .
## SOAR - Security Orchestration, Automation, and Response
### search terms
- Automated Incident Response
- Incident Handling
- Security Automation
- IFTTT
### Open-Source
- TheHive
	- [TheHive-Project/Cortex: Cortex: a Powerful Observable Analysis and Active Response Engine](https://github.com/TheHive-Project/Cortex) 
- [nsacyber/WALKOFF: A flexible, easy to use, automation framework allowing users to integrate their capabilities and devices to cut through the repetitive, tedious tasks slowing them down. #nsacyber](https://github.com/nsacyber/WALKOFF)
-  EveBox-  Interface for the Suricata intrusion detection system (IDS). It provides alert management and visualization features for Suricata-generated alerts. : https://evebox.org/
### Cloud - Proprietary
- [Tines | Smart, secure workflows](https://www.tines.com/) 
- [Shuffle Automation - An Open Source SOAR solution](https://shuffler.io/)
- [SIRP SOAR Platform: Security Automation at Lightning Speed](https://www.sirp.io/) 
- [Chronicle | Suite | SOAR](https://chronicle.security/suite/soar/) 
- [Devo SOAR -](https://www.devo.com/resources/solution-brief/devo-soar/) 
- [Fortinet - Fortisoar (SOAR) Software)](https://www.fortinet.com/products/fortisoar) 
- [IBM Security QRadar SOAR](https://www.ibm.com/products/qradar-soar)
- [Security Orchestration, Automation, and Response) - Service Now](https://www.servicenow.com/products/security-operations/what-is-soar.html) 
- [AI Enabled Security Automation, SOC Automation, SOAR](https://swimlane.com/) 
- [Streamlined and Converged Cyber Security - Logpoint](https://www.logpoint.com/en/) 
- 
- For specific systems:
	- [Intelligent Threat Detection - Amazon GuardDuty - AWS](https://aws.amazon.com/guardduty/) 
## ETL (Extract Transform Load), Data Transformation & Integration, Stream Processing, Moving Data, Data Quality, Data Pipelines, Observability

- [Airbyte | Open-Source Data Integration Platform | ELT tool](https://airbyte.com/) - Free by self-hosting with Docker. Cheap cloud options.
- [Jitsu : Open Source Data Integration Platform](https://jitsu.com/) - Open-source alternative to Segment. Free by self-hosting with Dock. 
- [dbt Labs | Transform Data in Your Warehouse](https://www.getdbt.com/) - Uses SQL (con), Open Source, Jinja templates with SQL (ehhh sorta unrelated to most pipeline tools)

- Cribl Stream & Alternatives
	- This is my favorite tool to integrate with SIEMs. However, I've had trouble finding similar tools.  I wonder what their competitors are
	- [Cribl Stream - Simplify Data Stream, Routing & Collection](https://cribl.io/stream/)
	- [Stitch: Simple, extensible cloud ETL built for data teams | Stitch](https://www.stitchdata.com/) 
	- [Dataflow Google Cloud](https://cloud.google.com/dataflow/docs) - Stream processing from Google
	- [ETL Service - Serverless Data Integration - AWS Glue - AWS](https://aws.amazon.com/glue/) 
	- Azure Stream Analytics

- Streaming? (I'm so confused about some of the differences or targets of these solutions)
	- [Apache Kafka](https://kafka.apache.org/) - Apache Kafka is an open-source distributed event streaming platform used by thousands of companies for high-performance data pipelines, streaming analytics, data integration, and mission-critical applications.

- Data Pipelines
	- [Apache Airflow](https://airflow.apache.org/) - programmatically author, schedule and monitor workflows. 

- Misc
	- [Cloud Data Fusion | Google Cloud](https://cloud.google.com/data-fusion?hl=en) - Fully managed, cloud-native data integration at any scale. Visual point-and-click interface enabling code-free deployment of ETL/ELT data pipelines. 
	- [Fivetran | Automated data movement platform](https://www.fivetran.com/) 
	- [Managed Etl Service - AWS Data Pipeline - AWS](https://aws.amazon.com/datapipeline/) 
	- [Data Science and Analytics Automation Platform | Alteryx](https://www.alteryx.com/) 
	- [Apache Flink® — Stateful Computations over Data Streams | Apache Flink](https://flink.apache.org/) 

- GUIs (Vendor Lockin, Limited)
	- [Apache NiFi](https://nifi.apache.org/) - An easy to use, powerful, and reliable system to process and distribute data. Apache NiFi supports powerful and scalable directed graphs of data routing, transformation, and system mediation logic.

- data quality
	- [Elementary - dbt native data observability, built for data and analytics engineers](https://docs.elementary-data.com/introduction) - With Elementary you can monitor your data pipelines in minutes, in your dbt project. Gain immediate visibility to your jobs, models runs and test results. Detect data issues with freshness, volume, anomaly detection and schema tests. Explore all your test results and data health in a single interface and understand impact and root cause with rich lineage. Distribute actionable alerts to different channels and owners, and be on top of your data health.

### Data Engineering Landscape

- [The State of Data Engineering 2022 - Git for Data - lakeFS](https://lakefs.io/blog/the-state-of-data-engineering-2022/)
	- ![](https://www.montecarlodata.com/wp-content/uploads/2022/08/the-future-of-data-management-and-engineering-landscape-1024x576.png)
- [The State of Data Engineering 2023 - Data Version Control at Scale](https://lakefs.io/blog/the-state-of-data-engineering-2023/)
	- ![](https://cdn-kfpfp.nitrocdn.com/LPJTcQItTfFXIvmLmluGDpHNkMGCVcPt/assets/images/optimized/rev-ab83e30/lakefs.io/wp-content/uploads/2023/05/1200X630-lakeFS-State-of-Data-Engineering-Report-1024x538.png)
- [A Turbulent Year: The 2019 Data & AI Landscape – Matt Turck](https://mattturck.com/data2019/)
	- ![](https://allcloud.io/wp-content/uploads/2020/05/2019_Matt_Turck_Big_Data_Landscape_Final_Fullsize-e1590324773525.png)
- [Resilience and Vibrancy: The 2020 Data & AI Landscape – Matt Turck](https://mattturck.com/data2020/)
- [2021 - Data & AI Landscape (MAD) Landscape – Matt Turck](https://mattturck.com/data2021/)
	- ![](https://mattturck.com/wp-content/uploads/2021/12/Data-and-AI-Landscape-2021-v3-small-1200x621.jpg)
- 
### Data Pipeline Architecture
- [Data Pipeline Architecture Explained: 6 Diagrams And Best Practices](https://www.montecarlodata.com/blog-data-pipeline-architecture-explained/) 
- 
# Data Formats
- [Apache Parquet](https://parquet.apache.org/) - (Apache foundation / Data Format / Open Source / Free).
- [Apache ORC](https://orc.apache.org/) - (Apache foundation / Hortonworks / Facebook / Data Format / Open Source / Free).
- [Apache Avro](https://avro.apache.org/) - (Apache foundation / Data Format / Open Source / Free).
- [Apache Kudu](https://kudu.apache.org/) - (Apache foundation / Cloudera / Data Format / Open Source / Free).
- [Apache Arrow](https://arrow.apache.org/) - (Apache foundation / Data Format / Open Source / Free).
- [Delta](https://delta.io/) - (Databricks / Data Format / Free or License fee).
- [JSON](https://www.json.org/) - (Data Format / Free).
- [CSV](https://en.wikipedia.org/wiki/Comma-separated_values) - (Data Format / Free).
- [TSV](https://en.wikipedia.org/wiki/Tab-separated_values) - (Data Format / Free).
- [HDF5](https://www.hdfgroup.org/solutions/hdf5/) - (The HDF Group / Data Format / Open Source (licensed by [HDF5](https://www.hdfgroup.org/licenses.)) / Free).
# Security Data Lakes
- Panther
	- [Comparing the Cost of “SIEM”: How Much and Time-to-Value - Pivot Point Security](https://www.pivotpointsecurity.com/comparing-the-cost-of-siem-how-much-and-time-to-value/#Cutting_SIEM_costs_up_to_70) 
# ETL & Data Transformation Tool Links Misc
* [Data Integration Platform for Enterprise Companies | StreamSets](https://streamsets.com/#)
* [Extract & Load](https://airbyte.com/product/extract-load)
* [Observability Pipelines | Datadog](https://www.datadoghq.com/product/observability-pipelines/)
* [fluentbit](https://fluentbit.io/)
* [Data transformation and data quality | Stitch](https://www.stitchdata.com/platform/datatransformation/)
* [Transformations | Fivetran](https://www.fivetran.com/data-movement/transformations)
* [19 Best ETL Tools for 2023](https://blog.hubspot.com/website/etl-tools)
* [Talend Open Studio: Open-source ETL and Free Data Integration | Talend](https://www.talend.com/products/talend-open-studio/)
* [Open-source ETL: Talend Open Studio for Data Integration | Talend](https://www.talend.com/lp/open-studio-for-data-integration/)
* [Singer | Open Source ETL](https://www.singer.io/#what-it-is)
* [Top ETL Tools Comparison - Skyvia](https://skyvia.com/etl-tools-comparison/#Skyvia)
* [Top 14 ETL Tools for 2024 | Integrate.io](https://www.integrate.io/blog/top-7-etl-tools/#six)
* [15+ Best ETL Tools Available in the Market in 2023](https://www.softwaretestinghelp.com/best-etl-tools/)
* [Apache NiFi](https://nifi.apache.org/)
* [Data Landscape Tools - Artboard 1](https://mattturck.com/wp-content/uploads/2021/12/2021-MAD-Landscape-v3.pdf)
* [SnapLogic Snaps | Pre-built Intelligent Connectors](https://www.snaplogic.com/products/snaps)
* [Datameer | A Data Transformation Platform - Datameer](https://www.datameer.com/)
* [Data Pipeline Automation Platform](https://www.ascend.io/)
* [Azure Data Factory - Data Integration Service | Microsoft Azure](https://azure.microsoft.com/en-us/products/data-factory#features)
- [Jitsu](https://jitsu.com/) 
- 
# More Gartner Magic Quadrants
- Analytics & Business Intelligence
	- ![](../../__attachments/SIEM%20Framework/Solution%20&%20Architecture%20Curation/IMG-20231210124551307.png)
- iPaas (Integration Platform)
	- ![](../../__attachments/SIEM%20Framework/Solution%20&%20Architecture%20Curation/IMG-20231210125833301.png)
- Data Science & ML Platforms
	- 2023
		- .
	- 2021
		- ![](../../__attachments/SIEM%20Framework/Solution%20&%20Architecture%20Curation/IMG-20231210124945871.png)
	 - 2020
		- ![](../../__attachments/SIEM%20Framework/Solution%20&%20Architecture%20Curation/IMG-20231210124729057.png)
- Personalization Engines?
	- ![](../../__attachments/SIEM%20Framework/Solution%20&%20Architecture%20Curation/IMG-20231210124656674.png)
- 