---
date created: Sunday, March 24th 2024, 1:18 pm
date modified: Sunday, March 24th 2024, 1:18 pm
---

RAID (Redundant Array of Independent Disks) and AHCI (Advanced Host Controller Interface) are two modes that your system's SATA controller can operate in, and they play a significant role in how an SSD (or any storage device) is recognized and utilized by the OS. These modes affect the performance and functionality of your SSDs or HDDs but in different ways. Let's break down each and how they relate to MBR (Master Boot Record), GPT (GUID Partition Table), and BIOS/UEFI settings.

### AHCI Mode

- **Purpose**: AHCI is a technical standard designed to allow the storage driver to enable advanced Serial ATA features such as Native Command Queuing (NCQ) and hot swapping. It is geared towards single disks and SSDs.
- **OS Detection**: When your SSD is in AHCI mode, the OS can use its standard SATA drivers to communicate with the device. This mode is preferred for single disks or when you don't need RAID's benefits, as it can provide a performance boost especially for SSDs due to NCQ.
- **MBR/GPT Compatibility**: AHCI mode works with both MBR and GPT partition tables. The choice between MBR and GPT doesn't affect the ability of an AHCI-enabled BIOS/UEFI to detect an SSD.

### RAID Mode

- **Purpose**: RAID mode is used when two or more drives are combined for redundancy (data protection) or performance improvements. It requires a RAID controller (hardware or software) to manage the array.
- **OS Detection**: In RAID mode, the OS needs a specific RAID driver to recognize and properly interact with the storage devices. Without this driver, the OS may not recognize the array or individual drives correctly.
- **MBR/GPT Compatibility**: Like AHCI, RAID mode can support both MBR and GPT partitioned disks. However, the RAID controller's BIOS/UEFI extension (often accessible during the boot process) manages the RAID array, which the system BIOS/UEFI then detects as a single drive.

### Potential Issues and Considerations

- **BIOS/UEFI Settings and SSD Detection**: If your BIOS is set to RAID mode but you're not using a RAID configuration, your OS might not recognize the SSD unless the correct RAID drivers are installed. Conversely, setting it to AHCI mode typically allows for immediate recognition and utilization of the SSD by the OS, assuming the OS supports AHCI (which most modern operating systems do).
- **MBR and Bootability**: Whether an SSD is formatted as MBR or GPT is more about the disk's partitioning scheme and doesn't directly impact how the BIOS/UEFI detects the SSD in terms of AHCI vs. RAID mode. However, GPT is required for booting from disks larger than 2TB and for systems that use UEFI instead of traditional BIOS.
- **Transitioning Between Modes**: Switching between AHCI and RAID after the OS installation can result in boot issues or a non-bootable OS, as the drivers configured during installation are specific to the mode selected at that time. It's crucial to select the desired mode before installing the OS and stick with it unless reinstallation is an option.

In summary, whether your SSD is set up with MBR or GPT does not directly affect its detection by the BIOS/UEFI in AHCI vs. RAID mode. Instead, the detection and usability are more about whether the SATA controller's mode aligns with the OS's expectations and drivers. RAID mode requires RAID drivers, and AHCI mode works with standard SATA drivers. The choice between MBR and GPT is a separate consideration, primarily relevant for the disk's partitioning scheme and booting requirements.