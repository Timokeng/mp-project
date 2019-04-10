<template>
  <div class="mine-page">
    <div class="header">
      <div class="avatar">
        <!-- 还没做登录部分，这里可能会报错先注释掉 <img :src="userInfo.img" alt="" /> -->
      </div>
      <div class="nick-name">用户名</div>
    </div>
    <ul class="item-list">
      <li class="item">
        <div class="title">
          <img class="icon" src="../../../static/mine-icon/mine-posts.png" />
          <div class="name">我的帖子</div>
        </div>
        <img class="icon" src="../../../static/icon/right-icon.png" />
      </li>
      <li class="item">
        <div class="title">
          <img class="icon" src="../../../static/mine-icon/mine-follow.png" />
          <div class="name">我的收藏</div>
        </div>
        <img class="icon" src="../../../static/icon/right-icon.png" />
      </li>
    </ul>
    <ul class="item-list">
      <li class="item">
        <div class="title">
          <img class="icon" src="../../../static/mine-icon/help.png" />
          <div class="name">帮助中心</div>
        </div>
        <img class="icon" src="../../../static/icon/right-icon.png" />
      </li>
      <li class="item">
        <div class="title">
          <img class="icon" src="../../../static/mine-icon/manger.png" />
          <div class="name">管理帖子</div>
        </div>
        <img class="icon" src="../../../static/icon/right-icon.png" />
      </li>
    </ul>
  </div>
</template>

<script>
import api from '@/lib/api.js'
import tip from '@/lib/tip.js'
import base from '../../base.js'

export default {
  data () {
    return {
      userInfo: {},
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
.mine-page{
  background-color: #f5f5f5;
  min-height: 100vh;
  width: 100%;
}
.header{
  background-color: #ffffff;
  width: 100%;
  display: flex;
  .avatar{
    width: 60px;
    height: 60px;
    border-radius: 100%;
    background-color: #f5f5f5;
    margin: 10px 20px;
    img{
      width: 100%;
      height: 100%;
      border-radius: 100%;
    } 
  }
  .nick-name{
    flex: 1;
    font-size: 16px;
    display: flex;
    align-items: center; 
  }
}
.item-list{
  background-color: #ffffff;
  width: 100%;
  margin-top: 12px;
  &:last-child{
    border: none;
  }
  .item{
    box-sizing: border-box;
    width: 100%;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f5f5f5;
    .title{
      display: flex;
      font-size: 14px;
      .icon{
        height: 24px;
        width: 24px;
        margin-right: 10px;
      }
      .name{
        display: flex;
        align-items: center;
      }
    }
    .icon{
      height: 12px;
      width: 12px;
    }
  }
}
</style>
