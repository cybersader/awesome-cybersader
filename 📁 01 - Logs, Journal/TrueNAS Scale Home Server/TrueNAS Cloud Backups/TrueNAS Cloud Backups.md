---
date created: Sunday, March 31st 2024, 12:27 pm
date modified: Sunday, March 31st 2024, 10:04 pm
tags:
  - NAS
  - TrueNAS
  - Backups
  - BCDR
---

# Links
- [Data Backups |](https://www.truenas.com/docs/core/gettingstarted/databackups/)
- 
# Storage Options
- [Cloudflare R2](https://www.cloudflare.com/developer-platform/r2/)
	- $0.015 * 12000 GB * 12 months = $2160 😬
- [AWS S3 (simple storage service)](https://aws.amazon.com/s3/pricing/)
	- **S3 Glacier Deep Archive** *** - For long-term data archiving that is accessed once or twice in a year and can be restored within 12 hours 
		- [Amazon S3 Glacier API Pricing | Amazon Web Services](https://aws.amazon.com/s3/glacier/pricing/)
		- $0.00099 per GB * 12000 * 12 months = $142.56 US
		- Data retrieval cost = $0.01 * 12000 = $120
		- All data transfer in = $0.00 per GB