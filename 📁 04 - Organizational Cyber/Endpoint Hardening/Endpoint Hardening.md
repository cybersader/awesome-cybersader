---
aliases: 
tags: 
publish: true
date created: Thursday, June 13th 2024, 8:33 pm
date modified: Friday, August 30th 2024, 4:33 pm
---
[Frameworks, Standards](../Frameworks,%20Standards/Frameworks,%20Standards.md) 
[NIST & CIS Resources](../Frameworks,%20Standards/NIST%20&%20CIS%20Resources.md) 
# Audit Tools

- https://cisofy.com/lynis/
	- [CISOfy/lynis: Lynis - Security auditing tool for Linux, macOS, and UNIX-based systems. Assists with compliance testing (HIPAA/ISO27001/PCI DSS) and system hardening. Agentless, and installation optional.](https://github.com/CISOfy/lynis) 

# Mapping Technical Configuration to NIST Controls

## Government Technical Standards Overview - The Technical Mapping Problem

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

## RMF (Risk Management Framework)

- https://csrc.nist.gov/Projects/risk-management/about-rmf
- https://rmfdb.com/search
- https://csrc.nist.gov/CSRC/media/Projects/risk-management/documents/04-Implement%20Step/NIST%20RMF%20Implement%20Step-FAQs.pdf

## What is SCAP (Security Content Automation Protocol)

- https://csrc.nist.gov/projects/security-content-automation-protocol/
- https://csrc.nist.gov/Projects/risk-management/about-rmf/implement-step/security-configuration-settings

## Mapping STIG to NIST

- STIG Flow Down Chart
    - ![How STIGs are Developed](_attachments/Endpoint%20Hardening/IMG-20240830163359293.png)

https://public.cyber.mil/stigs/compilations/
https://public.cyber.mil/stigs/cci/
https://public.cyber.mil/stigs/downloads/
https://www.reddit.com/r/NISTControls/comments/gicdnr/stig_flow_down_chart/
https://www.google.com/search?q=DISA+STIG+CCI+Nist+800-53+revision+5&sca_esv=1994aae6371246d6&sca_upv=1&rlz=1C1GCEU_enUS1109US1110&ei=j6poZquAHsiKptQPupTx2Q8&ved=0ahUKEwjrg7CkqdSGAxVIhYkEHTpKPPsQ4dUDCBA&uact=5&oq=DISA+STIG+CCI+Nist+800-53+revision+5&gs_lp=Egxnd3Mtd2l6LXNlcnAiJERJU0EgU1RJRyBDQ0kgTmlzdCA4MDAtNTMgcmV2aXNpb24gNTIEEAAYRzIEEAAYRzIEEAAYRzIEEAAYRzIEEAAYRzIEEAAYRzIEEAAYRzIEEAAYR0itHVC7BliaHHAAeAKQAQCYAQCgAQCqAQC4AQPIAQD4AQGYAgGgAgeYAwCIBgGQBgiSBwExoAcA&sclient=gws-wiz-serp#ip=1
https://public.cyber.mil/announcement/stig-srg-updates-for-nist-sp-800-53-rev-5-set-for-july-2/
https://www.reddit.com/r/NISTControls/comments/wg8bit/comprehensive_list_of_ccis/
https://public.cyber.mil/announcement/disa-releases-the-cci-list-revision-5/
https://public.cyber.mil/stigs/downloads/

#  Links

- RMFDB?
    - https://rmfdb.com/search
- DISA
    - [DoD DISA STIGs Homepage](https://public.cyber.mil/stigs/)
    - [DISA STIG Downloads](https://public.cyber.mil/stigs/downloads/)
    - [DISA STIG Viewer 3.x Downloads](https://public.cyber.mil/stigs/downloads/?_dl_facet_stigs=stig-viewer-3x)
    - [DoD STIGs Automation | SCAP Tool (Security Content Automation Protocol)](https://public.cyber.mil/stigs/scap/)
        - Use recent SCAP content if possible
        - Download most recent SCC tool - [SCC 5.9 Windows](https://dl.dod.cyber.mil/wp-content/uploads/stigs/zip/scc-5.9_Windows_bundle.zip)
        - There's a SCC tool/scanner for Ubuntu, Windows, Solaris, RHEL, and Oracle Linux.
        - Includes STIG Benchmarks for SCAP
    - [DISA STIG Content for Config Management Tools](https://public.cyber.mil/stigs/supplemental-automation-content/)
    - [Control Correlation Identifier (CCI)](https://public.cyber.mil/stigs/cci/) - use this to map your own policies from high-level to actual technical settings.
    - [STIGs Group Policy Objects](https://public.cyber.mil/stigs/gpo/)
    - [Sunset Products](https://public.cyber.mil/stigs/sunset-products/)
    - [SRG/STIG Library Compilations](https://public.cyber.mil/stigs/compilations/)
    - [SRG/STIG Viewing Tools](https://public.cyber.mil/stigs/srg-stig-tools/) - The DOD/DISA STIG Viewer tool provides the capability to view one or more XCCDF (Extensible Configuration Checklist Description Format) formatted STIGs in an easy-to-navigate, human-readable format. It is compatible with STIGs developed and published by DISA for the DOD. The purpose of STIG Viewer is to provide an intuitive graphical user interface that allows ease of access to the STIG content, along with additional search and sort functionality. 
    - https://www.stigviewer.com/stigs
- [DoDIN Approved Products List](https://aplits.disa.mil/processAPList.action)
- [CIS Endpoint Hardening Benchmarks and Tools](https://www.cisecurity.org/cis-benchmarks)
    - [CIS Benchmark List](https://www.cisecurity.org/cis-benchmarks)
    - [Benchmark Downloads](https://learn.cisecurity.org/benchmarks)
    - [CIS Benchmarks FAQ](https://www.cisecurity.org/cis-benchmarks/cis-benchmarks-faq)
    - [CIS Hardened Images](https://www.cisecurity.org/cis-hardened-image-list) - CIS Hardened Images are virtual machine (VM) images that are pre-configured to meet the robust security recommendations of the associated CIS Benchmark. They provide users with a secure, on-demand, and scalable computing environment. CIS Hardened Images are available on major cloud service provider marketplaces.
    - [CIS-CAT Lite Tool - Automated Benchmarking](https://learn.cisecurity.org/cis-cat-lite)
- [CIS Secure Suite | Pricing, Features](https://www.cisecurity.org/cis-securesuite/pricing-and-categories/end-user)
