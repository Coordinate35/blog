function indexViewController() {
    var offset;
    var limit;

    this._contruct = function() {
        this.offset = 0;
        this.limit = PAGE_ARTICLE_NUMBER;

        this._getArticleAndRender();
    }

    this.getArticleCallback = function(resposneData) {
        switch (responseData.httpStateCode) {
            case HTTP_OK:
                this.offset += PAGE_ARTICLE_NUMBER;
                var data = eval(responseData.data);
                this._renderNewArticle(data);
                break;
        }
    }

    this._getArticleAndRender() = function() {
        var request_params = {
            "limit": this.limit,
            "offset": this.offset,
            "type": REQ_BLOG_TYPE_GET_ARTICLES_BY_TIME
        };
        sendHttpRequest(HTTP_METHOD_GET, API_BLOG_VERSION_1, this.getArticleCallback, request_params);
    }

    this._renderNewArticle = function(data) {
        var ArticleContainer = document.getElementById("content");
        var articleData;
        for (articleData in data) {

        }
    }
}

var indexViewController = new indexViewController();
indexViewController._contruct();