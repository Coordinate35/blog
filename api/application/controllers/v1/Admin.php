<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends MY_Controller {

    public function __construct() {
        parent::__construct();
        
        $this->load->model('admin_model', 'admin');
        $this->load->helper('password');
    }

    public function get() {
        $type = $this->input->get('type');
        switch ($type) {
            case GET_ADMIN_TYPE_LOGIN_PASSWORD:
                $this->_login_by_password();
                break;
            default:
                $this->make_bad_request_response();
        }
    }

    public function post() {
        $this->_register();
    }

    private function _login_by_password() {
        $login_by_passowrd_rules = $this->config->item('login_by_password', 'form_rules');
        $get_method_data = $_GET;
        $this->form_validation->set_data($get_method_data);
        $this->form_validation->set_rules($login_by_passowrd_rules);
        if (FALSE === $this->form_validation->run()) {
            $this->make_bad_request_response();
        }

        $name = $this->input->get('name', TRUE);
        $password = $this->input->get('password', TRUE);
        $admin_info = $this->admin->get_admin_by_name($name);
        if (FALSE === $admin_info) {
            $this->make_internal_server_error();
        }
        if ( ! password_verify($password, $admin_info[0]['password'])) {
            $this->response['error'] = "Name and password not match";
            api_output($this->response, HTTP_BAD_REQUEST);
        }

        $token = generate_token();
        $hashed_token = password_hash($token, PASSWORD_BCRYPT, ['cost' => 10]);
        $identifier = $this->_generate_identifier($admin_info[0]['admin_id'], $admin_info[0]['name']);
        if (FALSE === $this->admin->update_login_info($admin_info[0]['admin_id'], $hashed_token, $identifier)) {
            $this->make_internal_server_error();
        }

        $this->response['name'] = $name;
        $this->response['last_login_time'] = $admin_info[0]['last_login_time'];
        $this->response['identifier'] = $identifier;
        $this->response['token'] = $token;

        $now = time();

        setcookie('identifier', $identifier, $now + COOKIE_EXPIRED_TIME, '/', COOKIE_DOMAIN);
        setcookie('token', $token, $now + COOKIE_EXPIRED_TIME, '/', COOKIE_DOMAIN);
        setcookie('identifier', $identifier, $now + COOKIE_EXPIRED_TIME, '/', 'blog.coordinate35.cn');
        setcookie('token', $token, $now + COOKIE_EXPIRED_TIME, '/', 'blog.coordinate35.cn');
        setcookie('identifier', $identifier, $now + COOKIE_EXPIRED_TIME, '/', 'api.coordinate35.cn');
        setcookie('token', $token, $now + COOKIE_EXPIRED_TIME, '/', 'api.coordinate35.cn');

        // $this->session->set_userdata('admin_id', $admin_info[0]['admin_id']);

        api_output($this->response, HTTP_OK);
    }

    private function _register() {
        if (FALSE === ALLOW_REGISTER) {
            $this->response["error"] = $this->lang->line("prompt_register_not_allowed");
            api_output($this->response, HTTP_FORBIDDEN);
        }

        $register_rules = $this->config->item('register', 'form_rules');
        $this->form_validation->set_rules($register_rules);
        if (FALSE === $this->form_validation->run()) {
            $this->response['error'] = $this->form_validation->error_string();
            api_output($this->response, HTTP_BAD_REQUEST);
        }

        $name = $this->input->post('name', TRUE);
        $password = $this->input->post('password', TRUE);
        $password = password_hash($password, PASSWORD_BCRYPT, ['cost' => 10]);
        $token = generate_token();
        $time = time();
        $data = array(
            'name' => $name,
            'password' => $password,
            'token' => $token,
            'last_login_time' => $time,
        );

        if (FALSE === $this->admin->insert_entry($data)) {
            $this->make_internal_server_error_response();
        }

        api_output($this->response, HTTP_NO_CONTENT);
    }

    private function _generate_identifier($admin_id, $name) {
        return md5(md5($admin_id).$name);
    }
}