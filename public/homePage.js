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
      const { userName, amount, currency } = data;
      const message = `Перевод на сумму ${amount} ${currency} выполнен для пользователя ${userName}.`;
      moneyManager.setMessage(true, message);
    } else {
      moneyManager.setMessage(false, response.error);
    };
  });
};

