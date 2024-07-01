# Introduction to Data and Detection Engineering
- Ethan and Derek do a lot of data engineering and detection engineering
## Data Sources
![](__attachments/BHIS%20Videos/IMG-Log%20File%20Analysis%20-%20Gleaning%20Insights%20From%20Log%20Files-2024063021.png)

## Centralized Collection / SIEM 
![](__attachments/BHIS%20Videos/IMG-Log%20File%20Analysis%20-%20Gleaning%20Insights%20From%20Log%20Files-2024063021-79.png)

## Caveats to Centralized Logs
- You'll still need tactical acquisition during incident response
- You can't feasibly log everything

## The Goal of Log File Analysis
- Answer a question 
![](__attachments/BHIS%20Videos/IMG-Log%20File%20Analysis%20-%20Gleaning%20Insights%20From%20Log%20Files-2024063021-80.png)

## The Detection Funnel
- Detection and Analysis has to used to filter down from normally produced events
- Domain knowledge has to be applied to filter down to potentially malicious
![](__attachments/BHIS%20Videos/IMG-Log%20File%20Analysis%20-%20Gleaning%20Insights%20From%20Log%20Files-2024063021-81.png)

# Detection Techniques
## Fundamental Analysis - Low Level
![](__attachments/BHIS%20Videos/IMG-Log%20File%20Analysis%20-%20Gleaning%20Insights%20From%20Log%20Files-2024063021-82.png)

## Essential Analysis - Mid Level
![](__attachments/BHIS%20Videos/IMG-Log%20File%20Analysis%20-%20Gleaning%20Insights%20From%20Log%20Files-2024063021-83.png)
- Pivoting - same as lookups, merges, left join, etc.  Correlation & Enrichment.
- Windowing is like aggregating. Same as eventstats in Splunk. Can relate to time fields often.
# Linux CLI Tools?
![](__attachments/BHIS%20Videos/IMG-Log%20File%20Analysis%20-%20Gleaning%20Insights%20From%20Log%20Files-2024063021-84.png)
- Manual log file analysis could be important at some point 
## Basic Commands
![](__attachments/BHIS%20Videos/IMG-Log%20File%20Analysis%20-%20Gleaning%20Insights%20From%20Log%20Files-2024063021-85.png)
- cat or zcat for zip files
- grep or zgrep for zip files
## CLI Example

![](__attachments/BHIS%20Videos/IMG-Log%20File%20Analysis%20-%20Gleaning%20Insights%20From%20Log%20Files-2024063021-86.png)

![](__attachments/BHIS%20Videos/IMG-Log%20File%20Analysis%20-%20Gleaning%20Insights%20From%20Log%20Files-2024063021-87.png)

![](__attachments/BHIS%20Videos/IMG-Log%20File%20Analysis%20-%20Gleaning%20Insights%20From%20Log%20Files-2024063021-88.png)

## Efficient CLI Usage

![](__attachments/BHIS%20Videos/IMG-Log%20File%20Analysis%20-%20Gleaning%20Insights%20From%20Log%20Files-2024063021-89.png)

![](__attachments/BHIS%20Videos/IMG-Log%20File%20Analysis%20-%20Gleaning%20Insights%20From%20Log%20Files-2024063021-90.png)

![](__attachments/BHIS%20Videos/IMG-Log%20File%20Analysis%20-%20Gleaning%20Insights%20From%20Log%20Files-2024063021-91.png)

![](__attachments/BHIS%20Videos/IMG-Log%20File%20Analysis%20-%20Gleaning%20Insights%20From%20Log%20Files-2024063021-92.png)

![](__attachments/BHIS%20Videos/IMG-Log%20File%20Analysis%20-%20Gleaning%20Insights%20From%20Log%20Files-2024063021-93.png)

## CLI Weaknesses
![](__attachments/BHIS%20Videos/IMG-Log%20File%20Analysis%20-%20Gleaning%20Insights%20From%20Log%20Files-2024063021-94.png)

![](__attachments/BHIS%20Videos/IMG-Log%20File%20Analysis%20-%20Gleaning%20Insights%20From%20Log%20Files-2024063021-95.png)


# Log Management
## Log Formats
![](__attachments/BHIS%20Videos/IMG-Log%20File%20Analysis%20-%20Gleaning%20Insights%20From%20Log%20Files-2024063021-96.png)

![](__attachments/BHIS%20Videos/IMG-Log%20File%20Analysis%20-%20Gleaning%20Insights%20From%20Log%20Files-2024063021-97.png)

## Data Funnel and Speed
![](__attachments/BHIS%20Videos/IMG-Log%20File%20Analysis%20-%20Gleaning%20Insights%20From%20Log%20Files-2024063021-98.png)

## Technologies & Scaling
- Lazy eval - pandas, etc.
![](__attachments/BHIS%20Videos/IMG-Log%20File%20Analysis%20-%20Gleaning%20Insights%20From%20Log%20Files-2024063021-99.png)

![](__attachments/BHIS%20Videos/IMG-Log%20File%20Analysis%20-%20Gleaning%20Insights%20From%20Log%20Files-2024063021-100.png)
- Columnar dbs -
	- clickhouse - analytical querying database
	- grafana - visualizations
	- ![](__attachments/BHIS%20Videos/IMG-Log%20File%20Analysis%20-%20Gleaning%20Insights%20From%20Log%20Files-2024063021-101.png)
- Serverless - 

## Bytes sent and received
![](__attachments/BHIS%20Videos/IMG-Log%20File%20Analysis%20-%20Gleaning%20Insights%20From%20Log%20Files-2024063021-102.png)
- look for fluctuations in these ratios to see user behavior
![](__attachments/BHIS%20Videos/IMG-Log%20File%20Analysis%20-%20Gleaning%20Insights%20From%20Log%20Files-2024063021-103.png)

# Conclusion
![](__attachments/BHIS%20Videos/IMG-Log%20File%20Analysis%20-%20Gleaning%20Insights%20From%20Log%20Files-2024063021-104.png)