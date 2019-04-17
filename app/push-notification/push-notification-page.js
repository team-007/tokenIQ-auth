const observableModule = require("tns-core-modules/data/observable");
const PushNotification = require("./PushNotification");
const topmost = require('tns-core-modules/ui/frame').topmost;

exports.pageLoaded = function (args) {
    const page = args.object;
    page.bindingContext = observableModule.fromObject({});
    let navigationContext = page.navigationContext;
    let user = {
        username: navigationContext.username,
        usertoken: navigationContext.usertoken
    };

    let pushNotification = new PushNotification();
    pushNotification.setUser(user);
    pushNotification.init().then(() => {
        topmost().navigate({
            moduleName: 'home/home-page',
            clearHistory: true
        })
    });
};