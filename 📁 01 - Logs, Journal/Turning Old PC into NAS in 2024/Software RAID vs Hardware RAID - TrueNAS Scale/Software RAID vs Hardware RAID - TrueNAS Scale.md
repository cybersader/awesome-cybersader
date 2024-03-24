---
date created: Sunday, March 24th 2024, 3:01 pm
date modified: Sunday, March 24th 2024, 3:01 pm
---

When using TrueNAS Scale, which is a powerful and flexible NAS (Network Attached Storage) operating system based on Linux, you generally do not need to enable RAID in the BIOS. TrueNAS Scale, like its predecessor TrueNAS CORE (based on FreeBSD), is designed to manage disks and RAID configurations directly within the software itself, leveraging ZFS—a combined file system and logical volume manager with high data integrity protection. Here's a high-level overview of how RAID is managed in such systems and the role of RAID hardware:

### Software RAID (Managed by TrueNAS Scale)

- **Direct Control**: TrueNAS Scale takes direct control of individual disks to manage data redundancy and performance. It uses ZFS to create RAID-Z pools, which are analogous to hardware RAID configurations but are often considered superior due to ZFS's advanced features like checksums for data integrity, snapshots, and automatic repair.
- **No BIOS RAID Required**: Since TrueNAS Scale manages RAID through ZFS, you don't need to enable RAID in your system's BIOS. In fact, it's recommended to set your BIOS SATA configuration to AHCI mode to ensure that TrueNAS has direct and unabstracted access to each drive for optimal performance and reliability.
- **Advantages**: This approach allows for more flexibility, easier expansion, and typically better data protection mechanisms than traditional hardware RAID. ZFS's RAID-Z can handle more complex scenarios like mixed drive sizes and quick recovery from drive failures.

### Hardware RAID

- **RAID Cards/Controllers**: Hardware RAID configurations are managed by dedicated RAID cards or onboard RAID controllers that present multiple disks as a single logical unit to the operating system. These cards have their own BIOS and manage the RAID array independently of the OS.
- **BIOS RAID Setting**: When using a hardware RAID card, you might need to enable RAID in the system's BIOS and configure the RAID array through the RAID card's BIOS utility before the OS boots. The OS then interacts with the RAID array as if it were a single disk.
- **Considerations**: While hardware RAID can offer performance benefits, especially for configurations that require high I/O throughput without taxing the CPU, TrueNAS Scale's use of ZFS often negates the need for hardware RAID. ZFS's efficiency and data protection features can outperform and outprotect hardware RAID in many scenarios.

### Best Practices with TrueNAS Scale

- **Direct Disk Access**: For TrueNAS Scale and ZFS to work correctly, they should have direct access to each disk. This means bypassing any hardware RAID configurations and not using the RAID functionality of your motherboard or RAID card.
- **RAID Card in IT Mode**: If you have a RAID card, it's often recommended to flash it to IT (Initiator Target) mode, if possible. IT mode effectively turns the RAID card into a simple HBA (Host Bus Adapter), allowing direct disk access without any RAID functionality—ideal for ZFS use.
- **System Configuration**: Ensure your BIOS/UEFI is set to AHCI mode (not RAID) unless you're using a dedicated RAID card for reasons outside of TrueNAS Scale's control (such as for booting a separate OS).

In summary, with TrueNAS Scale, the software (ZFS) replaces the need for traditional hardware RAID, offering direct disk management, superior data protection, and flexibility. This setup negates the need for RAID-enabled settings in the BIOS and often outperforms and provides better data integrity than hardware RAID solutions.