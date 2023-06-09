const logoutButton = new LogoutButton();
logoutButton.action = () => {
  ApiConnector.logout((response) => {
    if (response.success) {
      location.reload();
    }
  });
};

ApiConnector.current((response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
    }
});

const ratesBoard = new RatesBoard();

function fetchRates() {
  ApiConnector.getStocks((response) => {
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    }
  });
}

fetchRates();
setInterval(() => fetchRates(), 60000);

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      const { amount, currency } = data;
      const message = `Баланс пополнен на ${amount} ${currency}.`;
      moneyManager.setMessage(true, message);
    } else {
      moneyManager.setMessage(false, response.error);
    };
  });
};

moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      const { fromCurrency, targetCurrency } = data;
      const message = `Конвертация из ${fromCurrency} в ${targetCurrency} выполнена успешно.`;
      moneyManager.setMessage(true, message);
    } else {
      moneyManager.setMessage(false, response.error);
    };
  });
};

moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      const { amount, currency } = data;
      const message = `Перевод на сумму ${amount} ${currency} выполнен.`;
      moneyManager.setMessage(true, message);
    } else {
      moneyManager.setMessage(false, response.error);
    };
  });
};

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  };
});

favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      const addedUser = data;
      const message = `Пользователь ${addedUser.name} с ID: ${addedUser.id} успешно добавлен.`;
      favoritesWidget.setMessage(true, message);
    } else {
      favoritesWidget.setMessage(false, response.error);
    };
  });
};

favoritesWidget.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      const message = `Пользователь  с ID: ${data} успешно удален.`;
      favoritesWidget.setMessage(true, message);
    } else {
      favoritesWidget.setMessage(false, response.error);
    };
  });
};
