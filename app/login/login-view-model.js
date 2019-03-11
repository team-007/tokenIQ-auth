const observableModule = require("data/observable");
const utilityModule = require('tns-core-modules/utils/utils');

function LoginViewModel() {
    const viewModel = observableModule.fromObject({
        login() {
            //  TODO: call WordPress log in here, then open ./home/home-page
        },
        signup() {
            utilityModule.openUrl('https://wordpress.com/start/user?ref=homepage');
        }
    });

    return viewModel;
}

module.exports = LoginViewModel;

