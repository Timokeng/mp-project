<template>
  <div class="commit-page">
    <div class="item-list">
      <div class="item">
        <div class="title">标题</div>
        <input class="inp" v-model="post.title" maxlength="30" />
      </div>
      <div class="item">
        <div class="title">正文</div>
        <textarea class="inp"
         v-model="post.message" 
         maxlength="1000" 
         show-confirm-bar="false" 
        />
      </div>
      <div class="item">
        <div class="title">图片</div>
        <div class="img-box">
            <div class="upload-image" @click="uploadImage" v-if="count !== 0">上传图片</div>
            <div class="image-box" v-for="(item,index) in post.imageList" :key="index">
                <img :src="item" />
                <img class="delete-img" src="../../../static/icon/delete-icon.png" @click="deleteImg(index)" />
            </div>
        </div>
      </div>
    </div>
    <div class="commit-button" @click="commitPost">
      <div class="title">{{id?'修改帖子':'发布帖子'}}</div>
    </div>
    <auth-modal :show="showAuthModal" @ok="onGetUserInfo" ref="auth"></auth-modal>
  </div>
</template>

<script>
import api from '@/lib/api.js'
import tip from '@/lib/tip.js'
import base from '../../base.js'
import authModal from '@/components/auth-modal.vue'

export default {
  mixins: [base],

  data () {
    return {
      id: null,
      post: {
        title: '',
        message: '',
        imageList: []
      },
      count: 9,
      showAuthModal: false,
      refresh: true
    }
  },

  components: {
    authModal
  },

  methods: {
    async getThemeInfo(){
      const res = await api.getTheme(this.id);
      if(res.code){
        tip.toast(res.data.message);
        wx.switchTab({
          url: '/pages/mine/main'
        })
      }
      console.log(res);
      this.post = res.data;
      this.count -= this.post.imageList.length;
    },

    deleteImg(index) {
      this.count++;
      this.post.imageList.splice(index, 1);
    },

    uploadImage(){
      let tempFilePaths = [];
      if(!this.count){
          tip.toast('上传图片已经达到上限');
          return;
      }
      this.refresh = false;
      const that = this;
      wx.chooseImage({
        count: this.count,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          tempFilePaths = res.tempFilePaths;
          that.count = that.count - tempFilePaths.length;
          let token = wx.getStorageSync('token');
          while(tempFilePaths.length){
            wx.uploadFile({
                url: `http://localhost:3000/image`,  //==== 此处还是mock数据，完整项目这里还需要修改
                filePath: tempFilePaths[0],
                header: {'Authorization': token},
                name: 'file',
                success: function(res){
                  const re = JSON.parse(res.data);
                  if(!re.code){
                    that.post.imageList.push(re.data.imageUrl);
                  }  
                },
                fail: function(res){
                  that.count++;
                  tip.toast(res.data.message);
                  return;
                }
            });
            tempFilePaths.shift();     
          }
        },
        fail: function(res) {
          tip.toast('出现错误，请重新选择');
          return;
        }
      });
    },

    validata(){
      if(this.post.title === '' || this.post.title.length > 30){
        tip.toast("标题不能为空，且不能超过30字");
        return false;
      }
      if(this.post.message === '' || this.post.message.length > 5000){
        tip.toast("正文不能为空，且不超过5000字");
        return false;
      }
      return true;
    },

    async commitPost(){
      const validata = this.validata();
      if(!validata){
        return;
      }
      const data = {
        post: this.post,
        id: this.id
      }
      console.log(data);
      tip.loading();
      const res = await api.commit(data);
      tip.loaded();
      tip.toast(res.data.message);
      if(res.code){
        return;
      } else{
        setTimeout(()=>{
          wx.switchTab({
            url: '/pages/index/main'
          })
        }, 2000)
      }
    }
  },

  onShow(){
    // 判断操作类型
    const id = wx.getStorageSync('editId');
    wx.removeStorageSync('editId');
    if(id){
      this.id  = id;
    }
    console.log(this.id);
    if(this.id){
      wx.setNavigationBarTitle({
        title: '修改帖子'
      });
      this.getThemeInfo(); 
    }
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
  },

  created () {
    // let app = getApp()
  },

  onHide(){
    if(this.refresh){
        this.id = null;
        this.post = {
          title: '',
          message: '',
          imageList: []
        };
        this.count = 9;
    } else{
      this.refresh = true;
    }
  }
}
</script>

<style scoped lang="scss">
.commit-page{
  width: 100%;
  min-height: 100vh;
  .commit-button{
    font-size: 14px;
    color: #f5f5f5;
    height: 32px;
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: rgb(250, 216, 104);
    .title{
      line-height: 32px;
      width: 100%;
      text-align: center;
    }
  }
  .item-list{
    padding: 10px 20px 42px 20px;
    border-top: 1px solid #f5f5f5;
    .item{
      margin-bottom: 20px;
      .title{
        font-size: 18px;
        margin-bottom: 10px
      }
      .inp{
        box-sizing: border-box;
        font-size: 14px;
        border: 2px solid #f5f5f5;
        border-radius: 8px;
        width: 100%;
        padding-left: 5px;
      }
      .img-box {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        margin-bottom: 60px;
        .image-box {
          background-color: #333333;
          box-sizing: border-box;
          width: 80px;
          height: 80px;
          margin: 10px;
          img {
            width: 80px;
            height: 80px;
            background-color: #dfdfdf;
          }
          .delete-img {
            position: relative;
            left: 60px;
            top: -85px;
            width: 20px;
            height: 20px;
            background-color: #ffffff;
          }
        }
        .upload-image {
          border: 1px solid #333333;
          width: 80px;
          height: 80px;
          margin: 10px;
          background-color: #dfdfdf;
          font-size: 16px;
          line-height: 80px;
          text-align: center;
        }
      }
    }
  }
}
</style>
