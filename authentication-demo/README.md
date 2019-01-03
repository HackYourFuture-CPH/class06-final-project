# Authorization prototype

Build a prototype authentication setup using github OAuth authentication.

Acceptance criteria:

- The user should be able to register
- The user should be able to sign in
- The user should be able to log out
- When the is signed in, display the text “logged in” in the bottom of the page.

Resources: https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/

## Environmental variables used.

- CALLBACK= The callback used when registering your app at OAuth2.0 provider.
- DB_DATABASE= Database Name.
- DB_HOST= Database Host.
- DB_PASSWORD= Database Password
- DB_PORT= Database Port
- DB_USERNAME= Database username
- CLIENT_ID= Client ID of you get from OAuth2.0 provider.
- CLIENT_SECRET=Client Secret you get from OAuth2.0 provider.
- COOKIE_KEY=Secret string to encrypt cookie.

To use .env file. create a `.env` file at project root. Then `npm install dotenv` and write `require('dotenv').config()` at the top of you server file, then make sure you have added `.env` to your `.gitignore` and then your done!
