function articleViewController() {
    controller.call(this);

    var articleId;

    this.construct = function() {
        this.setIndexLink();

        var queryParams = getQueryParams();
        this.articleId = queryParams["article_id"];

        this._getArticleAndRender();
    }

    this._getArticleAndRender = function() {
        var request_params = {
            "type": REQ_BLOG_TYPE_GET_ARTICLE_BY_ID,
            "article_id": this.articleId
        };
        sendHttpRequest(HTTP_METHOD_GET, API_BLOG_VERSION_1, this._getArticleCallback, request_params);
    }

    this._getArticleCallback = function() {

    }
}

var articleViewController = new articleViewController();
articleViewController.construct();