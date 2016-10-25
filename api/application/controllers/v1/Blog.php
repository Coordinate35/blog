<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Blog extends MY_Controller {

    public function __construct() {
        parent::__construct();

        $this->load->model('blog_model', 'blog');
        $this->load->model('admin_model', 'admin');
    }

    public function post() {
        $type = $this->input->post('type');
        switch ($type) {
            case POST_BLOG_TYPE_ADD_ARTICLE:
                $this->_add_article();
                break;
            case POST_BLOG_TYPE_ADD_COMMENT:
                $this->_add_comment();
                break;
            default:
                $this->make_bad_request_response();
        }
    }

    private function _add_article() {
        $add_article_rules = $this->config->item('add_article', 'form_rules');
        $get_method_data = $_GET;
        $this->form_validation->set_data($get_method_data);
        $this->form_validation->set_rules($add_article_rules);
        if (FALSE === $this->form_validation->run()) {
            $this->make_bad_request_response();
        }

        $identifier = get_cookie('identifier');
        $title = $this->input->post('title', TRUE);
        $description = $this->input->post('description', TRUE);
        $content = $this->input->post('content', TRUE);
        $tags = $this->input->post('tags', TRUE);
        $tags = explode('|', $tags);
        $admin_info = $this->admin->get_admin_by_identifier($identifier);
        if (FALSE === $admin_info) {
            $this->make_internal_server_error_response();
        }

        $existed_tags = $this->blog->get_all_tags();
        if (FALSE === $existed_tags) {
            $this->make_internal_server_error_response();
        }
        $new_tags = $this->_filter_new_tags($tags, $existed_tags);
        if (0 < count($new_tags)) {
            if (FALSE === $this->blog->add_tags($new_tags)) {
                $this->make_internal_server_error_response();
            }
        }

        $new_article_id = $this->blog->add_article($title, $description, $content, $admin_info[0]['admin_id']);
        if (FALSE === $new_article_id) {
            $this->make_internal_server_error_response();
        }

        $related_tags = $this->_get_tags_info($tags);
        if (FALSE === $related_tags) {
            $this->make_internal_server_error_response();
        }

        $article_tag = array();
        foreach ($related_tags as $related_tag) {
            $article_tag[] = array(
                'article_id' => $new_article_id,
                'tag_id' => $related_tag['tag_id'],
                'available' => TRUE
            );
        }
        if (FALSE === $this->blog->add_article_tag($article_tag)) {
            $this->make_internal_server_error_response();
        }

        api_output($this->response, HTTP_NO_CONTENT);
    }

    private function _filter_new_tages($tags, $existed_tags) {
        $new_tags = array();
        foreach ($tags as $tag) {
            $is_existed = FALSE;
            foreach ($existed_tags as $existed_tag) {
                if ($tag == $existed_tag['content']) {
                    $is_existed = TRUE;
                }
            }
            if (FALSE === $is_existed) {
                $new_tags[] = $tag;
            }
        }
        return $new_tags;
    }

    private function _get_tags_info($tags) {
        $tags_info = array();
        $tags_info = $this->blog->get_tags_by_content_array($tags);
        return $tags_info;
    }
}