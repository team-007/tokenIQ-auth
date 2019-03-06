const observableModule = require("data/observable");
const dialogsModule = require("ui/dialogs");

function HomeViewModel() {
  const viewModel = observableModule.fromObject({
    message: "You have successfully authenticated. This is where you build your core application functionality."
  });

  return viewModel;
}

module.exports = HomeViewModel;
