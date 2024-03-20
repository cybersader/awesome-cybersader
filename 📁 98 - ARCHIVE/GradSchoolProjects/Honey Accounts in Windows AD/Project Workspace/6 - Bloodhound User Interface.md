# Lab Overview
This lab covers the installation of the BloodHound-UI.
## Objectives
- Allow AV Bypass  
* Install BloodHound  
* Update the Neo4J credentials  
* Connect to the Neo4J Database with BloodHoundAD
## Methodology
- We will first run PowerShell to allow for the BloodHoundAD executable to be executed without restriction from the Windows Defender.  
- We will then download the BloodHoundAD components and launch the application. After launching the application we will review the components of the user interface.
## Which Computer?
- Run on workstation.

# AV Considerations
The following seems to keep Microsoft Defender at bay.  We would advise you to run these commands in a PowerShell terminal prior to downloading and launching the BloodHound user interface.

```powershell
Set-MpPreference -ExclusionPath 'c:\users\doadmin'
Set-MpPreference -ExclusionProcess "powershell.exe", "cmd.exe"
Set-MpPreference -DisableIntrusionPreventionSystem $true -DisableIOAVProtection $true -DisableRealtimeMonitoring $true -DisableScriptScanning $true -EnableControlledFolderAccess Disabled -EnableNetworkProtection AuditMode -Force -MAPSReporting Disabled -SubmitSamplesConsent NeverSend
Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled False
```

This should not return any errors or related warnings.

![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231205233218551.png)

# BloodHoundAD: Download and Start
Next, you are going to gather the BloodHound release archive that has been tested and validated in the ARM template lab environment.

```powershell
cd c:\Users\DOAdmin
$ProgressPreference = 'SilentlyContinue'
Invoke-WebRequest -URI "https://github.com/BloodHoundAD/BloodHound/releases/download/4.0.3/BloodHound-win32-ia32.zip" -OutFile C:\Users\DOAdmin\Downloads\BH-Rel32.zip
expand-archive .\Downloads\BH-Rel32.zip
.\BH-Rel32\BloodHound-win32-ia32\BloodHound.exe
```

This will start the BloodHoundAD database client. In the next section, we will change the default credentials for Neo4j prior to using the BloodHoundAD client. 

- Install a browser
- One liner Chrome install in Powershell
	- [Install Chrome browser with a PowerShell one-liner](https://gist.github.com/timothywarner/5de320a3c648bd9346af8cdbd4db8d14)
```powershell
$Path = $env:TEMP; $Installer = 'chrome_installer.exe'; Invoke-WebRequest -Uri 'http://dl.google.com/chrome/install/375.126/chrome_installer.exe' -OutFile $Path\$Installer; Start-Process -FilePath $Path\$Installer -Args '/silent /install' -Verb RunAs -Wait; Remove-Item -Path $Path\$Installer
```

Go to below URL to change the default creds.
```
http://10.0.0.8:7474
```


Change the default connection URL to the following (neo4j on Linux system):

```
bolt://10.0.0.8:7687
```

![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231205234239922.png)

If you do not have a green check-mark on your Neo4J Bolt connection, see the next step:

Neo4j Username:
```
doazlab
```

Neo4j Password:
```
DOLabAdmin1!
```
# Troubleshooting Neo4J Bolt Connection
If you do not have a green check-mark on your Neo4J Bolt connection, see below:

Access your Linux server over SSH and restart the Neo4J service.

```bash
sudo -s
systemctl restart neo4j
netstat -pl |egrep '7474|7687'
```

For reference, the Netstat flags used here are provided below:

| **netstat: local network details**    |
|:------------------------------------- |
| - p: program  - l: listening (socket) |


