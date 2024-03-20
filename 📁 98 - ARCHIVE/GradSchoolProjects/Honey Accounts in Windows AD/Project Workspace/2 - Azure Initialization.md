# Azure Account Initialization
## Important Notes
- Azure account must be upgraded
- Valid credit card required
- Azure account itself is free
- Azure components cost about $10/day
## Azure Account (Pay-As-You-Go)
### Step 1: Create Azure Account
- Go to [https://azure.microsoft.com/en-us/free/](https://azure.microsoft.com/en-us/free/) and click on "Pay as you go"
- Azure account relies on phone number for identity and address.  If possible, use prepaid phones, virtual credit cards, and fake or forwarding addresses.
### Step 2: Confirm Subscription
- Check subscriptions to make sure it worked
![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231029123356289.png)
- One subscription
	- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231029123356294.png)
	- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231029123356296.png)
# Azure Infrastructure Initialization
## Environment & Topology
- 1 Attacker -> Azure AD Domain
- DOAZ Lab Environment
	- [Defensive Origins Lab Environment | DO-LAB](https://www.doazlab.com/) 
	- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231029123356298.png) 
	- 
## Setup Lab Environment in Azure
- [Defensive Origins Lab Environment | DO-LAB](https://www.doazlab.com/) 
	- [DefensiveOrigins/DO-LAB](https://github.com/DefensiveOrigins/DO-LAB) - Defensive Origins Lab Environment is used within the Defensive Origins courses provided by Defensive Origins, AntiSyphon Security, and Black Hills Information Security.
- Initialization of Azure Environment:
	- Choosing subscription, resource group, and log analytics workspace.  
		- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231029132234080.png)
	- Creation of new resource group
		- Choosing VMs
			- B2s are the cheapest
			- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231029132629552.png)
			- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231029132948477.png)
			- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231029133837375.png)
		- Allow all IP addresses - 0.0.0.0/0
### Error in Deployment Template
#### Fixing Windows Version Issue
```
The following list of images referenced from the deployment template are not found: Publisher: MicrosoftWindowsServer, Offer: WindowsServer, Sku: 2019-Datacenter, Version: 17763.3125.2112070401. Please refer to https://docs.microsoft.com/en-us/azure/virtual-machines/windows/cli-ps-findimage for instructions on finding available images. (Code: InvalidParameter, Target: imageReference)
```
- Also mentioned in issue "AD deployment fails":
	- https://github.com/DefensiveOrigins/DO-LAB/issues/4 

- Repairing the template:
	- [Troubleshoot ARM template JSON deployments - Azure Resource Manager | Microsoft Learn](https://learn.microsoft.com/en-us/azure/azure-resource-manager/troubleshooting/quickstart-troubleshoot-arm-deployment?tabs=azure-cli)
	- Different kinds of errors
		- **Validation errors** occur before a deployment begins and are caused by syntax errors in your file. A code editor like Visual Studio Code can identify these errors.
		- **Preflight validation errors** occur when a deployment command is run but resources aren't deployed. These errors are found without starting the deployment. For example, if a parameter value is incorrect, the error is found in preflight validation.
		- **Deployment errors** occur during the deployment process and can only be found by assessing the deployment's progress in your Azure environment.
	- Installed [Visual Studio Code](https://code.visualstudio.com/) with the latest [Azure Resource Manager Tools extension](https://marketplace.visualstudio.com/items?itemName=msazurermtools.azurerm-vscode-tools).
		- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231029145342136.png)
		- I can use this to make sure there's no big issues with the template immediately
		- No immediate errors. Just a few warnings
			- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231029150753256.png)
	- Tried making sure Windows Server uses latest version
		- DOAZ Lab azuredeploy.json > Sentinel2Go
			- DO-LAB/Sentinel2Go/azuredeploy.json
				- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231029155332141.png)
	- Trying to find the issue from Azure CLI
		- Installed Azure PS - [Install Azure PowerShell on Windows | Microsoft Learn](https://learn.microsoft.com/en-us/powershell/azure/install-azps-windows?view=azps-10.4.1&tabs=windowspowershell&pivots=windows-psgallery) 
			- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231029161914473.png)
		- Run "az login" to login
		- Create resource group
			- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231029161252305.png)
		- Deploy ARM template
			- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231029162317796.png)
	- Didn't work - trying to manually edit links in templates
		- [https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/deploy-to-azure-button > template-stored-in-github](https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/deploy-to-azure-button#template-stored-in-github) 
			- making a button so I can quickly test with forked templates in my own repo
			- Got an error
				- "There was an error downloading the template from URI 'raw.githubusercontent.com/cybersader/DO-LAB/main/azure-deploy.json'. Ensure that the template is publicly accessible and that the publisher has enabled CORS policy on the endpoint. To deploy this template, download the template manually and paste the contents in the 'Build your own template in the editor' option below."
	- Made my own repo, modified some azure deploy JSON files, and linked new deploy to azure button to my templates
		- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231029180545851.png)
	- Issue with sysmon installation
		- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231029194856580.png)
		- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231029195429409.png)
	- Got message pointing to this same issue 

#### GitHub Issue Message from "hjorrip"
```
[@cybersader](https://github.com/cybersader) I made a fix for the windows server version issue here on my fork:  
[https://github.com/hjorrip/DO-LAB/tree/patch-1](https://github.com/hjorrip/DO-LAB/tree/patch-1)

However, the Sysmon issue is rooted in the Sentinel2Go project which I did not debug (maybe it's patched by now - haven't checked since I posted), and I'm afraid that using this project, you're gonna need that if you want to look at the artifacts in Sentinel.

If you want to play around with "on-prem" virtual machines, domain joined and all that - you could just sign up for Defender for Endpoint trial:  
[https://www.microsoft.com/en-us/security/business/endpoint-security/microsoft-defender-endpoint](https://www.microsoft.com/en-us/security/business/endpoint-security/microsoft-defender-endpoint)

Once you have that, you can login to security.microsoft.com using the provided credentials, and use their "Evaluation lab":  
[https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/evaluation-lab?view=o365-worldwide](https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/evaluation-lab?view=o365-worldwide)

It's a very underrated feature - you can create a DC, and bunch of domain joined devices (for free! - but limited time), as well as a Linux attack machine. One addede benefit from this is the devices you create using the Evaluation lab, will be onboarded to Defender for Endpoint. So all hunting you want to do, can then be done using the Device Logs in Advanced Hunting in the security portal.

It's a different take, but if you want to try out password spraying - this could be pretty cool. If you want to take it even a step further, you could sign up for Defender for Identity trial and install the sensor on the domain controller see how that reacts when you spray - but installing the sensor is quite hands on and I'm not aware of a "plug-n-play solution for that".
```
#### Detailed Deployment Errors
- Errors with PowerShellDSC
	- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231104150219880.png)
- Under deployWinAD
	- WS05-installSysmon
		- VM has reported a failure when processing extension 'PowerShellDSC' (publisher 'Microsoft.Powershell' and type 'DSC'). Error message: "DSC Configuration 'Install-Sysmon' completed with error(s). Following are the first few: PowerShell DSC resource DSC_xScriptResource  failed to execute Set-TargetResource functionality with error message: System.InvalidOperationException: The set script threw an error. ---> Microsoft.PowerShell.Commands.ServiceCommandException: Service 'Sysmon (sysmon)' cannot be stopped due to the following error: Cannot stop sysmon service on computer '.'. ---> System.InvalidOperationException: Cannot stop sysmon service on computer '.'. ---> System.ComponentModel.Win32Exception: Access is denied
		       --- End of inner exception stack trace ---
		       at System.ServiceProcess.ServiceController.Stop()
		       at Microsoft.PowerShell.Commands.ServiceOperationBaseCommand.DoStopService(ServiceController serviceController, Boolean force, Boolean waitForServiceToStop)
		       --- End of inner exception stack trace ---
		       --- End of inner exception stack trace ---  The SendConfigurationApply function did not succeed.". More information on troubleshooting is available at https://aka.ms/VMExtensionDSCWindowsTroubleshoot.  (Code: VMExtensionProvisioningError)
	- DC01-installSysmon
		- -VM has reported a failure when processing extension 'PowerShellDSC' (publisher 'Microsoft.Powershell' and type 'DSC'). Error message: "DSC Configuration 'Install-Sysmon' completed with error(s). Following are the first few: PowerShell DSC resource DSC_xScriptResource  failed to execute Set-TargetResource functionality with error message: System.InvalidOperationException: The set script threw an error. ---> Microsoft.PowerShell.Commands.ServiceCommandException: Service 'Sysmon (sysmon)' cannot be stopped due to the following error: Cannot stop sysmon service on computer '.'. ---> System.InvalidOperationException: Cannot stop sysmon service on computer '.'. ---> System.ComponentModel.Win32Exception: Access is denied
		       --- End of inner exception stack trace ---
		       at System.ServiceProcess.ServiceController.Stop()
		       at Microsoft.PowerShell.Commands.ServiceOperationBaseCommand.DoStopService(ServiceController serviceController, Boolean force, Boolean waitForServiceToStop)
		       --- End of inner exception stack trace ---
		       --- End of inner exception stack trace ---  The SendConfigurationApply function did not succeed.". More information on troubleshooting is available at https://aka.ms/VMExtensionDSCWindowsTroubleshoot.  (Code: VMExtensionProvisioningError)
#### Attempting to Fix Sysmon Installation Error
- I don't have the capacity for this at the moment. Better to try manually installing some of the components if possible
- Ran through files and changed all github references to my repo
	- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231104154448252.png)
- Updated the sysmon.xml file with XML from [olafhartong/sysmon-modular: A repository of sysmon configuration modules](https://github.com/olafhartong/sysmon-modular) 
	- Fixed the file under DO-LABMonitoring/sysmon.xml
		- https://github.com/cybersader/DO-LAB/blob/main/Monitoring/sysmon.xml 
- Found all the zip files that would need to be updated
	- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231104161645641.png)
#### Create ARM Template?? - maybe
- Links/Resources
	- [Creating Azure Resources with ARM Templates Step by Step | Microsoft Learn](https://learn.microsoft.com/en-us/archive/blogs/cloud_solution_architect/creating-azure-resources-with-arm-templates-step-by-step) 
- This could be an option if need be, but I don't have a lot of devops experience, so it would take a lot of investment 
### Closed Issue, Maintainer Fixed the Code!, New Deployment
- Ironically, I tried deploying before using the fixed repo and got a different set of errors from previous commits.  Maybe something was also referencing the original repo in these files despite having tried replacing them with a PS script
	- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231114152436621.png)
#### Deploying (Defensive Origins) DO's ARM Template with New Updates & Recent Commits
- Deployment configuration
	- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231114153604901.png)

- Successful deployments
	- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231115163125897.png)

- 21 resources created
	- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231115163332347.png)

#### Lab Network Environment Topology
"The APT Lab network environment topology and reference information is below. Review this information and continue to the next section of this lab."
- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231115170010587.png)

#### Connection Parameters and Config - Generated Outputs from ARM Template
- These are the public IPs for some of the workstations I will be connecting to throughout the lab
	- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231115170248589.png)

|System|Context|Hostname|LAN IP|WAN IP|Connection|Username|Password|
|---|---|---|---|---|---|---|---|
|AD Domain|DNS|DOAZLAB.com|192.168.2.4|||||
||NBNS|DOAZLAB||||||
||Domain Admin|||||doazlab\DOAdmin|DOLabAdmin1!|
|Domain Controller|Server 2019|DC01|192.168.2.4|See Azure Portal|RDP via WS01|.\DOAdmin|DOLabAdmin1!|
|Member Workstation|Windows 10|WS01|192.168.2.5|See Azure Portal|RDP via Internet|||
|Attack System|Linux|Nux01|10.0.0.8|See Azure Portal|SSH|doadmin|DOLabAdmin1!|

### Connectivity to Workstations & Servers

#### RDP Tests
##### Member Server
- Use RDP client to connect to the member server

|Context|Information|
|---|---|
|MSRDP|IP Address Provided During Lab Build (Public IP) for Workstation|
|Username|doazlab\DOAdmin|
|Password|DOLabAdmin1!|


![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231115172356037.png)
![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231115172433367.png)
![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231115172457834.png)

![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231115172845543.png)

^^^^^ This took a long while to connect to.  I tried disconnecting and reconnecting and ended up with this
- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231115173327288.png)
- After like 6 minutes
	- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231115173615465.png) 
##### Domain Controller
- Use a remote desktop client to access the following system via RDP:

|Context|Information|
|---|---|
|MSRDP|IP Address Provided During Lab Build (Public IP) for Domain Controller|
|Username|doazlab\DOAdmin|
|Password|DOLabAdmin1!|

- Connecting to DC
	- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231115173812597.png)
- Connected
	- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231115173937411.png)

#### Deployed Environment Topology

- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231115190116337.png)
- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231115190126480.png)

# Costs
- This can cost a good bit
![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231120154645437.png)