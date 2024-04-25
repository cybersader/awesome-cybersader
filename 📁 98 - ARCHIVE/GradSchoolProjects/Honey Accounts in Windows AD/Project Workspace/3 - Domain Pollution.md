---
publish: true
---
This is in order to properly set up the user structure for Azure Entra ID / AAD (Azure AD)
## AD Pollution with BadBlood
### Prereqs & Setup
- 
### BadBlood Resources
- [Relkci/BadBlood: BadBlood by @davidprowe](https://github.com/Relkci/BadBlood) - BHIS fork
- [davidprowe/BadBlood: BadBlood by @davidprowe](https://github.com/davidprowe/BadBlood) - original repo
- [https://secframe.com/docs/badblood/whatisbadblood/ > getting-started](https://secframe.com/docs/badblood/whatisbadblood/#getting-started) 

### Download & Start BadBlood
#### RDP (Remote Desktop Protocol) into DC (Domain Controller)
- Use parameters found in part 2
	- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231117212759983.png)
	- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231117212836107.png)
	- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231117212849788.png)
### Run PS Commands to Install BadBlood from GitHub
- Run PS as admin
	- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231117214804891.png)
- Run commands
	- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231117215057844.png)
	- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231117215700296.gif)
	- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231117215824089.png)
### Verify AD Domain Pollution
- Windows + R then type `dsa.msc`
	- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231117221720997.png)
- Launches AD Users and Computers.  Look at objects to confirm pollution.
	- ![](../../__attachments/Honey%20Accounts%20in%20Windows%20AD/Project%20Workspace/IMG-20231117221810889.png)
	- POLLUTED!