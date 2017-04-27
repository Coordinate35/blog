function controller() {

    this.setIndexLink = function() {
        var a = document.getElementById("index");
        a.href = DOMAIN;
    }
}

function articleDom() {
    var articleId;
    var authorName;
    var title;
    var description;
    var content;
    var publishTime;
    var tags;
    var articlePropertyList = ["articleId", "authorName", "title", "description", "publishTime", "tags", "content"];
    var headerNode;
    var titleContainer;
    var titleAnchor;
    var publishTimeContainer;
    var publishTime;
    var descriptionContainer;
    var contentContainer;
    var articleNode;

    this.construct = function(articleInfo) {
        var i;
        var key;

        for (i in this.articlePropertyList) {
            key = this.articlePropertyList[i];
            if (articleInfo[key]) {
                this[key] = articleInfo[key];
            }
        }

        this._create();
        this.update();
        return this.articleNode;
    }

    this._create = function() {
        this.articleNode = document.createElement("article");
        this.headerNode = document.createElement("header");
        this.titleContainer = document.createElement("h2");
        this.titleAnchor = document.createElement("a");
        this.publishTimeContainer = document.createElement("div");
        this.publishTime = document.createElement('time');
        this.descriptionContainer = document.createElement("div");
        this.contentContainer = document.createElement("div");

        this.articleNode.appendChild(headerNode);
        this.headerNode.appendChild(titleContainer);
        this.titleContainer.appendChild(titleAnchor);
        this.articleNode.appendChild(publishTimeContainer);
        this.publishTimeContainer.appendChild(publishTime);
        this.articleNode.appendChild(descriptionContainer);
        this.articleNode.appendChild(contentContainer);
    }

    this.update = function() {
        this.articleNode.id = "article-" + this.articleId;
        this.titleAnchor.className = "article-title";
        this.titleAnchor.href = DOMAIN + API_BLOG_VERSION_1 + "?type=" + REQ_BLOG_TYPE_GET_ARTICLE_BY_ID + "&article_id" + this.articleId;
        this.titleAnchor.innerText = this.title;

        this.publishTimeContainer.className = "article-meta";

        this.publishTime.className = "publish-time";
        this.publishTime.innerText = this.publishTime;

        this.descriptionContainer.className = "article-introduction";
        this.descriptionContainer.innerHTML = this.description;
        this.contentContainer.className = "article-introduction";
        this.contentContainer.innerHTML = this.content;
    }

    this.setDescriptionNone = function() {
        this.descriptionContainer.style.display = "none";
    }

    this.setDescriptionBlock = function() {
        this.descriptionContainer.style.display = "block";
    }

    this.setContentContainerNone = function() {
        this.contentContainer.style.display = "none";
    }

    this.setContentContainerBlock = function() {
        this.contentContainer.style.display = "block";
    }

    this.getArticleDom = function() {
        return this.articleNode;
    }
}