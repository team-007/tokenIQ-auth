const observableModule = require("tns-core-modules/data/observable");
const PushNotification = require("./PushNotification");
const topmost = require('tns-core-modules/ui/frame').topmost;

exports.pageLoaded = function (args) {
    const page = args.object;
    page.bindingContext = observableModule.fromObject({});
    let pushNotification = new PushNotification();
    console.log('Starting push notification initialization');
    pushNotification.init().then(() => {
        console.log('Done initialization of push notification');
        topmost().navigate({
            moduleName: 'home/home-page',
            clearHistory: true
        })
    });
};