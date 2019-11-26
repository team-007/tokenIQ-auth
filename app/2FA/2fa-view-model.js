const observableModule = require("tns-core-modules/data/observable");
const http = require('tns-core-modules/http');
const topmost = require('tns-core-modules/ui/frame').topmost;
const webViewModule = require("tns-core-modules/ui/web-view");

function goToPushNotificationPage(user) {
    topmost().navigate({
        moduleName: 'push-notification/push-notification-page',
        clearHistory: true,
        context: {
            username: user.username,
            usertoken: user.token
        }
    })
}

function goToLoginPage() {
    topmost().navigate({
        moduleName: 'login/login-page',
        clearHistory: true
    })
}

function TwoFAViewModel() {
    let isLoading = false;
    let showRecaptcha = true;
    let show2faInput = false;

    const viewModel = observableModule.fromObject({
        isLoading,
        showRecaptcha,
        show2faInput,

        verify() {
            let code = viewModel.get('twofacode');
            if(!code) {
              goToLoginPage();
            }
            //TODO: for testing UI
            else {
              viewModel.isLoading = false;
              goToPushNotificationPage(viewModel.get('user'));
            }

            // uncomment below when done testing UI
            // http.request({
            //     //TODO: update url for 2fa
            //     url: 'https://url',
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     content: JSON.stringify({
            //         code: code,
            //         username: USER.username
            //     })
            // }).then(response => {
            //     viewModel.isLoading = false;
            //     if (response.statusCode !== 200) goToLoginPage();
            //     goToPushNotificationPage(USER)
            // }, console.error)
        }
    });

    viewModel.set("webViewSrc", "https://google.com/");
    viewModel.set("result", "");
    viewModel.set("tftext", "https://google.com/");

    return viewModel;
}

module.exports = TwoFAViewModel;
