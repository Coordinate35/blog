function login_view_controller() {
    this.login = function() {
        var request_data = {
            "user_name": document.getElementsByName('name').value,
            "password": document.getElementsByName('password').value,
            "type": REQ_ADMIN_TYPE_LOGIN
        };
        send_http_request(HTTP_METHOD_POST, API_ADMIN_VERSION_1, this.login_callback, request_data);
    }

    this.login_callback = function(response_data) {
        switch (response_data.http_state_code) {
            case 200:
                window.location.href(PAGE_ADD_ARTICLE);
                break;
        }
    }
}

var login_view_controller = new login_view_controller();