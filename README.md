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
我的帖子、我的收藏和管理帖子（复用同一页面，使用不同逻辑）

发帖页面

完善动态功能，周末看情况加班，争取本周完成前端部分
