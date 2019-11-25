const observableModule = require("tns-core-modules/data/observable");
const http = require('tns-core-modules/http');
const {alert, confirm} = require("tns-core-modules/ui/dialogs");
const topmost = require('tns-core-modules/ui/frame').topmost;

function goToOfferPage(user) {
    topmost().navigate({
        moduleName: 'offers/offer-page',
        clearHistory: true
    })
}

function HomeViewModel() {
  const viewModel = observableModule.fromObject({

    user_balance: {
      Amount: 0,
      shares: 0,
      offer_name: 'None'
    },
    user_equity: 'None',
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
            viewModel.user_equity = response.content.toJSON()['equity-percentage']
          }
      }, console.error);
    },
    offerTap() {
        console.log("Share action item tapped.");
        goToOfferPage();
    }
  });
  return viewModel;
}

module.exports = HomeViewModel;
