# Setup

*This setup assumes that Nativescript is successfully installed*

- [Terminal/Command Prompt] Navigate to directory or create new directory
- If you created a new directory, run 
>`git init`
- Set directory's git remote to remote repo 
>`git remote add origin https://github.com/team-007/tokenIQ-auth.git`.

if you have ssh setup for git, you can run 
>`git remote add origin git@github.com:team-007/tokenIQ-auth.git`

- Pull the **notification** branch and switch to it
>`git pull origin notification`

>`git checkout notification`

- Install dependencies. Firebase plugin (nativescript-plugin-firebase) will also be installed.
>`npm i`

- To make sure all necessary components needed for Nativescript are installed, run
>`tns doctor`

if you get an error or warning about a missing component, follow the instructions on Nativescript setup [for mac](https://docs.nativescript.org/start/ns-setup-os-x) or [for windows](https://docs.nativescript.org/start/ns-setup-win)

- Ask [Olu](github.com/weirdestnerd) for google services file. For mac, *GoogleService-info.plist* file, which will be added at *app/App_Resources/iOS/GoogleService-Info.plist*. For Android, *google-services.json* file, which will be added at *app/App_Resources/Android/google-services.json*.
 
 This file contains information needed for authentication by the Firebase plugin in order to use the project under Olu's firebase account. The same auth info are used by the server to trigger FCM notifications. If you want to use your own firebase project, you can create your Firebase project at the <https://console.firebase.google.com> and click 'Add app' to add an iOS and / or Android app. Then, go to 'Project Settings' on your firebase console, go to 'Service Accounts', generate new private key, save the json file. On the [server](https://github.com/team-007/notification-server), add the json file to project directory. In *'routes/notifier.js'*, change name of PRIVATE_KEY_FILE to yours at
 
 `let accountKey = require(path.join(__dirname, '../PRIVATE_KEY_FILE.json'))` 

Restart the server.

- Finally, start the app
>`tns run ios`

>`tns run android`

##### Files to watch

- app/login/login-view-model.js: handles authorization of user
- app/push-notification/PushNotification.js: handles app registration for notification and receiving remote notification from Firebase Cloud Messaging