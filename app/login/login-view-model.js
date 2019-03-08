const observableModule = require("data/observable");
const dialogsModule = require("ui/dialogs");
const userService = require("~/services/user-service");
const topmost = require("ui/frame").topmost;

function LoginViewModel() {
    const viewModel = observableModule.fromObject({
        login() {
            //  TODO: call WordPress log in here, then open ./home/home-page
        },
        signup() {
        //    TODO: open browser and set address to WordPress sign up page
        }
    });

    return viewModel;
}

module.exports = LoginViewModel;

