function loginViewController() {
    this.login = function() {
        var requestData = {
            "user_name": document.getElementsByName('name').value,
            "password": document.getElementsByName('password').value,
            "type": REQ_ADMIN_TYPE_LOGIN
        };
        sendHttpRequest(HTTP_METHOD_POST, API_ADMIN_VERSION_1, this.login_callback, request_data);
    }

    this.loginCallback = function(responseData) {
        switch (responseData.httpStateCode) {
            case 200:
                window.location.href(PAGE_ADD_ARTICLE);
                break;
        }
    }
}

var loginViewController = new loginViewController();