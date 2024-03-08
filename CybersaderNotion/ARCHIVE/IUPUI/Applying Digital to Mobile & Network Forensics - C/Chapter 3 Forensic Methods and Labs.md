# Chapter 3: Forensic Methods and Labs

In this chapter, you will learn some specific approaches to forensic investigation. These methodologies provide a framework for your investigations. You will also learn the requirements for setting up a computer forensics lab. Finally, you will get a brief introduction to major computer forensics software.

### **[Chapter 3](https://viewer.books24x7.com/assetviewer.aspx?bookid=69813&chunkid=188809335#) Topics**

This chapter covers the following topics and concepts:

- What the methodologies used in forensic investigations are
- What the formal forensic approaches are
- What the proper documentation of methodologies and findings is
- What evidence-handling tasks are
- How to set up a forensic lab
- What the common forensic software programs are
- What the common forensic certifications are

### **Forensic Methodologies**

You will learn very specific techniques for computer forensics; however, it is important that you have a general framework for approaching forensics. This section examines general principles and specific methodologies you can apply to your own forensic investigations. First, here are some basic principles to consider.

### **Handle Original Data as Little as Possible**

A forensic specialist should touch the original data as little as possible. Instead, information should be copied prior to examination. This means that the first step in any investigation is to make a copy of the suspected storage device. In the case of computer hard drives, you make a complete copy. That means a bit-level copy. Tools like EnCase and Forensic Toolkit will do this for you; it is also possible to do this with basic Linux commands. In addition, it is a common practice to make two copies of the drive. This gives you one to work with and a backup in the event you need it.

The idea of handling original information as little as possible is a critical philosophy that should permeate your approach to forensics. But the real question is, why? Why is it so important that you not touch the actual original evidence any more than you have to? The first answer to that question is that each time you touch digital information, there is some chance of altering it. Even such a simple thing as changing the time/date stamp on a file is altering it. And if you alter the file, you cannot be certain that the evidence you find is valid.

Another reason is that there may be a need for another investigator to do his or her own examination. If you have worked with the original information, you may have altered it so that another person cannot now do a fresh analysis. There are many situations in which another examiner will need to review the original information. The most obvious situation is when the opposing counsel hires his or her own expert who wants to do his or her own examination.

### **Comply with the Rules of Evidence**

During an investigation, a forensic specialist should keep in mind the relevant rules of evidence. The chain of custody and the Daubert standard, for instance, are just two of these that you must follow.

**[Rules of evidence](http://viewer.books24x7.com/assetviewer.aspx?bkid=69813&destid=1133#1133)** govern whether, when, how, and why proof of a legal case can be placed before a judge or jury. A forensic specialist should have a good understanding of the rules of evidence in the given type of court and jurisdiction.

As one example, the Federal Rules of Evidence (FRE) is a code of evidence law. The FRE governs the admission of facts by which parties in the U.S. federal court system may prove their cases. The FRE provides guidelines for the authentication and identification of evidence for admissibility under rules 901 and 902. The following is an excerpt from rule 901 of the FRE from Cornell University Law School (2011) with the portions relevant to computer forensics shown:

1. **In General.** To satisfy the requirement of authenticating or identifying an item of evidence, the proponent must produce evidence sufficient to support a finding that the item is what the proponent claims it is.…
    1. **Testimony of a Witness with Knowledge.** Testimony that an item is what it is claimed to be.…
    2. **Comparison by an Expert Witness or the Trier of Fact.** A comparison with an authenticated specimen by an expert witness or the trier of fact.…
    3. **Evidence About a Process or System.** Evidence describing a process or system and showing that it produces an accurate result.

Item 1 refers to expert testimony. You as a forensic examiner may be called upon to authenticate evidence. Item 3 refers to a comparison between a given specimen and another item. This can be used to authenticate evidence. Item 9 is critical for computer forensics. Even if you use automated tools such as EnCase from Guidance Software or Forensic Toolkit from AccessData, you should understand how the tools work in detail so you can authenticate the process if need be.

Individual jurisdictions may have some additional rules particular to that jurisdiction. It is critical that you be aware of the rules in your jurisdiction as well as general rules of evidence.

### **Avoid Exceeding Your Knowledge**

A forensic specialist should not undertake an examination that is beyond his or her current level of knowledge and skill. This might seem obvious, but it is a problem that you can observe not just in forensics, but in the IT industry in general. Most other professions are more than happy to refer a client to a specialist. For example, if you see your family doctor and she discovers an anomaly regarding your heart, she will refer you to a cardiologist. Certainly she studied cardiology in medical school, but she will still send you to someone who specializes in cardiology. However, IT professionals all too often believe that if they have a little knowledge, that is enough to proceed.

**FYI** 
In the field of forensics, your reputation is the most important thing you have. If you overextend beyond your actual skills, it is likely to come out at trial. The opposing side might have experts advising them. And when the other side's attorney cross-examines you and your lack of knowledge becomes apparent, your reputation will be damaged. Consider adopting this standard: Never testify or write an expert report unless you are very sure of your expertise in the relevant technologies and very comfortable with the conclusions you are presenting. Even one occasion of being found to have been exaggerating, fabricating, or overextending yourself during testimony can ruin your reputation and your career.

This can be very problematic in forensics. Suppose you are a very skilled forensic examiner, and you have extensive experience with Microsoft Windows and Linux. But a computer is brought to you that runs Mac OS X. Now it is very likely that your skills would allow you to extract data. And it is true that OS X is based on a Linux-like system (FreeBSD). But is that enough? Very likely it is not. It is very likely that if you insist on doing the investigation yourself, you may miss key evidence or, at the very least, the opposition's attorney can claim in court that you have.

These basic principles should guide your forensic investigation. These are not specific procedures, but rather general philosophical approaches to investigation.

### **Create an Analysis Plan**

Before you begin any forensic examination, you should have an analysis plan. This plan is a guide for your work. How will you gather evidence? Are there concerns about evidence being changed or destroyed? What tools are most appropriate for this specific investigation? Is this a federal or state case? Will this affect admissibility rules? You should address all of these issues in your data analysis plan. It is advisable to have a standard data analysis plan that you simply customize for specific situations.

**Creating an Order of Volatility**
Much of the evidence on a system does not last very long. Some evidence resides in storage that requires a consistent power supply. *Volatility* refers to how easy it is for data to change. Registers are very volatile, whereas a CD-ROM is not. Other evidence might sit in media locations that are continuously changing. You must start with collecting the most volatile evidence and proceed to the least volatile. To determine what evidence to collect first, draw up an order of volatility—a list of evidence sources ordered by their relative volatility. The following is an example of an order of volatility:
1. Registers and cache
2. Routing tables
3. ARP cache
4. Process table
5. Kernel statistics and modules
6. Main memory
7. Temporary file systems
8. Secondary memory
9. Router configuration
10. Network topology

### **Technical Information Collection Considerations**

System forensics specialists must keep in mind three main technical data collection considerations. These are understanding the life span of information, collecting information quickly, and collecting bit-level information.

### **Considering the Life Span of Information**

In planning collection efforts, a forensic specialist must be aware that information has a life span. **[Life span](http://viewer.books24x7.com/assetviewer.aspx?bkid=69813&destid=1102#1102)** refers to how long information is valid. The term is related to volatility. More volatile information tends to have a shorter life span. The nature of the information as well as organizational policies and practices determine the information's life span. For example, data regarding network traffic and the messages themselves may exist only for the time the transmission is passing through a router. This may be only milliseconds. Information stored in computer memory may have a life span of a millisecond.

As information life spans increase, the life span determinant is typically related to organizational practice. For example, an organization may establish a policy that an e-mail message may be stored within the e-mail system for only 30 days. After 30 days, any message that is not moved to alternate storage is deleted. Log files may be retained for months or years, in accordance with an organization's audit policy. Finance and accounting information may have a multiple-year life span that corresponds with requirements established by state or federal governments.

In planning a collection effort, forensic specialists must be aware of the life span of the information with which they are working. They must use collection techniques appropriate to the information's life span.

### **Collecting Information Quickly**

Once the collection effort is announced or in process, it is important to collect the evidence as quickly as possible. It is frequently not possible or practical to determine who made a change or when. In addition, the target of an investigation may try to conceal information, which further obscures changes. Networking systems also increase the potential for unauthorized changes. The person making a change on a network does not have to be local to the device on which the information is stored.

### **Collecting Bit-Level Information**

To be useful, 1 and 0 bits must be converted through hardware and software into text, pictures, screen displays, videos, audio, or other usable formats. Investigators also look for whether unrelated bits were inserted, such as trade secrets buried within other files. Forensic specialists must therefore have tools that allow manipulation and evaluation of bit-level information. Use of bit-level tools also enables an investigator to reconstruct file fragments if files have been deleted or overwritten.

Basically, **[bit-level information](http://viewer.books24x7.com/assetviewer.aspx?bkid=69813&destid=1033#1033)** is information at the level of actual 1s and 0s stored in memory or on the storage device, as opposed to going through the file system's interpretation. Whatever operating system is being used simply shows its representation of the data. Going to a bit-level view gives the most accurate view of how the information is actually stored on the hardware. If you use the file system to copy a suspect drive, you probably won't get slack space or hidden partitions. But you will get those items with a bit-level copy.

### **Formal Forensic Approaches**

Several organizations have established formal guidelines for approaching a forensic investigation. You should become familiar with these guidelines. Depending on your work environment, you might implement one of these or use one of these as a base and adjust it to your own plan.

### **DoD Forensic Standards**

The U.S. Department of Defense (DoD) coordinates and supervises agencies and functions of the government related to national security and the U.S. armed forces. The DoD uses system forensics to evaluate and examine data related to cyberattacks. The DoD estimates the potential impact of malicious activity. It also assesses the intent and identity of perpetrators. The DoD Cyber Crime Center (DC3) sets standards for digital evidence processing, analysis, and diagnostics. It is involved with DoD investigations that require computer forensics support to detect, enhance, or recover digital media. DC3 is also involved in criminal law enforcement forensics and counterintelligence. It assists in criminal, counterintelligence, counterterrorism, and fraud investigations. In addition, it supports safety investigations, commander-directed inquiries, and inspector-general investigations.

DC3 provides computer investigation training. It trains forensic examiners, investigators, system administrators, and others. It also ensures that defense information systems are secure from unauthorized use, criminal and fraudulent activities, and foreign intelligence service exploitation. DC3 partners with government, academic, and private industry computer security officials.

For more information on DC3, see *[http://www.dc3.mil](http://www.dc3.mil/)*.

### **The DFRWS Framework**

The Digital Forensic Research Workshop (DFRWS) is a nonprofit volunteer organization. Its goal is to enhance the sharing of knowledge and ideas about digital forensics research.

DFRWS sponsors annual conferences, technical working groups, and challenges to help drive the direction of research and development. In 2001, the DFRWS developed a framework for digital investigation that is still useful. The DFRWS framework is a matrix with six classes:

- Identification
- Preservation
- Collection
- Examination
- Analysis
- Presentation

**FYI** 
Although all forensic methodologies and texts recommend you make a copy of the suspect drive to work with, you may want to consider actually making two copies—each with a different imaging tool. Then, if time permits, use different tools on each copy. If both copies, made with different tools and examined with different tools, yield the same evidentiary results, that is a very powerful indication that the evidence is accurate. It would be exceedingly difficult for opposing counsel to find an issue with your examination.

### **An Event-Based Digital Forensics Investigation Framework**

In 2004, Brian Carrier and Eugene Spafford, researchers at the Center for Education and Research in Information Assurance and Security (CERIAS) at Purdue University, proposed a model that is more intuitive and flexible than the DFRWS framework.

This model has five primary phases, each of which may contain additional subphases. The primary phases are the Readiness phase, the Deployment phase, the Physical Crime Scene Investigation phase, the Digital Crime Scene Investigation phase, and the Presentation phase. The Readiness phase contains the Operations Readiness subphase, which involves training people and testing investigation tools, and the Infrastructure Readiness subphase, which involves configuring the equipment. The Deployment phase includes the Detection and Notification subphase, in which someone detects an incident and alerts investigators, and the Confirmation and Authorization subphase, in which investigators receive authorization to conduct the investigation.

### **Documentation of Methodologies and Findings**

Documentation of forensic processing methodologies and findings is critical. Without proper documentation, a forensic specialist has difficulty presenting findings. When security or audit findings become the object of a lawsuit or a criminal investigation, the legal system requires proper documentation. Without documentation, courts are unlikely to accept investigative results. Thus, a system forensics specialist must know the ins and outs of computer evidence processing methodology. This methodology includes strong evidence-processing documentation and good chain-of-custody procedures.

### **Disk Structure**

A system forensics specialist should have a good understanding of how computer hard disks and compact discs (CDs) are structured. A specialist should also know how to find data hidden in obscure places on CDs and hard disk drives.

### **File Slack Searching**

A system forensics specialist should understand techniques and automated tools used to capture and evaluate file slack. A hard disk or CD is segmented into clusters of a particular size. Each cluster can hold only a single file or part of a single file. If you write a 1-kilobyte (KB) file to a disk that has a cluster size of 4 KB, the last 3 KB of the cluster are wasted. This unused space between the logical end of file and the physical end of file is known as **[file slack](http://viewer.books24x7.com/assetviewer.aspx?bkid=69813&destid=1074#1074)** or **[slack space](http://viewer.books24x7.com/assetviewer.aspx?bkid=69813&destid=1137#1137)**.

Most computer users have no idea that they're creating slack space as they use a computer. In addition, pieces of a file may remain even after you delete it. This residual information in file slack is not necessarily overwritten when you create a new file. File slack is therefore a source of potential security leaks involving passwords, network logons, e-mail, database entries, images, and word processing documents. A forensic specialist should know how to search file slack, identify what is and is not useful information, and document any findings.

### **Evidence-Handling Tasks**

A system forensics specialist has three basic tasks related to handling evidence:

- **Find evidence**—Gathering computer evidence goes beyond normal data recovery. Finding and isolating evidence to prove or disprove allegations can be difficult. Investigators may need to investigate thousands of active files and fragments of deleted files to find just one that makes a case. System forensics has therefore been described as looking for one needle in a mountain of needles. Examiners often work in secure laboratories where they check for viruses in suspect machines and isolate data to avoid contamination.
- **Preserve evidence**—Preserving computer evidence is important because data can be destroyed easily. The 1s and 0s that make up data can be hidden and vanish instantly with the push of a button. As a result, forensic examiners should assume that every computer has been rigged to destroy evidence. They must proceed with care in handling computers and storage media.
- **Prepare evidence**—Evidence must be able to withstand judicial scrutiny. Therefore, preparing evidence requires patience and thorough documentation. Failing to document where evidence comes from and failing to ensure that it has not been changed can ruin a case. Judges have dismissed cases because of such failures.

### **Evidence-Gathering Measures**

Here are principles to use when you gather evidence:

- **Avoid changing the evidence**—Photograph equipment in place as you find it before you remove it. Label wires and sockets so that you can put everything back as it was once you get computers and other equipment into your lab. Transport items carefully, and avoid touching hard disks or CDs. Make exact bit-by-bit copies and store them on a medium such as a write-once CD.
- **Determine when evidence was created**—You should create timelines of computer usage and file accesses. This can be difficult, because there are so many ways to falsify data. But timelines can make or break a case.
- **Trust only physical evidence**—The 1s and 0s of data are recorded at the physical level of magnetic materials. This is what counts in system forensics. Other items may be corrupt.
- **Search throughout a device**—You need to search at this level of 1s and 0s across a wide range of areas inside a computer.
- **Present the evidence well**—Forensic examiners must present computer evidence in a logical, compelling, and persuasive manner. A jury must be able to understand the evidence. In addition, the evidence should be solid enough that a defense counsel cannot rebut it.

### **Expert Reports**

An expert report is a formal document that details the expert's findings. Often this is filed in a case prior to trial. If there are depositions, then the expert report will probably be used as the basis for some questions you are asked during deposition. When writing an expert report, you should consider several issues.

The first issue is the format of the report. You usually list all items, documents, and evidence you considered. You also detail tests you performed, analysis done, and your conclusion. You should list your entire curriculum vitae (CV)—an extensive document detailing your experience and qualifications for a position—in an appendix. Keep in mind that a CV is much more thorough than a résumé. You should list every publication, award, or credential you have earned. A CV should also include more detail on work history and educational history.

Another issue for your report is thoroughness. In most jurisdictions, if it is not in your report, you are not allowed to testify about it at trial. So be very thorough. Anything you leave out may become a problem at trial. It is critical that you be detailed in what you write and that you document all the analysis done. For example, if you performed three tests and all three support a specific conclusion, make sure you list all three tests. If you list just one, then that is the only test you can testify about at trial.

Finally, back up everything you say. Clearly, you are an expert in forensics or else you would not be asked to testify. But remember that there is an opposing counsel whose job it is to disagree with you. The opposing counsel may have his or her own expert who will testify to different conclusions. It's good to have at least three well-respected references to support any important claims you make. This way, it is not just your opinion, but rather your opinion along with the support of multiple credible sources.

### **How to Set Up a Forensic Lab**

The detailed specifics of any given lab are based on the needs of the lab, the budget, and the types of cases that lab is likely to handle. A state law enforcement agency with a high volume of cases has different needs from a small forensic lab that deals only with civil matters. However, some general principles apply to all labs.

### **Equipment**

First and foremost, you must have adequate equipment for the job. Among other things, this means adequate storage for the data. Remember, you might analyze a system, but it could be months before the case goes to trial. A server with the most storage you can afford is in order. And that server must have redundancy. It should have a bare minimum of RAID 1 (disk mirroring), but RAID 5 is recommended. And it should be backed up at least once per day. It is likely you will need multiple servers to accommodate your storage needs.

You also need a variety of computers capable of attaching various types of drives— for example, external universal serial bus (USB), internal Small Computer System Interface (SCSI), Enhanced Integrated Drive Electronics (EIDE), and Serial Advanced Technology Attachment (SATA) drives. The exact number depends on the workload expected for the lab. You should also have power connectors for all types of smartphones, laptops, routers, and other devices.

### **Security**

Security is paramount for forensics. First and foremost, the machines being examined should not be connected to the Internet. You can have a lab network that is not attached to the Internet and is separate from your working network where you check e-mail and use the Internet. It is also important to have the lab in a room that is shielded from any electromagnetic interference. This means that cellular and wireless signals cannot penetrate the room housing the lab.

After you have established network and electronic security, physical security is the next concern. It is imperative to limit access to the lab. Allow only people with a legitimate need to enter the lab. It is recommended that the lab entrance have some sort of electronic method of recording who enters and when they enter. Swipe-card access is ideal for this. Furthermore, the room itself should be difficult to forcibly access. That means the windows and doors are very secure and would be extremely difficult to force open.

The lab also requires the means to secure evidence when it is not being used. An evidence safe is the best way to do this. The safe should be highly fire resistant as well, so that in case of fire the evidence is preserved.

In addition to the general guidelines already listed, you should consider various standards that exist.

### **American Society of Crime Laboratory Directors**

The American Society of Crime Laboratory Directors (ASCLD) provides guidelines for managing a forensic lab. It also provides guidelines for acquiring crime lab and forensic lab certification. The ASCLD offers voluntary accreditation to public and private crime laboratories in the United States and around the world. It certifies computer forensics labs that analyze digital evidence and other criminal evidence, such as fingerprints and DNA samples. The ASCLD/LAB certification regulates how to organize and manage crime labs. Achieving ASCLD accreditation is a rigorous process. A lab must meet about 400 criteria to achieve accreditation. Typically, an unaccredited lab needs two to three years to prepare for accreditation. It spends this time developing policies, procedures, document controls, analysis validations, and so on. Then, the lab needs another year to go through the process. The lab manager submits an application. The lead assessor and a team spend one to two months reviewing the application and the policies and procedures to make sure the lab is ready. The assessment takes about a week. The assessment team generates findings that require corrective action. The lab typically requires several months to make corrections to the satisfaction of the lead assessor. Once the facility has made all correc-tions, the lead assessor recommends the lab to the board of directors for accreditation. Finally, the ASCLD/LAB board of directors votes on whether to accredit the lab.

The ASCLD/LAB program includes audits to ensure that forensic specialists are performing lab procedures correctly and consistently for all casework. The society performs these audits in computer forensics labs to maintain quality and integrity. One recommendation for labs is to follow the DoD guidelines on electromagnetic radiation (EMR). The U.S. Department of Defense shields computers from EMR detection under its TEMPEST program. You can find out more about TEMPEST at *[http://www.gao.gov/products/NSIAD-86-132](http://www.gao.gov/products/NSIAD-86-132)*. Shielding all computers would be impossible because of the high cost involved. To protect high-risk investigations, however, a lab might also consider implementing TEMPEST protection. TEMPEST certifies equipment that is built with shielding that prevents EMR. In some cases, TEMPEST can be applied to an entire lab. Shielding a lab is an extremely high-cost approach that includes the following measures:

- Lining the walls, ceiling, floor, and doors with specially grounded conductive metal sheets
- Installing filters that prevent power cables from transmitting computer emanations
- Installing special baffles in heating and ventilation ducts to trap emanations
- Installing line filters on telephones lines
- Installing special features at entrances and exits that prevent the facility from being open to the outside at all times

Creating and maintaining a TEMPEST-certified lab is expensive. Such a lab must be inspected and tested regularly. Only large regional computer forensics labs that demand absolute security from eavesdropping should consider complete TEMPEST protection. For smaller facilities, use of TEMPEST-certified equipment is often a more effective approach.

### **Common Forensic Software Programs**

After setting up the lab and the equipment, the next thing to address is the software. Several software tools are available that you might want to use in your forensic lab. This section takes a brief look at several commonly used tools. However, this section gives extra attention to Guidance Software's EnCase and AccessData's Forensic Toolkit because these two programs are very commonly used by law enforcement.

### **EnCase**

EnCase from Guidance Software is a very widely used forensic toolkit. This tool allows the examiner to connect an Ethernet cable or null modem cable to a suspect machine and to view the data on that machine. EnCase prevents the examiner from making any accidental changes to the suspect machine. This is important: Remember the basic principle of touching the suspect machine as little as possible. EnCase organizes information into "cases." This matches the way examiners normally examine computers. [Figure 3-1](https://viewer.books24x7.com/assetviewer.aspx?bookid=69813&chunkid=663783831#) shows a sample case.

[Larger View](https://viewer.books24x7.com/assetviewer.aspx?bookid=69813&chunkid=663783831#)

![https://images.books24x7.com/bookimages/id_69813/85-1.jpg](https://images.books24x7.com/bookimages/id_69813/85-1.jpg)

> Courtesy of Guidance Software, Inc.
> 

**Figure 3-1:** EnCase case file.

The EnCase concept is based on the evidence file. This file contains the header, the checksum, and the data blocks. The data blocks are the actual data copied from the suspect machine, and the checksum is done to ensure there is no error in the copying of that data and that the information is not subsequently modified. Any subsequent modification causes the new checksum not to match the original checksum. As soon as the evidence file is added to the case, EnCase begins to verify the integrity of the entire disk image. The evidence file is an exact copy of the hard drive. EnCase calculates an MD5 hash when the drive is acquired. This hash is used to check for changes, alterations, or errors. When the investigator adds the evidence file to the case, it recalculates the hash; this shows that nothing has changed since the drive was acquired.

You can use multiple methods to acquire the data from the suspect computer:

- **EnCase boot disk**—This method boots the system to EnCase using DOS mode rather than a GUI mode. You can then copy the suspect drive to a new drive to examine it.
- **EnCase network boot disk**—This is very similar to the EnCase boot disk, but it allows you to perform the process over a crossover cable between the investigator's computer and the computer being investigated.
- **LinEn boot disk**—This is specifically for acquiring the contents of a Linux machine. It operates much like the boot disk method, but is for target machines that are running Linux.

After you have acquired a suspect drive, you can then examine it using EnCase.

The EnCase Tree pane is like Windows Explorer. It lists all the folders and can expand any particular element in the tree (folders or subfolders). The Table pane lists the subfolders and files contained within the folder that was selected in the Tree pane. When you select an item, it is displayed in the View pane, as shown in [Figure 3-2](https://viewer.books24x7.com/assetviewer.aspx?bookid=69813&chunkid=663783831#).

[Larger View](https://viewer.books24x7.com/assetviewer.aspx?bookid=69813&chunkid=663783831#)

![https://images.books24x7.com/bookimages/id_69813/86-1.jpg](https://images.books24x7.com/bookimages/id_69813/86-1.jpg)

> Courtesy of Guidance Software, Inc.
> 

**Figure 3-2:** EnCase View pane.

The Filter pane is a useful tool that can affect the data you view in the Table pane. It allows you to filter what you view, narrowing your focus to specific items of interest. You can also search data using the EnCase Search feature, shown in [Figure 3-3](https://viewer.books24x7.com/assetviewer.aspx?bookid=69813&chunkid=663783831#).

[Larger View](https://viewer.books24x7.com/assetviewer.aspx?bookid=69813&chunkid=663783831#)

![https://images.books24x7.com/bookimages/id_69813/87-1.jpg](https://images.books24x7.com/bookimages/id_69813/87-1.jpg)

> Courtesy of Guidance Software, Inc.
> 

**Figure 3-3:** EnCase Search.

This is just a very brief introduction to EnCase. It is a very popular tool with law enforcement, and the vendor, Guidance Software, offers training for its product. You can visit the vendor Web site for more details at*[http://www.guidancesoftware.com/](http://www.guidancesoftware.com/)*.

### **Forensic Toolkit**

The Forensic Toolkit (FTK) from AccessData is another widely used forensic analysis tool that is also very popular with law enforcement. You can get additional details at the company's Web site, *[http://www.accessdata.com/products/digital-forensics](http://www.accessdata.com/products/digital-forensics)*, but this section reviews some basics of the tool. With FTK, you can select which hash to use to verify the drive when you copy it, which features you want to use on the suspect drive, and how to search, as shown in [Figure 3-4](https://viewer.books24x7.com/assetviewer.aspx?bookid=69813&chunkid=663783831#).

[Larger View](https://viewer.books24x7.com/assetviewer.aspx?bookid=69813&chunkid=663783831#)

![https://images.books24x7.com/bookimages/id_69813/88-1a.jpg](https://images.books24x7.com/bookimages/id_69813/88-1a.jpg)

> Courtesy of AccessData Group, Inc.
> 

**Figure 3-4:** FTK features.

Forensic Toolkit is particularly useful at cracking passwords. For example, password-protected Portable Document Format (PDF) files, Excel spreadsheets, and other documents often contain important information. FTK also provides tools to search and analyze the Windows Registry. The Windows Registry is where Windows stores all information regarding any programs installed. This includes viruses, worms, Trojan horses, hidden programs, and spyware. The ability to effectively and efficiently scan the Registry for evidence is critical.

FTK gives you a robust set of tools for examining e-mail. The e-mail can be arranged in a timeline, giving the investigator a complete view of the entire e-mail conversation and the ability to focus on any specific item of interest, as shown in [Figure 3-5](https://viewer.books24x7.com/assetviewer.aspx?bookid=69813&chunkid=663783831#).

[Larger View](https://viewer.books24x7.com/assetviewer.aspx?bookid=69813&chunkid=663783831#)

![https://images.books24x7.com/bookimages/id_69813/89-1.jpg](https://images.books24x7.com/bookimages/id_69813/89-1.jpg)

> Courtesy of AccessData Group, Inc.
> 

**Figure 3-5:** E-mail analysis.

Another feature of this toolkit is its distributed processing. Scanning an entire hard drive, searching the Registry, and doing a complete forensic analysis of a computer can be a very time-intensive task. With AccessData's Forensic Toolkit, processing and analysis can be distributed across up to three computers. This lets all three computers perform the three parts of the analysis in parallel, thus significantly speeding up the forensic process. In addition, FTK has an Explicit Image Detection add-on that automatically detects pornographic images. This is very useful in cases involving allegations of pornography. This is a particularly useful tool for law enforcement. FTK is available for Windows or Macintosh.

### **Helix**

Helix is a customized Linux Live CD used for computer forensics. The suspect system is booted into Linux using the Helix CDs and then the tools provided with Helix are used to perform the analysis. This product is robust and full of features, but simply has not become as popular as AccessData's FTK and Guidance Software's EnCase. For more information, check out their Web site at *[http://www.e-fense.com/products.php](http://www.e-fense.com/products.php)*.

### **BackTrack**

BackTrack is a Linux Live CD that you use to boot a system and then use the tools. BackTrack is a free Linux distribution, making it extremely attractive to schools teaching forensics or to laboratories on a strict budget. It is not used just for forensics, however, as it offers a wide number of general security and hacking tools. In fact, it is probably the most widely used collection of security tools available.

### **AnaDisk Disk Analysis Tool**

AnaDisk, from New Technologies Incorporated (NTI), turns a PC into a sophisticated disk analysis tool. The software was originally created to meet the needs of the U.S. Treasury Department in 1991. AnaDisk scans for anomalies that identify odd formats, extra tracks, and extra sectors. It can be used to uncover sophisticated data-hiding techniques.

AnaDisk supports all DOS formats and many non-DOS formats, such as Apple Macintosh and UNIX TAR. If a disk will fit in a PC CD drive, it is likely that AnaDisk can be used to analyze it. For information on AnaDisk, see *[http://www.retrocomputing.org/cgi-bin/sitewise.pl?act=det&p=776&id=retroorg](http://www.retrocomputing.org/cgi-bin/sitewise.pl?act=det&p=776&id=retroorg)*.

### **CopyQM Plus Disk Duplication Software**

CopyQM Plus from NTI essentially turns a PC into a disk duplicator. In a single pass, it formats, copies, and verifies a disk. This capability is useful for system forensics specialists who need to preconfigure CDs for specific uses and duplicate them. In addition, CopyQM Plus can create self-extracting executable programs that can be used to duplicate specific disks. CopyQM is an ideal tool for use in security reviews because once a CopyQM disk-creation program has been created, anyone can use it to make preconfigured security risk assessment disks. When the resulting program is run, the disk image of the original disk is restored on multiple disks automatically. The disk images can also be password-protected when they are converted to self-extracting programs. This is helpful when security is a concern, such as when disks are shared over the Internet. CopyQM Plus is particularly helpful in creating computer incident response toolkit disks.

CopyQM Plus supports all DOS formats and many non-DOS formats, such as Apple Macintosh and UNIX TAR. It copies files, file slack, and unallocated storage space. However, it does not copy all areas of copy-protected disks—extra sectors added to one or more tracks on a CD. AnaDisk software should be used for this purpose. For information on CopyQM Plus, see *[http://vetusware.com/download/CopyQM%203.24/?id=6457](http://www.vetusware.com/download/CopyQM3.24/?id=6457)*.

### **The Sleuth Kit**

The Sleuth Kit is a collection of command-line tools that are available as a free download. You can get them from this site: *[http://www.sleuthkit.org/sleuthkit/](http://www.sleuthkit.org/sleuthkit/)*. This toolset is not as rich nor as easy to use as EnCase or FTK, but can be a good option for a budget-conscious agency. The most obvious of the utilities included is ffind.exe.

There are options to search for a given file or to search for only deleted versions of a file. This particular utility is best used when you know the specific file you are searching for. It is not a good option for a general search. A number of utilities are available in Sleuth Kit; however, many people find using command-line utilities to be cumbersome. Fortunately, a graphical user interface (GUI) has been created for Sleuth Kit. That GUI is named Autopsy and is available at *[http://www.sleuthkit.org/autopsy/download.php](http://www.sleuthkit.org/autopsy/download.php)*.

### **Disk Investigator**

This is a free utility that comes as a graphical user interface for use with Windows operating systems. You can download it from *[http://www.theabsolute.net/sware/dskinv.html](http://www.theabsolute.net/sware/dskinv.html)*. It is not a full-featured product like EnCase, but it is remarkably easy to use. When you first launch the utility, it presents you with a cluster-by-cluster view of your hard drive in hexadecimal form.

From the View menu, you can view directories or the root. The Tools menu allows you to search for a specific file or to recover deleted files.

Entire books could be written about the various forensic utilities available on the Internet. It is a good idea for any investigator to spend some time searching the Internet and experimenting with various utilities. Depending on your own skill set, technical background, and preferences, you might find one utility more suitable than another. It is also recommended that after you select a tool to use, you scan the Internet for articles about that tool. Make certain that it has widespread acceptance and that there are no known issues with its use. It can also be useful to use more than one tool to search a hard drive. If multiple tools yield the same result, this can preempt any objections the opposing attorney or his or her expert may attempt to present at trial. And remember—as always— to document every single step of your investigation process.

### **Forensic Certifications**

You have a lab, you have software, but what about personnel? When considering potential candidates, looking for candidates who have taken a forensic class is a very good first step, but you should also look for candidates who have earned industry certifications. Before looking at specific certifications, let's discuss computer certifications in general.

Certifications have always been a controversial topic. Some people swear by them and won't even interview a candidate who does not have a few. Other people are convinced they are worthless. The issue stems from a misunderstanding of what a certification means. It is not meant to indicate the person is an expert or master in a specific field. It is meant to demonstrate a baseline of competence. Think about a medical degree. Simply having an MD does not guarantee the person is a brilliant physician. It just shows that the person achieved a certain minimum skill level. There is certainly a wide variation in skills among physicians. The same thing occurs with IT certifications. There are people with the Certified Information Systems Security Professional (CISSP®) credential from the International Information Systems Security Certification Consortium (ISC)2® who are brilliant security professionals with a very deep understanding of security and a wide set of skills. There are others with that credential who are only moderately competent.

Another issue with certifications is the boot camp. These programs are usually four or five days of intense study where the materials needed to pass a certification test are crammed into the students. On the final day, when it is all still fresh in their minds, they take the relevant certification test. This does lead to many boot camp attendees forgetting everything a few months later; however, this can be seen not as a failure of the training, but rather of the student. If you attend a boot camp, it is incumbent upon you to keep your skills up after the training is over.

Regardless of your personal feelings on certifications, it is a fact that they can only help your résumé as a forensic analyst. That doesn't mean, however, that you should ever hire any IT professional based solely on certifications. But they are one part of the total résumé. A combination of the right certifications along with formal education and experience make an ideal candidate.

So what are the right certifications? Forensics is a very broad topic, and requires analysts to have both a broad and deep knowledge. Some of this knowledge is obtained in a formal degree program, whereas some is obtained on the job. But anywhere you have a gap in your knowledge, or simply want to enhance your résumé, is a good place to add a certification. You need to know the following areas:

- **PC hardware**—This can be obtained in a basic hardware course at a college or via the CompTIA A certification.
- **Basic networking**—Most computer science–related degrees include a course in basic networking. This satisfies your needs as a forensic expert. However, you might consider the CompTIA Network or the Cisco Certified Network Associate certifications.
- **Security**—You must have a general knowledge of security. This can be best demonstrated with the (ISC)2 CISSP certification or the CompTIA Security certification.
- **Hacking**—Yes, you do need to know what the hackers know. A few certifications for this area of study exist, but two of the most widely known and highly regarded are the EC Council Certified Ethical Hacker and several SANS white-hat hacker certifications. Ethical hacking training can be a perfect match for forensic training.

Now that you have learned about certifications in general, it's time to consider specific forensic certifications. The following sections examine two vendor certifications. Clearly, if your lab uses a specific tool, it is a good idea to have analysts who are certified in that tool. Subsequent sections explore a couple of general forensic certifications. These tests are about forensic methodologies rather than a specific tool.

### **EnCase Certified Examiner Certification**

Guidance Software, the creator of EnCase, sponsors the EnCase Certified Examiner (EnCE) certification program. EnCE certification is open to the public and private sectors. This certification focuses on the use and mastery of system forensics analysis using EnCase. For more information on EnCE certification requirements, visit *[http://www.guidancesoftware.com](http://www.guidancesoftware.com/)*.

### **AccessData Certified Examiner**

AccessData is the creator of Forensic Toolkit (FTK). AccessData sponsors the AccessData Certified Examiner (ACE) certification program. ACE certification is open to the public and private sectors. This certification is specific to the use and mastery of FTK. Requirements for taking the ACE exam include completing the AccessData boot camp and Windows forensic courses. For more information on ACE certification, visit *[http://www.accessdata.com](http://www.accessdata.com/)*.

### **EC Council Certified Hacking Forensic Investigator**

The EC Council Certified Hacking Forensic Investigator (CHFI) certification is a good general forensic certification. EC Council is more widely known for its Certified Ethical Hacker test, but its forensic test is a solid choice. It covers the general principles and techniques of forensics rather than specific tools like EnCase or FTK. This is a good starting point for learning forensics. You can learn more at their Web site at *[http://www.eccouncil.org/Computer-Hacking-Forensic-Investigator/index.html](http://www.eccouncil.org/Computer-Hacking-Forensic-Investigator/index.html)*.

### **High Tech Crime Network Certifications**

This specific certification is solid and well designed, but is not as widely known. High Tech Crime Network (HTCN) offers several levels of certification, with different requirements:

- Certified Computer Crime Investigator, Basic
- Certified Computer Crime Investigator, Advanced
- Certified Computer Forensic Technician, Basic
- Certified Computer Forensic Technician, Advanced

HTCN certification is open to anyone in a computing investigations profession.

HTCN requires a review of all related training. This includes training in one of its approved courses, a written test for the specific certification, and a review of the candidate's work history. It is the review of the candidate's work history that makes this certification stand out from the others. The HTCN Web site, *[http://www.htcn.org](http://www.htcn.org/)*, specifies requirements for the various certification levels.

### **Global Information Assurance Certification Certifications**

The Global Information Assurance Certification (GIAC) certifications are well respected in the IT industry. They have security, hacking, and forensic certifications. GIAC provides several levels of certification, beginning with the GIAC Certified Forensic Analyst (GCFA) and culminating with the GIAC Certified Forensic Examiner (GCFE). You can learn more about their certifications at the GIAC Web site at *[http://www.giac.org/certification/certified-forensic-analyst-gcfa](http://www.giac.org/certification/certified-forensic-analyst-gcfa)* .

### **Chapter Summary**

This chapter provided an overview of the forensic process. You examined general concepts as well as specific forensic frameworks. It is important that you fully understand these concepts before you move forward.

Then, this chapter looked at some widely used forensic tools. Even if you already have a tool that you prefer to use or that is mandated at your lab, it is worthwhile for you to at least have a basic familiarity with other forensic tools that are available. BackTrack, in particular, is a tool you should become familiar with because is it free to use.