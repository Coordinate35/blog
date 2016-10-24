<?php
defined('BASEPATH') OR exit('No direct script access allowed');

$config = array(
    'register' => array(
        array(
            'field' => 'name',
            'label' => 'Name',
            'rules' => 'trim|required|max_length[20]'
        ),
        array(
            'field' => 'password',
            'label' => 'Password',
            'rules' => 'trim|required|exact_length[32]|alpha_numeric'
        )
    )
);