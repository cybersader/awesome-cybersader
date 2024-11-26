
- https://www.opensourcealternative.to/project/authentik
- https://www.opensourcealternative.to/project/zitadel
- https://www.opensourcealternative.to/project/supertokens
- https://www.opensourcealternative.to/project/authelia
- https://www.opensourcealternative.to/project/keycloak
- https://www.opensourcealternative.to/project/cerbos
- https://www.opensourcealternative.to/project/ory
- 

# Lost Yubikey or Unlocked Authenticator

An authenticator implemented with a PIN or other protections is useless if stolen.  They need the PIN to actually do anything with it on a new device - register a new device with it.
- You can protect your higher-tier YubiKeys with a PIN or your fingerprint same as on your cell phone.
    - https://security.stackexchange.com/questions/254645/a-stolen-security-key-enables-full-access-why-are-such-keys-considered-more-sec
- There are definitely scenarios, when security keys will be much less secure than having TOTP app on your protected phone. For example if you keep your Yubikey plugged into your laptop USB all the time (like I have seen some people do) and your laptop is lost or stolen.

- https://support.yubico.com/hc/en-us/articles/360013647620-Losing-Your-YubiKey
- https://security.stackexchange.com/questions/254645/a-stolen-security-key-enables-full-access-why-are-such-keys-considered-more-sec


# Okta & Passwordless in a Windows Environment - most orgs

- https://help.okta.com/en-us/content/topics/directory/configuring_agentless_sso.htm
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

- Windows Passwordless and Windows Hello
    - https://learn.microsoft.com/en-us/windows/win32/secauthn/winlogon-and-credential-providers
    - https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-enable-passkey-fido2
    - https://learn.microsoft.com/en-us/entra/identity/authentication/howto-authentication-passwordless-security-key-on-premises

- 