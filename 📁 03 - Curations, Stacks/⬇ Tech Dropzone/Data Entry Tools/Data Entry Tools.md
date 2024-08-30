---
aliases:
  - Data Entry Solutions
  - Form to Database
  - DB Data Entry
  - Assessment Tools
  - Internal Questionnaire Tools
  - Survey Tools
  - Survey Software
  - Internal Audit Software
  - Staff Feedback Tools
  - Internal Control Questionnaire (ICQ) Software
  - Data Mapping
  - Data Governance Tools
tags:
  - data_governance
  - data_mapping
publish: true
date created: Wednesday, May 22nd 2024, 8:07 pm
date modified: Friday, August 30th 2024, 6:12 pm
---

# THE GOAL: Customized Information-Gathering in an Organization

>! [info] The goal is to create a system for doing customized internal questionnaires that build out a database table for initiatives like data governance or data mapping.

## Opinionated/Curated Tech Stack Options 

- On-Prem (naive option)
	- Network Share + Excel + Forms option in Excel (optional) 
- On-Prem - Custom Tools
  - [Appsmith](https://www.appsmith.com/pricing#plan-comparison) integrated with other tools
    - https://www.appsmith.com/pricing#plan-comparison
    - In a realistic situation, this will only cost about $1000 a year in a small org only sending out forms for people to fill out once or twice a year
    - Development hours are free. Deployed app usage is what counts toward cost.
  - [Formbricks](https://formbricks.com/pricing) + [n8n](https://docs.n8n.io/hosting/) + Database (Postgres container)
    - Completely free. Just takes a bit of time to set up.
    - https://n8n.io/integrations/spreadsheet-file/
    - Could write onto a local spreadsheet file
  - https://www.tooljet.com/pricing
- Microsoft, O365
	- Microsoft Forms into Excel
- Cloud, Hybrid
  - [OneTrust](https://www.onetrust.com/)
    - Out of the box solution, but it's expensive
  - Tally/Survey Monkey + Integration Tool + On-Prem Database + DBeaver
    - Convoluted and adds a bunch of risk
    - The integration tool would alone cost money and only be worth it if other teams use it
    - Only works easily if you have something like Google Sheets

# Search Queries

- no code database ICQ data entry assessment survey feedback questionnaire

# Curated Solution Stacks

- On-Prem (naive option)
	- Network Share + Excel + Forms option in Excel (optional) 
- Cloud, Hybrid
	- Survey Tool (Survey Monkey) -> Database
- On-Prem - Custom Tools
	- Appsmith integrated with other tools
- Microsoft, O365
	- Microsoft Forms into Excel

# Misc Solutions by Target

## Business Data Management

- Cloud, Expensive
  - SAP
- Open-Source SAP Alternatives
  - https://www.odoo.com/
  - https://erpnext.com/
  - https://civicrm.org/
  - https://suitecrm.com/
  - 

## Managed Governance Platforms, GRC

- Dilligent
- MetricStream
- Camms
- LogicGate
- ServiceNow
- SAI360
- NAVEX
- Archer
- Workiva
- Riskonnect
- Resolver

### Data Governance Tools

https://www.isaca.org/resources/news-and-trends/isaca-now-blog/2023/top-effective-10-data-governance-tools

- Privacy, 3rd party, and risk mgmt
  - https://www.onetrust.com/ - data governance and privacy
  - https://transcend.io/
  - https://securiti.ai/
  - https://bigid.com/
  - https://www.cookiebot.com/

- Data Privacy & Data Mapping
  - https://www.onetrust.com/
  - https://www.ketch.com/platform/data-mapping
  - https://www.cyera.io/
  - https://www.informatica.com/platform.html
  - https://www.datagrail.io/platform/live-data-map/
  - https://www.relyance.ai/platform
  - https://www.symmetry-systems.com/product/
  - Transcend
    - https://transcend.io/platform/data-inventory
    - https://transcend.io/platform/data-lineage

- 

- Data Catalog, Data Discovery, Metadata
  - https://www.amundsen.io/
  - https://datahub.io/
  - https://datahubproject.io/
  - https://atlas.apache.org/#/
  - https://magda.io/
  - https://open-metadata.org/
  - https://github.com/odpi/egeria
  - https://www.truedat.io/
  - https://data.world/
  - https://atlan.com/?ref=/

## Open-Source No Code Databases with Form Functionality, Open-Source Internal Tools Platforms

- NocoDB
  - https://github.com/nocodb/nocodb
  - https://nocodb.com/
- https://www.tooljet.com/
- https://baserow.io/
- https://www.rowy.io/
- https://budibase.com/
- https://www.appsmith.com/
- https://lowdefy.com/ - ehhh
- Expensive, Cloud
  - https://www.knack.com/
  - https://www.airtable.com/
  - https://stackerhq.com/
  - https://retool.com/
  - https://www.microsoft.com/en-us/power-platform/products/power-apps#solutions
  - https://jestor.com/plans-and-pricing/
  - https://www.quickbase.com/
  - 

## Employee Survey Tools

- Cloud
  - https://workleap.com/get/employee-pulse-survey-tool/
  - https://eletive.com/lp/employeeengagementsurveys/
  - https://surveysparrow.com/lp/best-employee-feedback-software-demo/
  - https://www.thrivesparrow.com/lp/employees-engagement
  - https://lattice.com/lp/employee-survey
  - 

## Audit and Internal Control, ICQs (Intnernal Control Questionnaire)

- Cloud, Expensive
  - SAP Internal Audit
  - https://www.ideagen.com/solutions/audit-and-risk/internal-audit
  - https://www.wolterskluwer.com/en/solutions/teammate
  - https://www.metricstream.com/products/internal-audit-management.htm
  - https://www.auditboard.com/product/operational-audit/
  - https://www.workiva.com/solutions/internal-audit-management
  - https://www.diligent.com/
  - https://onspring.com/solutions/governance-risk-compliance/internal-audit-assurance/
  - https://www.netwrix.com/auditor.html
  - 
- Open-Source
  - 

## Forms & Surveys

- On-Prem
	- https://formbricks.com/
- Cloud
	- https://www.typeform.com/
	- https://www.fillout.com/
	- https://www.surveymonkey.com/
	- https://tally.so/
	- https://www.formaloo.com/

# Misc

- [Nocode tool for on-premises use : r/nocode](https://www.reddit.com/r/nocode/comments/vjnjay/nocode_tool_for_onpremises_use/)
- [Pay for what you use, capped at $20/user/month](https://www.appsmith.com/pricing)
- [Self Hosting | Appsmith](https://docs.appsmith.com/getting-started/setup#self-hosted)
- [hub.docker.com/search?q=appsmith](https://hub.docker.com/search?q=appsmith)
- [Microsoft-Forms Hosting on local web server (On-Premises) - Microsoft Community Hub](https://techcommunity.microsoft.com/t5/microsoft-forms/microsoft-forms-hosting-on-local-web-server-on-premises/m-p/1488190)
- [5 best open source form builder apps (tried and tested)](https://budibase.com/blog/open-source-form-builder/)
- [Configuration Based Pricing - Form.io](https://form.io/configuration-based-pricing/)
- [Open Source Alternatives To Proprietary Software](https://www.opensourcealternative.to/)
- [Formbricks | Privacy-first Experience Management](https://formbricks.com/)
- [Typebot - Open-source conversational apps builder](https://typebot.io/)
- [Form | GetApp](https://www.getapp.com/s/Form/)
- [Data Governance - Forms and Templates | myUSF](https://myusf.usfca.edu/data-governance/forms-templates)
- [Quick Start Installation of OhMyForm | OhMyForm](https://ohmyform.com/docs/install/)
- [super-easy-forms/super-easy-forms: The easiest way to generate forms for your static site](https://github.com/super-easy-forms/super-easy-forms)
- [calipseo/formio - Docker Image | Docker Hub](https://hub.docker.com/r/calipseo/formio)

## Unified Data Entry Suite

- **Google Forms**: Easy-to-create forms that can collect data and automatically populate Google Sheets.
- **Typeform**: User-friendly forms and surveys that can integrate with various databases and applications.
- **Microsoft Forms**: Part of Office 365, allows for data collection and integration with Excel and other Microsoft tools.
- **JotForm**: Versatile form builder with extensive integration options.
- **Airtable**: Combines the simplicity of a spreadsheet with the power of a database, allowing for easy data entry and management.
- **Zapier**: Automation tool that can connect forms and other data entry tools with numerous databases and applications.
- **Formstack**: Flexible form builder with powerful data management capabilities.
- **Smartsheet**: Work management tool that supports data entry, project tracking, and integration with various databases.
- **KoboToolbox**: Open-source tool for data collection, ideal for field data entry.
- **SurveyMonkey**: Popular survey tool that can collect data and integrate with various platforms.
- 