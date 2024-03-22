---
created: Thursday, Mar 21, 2024 07:04 PM
updated: Thursday, Mar 21, 2024 08:17 PM
date created: Thursday, March 21st 2024, 7:04 pm
date modified: Friday, March 22nd 2024, 6:56 pm
---

# Misc Links
- [(40) Building A Budget NAS with TrueNAS Scale - YouTube](https://www.youtube.com/watch?v=iSpL9LnczVQ)
- [(40) Building A DIY NAS On A Budget - TrueNAS Scale - YouTube](https://www.youtube.com/watch?v=jf_5FaVFnrU)
- [balenaEtcher - Flash OS images to SD cards & USB drives](https://etcher.balena.io/)
- [Total Noob Here: trying to install TrueNas on USB pendrive | TrueNAS Community](https://www.truenas.com/community/threads/total-noob-here-trying-to-install-truenas-on-usb-pendrive.102312/)
- [Ventoy](https://www.ventoy.net/en/index.html)
- [Installing SCALE |](https://www.truenas.com/docs/scale/gettingstarted/install/installingscale/)
- [Download TrueNAS SCALE - Data Storage Software](https://www.truenas.com/download-truenas-scale/?submissionGuid=b256dc43-0345-4eee-9ce8-83b058681d6c)
- [Configuring SCALE Using the UI |](https://www.truenas.com/docs/scale/23.10/gettingstarted/configure/uiconfigurationscale/)
# Hardware
- Old PC
	- ![](_attachments/Turning%20Old%20PC%20into%20NAS/IMG-20240322153112079.png)
## HDDs
- The most expensive part of NAS projects 😅
	- [Amazon.com: Seagate IronWolf 12TB NAS Internal Hard Drive HDD – 3.5 Inch SATA 6Gb/s 7200 RPM 256MB Cache for RAID Network Attached Storage – Frustration Free Packaging (ST12000VNZ008) : Electronics](https://www.amazon.com/Seagate-IronWolf-12TB-Internal-Drive/dp/B084ZTSMWF)
  
Choosing the right hard disk drive (HDD) for your Network Attached Storage (NAS) system depends on your specific needs, including capacity, speed, reliability, and budget. However, there are a few models and brands that consistently receive high marks from both consumers and professionals for NAS setups:
1. **Western Digital Red Plus**: Specifically designed for NAS systems, these drives offer a good balance between performance, reliability, and price. They are optimized for 24/7 operation in multi-bay systems, support NASware technology for improved reliability and system performance, and are available in capacities up to 18TB.
2. **Seagate IronWolf**: Another popular choice for NAS setups, Seagate IronWolf drives are built for always-on, always-accessible 24×7 performance. They offer AgileArray technology for optimal reliability and system agility, and are available in capacities up to 18TB. IronWolf Pro models offer higher performance and are designed for commercial and enterprise NAS systems.
3. **Synology HAT5300**: If you are using a Synology NAS, their HAT5300 series drives are optimized for Synology devices, offering high performance and reliability. These drives are engineered to handle high workloads and data-intense environments, making them suitable for business and professional use.
4. **Toshiba N300**: Designed for personal, home office, and small business NAS systems, the N300 series offers high reliability and performance with up to 18TB of capacity. These drives are built to handle high data workloads in a multi-RAID NAS environment.

When selecting a drive, consider the following factors:
- **Capacity**: Ensure the drive meets your storage needs both now and in the foreseeable future.
- **Reliability**: Look for drives designed for 24/7 operation with features like vibration protection and built for NAS systems.
- **Warranty and Support**: Longer warranties and good customer support can be invaluable, especially in a NAS setup where data availability is crucial.
- **Price**: While important, the cheapest option may not always offer the best value in terms of reliability and longevity.

Always check for compatibility with your specific NAS model and consider buying drives from multiple batches to avoid the risk of simultaneous failures from the same production batch.
# Initial Install TrueNAS onto PC
- Steps:
	- Check for necessary hardware on old PC
	- Flash .iso file to a USB drive
	- Plug in a initial install TrueNAS
	- .
## Prepare Old PC - Hardware
- In my case, I didn't have an SSD (NVMe in this case), so I added one from another old laptop
	- ![](_attachments/Turning%20Old%20PC%20into%20NAS/IMG-20240322153551912.png)
- Make sure you have SATA cords for data and power to the HDD
	- ![](_attachments/Turning%20Old%20PC%20into%20NAS/IMG-20240322183337356.png)
## Flashing TrueNAS to a USB Drive
- Download TrueNAS Scale .iso file
	- [Download TrueNAS SCALE - Data Storage Software](https://www.truenas.com/download-truenas-scale/?submissionGuid=b256dc43-0345-4eee-9ce8-83b058681d6c) 
- "Flash" the .iso file to the USB drive with [balenaEtcher](https://etcher.balena.io/) or [Rufus](https://rufus.ie/en/)
	- balenaEtcher 
		- ![](_attachments/Turning%20Old%20PC%20into%20NAS/IMG-20240321200339446.png)
		- ![](_attachments/Turning%20Old%20PC%20into%20NAS/IMG-20240321200536640.png)
		- ![](_attachments/Turning%20Old%20PC%20into%20NAS/IMG-20240321200600459.png)
		- ![](_attachments/Turning%20Old%20PC%20into%20NAS/IMG-20240321200727215.png)
		- ![](_attachments/Turning%20Old%20PC%20into%20NAS/IMG-20240321200816421.png)
		- ![](_attachments/Turning%20Old%20PC%20into%20NAS/IMG-20240321200848777.png)
		- ![](_attachments/Turning%20Old%20PC%20into%20NAS/IMG-20240321201727697.png)
- 
##

