# Process Injection

# 2023 Process Injection Techniques

- [New Mockingjay process injection technique evades EDR detection](https://www.bleepingcomputer.com/news/security/new-mockingjay-process-injection-technique-evades-edr-detection/)

# BlackHat Talk - Process Injection Techniques (2020)

[Process Injection Techniques - Gotta Catch Them All - YouTube](https://www.youtube.com/watch?v=xewv122qxnk)

Comprehensive collection, catalog, or compendium of process injection techniques.

- Separation of true injections from process hollowing/spawning
- No categorization (allocation vs memory write vs execution), analysis, comparison
- Updates for Windows 10

## True Process Injection

- Definition: from live userspace process (malware) to another live userspace process (target, benign)
- In contrast to (out of scope):
    - process spawning and hollowing - spawning the “target” process and injecting into it (BEFORE execution)
    - Pre-execution - DLL hijacking, AppCert, AppInit, LSP providers, Image File Execution Options, etc.

## Windows 10, x64

- Lots of controls to mitigate process injection
    
    ![Untitled](Process%20Injection/Untitled.png)
    

## Scope

- True process injection
- Not just spawning an exe - using target commands
- Windows 10 version 1803 and above
- x64 process injection, x64 target process, both medium integrity
- Non-admin
- Evaluation against Windows 10 protections (CFG, CIG)

## Strategies Against Controls

### CFG Strategy

- Very difficult to get past
- involves ROP chains

![Untitled](Process%20Injection/Untitled%201.png)

### CIG is hard to combat

- prevents arbitrary loading of DLLs

## Process Injection Building Blocks for an Attack

![Untitled](Process%20Injection/Untitled%202.png)

## Classic Process Injection Techniques

### Memory Allocation Technique

![Untitled](Process%20Injection/Untitled%203.png)

### WriteProcessMemory memory writing technique

![Untitled](Process%20Injection/Untitled%204.png)

### CreateRemoteThread execution technique

![Untitled](Process%20Injection/Untitled%205.png)

### DLL injection execution technique

![Untitled](Process%20Injection/Untitled%206.png)

### Another DLL injection execution technique

![Untitled](Process%20Injection/Untitled%207.png)

### APC execution technique

![Untitled](Process%20Injection/Untitled%208.png)

- Requires alertable state threads

![Untitled](Process%20Injection/Untitled%209.png)

##