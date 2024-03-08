# Chapter 1: System Forensics, Investigation and Response

# What is Computer Forensics?

## What is Forensics?

- Simply using science to process evidence so you can establish facts of a case.
- Consistent without alteration of evidence
- A CAREFUL PROCESS

## Computer Forensics

- Really common
- Extraction of data from computing devices

## LEGAL is the biggest part

- Integrity and security of evidence is important
- Evidence needs to be relevant to the court of law

## Just about anything can retain data

- Computer forensics involves any computing device and therefore anything that can store data than can be used for case

# Computer Forensics Process

## Collection

- Can involve tons of systems or tools
- COLLECTION METHOD DETERMINES ADMISSIBILITY IN COURT

## Analysis

- Self-Explanatory
- Look at every detail
- Communicate well with legal people / lawyers to spend time well on certain pieces

## Presenting

- Expert Report
    - what tests you conducted, what you found, and your conclusions
    - NO REPORT = NO USE IN TRIAL
    - Fully supported conclusions
- Expert Testimony
    - Forensics specialist usually testify as expert witnesses

### Deposition

- Testimony taken from a witness or party to a case before a trial— is less formal, and is typically held in an attorney's office.  The other side's lawyer gets to ask you questions. In fact, the lawyer can even ask some questions that would probably be disallowed by a trial judge. But do remember, this is still sworn testimony, and lying under oath is a felony.
- Opposing Counsel goals:
    - find out as much as possible about:
        - your position, methods, conclusions, and even your side's legal strategy
        - • If you don't fully understand the question, say so. Ask for clarification before you answer.
        - • If you really don't know, say so. Do not ever guess.
        - • If you are not 100 percent certain of an answer, say so. Say "to the best of my current recollection" or something to that effect.

### Trial

- Remember that the opposing counsel, by definition, disagrees with you, and wants to trip you up.
- It might be helpful to remind yourself, "The opposing counsel's default position is that I am both incompetent and a liar." So don't be too upset if he or she is trying to make you look bad. It is not personal.

### In Both Cases

- Think of alternatives and counters they might use
- BE PREPARED

# Field of Digital Forensics

- Methods and standards are emerging - despite traditional lack thereof
- Used to be just law enforcement, but now there are lots of entities doing it:
    - Military - gather intel during military action
    - Government agencies - computer crimes, FBI, US Postal Inspection System, FTC, FDA, Secret Service, NIJ, NIST, OLES, Homeland Security, foreign governments, etc.
    - Law firms - law firms need forensics experts and their testimony for cases.  This can include civil cases too like with fraid, divorce, discrimination, and harassment
    - Criminal procedures - prosecutors use digital evidence when working with incriminating documents.
    - Academia - degrees for it
    - Data Recovery Firms - use forensics methods to recover data
    - Corporations - DF to assist in employee termination and prosecution. Insider threats.
    - Insurance companies - use DF for fraud in accidents, arson, and workers’ compensation cases
    - Individuals - hire forensic specialists in support of possible claims. Wrongful termination, sexual harassment, or age discrimination

## Digital Evidence

- Chain of custody and proving who had it when and how it’s transformed is SUPER IMPORTANT

### 4 types of evidence

1. Real evidence - physical object that someone can touch, hold, or directly observe.  
2. Documentary - data stored in a written manner. memory-resident data and computer files. Email, logs, databases, photographs, and telephone call-detail records.
3. Testimonial - used to support of interpret real or documentary evidence. Paired evidence.
4. Demostrative - helps explain other evidence.  Ex: chart that explains a technical concept to the judge and jury.

# **Scope-Related Challenges to System Forensics**

- The volume of data to be analyzed
- The complexity of the computer system
- The size and character of the crime scene, which might involve a network that crosses U.S. and foreign jurisdictions
- The size of the caseload and resource limitations

## **Types of Digital System Forensics Analysis**

Today, digital system forensics includes a number of specialties. The following are some examples:

- **[Disk forensics](http://viewer.books24x7.com/assetviewer.aspx?bkid=69813&destid=1060#1060)**—The process of acquiring and analyzing information stored on physical storage media, such as computer hard drives, smartphones, GPS systems, and removable media. **[Disk forensics](http://viewer.books24x7.com/assetviewer.aspx?bkid=69813&destid=1060#1060)** includes both the recovery of hidden and deleted information and the process of identifying who created a file or message.
- **[E-mail forensics](http://viewer.books24x7.com/assetviewer.aspx?bkid=69813&destid=1067#1067)**—The study of the source and content of e-mail as evidence. **[E-mail forensics](http://viewer.books24x7.com/assetviewer.aspx?bkid=69813&destid=1067#1067)** includes the process of identifying the sender, recipient, date, time, and origination location of an e-mail message. You can use e-mail forensics to identify harassment, discrimination, or unauthorized activities. There is also a body of laws that deal with retention and storage of e-mails that are specific to certain fields, such as financial and medical.
- **[Network forensics](http://viewer.books24x7.com/assetviewer.aspx?bkid=69813&destid=1119#1119)**—The process of examining network traffic, including trans-action logs and real-time monitoring using sniffers and tracing, is known as **[network forensics](http://viewer.books24x7.com/assetviewer.aspx?bkid=69813&destid=1119#1119)**.
- **[Internet forensics](http://viewer.books24x7.com/assetviewer.aspx?bkid=69813&destid=1093#1093)**—The process of piecing together where and when a user has been on the Internet. For example, you can use **[Internet forensics](http://viewer.books24x7.com/assetviewer.aspx?bkid=69813&destid=1093#1093)** to determine whether inappropriate Internet content access and downloading were accidental.
- **[Software forensics](http://viewer.books24x7.com/assetviewer.aspx?bkid=69813&destid=1141#1141)**—The process of examining malicious computer code is known as **[software forensics](http://viewer.books24x7.com/assetviewer.aspx?bkid=69813&destid=1141#1141)**, also known as malware forensics.
- **[Live system forensics](http://viewer.books24x7.com/assetviewer.aspx?bkid=69813&destid=1104#1104)**—The process of searching memory in real time, typically for working with compromised hosts or to identify system abuse, is **[live system forensics](http://viewer.books24x7.com/assetviewer.aspx?bkid=69813&destid=1104#1104)**. Each of these types of forensic analysis requires specialized skills and training.
- **[Cell-phone forensics](http://viewer.books24x7.com/assetviewer.aspx?bkid=69813&destid=1042#1042)**—The process of searching the contents of cell phones is called **[cell-phone forensics](http://viewer.books24x7.com/assetviewer.aspx?bkid=69813&destid=1042#1042)**. A few years ago, this was just not a big issue, but with the ubiquitous nature of cell phones today, cell-phone forensics is a very important topic. A cell phone can be a treasure trove of evidence. Modern cell phones are essentially computers with processors, memory, even hard drives and operating systems, and they operate on networks. Phone forensics also includes VoIP and traditional phones and may overlap the Foreign Intelligence Surveillance Act of 1978 (FISA), the USA Patriot Act, and the Communications Assistance to Law Enforcement Act (CALEA) in the United States.

### **General Guidelines**

Later in this chapter, you will read about specific federal guidelines, but you should keep a few general principles in mind when doing any forensic work, as discussed in the following sections.

### **Chain of Custody**

This is the most important principle in any forensic effort, digital or nondigital. The chain of physical custody must be maintained. From the time the evidence is first seized by a law enforcement officer or civilian investigator until the moment it is shown in court, the whereabouts and custody of the evidence, and how it was handled and stored and by whom, must be able to be shown at all times. Failure to maintain proper chain of custody can lead to evidence being excluded from trial.

### **Don't Touch the Suspect Drive**

One very important principle is to touch the system as little as possible. It is possible to make changes to the system in the process of examining it, which is very undesirable. Obviously, you have to interact with the system to investigate it. The answer is to make a forensic copy and work with that copy. You can make a forensic copy with most major forensic tools such as **AccessData's Forensic Toolkit or Guidance Software's EnCase.** There is also open source software that allows copying of original source information. To be specific, make a copy and analyze the copy.

### **Document Trail**

The next issue is documentation. The rule is that you document everything. Who was present when the device was seized? What was connected to the device or showing on the screen when you seized it? What specific tools and techniques did you use? Who had access to the evidence from the time of seizure until the time of trial? All of this must be documented. And when in doubt, err on the side of overdocumentation.

### **Secure the Evidence**

It is absolutely critical to the integrity of your investigation as well as to maintaining the chain of custody that you secure the evidence. It is common to have the forensic lab be a locked room with access given only to those who must enter. Then, evidence is usually secured in a safe, with access given out only on a need-to-know basis. You have to take every reasonable precaution to ensure that no one can tamper with the evidence.

# Knowledge Used in DF

## **Hardware**

In general, the good digital forensics examiners begin with a working knowledge of the hardware for the devices they want to examine. For PCs and laptops, this includes knowledge equivalent to the CompTIA A+ certification or a basic PC hardware course. If you are doing phone or router forensics, you need a similar level of knowledge of the hardware on those devices.

For PCs, this means a strong understanding of hard drives, memory, motherboards, and expansion cards. What exactly is a "strong understanding"? Think about random access memory (RAM). You are probably aware that RAM is **[volatile memory](http://viewer.books24x7.com/assetviewer.aspx?bkid=69813&destid=1169#1169)** and it stores the programs and data you currently have open, but only for as long as the computer has power supplied to it. However, that level of knowledge is inadequate for forensics. A forensic examiner needs to go much deeper and understand the various types of RAM, how they work, the type of information that is contained in each, and how the computer uses them.

### **Random Access Memory**

RAM can be examined in multiple ways. One way is to look at the method whereby information is written to and read from the RAM. These are presented in sequential order from older to newer technologies:

- **Extended data out dynamic random access memory (EDO DRAM)**—Single-cycle EDO has the ability to carry out a complete memory transaction in one clock cycle. Otherwise, each sequential RAM access within the same page takes two clock cycles instead of three, once the page has been selected.
- **Burst EDO (BEDO) DRAM**—An evolution of the EDO, burst EDO DRAM can process four memory addresses in one burst.
- **Asynchronous dynamic random access memory (ADRAM)**—ADRAM is not synchronized to the CPU clock.
- **Synchronous dynamic random access memory (SDRAM)**—SDRAM is a replacement for EDO.
- **Double data rate (DDR) SDRAM**—DDR SDRAM was a later development of SDRAM. DDR2 and DDR3 are now available.

SDRAM and, more specifically, DDR2 and DDR3, are the most common forms of RAM found in PCs and laptops.

Another way to look at RAM, one that is particularly important from a forensic point of view, is to consider the volatility of the data stored. Volatility refers to how easily the data can be changed, either intentionally or unintentionally:

- **Random access memory (RAM)**—This is what most people think of when they say *memory*. It is easy to write to and read from. This is very volatile. As soon as power is discontinued, the data is gone.
- **Read-only memory (ROM)**—As the name suggests, this is not at all volatile; it cannot be changed. This is usually used for instructions embedded in chips and controls how the computer, option cards, peripherals, and other devices operate.
- **Programmable read-only memory (PROM)**—PROM can be programmed only once. Data is not lost when power is removed.
- **Erasable programmable read-only memory (EPROM)**—Data is not lost when power is removed. Again, this is a technique for storing instructions on chips.
- **Electronically erasable programmable read-only memory (EEPROM)**—This is how the instructions in your computer's BIOS are stored.

### **Hard Drives**

A forensic specialist must also understand the following storage devices:

- **Small Computer System Interface (SCSI)**—This has been around for many years, and is particularly popular in high-end servers. This standard is actually fairly old, as it was established in 1986. SCSI devices must have a terminator at the end of the chain of devices to work and are limited to 16 chained devices.
- **Integrated Drive Electronics (IDE)**—This is an older standard but one that was commonly used on PCs for many years. It is obvious you are dealing with an IDE or EIDE drive if you encounter a 40-pin connector on the drive.
- **Enhanced Integrated Drive Electronics (EIDE)**—This is an extension/enhancement of IDE.
- **Parallel Advanced Technology Attachment (PATA)**—Parallel ATA is an enhancement of IDE. It uses either a 40-pin (like IDE) or 80-pin connector.
- **Serial Advanced Technology Attachment (SATA)**—This is what you are most likely to find today. These devices are commonly found in workstations and many servers. The internals of the hard drive are very similar to IDE and EIDE; it is the connectivity to the computer's motherboard that is different. Also, unlike IDE or EIDE drives, this type of drive has no jumpers to set the drive.
- **Serial SCSI**—This is an enhancement of SCSI. It supports up to 65,537 devices and does not require termination.
- **Solid-state drives**—These are becoming more common, so it's worthwhile to discuss them in a bit more detail. Solid-state drives (SSDs) use microchips that retain data in non-volatile memory chips and contain no moving parts. As of 2010, most SSDs use NAND-based flash memory, which retains memory even without power. NAND stands for "negated AND gate." Solid-state drives do not benefit from defragmentation. Any defragmentation process adds additional writes on the NAND flash, which already has a limited cycle life. High-performance flash-based SSDs generally require one-half to one-third the power of hard disk drives (HDDs); high-performance DRAM SSDs generally require as much power as HDDs and consume power when the rest of the system is shut down.

All of these, except for solid state, refer to how the hard drive connects to the motherboard and transfers data, and do not define how information is stored on the disk. For all but solid state, the following hard drive facts apply.

HDDs record data by magnetizing ferromagnetic material directionally, to represent either a 0 or a 1 binary digit. The magnetic data is stored on platters; the platters are organized on a spindle with a read/write head reading and writing data to and from the platters. The data is organized as follows:

- A *sector* is the basic unit of data storage on a hard disk, which is usually 512 bytes.
- A cluster is a logical grouping of sectors. Clusters can be 1 to 128 sectors in size. That means 512 bytes up to 64 KB. The minimum size a file can use is one cluster. If the file is less than the size of a cluster, the remaining space is simply unused.
- Sectors are in turn organized by tracks.

That is a basic description of most hard drives (with the exception of solid-state drives). Forensic examiners should know the following terms, which are used with all hard drives:

- **Drive geometry**—This term refers to the functional dimensions of a drive in terms of the number of heads, cylinders, and sectors per track.
- **[Slack space](http://viewer.books24x7.com/assetviewer.aspx?bkid=69813&destid=1137#1137)**—This is the space between the end of a file and the end of the cluster, assuming the file does not occupy the entire cluster. This is space that can be used to hide data.
- **Low-level format**—This creates a structure of sectors, tracks, and clusters.
- **High-level format**—This is the process of setting up an empty file system on the disk and installing a boot sector. This is sometimes referred to as a quick format.

## **Software**

Once you have a basic understanding of hardware, the next step is to learn about the software, and this begins with the operating system. It is imperative that you have a strong working knowledge of the operating system running on the device you want to examine.

### **Windows**

There's a lot to know about Windows, but for now, here's a basic overview of how it works. The heart of Windows is the Windows Registry. The Windows Registry is essentially a repository of all settings, software, and parameters for Windows. If new software is installed, the Registry is updated to indicate the new software. If the background color of the desktop is changed, the Registry is updated to indicate the new color. From this Registry, you can get all kinds of information, including the password for wireless networks and the serial numbers for all USB devices that have been connected to that computer. This is really the most important part of Windows from both a technical-support and a forensic point of view.

Windows also has other interesting places to look for forensic evidence. There are certain folders and files—the index.dat file, for instance—that are great places to find evidence. Even browser cookies and history can be useful. Given that Windows is such a common operating system, it is advisable to be very familiar with Windows.

### **Linux**

Linux is particularly interesting from a forensic point of view. Even though it is not as widely used as Windows, it is a favorite in the security and forensics community. You will find that a lot of free forensic tools come with Linux. In fact, one specific Linux distribution called BackTrack has an extensive collection of forensic, security, and hacking tools.

Linux is a UNIX clone, developed originally by Linus Torvalds. There are now well over 100 different distributions, or variations, of Linux. However, all have some commonalities. In the Linux world, work done from the command line, called the shell in Linux, is far more important than it is in Windows.

### **Macintosh**

For many years, Apple Macintosh was a complete operating system. However, beginning with OS X, the Macintosh system has been based on FreeBSD, a UNIX clone very similar to Linux. The graphical user interface is just that, an interface. The underlying operating system is a UNIX-like system.

This means that many forensic techniques you can use on Linux can also be used on Macintosh, from the shell prompt.

### **Files and File Systems**

Computers store discrete sets of related information in files. Any document, spreadsheet, picture, video, or even program is a file. It is a very easy thing to change the extension of a file so that it looks like some other type of file. However, that will not change the file structure itself. There are tools that allow viewing of the actual file structure and the file header. This is very important from a forensic perspective. The file header gives you an accurate understanding of the file, regardless of whether the extension has been changed. A few basic facts about files are as follows:

- File headers start at the first byte of a file.
- In graphics file formats, the header might give information about an image's size, resolution, number of colors, and the like.
- The Executable and Linkable Format (ELF, formerly called Extensible Linking Format) is a common standard file format for executables, object code, and shared libraries for UNIX-based systems.
- Portable Executable (PE) is used in Windows for executables and dynamic-link libraries (DLLs). PE files are derived from the earlier Common Object File Format (COFF) found on VAX/VMS, a common operating system for mainframe computers.
- Area density is the data per area of disk.
- Windows Office files have a globally unique identifier (GUID) to identify them.

Files are organized on the computer based on the file system. There are many file systems, but they can be divided into two categories. Journaling is basically the process whereby the file system keeps a record of what file transactions take place so that in the event of a hard drive crash, the files can be recovered. Journaling file systems are fault tolerant because the file system logs all changes to files, directories, or file structures. The log in which changes are recorded is referred to as the file systems journal—thus the term *journaling* file systems.

There are actually two types of journaling: physical and logical. With physical journaling, the system logs a copy of every block that is about to be written to the storage device, before it is written. The log also includes a checksum of those blocks, to make sure there is no error in writing the block. With logical journaling, only changes to file metadata are stored in the journal.

Here are some specific file systems:

- **File Allocation Table (FAT)**—This is an older system, which was popular with Microsoft operating systems for many years. FAT was first implemented in Microsoft Standalone Disk BASIC. FAT stores file locations by sector in a file called the file allocation table. This table contains information about which clusters are being used by which particular files and which clusters are free to be used. The various extensions of FAT, such as FAT16 and FAT32, differ in the number of bits available for filenames.
- **New Technology File System (NTFS)**—Microsoft eventually introduced a new file system to replace FAT. This file system is called New Technology File System (NTFS). This is the file system used by Windows NT 4, 2000, XP, Vista, 7, Server 2003, and Server 2008. One major improvement of NTFS over FAT was the increased volume sizes NTFS could support. The maximum NTFS volume size is 264 –1 clusters.
- **Extended file system**—This was the first file system created specifically for Linux. There have been many versions of EXT; the current version is 4. The EXT4 file system can support volumes with sizes up to 1 exabyte (1018 bytes, or 1 billion gigabytes) and files with sizes up to 16 terabytes. This is a huge file and volume size, and no current hard drives come even close to that volume size. For an administrator, one of the most exciting features of EXT4 is that it is backward compatible with EXT2 and EXT3, making it possible to mount drives that use those earlier versions of EXT.
- **ReiserFS**—This is a popular journaling file system, used primarily with Linux. ReiserFS was the first file system to be included with the standard Linux kernel, and first appeared in kernel version 2.4.1. Unlike some file systems, ReiserFS supported journaling from its inception, whereas EXT did not support journaling until version 3. ReiserFS is open source and was invented by Hans Reiser.
- **The Berkeley Fast File System**—This is also known as the UNIX file system. As its names suggest, it was developed at the University of California specifically for UNIX. Like many file systems, Berkeley uses a bitmap to track free clusters, indicating which clusters are available and which are not. Like EXT, Berkeley includes the FSCK utility. This is only one of many similarities between Berkeley and EXT. In fact, some sources consider EXT to just be a variant of the Berkeley Fast File System.

## **Networks**

Digital forensics, like all branches of cybersecurity, breaks information into two types. There is information at rest and information in motion. Information at rest includes anything that is stored inside the computer, including in the file system or memory. Information in motion is information being transmitted between endpoints and includes the protocols and other information needed for transmission. The transmission of information across networks and the network components used is a vast, quickly changing field. The modern forensic investigator, however, should be very familiar with the components and how they work as well as the protocols and their operation if information in motion is to be considered as a part of the investigator's skill set. The modern forensic analyst who will consider information in motion must also be very familiar with the concepts and operation of both the seven-layer Open Systems Interconnection (OSI) Reference Model and the five-layer Internet Engineering Task Force (IETF) model. If you lack this knowledge, you must acquire it before proceeding any further.

### **Addresses**

The digital forensics analyst must be aware of the way that computer information is addressed and the proper vocabulary for discussing the different types of addresses and units of information transfer. It is also important for the digital forensics analyst to under-stand that not all addresses are a part of every communication. If they are present, the addresses are part of a hierarchy and are placed, one within the other, like envelopes.

### **Physical Ports**

Physical ports are physical. You can touch them. Even a wireless physical port can be touched, although you must open the computer or other device to find the antenna first. The physical ports operate at OSI Layer 1, the Physical Layer. The units of information transfer are 1 and 0 bits grouped into fixed-length units called Layer 1 frames.

### **MAC Addresses**

In addition to the Physical Layer's units of information transfer, information being transmitted may be grouped into Layer 2 frames for transmission. Layer 1 frames are fixed in length, whereas Layer 2 frames are variable. Layer 2 frames have a header, a body, also known as a payload, and a trailer. The numeric address information contained in Layer 2 frames is the Media Access Control (MAC) address. The most common Layer 2 protocol is Ethernet, though there are many more.

A MAC address is supposed to be unique, is supposed to be tied to one and only one physical port, and is not supposed to be duplicated or reused for any reason. This just is not so. Duplication of MAC addresses can occur due to bad quality control or can be done intentionally for a variety of malicious reasons. The keen forensic investigator will never be fooled by duplicate MAC addresses.

### **IP Addresses**

In addition to the Physical Layer's fixed-length Layer 1 frames, which use physical port addresses to carry the variable-length Layer 2 frame to its destination, are the contents, or payload, of the Layer 2 frame, which is the Layer 3 packet. The Layer 3 packet is variable in length and contains a header and payload. The most common protocol used at Layer 3 is IP; therefore, the entire transmission unit containing all of this information is usually called an IP packet.

### **Logical Port Numbers**

Inside the fixed-length unit called a Layer 1 frame, sent to its destination by use of a physical address, is a variable-length unit called a Layer 2 frame, addressed with a MAC address and used to deliver a Layer 3 packet. This is addressed by the Layer 3 protocol, usually IP. Inside of the IP packet's payload is another unit that is either formatted by the rules of the Transmission Control Protocol (TCP) or the User Datagram Protocol (UDP). If the information is formatted per TCP rules, the unit is called a segment; if the information is formatted per the rules of UDP, it is called a datagram. In either case, the protocol uses one of three types of port numbers. It is not good that there are Layer 1 fixed-length frames and Layer 2 variable-length frames. It is equally bad that there are Layer 1 physical port numbers and Layer 5 logical port numbers. But there are. To keep things straight, it is best to talk about physical port numbers for Layer 1 and software port numbers for Layer 5.

### **Socket Numbers**

Socket number is another important term. It is used by software programmers as well as by computer technicians and digital forensics specialists. A socket number is the concatenation of the IP address and the TCP or UDP port number and should be unique to a connection at a single moment in time. Lacking a uniform resource locator (URL), which is discussed next, a socket number can be typed directly into a browser. For instance, if you want to contact the server located at IP address 54.32.57.67 and communicate directly with its public Web service on well-known port number 80, you would type 54.32.57.67:80 directly into the Web browser.

### **Uniform Resource Locators**

As the Internet grew and the number of servers and their IP addresses grew, the Domain Name System (DNS) was created to allow Internet users to type a name instead of an IP address. This level of simplification is great, but it introduces a number of potential forensic issues. Issues range from changing the mapping of Web site name to IP address permanently or temporarily and many different forms of this that can be used to redirect browsers incorrectly and befuddle forensic efforts.

### **Addressing Review**

In a complete, end-to-end Internet communication, it is most common that user information, such as e-mail text, would be formatted as specified by the e-mail protocol. A URL would then be used to find the actual IP address of the recipient. The message would be formatted per the TCP protocol and sent with the proper TCP port number set to the IP addresses. The IP packet containing all of this would be put into a special envelope built per the protocol rules of Ethernet, which would make its way onto the actual wire, or go across the wireless or optical connection on its way through the cloud to its destination. At the destination, the process would be done in reverse and the e-mail, or at least a part of it, would have gotten through to its destination.

### **Basic Network Utilities**

You can execute some basic network utilities from a command prompt (Windows) or from a shell (UNIX/Linux). This text's discussion executes the commands and discusses them from the Windows command-prompt perspective; however, it must be stressed that these utilities are available in all operating systems. This section covers the ipconfig, ping, and tracert utilities.

### **Working with Ipconfig.**

The first thing you need to do is to get information about your own system. To accomplish this fact-finding mission, you need to get to a command prompt. In Windows XP, you do this by going to the Start menu and then selecting All Programs > Accessories > Command Prompt. For other versions of Windows, the process is identical, except the first option is called simply Programs rather than All Programs. Now you can type in ipconfig. You could input the same command in UNIX or Linux by typing in ifconfig from the shell. After typing in ipconfig—ifconfig in Linux—you should see something similar to what is shown in [Figure 1-2](https://viewer.books24x7.com/assetviewer.aspx?bookid=69813&chunkid=204569843#).

# **The Daubert Standard**

Standard used by a trial judge to make a preliminary assessment of whether an expert's scientific testimony is based on reasoning or methodology that is scientifically valid and can properly be applied to the facts at issue. Under this standard, the factors that may be considered in determining whether the methodology is valid are: 

(1) whether the theory or technique in question can be and has been tested; 

(2) whether it has been subjected to peer review and publication; 

(3) its known or potential error rate; 

(4) the existence and maintenance of standards controlling its operation; and 

(5) whether it has attracted widespread acceptance within a relevant scientific community.

## Takeaways

- Evidence has to be reviewed and tested by a relevant community
- Tools, techniques, or processes should be widely accepted in the computer forensics community.
    - Dont’ make up new tests or procedures.
- If you make a new tool, then have some people in the forensics community test it first

# Laws in Forensics

### **U.S. Laws Affecting Digital Forensics**

Some jurisdictions have passed laws that require the investigator to be either a **law enforcement officer or a licensed private investigator** to extract the evidence.

- Does not prevent a forensic investigator from working with information someone else extracted or extracting evidence if the information owner gave his or her permission.
- It is important to be aware of the legal requirements in the jurisdiction in which you work.

### **The Federal Privacy Act of 1974**

The Privacy Act of 1974 establishes a code of information-handling practices that governs the collection, maintenance, use, and dissemination of information about individuals that is maintained in systems of records by U.S. federal agencies. A system of records is a group of records under the control of an agency from which information is retrieved by the name of the individual or by some identifier assigned to the individual.

### **The Privacy Protection Act of 1980**

The Privacy Protection Act (PPA) of 1980 protects journalists from being required to turn over to law enforcement any work product and documentary materials, including sources, before it is disseminated to the public. Journalists who most need the protection of the PPA are those who are working on stories that are highly controversial or about criminal acts because the information gathered may also be useful to law enforcement.

- Journalists are not required to turn over info to law enforcement - work product, documentary materials, sources - before being disseminated to the public

### **The Communications Assistance to Law Enforcement Act of 1994**

The Communications Assistance to Law Enforcement Act of 1994 is a federal wiretap law for traditional wired telephony. It was expanded to include wireless, voice over packet, and other forms of electronic communications, including signaling traffic and metadata.

### **The Electronic Communications Privacy Act of 1986**

The Electronic Communications Privacy Act of 1986 governs the privacy and disclosure, access, and interception of content and traffic data related to electronic communications.

### **The Computer Security Act of 1987**

The Computer Security Act of 1987 was passed to improve the security and privacy of sensitive information in federal computer systems. The law requires the establishment of minimum acceptable security practices, creation of computer security plans, and training of system users or owners of facilities that house sensitive information.

### **The Foreign Intelligence Surveillance Act of 1978**

The Foreign Intelligence Surveillance Act of 1978 (FISA) is a law that allows for collection of "foreign intelligence information" between foreign powers and agents of foreign powers using physical and electronic surveillance. A warrant is issued by the FISA court for actions under FISA.

### **The Child Protection and Sexual Predator Punishment Act of 1998**

The Child Protection and Sexual Predator Punishment Act of 1998 requires service providers that become aware of the storage or transmission of child pornography to report it to law enforcement.

- Service providers must report storage or transmission of child pornography

### **The Children's Online Privacy Protection Act of 1998**

The Children's Online Privacy Protection Act of 1998 (COPPA) protects children 13 years of age and under from the collection and use of their personal information by Web sites. It is noteworthy that COPPA replaces the Child Online Protection Act of 1988 (COPA), which was determined to be unconstitutional.

- Websites CANNOT collect children personal information under 13 years

### **The Communications Decency Act of 1996**

The Communications Decency Act of 1996 was designed to protect persons 18 years of age and under from downloading or viewing material considered indecent. This act has been subject to court cases that subsequently changed some definitions and penalties.

- Protects 18 and under from easily downloading or viewing material considered indecent

### **The Telecommunications Act of 1996**

The Telecommunications Act of 1996 includes many provisions relative to the privacy and disclosure of information in motion through and across telephony and computer networks.

### **The Wireless Communications and Public Safety Act of 1999**

The Wireless Communications and Public Safety Act of 1999 allows for collection and use of "empty" communications, which means nonverbal and nontext communications, such as GPS information.

### **The USA Patriot Act**

The USA Patriot Act is the primary law under which a wide variety of Internet and communications information content and metadata is currently collected. Provisions exist within the Patriot Act to protect the identity and privacy of U.S. citizens.

- Protect identity of citizens for mass surveillance until search warrant from court provisioned for super suspicious activities

### **The Sarbanes-Oxley Act of 2002**

The Sarbanes-Oxley Act of 2002 contains many provisions about recordkeeping and destruction of electronic records relating to the management and operation of publicly held companies.

### **Warrants**

- Seizure of property includes communications and intangible objects
- If it doesn’t violate a person’s reasonable expectation of privacy, then no warrant needed
- TWO BIG QUESTIONS:
    - when does search exceed scope of consent?
    - who is the proper party to consent to search?

According to the Supreme Court, a "seizure of property occurs when there is some meaningful interference with an individual's possessory interests in that property" (United States v. Jacobsen, 466 U.S. 109, 113 [1984]). The Court also characterized the interception of intangible communications as a seizure, in the case of Berger v. New York (388 U.S. 41, 59–60 [1967]). Now that means that law enforcement need not take property in order for it to be considered seizure. Merely interfering with an individual's access to his or her own property constitutes seizure. Berger v. New York extends that to communications. If law enforcement's conduct does not violate a person's "reasonable expectation of privacy," then formally it does not constitute a Fourth Amendment "search" and no warrant is required. There have been many cases where the issue of reasonable expectation of privacy has been argued. To use an example that is quite clear, if you save a message in an electronic diary, you clearly have a reasonable expectation of privacy; however, if you post such a message on a public bulletin board, you can have no expec-tation of privacy. In less clear cases, a general rule is that courts have held that law enforcement officers are prohibited from accessing and viewing information stored in a computer if it would be prohibited from opening a closed container and examining its contents in the same situation.

In computer crime cases, two consent issues arise particularly often. First, when does a search exceed the scope of consent? For example, when a person agrees to the search of a location, such as his or her apartment, does that consent authorize the retrieval of information stored in computers at the location? Second, who is the proper party to consent to a search? Can roommates, friends, and parents legally grant consent to a search of another person's computer files? These are all very critical questions that must be considered when searching a computer. In general, courts have held that only the actual owner of a property can grant consent. For example, a parent of a minor child can grant consent to search the child's living quarters and computers. However, a roommate who shares rent can grant consent to search only living quarters and computers co-owned by both parties. A roommate cannot grant consent to search the private property of the other person.

# **Federal Guidelines**

If you are setting up a forensic lab, or if you are new to forensics, a good place to start is the federal guidelines. Two agencies in particular—the FBI and the Secret Service— are particularly important.

### **The FBI**

If an incident occurs, the FBI recommends that the first responder preserve the state of the computer at the time of the incident by making a backup copy of any logs, any damaged or altered files, and any other files modified, viewed, or left by the intruder. This last part is critical. Hackers frequently use various tools and may leave traces of their presence. Furthermore, the FBI advises that if the incident is in progress, you should activate any auditing or recording software you might have available. Collect as much data about the incident as you can. In other words, this might be a case where you do not take the machine offline, but rather analyze the attack in progress.

The FBI computer forensics guidelines stress the importance of securing any evidence. They further stress that computer evidence can come in many forms. Here are a few common forms:

- Hard drives
- System logs
- Portable storage, such as USB drives and external drives
- Router logs
- E-mails
- Chat room logs
- Cell phones
- SIM cards for cell phones
- Logs from security devices, such as firewalls and intrusion detection systems
- Databases and database logs

What you secure will be dependent upon the nature of the cybercrime. For example, in the case of child predators, online stalkers, or online fraud, e-mail may be very important, but router logs may be irrelevant. The FBI also stresses that you should work with a copy of the hard drive, not the original.

The FBI has a cybercrimes Web page, which is a very useful resource for learning more about trends in cybercrime and in computer forensics.

### **The Secret Service**

The United States Secret Service is the premier federal agency tasked with combating cybercrime. It has a Web site devoted to computer forensics that includes forensic courses. These courses are usually for law enforcement personnel.

**FYI** 
Since 9/11, the U.S. Secret Service has been tasked with taking the lead in U.S. cybercrime efforts. There are electronic crime task force centers set up in several major cities, including Atlanta, Baltimore, Birmingham, Boston, Buffalo, Chicago, Dallas, Houston, and San Francisco. These electronic crime task force centers cooperate with other law enforcement agencies, including local police departments, in computer crime investigations.

The Secret Service also has released a guide for first responders to computer crime. The agency has listed its "golden rules" to begin the investigation. They are as follows:

- Officer safety: Secure the scene and make it safe.
- If you reasonably believe that the computer is involved in the crime you are investigating, take immediate steps to preserve the evidence.
- Determine whether you have a legal basis to seize the computer, such as plain view, search warrant, or consent.
- Do not access any computer files. If the computer is off, leave it off.
- If it is on, do not start searching through the computer. Instead, properly shut down the computer and prepare it for transport as evidence.
- If you reasonably believe that the computer is destroying evidence, immediately shut down the computer by pulling the power cord from the back of the computer.
- If a camera is available, and the computer is on, take pictures of the computer screen. If the computer is off, take pictures of the computer, the location of the computer, and any electronic media attached.
- Determine whether special legal or privacy considerations apply, such as those for doctors, attorneys, clergy, psychiatrists, newspapers, or publishers.

These are all important first steps to both preserving the chain of custody and ensuring the integrity of the investigation from the very first step.

### **The Regional Computer Forensics Laboratory Program**

The Regional Computer Forensics Laboratory (RCFL) Program is a national network of forensic laboratories and training centers. The FBI provides startup and operational funding, training, staff, and equipment to the program. State, local, and other federal law enforcement agencies assign personnel to staff RCFL facilities.

Each of the 16 RCFLs examines digital evidence in support of criminal and national security investigations. The RCFL Program provides law enforcement at all levels with digital forensics expertise. It works with a wide variety of investigations, including terrorism, child pornography, fraud, and homicide.

The RCFL Program conducts digital forensics training. In 2008, for example, the program trained nearly 5,000 law enforcement personnel in system forensics tools and techniques. For more information, see *[http://www.rcfl.gov](http://www.rcfl.gov/)*.