function LoginViewController() {
    Controller.call(this);

    this.construct = function() {
        this.setIndexLink();
    }

    this.login = function() {
        var requestData = {
            "user_name": document.getElementsByName('name').value,
            "password": document.getElementsByName('password').value,
            "type": REQ_ADMIN_TYPE_LOGIN
        };
        sendHttpRequest(HTTP_METHOD_POST, DOMAIN, API_ADMIN_VERSION_1, this.loginCallback.bind(this), request_data);
    }

    this.loginCallback = function(responseData) {
        switch (responseData.httpStateCode) {
            case HTTP_OK:
                window.location.href(PAGE_ADD_ARTICLE);
                break;
        }
    }
}

var loginViewController = new LoginViewController();
loginViewController.construct();