### Connectivity to Workstations & Servers

|System|Context|Hostname|LAN IP|WAN IP|Connection|Username|Password|
|---|---|---|---|---|---|---|---|
|AD Domain|DNS|DOAZLAB.com|192.168.2.4|||||
||NBNS|DOAZLAB||||||
||Domain Admin|||||doazlab\DOAdmin|DOLabAdmin1!|
|Domain Controller|Server 2019|DC01|192.168.2.4|See Azure Portal|RDP via WS01|.\DOAdmin|DOLabAdmin1!|
|Member Workstation|Windows 10|WS01|192.168.2.5|See Azure Portal|RDP via Internet|||
|Attack System|Linux|Nux01|10.0.0.8|See Azure Portal|SSH|doadmin|DOLabAdmin1!|

#### RDP Access
##### Member Server
- Use RDP client to connect to the member server

|Context|Information|
|---|---|
|MSRDP|20.172.140.205|
|Username|doazlab\DOAdmin|
|Password|DOLabAdmin1!|
##### Domain Controller Server
- Use a remote desktop client to access the following system via RDP:

| Context  | Information     |
| -------- | --------------- |
| MSRDP    | 20.163.167.181  |
| Username | doazlab\DOAdmin |
| Password | DOLabAdmin1!    |

##### C2 Server
| Context  | Information     |
| -------- | --------------- |
| MSRDP    | 20.232.164.198  |
| Username | doadmin|
| Password | DOLabAdmin1!    |

ssh doadmin@20.232.164.198