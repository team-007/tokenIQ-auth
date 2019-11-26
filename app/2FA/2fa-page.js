const TwoFAViewModel = require('./2fa-view-model');
const webViewModule = require("tns-core-modules/ui/web-view");

const twoFAViewModel = new TwoFAViewModel();

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
    const webview = webargs.object;
    twoFAViewModel.set("result", "Loading Verification Page ...");

    webview.on(webViewModule.WebView.loadFinishedEvent, (args) => {
        let message = "";
        if (!args.error) {
            message = `Finished Loading Verification Page`;
        } else {
            message = `Error loading ${args.url} : ${args.error}`;
        }

        twoFAViewModel.set("result", message);

        if (args.url.trim() === 'https://www.tokeniq.io/') {
            twoFAViewModel.set('show2faInput', true);
            twoFAViewModel.set('showRecaptcha', false);
        }
    });
};