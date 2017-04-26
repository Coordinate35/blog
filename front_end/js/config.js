/**
 * Environment config
 */

var ENV = "dev";
// dev, debug, production

switch (ENV) {
    case "dev":
        DOMAIN = 'http://local.api.coordinate35.cn/';
        break;
    case "debug":
        DOMAIN = 'http://debug.api.coordinate35.cn/';
        break;
    case "production":
        DOMAIN = 'http://api.coordinate35.cn/';
        break;
}

var HTML_ROOT = DOMAIN + "html/";
var THIRD_PARTY_LIB_ROOT = "../third_party/";
var EDITOR_LIB_PATH = THIRD_PARTY_LIB_ROOT + "editor.md-master/lib/";

var PAGE_ADD_ARTICLE = HTML_ROOT + "publish.html";

var EDITOR_CONFIG = {
    width: "100%",
    height: 640,
    path: EDITOR_LIB_PATH,
    saveHTMLToTextarea: true,
    imageUpload: true,
    imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
    imageUploadURL: API_IMAGE_VERSION_1,
};

var HTTP_METHOD_POST = 'POST';
var HTTP_METHOD_GET = 'GET';

var API_ADMIN_VERSION_1 = 'v1/admin';
var API_BLOG_VERSION_1 = 'v1/blog';
var API_IMAGE_VERSION_1 = 'v1/image';

var REQ_ADMIN_TYPE_LOGIN = 1;
var REQ_ADMIN_TYPE

var REQ_BLOG_TYPE_ISSUE = 1;
var REQ_BLOG_TYPE_COMMENT = 2;
var REQ_BLOG_TYPE_GET_ARTICLES_BY_TIME = 1;
var REQ_BLOG_TYPE_GET_ARTICLES_BY_TAG = 2;
var REQ_BLOG_TYPE_GET_ARTICLE_BY_ID = 3;
var REQ_BLOG_TYEP_GET_TAGS = 4;