const observableModule = require("tns-core-modules/data/observable");
const utilityModule = require('tns-core-modules/utils/utils');
const http = require('tns-core-modules/http');

function LoginViewModel() {
    const viewModel = observableModule.fromObject({
        login() {
            http.request({
                url: "tokeniq.io/wp-json/aam/v1/authenticate",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({
                    username: viewModel.get('username'),
                    password: viewModel.get('password')
                })
            }).then((response) => {
                //TODO: if success, response.content is JSON, else is string
                const result = response.content.toJSON();
            }, (e) => {
            });
        },
        signup() {
            utilityModule.openUrl('https://wordpress.com/start/user?ref=homepage');
        }
    });

    return viewModel;
}

module.exports = LoginViewModel;

