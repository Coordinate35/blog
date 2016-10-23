<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User_model extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database();
    }

    public function get_user() {
        $this->db->select('*');
        $this->db->from('admin');
        $this->db->limit(1);
        $result = $this->db->get()->result_array();
        return $result;
    }
}