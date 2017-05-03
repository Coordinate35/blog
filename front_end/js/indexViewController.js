function IndexViewController() {
    Controller.call(this);

    var offset;
    var limit;

    this.contruct = function() {
        this.offset = 0;
        this.limit = PAGE_ARTICLE_NUMBER;

        this.setIndexLink();
        this._getArticlesAndRender();
    }

    this.getArticlesCallback = function(responseData) {
        switch (responseData.httpStateCode) {
            case HTTP_OK:
                this.offset += PAGE_ARTICLE_NUMBER;
                var data = eval(responseData.data);
                this._renderNewArticle(data);
                break;
        }
    }

    this._getArticlesAndRender = function() {
        var requestParams = {
            "limit": this.limit,
            "offset": this.offset,
            "type": REQ_BLOG_TYPE_GET_ARTICLES_BY_TIME
        };
        sendHttpRequest(HTTP_METHOD_GET, API_DOMAIN, API_BLOG_VERSION_1, this.getArticlesCallback.bind(this), requestParams);
    }

    this._renderNewArticle = function(data) {
        var articleContainer = document.getElementById("content");
        var articleInfo;
        for (var i = 0; i < data.length; ++i) {
            articleInfo = {
                "articleId": data[i].article_id,
                "authorName": data[i].author_name,
                "title": data[i].title,
                "description": data[i].description,
                "publishTime": data[i].publish_time,
                "tags": data[i].tags
            };
            var articleNode = new ArticleDom();
            var articleDom = articleNode.construct(articleInfo);
            articleNode.setDescriptionBlock();
            articleNode.setContentContainerNone();
            articleContainer.appendChild(articleDom);
        }
    }
}

var indexViewController = new IndexViewController();
indexViewController.contruct();