function LoginViewController() {
    Controller.call(this);

    this.construct = function() {
        this.setIndexLink();
    }

    this.login = function() {
        var requestParams = {
            "name": document.getElementsByName('name')[0].value,
            "password": hex_md5(document.getElementsByName('password')[0].value),
            "type": REQ_ADMIN_TYPE_LOGIN
        };
        sendHttpRequest(HTTP_METHOD_GET, API_DOMAIN, API_ADMIN_VERSION_1, this.loginCallback.bind(this), requestParams);
    }

    this.loginCallback = function(responseData) {
        switch (responseData.httpStateCode) {
            case HTTP_OK:
                window.location.href = PAGE_ADD_ARTICLE;
                break;
        }
    }
}

var loginViewController = new LoginViewController();
loginViewController.construct();