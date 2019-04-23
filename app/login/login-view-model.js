const observableModule = require("tns-core-modules/data/observable");
const utilityModule = require('tns-core-modules/utils/utils');
const http = require('tns-core-modules/http');
const dialogs = require("tns-core-modules/ui/dialogs");
const ActivityIndicator = require("tns-core-modules/ui/activity-indicator").ActivityIndicator;
const frameModule = require("tns-core-modules/ui/frame");
const topmost = require('tns-core-modules/ui/frame').topmost;

function LoginViewModel() {
    isLoading = false;
    const viewModel = observableModule.fromObject({
        isLoading,
        login() {
            viewModel.isLoading = true;
            http.request({
                url: "https://interns-tiq-invest-sandboxes.pantheonsite.io/wp-json/aam/v1/authenticate",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({
                    username: viewModel.get('username'),
                    password: viewModel.get('password')
                })
            }).then((response) => {
                //const result = response.content.toJSON();
                var resp_str = String(response.content);
                console.log(resp_str);

                viewModel.isLoading = false;

                if(resp_str.substring(1, 9) == "<strong>" || resp_str == '""') {
                  //console.log("ree");
                  dialogs.alert("Invalid username or password");
                }
                else {
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
                    console.log(response.content);
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
                }
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
