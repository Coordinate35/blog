<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Blog extends MY_Controller {

    public function __construct() {
        parent::__construct();

        $this->load->model('blog_model', 'blog');
        $this->load->model('admin_model', 'admin');
    }

    public function get() {
        $type = $this->input->get('type');
        switch ($type) {
            case GET_BLOG_TYPE_TAGS:
                $this->_get_tags();
                break;
            case GET_BLOG_TYPE_LIST_BY_POST_ORDER_BY_TIME:
                $this->_get_article_list_order_by_time();
                break;
            case GET_BLOG_TYPE_LIST_BY_TAG_ORDER_BY_TIME:
                $this->_get_article_list_by_tag_order_by_time();
                break;
            case GET_BLOG_TYPE_BY_ARTICLE_ID:
                $this->_get_article_by_id();
                break;
            default:
                $this->make_bad_request_response();
        }
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

    private function _add_comment() {
        $add_comment_rules = $this->config->item('add_comment', 'form_rules');
        $this->form_validation->set_rules($add_comment_rules);
        if (FALSE === $this->form_validation->run()) {
            $this->make_bad_request_response();
        }

        $article_id = $this->input->post('article_id', TRUE);
        $father_id = $this->input->post('father_id', TRUE);
        $content = $this->input->post('content', TRUE);
        $nickname = $this->input->post('nickname', TRUE);
        $email = $this->input->post('email', TRUE);
        $website = $this->input->post('website', TRUE);

        if (0 != $father_id) {
            $father_info = $this->blog->get_comment_by_id($father_id);
            if (FALSE === $father_info) {
                $this->make_bad_request_response();
            }
            if (FALSE === $this->blog->add_root_remark($article_id, $father_id, $content, $email, $website, $nickname)) {
                $this->make_internal_server_error_response();
            }
        } else {
            if (FALSE === $this->blog->add_node_remark($article_id, $father_id, $content, $email, $website, $nickname, $father_info['root_remark_id'])) {
                $this->make_internal_server_error_response();
            }
        } 

        api_output($this->response, HTTP_NO_CONTENT);
    }

    private function _get_article_by_id() {
        $get_method_data = $_GET;
        $get_article_by_id_rules = $this->config->item('get_article_by_id', 'form_rules');
        $this->form_validation->set_data($get_method_data);
        $this->form_validation->set_rules($get_article_by_id_rules);
        if (FALSE === $this->form_validation->run()) {
            $this->make_bad_request_response();
        }

        $article_id = $this->input->get("article_id", TRUE);

        $article_info = $this->blog->get_article_by_id($article_id);
        if (FALSE === $article_info) {
            $this->make_internal_server_error_response();
        }
        $tag_info = $this->blog->get_tags_by_article_id($article_id);
        if (FALSE === $tag_info) {
            $this->make_internal_server_error_response();
        }
        $comments = $this->blog->get_comments_by_article_id($article_id);
        if (FALSE === $comments) {
            $this->make_internal_server_error_response();
        }
        $admin = $this->admin->get_admin_by_id($article_info[0]['author_id']);
         if (FALSE === $admin) {
            $this->make_internal_server_error_response();
        }
        $this->response = array(
            'article_id' => $article_info[0]['article_id'],
            'author_name' => $admin[0]['name'],
            'title' => $article_info[0]['title'],
            'content' => $article_info[0]['content'],
            'publish_time' => date('Y-m-d H:i:s', $article_info[0]['publish_time']),
            'tags' => $tag_info,
            'remarks' => array()
        );
        foreach ($comments as $key => $comment) {
            $father_nickname = $this->_get_comment_father_nickname($comments, $comments[$key]['father_id']);
            $this->response['remarks'][$key] = array(
                'remark_id' => $comments[$key]['remark_id'],
                'content' => $comments[$key]['content'],
                'nickname' => $comments[$key]['nickname'],
                'website' => $comments[$key]['website'],
                'father_id' => $comments[$key]['father_id'],
                'father_nickname' => $father_nickname,
                'publish_time' => date('Y-m-d H:i:s', $comments[$key]['publish_time'])
            );
        }
        api_output($this->response, HTTP_OK);
    }

    private function _get_comment_father_nickname($comments, $father_id) {
        foreach ($comments as $key => $comment) {
            if ($father_id == $comment['remark_id']) {
                return $comment['nickname'];
            }
        }
        return NULL;
    }

    private function _get_article_list_by_tag_order_by_time() {
        $get_method_data = $_GET;
        $get_article_list_by_tag_order_by_time_rules = $this->config->item('get_article_list_by_tag_order_by_time', 'form_rules');
        $this->form_validation->set_data($get_method_data);
        $this->form_validation->set_rules($get_article_list_by_tag_order_by_time_rules);
        if (FALSE === $this->form_validation->run()) {
            $this->make_bad_request_response();
        }

        $limit = $this->input->get('limit', TRUE);
        $offset = $this->input->get('offset', TRUE);
        $tag_id = $this->input->get('tag_id', TRUE);

        $article_list = $this->blog->get_article_list_by_tag_id($tag_id, $limit, $offset);
        if (FALSE === $article_list) {
            $this->make_bad_request_response();
        }

        $this->_fill_article_list($article_list);

        api_output($this->response, HTTP_OK);
    }

    private function _get_article_list_order_by_time() {
        $get_method_data = $_GET;
        $get_article_list_order_by_time_rules = $this->config->item('get_article_list_order_by_time', 'form_rules');
        $this->form_validation->set_data($get_method_data);
        $this->form_validation->set_rules($get_article_list_order_by_time_rules);
        if (FALSE === $this->form_validation->run()) {
            $this->make_bad_request_response();
        }

        $limit = $this->input->get('limit', TRUE);
        $offset = $this->input->get('offset', TRUE);
        $article_list = $this->blog->get_article_list($limit, $offset);
        if (FALSE === $article_list) {
            $this->make_internal_server_error_response();
        }

        $this->_fill_article_list($article_list);

        api_output($this->response, HTTP_OK);
    }

    private function _fill_article_list($article_list) {
        foreach ($article_list as $key => $article) {
            $author_info = $this->admin->get_admin_by_id($article['author_id']);
            if (FALSE === $author_info) {
                $this->make_internal_server_error_response();
            }
            $tags_info = $this->blog->get_tags_by_article_id($article['article_id']);
            if (FALSE === $tags_info) {
                $this->make_internal_server_error_response();
            }
            // $tags = array();
            // foreach ($tags_info as $key => $tag_info) {
            //     $tags[$key] = $tag_info['content'];
            // }
            $this->response[$key] = array(
                'article_id' => $article['article_id'],
                'title' => $article['title'],
                'author_name' => $author_info[0]['name'],
                'description' => $article['description'],
                'publish_time' => date('Y-m-d H:i:s', $article['publish_time']),
                'tags' => $tags_info
            );
        }
    }

    private function _get_tags() {
        $existed_tags = $this->blog->get_all_tags();
        if (FALSE === $existed_tags) {
            $this->make_internal_server_error_response();
        }
        $this->response['tags'] = array();
        foreach ($existed_tags as $existed_tag) {
            $this->response['tags'][] = array(
                'tag_id' => $existed_tag['tag_id'],
                'content' => $existed_tag['content']
            );
        }
        api_output($this->response, HTTP_OK);
    }

    private function _add_article() {
        $add_article_rules = $this->config->item('add_article', 'form_rules');
        $get_method_data = $_GET;
        $this->form_validation->set_data($get_method_data);
        $this->form_validation->set_rules($add_article_rules);
        if (FALSE === $this->form_validation->run()) {
            // var_dump($this->form_validation->error_string());
            $this->make_bad_request_response();
        }

        $identifier = get_cookie('identifier');
        $title = $this->input->post('title', TRUE);
        $description = $this->input->post('description', TRUE);
        $content = $this->input->post('content', TRUE);
        $content_md = $this->input->post('content_md', TRUE);
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
        
        $this->db->trans_start();
        if (0 < count($new_tags)) {
            $new_tags = array_unique($new_tags);
            $this->blog->add_tags($new_tags);
        }

        $new_article_id = $this->blog->add_article($title, $description, $content, $content_md, $admin_info[0]['admin_id']);

        $related_tags = $this->_get_tags_info($tags);

        $article_tag = array();
        foreach ($related_tags as $related_tag) {
            $article_tag[] = array(
                'article_id' => $new_article_id,
                'tag_id' => $related_tag['tag_id'],
                'available' => TRUE
            );
        }
        $this->blog->add_article_tag($article_tag);
        $this->db->trans_complete();
        if (FALSE === $this->db->trans_status()) {
            $this->make_internal_server_error_response();
        }

        api_output($this->response, HTTP_NO_CONTENT);
    }

    private function _filter_new_tags($tags, $existed_tags) {
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