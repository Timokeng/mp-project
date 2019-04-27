<template>
  <div class="post-index">
    <div class="top-list">
      <div class="top-post" v-for="(item, index) in topList" :key="index" @click="jump('detail', {id: item.id})">
        <span class="icon">置顶</span>
        <span class="title">{{item.title}}</span>
      </div>
    </div>
    <div class="margin-line"></div>
    <div class="post-list">
      <div class="post" v-for="(item, index) in postList" :key="index" @click="jump('detail', {id: item.id})">
        <post-box :post="item"></post-box>
      </div>
    </div>
    <auth-modal :show="showAuthModal" @ok="onGetUserInfoThisPage" ref="auth"></auth-modal>
  </div>
</template>

<script>
import api from '@/lib/api.js'
import tip from '@/lib/tip.js'
import base from '../../base.js'
import postBox from '@/components/post-box.vue'
import authModal from '@/components/auth-modal.vue'

export default {
  mixins: [ base ],
  data () {
    return {
      topList: [],
      postList: [],
      page: 1,
      showAuthModal: false
    }
  },

  components: {
    postBox,
    authModal
  },

  methods: {
    async getTopList(){
      const res = await api.getTopList();
      if(res.code){
        tip.toast(res.data.message);
        return;
      }
      this.topList = res.data.list;
    },

    async getIndexList(ref){
      if(ref){
        this.page = 1;
        const res = await api.getIndexList(this.page);
        if(res.code){
          tip.toast(res.data.message);
          return;
        }
        this.postList = res.data.list;
        this.page++;
      } else{
        const res = await api.getIndexList(this.page);
        if(res.code){
          tip.toast(res.data.message);
          return;
        }
        this.postList = this.postList.concat(res.data.list);
        this.page++;
      }
    },

    async onGetUserInfoThisPage(data){
      await this.onGetUserInfo(data);
      if(!this.showAuthModal){
        this.getTopList();
        this.getIndexList(true);
      }
    }
  },

  created () {
    // let app = getApp()
  },

  async onLoad(){
    await this.login()
    const userInfo = wx.getStorageSync('user-info')
    if(!(userInfo && userInfo.nickName)){
      this.showAuthModal = true;
      return;
    } else {
      this.showAuthModal = false;
    }
    this.getTopList();
    this.getIndexList(true);
  },

  onReachBottom () {
    tip.loading();
    this.getIndexList(false);
    tip.loaded();
  },

  onPullDownRefresh(){
    this.getTopList();
    this.getIndexList(true);
    wx.stopPullDownRefresh();
  },

  onShareAppMessage: function (res) {
    return {
      title: '托马斯论坛',
      path: `pages/index/main`,
      imageUrl:'../../static/mp-logo.jpg'
    }
  },
}
</script>

<style scoped lang="scss">
.post-index {
  background-color: #f5f5f5;
  min-height: 100vh;
}
.top-list{
  background-color: #ffffff;
  width: 100%;
  font-size: 16px;
  margin-bottom: 10xp;
  .top-post{
    border-top: 1px solid #f5f5f5;
    display: flex;
    padding: 10px 15px;
    .icon{
      line-height: 20px;
      text-align: center;
      width: 60px;
      color: #f5f5f5;
      background-color: #4f2fe0;
      margin-right: 10px;
    }
    .title{
      line-height: 20px;
      text-overflow: clip;
    }
  }
  &:last-child{
    border-bottom: 1px solid #f5f5f5;
  }
}
.margin-line{
  height: 10px;
  width: 100%;
  background-color: #f5f5f5;
}
.post-list{
  background-color: #ffffff;
}
</style>
