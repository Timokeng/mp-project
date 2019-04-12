<template>
  <div class="commit-page">
    <div class="item-list">
      <div class="item">
        <div class="title">标题</div>
        <input class="inp" v-model="post.title" />
      </div>
      <div class="item">
        <div class="title">正文</div>
        <textarea class="inp"
         v-model="post.message" 
         maxlength="-1" 
         show-confirm-bar="false" 
        />
      </div>
      <div class="item">
        <div class="title">图片</div>
        <div class="img-box">
            <div class="upload-image" @click="uploadImage" v-if="count !== 0">上传图片</div>
            <div class="image-box" v-for="(item,index) in post.imageList" :key="index">
                <img :src="item" />
                <div class="delete-img" @click="deleteImg(index)"></div>
            </div>
        </div>
      </div>
    </div>
    <div class="commit-button">
      <div class="title">发帖</div>
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
      post: {
        title: '',
        message: '',
        imageList: []
      },
      count: 9
    }
  },

  components: {

  },

  methods: {
    
  },

  created () {
    // let app = getApp()
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
                  left: 65px;
                  top: -85px;
                  width: 15px;
                  height: 15px;
                  background-color: #333333;
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
