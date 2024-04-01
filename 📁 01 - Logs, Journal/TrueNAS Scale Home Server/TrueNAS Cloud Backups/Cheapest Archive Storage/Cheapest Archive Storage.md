---
date created: Sunday, March 31st 2024, 10:30 pm
date modified: Sunday, March 31st 2024, 11:21 pm
tags:
  - Backups
---

# BackBlaze
- [The best ways to back up your largest files · Reproof](https://www.reproof.app/blog/s3-vs-backblaze-vs-google-cloud)
- [AWS Glacier Pricing - How to Calculate the Real Cost | Arq Backup](https://www.arqbackup.com/aws-glacier-pricing.html)
# Nothing Below $2 per TB per Month
- [What's the cheapest cold archive cloud storage? Is it Azure at $2/TB/Month? : r/DataHoarder](https://www.reddit.com/r/DataHoarder/comments/a06b47/whats_the_cheapest_cold_archive_cloud_storage_is/)
	- $50 per year per 8TB I think would be great if some service could do that.
	- That's never going to happen, just run the numbers. a 3.5 drive might average what 15w in use? I haven't checked recently but people used to say 20-25w, so let's be conservative and say 15w.
	- So daily use is 360w, monthly is 10,800w. If your kwh price is $0.12 you're looking at $1.296 just to power the drive. And you want to allocate $2 a month to power, infrastructure, bandwidth, physical space, insurance, and profit? There's only 70 cents left per month, per drive.
	- With the 70 cents you now need to pay an employee. If you're paying him $15/hr which probably won't get you anyone that knows what they're doing, then you need 21.42 physical drives operating per month just to pay for one hour of man power. Now you need someone there 24/7 because it's a data center, so 720 hours per month is your absolute minimum man power if it's just you sitting in a chair by yourself. 21.42 drives are needed every hour, multiplied by 720 hours, and you need 15,422 drives running just to pay for one person to be there 24/7.
	- But wait, we still haven't paid for the servers themselves, the bandwidth, physical space, insurance, etc. The only things we got paid for so far are power, the drive itself at $26/year and you get to hope and pray it doesn't fail, and man power.
	- ... Which brings me to
	- $2/TB/Month is already cheap. If it's too expensive then you should look into getting your own NAS and managing your own hardware. The prices you want aren't happening anytime soon.
# Some Popular Options
For scenarios that involve low read and high write workloads, particularly for audit and archive purposes, selecting the right cloud-based object storage service is crucial. The ideal service for such needs often requires cost-effectiveness, reliability, scalability, and strong data durability. Here's a breakdown of some of the top services in this category, including a look at Storj in this context:

1. **Amazon S3 Glacier and S3 Glacier Deep Archive**: Designed for long-term backup and archive, Amazon S3 Glacier is a popular choice. It offers very low costs for data storage and is designed for data that is infrequently accessed. The Glacier Deep Archive option provides even lower storage costs for data that is rarely accessed, making it suitable for archival purposes. Both offer high durability but have longer retrieval times compared to standard object storage options.
    
2. **Google Cloud Storage Nearline and Coldline**: Google Cloud offers Nearline for data that is accessed less than once a month and Coldline for data accessed less than once a year. These options are tailored for backup and archival solutions, offering low cost and high durability. Google Cloud's multi-regional and regional options can also support varying needs for latency and availability.
    
3. **Azure Blob Storage (Cool and Archive tiers)**: Azure's Blob Storage has tiered options suitable for different data access patterns. The Cool tier is optimized for data that will remain in the tier for at least 30 days, ideal for short-term backup and disaster recovery. The Archive tier is extremely cost-effective for long-term storage, with similar retrieval times to Amazon Glacier.
    
4. **Storj**: Storj differentiates itself by leveraging decentralized cloud storage. It offers high security and privacy, as data is encrypted, split into pieces, and distributed across a global network, reducing the risk of data breaches and downtime. Its pricing model can be competitive, especially for distributed applications that prioritize privacy and data security. However, its performance and suitability for your specific audit/archive needs would depend on how it integrates with your existing infrastructure and its retrieval times for archived data.
    
5. **Backblaze B2**: Known for its simplicity and cost-effectiveness, Backblaze B2 offers straightforward pricing and is competitive for both storage and egress costs. It's a good option for archival storage with more frequent access patterns compared to traditional archival services.
    
6. **Wasabi**: Wasabi is another cost-effective option that offers hot storage pricing for all data, meaning you pay the same rate for storage regardless of the access frequency. It's designed to be faster and cheaper than traditional cold storage solutions, with no egress fees, making it a strong contender for high-write, low-read scenarios.
    

### Comparison and Consideration

When comparing these services, consider the following factors:

- **Cost**: Look at both storage and access costs, as well as data retrieval fees. Some services charge for data egress, which can add up if you need to access your data frequently.
- **Access Times**: Depending on your need for data retrieval, the access time can be a critical factor. Some archival services have longer wait times for data retrieval.
- **Durability and Availability**: High durability is crucial for archival storage, ensuring your data remains intact over long periods.
- **Scalability**: The service should easily handle increases in data volume without significant management overhead.
- **Compliance and Security**: Ensure the service meets any industry-specific compliance requirements and offers robust security features.

**Storj**, specifically, might be particularly applicable for use cases that value decentralized architecture for enhanced security and privacy. However, its performance and cost-effectiveness should be evaluated against traditional cloud providers, especially for very large datasets or specific regulatory requirements.

For a detailed comparison, it would be beneficial to consider specific pricing models, SLAs (Service Level Agreements), and feature sets directly from the providers, as these can change and may be subject to specific deals or contracts.