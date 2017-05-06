<?php
defined('BASEPATH') OR exit('No direct script access allowed');

const LOGIN_TIMEOUT = 54000;
const PROTOCAL = "http://";

const ALLOW_REGISTER = TRUE;
const COOKIE_EXPIRED_TIME = 54000;
const COOKIE_DOMAIN = '.coordinate35.cn';

switch (ENVIRONMENT) {
    case 'development':
        define("DOMAIN_NAME", "local.api.coordinate35.cn");
        define("BLOG_DOMIAN", "local.blog.coordinate35.cn");
        break;
    case 'testing':
        define("DOMAIN_NAME", "debug.api.coordinate35.cn");
        define("BLOG_DOMIAN", "debug.blog.coordinate35.cn");
        break;
    case 'production':
        define("DOMAIN_NAME", "api.coordinate35.cn");
        define("BLOG_DOMIAN", "blog.coordinate35.cn");
        break;
}