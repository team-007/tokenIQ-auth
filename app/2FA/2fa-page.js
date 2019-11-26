const TwoFAViewModel = require('./2fa-view-model');
const webViewModule = require("tns-core-modules/ui/web-view");

const twoFAViewModel = new TwoFAViewModel();

//TODO: open webview to trigger firebase,
// then send to 2FAPage on success
exports.pageLoaded = function (args) {
    const page = args.object;
    let navigationContext = page.navigationContext;
    let user = {
        username: navigationContext.username,
        usertoken: navigationContext.usertoken
    };

    twoFAViewModel.set('user', user);
    console.log('set up view model');
    page.bindingContext = twoFAViewModel;
};

exports.onWebViewLoaded = (webargs) => {
    const page = webargs.object.page;
    const webview = webargs.object;
    twoFAViewModel.set("result", "loading recaptcha ...");
    twoFAViewModel.set("enabled", false);

    webview.on(webViewModule.WebView.loadFinishedEvent, (args) => {
        let message = "";
        if (!args.error) {
            message = `WebView finished loading of ${args.url}`;
        } else {
            message = `Error loading ${args.url} : ${args.error}`;
        }

        twoFAViewModel.set("result", message);
        console.log(`WebView message - ${message}`);
        setTimeout(() => {
            twoFAViewModel.set('show2faInput', true);
            twoFAViewModel.set('showRecaptcha', false);
        }, 5000)
    });
};