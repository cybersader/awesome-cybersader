---
aliases:
  - Audit Tools & Model
tags:
  - Auditing
  - Compliance
  - Hardening
  - SCAP
  - endpoint-hardening
  - IARM
  - risk-management
  - RCSA
publish: true
date created: Wednesday, August 28th 2024, 7:51 pm
date modified: Friday, August 30th 2024, 4:53 pm
---

[Game Based Tabletops](../Game-Based%20Tabletops/Game-Based%20Tabletops.md)
[Endpoint Hardening](../Endpoint%20Hardening/Endpoint%20Hardening.md)
[Data Entry Tools](../../📁%2003%20-%20Curations,%20Stacks/⬇%20Tech%20Dropzone/Data%20Entry%20Tools/Data%20Entry%20Tools.md)

# NIST - Focus on Controls

- https://csrc.nist.gov/Projects/cprt - Cybersecurity and Privacy Reference Tool CPRT
- https://csrc.nist.gov/News/2024/the-nist-csf-20-is-here - The NIST Cybersecurity Framework (CSF) 2.0 is Here!
- https://csrc.nist.gov/ - Computer Security Resource Center
- https://csrc.nist.gov/pubs/sp/800/53/a/r5/final - NIST 800-53A Rev. 5
- https://csrc.nist.gov/Projects/risk-management/sp800-53-controls - SP 800-53 Controls and SP 800-53B Control Baselines
- https://csrc.nist.gov/Projects/risk-management/sp800-53-controls/overlay-repository - control overlays
- https://csrc.nist.gov/Projects/risk-management/sp800-53-controls/downloads - SP 800-53 Downloads
- https://csrc.nist.gov/Projects/open-security-controls-assessment-language - Open Security Controls Assessment Language OSCAL
- https://pages.nist.gov/OSCAL/
- https://www.nist.gov/cybersecurity - All cybersecurity topics and resources
- https://www.nist.gov/itl/smallbusinesscyber/nist-cybersecurity-framework-0
- https://www.nist.gov/privacy-framework/resource-repository/browse/guidelines-and-tools - Privacy Framework guidelines and tools
- https://www.nist.gov/privacy-framework/resource-repository/browse/crosswalks - Crosswalks
- https://www.nist.gov/privacy-framework/nist-privacy-framework-and-cybersecurity-framework-nist-special-publication-800-53 - 800-53 Crosswalk

Github & more OSCAL

- https://github.com/CISecurity/CISControls_OSCAL
- https://github.com/sckg/sckg
- https://github.com/oscal-club/awesome-oscal
- https://cyberesi-cg.com/oscal-cprt-catalog-project/
- https://oscal.io/
- https://registry.oscal.io/documents
- https://viewer.oscal.io/
- https://pages.nist.gov/OSCAL/resources/
- https://github.com/usnistgov/OSCAL
- https://regscale.com/
- https://www.openrmf.io/
- https://www.drtconfidence.com/

CIS Resources
- https://www.cisecurity.org/
    

NIST CSF
- https://csrc.nist.gov/projects/cybersecurity-framework/filters#/csf/filters - CSF references and mappings
- https://www.nist.gov/cyberframework/profiles - CSF 2.0 profiles
- https://www.nccoe.nist.gov/framework-resource-center - community profiles

FFIEC
- https://www.ffiec.gov/press/pdf/FFIECCybersecurityResourceGuide2022ApprovedRev.pdf

TTX 
- https://www.fdic.gov/regulations/resources/director/technical/cyber/purpose.html

Misc
- https://www.nist.gov/itl/applied-cybersecurity
- https://www.nist.gov/itl/applied-cybersecurity/privacy-engineering/collaboration-space
    

## Mapping Technical Configuration to NIST Controls

### Government Technical Standards Overview - The Technical Mapping Problem

- Links:
    - https://medium.com/@cyber.stack/nist-vs-iso-vs-cis-vs-stig-a-comprehensive-guide-7de5c788be07
    - https://govcyberhub.com/2022/03/07/stigs-for-dummies/
    - https://rmfdb.com/search
    - CSF2.0
        - https://www.nist.gov/cyberframework
        - https://www.nist.gov/informative-references
    - Automated mapping?
        - https://dale-bingham-soteriasoftware.medium.com/automatically-relate-nist-families-and-controls-to-your-disa-stig-checklists-with-openrmf-330e1a944e7b
        - https://www.openrmf.io/
        - https://github.com/Cingulara/openrmf-docs/releases
    - Checklist Repository - https://ncp.nist.gov/repository

### RMF (Risk Management Framework)

- https://csrc.nist.gov/Projects/risk-management/about-rmf
- https://rmfdb.com/search
- https://csrc.nist.gov/CSRC/media/Projects/risk-management/documents/04-Implement%20Step/NIST%20RMF%20Implement%20Step-FAQs.pdf

### What is SCAP (Security Content Automation Protocol)

- https://csrc.nist.gov/projects/security-content-automation-protocol/
- https://csrc.nist.gov/Projects/risk-management/about-rmf/implement-step/security-configuration-settings

### Mapping STIG to NIST

- https://public.cyber.mil/stigs/compilations/
- https://public.cyber.mil/stigs/cci/
- https://public.cyber.mil/stigs/downloads/
- https://www.reddit.com/r/NISTControls/comments/gicdnr/stig_flow_down_chart/
- https://www.google.com/search?q=DISA+STIG+CCI+Nist+800-53+revision+5
- https://public.cyber.mil/announcement/stig-srg-updates-for-nist-sp-800-53-rev-5-set-for-july-2/
- https://www.reddit.com/r/NISTControls/comments/wg8bit/comprehensive_list_of_ccis/
- https://public.cyber.mil/announcement/disa-releases-the-cci-list-revision-5/
- https://public.cyber.mil/stigs/downloads/

# Audit Tools

- Links
	- [Using Open Source Auditing Tools as alternative to CIS Benchmarks](https://linux-audit.com/using-open-source-auditing-tools-as-alternative-for-cis-benchmarks/)
	- [Lynis - Security auditing tool for Linux, macOS, and Unix-based systems - CISOfy](https://cisofy.com/lynis/) 
	- [Open Source Audit Services - FossID](https://fossid.com/service/open-source-audit/)

- Open Source
	- https://www.openrmf.io/
		- https://github.com/Cingulara/openrmf-docs/releases
	- https://community.chef.io/tools/chef-inspec
	- https://www.open-scap.org
		- https://www.open-scap.org/tools/

- Enterprise
	- Technical and geared towards cybersecurity engineers
		- https://regscale.com/
		- https://www.drtconfidence.com/
	- Expensive and overhyped...maybe - except maybe Vanta
		- https://www.vanta.com/ 
		- https://www.auditboard.com/
		- https://drata.com/
		- https://www.diligent.com/solutions/internal-controls-management
		- https://www.workiva.com/solutions/internal-audit-management
		- [Strike Graph: Cybersecurity Compliance SaaS](https://www.strikegraph.com/)
		- [ISMS.online, ISO 27001 Compliance Software &amp; Data Privacy SaaS](https://www.isms.online/)
		- [Automated Security &amp; Compliance Software Built For Scale - Hyperproof](https://hyperproof.io/)
		- [Compliance with confidence - Thoropass](https://thoropass.com/)
		- [Automated Security Compliance Platform | Scytale](https://scytale.ai/)
		- [Secureframe: Build trust. Unlock growth. | Secureframe](https://secureframe.com/)
		- [Home - Sprinto - Continuous Security &amp; Compliance Platform - Sprinto](https://sprinto.com/)