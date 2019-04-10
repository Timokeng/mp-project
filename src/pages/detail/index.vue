<template>
  <div class="detail-page">
    <div class="theme">
      <div class="title">{{postDetail.title}}</div>
      <div class="user-info">
        <img :src="postDetail.userImg" />
        <div class="author">{{postDetail.author}}</div>
      </div>
      <div class="message">{{postDetail.message}}</div>
      <div class="action">操作</div>
    </div>
  </div>
</template>

<script>
import api from '@/lib/api.js'
import tip from '@/lib/tip.js'
import base from '../../base.js'

export default {
  data () {
    return {
      postDetail: {},
      id: 1
    }
  },

  components: {

  },

  methods: {
    async getDetail(){
      const res = await api.getPostDetail(this.id);
      if(res.code){
        tip.toast(res.data.message);
        return;
      }
      this.postDetail = res.data;
      console.log(this.postDetail);
    }
  },

  onLoad(){
    const { id } = this.$mp.query;
    this.id  = id;
  },

  onShow(){
    this.getDetail();
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped lang="scss">
.detail-page{
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
}
.theme{
  background-color: #ffffff;
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
  border-top: 1px solid #f5f5f5;
  .title{
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 5px;
    box-sizing: border-box;
  }
  .user-info{
    font-size: 14px;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    img{
      width: 24px;
      height: 24px;
      margin-right: 10px;
    }
  }
  .message{
    font-size: 14px;
    margin-bottom: 20px;
  }
  .action{
    display: flex;
    justify-content: flex-end;
    font-size: 14px;
  }
}
</style>
