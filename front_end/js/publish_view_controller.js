function publish_view_controller() {
    var editor;

    this.contruct = function() {
        this.editor = editormd("editormd", EDITOR_CONFIG);
    }

    this.publish = function() {
        var markdown_code = this.editor.getMarkdown();
        var html_code = this.editor.getHTML();
    }
}

var publish_view_controller = new publish_view_controller();
publish_view_controller.contruct();