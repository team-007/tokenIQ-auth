const TwoFAViewModel = require('./2fa-view-model');

const twoFAViewModel = new TwoFAViewModel();

exports.pageLoaded = function (args) {
    const page = args.object;
    let navigationContext = page.navigationContext;
    let user = {
        username: navigationContext.username,
        usertoken: navigationContext.usertoken
    };

    twoFAViewModel.set('user', user);
    page.bindingContext = twoFAViewModel;
};