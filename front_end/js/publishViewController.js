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
        var title = document.getElementsByName("title")[0].value;
        var tags = document.getElementsByName("tags")[0].value;

        descriptionMarkdown = this._filterDescription(articleMarkdown, DESCRIPTION_LINES);
        descriptionHtml = this._markdownToHtml(descriptionMarkdown);
        var requestData = {
            "title": title,
            "description": descriptionHtml,
            "content": articleHtml,
            "content_md": articleMarkdown,
            "tags": tags,
            "type": REQ_BLOG_TYPE_ISSUE
        };
        sendHttpRequest(HTTP_METHOD_POST, API_DOMAIN, API_BLOG_VERSION_1, this.publishCallback.bind(this), requestData);
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
            descriptionLines = this._adjustDescriptionLines(articleInLines, descriptionLines);
            while (articleInLines.length > descriptionLines) {
                articleInLines.pop();
            }
            descriptionMarkdown = articleInLines.join('\n');
        }

        return descriptionMarkdown;
    }

    this._adjustDescriptionLines = function(articleInLines, descriptionLines) {
        var codeEdge = 0;
        for (var i = 0; i < descriptionLines; ++i) {
            if (articleInLines[i].indexOf("```") >= 0) {
                codeEdge++;
            }
        }
        if (codeEdge % 2 != 0) {
            while (articleInLines[descriptionLines].indexOf("```") == 0) {
                descriptionLines++;
            }
        }
        return descriptionLines;
    }

    this._markdownToHtml = function(markdown) {
        var fakeContainer = document.createElement('div');
        fakeContainer.id = "fakeContainer";
        fakeContainer.style.display = 'none';
        document.body.appendChild(fakeContainer);
        editormd.markdownToHTML("fakeContainer", {
            markdown: markdown
        });
        descriptionHtml = fakeContainer.innerHTML;
        document.body.removeChild(fakeContainer);
        return descriptionHtml;
    }
}

var publishViewController = new PublishViewController();
publishViewController.contruct();