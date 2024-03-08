# Running Bootable Kali Linux USB Drive in a VM // Forensics On The Go

# Installing Bootable Kali to USB Drive

Kali Documentation

I’m following the resource from the Official Kali website - [Making a Kali Bootable USB Drive on Windows | Kali Linux Documentation](https://www.kali.org/docs/usb/live-usb-install-with-windows/). 

Etcher

In the documentation, they recommend using “Etcher” ([balenaEtcher - Flash OS images to SD cards & USB drives](https://www.balena.io/etcher)) to do the imaging, so I’m going to try it out. Etcher says that it can “Flash OS images to SD cards & USB drives, safely and easily.” It also does validation to make sure drives aren’t corrupted which would definitely save time if you haven’t troubleshooted complex storage or imaging problems before. The interface is really simple too. I disagree with the notion that everything has to be CLI. I’m going to do what is easy, because that is what it means to be good at IT - innovate, simplify, then optimize. There is no need to overengineer the process.

## Using Etcher with [kali-linux-2022.4-live-amd64.iso](https://cdimage.kali.org/kali-2022.4/kali-linux-2022.4-live-amd64.iso)

I obtained this image from the “Live Boot” section of the [https://www.kali.org/get-kali/](https://www.kali.org/get-kali/) page.

- Setup
    - Really simple. Made sure I selected the correct USB flash drive and the ISO file I downloaded.
    
    ![Untitled](Running%20Bootable%20Kali%20Linux%20USB%20Drive%20in%20a%20VM%20Fore/Untitled.png)
    
- Running
    
    ![Untitled](Running%20Bootable%20Kali%20Linux%20USB%20Drive%20in%20a%20VM%20Fore/Untitled%201.png)
    
- Validating
    
    ![Untitled](Running%20Bootable%20Kali%20Linux%20USB%20Drive%20in%20a%20VM%20Fore/Untitled%202.png)
    
- Finished
    
    ![Untitled](Running%20Bootable%20Kali%20Linux%20USB%20Drive%20in%20a%20VM%20Fore/Untitled%203.png)
    

# Running a Kali Linux Bootable USB in Forensics Mode

## Getting a hypervisor - I tried both VMware and VirtualBox

I decided to use VMware because I’ve had more issues with VirtualBox in the past. 

- [Download VMware Workstation Player | VMware](https://www.vmware.com/products/workstation-player/workstation-player-evaluation.html)
- This is very easy. I could even use VirtualBox instead - [Downloads – Oracle VM VirtualBox](https://www.virtualbox.org/wiki/Downloads).
- Both work great, but I decided to take the road less traveled

---

The hard part seems to be actually booting the USB stick.

There are a few ways to live boot the USB stick on a Windows Host:

- Launching from VMware by selecting physical disk - [How to use Bootable USB drive in VMware Player to install OS](https://www.how2shout.com/how-to/how-to-use-bootable-usb-drive-in-vmware-player-to-install-os.html)
- Launching from Windows Boot Menu - [Booting from a USB drive](https://neosmart.net/wiki/boot-usb-drive/#Shortcut_keys)

## Setting Up a Hypervisor & Virtual Machines for USB Live Boot

### Trying to Boot Live from Within UEFI Menu for a Windows VM

I needed to figure out what physical drive the USB was defined as in the OS, just in case I needed it to define what physical drive to use for booting.

> I hit the Windows button, clicked the ‘Run’ program, then typed in `diskmgmt.msc` , then ‘Enter.’
> 

![Untitled](Running%20Bootable%20Kali%20Linux%20USB%20Drive%20in%20a%20VM%20Fore/Untitled%204.png)

![Untitled](Running%20Bootable%20Kali%20Linux%20USB%20Drive%20in%20a%20VM%20Fore/Untitled%205.png)

It was obvious that `Disk 3` was my USB, and also that the 3.80 GB was the Live Kali data that I “etched” onto the USB…get it?😂 Now I had the information I needed for later.

![Untitled](Running%20Bootable%20Kali%20Linux%20USB%20Drive%20in%20a%20VM%20Fore/Untitled%206.png)

## Booting a Live USB in a Virtual Machine

There were ironically quite a few pretentious IT people online that questioned why someone would do such a thing. Like “bro just dual-boot with your host machine. 😡” 

<aside>
😀 There are several benefits to booting live from a USB from a VM:

- You can keep your documentation workflow the same. Much easier to get screenshots.
- Run multiple systems on one machine to use various tools.
- You can follow work policy by using your supported workstation, which saves you the trouble of procuring a specific workstation just for forensics
</aside>

<aside>
☹️ There are also some disadvantages that revolve around hardware and virtualization:

- Compatibility or performance issues
- Networking annoyances or issues
- VM software limitations with memory, processing, etc.
</aside>

### Trying to boot from BIOS in Windows VM - VMware?

I thought that if I could do it with my host computer, then why not with the VM. Don’t they work the same? 😅 Let’s try! 😆

I spammed the ‘F12’ button as the Windows VM loaded and it got me here.

I didn’t see any USB or related options on the menu, so I thought I would retry some things. I looked up the Internal Shell too, but that seemed way too inefficient and complicated to try.

![Untitled](Running%20Bootable%20Kali%20Linux%20USB%20Drive%20in%20a%20VM%20Fore/Untitled%207.png)

I thought I would take a look at the tried and true program “Rufus”, to see what other info I could glean from the USB.

![Rufus download page](Running%20Bootable%20Kali%20Linux%20USB%20Drive%20in%20a%20VM%20Fore/Untitled%208.png)

Rufus download page

Everything looked fine in Rufus too, so I don’t think it was the USB having issues or being in the wrong format with the partitioning.

![Untitled](Running%20Bootable%20Kali%20Linux%20USB%20Drive%20in%20a%20VM%20Fore/Untitled%209.png)

I also tried to make sure that VMware had the device plugged in. The device hadn’t been plugged into the VM, so maybe this was the issue.

![Untitled](Running%20Bootable%20Kali%20Linux%20USB%20Drive%20in%20a%20VM%20Fore/Untitled%2010.png)

I tried to boot again by spamming the ‘F12’ key, and turns out, I hadn’t hit the key fast enough before. I arrived at this new screen, but alas there was no option for USB.

![Untitled](Running%20Bootable%20Kali%20Linux%20USB%20Drive%20in%20a%20VM%20Fore/Untitled%2011.png)

### Booting Kali Linux from a USB in VMware

This is the method that finally works out of the 3 method methods I try. VMware has the option of booting from a physical disk, and this includes a USB drive. In this case, we already know that the physical disk is `Physical Disk 3` .

Made sure to start VMware Workstation Player as Administrator, or else we will have errors.

![Untitled](Running%20Bootable%20Kali%20Linux%20USB%20Drive%20in%20a%20VM%20Fore/Untitled%2012.png)

I created a new Windows 10 VM which was really easy to do.

I needed to now add a new Hard Disk to that VM. This would become a reference to the USB drive’s physical drive space.

![Untitled](Running%20Bootable%20Kali%20Linux%20USB%20Drive%20in%20a%20VM%20Fore/Untitled%2013.png)

Next up, I selected “Use a physical disk” - for ADVANCED USERS 😏.

![Untitled](Running%20Bootable%20Kali%20Linux%20USB%20Drive%20in%20a%20VM%20Fore/Untitled%2014.png)

I select `PhysicalDrive3` which I figured out was the USB in past steps.

![Untitled](Running%20Bootable%20Kali%20Linux%20USB%20Drive%20in%20a%20VM%20Fore/Untitled%2015.png)

---

Turns out, “boot priority” is what matters here. We can tell the VM what to try using to boot up, and we can define a prioritized order. In this case, we want the USB drive to go first in that order. 

To change the order, I click on each hard disk (one at a time), go into the advanced settings, and do a 3-step move to make them swap places, so that the USB one is on top. 

Generally the steps go:

1. Click on the regular hard disk → move to NVMe 0:2 or any other slot past that → Ok
2. Click on the USB hard disk → move to NVMe 0:0 → Ok
3. Click on the regular hard disk → move to NVMe 0:1 → Ok

![Untitled](Running%20Bootable%20Kali%20Linux%20USB%20Drive%20in%20a%20VM%20Fore/Untitled%2016.png)

---

After starting up the VM, I arrive at the live USB-booted Kali Linux instance.

![Untitled](Running%20Bootable%20Kali%20Linux%20USB%20Drive%20in%20a%20VM%20Fore/Untitled%2017.png)

### Booting Kali Linux from a USB in VirtualBox

Booting from VirtualBox is apparently possible. However, I don’t manage to get it working here. However, you essentially have to create a “medium” with `createmedium` . That medium is a reference to a hard disk (`HardDisk3` in this case). Then we simply attach to that medium in VirtualBox.

One of the big changes this year with this was the related commands with VirtualBox:

- `VBoxManage internalcommands createrawvmdk` was deprecated
- `VBoxManage createmedium disk` is the new command

<aside>
💡 View more resources on VirtualBox changes and the process here → [USB Booting in VirtualBox (didn’t work for me)](Running%20Bootable%20Kali%20Linux%20USB%20Drive%20in%20a%20VM%20Fore.md)

</aside>

Run the command prompt, so you can do the `VBoxManage createmedium disk` .

![Untitled](Running%20Bootable%20Kali%20Linux%20USB%20Drive%20in%20a%20VM%20Fore/Untitled%2018.png)

DEPRECATED Commands that I tried to run:

`VBoxManage internalcommands createrawvmdk -filename C:\usb2.vmdk -rawdisk \\.\PhysicalDrive#`

<aside>
‼️ DON’T RUN THESE. They’re deprecated.

</aside>

![Untitled](Running%20Bootable%20Kali%20Linux%20USB%20Drive%20in%20a%20VM%20Fore/Untitled%2019.png)

> `The 'createrawvdk' subcommand is deprecated.  The equivalent functionality is
available using the 'VBoxManage createmedium' command and should be used
instead.  See 'VBoxManage help createmedium' for details.`
> 
- [(2) Help with creating VMDK file for raw drive access : virtualbox](https://www.reddit.com/r/virtualbox/comments/y3snld/help_with_creating_vmdk_file_for_raw_drive_access/) ****

I found the related docs that showed the `'VBoxManage createmedium'` command ([https://www.virtualbox.org/manual/ch09.html#rawdisk](https://www.virtualbox.org/manual/ch09.html#rawdisk))

It also showed a nice warning about running commands that create mediums for raw disks.

![Untitled](Running%20Bootable%20Kali%20Linux%20USB%20Drive%20in%20a%20VM%20Fore/Untitled%2020.png)

Commands:

```bash
cd %programfiles%\Oracle\VirtualBox
VBoxManage createmedium disk --filename C:\usb2.vmdk --format=VMDK --variant RawDisk --property RawDrive=//./PhysicalDrive3 
```

![Untitled](Running%20Bootable%20Kali%20Linux%20USB%20Drive%20in%20a%20VM%20Fore/Untitled%2021.png)

The commands worked and I created a `.vmdk` file (the only format you can use with the raw disk option for VBox). Now I just need to set this up with a VM.

Created a Windows 10 machine.

![Untitled](Running%20Bootable%20Kali%20Linux%20USB%20Drive%20in%20a%20VM%20Fore/Untitled%2022.png)

Added some simple RAM and CPU specs.

![Untitled](Running%20Bootable%20Kali%20Linux%20USB%20Drive%20in%20a%20VM%20Fore/Untitled%2023.png)

“**Use an Existing Virtual Hard Disk File”** (the `.vmdk` file that was created).

![Untitled](Running%20Bootable%20Kali%20Linux%20USB%20Drive%20in%20a%20VM%20Fore/Untitled%2024.png)

“**Finish”**

![Untitled](Running%20Bootable%20Kali%20Linux%20USB%20Drive%20in%20a%20VM%20Fore/Untitled%2025.png)

At this point, everything should work. The usual error people get is that they don’t “Run as Administrator” with VBox, but here I get `VERR_FILE_NOT_FOUND` . This is a completely unexpected error.

![Untitled](Running%20Bootable%20Kali%20Linux%20USB%20Drive%20in%20a%20VM%20Fore/Untitled%2026.png)

I looked at Reddit to see what other users were saying. ( [(2) Help with creating VMDK file for raw drive access : virtualbox](https://www.reddit.com/r/virtualbox/comments/y3snld/help_with_creating_vmdk_file_for_raw_drive_access/) ). 4 months ago, users were saying that Workstation Player 7.0 doesn’t seem to function properly. This isn’t that reliable though.

![Untitled](Running%20Bootable%20Kali%20Linux%20USB%20Drive%20in%20a%20VM%20Fore/Untitled%2027.png)

I found an article online talking about ways to fix the error, but nothing seemed to apply to this case ([Top 8 Methods to Fix VBOX_E_FILE_ERROR (0x80bb0004) [2021 Update]](https://www.minitool.com/partition-disk/vbox-e-file-error-0x80bb0004.html)).

I even modified the past command by selecting a partition, but this didn’t fix the issue.

`VBoxManage createmedium disk --filename C:\usb2.vmdk --format=VMDK --variant RawDisk --property RawDrive=//./PhysicalDrive3 --property Partitions=1`

![Untitled](Running%20Bootable%20Kali%20Linux%20USB%20Drive%20in%20a%20VM%20Fore/Untitled%2028.png)

# Installing Forensics Tools & Kali in Forensics Mode

Here’s examples of a few tools that can be downloaded to start learning fundamental forensics workflows and processes.

## Start Kali in Forensic Mode

![Untitled](Running%20Bootable%20Kali%20Linux%20USB%20Drive%20in%20a%20VM%20Fore/Untitled%2029.png)

![Untitled](Running%20Bootable%20Kali%20Linux%20USB%20Drive%20in%20a%20VM%20Fore/Untitled%2030.png)

## Installing Tools in Kali

Generally every system and tool in Kali is installed through **Advanced Packaging Tool (APT).** 

Open a terminal, run `sudo su`, then `apt-get update`. This will update the packages list for Kali so that you can have the most up-to-date tools when you install them with APT. 

![Untitled](Running%20Bootable%20Kali%20Linux%20USB%20Drive%20in%20a%20VM%20Fore/Untitled%2031.png)

### Data Acquisition Tools

![Untitled](Running%20Bootable%20Kali%20Linux%20USB%20Drive%20in%20a%20VM%20Fore/Untitled%2032.png)

![Untitled](Running%20Bootable%20Kali%20Linux%20USB%20Drive%20in%20a%20VM%20Fore/Untitled%2033.png)

## Two Windows Tools

- [Autopsy - Download](https://www.autopsy.com/download/)
- [FTK Imager - Exterro](https://www.exterro.com/ftk-imager)

![Untitled](Running%20Bootable%20Kali%20Linux%20USB%20Drive%20in%20a%20VM%20Fore/Untitled%2034.png)

![Untitled](Running%20Bootable%20Kali%20Linux%20USB%20Drive%20in%20a%20VM%20Fore/Untitled%2035.png)

---

---

---

# Questions & Exploration

- How is it any different if I boot from an ISO file on a USB drive?
    - I want to figure out ways to use VMs. This is especially important when trying to streamline work, do screenshots, and rotate between applications as you do forensics.
    - In other words, could I have just moved the .iso into my USB in file explorer, then attached with VBox/VMware and still had persistence and a natural write-blocker effect?
    - Still trying to wrap my head around the differences and what's going on from a lower level perspective.
    - “Interrupt 13”
    - “You can make your own write blockers”

# Other Resources

- Creating Bootable USB
    - [How to Run Kali Linux From a Bootable USB Drive - TurboFuture](https://turbofuture.com/computers/How-to-Run-Backtrack-5-From-a-Bootable-USB-Drive)
    - [How To Boot Kali Linux From Usb - Livelaptopspec](https://www.livelaptopspec.com/how-to-boot-kali-linux-from-usb/)
    - [How to Install Kali Live on a USB Drive (With Persistence, Optional) « Null Byte :: WonderHowTo](https://null-byte.wonderhowto.com/how-to/install-kali-live-usb-drive-with-persistence-optional-0162253/)
    - [BalenaEtcher- How to create a bootable USB flash drive using Etcher](https://www.how2shout.com/how-to/balenaetcher-how-to-create-a-bootable-usb-flash-drive-using-etcher.html)
- Downloads
    - [Rufus - Create bootable USB drives the easy way](https://rufus.ie/en/#)
    - [balenaEtcher - Flash OS images to SD cards & USB drives](https://www.balena.io/etcher)
    - [Autopsy - Download](https://www.autopsy.com/download/)
    - [FTK Imager - Exterro](https://www.exterro.com/ftk-imager)
    - [dcfldd | Kali Linux Tools](https://www.kali.org/tools/dcfldd/)
        - https://github.com/resurrecting-open-source-projects/dcfldd
    - [dc3dd | Kali Linux Tools](https://www.kali.org/tools/dc3dd/)
        - [dc3dd – Forensics Matters 🕵️](https://www.forensics-matters.com/tag/dc3dd/)
        - [[Note] Drive acquisition using dc3dd – Forensics Matters 🕵️](https://www.forensics-matters.com/2018/07/28/image-acquisition-dc3dd/)
- USB Booting in VMware
    - [How to use Bootable USB drive in VMware Player to install OS](https://www.how2shout.com/how-to/how-to-use-bootable-usb-drive-in-vmware-player-to-install-os.html)
- USB Booting in VirtualBox (didn’t work for me)
    - [Chapter 8. VBoxManage](https://www.virtualbox.org/manual/ch08.html#vboxmanage-createmedium)
    - [Chapter 9. Advanced Topics - 9.7.1.2. Access to Individual Physical Hard Disk Partitions - VirtualBox Documentation](https://www.virtualbox.org/manual/ch09.html#rawdisk)
    - [How To Boot From USB Drives In VirtualBox - I Have A PC | I Have A PC](https://www.ihaveapc.com/2023/01/how-to-boot-from-usb-drives-in-virtualbox/)
    - [(2) Help with creating VMDK file for raw drive access : virtualbox](https://www.reddit.com/r/virtualbox/comments/y3snld/help_with_creating_vmdk_file_for_raw_drive_access/)
    - [How to Boot from a USB Drive in VirtualBox in Windows? - PCInsider](https://www.thepcinsider.com/how-to-boot-usb-drive-virtualbox-windows/) - outdated
    - [(38) How to boot From A USB Flash Drive in Virtualbox - YouTube](https://www.youtube.com/watch?v=zL9ib7tvew8) - outdated
- Data Acquisition
    - [Acquiring Data with dd, dcfldd, dc3dd - cyber-forensics.ch](http://www.cyber-forensics.ch/acquiring-data-with-dd-dcfldd-dc3dd/)
- Misc
    - [apt-get command in Linux with Examples - GeeksforGeeks](https://www.geeksforgeeks.org/apt-get-command-in-linux-with-examples/)
    - [Create Kali Bootable Installer USB Drive in Windows 10 (Kali Bootable Non-Persistence USB Drive) - blackMORE Ops](https://www.blackmoreops.com/2015/09/24/create-kali-bootable-installer-usb-drive-in-windows-10-kali-bootable-non-persistence-usb-drive/)
    - [Booting from a USB drive](https://neosmart.net/wiki/boot-usb-drive/#Shortcut_keys)  - Live Booting from PC without VM