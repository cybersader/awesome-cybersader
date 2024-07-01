--- 
- [Where's the Data](#Where's%20the%20Data)
- [Where are we then?](#Where%20are%20we%20then?)
- [The Test Environment](#The%20Test%20Environment)
- [Key Takeaways for Logging](#Key%20Takeaways%20for%20Logging)
- [Attack Path](#Attack%20Path)
	- [Key Theft](#Key%20Theft)
	- [Visibility in this stage](#Visibility%20in%20this%20stage)
	- [Create SAML Key](#Create%20SAML%20Key)
	- [Build Access Token](#Build%20Access%20Token)
	- [Things to Look For](#Things%20to%20Look%20For)
		- [Creds](#Creds)
		- [Access](#Access)
		- [Persistence & Movement](#Persistence%20&%20Movement)
		- [Actions on Objectives](#Actions%20on%20Objectives)
	- [Azure](#Azure)

--- 
# Where's the Data
- Saw some logs that were missing in Splunk and couldn't figure out why
- Tried it in Sentinel and in Chronicle and same result
- Cloud is great, but you can lost some fidelity sometimes without explanation
# Where are we then?
- Azure is great for key changes, but you won't have the granularity that you have in an on-prem environment
- Cloud misses logs sometimes...SOMETIMES KEY LOGS FOR CERTAIN DETECTIONS
# The Test Environment
- Tied bunch of systems together with ADFS (secured) and Azure AD connect to connect AD with AAD (azure in cloud)
- Wanted to run Golden SAML attack

# Key Takeaways for Logging
![](__attachments/Blue%20Team%20Summit%202023/IMG-I%20Want%20the%20Log%20I%20Can't%20Have-2024063021.png)

# Attack Path
![](__attachments/Blue%20Team%20Summit%202023/IMG-I%20Want%20the%20Log%20I%20Can't%20Have-2024063021-23.png)

## Key Theft
![](__attachments/Blue%20Team%20Summit%202023/IMG-I%20Want%20the%20Log%20I%20Can't%20Have-2024063021-24.png)

## Visibility in this stage
![](__attachments/Blue%20Team%20Summit%202023/IMG-I%20Want%20the%20Log%20I%20Can't%20Have-2024063021-25.png)

## Create SAML Key
![](__attachments/Blue%20Team%20Summit%202023/IMG-I%20Want%20the%20Log%20I%20Can't%20Have-2024063021-26.png)

## Build Access Token
![](__attachments/Blue%20Team%20Summit%202023/IMG-I%20Want%20the%20Log%20I%20Can't%20Have-2024063021-27.png)

## Things to Look For
### Creds
![](__attachments/Blue%20Team%20Summit%202023/IMG-I%20Want%20the%20Log%20I%20Can't%20Have-2024063021-28.png)

### Access
![](__attachments/Blue%20Team%20Summit%202023/IMG-I%20Want%20the%20Log%20I%20Can't%20Have-2024063021-29.png)

### Persistence & Movement
![](__attachments/Blue%20Team%20Summit%202023/IMG-I%20Want%20the%20Log%20I%20Can't%20Have-2024063021-30.png)

### Actions on Objectives
- No viz into Get commands with Graph API
- ![](__attachments/Blue%20Team%20Summit%202023/IMG-I%20Want%20the%20Log%20I%20Can't%20Have-2024063021-31.png)

# Azure Log Sources
**![](__attachments/Blue%20Team%20Summit%202023/IMG-I%20Want%20the%20Log%20I%20Can't%20Have-2024063021-32.png)

![](__attachments/Blue%20Team%20Summit%202023/IMG-I%20Want%20the%20Log%20I%20Can't%20Have-2024063021-33.png)

