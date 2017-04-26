if (!(array_to_urlencode && typeof(array_to_urlencode) == "function")) {
    function dict_to_urlencode(params) {
        var urlencode_params = "";
        for (key in params) {
            if (0 == urlencode_params.length) {
                urlencode_params += key + "=" + params[key];
            } else {
                urlencode_params += "&&" + key + "=" + params[key];
            }
        }
        return urlencode_params;
    }
}

if (!(send_http_request && typeof(send_http_request) == "function")) {
    function send_http_request(method, api, callback, params = {}) {
        var urlencode_params = dict_to_urlencode(params);
        var body_string = "";

        var http = new XMLHttpRequest();
        method.toUpperCase();
        switch (method) {
            case "GET":
                if (0 == urlencode_params.length) {
                    api += "?" + urlencode_params;
                }
                break;
            case "POST":
                body_string = urlencode_params;
                http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                break;
            default:
                return false;
        }
        http.onreadystatechange = function() {
            if (4 == http.readyState) {
                var response = {
                    "http_state_code": http.status,
                    "data": http.responseText
                }
                callback(response_data);
            }
        }

        http.open(method, api, true);
        http.send(body_string);
    }
}