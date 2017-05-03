if (!(getQueryParams && typeof(getQueryParams) == "function")) {
    function getQueryParams() {
        var queryString = location.search;
        queryString = queryString.substring(1, queryString.length);
        var pairs = queryString.split("&");
        var queryParams = {};
        for (var i = 0; i < pairs.length; ++i) {
            var keyValue = pairs[i].split("=");
            queryParams[decodeURIComponent(keyValue[0])] = decodeURIComponent(keyValue[1]);
        }

        return queryParams;
    }
}

if (!(dictToUrlencode && typeof(dictToUrlencode) == "function")) {
    function dictToUrlencode(params) {
        var urlencodeParams = "";
        for (key in params) {
            if (0 == urlencodeParams.length) {
                urlencodeParams += key + "=" + params[key];
            } else {
                urlencodeParams += "&&" + key + "=" + params[key];
            }
        }

        return urlencodeParams;
    }
}

if (!(sendHttpRequest && typeof(sendHttpRequest) == "function")) {
    function sendHttpRequest(method, host, api, callback, params = {}) {
        var urlencodeParams = dictToUrlencode(params);
        var bodyString = "";
        var REQUEST_COMPLETE = 4;

        var http = new XMLHttpRequest();
        method.toUpperCase();
        switch (method) {
            case "GET":
                if (0 != urlencodeParams.length) {
                    api += "?" + urlencodeParams;
                }
                break;
            case "POST":
                bodyString = urlencodeParams;
                http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                break;
            default:
                return false;
        }
        http.onreadystatechange = function() {
            if (REQUEST_COMPLETE == http.readyState) {
                var response = {
                    "httpStateCode": http.status,
                    "data": http.responseText
                }
                callback(response);
            }
        }

        var resquestUrl = host + api;
        http.open(method, resquestUrl, true);
        http.send(bodyString);
    }
}