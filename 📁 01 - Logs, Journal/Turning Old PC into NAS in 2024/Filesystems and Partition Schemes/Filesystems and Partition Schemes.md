---
date created: Sunday, March 24th 2024, 1:15 pm
date modified: Sunday, March 24th 2024, 1:15 pm
---

### Top Layer: OS (Operating System)

- **File System**: This is where formats like exFAT, NTFS, or EXT4 come into play. It's a logical system that determines how files are named, stored, and organized on a drive. It's OS-dependent; for example, Windows commonly uses NTFS, while Linux might use EXT4.

### Middle Layer: OS Kernel & BIOS/UEFI

- **Kernel**: Part of the OS core that manages low-level tasks, including communication with hardware. It operates just above the hardware and facilitates the file system's interaction with physical storage devices.
- **BIOS/UEFI**: Basic Input/Output System or Unified Extensible Firmware Interface is firmware stored on a chip on the motherboard. It initializes hardware during the boot process before handing control to the operating system. It needs to recognize the storage device to start the boot process.

### Logical Partitioning and Formatting

- **MBR (Master Boot Record)** vs. **GPT (GUID Partition Table)**: These are partitioning schemes used to organize storage devices into distinct sections that can be managed independently. MBR is older and has limitations, such as a 2TB maximum disk size and a limit of four primary partitions. GPT is newer, supporting larger disks and virtually unlimited partitions. These schemes are crucial for an OS to recognize, access, and manage the partitions within a storage device.

### Physical Layer: Hardware

- **Motherboard & Connectors (e.g., PCIe, SATA)**: These are the physical connectors and buses that facilitate communication between the storage device and the rest of the computer. The choice between them affects the speed and manner of data transfer.
- **Storage Device (e.g., SSD, HDD)**: The actual physical device where data is stored. It operates under the instructions from higher layers (like the file system and partition table) to store data in a structured and retrievable manner.

### The Flow of Data and Detection

1. **BIOS/UEFI Detection**: At boot, the BIOS/UEFI identifies connected storage devices using its firmware. It looks for a bootable partition based on the partition table (MBR or GPT).
    
2. **Partition Table**: The BIOS/UEFI reads the storage device's partition table to understand its layout. GPT is preferred for modern systems for its advantages over MBR.
    
3. **OS Boot**: Once a bootable partition is identified, control is handed over to the OS stored on that partition. The OS then uses its kernel to interact with the storage device according to its file system (e.g., NTFS, exFAT).
    
4. **File System Operation**: The OS manages files and directories on the storage device using the file system's logic, making data accessible to applications and users.
    

In summary, the journey from OS to physical storage layers integrates logical structuring (like file systems and partition tables) with physical components (such as BIOS/UEFI, motherboard connectors, and the storage device itself). Each layer has a specific role in ensuring that data is stored, organized, and accessible in a manner that aligns with both software needs and hardware capabilities.