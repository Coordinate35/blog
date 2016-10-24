<?php
defined('BASEPATH') OR exit('No direct script access allowed');

const ALLOW_REGISTER = TRUE;

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