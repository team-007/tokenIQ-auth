const observableModule = require("tns-core-modules/data/observable");
const utilityModule = require('tns-core-modules/utils/utils');
const http = require('tns-core-modules/http');
const topmost = require('tns-core-modules/ui/frame').topmost;

function LoginViewModel() {
    const viewModel = observableModule.fromObject({
        login() {
            http.request({
                url: "https://tokeniq.herokuapp.com/authenticate",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({
                    username: viewModel.get('username'),
                    password: viewModel.get('password')
                })
            }).then((response) => {
                const result = response.content.toJSON();
                topmost().navigate({
                    moduleName: 'push-notification/push-notification-page',
                    clearHistory: true,
                    context: {
                        username: result.username,
                        usertoken: result.token
                    }
                })
            }, (e) => {
                console.error(e);
            });
        },
        signup() {
            utilityModule.openUrl('https://wordpress.com/start/user?ref=homepage');
        }
    });

    return viewModel;
}

module.exports = LoginViewModel;