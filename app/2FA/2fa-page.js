const TwoFAViewModel = require('./2fa-view-model');

const twoFAViewModel = new TwoFAViewModel();

exports.pageLoaded = function (args) {
    const page = args.object;
    page.bindingContext = twoFAViewModel;
    let navigationContext = page.navigationContext;
    let user = {
        username: navigationContext.username,
        usertoken: navigationContext.usertoken
    };

    console.log('Got user in 2fa-page:', user);

    twoFAViewModel.setUser(user);

};