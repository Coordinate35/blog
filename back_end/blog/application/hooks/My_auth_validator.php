<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class My_auth_validator {
    
    private $CI;
    private $url;
    private $origin_url;
    private $url_without_param;
    private $allow_access_with_auth = array();

    public function __construct() {
        $this->CI = &get_instance();

        $this->url = $this->CI->input->server('REQUEST_URI');
        $this->origin_url = $this->url;

        if ($pos = strpos($this->url, '?')) {
            $this->url = substr($this->url, 0, $pos);
        }
        $this->url_without_param = $this->url;
        $method = $this->CI->input->method();
        $this->url = $this->url.'/'.$method;

        if ('get' == $method) {
            $this->url = $this->url.'/'.$this->CI->input->get('type');
        }
        if ('post' == $method) {
            $this->url = $this->url.'/'.$this->CI->input->post('type');
        }

        $this->allow_access_with_auth = array(
            '/v1/blog/post/'.POST_BLOG_TYPE_ADD_ARTICLE,
            '/v1/blog/get/'.GET_BLOG_TYPE_TAGS
        );
    }

    public function is_admin_logined() {
        if ( ! in_array($this->url, $this->allow_access_with_auth)) {
            return;
        }
        $this->CI->load->model('admin_model', 'admin');
        // $this->CI->load->helper('cookie');
        $this->CI->load->helper('password');

        $identifier = get_cookie('identifier', TRUE);
        $token = get_cookie('password', TRUE);

        $admin_info = $this->CI->admin->get_admin_by_identifier($identifier);
        $is_login_timeout = $this->_is_login_timeout($admin_info);
        // $is_set_admin_info_session = $this->_is_set_admin_info_session();
        if (/*(FALSE === $is_set_admin_info_session) || */(FALSE === $admin_info) || ( ! password_verify($token, $admin_info[0]['token'])) || (FALSE === $is_login_timeout)) {
            $response = array();
            $response['error'] = $this->CI->lang->line('prompt_not_authorized');
        }
    }

    private function _is_set_admin_info_session() {
        if (NULL === $this->session->item('admin_id')) {
            return FALSE;
        }
        return TRUE;
    }

    private function _is_login_timeout($admin_info) {
        $current_time = time();
        if ($current_time - $admin_info[0]['last_login_time'] > LOGIN_TIMEOUT) {
            return FALSE;
        }
        return TRUE;
    }
}