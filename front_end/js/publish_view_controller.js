function publish_view_controller() {
    var editor;

    this._contruct = function() {
        this.editor = editormd("editormd", EDITOR_CONFIG);
    }

    this.publish = function() {
        var article_markdown = this.editor.getMarkdown();
        var article_html = this.editor.getHTML();
        var description_markdown;
        var description_html;
        var title = document.getElementsByName("title").value;
        var tags = document.getElementsByName("tags").value;

        description_markdown = this._filter_description(article_markdown, DESCRIPTION_LINES);
        description_html = this._markdown_to_html(description_markdown);
        var request_data = {
            "title": title,
            "description": description,
            "content": article_html,
            "content_md": article_markdown,
            "tags": tags,
            "type": REQ_BLOG_TYPE_ISSUE
        };
        send_http_request(HTTP_METHOD_POST, API_BLOG_VERSION_1, this.publish_callback, request_data);
    }

    this.publish_callback = function(response_data) {
        switch (response_data.http_state_code) {
            case 200:
                alert(PUBLISH_ARTICLE_SUCCESS);
                break;
        }
    }

    this._filter_description = function(article, description_lines) {
        var article_in_lines = article.split('\n');
        if (article_in_lines.length < description_lines) {
            description_markdown = article;
        } else {
            while (article_in_lines.length > description_lines) {
                article_in_lines.pop();
            }
            description_markdown = article_in_lines.join('\n');
        }

        return description_markdown;
    }

    this._markdown_to_html = function(markdown) {
        var fake_container = document.createElement('div');
        fake_container.id = "fake_container";
        fake_container.style.display = 'none';
        document.body.appendChild(fake_container);
        editormd.markdownToHTML("fake_container", {
            markdown: markdown
        });
        description_html = fake_container.innerHTML;
        document.body.removeChild(fake_container);
    }
}

var publish_view_controller = new publish_view_controller();
publish_view_controller._contruct();