function PublishViewController() {
    Controller.call(this);

    var editor;

    this.contruct = function() {
        this.setIndexLink();
        this.editor = editormd("editormd", EDITOR_CONFIG);
    }

    this.publish = function() {
        var articleMarkdown = this.editor.getMarkdown();
        var articleHtml = this.editor.getHTML();
        var descriptionMarkdown;
        var descriptionHtml;
        var title = document.getElementsByName("title").value;
        var tags = document.getElementsByName("tags").value;

        descriptionMarkdown = this._filterDescription(articleMarkdown, DESCRIPTION_LINES);
        descriptionHtml = this._markdownToHtml(descriptionMarkdown);
        var requestData = {
            "title": title,
            "description": description,
            "content": articleHtml,
            "content_md": articleMarkdown,
            "tags": tags,
            "type": REQ_BLOG_TYPE_ISSUE
        };
        sendHttpRequest(HTTP_METHOD_POST, DOMAIN, API_BLOG_VERSION_1, this.publishCallback.bind(this), requestData);
    }

    this.publishCallback = function(responseData) {
        switch (responseData.httpStateCode) {
            case HTTP_OK:
                alert(PUBLISH_ARTICLE_SUCCESS);
                break;
        }
    }

    this._filterDescription = function(article, descriptionLines) {
        var articleInLines = article.split('\n');
        if (articleInLines.length < descriptionLines) {
            descriptionMarkdown = article;
        } else {
            while (articleInLines.length > descriptionLines) {
                articleInLines.pop();
            }
            descriptionMarkdown = articleInLines.join('\n');
        }

        return descriptionMarkdown;
    }

    this._markdownToHtml = function(markdown) {
        var fakeContainer = document.createElement('div');
        fakeContainer.id = "fakeContainer";
        fakeContainer.style.display = 'none';
        document.body.appendChild(fake_container);
        editormd.markdownToHTML("fakeContainer", {
            markdown: markdown
        });
        descriptionHtml = fakeContainer.innerHTML;
        document.body.removeChild(fakeContainer);
    }
}

var publishViewController = new PublishViewController();
publishViewController.contruct();