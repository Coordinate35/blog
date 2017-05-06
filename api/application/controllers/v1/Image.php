<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Image extends MY_Controller {
    
    private $upload_config;
    private $http_status_code;

    public function __construct() {
        parent::__construct();
        $this->load->helper(array("url", "form"));

        $this->upload_config = array(
            "upload_path" => ARTICLE_IMAGE_UPLOAD_PATH,
            "allowed_types" => ARTICLE_IMAGE_ALLOWED_TYPES,
            "max_size" => ARTICLE_IMAGE_MAX_SIZE,
            "max_width" => ARTICLE_IMAGE_MAX_WIDTH,
            "max_height" => ARTICLE_IMAGE_MAX_HEIGHT
        );
    }

    public function post() {
        $date = date("Y-m-d");
        $time = time();
        $this->upload_config["file_name"] = $date.'-'.$time;
        $this->load->library('upload', $this->upload_config);
        
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
                // 'message' => $this->lang->line('prompt_article_image_upload_success'),
                // 'url' => PROTOCAL.BLOG_DOMIAN.'/'.ARTICLE_IMAGE_URL_PATH.'/'.$this->upload_config["file_name"].$this->upload->data('file_ext')
                'url' => '../'.ARTICLE_IMAGE_URL_PATH.'/'.$this->upload_config["file_name"].$this->upload->data('file_ext')
            );
            $this->http_status_code = HTTP_OK;
        }

        api_output($this->response, $this->http_status_code);
    }
}