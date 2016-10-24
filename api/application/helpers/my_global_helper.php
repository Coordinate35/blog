<?php
defined('BASEPATH') OR exit('No direct script access allowed');

if ( ! function_exists('api_output')) {
    
    function api_output($output, $status_code, $method = array()) {
        $CI = &get_instance();
        $CI->output->set_status_header($status_code)->set_content_type("application/json", 'utf8');
        if ((is_array($method)) && (0 < count($method))) {
            $CI->output->set_header('Allow:'.implode(',', $method));
        }
        $CI->output->set_output(json_encode($output))->_display();
        exit;
    }
}