const { messaging } = require("nativescript-plugin-firebase/messaging");
const { alert, confirm } = require("tns-core-modules/ui/dialogs");
const applicationSettings = require("tns-core-modules/application-settings");
const http = require('tns-core-modules/http')

function PushNotification() {
    let APP_REGISTERED_FOR_NOTIFICATIONS = "APP_REGISTERED_FOR_NOTIFICATIONS";
    let USER = null;

    this.setUser = user => {
        USER = user;
    };

    function sendTokenToBackend(token) {
        if (!USER) {
            alert({
                title: 'Internal Error',
                message: 'Make sure you\'re logged in',
                okButtonText: 'Alright'
            });
            return console.error('No user available');
        }
        http.request({
            url: "https://tokeniq.herokuapp.com/retrieveToken",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({
                push_token: token,
                username: USER.username,
                user_token: USER.usertoken
            })
        }).then(response => {
            if (response.statusCode !== 202) {
                console.error('Unable to send token to server');
            }
        }).catch(console.error);
    }

    this.doRegisterForPushNotifications = function () {
        return new Promise((resolve, reject) => {
            messaging.registerForPushNotifications({
                onPushTokenReceivedCallback: token => {
                    sendTokenToBackend(token);
                    resolve()
                },

                onMessageReceivedCallback: message => {
                    console.log("Push message received in push-view-model: " + JSON.stringify(message));
                    //TODO: handle app in foreground or background, then show notification accordingly
                    setTimeout(() => {
                        alert({
                            title: "Push message!",
                            message: (message !== undefined && message.title !== undefined ? message.title : ""),
                            okButtonText: "Sw33t"
                        }).then(resolve).catch(reject);
                    }, 500);
                },

                // if true, the plugin we are using for firebase will automatically show the notification. if false, then we would have to handle how notification is shown
                showNotifications: false,

                // Whether we want the firebase plugin to always handle the notifications when the app is in foreground.
                // Currently used on iOS only. Default false.
                // When false, we can still force showing it when the app is in the foreground by adding 'showWhenInForeground' to the notification
                showNotificationsWhenInForeground: false
            }).then(() => console.log("Registered for push"));
        })
    };

    this.doRequestContent = function () {
        return new Promise((resolve, reject) => {
            confirm({
                title: "We'd like to send notifications",
                message: "Do you agree? Please do, we won't spam you. Promised.",
                okButtonText: "Yep!",
                cancelButtonText: "Maybe later"
            }).then(pushAllowed => {
                if (pushAllowed) {
                    this.doRegisterForPushNotifications().then(() => {
                        applicationSettings.setBoolean(APP_REGISTERED_FOR_NOTIFICATIONS, true);
                        resolve()
                    }).catch(reject);
                }
            }).catch(reject);
        })
    };

    this.doGetCurrentToken = function () {
        return new Promise(resolve => {
            messaging.getCurrentPushToken()
                .then(token => {
                    // may be null/undefined if not known yet
                    alert({
                        title: "Current Push Registration Token",
                        message: (!token ? "Not received yet" : ("Token: \n\n") + token),
                        okButtonText: "OK, thx"
                    }).then(resolve);
                })
                .catch(err => console.log("Error in doGetCurrentPushToken: " + err));
        })
    };

    this.doUnregisterForNotification = function () {
        messaging.unregisterForPushNotifications().then(
            () => {
                alert({
                    title: "Unregistered",
                    message: "If you were registered, that is.",
                    okButtonText: "Got it, thanks!"
                });
            });
    };

    this.init = function () {
        return new Promise(resolve => {
            console.log('In push init');
            if (applicationSettings.getBoolean(APP_REGISTERED_FOR_NOTIFICATIONS, false)) {
                console.log('App is not registered! Registering ...');
                this.doRequestContent().then(resolve);
            }
            else {
                console.log('App is registered! Getting registration token ...');
                this.doGetCurrentToken().then(resolve);
                resolve();
            }
        })
    };
}

module.exports = PushNotification;