---
date created: Wednesday, April 3rd 2024, 11:01 am
date modified: Wednesday, April 3rd 2024, 3:06 pm
tags:
  - Backups
  - BCDR
  - NAS
  - Windows
  - Duplicati
  - Nextcloud
  - WebDAV
  - OS
---

# Windows Backups
## Duplicati to Nextcloud Using WebDAV Protocol
- Links
	- [Sending backups to NextCloud - Support - Duplicati](https://forum.duplicati.com/t/sending-backups-to-nextcloud/16703/4) 
	- [How to coonect to Nextcloud via WebDav - Support - Duplicati](https://forum.duplicati.com/t/how-to-coonect-to-nextcloud-via-webdav/11799)
	- [Accessing Nextcloud files using WebDAV — Nextcloud latest User Manual latest documentation](https://docs.nextcloud.com/server/latest/user_manual/en/files/access_webdav.html) 
	- What to use for path of server with WebDAV - https://docs.nextcloud.com/server/latest/user_manual/en/files/access_webdav.html#third-party-webdav-clients 
- Connecting Duplicati to Nextcloud with WebDAV 
	- [Accessing Nextcloud files using WebDAV — Nextcloud latest User Manual latest documentation](https://docs.nextcloud.com/server/latest/user_manual/en/files/access_webdav.html#third-party-webdav-clients)
		- `When using a third-party WebDAV client (including your operating system’s built-in client), you should use an application password for login rather than your regular password. In addition improved security, this increases performance significantly <https://github.com/nextcloud/server/issues/32729#issuecomment-1556667151>_. To configure an application password, log into the Nextcloud Web interface, click on the avatar in the top right and choose _Personal settings_. Then choose _Security_ in the left sidebar and scroll to the very bottom. There you can create an app password (which can also be revoked in the future without changing your main user password).`
	- Configure Nextcloud for WebDAV 
		- Account > Personal Settings > Security > Devices & sessions
		- Add app name like "Duplicati-backups"
		- Make an app password that it will use instead of actual password
		- Copy password and use with Duplicati
	- `remote.php/dav/files/USERNAME_HERE/Ben_Windows_PC_Backups`
	- Enter in details and test the connection
		- I have mine behind Cloudflare tunnels, so I use 443 for HTTPS
		- ![](_attachments/Windows%20Backups%202024%20Duplicati/IMG-20240403141956655.png)
	
