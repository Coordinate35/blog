function login_controller() {
    this.login = function() {
        var request_data = {
            "user_name": document.getElementsByName('name').value,
            "password": document.getElementsByName('password').value,
            "type": REQ_ADMIN_TYPE_LOGIN
        };
        send_http_request(HTTP_METHOD_POST, API_ADMIN_VERSION_1, this.login_callback, request_data);
    }

    this.login_callback = function(response_text) {
        alert("haha");
    }
}

var login_controller = new login_controller();