function indexViewController() {
    controller.call(this);

    var offset;
    var limit;

    this.contruct = function() {
        this.offset = 0;
        this.limit = PAGE_ARTICLE_NUMBER;

        this.setIndexLink();
        this._getArticlesAndRender();
    }

    this.getArticlesCallback = function(resposneData) {
        switch (responseData.httpStateCode) {
            case HTTP_OK:
                this.offset += PAGE_ARTICLE_NUMBER;
                var data = eval(responseData.data);
                this._renderNewArticle(data);
                break;
        }
    }

    this._getArticlesAndRender = function() {
        var request_params = {
            "limit": this.limit,
            "offset": this.offset,
            "type": REQ_BLOG_TYPE_GET_ARTICLES_BY_TIME
        };
        sendHttpRequest(HTTP_METHOD_GET, API_BLOG_VERSION_1, this.getArticlesCallback, request_params);
    }

    this._renderNewArticle = function(data) {
        var articleContainer = document.getElementById("content");
        var articleInfo;
        for (var i = 0; i < data.length; ++i) {
            articleInfo = data[i];
            var articleNode = new articleDom();
            var articleDom = articleNode.construct(articleInfo);
            articleDom.setDescriptionBlock();
            articleDom.setContentContainerNone();
            articleContainer.appendChild(articleDom);
        }
    }
}

var indexViewController = new indexViewController();
indexViewController.contruct();