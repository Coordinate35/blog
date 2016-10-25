<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User_model extends MY_Model {

    public function __construct() {
        parent::__construct();

        $this->_table = TABLE_ADMIN;
    }

    public function get_user_by_name($name) {
        $condition = array(
            'name' => $name,
            'available' => TRUE
        );
        $result = $this->db->get_where($this->_table, $condition)->result_array();
        return count($result) > 0 ? $result : FALSE;
    }

    public function update_login_info($admin_id, $token) {
        $data = array(
            'token' => $token,
            'last_login_time' => time()
        );

        $condition = array(
            'admin_id' => $admin_id,
            'available' => TRUE
        );

        return $this->update($data, $condition);
    }
}