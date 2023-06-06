const userForm = new UserForm();

userForm.registerFormCallback = function(data) {
    ApiConnector.register(data, function(response) {
        console.log(response);
        if (response.success) {
          location.reload(); 
        } else {
          userForm.setRegisterErrorMessage(response.error); 
        }
      });
};

userForm.registerFormCallback = function(data) {
  ApiConnector.register(data, (response) => {
    if (response.success) {
      location.reload();
    } else {
      userForm.setRegisterErrorMessage(response.error);
    }
  });
};