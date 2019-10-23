const observableModule = require("tns-core-modules/data/observable");
const http = require('tns-core-modules/http');
const {alert, confirm} = require("tns-core-modules/ui/dialogs");

function HomeViewModel() {
  const viewModel = observableModule.fromObject({

    // favoriteFruits: [
    //   { type: "🍎", count: 7 },
    //   { type: "🍌", count: 15 },
    //   { type: "🍍", count: 12 },
    //   { type: "🍒", count: 30 },
    //   { type: "🍇", count: 16 }
    // ]

    user_balance: {
      Amount: 0,
      offer_name: 'None'
    },
    isLoading: false,
    balance: () => {
      viewModel.isLoading = true;

      http.request({
          url: "https://satish-tiq-invest-sandboxes.pantheonsite.io/wp-json/token_iq_api/v1/manage/balances",
          method: "POST",
          headers: { "Content-Type": "application/json" },
      }).then((response) => {
          let responseAsString = String(response.content);
          if(responseAsString.substring(1, 9) === "<strong>" || responseAsString === '""') {
              alert({
                  title: 'Balance Error',
                  message: 'Error getting your balance from TokenIQ.',
                  okButtonText: 'Ok',
              }).then(result => {
              //    TODO: user clicked 'ok' after balance failed
              });
          }
          else {
            viewModel.isLoading = false;
            viewModel.user_balance = response.content.toJSON()
          }
      }, console.error);
    }
  });
  return viewModel;
}

module.exports = HomeViewModel;
