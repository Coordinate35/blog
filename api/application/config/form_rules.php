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
    ),
    'add_article' => array(
        array(
            'field' => 'title',
            'label' => 'Title',
            'rules' => 'trim|required|max_length[60]'
        ),
        array(
            'field' => 'description',
            'label' => 'Descirption',
            'rules' => 'trim|required|max_length[500]'
        ),
        array(
            'field' => 'content',
            'label' => 'Content',
            'rules' => 'trim|required'
        ),
        array(
            'field' => 'tags',
            'label' => 'Tags',
            'rules' => 'trim|required|max_length[50]'
        )
    ),
    'get_article_list_order_by_time' => array(
        array(
            'field' => 'limit',
            'label' => 'Limit',
            'rules' => 'trim|required|is_numeric'
        ),
        array(
            'field' => 'offset',
            'label' => 'Offset',
            'rules' => 'trim|required|is_numeric'
        )
    )
);