<?php
defined('BASEPATH') OR exit('No direct script access allowed');

const ARTICLE_IMAGE_UPLOAD_PATH = '/mnt/blog/upload/article_image';
const ARTICLE_IMAGE_ALLOWED_TYPES = 'jpg|jpeg|gif|png|bmp|webp';
const ARTICLE_IMAGE_MAX_SIZE = 2048;
const ARTICLE_IMAGE_MAX_WIDTH = 0;
const ARTICLE_IMAGE_MAX_HEIGHT = 0;

const UPLOAD_IMAGE_KEY = 'editormd-image-file';
const ARTICLE_IMAGE_UPLOAD_SUCCESS = 1;
const ARTICLE_IMAGE_UPLOAD_FAILED = 0;
const ARTICLE_IMAGE_URL_PATH = 'upload/article_image';