# 博客接口文档

测试环境域名： http://test.api.coordinate35.cn

生产环境域名： http://api.coordinate35.cn

开发环境域名： http://local.api.coordinate35.cn



发送的数据以表单的形式,每个字段的内容是以json格式 所有数据返回都以json的形式



## 后台使用用户名密码登录接口

POST  /v1/admin/info

用户用户名登录，并获取与用户相关信息，并且将token, identifier设置在COOKIES里面

参数：

| 参数名      | 说明                      |
| -------- | ----------------------- |
| name     | 必须，用户的账号名               |
| password | 必须，用户的密码，建议前端进行md5的一次哈希 |
| type     | 必须，为1                   |



成功时返回：

状态码 200

```json
{
  "name": "",
  "last_login_time": ""
}
```

说明：

| 参数名             | 说明         |
| --------------- | ---------- |
| name            | 用户的账号名     |
| last_login_time | 用户上一次登陆的时间 |

## 后台使用identifier/token登录接口

POST  /v1/admin/info

用户登录，并获取与用户相关信息，刷新用于记住我的token，并且将token, identifier设置在COOKIES里面

参数：

| 参数名        | 说明                      |
| ---------- | ----------------------- |
| identifier | 必须，用户的的标识               |
| token      | 必须，用户的密码，建议前端进行md5的一次哈希 |
| type       | 必须，为2                   |



成功时返回：

状态码 200

```json
{
  "name": "",
  "last_login_time": "",
}
```

说明：

| 参数名             | 说明         |
| --------------- | ---------- |
| name            | 用户的账号名     |
| last_login_time | 用户上一次登陆的时间 |



## 发布博文接口

POST /v1/blog/article

用户发布博文的接口

参数：

| 参数名         | 说明            |
| ----------- | ------------- |
| identifier  | 必须，用户的身份标识    |
| token       | 必须，验证用户身份的灵摆  |
| title       | 必须，文章标题       |
| description | 必须，文章的摘要描述    |
| content     | 必须，文章的内容      |
| tags        | 必须，标签之间用\|号隔开 |

成功时返回：

状态码 204



## 发表评论接口

POST /v1/blog/comment

游客发表评论接口

参数：

| 参数名       | 说明                          |
| --------- | --------------------------- |
| father_id | 必须，被评论的评论的id，如果为0，则表示评论文章本身 |
| content   | 必须，评论内容                     |
| nickname  | 必须，评论者昵称                    |
| email     | 必须，评论者的电子邮件                 |
| website   | 可选，评论者的个人主页                 |



成功时返回

状态码 204

## 按时间顺序获取博文列表接口

GET /v1/blog

按时间获取博文列表

参数：

| 参数名    | 说明         |
| ------ | ---------- |
| offset | 必须，博文的偏移量  |
| limit  | 必须，获取的博文数量 |
| type   | 必须，固定为1    |

成功时返回

状态码：200

```json
{
  [
    {
      "article_id": "",
      "author_id": "",
      "author_name": "",
      "title": "",
      "discription": "",
      "publish_time": "",
      "tags": [
        {
          "tag_id": "",
          "content": ""
        }
      ]
    },
  	...
  ]
}
```

参数说明：

| 参数名            | 说明      |
| -------------- | ------- |
| article_id     | 博文的id   |
| author_id      | 博文作者的id |
| author_name    | 博文作者的名字 |
| title          | 博文的标题   |
| description    | 博文的摘要描述 |
| publish_time   | 博文的发布时间 |
| tag_id         | 标签的id   |
| content(tags中) | 标签内容    |



## 按标签，时间顺序获取博文列表

GET /v1/blog

按时间获取博文列表

参数：

| 参数名    | 说明         |
| ------ | ---------- |
| offset | 必须，博文的偏移量  |
| limit  | 必须，获取的博文数量 |
| type   | 必须，固定为2    |
| tag_id | 必须，标签的 id  |

成功时返回

状态码：200

```json
{
  [
    {
      "article_id": "",
      "author_id": "",
      "author_name": "",
      "title": "",
      "discription": "",
      "publish_time": "",
      "tags": [
        {
          "tag_id": "",
          "content": ""
        }
      ]
    },
  	...
  ]
}
```

参数说明：

| 参数名            | 说明      |
| -------------- | ------- |
| article_id     | 博文的id   |
| author_id      | 博文作者的id |
| author_name    | 博文作者的名字 |
| title          | 博文的标题   |
| description    | 博文的摘要描述 |
| publish_time   | 博文的发布时间 |
| tag_id         | 标签的id   |
| content(tags中) | 标签内容    |





## 获取一个博文的具体内容和评论

GET /v1/blog

根据博文的id获取博文的具体内容和评论

参数：

| 参数名        | 说明       |
| ---------- | -------- |
| article_id | 必须，博文的id |
| type       | 必须，固定为3  |

成功时返回：

状态码 200

```json
{
  "article_id": "",
  "author_id": "",
  "author_name": "",
  "title": "",
  "content": "",
  "publish_time": "",
  "tags": [
    {
      "tag_id": "",
      "content": ""
    }
  ],
  "comments": [
    {
      "remark_id": "",
      "content": "",
      "nickname": "",
      "website": "",
      "father_id": "",
      "father_author": "",
      "publish_time": ""
    }
    ...
  ]
}
```

参数说明：

| 参数名                        | 说明          |
| -------------------------- | ----------- |
| article_id                 | 博文的 id      |
| author_id                  | 博文作者的id     |
| author_name                | 博文作者的名字     |
| title                      | 博文的标题       |
| content                    | 博文的内容       |
| publish_time               | 博文发布时间      |
| remark_id                  | 评论的id       |
| content                    | 评论作者的 id    |
| nickname                   | 评论作者的昵称     |
| website                    | 评论作者的个人主页   |
| father_id                  | 被评论的评论的id   |
| father_author              | 被评论的评论的作者昵称 |
| publish_time（comments字段中的） | 评论的发布时间     |
| tag_id                     | 标签的id       |
| content(tags中)             | 标签内容        |

