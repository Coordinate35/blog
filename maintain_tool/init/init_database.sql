DROP TABLE IF EXISTS article_tag;
DROP TABLE IF EXISTS tag;
DROP TABLE IF EXISTS remark;
DROP TABLE IF EXISTS article;
DROP TABLE IF EXISTS admin;

CREATE TABLE admin(
    admin_id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    identifier VARCHAR,
    token VARCHAR NOT NULL,
    last_login_time INT NOT NULL,
    available BOOLEAN NOT NULL DEFAULT TRUE,
    UNIQUE(name)
);

CREATE TABLE article(
    article_id SERIAL NOT NULL PRIMARY KEY,
    author_id INT NOT NULL REFERENCES admin(admin_id),
    title VARCHAR NOT NULL,
    content TEXT NOT NULL,
    description VARCHAR NOT NULL,
    publish_time INT NOT NULL,
    last_edit_time INT NOT NULL,
    available BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE remark(
    remark_id SERIAL NOT NULL PRIMARY KEY,
    article_id INT NOT NULL REFERENCES article(article_id),
    content VARCHAR NOT NULL,
    nickname VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    website VARCHAR NOT NULL,
    father_id INT NOT NULL,
    root_comment_id INT NOT NULL,
    publish_time INT NOT NULL,
    available BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE tag(
    tag_id SERIAL NOT NULL PRIMARY KEY,
    content VARCHAR NOT NULL,
    available BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE article_tag(
    article_id INT NOT NULL REFERENCES article(article_id),
    tag_id INT NOT NULL REFERENCES tag(tag_id),
    available BOOLEAN NOT NULL DEFAULT TRUE,
    PRIMARY KEY (article_id, tag_id)
);