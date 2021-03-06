<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once(APPPATH.'config/http_const.php');

require_once(APPPATH.'config/http_type_const.php');

require_once(APPPATH.'config/server_const.php');

require_once(APPPATH.'config/database_const.php');

require_once(APPPATH.'config/article_image_upload_const.php');

class MY_Controller extends CI_Controller {

    protected $response;

    public function __construct() {
        parent::__construct();

        date_default_timezone_set('Asia/Shanghai');

        $this->response = array();

        $this->lang->load("prompt_lang", "english");

        $this->config->load("form_rules", TRUE);

        $this->load->library('form_validation');
        // $this->load->library('session');

        $this->load->helper('MY_global');
        $this->load->helper('cookie');
    }

    protected function make_internal_server_error_response() {
        $this->response['error'] = $this->lang->line('prompt_internal_server_error');
        api_output($this->response, HTTP_INTERNAL_SERVER_ERROR);
    }

    protected function make_bad_request_response() {
        $this->response['error'] = $this->lang->line('prompt_bad_request');
        api_output($this->response, HTTP_BAD_REQUEST);
    }
}