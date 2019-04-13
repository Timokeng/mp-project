<template>
  <div class="detail-page">
    <div class="theme">
      <div class="title">{{postDetail.title}}</div>
      <div class="user-info">
        <img :src="postDetail.userImg" />
        <div class="author">{{postDetail.author}}</div>
      </div>
      <div class="message">{{postDetail.message}}</div>
      <div class="imageList" v-if="postDetail.imageList && postDetail.imageList.length">
        <img v-for="(item,index) in postDetail.imageList" :key="index" :src="item" />
      </div>
      <div class="action">
        <div class="box" @click="changeLike">
          <img src="../../../static/icon/check.png" v-if="postDetail.like" />
          <img src="../../../static/icon/black-check.png" v-else />
          <div class="action-title">点赞</div>
        </div>
        <div class="box" @click="changeCollect">
          <img src="../../../static/icon/ygz.png" v-if="postDetail.collect" />
          <img src="../../../static/icon/wgz.png" v-else />
          <div class="action-title">收藏</div>
        </div>
        <div class="box" style="border:none" @click="review(-1)">
          <img src="../../../static/icon/edit-icon.png" />
          <div class="action-title">评论</div>
        </div>
      </div>
    </div>
    <div class="reply" v-for="(item, index) in postDetail.reply" :key="index">
      <div class="user-info">
        <img :src="item.userImg" />
        <div class="author">{{item.userName}}</div>
      </div>
      <div class="message">{{item.message}}</div>
      <ul class="children-reply" v-if="item.children.length">
        <li class="child-reply" v-for="(child, ind) in item.children" :key="ind">{{child.userName}}：{{child.message}}</li>
      </ul>
      <div class="action">
        <div class="box" style="border:none" @click="review(index)">
          <img src="../../../static/icon/edit-icon.png" />
          <div class="action-title">评论</div>
        </div>
      </div>
    </div>
    <review :showReview="showReview" :id="id" :pos="reviewPos" @close="closeReview"></review>
  </div>
</template>

<script>
import api from '@/lib/api.js'
import tip from '@/lib/tip.js'
import base from '../../base.js'
import review from '@/components/review'

export default {
  data () {
    return {
      postDetail: {},
      id: null,
      showReview: false,
      reviewPos: -1
    }
  },

  components: {
    review
  },

  methods: {
    async getDetail(){
      const res = await api.getPostDetail(this.id);
      if(res.code){
        tip.toast(res.data.message);
        return;
      }
      this.postDetail = res.data;
    },
    
    async changeLike(){
      const res = await api.like(this.id);
      tip.toast(res.data.message);
      if(!res.code){
        this.postDetail.like = !this.postDetail.like;
      }
    },

    async changeCollect(){
      const res = await api.collect(this.id);
      tip.toast(res.data.message);
      if(!res.code){
        this.postDetail.collect = !this.postDetail.collect;
      }
    },

    review(pos){
      this.reviewPos = pos;
      this.showReview = true;
    },

    closeReview(ref){
      this.showReview = false;
      if(ref){
        this.getDetail();
      }
    }
  },

  onShow(){
    const { id } = this.$mp.query;
    this.id  = id;
    this.getDetail();
  },

  created () {
    // let app = getApp()
  },

  onUnload(){
    this.showReview = false;
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
      width: 18px;
      height: 18px;
      margin-right: 10px;
    }
  }
  .message{
    font-size: 14px;
    margin-bottom: 20px;
  }
  .imageList{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-bottom: 20px;
    img{
      width: 100px;
      height: 100px;
      margin-right: 10px;
    }
  }
  .action{
    display: flex;
    justify-content: flex-end;
    font-size: 14px;
    .box{
      display: flex;
      align-items: center;
      padding: 0 10px;
      border-right: 2px solid #f5f5f5;
      img{
        width: 16px;
        height: 16px;
        margin-right: 5px;
      }
      .action-title{
        font-size: 14px;
      }
    }
  }
}
.reply{
  margin-top: 10px;
  background-color: #ffffff;
  padding: 10px 20px;
  box-sizing: border-box;
  .user-info{
    font-size: 14px;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    img{
      width: 18px;
      height: 18px;
      margin-right: 10px;
    }
  }
  .message{
    font-size: 14px;
    margin-bottom: 20px;
  }
  .children-reply{
    box-sizing: border-box;
    width: 100%;
    padding: 0 10px;
    border: 2px solid #f5f5f5;
    font-size: 14px;
    margin-bottom: 20px;
    .child-reply{
      padding: 5px 0;
      border-bottom: 2px solid #f5f5f5;
    }
    li:last-child{
      border: none;
    }
  }
  .action{
    display: flex;
    justify-content: flex-end;
    font-size: 14px;
    .box{
      display: flex;
      align-items: center;
      padding: 0 10px;
      border-right: 2px solid #f5f5f5;
      img{
        width: 16px;
        height: 16px;
        margin-right: 5px;
      }
      .action-title{
        font-size: 14px;
      }
    }
  }
}
</style>
