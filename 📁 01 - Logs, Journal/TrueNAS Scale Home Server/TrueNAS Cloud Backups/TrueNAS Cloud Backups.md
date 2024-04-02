---
date created: Sunday, March 31st 2024, 12:27 pm
date modified: Tuesday, April 2nd 2024, 9:47 am
tags:
  - NAS
  - TrueNAS
  - Backups
  - BCDR
---

> The big goal here is to have cheap and reliable cloud backups that are a last resort.
# Links
- [Data Backups |](https://www.truenas.com/docs/core/gettingstarted/databackups/)
- [Backing Up TrueNAS |](https://www.truenas.com/docs/scale/23.10/gettingstarted/configure/setupbackupscale/)
- [Using Configuration Backups |](https://www.truenas.com/docs/core/coretutorials/systemconfiguration/usingconfigurationbackups/)
- [Config Backups |](https://www.truenas.com/docs/truecommand/userguide/systemmanagement/singlesystem/configbackups/)
- [Cloud sync task with AWS S3 Deep Archive | TrueNAS Community](https://www.truenas.com/community/threads/cloud-sync-task-with-aws-s3-deep-archive.108157/) - talks about costs too
	- Talks about iX-Storj vs AWS Deep Glacier
- [S3 as backup destination for a home user : r/aws](https://www.reddit.com/r/aws/comments/oikkh8/s3_as_backup_destination_for_a_home_user/) 
	- I use Backblaze B2 to backup my Synology NAS with Hyperbackup.
	- Backblaze B2 pricing ([https://www.backblaze.com/b2/cloud-storage-pricing.html](https://www.backblaze.com/b2/cloud-storage-pricing.html)):
		- $0.005 per GB per month:
		- $0.01 per GB transferred out
	- In comparison S3 ([https://aws.amazon.com/s3/pricing/](https://aws.amazon.com/s3/pricing/)):
		- S3 is $0.023 per GB per month
		- $0.09 per GB transferred out
- [Advice Needed: Uploading 10TB to AWS Glacier Deep Archive from TrueNAS-SCALE-23.10.1 | TrueNAS Community](https://www.truenas.com/community/threads/advice-needed-uploading-10tb-to-aws-glacier-deep-archive-from-truenas-scale-23-10-1.115646/#:~:text=One%20of%20the%20suggestions%20was,and%20manage%2C%20no%20ingress%20costing.)
# Storage Options - 12 TB Backup
The gist:
- AWS S3 Glacier Deep Archive - good option, but the restore and download costs can be at least $90 per TB ($1116 for 12 TB), but can be as cheap as $150 a year
- Backblaze B2 - $864 per year for 12 TB, simple pricing, and only costs about $120 for restore and downloading the data
- iX-Storj - $576 per year 12 TB or $150 per 5 TB per year. $84 for restore/download/egress. 

- [iX Storj](https://www.truenas.com/ix-storj/)
	- [TrueNAS iX-Storj Cloud Storage: Secure Data Solutions](https://www.truenas.com/ix-storj/) 
	-  $576 per year 12 TB or $150 per 5 TB per year
	- X-Storj provides S3-Compatible cloud storage at [$4/TB per month](https://www.storj.io/pricing) and a starter package at $150 per year for 5 Terabytes, an unbeatable value.
	- $7 per TB egress - $84 for 12 TB
	- [Advice Needed: Uploading 10TB to AWS Glacier Deep Archive from TrueNAS-SCALE-23.10.1 | TrueNAS Community](https://www.truenas.com/community/threads/advice-needed-uploading-10tb-to-aws-glacier-deep-archive-from-truenas-scale-23-10-1.115646/#:~:text=One%20of%20the%20suggestions%20was,and%20manage%2C%20no%20ingress%20costing.)
		- One of the suggestions was investigating a storage service from a partner of iXsystems, iX-Storj - while the raw per-TB storage costing is higher than Glacier ($4/TB/mo for storage) it's cheaper than standard S3, and the restoration cost is $7/TB - cheaper than Glacier. Easier to sync and manage, no ingress costing.
	- [iX and Storj Deliver Globally Distributed Storage to TrueNAS](https://www.ixsystems.com/blog/ix-and-storj-deliver-globally-distributed-storage-to-truenas/)
		- **AWS S3 Glacier vs iX-Storj**: The iX-Storj service is identical to the standard Storj service at $4 per TB per month*. This compares with single-region AWS S3 at $25 per TB per month. Bandwidth (egress) prices for iX-Storj are $7/TB* compared with AWS at $90/TB. 80% lower in price, or for the same price, store 5X the data with iX-Storj with the added value of multi-region durability.
- [Cloudflare R2](https://www.cloudflare.com/developer-platform/r2/)
	- $0.015 * 12000 GB * 12 months = $2160 😬
- [AWS S3 (simple storage service)](https://aws.amazon.com/s3/pricing/)
	- **S3 Glacier Deep Archive** *** - For long-term data archiving that is accessed once or twice in a year and can be restored within 12 hours 
	- [Amazon S3 Glacier API Pricing | Amazon Web Services](https://aws.amazon.com/s3/glacier/pricing/)
	- $0.00099 per GB * 12000 * 12 months = $142.56 US
	- Data retrieval cost = $0.01 * 12000 = $120
	- All data transfer in = $0.00 per GB
	- [The best ways to back up your largest files · Reproof](https://www.reproof.app/blog/s3-vs-backblaze-vs-google-cloud)
		- Best to download files once every 3 months, if you’re ok waiting: **Glacier Deep Archive: $2/month**, plus a 12-hour delay and $24 per terabyte fee data retrieval fee and $92.16 per terabyte download fee, and minimum storage of 6 months (plus per-file request fees that can add up quite a bit more than the base download pricing).
	- [AWS Glacier Pricing - How to Calculate the Real Cost | Arq Backup](https://www.arqbackup.com/aws-glacier-pricing.html)
		- Restores/Downloading is expensive
			- Even if you use Standard tier and wait 3-5 hours, you still might **pay 23x to restore** what you've been paying monthly for storage ($92.67 to download data that's been stored for $4/month).
	- Restore cost and download could be $1116 😱 even with bulk???
	- 2 other options with archive:
		- [Advice Needed: Uploading 10TB to AWS Glacier Deep Archive from TrueNAS-SCALE-23.10.1 | TrueNAS Community](https://www.truenas.com/community/threads/advice-needed-uploading-10tb-to-aws-glacier-deep-archive-from-truenas-scale-23-10-1.115646/#:~:text=One%20of%20the%20suggestions%20was,and%20manage%2C%20no%20ingress%20costing.)
		- I have had a similar situation in the past and here's what I did as an alternative to HoneyBadger's excellent suggestion.  
			1. AWS has a device called a Snowball ([https://aws.amazon.com/snowball/](https://aws.amazon.com/snowball/)) that one can rent for a fee. You may want to check that out. I had ~35TB that I needed in Glacier and my upload speeds were abysmal and would have taken forever. After contacting AWS, they sent me the snowball device where I uploaded all of my data to it. Once my data was on the device, I sent it back to them where they ingested it into my S3 account. 
			2. Going forward, I am using native AWS CLI S3 tools on my TrueNAS SCALE box for S3 cloud sync tasks. Using the TrueNAS cloud sync tasks does not work well for me because the options aren't granular enough for my use cases as it insists on re-uploading all of my now ~50TB worth of data. I created a script that is kicked off by a systemd timer 2x a week, and it only uploads the changes from the previous sync. Using native AWS CLI tools does have the option to delete files from Glacier.
- [Wasabi Storage](https://wasabi.com/cloud-storage-pricing/#three-info)
	- $1000 for 12 TB
	- No egress fees
- Azure Blog Storage
	- [Pricing Calculator | Microsoft Azure](https://azure.microsoft.com/en-gb/pricing/calculator/)
	- Besides the per-GB, per-month fee, any blob that moves to the Archive tier will be subject to a 180-day Archive early deletion window.
- Backblaze
	- [Cloud Storage Pricing Comparison: Calculate Your Costs](https://www.backblaze.com/cloud-storage/pricing) 
	- $6 * 12 TB * 12 months = $864
	- Restore is around $120 or so for 12 TB
# iX Storj Setup and Pricing
- 