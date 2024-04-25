---
publish: true
---
# Lab Overview
This lab will demonstrate the ease of creating detection for some common attacks using various deception techniques.  
**Please make the following considerations.**  
- This lab requires Active Directory modules for PowerShell  
- Should you choose to complete the installation of the remote server administration tools on the workstation, these labs will work from either server  
- **If you do not complete the RSAT install**, using PowerShell from the domain controller
## Objectives
- Installation of RSAT (Remote Server Administration Tools) for Windows 10 to accomplish this task.  
- Issues with RSAT:
	- Pre-requisite services are required as of January 25, 2022
	- #DO-TODO
## Methodology
- Install PS dependencies on Windows 10 system
- Then we Add new user Objects that we control
- We then deploy Deception
- Using Deception we create a decoy user and computer
- We then make the new accounts look interesting to an attacker
## Which Computer?
- Run on workstation, but use PowerShell in DC if that doesn't work
# Preparation: Add DS Tools (RSAT)
First, use PowerShell Components to add RSAT for Windows 10
```powershell
Add-WindowsCapability -Name Rsat.ActiveDirectory.DS-LDS.Tools~~~~0.0.1.0 -Online
```

- Results
	- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231118203854173.png)
	- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231118212605622.png)

# Create Controlled Objects

Create an AD object that we control. You will be prompted for authentication.
```powershell
New-ADUser -UserPrincipalName Luis.Graves@doazlab.com -Path "OU=DomainUsers,dc=doazlab,DC=com" -GivenName "Luis" -Surname "Graves" -Enabled 1 -Name "Luis.Graves" -desc "Accounting Controller" -office "Accounting" -title "Controller" -company "DevLabs" -AccountPassword (ConvertTo-SecureString "Password1!" -AsPlainText -Force) -Credential $Cred
```

Next, we will create a second account that we will use create a password spray detection that relies on a stronger correlation than a single authentication hit against a honey account. You will be prompted for authentication.

```powershell
 New-ADUser -UserPrincipalName Heloise.Brinn@doazlab.com -Path "OU=DomainUsers,dc=doazlab,DC=com" -GivenName "Heloise" -Surname "Brinn" -Enabled 1 -Name "Heloise.Brinn" -desc "Chief Executive" -office "Boardroom" -title "CEO" -company "DevLabs" -AccountPassword (ConvertTo-SecureString "Winter2022!" -AsPlainText -Force) -Credential $Cred
```

![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231205230704216.png)
# Deploy-Deception: Download Toolkit
Next we will download the Deploy-Deception tool pack and import the PowerShell module..
```powershell
iwr -URI https://github.com/DefensiveOrigins/Deploy-Deception/archive/refs/heads/master.zip -outfile deception.zip
```

```powershell
Expand-Archive .\deception.zip
```

```powershell
ls
```

```powershell
expand-archive deception.zip
rm deception.zip
mv .\deception\Deploy-Deception-master\* .\deception\
cd deception
Set-ExecutionPolicy bypass -Force
Import-Module .\Deploy-Deception.ps1
```

![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231205231030040.png)
# Deploy-Deception: Command Syntax
**NOTE:** There is a complete listing of options available for the Deploy-UserDeception toolkit. Running this command will take a minute or two and is not required for the lab.

```powershell
Get-Help Deploy-UserDeception -Full
```

# Deploy-Deception: Deploy-UserDeception
When ReadProperty (any property) is used against the decoy, EID [4662](https://docs.microsoft.com/en-us/windows/security/threat-protection/auditing/event-4662) is logged.

```powershell
Create-DecoyUser -UserFirstName DOLabs -UserLastName AnyRead -Password Password1! | Deploy-UserDeception -UserFlag PasswordNeverExpires -Verbose
```

![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231205231127291.png)

```powershell
Get-ADUser -Identity DOLabsAnyRead -Properties "ObjectGuid"
```

![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231205231152798.png)

ObjectGUID:
```
f58192fc-11ea-4012-a675-dcfc3b729922
```

Your GUID will vary from the selection below. Remember this command. Unfortunately, some detections are made quite difficult by a failure to translate between an object's SamAccountName attribute (easy to search) and an object's GUID (hard to search).

# Deploy-Deception: Create-DecoyUser
The next command creates a decoy user whose password never expires and a [4662](https://docs.microsoft.com/en-us/windows/security/threat-protection/auditing/event-4662) is logged whenever the objectGUID of the user is read. This property is not read by net.exe, WMI classes (like Win32_UserAccount) and ActiveDirectory module. But LDAP based tools like PowerView and ADExplorer trigger the logging.

```powershell
Create-DecoyUser -UserFirstName DOLabs -UserLastName ADEx -Password Password1! | Deploy-UserDeception -UserFlag PasswordNeverExpires -Verbose
```

![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231205231516533.png)

Create a decoy user named DOLabsDA and make it a member of the Domain Admins group. As a protection against potential abuse, Deny logon to the user on any machine. Please be aware that if another DA gets compromised the DenyLogon setting can be removed.

If there is any attempt to use the user credentials (password or hashes) a [4768](https://docs.microsoft.com/en-us/windows/security/threat-protection/auditing/event-4768) is logged. Any enumeration which reads DACL or all properties for the user will result in a [4662](https://docs.microsoft.com/en-us/windows/security/threat-protection/auditing/event-4662) logging.

```powershell
Create-DecoyUser -UserFirstName DOLabs -UserLastName DA -Password SbaladodPassword1! -Verbose | Deploy-PrivilegedUserDeception -Technique DomainAdminsMemebership -Verbose
```

![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231205231537270.png)

Remember, we may use the objectGUID in a detection later. While you will see these commands again later, we are setting you up to be confident in gathering these strings for use in your own AD environments.

Your output will differ. The GUID creation process is not predictable. Every domain will create unique GUIDs even when creating identical objects.

```powershell
Get-ADUser -Identity DOLabsDA -Properties "ObjectGuid"
```

![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231205231712480.png)

ObjectGUID:
```
a66c10e8-c045-438b-b657-f424bad0c157
```
# Deploy-Deception: DCSync and Logon Privileges
```powershell
Create-DecoyUser -UserFirstName DOLabs -UserLastName Sync -Password Password1! -Verbose
Deploy-PrivilegedUserDeception -DecoySamaccountName dolabssync -Technique DCSyncRights -Verbose
Set-ADUser -Identity dolabssync -LogonWorkStations nonexistent
```

![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231205231905628.png)
# Deploy-Deception: Deploy-ComputerDeception
This function sets up auditing when a specified Right is used by a specified principal against the decoy computer object. Creates a decoy computer that has Unconstrained Delegation enabled and a [4662](https://docs.microsoft.com/en-us/windows/security/threat-protection/auditing/event-4662) is logged whenever x500uniqueIdentifier property or all the properties of the computer are read.

```powershell
Create-DecoyComputer -ComputerName Win2K3-Dev -Verbose | Deploy-ComputerDeception -PropertyFlag TrustedForDelegation -Verbose
Create-DecoyComputer -ComputerName Win2K8-Citrix -Verbose | Deploy-ComputerDeception -PropertyFlag TrustedForDelegation -Verbose
Create-DecoyComputer -ComputerName Win2K8-TS01 -Verbose | Deploy-ComputerDeception -PropertyFlag TrustedForDelegation -Verbose
```

![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231205232149867.png)
# Validate Decoys
Check on the accounts we created:

```powershell
Set-AdUser -Identity luis.graves -LogonWorkstations Win2K3-Dev
Get-AdUser -Identity luis.graves -Properties LogonWorkstations
```

ObjectGUID:
```
387234eb-cc19-4845-bdf5-4b724ee7bdb3
```

![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231205232246953.png)


```powershell
Set-AdUser -Identity heloise.brinn -LogonWorkstations Win2K8-Citrix
Get-AdUser -Identity heloise.brinn -Properties LogonWorkstations
```

ObjectGUID:
```
d57b080e-528a-4bf4-924a-d11ad74cb044
```

![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231205232344050.png)


```powershell
Set-AdComputer -Identity Win2K3-Dev -OperatingSystem "Windows Server 2003"
Get-AdComputer -Identity Win2K3-Dev -Properties OperatingSystem
```

ObjectGUID:
```
a2987e94-a3c0-4742-ba4e-c0051bd605ec
```

![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231205232442371.png)


```powershell
Set-AdComputer -Identity Win2K8-TS01 -OperatingSystem "Windows Server 2008"
Get-AdComputer -Identity Win2K8-TS01 -Properties OperatingSystem
```

ObjectGUID:
```
9fbb1139-7db5-4737-b970-a8a7c8f970a1
```

![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231205232528026.png)


```powershell
Set-AdComputer -Identity Win2K8-Citrix -OperatingSystem "Windows Server 2008"
Get-AdComputer -Identity Win2K8-Citrix -Properties OperatingSystem
```

ObjectGUID:
```
684fce5a-1bb5-4c7f-ad40-3d88b4300cfd
```

![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231205232622407.png)
# Hacker Bait
This next account will be used to entice attackers through potentially interesting items stored in the user's "desc" attribute. You will be prompted for authentication.

```powershell
New-ADUser -UserPrincipalName ELLA_MEJIA@doazlab.com -Path "ou=DomainUsers,dc=doazlab,dc=com" -Server doazlab.com -GivenName "Ella" -Surname "Mejia" -Enabled 1 -Name "ELLA_MEJIA" -desc "Just so I dont forget my password is Yzafqau7r3EQdrdw!#Eiunp" -office "Oort Cloud" -PasswordNeverExpires $true -title "Lead Investigator" -LogonWorkstations "win2k3-dev.doazlab.com" -company "DevLabs" -AccountPassword (ConvertTo-SecureString "Yzafqau7r3EQdrdw!#Eiunp" -AsPlainText -Force) -Credential $Cred
```

![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231205232735285.png)

```powershell
Get-AdUser -Identity ella_mejia -Properties description
```

ObjectGUID:
```
4efaf737-fc2a-4a61-9bec-c75f421b004b
```

![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231205232808645.png)