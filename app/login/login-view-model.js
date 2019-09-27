const observableModule = require("tns-core-modules/data/observable");
const utilityModule = require('tns-core-modules/utils/utils');
const http = require('tns-core-modules/http');
const {alert, confirm} = require("tns-core-modules/ui/dialogs");
const ActivityIndicator = require("tns-core-modules/ui/activity-indicator").ActivityIndicator;
const frameModule = require("tns-core-modules/ui/frame");
const topmost = require('tns-core-modules/ui/frame').topmost;

// function goToPushNotificationPage(user) {
//     topmost().navigate({
//         moduleName: 'push-notification/push-notification-page',
//         clearHistory: true,
//         context: {
//             username: user.username,
//             usertoken: user.token
//         }
//     })
// }

function goTo2FAPage(user) {
    console.log('got user in login: ', user);
    topmost().navigate({
        moduleName: '2FA/2fa-page',
        clearHistory: true,
        context: {
            username: user.username,
            usertoken: user.token
        }
    })
}

function LoginViewModel() {
    isLoading = false;
    const viewModel = observableModule.fromObject({
        isLoading,
        login() {
            viewModel.isLoading = true;

            let username = viewModel.get('username'),
                password = viewModel.get('password');

            //TODO: for testing UI
            viewModel.isLoading = false;
            goTo2FAPage({username,password});

            // uncomment below when done testing UI
            // http.request({
            //     url: "https://dev-tiq-develop.pantheonsite.io/wp-json/aam/v1/authenticate",
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     content: JSON.stringify({
            //         username: username,
            //         password: password
            //     })
            // }).then((response) => {
            //     let responseAsString = String(response.content);
            //     if(responseAsString.substring(1, 9) === "<strong>" || responseAsString === '""') {
            //         confirm({
            //             title: 'Log In Error',
            //             message: 'Error authenticating user with TokenIQ.',
            //             okButtonText: 'Try test server',
            //             cancelButtonText: 'Don\'t try test server'
            //         }).then(result => {
            //             if (!result) return;
            //             http.request({
            //                 url: "https://tokeniq.herokuapp.com/authenticate",
            //                 method: "POST",
            //                 headers: {"Content-Type": "application/json"},
            //                 content: JSON.stringify({
            //                     username: username,
            //                     password: password
            //                 })
            //             }).then((response) => {
            //                 if (response.statusCode !== 202) return alert('Error authenticating user with test server.');
            //                 viewModel.isLoading = false;
            //                 goTo2FAPage(response.content.toJSON())
            //             }, console.error);
            //         });
            //     }
            //     else {
            //         viewModel.isLoading = false;
            //         goTo2FAPage(response.content.toJSON())
            //     }
            // }, console.error);
        },
        signup() {
            utilityModule.openUrl('https://wordpress.com/start/user?ref=homepage');
        }
    });

    return viewModel;
}

module.exports = LoginViewModel;
