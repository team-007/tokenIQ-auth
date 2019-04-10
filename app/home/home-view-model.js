const observableModule = require("tns-core-modules/data/observable");

function HomeViewModel() {
  const viewModel = observableModule.fromObject({

    favoriteFruits: [
      { type: "🍎", count: 7 },
      { type: "🍌", count: 15 },
      { type: "🍍", count: 12 },
      { type: "🍒", count: 30 },
      { type: "🍇", count: 16 }
    ]
  });
  return viewModel;
}

module.exports = HomeViewModel;
