

- https://www.reddit.com/r/Bitwarden/comments/1ewcgns/do_you_think_bitwarden_will_go_passwordless/

- https://www.reddit.com/r/Bitwarden/comments/140g28g/cant_login_on_desktop_with_hardware_key_so_i_have/
- https://swjm.blog/the-complete-guide-to-rdp-with-yubikeys-fido2-cba-1bfc50f39b43
- 

- https://www.crowdstrike.com/en-us/blog/industry-leading-itdr-all-major-cloud-based-identity-providers/#:~:text=Falcon%20Identity%20Protection%20natively%20supports,device%20trust%20in%20real%20time.
- https://www.yubico.com/works-with-yubikey/catalog/rcdevs-openotp/
- https://www.reddit.com/r/privacy/comments/sf1tw5/yubikey_alternatives/
- https://www.yubico.com/products/computer-login-tools/
- https://superuser.com/questions/990297/how-to-use-u2f-key-for-windows-10-login

- https://www.authlite.com/

- https://2fas.com/

- https://www.reddit.com/r/sysadmin/comments/1deaq62/yubikeys_windows_login/
    - This can all be done through Entra ID + AD, no need for a 3rd party MFA provider. If they are authenticating with devices that are not managed, the best way to do it is to use a Yubikey or smartcard for the authentication so they can use it everywhere and then use windows hello for business in the hybrid joined devices (then in that case the Yubikey becomes a backup factor in case their device breaks).
    - Also I saw you asked about using FIDO on Prem (while it is technically possible, I wrote a blog about how it works: https://www.keytos.io/blog/passwordless/fido2-for-on-premises-active-directory.html ) it is not the best route, it is a bit clunky and even all workflows in the cloud support FIDO2, If you are looking at hardware keys I would recommend something that has both SmartCard and FIDO2 then the user can use whatever protocol is supported wherever they are authenticating.

- 

# Open Source Authentication Solutions - Yubikey Usage, Custom SSO, Authenticators

- https://www.yubico.com/support/download/
- https://solokeys.com/
    - https://www.reddit.com/r/linux/comments/mvztcw/solokey_v2_a_fully_open_source_fido2_security_key/
- https://github.com/StrongKey/fido2
- https://www.ory.sh/identity-authentication/
- https://github.com/workos/authkit
- - https://www.opensourcealternative.to/project/authentik
- https://www.opensourcealternative.to/project/zitadel
- https://www.opensourcealternative.to/project/supertokens
- https://www.opensourcealternative.to/project/authelia
- https://www.opensourcealternative.to/project/keycloak
- https://www.opensourcealternative.to/project/cerbos
- https://www.opensourcealternative.to/project/ory

# Lost Yubikey or Unlocked Authenticator

An authenticator implemented with a PIN or other protections is useless if stolen.  They need the PIN to actually do anything with it on a new device - register a new device with it.
- You can protect your higher-tier YubiKeys with a PIN or your fingerprint same as on your cell phone.
    - https://security.stackexchange.com/questions/254645/a-stolen-security-key-enables-full-access-why-are-such-keys-considered-more-sec
- There are definitely scenarios, when security keys will be much less secure than having TOTP app on your protected phone. For example if you keep your Yubikey plugged into your laptop USB all the time (like I have seen some people do) and your laptop is lost or stolen.

- https://support.yubico.com/hc/en-us/articles/360013647620-Losing-Your-YubiKey
- https://security.stackexchange.com/questions/254645/a-stolen-security-key-enables-full-access-why-are-such-keys-considered-more-sec


# Okta & Passwordless in a Windows Environment - most orgs

- https://help.okta.com/en-us/content/topics/directory/configuring_agentless_sso.htm

- https://www.reddit.com/r/okta/comments/1ba3ser/okta_verify_fastpass/
- https://github.com/CCob/okta-terrify
- 

- Doing Passwordless with Okta
    - Requires Okta Verify on Desktop to interface with Windows Hello and Windows under-the-hood
    - Requies Okta Fast Pass to interface Okta Verify with those services you're authenticating to in Okta 
    - https://help.okta.com/oie/en-us/content/topics/identity-engine/devices/fp/fp-asop.htm
    - https://help.okta.com/oie/en-us/content/topics/identity-engine/devices/fp/fp-enable.htm
    - https://www.okta.com/resources/whitepaper-how-to-go-passwordless-with-okta-0/#desktop-single-sign-on-7
    - https://www.okta.com/blog/2022/11/a-deep-dive-into-okta-fastpass/
    - https://help.okta.com/oie/en-us/content/topics/identity-engine/devices/fp/fp-main.htm
    - https://help.okta.com/eu/en-us/content/topics/end-user/ov-sign-in-windows.htm
    - https://help.okta.com/oie/en-us/content/topics/identity-engine/devices/fp/fp-configure.htm
    - https://help.okta.com/oie/en-us/content/topics/oda/windows-mfa/win-mfa-end-user-experience.htm#:~:text=An%20Offline%20one%2Dtime%20password,Offline%20one%2Dtime%20password%22.
    - https://help.okta.com/oie/en-us/content/topics/identity-engine/devices/ov-win-config-uv.htm
    - https://help.okta.com/oie/en-us/content/topics/identity-engine/devices/fp/fp-faq.htm
    - https://support.okta.com/help/s/question/0D54z00008WUlTsCAL/okta-fastpass-without-okta-verify?language=en_US
    - https://help.okta.com/oie/en-us/content/topics/identity-engine-upgrade/ov-with-fp.htm
    - 

- Windows Passwordless and Windows Hello
    - https://community.spiceworks.com/t/windows-hello-requires-enabling-4-digit-pin-sign-on/446168/4
    - https://learn.microsoft.com/en-us/windows/win32/secauthn/winlogon-and-credential-providers
    - https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-enable-passkey-fido2
    - https://learn.microsoft.com/en-us/entra/identity/authentication/howto-authentication-passwordless-security-key-on-premises
    - https://learn.microsoft.com/en-us/windows/security/identity-protection/hello-for-business/policy-settings?tabs=feature
    - https://learn.microsoft.com/en-us/entra/identity/authentication/howto-authentication-passwordless-security-key-on-premises
    - https://techcommunity.microsoft.com/blog/windows-itpro-blog/windows-passwordless-experience-expands/3962005
    - https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-Authentication?WT.mc_id=Portal-fx#enablepasswordlessexperience
    - https://learn.microsoft.com/en-us/windows/security/identity-protection/web-sign-in/?tabs=intune
    - https://learn.microsoft.com/en-us/windows/security/identity-protection/hello-for-business/pin-reset?tabs=intune
    - 
- 