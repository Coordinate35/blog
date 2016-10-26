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

$limit = array(
    'field' => 'limit',
    'label' => 'Limit',
    'rules' => 'trim|required|is_numeric'
);

$offset = array(
    'field' => 'offset',
    'label' => 'Offset',
    'rules' => 'trim|required|is_numeric'
);

$article_id = array(
    'field' => 'article_id',
    'label' => 'Article ID',
    'rules' => 'trim|required|is_numeric'
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
        $limit,
        $offset
    ),
    'get_article_list_by_tag_order_by_time' => array(
        $limit,
        $offset,
        array(
            'field' => 'tag_id',
            'label' => 'Tag ID',
            'rules' => 'trim|required|is_numeric'
        )
    ),
    'add_comment' => array(
        $article_id,
        array(
            'field' => 'father_id',
            'label' => 'Father ID',
            'rules' => 'trim|required|is_numeric'
        ),
        array(
            'field' => 'content',
            'label' => 'Content',
            'rules' => 'trim|required|max_length[500]'
        ),
        array(
            'field' => 'nickname',
            'label' => 'Nickname',
            'rules' => 'trim|required|max_length[30]'
        ),
        array(
            'field' => 'email',
            'label' => 'E-mail',
            'rules' => 'trim|required|valid_email'
        ),
        array(
            'field' => 'website',
            'label' => 'Website',
            'rules' => 'trim|valid_url'
        )
    ),
    'get_article_by_id' => array(
        $article_id
    )
);