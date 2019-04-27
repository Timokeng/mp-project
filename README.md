# my-project

> A Mpvue project

## Build Setup

``` bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Work Plan

``` bash
# 2019-4-8
构建环境，诸如axios，api，tip，base等内容，以及图片资源。

# 2019-4-9
首页(完成)

我的页面（未完成，顺延到后一天）的

# 2019-4-10
我的页面的（已完成）

帖子详情页（完成部分，剩下部分顺延到明天玩车）

# 2019-4-11
帖子详情页（已完成）

我的帖子、我的收藏和管理帖子（复用同一页面，使用不同逻辑）（未完成，顺延到后一天）

帮助中心（已完成）

# 2019-4-12
我的帖子、我的收藏和管理帖子（复用同一页面，使用不同逻辑）（已完成）

发帖页面（已完成）

图片上传功能（已完成）

截止2019-4-12前端界面基本全部完成

# 2019-4-13
完成前端部分的各项动态功能（大部分完成）

# 2019-4-14
部分页面下拉刷新功能（已完成）

微信登录功能（已完成）

搜索功能（主要后端工作，并且我暂时没找到好的图标，暂时不管吧）

截止今天 2019-4-14 项目的前端部分已经基本全部完成，剩下的就是服务端和挂服务器的工作了，加油呀！
```

## Fix Plan
``` bash
1、忘了写的置顶和取消置顶操作按钮和逻辑（已完成）

2、lastModified字段在显示前要做处理（已完成）

```