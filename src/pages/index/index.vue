<template>
  <div class="post-index">
    <div class="top-list">
      <div class="top-post" v-for="(item, index) in topList" :key="index">
        <span class="icon">置顶</span>
        <span class="title">{{item.title}}</span>
      </div>
    </div>
    <div class="margin-line"></div>
    <div class="post-list">帖子专区</div>
  </div>
</template>

<script>
import api from '@/lib/api.js'
import tip from '@/lib/tip.js'
import base from '../../base.js'

export default {
  mixins: [ base ],

  data () {
    return {
      topList: [],
      postList: [],
      page: 1
    }
  },

  components: {

  },

  methods: {
    async getTopList(){
      const res = await api.getTopList();
      if(res.code){
        tip.toast(res.code.message);
        return;
      }
      this.topList = res.data.list;
      console.log(this.topList);
    }
  },

  created () {
    // let app = getApp()
  },

  onShow(){
    this.getTopList();
  }
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
  display: flex;
  padding: 10px;
}
</style>
