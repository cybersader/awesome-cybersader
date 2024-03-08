# Ch 2 - Virtualization Techniques

# Traditional Virtualization

- Virtual Processors
    - Allows for concurrency
    - Multiple processes can seemingly run at the same time (being concurrent), but really they are just taking turns.
    - Allows you to divide up one CPU into multiple virtual processors

![Untitled](Ch%202%20-%20Virtualization%20Techniques/Untitled.png)

- How CPUs work with virtual processes?
    - The processes are referenced in the KERNEL SPACE to keep track of processes
    - Processes are actually stored in the USER SPACE along with their threads and run time system (DLLs and stuff like that…I assume)
- Virtual Memory
    
    ![Untitled](Ch%202%20-%20Virtualization%20Techniques/Untitled%201.png)
    
    - Used for every application and process
    - The virtual memory references the disk
    - You actually store stuff on the disk, but put it back into memory when it is necessary
    - Is pagefile.sys all of that virtual memory sitting on the disk????
- Virtual Storage
    - RAID arrays
    
    ![Untitled](Ch%202%20-%20Virtualization%20Techniques/Untitled%202.png)
    
    ![Untitled](Ch%202%20-%20Virtualization%20Techniques/Untitled%203.png)
    
    ![Untitled](Ch%202%20-%20Virtualization%20Techniques/Untitled%204.png)
    
    ![Untitled](Ch%202%20-%20Virtualization%20Techniques/Untitled%205.png)
    
    ![Untitled](Ch%202%20-%20Virtualization%20Techniques/Untitled%206.png)
    
    - Virtual Storage conditionally references storage addresses while keeping redundancy

# Virtualization in Cloud

## Virtual Machines

### Motivations

- Resource Sharing
    - Isolation
        - run-time behavior of one VM shouldn’t affect another VM
    - System security
        - A VM cannot access the data or resources of other VMs on the same hardware
- Performance and Reliability
    - Lots of different hardware and software
    - Allows OS and applications to migrate platforms or to new hardware quickly
- Development and Mgmt of Cloud Provider
    - We get extra services that are easy to configure to our virtualization and computing needs.

### How does virtualization simulate interfaces with hardware, physical objects, or OS peripherals / adapters / interfaces?

- Multiplexing - multiple virtual objects from on physical object. Many virtual → one physical. Ex: processor is multiplexed among a number of processes or threads
- Aggregation - one virtual objects ← multiple physical objects. Ex: Physical disks are aggregated into a RAID disk
- Emulation - create virtual object of a certain type from different type of physical object
- Multiplexing and emulation - Ex: virtual memory with paging multiplexes real memory and disk. Virtual address maps to physical

### Interfaces and Layers in Computers

![Untitled](Ch%202%20-%20Virtualization%20Techniques/Untitled%207.png)

An application (A1) uses library functions, makes system calls (A2), and executes machine instructions (A3)’

- ISA - between hardware and software
- ABI - does not invoke privileged system instructions.  Invokes system calls. Includes app and library modules.
- API - defines set of instructions. Includes HLL high-level language library calls which often invoke system calls

### How code relates to virtualization

![Untitled](Ch%202%20-%20Virtualization%20Techniques/Untitled%208.png)

- everything is done by giving instructions to the computer…so we need abstraction
- For cloud computing:
    - we need programming languages
    - we need hypervisors
        - they take the VM loader which gives the code and it translates to compiled code that can be utilized with certain ISAs
    - we need ISAs, OS, and compilers, etc.

### History

- IBM from 1960s started it
- Paper from 1974
- IBM had virtual address spaces 2000s
- 1990s - VMware!!!
    - First software in 1999

### VMM (virtual machine monitor) / Hypervisor

- Handles interface between OS and VMs
- Backwards compatible with original system
- Live migration - movement of one server to another
- Isolates VMs for security

### VM Models

![Untitled](Ch%202%20-%20Virtualization%20Techniques/Untitled%209.png)

- Traditional is the same as bare metal

## VM Requirements

- A program under the VMM should run the same as on a native system
- VMM should be able to control all virtualized resources
- Most CPU instructions shouldn’t require translation or intervention from the VMM

## Dual-Mode Operation

- OS protects itself and other system components
- User Mode vs. Kernel Mode
    - Some instructions can only be run in kernel mode, but user mode can be used to setup some instructions when privilege is high enough
    - Controlled by a “mode bit” which is set by the hardware
- Kernel-Code (interrupt handlers) runs in kernel mode
    - hardware allows all machine instructions to be executed and allows unrestricted access to memory and I/O ports
    - Everything else runs in user mode
- OS relies on hardware-enforced protection mechanism

## Privilege

### Challenges with x86 CPU Virtualization

![Untitled](Ch%202%20-%20Virtualization%20Techniques/Untitled%2010.png)

- There are 4 layers of privilege:
    - user apps run in ring 3
    - Three classes of machine instructions:
        - nonprivileged instructions - executed in user mode
        - privileged instructions - executed in kernel mode, if attempted in user mode, they cause a trap and so can only be executed in kernel mode
        - sensitive instructions - can be executed in either mode, but require precautions or conditions at execution

So, what layer do we run a hypervisor/VMM in?

- In ring 0, then, same privileges as an OS - wrong
- In rings 1,2,3, then OS has higher privileges - wrong
- Move the OS to ring 1 and the VMM in ring 0 - OK

![Untitled](Ch%202%20-%20Virtualization%20Techniques/Untitled%2011.png)

How do we virtualize the CPU?

- **Full virtualization**
    
    ![Untitled](Ch%202%20-%20Virtualization%20Techniques/Untitled%2012.png)
    
    - binary translation - rewrites parts of the code on the fly to replace sensitive, but not privileged instructions with safe code to emulate the original instruction
    - User instructions run at unmodified speed
    - Advantages:
        - no hardware assistance
        - no modifications of the guest OS
        - isolation, security
    - Disadvantages:
        - Speed of execution
- **OS-assisted virtualization or paravirtualization**
    
    ![Untitled](Ch%202%20-%20Virtualization%20Techniques/Untitled%2013.png)
    
    - modify the OS kernel to replace non-virtualizable instructions with hypercalls that communicate with the virtualization layer hypervisor.
    - Hypervisor provides hypercall interfaces for other critical kernel operations such as memory management, interrupt handling and time keeping
    - Advantage: faster execution, low virtualization overhead
    - Disadvantages: poor portability
    - Examples: Xen, Denali
- **Hardware assisted virtualization**
    
    ![Untitled](Ch%202%20-%20Virtualization%20Techniques/Untitled%2014.png)
    
    - CPU manufacturers (Intel, AMD, etc.) create a virtualization layer that can be enabled in the OS.
    - 
    
    ![Untitled](Ch%202%20-%20Virtualization%20Techniques/Untitled%2015.png)
    

 

# Questions

- Do cloud providers provide multi-tenant solutions for containerization on one operating system on bare metal just like they do with virtualization?

![Untitled](Ch%202%20-%20Virtualization%20Techniques/Untitled%2016.png)