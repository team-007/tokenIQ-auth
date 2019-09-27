const observableModule = require("tns-core-modules/data/observable");
const http = require('tns-core-modules/http');
const topmost = require('tns-core-modules/ui/frame').topmost;

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
    let USER = null;
    let isLoading = false;

    this.setUser = user => {
        console.log('setting user in 2fa-model ...');
        USER = user
    };

    const viewModel = observableModule.fromObject({
        isLoading,
        verify() {
            viewModel.isLoading = true;

            let code = viewModel.get('twofacode');

            //TODO: for testing UI
            console.log(`Got code: ${code}`);
            viewModel.isLoading = false;
            goToPushNotificationPage(USER);

            // uncomment below when done testing UI
            // http.request({
            //     //TODO: update url
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
    })
}

module.exports = TwoFAViewModel;