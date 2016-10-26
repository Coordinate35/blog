<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Blog_model extends MY_Model {

    public function __construct() {
        parent::__construct();
    }

    public function get_all_tags() {
        $result = $this->db->get_where(TABLE_TAG, array('available' => TRUE))->result_array();
        // return count($result) > 0 ? $result : FALSE;
        return $result;
    }

    public function add_tags($tags) {
        $data = array();
        foreach ($tags as $key => $tags) {
            $data[] = array(
                'content' => $tags,
            );
        }
        return $this->db->insert_batch(TABLE_TAG, $data);
    }

    public function add_article($title, $description, $content, $author_id) {
        $time = time();
        $data = array(
            'title' => $title,
            'description' => $description,
            'content' => $content,
            'author_id' => $author_id,
            'publish_time' => $time,
            'last_edit_time' => $time
        );
        $this->_table = TABLE_ARTICLE;
        if (FALSE === $this->insert_entry($data)) {
            return FALSE;
        }
        return $this->db->insert_id();
    }

    public function get_tags_by_content_array($tags) {
        $this->db->select('tag_id, content');
        $this->db->from(TABLE_TAG);
        $this->db->where_in('content', $tags);
        $this->db->where('available', TRUE);
        $result = $this->db->get()->result_array();
        return count($result) > 0 ? $result : FALSE;
    }

    public function add_article_tag($article_tag) {
        return $this->db->insert_batch(TABLE_ARTICLE_TAG, $article_tag);
    }

    public function get_article_list($limit, $offset) {
        $this->db->select('article_id, author_id, title, content, description, publish_time');
        $this->db->from(TABLE_ARTICLE);
        $this->db->where('available', TRUE);
        $this->db->order_by('publish_time', 'DESC');
        $this->db->limit($limit, $offset);
        $result = $this->db->get()->result_array();
        return $result;
    }

    public function get_tags_by_article_id($article_id) {
        $condition = array(
            'article_id' => $article_id,
            TABLE_ARTICLE_TAG.'.available' => TRUE
        );
        $this->db->select(TABLE_TAG.'.content');
        $this->db->from(TABLE_ARTICLE_TAG);
        $this->db->where($condition);
        $this->db->join(TABLE_TAG, TABLE_ARTICLE_TAG.'.tag_id='.TABLE_TAG.'.tag_id');
        $result = $this->db->get()->result_array();
        return count($result) > 0 ? $result : FALSE;
    }
}