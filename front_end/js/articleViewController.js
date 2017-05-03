function articleViewController() {
    controller.call(this);

    var articleId;
    var remarkedRemarkerId = 0;
    var remarkedRemarkerName = "";
    var remarkContent;
    var remarkerEmail;
    var remarkerNickname;
    var remarkerWebsite;

    this.construct = function() {
        this.setIndexLink();

        var queryParams = getQueryParams();
        this.articleId = queryParams["article_id"];

        this._getArticleAndRender();
    }

    this._getArticleAndRender = function() {
        var requestParams = {
            "type": REQ_BLOG_TYPE_GET_ARTICLE_BY_ID,
            "article_id": this.articleId
        };
        sendHttpRequest(HTTP_METHOD_GET, API_BLOG_VERSION_1, this._getArticleCallback, requestParams);
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

    this.postRemark = function() {
        this.remarkContent = document.getElementById("comment-content-textarea").innerText;
        this.remarkerNickname = document.getElementById("comment-nickname-input").value;
        this.remarkerWebsite = document.getElementById("comment-website-input").value;
        this.remarkerEmail = document.getElementById("comment-email-input").value;

        var requestParams = {
            "father_id": this.remarkedRemarkerId,
            "content": this.remarkContent,
            "nickname": this.remarkerNickname,
            "email": this.remarkerEmail,
            "website": this.remarkerWebsite,
            "type": REQ_BLOG_TYPE_COMMENT,
            "article_id": this.articleId
        };
        sendHttpRequest(HTTP_METHOD_POST, API_BLOG_VERSION_1, this._postRemarkCallback, requestParams);
    }

    this._postRemarkCallback = function(responseData) {
        switch (responseData.httpStateCode) {
            case HTTP_OK:
                var data = responseData.data;
                this._appendComment(data);
                this._clearInput();
                break;
        }
    }

    this._clearInput = function() {
        var remarkContent = document.getElementById("comment-content-textarea");
        var remarkerNickname = document.getElementById("comment-nickname-input");
        var remarkerWebsite = document.getElementById("comment-website-input");
        var remarkerEmail = document.getElementById("comment-email-input");
        remarkContent.innerText = "";
        remarkerNickname.value = "";
        remarkerWebsite.value = "";
        remarkerEmail.value = "";
    }

    this._appendComment = function(data) {
        var remarkList = [data];
        this._renderRemark(remarkList);
    }

    this.setRemarkedRemarker = function(remarkedRemarkerId, remarkedRemarkerName) {
        this.remarkedRemarkerId = remarkedRemarkerId;
        this.remarkedRemarkerName = remarkedRemarkerName;
        this._updateRemarkedRemarker();
        this._displayTargetedCommentHeader();
    }

    this.unsetRemarkedRemarker = function() {
        this.remarkedRemarkerId = 0;
        this.remarkedRemarkerName = "";
        this._displayDefaultCommentHeader();
    }

    this._updateRemarkedRemarker = function() {
        var remarkedRemarkerArchor = document.getElementById("remarked-remarker");
        remarkedRemarkerArchor.innerText = this.remarkedRemarkerName;
    }

    this._displayDefaultCommentHeader = function() {
        this._setTargetedCommentHeaderNone();
        this._setDefaultCommentHeaderBlock();
    }

    this._displayTargetedCommentHeader = function() {
        this._setTargetedCommentHeaderBlock();
        this._setDefaultCommentHeaderNone()
    }

    this._setDefaultCommentHeaderNone = function() {
        var container = document.getElementById("comment-default-container");
        container.style.display = "none";
    }

    this._setDefaultCommentHeaderBlock = function() {
        var container = document.getElementById("comment-default-container");
        container.style.display = "block";
    }

    this._setTargetedCommentHeaderNone = function() {
        var container = document.getElementById("comment-targeted-container");
        container.style.display = "none";
    }

    this._setTargedCommentHeaderBlock = function() {
        var container = document.getElementById("comment-targeted-container");
        container.style.display = "block";
    }
}

var articleViewController = new articleViewController();
articleViewController.construct();