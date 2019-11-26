const observableModule = require("tns-core-modules/data/observable");
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

    //TODO: one way to insert phone number to web page is to have
    // 'webpage' as a string as follows
    // let phoneNumber = 123
    // let webpage = `<html> ${phoneNumber} </html>`

    let webpage = require('./web_view_2fa.html');
    viewModel.set("webViewSrc", webpage);
    viewModel.set("result", "");
    viewModel.set("tftext", "Code Verification");

    return viewModel;
}

module.exports = TwoFAViewModel;
