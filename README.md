
# GMail OAuth App Flow


## Motiviation:

An example app to get you started on a google api cli app.

This example follows the recommendations of **'Option 2: Loopback IP address (macOS, Linux, Windows desktop)'** listed on [OAuth 2.0 for Mobile & Desktop Apps](https://developers.google.com/identity/protocols/OAuth2InstalledApp)

`[OAuth Flow] ---> [Loopback Redirect URI] ---> [Fetch Credentials] ---> [Output to Stdout]`


## Install


- `git clone https://github.com/robbywashere/gmail-app-oauth-flow`

- Follow the [Prerequisites](https://developers.google.com/identity/protocols/OAuth2InstalledApp#prerequisites) on googles developer portal.

- Download the credentials from 'Prerequisites' instructions into `gmail-app-oauth-flow` root directory as `.config.json`

- Run `node main.js > .tokens.json` 

- A browser window prompting you for an google auth flow (should) will pop-up

- Complete auth, now `.tokens.json` will contain your token data



## Notes

- Compatible on node 9+
