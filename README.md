# bookadminvue

bookadminvue 是一个基于 Vue-element-admin 的 epub 图书管理后台的前端项目，主要包含用户登录，用户token鉴权，epub文件自动解析，电子书列表，电子书新增，电子书编辑等

bookadminnode 是一个基于 node.js 的 epub 图书管理后台的后端项目，主要包含用户登录，用户token鉴权，epub文件自动解析，电子书列表，电子书新增，电子书编辑等

# 安装

`
  git clone 
  <!-- 连个项目文件分别安装 -->
  npm i 
`
# 配置服务端

使用 nginx，需启动 nginx，并按照 constant.js 文件的常量配置对应的存储路径，或者是替换 nginx 配置文件的路径


# 配置 mysql

按照 db 文件夹下的 config.js 修改对应配置就可以，或者将配置项的修改为本机的配置。

# 启动

## 后端
`node app.js`
## 前端
`npm run dev`
