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

    this._getArticleCallback = function(responseData) {
        switch (responseData.httpStateCode) {
            case HTTP_OK:
                var data = responseData.data;
                this._render(data);
                break;
        }
    }

    this._render = function(data) {
        var articleInfo = {
            "articleId": data.article_id,
            "authorName": data.authorName,
            "title": data.title,
            "content": data.content,
            "publishTime": data.publish_time,
            "tags": data.tags
        };

        this._renderArticle(articleInfo);
        this._renderRemark(data.comments);
    }

    this._renderArticle = function(articleInfo) {
        var articleContainer = document.getElementById("article");
        var articleNode = new articleDom();
        var articleDom = articleNode.construct(data);
        articleDom.setDescriptionNone();
        articleDom.setContentContainerBlock();
        articleContainer.appendChild(articleDom);
    }

    this._renderRemark = function(remarkList) {
        var remarkContainer = document.getElementById("comment");
        for (var i = 0; i < remarkList.length; ++i) {
            var remarkNode = new remark();
            var remarkDom = remarkNode.construct(remarkList[i]);
            remarkContainer.appendChild(remarkDom);
        }
    }
}

var articleViewController = new articleViewController();
articleViewController.construct();