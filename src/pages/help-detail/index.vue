<template>
  <div class="help-detail">
    <div class="box" v-if="type === 'log'">
      <ul class="article">
        <li>1、本程序采用微信登录。</li>
        <li>2、在程序启动时会请求您的授权。</li>
        <li>3、由于本程序大多数功能需要身份认证，必须登陆后才能使用。</li>
        <li>4、本程序保证会尊重用户隐私，您的用户信息除程序本身正当使用外绝不会有其他使用。</li>
      </ul>
    </div>
    <div class="box" v-if="type === 'com'">
      <ul class="article">
        <li>1、进入程序后下端的项目栏有发帖选项。</li>
        <li>2、点击即可进入发帖界面，进行发帖。</li>
      </ul>
    </div>
    <div class="box" v-if="type === 'rep'">
      <ul class="article">
        <li>1、在首页、我的帖子、我的收藏等页面都可进入帖子详情页。</li>
        <li>2、详情页内有明显的评论图标，点击即可进行评论。</li>
      </ul>
    </div>
    <div class="box" v-if="type === 'col'">
      <ul class="article">
        <li>1、在首页、我的帖子、我的收藏等页面都可进入帖子详情页。</li>
        <li>2、详情页有明显的收藏图标，点击即可收藏帖子，再次点击则可取消收藏。</li>
        <li>3、您所收藏的帖子可以在我的收藏界面查看。</li>
      </ul>
    </div>
    <div class="box" v-if="type === 'del'">
      <ul class="article">
        <li>1、进入程序后下端的项目栏有我的选项。</li>
        <li>2、点击即可进入我的界面，在该界面可以找到我的帖子选项，点击即可进入。</li>
        <li>3、在我的帖子界面可以查看自己发布的帖子，并且可做修改和删除操作。</li>
      </ul>
    </div>
  </div>
</template>

<script>


export default {
  data () {
    return {
      type: ''
    }
  },

  components: {

  },

  methods: {
    showTiltle(){
      let str;
      if(this.type === 'log') {str = '如何登陆'}
      if(this.type === 'com') {str = '如何发帖'}
      if(this.type === 'rep') {str = '如何评论'}
      if(this.type === 'col') {str = '如何收藏帖子'}
      if(this.type === 'del') {str = '如何删除帖子'}
      wx.setNavigationBarTitle({
        title: str
      })
    }
  },

  onShow(){
    const { type } = this.$mp.query;
    this.type  = type;
    this.showTiltle();
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped lang="scss">
.help-detail{
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
}
.box{
  background-color: #ffffff;
  border-top: 1px solid #f5f5f5;
  padding: 10px 20px;
  .article{
    font-size: 16px;
    li{
      margin-bottom: 10px;
    }
  }
}
</style>
