---
publish: true
---
# Registry Keys & Defense Evasion

# Registry Overview

- Place to store configuration or settings
- Key value pairs
- Top level directories in registries
- There are subkeys too
- Settings live in values
- Where it lives
    - Ntuser.dat
    - System32 config
- Uses advapi32.dll

## Top level registries

- Hkey local
    - Needs admin
- Hkey current user
    - No admin

## No evil keys

- All legitimate

# Sus reg key stuff

- Reg.exe delete some key
- Powershell

# Registry forensics

- Procmon
    - Watch keys change with apps
- Crowdstrike overwatch

# Artifact Removal & Sus Activity

- File system navigation
    - Every movement is tracked around files
- Creating then hiding users
    - With registry keys
- Removing artifacts in the registry

## Artifacts from Looking around

- Explorer typed paths
- Mru has history in registry
    - Run command box has history

## Artifacts from Uninstallation

- Legitimate remote access software
- App installation
- Artifact removal

### Apps in windows

- Apps and features in settings has registry keys
- You can hide or change some of these
- Good if you installed rdp stuff

# Wdigest sus activity

- Introed alongside windows xp
- Tons of issues fixed and registries removed because of blatant plaintext exposure in registry

## Allowing the dumping of cleartext wdigest creds

- Change the Uselogoncredential key to allow cleartext
- Then they can dump the creds

# Impair Defenses

- Key in explorer for settings page visbility
- You can hide windows security page
- Shellex context menu handlers reg keys
    - These can hide just about anything from the right click menu
- Hide sys tray

### Disabling

- Disable taskmanager with a key
- Cmd regtools

# Recommendations

- Push some reg key scans with edr tool
- Aggregate data on some of these sus reg key settings
- Push out script with powershell

## Monitoring

- Command line logging event 4688
- Powershell 4104 logging
- Analyze these sources
- Reg.exe, powershell, cmd
-