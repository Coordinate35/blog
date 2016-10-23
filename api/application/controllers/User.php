<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends CI_Controller {
    
    public function __construct() {
        parent::__construct();
    }

    public function index() {
        $this->load->model('user_model', 'user');
        $user = $this->user->get_user();
        echo json_encode($user);
    }
}