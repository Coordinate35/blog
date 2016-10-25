<?php
defined('BASEPATH') OR exit('No direct script access allowed');

$admin_name = array(
    'field' => 'name',
    'label' => 'Name',
    'rules' => 'trim|required|max_length[20]'
);

$admin_password = array(
    'field' => 'password',
    'label' => 'Password',
    'rules' => 'trim|required|exact_length[32]|alpha_numeric'
); 

$config = array(
    'register' => array(
        $admin_name,
        $admin_password        
    ),
    'login_by_password' => array(
        $admin_name,
        $admin_password
    )
);