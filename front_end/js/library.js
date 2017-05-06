function Controller() {

    this.setIndexLink = function() {
        var a = document.getElementById("index");
        a.href = DOMAIN;
    }
}

function RemarkFooter() {

    var publishTime;
    var footContainer;
    var dateArchor;
    var splitNode;
    var replyArchor;
    var remarkId;
    var remarkerName;

    this.construct = function(remarkId, remarkerName, publishTime) {
        this.publishTime = publishTime;
        this.remarkId = remarkId;
        this.remarkerName = remarkerName;

        this._create();
        this.update();

        return this.footContainer;
    }

    this._create = function() {
        this._buildDomTree();
        this._setProperties();
    }

    this._buildDomTree = function() {
        this.footContainer = document.createElement("p");
        this.dateArchor = document.createElement("a");
        this.splitNode = document.createElement("span");
        this.replyArchor = document.createElement("a");
        this.splitNode.innerText = '/';
        this.replyArchor.innerText = "回复";

        this.footContainer.appendChild(this.dateArchor);
        this.footContainer.appendChild(this.splitNode);
        this.footContainer.appendChild(this.replyArchor);
    }

    this._setProperties = function() {
        this.dateArchor.className = this.replyArchor.className = "comment-footer";
        this.footContainer.className = "comment-paragraph";
    }

    this.update = function() {
        this.dateArchor.innerText = this.publishTime;
        this.dateArchor.href = "#";
        this.replyArchor.href = "#comment-block";
    }

    // this.setReplyOnclickFunction = function(replyOnclickFunction) {
    //     this.replyArchor.onclick = function() {
    //         console.log(this.remarkerName);
    //         replyOnclickFunction(this.remarkId, this.remarkerName);
    //     }
    // }

    this.getReplyArchor = function() {
        return this.replyArchor;
    }
}

function RemarkContent() {

    var remarkContent;
    var remarkContentNode;
    var remarkContentParagraph

    this.construct = function(content) {
        this.remarkContent = content;

        this._create();
        this.update();

        return this.remarkContentNode;
    }

    this._create = function() {
        this.remarkContentNode = document.createElement("div");
        this.remarkContentParagraph = document.createElement("p");
        this.remarkContentNode.appendChild(this.remarkContentParagraph);

        this.remarkContentParagraph.className = "comment-paragraph";
    }

    this.update = function() {
        this.remarkContentParagraph.innerHTML = this.remarkContent;
    }
}

function RemarkRemarker() {

    var remarkId;
    var remarkerName;
    var remarkFatherId;
    var remarkedRemarkerName;
    var remarkerWebsite;
    var ROOT_REMARKER_FATHER_ID;

    var remarkNode;
    var remarkerNode;
    var replyContainer;
    var remarkedRemarkerNode;
    var remarkerWebsiteArchor;

    this.construct = function(remarkId, remarkerName, remarkFatherId = ROOT_REMARKER_FATHER_ID, remarkedRemarkerName = "", remarkerWebsite = "") {
        this.remarkId = remarkId;
        this.remarkerName = remarkerName;
        this.remarkFatherId = remarkFatherId;
        this.remarkedRemarkerName = remarkedRemarkerName;
        this.remarkerWebsite = remarkerWebsite;
        this.ROOT_REMARKER_FATHER_ID = 0;

        this._create();
        this.update();

        return this.remarkNode;
    }

    this.hasRemarkedRemarker = function() {
        if (this.ROOT_REMARKER_FATHER_ID == this.remarkFatherId) {
            return false;
        }
        return true;
    }

    this._create = function() {
        this._buildDomTree();
        this._setProperties();
    }

    this._buildDomTree = function() {
        this.remarkNode = document.createElement("span");
        this.remarkerNode = document.createElement("cite");
        this.replyContainer = document.createElement("span");
        this.remarkedRemarkerNode = document.createElement("cite");
        this.remarkerWebsiteArchor = document.createElement("a");
        var replyStringNode = document.createElement("span");
        // var colon = document.createElement("span");
        replyStringNode.innerText = "回复";
        // colon.innerText = ":";

        this.remarkNode.appendChild(this.remarkerNode);
        this.remarkNode.appendChild(this.replyContainer);
        // this.remarkNode.appendChild(colon)
        this.replyContainer.appendChild(replyStringNode);
        this.replyContainer.appendChild(this.remarkedRemarkerNode);
    }

    this._setProperties = function() {
        this.remarkedRemarkerNode.className = "comment-commentor";
        this.remarkerNode.className = "comment-commentor";
        this.remarkerWebsiteArchor.className = "commenter-archor";
    }

    this.update = function() {
        if (this.remarkerWebsite && this.remarkerWebsite.length > 0) {
            this.remarkerNode.appendChild(this.remarkerWebsiteArchor);
            this.remarkerWebsiteArchor.href = this.remarkerWebsite;
            this.remarkerWebsiteArchor.innerText = this.remarkerName;
        } else {
            this.remarkerNode.innerText = this.remarkerName;
        }
        this.remarkedRemarkerNode.innerText = this.remarkedRemarkerName;
        if (this.ROOT_REMARKER_FATHER_ID == this.remarkFatherId) {
            this.replyContainer.style = "display:none";
        }
    }
}

function Remark() {

    var remarker;
    var content;
    var footer;
    var remarkNode;

    this.construct = function(remarkInfo) {
        this._create(remarkInfo);
        return this.remarkNode;
    }

    this._create = function(remarkInfo) {
        this._buildDomTree(remarkInfo);
        this._setProperties(remarkInfo.remark_id);
    }

    this._buildDomTree = function(remarkInfo) {
        this.remarkNode = document.createElement("div");
        this.remarker = new RemarkRemarker();
        this.content = new RemarkContent();
        this.footer = new RemarkFooter();
        var remarkDom = this.remarker.construct(remarkInfo.remark_id, remarkInfo.nickname, remarkInfo.father_id, remarkInfo.father_nickname, remarkInfo.website);
        var contentDom = this.content.construct(remarkInfo.content);
        var footDom = this.footer.construct(remarkInfo.remark_id, remarkInfo.nickname, remarkInfo.publish_time);
        this.remarkNode.appendChild(remarkDom);
        this.remarkNode.appendChild(contentDom);
        this.remarkNode.appendChild(footDom);
    }

    this._setProperties = function(remarkId) {
        this.remarkNode.className = "comment-list";
        this.remarkNode.id = "comment-" + remarkId;
    }

    // this.setReplyOnclickFunction = function(replyOnclickFunction) {
    //     this.footer.setReplyOnclickFunction(replyOnclickFunction);
    // }

    this.getReplyArchor = function() {
        var replyArchor = this.footer.getReplyArchor();
        return replyArchor;
    }
}

function ArticleDom() {

    var articleId;
    var authorName;
    var title;
    var description;
    var content;
    var publishTime;
    var tags;
    var articlePropertyList;
    var headerNode;
    var titleContainer;
    var titleAnchor;
    var publishTimeContainer;
    var publishTimeNode;
    var descriptionContainer;
    var contentContainer;
    var articleNode;

    this.construct = function(articleInfo) {
        var i;
        var key;

        this.articlePropertyList = {
            "articleId": "articleId",
            "authorName": "authorName",
            "title": "title",
            "description": "description",
            "publishTime": "publishTime",
            "tags": "tags",
            "content": "content"
        };
        for (i in this.articlePropertyList) {
            key = this.articlePropertyList[i];
            if (articleInfo[key]) {
                this[i] = articleInfo[key];
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
        this.publishTimeNode = document.createElement('time');
        this.descriptionContainer = document.createElement("div");
        this.contentContainer = document.createElement("div");
        this.readArticleContainer = document.createElement("div");
        this.readArticleArchor = document.createElement("a");

        this.articleNode.appendChild(this.headerNode);
        this.headerNode.appendChild(this.titleContainer);
        this.titleContainer.appendChild(this.titleAnchor);
        this.articleNode.appendChild(this.publishTimeContainer);
        this.publishTimeContainer.appendChild(this.publishTimeNode);
        this.articleNode.appendChild(this.descriptionContainer);
        this.articleNode.appendChild(this.contentContainer);
        this.articleNode.appendChild(this.readArticleContainer);
        this.readArticleContainer.appendChild(this.readArticleArchor);
    }

    this.update = function() {
        this.articleNode.id = "article-" + this.articleId;
        this.titleAnchor.className = "article-title";
        this.titleAnchor.href = PAGE_ARTICLE + "?type=" + REQ_BLOG_TYPE_GET_ARTICLE_BY_ID + "&article_id=" + this.articleId;
        this.titleAnchor.innerText = this.title;
        this.readArticleArchor.href = this.titleAnchor.href;
        this.readArticleArchor.innerText = READ_ARTICLE;

        this.publishTimeContainer.className = "article-meta";

        this.publishTimeNode.className = "publish-time";
        this.publishTimeNode.innerText = this.publishTime;

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