<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends MY_Controller {

    public function __construct() {
        parent::__construct();
        
        $this->load->model('user_model', 'user');
    }

    public function register() {
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

        $this->load->helper('password');

        $name = $this->input->post('name', TRUE);
        $password = $this->input->post('password', TRUE);
        $password = password_hash($password, PASSWORD_BCRYPT, ['cost' => 10]);
        $token = md5(openssl_random_pseudo_bytes(120));
        $time = time();
        $data = array(
            'name' => $name,
            'password' => $password,
            'token' => $token,
            'last_login_time' => $time,
        );

        if (FALSE === $this->user->insert_entry($data)) {
            $this->make_internal_server_error_response();
        }

        api_output($this->response, HTTP_NO_CONTENT);
    }
}