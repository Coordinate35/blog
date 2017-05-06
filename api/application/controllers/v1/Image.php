<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Image extends MY_Controller {
    
    private $config;
    private $http_status_code;

    public function __construct() {
        parent::__construct();
        $this->load->helper(array("url", "form"));

        $this->config = array(
            "upload_path" => ARTICLE_IMAGE_UPLOAD_PATH,
            "allow_types" => ARTICLE_IMAGE_ALLOW_TYPES,
            "max_size" => ARTICLE_IMAGE_MAX_SIZE,
            "max_width" => ARTICLE_IMAGE_MAX_WIRTH,
            "max_height" => ARTICLE_IMAGE_MAX_HEIGHT
        );
    }

    public function post() {
        $date = date("Y-m-d");
        $time = time();
        $this->config["file_name"] = $date.'~'.$time;
        $this->load->library('upload', $this->config);
        
        if (FALSE === $this->upload->do_upload(UPLOAD_IMAGE_KEY)) {
            $this->response['error'] = array(
                'success' => ARTICLE_IMAGE_UPLOAD_FAILED,
                'message' => $this->upload->display_errors(),
                'url' => ""
            );
            $this->http_status_code = HTTP_INTERNAL_SERVER_ERROR;
        } else {
            $this->response = array(
                'success' => ARTICLE_IMAGE_UPLOAD_SUCCESS,
                'message' => $this->lang->line('prompt_article_image_upload_success'),
                'url' => PROTOCAL.ARTICLE_IMAGE_URL_PATH.$this->config["file_name"]
            );
            $this->http_status_code = HTTP_OK;
        }

        api_output($this->response, $this->http_status_code);
    }
}