<?php
defined('BASEPATH') OR exit('No direct script access allowed');

const LOGIN_TIMEOUT = 54000;

const ALLOW_REGISTER = TRUE;
const COOKIE_EXPIRED_TIME = 54000;
const COOKIE_DOMAIN = '.coordinate35.cn';

switch (ENVIRONMENT) {
    case 'development':
        define("DOMAIN_NAME", "local.api.coordinate35.cn");
        break;
    case 'testing':
        define("DOMAIN_NAME", "test.api.coordinate35.cn");
        break;
    case 'production':
        define("DOMAIN_NAME", "api.coordinate35.cn");
        break;
}