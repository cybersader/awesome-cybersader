---
date created: Wednesday, April 3rd 2024, 11:01 am
date modified: Tuesday, April 9th 2024, 10:22 pm
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
		- ![](IMG-20240403192839887.png)
### Duplicati Source Data
- Discussion on Duplicati Source Data selection
	- [Duplicati Source Data](Duplicati%20Source%20Data/Duplicati%20Source%20Data.md)
- Default source data setup
	- ![](IMG-20240403195943758.png)
### Duplicati Backup Schedule
- ![](IMG-20240403200046053.png)
### Choosing Volume Size
- [Choosing Sizes in Duplicati • Duplicati](https://www.duplicati.com/articles/Choosing-Sizes/#remote-volume-size)
- The downside of using larger volumes are seen when restoring files. As Duplicati cannot read data from inside the volumes, it needs to download the entire remote volume before it can extract the desired data. If a file is split across many remote volumes, e.g. due to updates, this will require a large amount of downloads to extract the chunks.
	- Not really an issue
- Use larger volumes with stable connections
- ![](IMG-20240403200649582.png)
### Backing Up to Nextcloud
- Click Run Now
- If you've been using the backup config before, then you will get an error about missing files
	- ![](IMG-20240403200939702.png)
- To start over - [Error while running - Support - Duplicati](https://forum.duplicati.com/t/error-while-running/14111/3)
	- The quickest way to do that is to double check that the destination `W:\work` is still empty, then click on the backup job in the Duplicati Web UI to expand options, then click “Database …”, then click “Delete”. (Don’t click “Repair” or “Recreate”.)
	- With the local database deleted AND the back end empty, the next time you run the backup job it will behave as if it’s the first backup.
- Error with no files showing up and running out of space dur to large volume size chosen (might just mean the temp files were filling up space because they kept failing)
	- Trying with 20 GB volume size instead
	- Still errors -- the only reason my drive is filling up is because it fills the Temp drive with temp files everytime I run Duplicati
- Must be some webdav bug with Nextcloud 
	- [WebDAV connection error using 3rd part app - ℹ️ Support - Nextcloud community](https://help.nextcloud.com/t/webdav-connection-error-using-3rd-part-app/155446) 
- Found another Duplicati forum post
	- [Backup to WeDAV / Nextcloud never completes - Support - Duplicati](https://forum.duplicati.com/t/backup-to-wedav-nextcloud-never-completes/12143) 
	- Look at About > Show log
	- Found error
		- `System.AggregateException: One or more errors occurred. ---> System.AggregateException: The remote server returned an error: (413) Request Entity Too Large. ---> System.Net.WebException: The remote server returned an error: (413) Request Entity Too Large.`
- Trying to fix `Request Entity Too Large` Nextcloud error
	- [Files not getting synced (413 Request Entity Too Large) - ℹ️ Support / 📦 Appliances (Docker, Snappy, VM, NCP, AIO) - Nextcloud community](https://help.nextcloud.com/t/files-not-getting-synced-413-request-entity-too-large/45681/1) 
	- [BadRequest expected filesize during file sync in shared folder · Issue #762 · nextcloud/docker](https://github.com/nextcloud/docker/issues/762#issuecomment-504225433) 
	- [413 Request entity too large error! : r/NextCloud](https://www.reddit.com/r/NextCloud/comments/ugmpbt/413_request_entity_too_large_error/) 
	- [413 error code nextcode | TrueNAS Community](https://www.truenas.com/community/threads/413-error-code-nextcode.108306/)
	- [Uploading big files > 512MB — Nextcloud latest Administration Manual latest documentation](https://docs.nextcloud.com/server/20/admin_manual/configuration_files/big_file_upload_configuration.html?highlight=max%20upload%20size#:~:text=The%20default%20maximum%20file,2GB%20on%2032Bit%20OS%2Darchitecture)
		- For TrueNAS Scale, go to Apps > Nextcloud > edit the config
		- Change Max Upload Size to 200 GB or wherever you want
		- This corresponds to `client_max_body_size` in nginx and both `post_max_size` and `upload_max_filesize` in php
		- Didn't work.  Still getting errors in Duplicati with (413)
	- Trying a bunch of articles to see if there's other files that need changing
		- [Nextcloud 413 Request entity too large | TrueNAS Community](https://www.truenas.com/community/threads/nextcloud-413-request-entity-too-large.103704/)
		- [WebDAV App - "413 Request Entity Too Large" | TrueNAS Community](https://www.truenas.com/community/threads/webdav-app-413-request-entity-too-large.111682/) 
		- [413 error the file is too large - 📱 Desktop & mobile clients / 🍏 iOS - Nextcloud community](https://help.nextcloud.com/t/413-error-the-file-is-too-large/151499) 
		- Found this in Nextcloud > Admin > Admin Settings > System
			- Looks like it's still somehow set to 3GB
			- ![](_attachments/Windows%20Backups%20Duplicati%202024/IMG-20240408223253769.png)
		- ![](_attachments/Windows%20Backups%20Duplicati%202024/IMG-20240408232742589.png)
		- ![](_attachments/Windows%20Backups%20Duplicati%202024/IMG-20240408232856931.png)
		- ![](_attachments/Windows%20Backups%20Duplicati%202024/IMG-20240408233004298.png)
		- ![](_attachments/Windows%20Backups%20Duplicati%202024/IMG-20240408233145136.png)
		- ![](_attachments/Windows%20Backups%20Duplicati%202024/IMG-20240408233847141.png)
	- 