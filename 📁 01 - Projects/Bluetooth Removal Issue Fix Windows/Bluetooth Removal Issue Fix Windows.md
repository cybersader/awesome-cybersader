---
date created: Friday, March 22nd 2024, 8:45 am
date modified: Friday, March 22nd 2024, 8:55 am
---

- Problem: I couldn't remove my Bose headphones or other devices
- Solution: remove them from within device manager and the Window registry

- [Unable to remove or reconnect bluetooth headset - Microsoft Community](https://answers.microsoft.com/en-us/windows/forum/all/unable-to-remove-or-reconnect-bluetooth-headset/620743d2-dbce-4d6e-bcd8-b5806ec4c14b) 
- [How To Remove Stubborn Bluetooth Devices in Windows | Tom's Hardware](https://www.tomshardware.com/how-to/remove-stubborn-bluetooth-devices-in-windows) 
# Solution
- Device manager: Right click and uninstall 
	- ![](IMG-20240322084701216.png)
	- ![](IMG-20240322084723281.png)
- Registry editor
	- Path: `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\BTHPORT\Parameters\Devices`
	- ![](IMG-20240322085041846.png)
- Reboot 🙂