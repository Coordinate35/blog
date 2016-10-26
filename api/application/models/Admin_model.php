<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin_model extends MY_Model {

    public function __construct() {
        parent::__construct();

        $this->_table = TABLE_ADMIN;
    }

    public function get_admin_by_name($name) {
        $condition = array(
            'name' => $name,
            'available' => TRUE
        );
        return $this->get_admin($condition);
    }

    public function get_admin_by_id($admin_id) {
        $condition = array(
            'admin_id' => $admin_id,
            'available' => TRUE
        );
        return $this->get_admin($condition);
    }

    public function get_admin_by_identifier($identifier) {
        $condition = array(
            'identifier' => $identifier,
            'available' => TRUE
        );
        return $this->get_admin($condition);
    }

    public function get_admin($condition) {
        $result = $this->db->get_where($this->_table, $condition)->result_array();
        return count($result) > 0 ? $result : FALSE;
    }

    public function update_login_info($admin_id, $token, $identifier) {
        $data = array(
            'token' => $token,
            'identifier' => $identifier,
            'last_login_time' => time()
        );

        $condition = array(
            'admin_id' => $admin_id,
            'available' => TRUE
        );

        return $this->update($data, $condition);
    }
}