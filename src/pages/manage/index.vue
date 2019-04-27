<template>
  <div class="manage-page">
    <div class="box" v-for="(item, index) in list" :key="index">
      <div class="post-body" @click="jump('detail', {id:item.id})">
        <post-box :post="item"></post-box>
      </div>
      <div class="actions">
        <div class="action" v-if="type === 'man'" @click="topPost(item)">{{item.top?'取消置顶':'置顶帖子'}}</div>
        <div class="action" v-if="type === 'pos'" @click="editPost(item.id)">修改帖子</div>
        <div class="action" v-if="type === 'pos' || type === 'man'" @click="deletePost(item.id, index)">删除帖子</div>
        <div class="action" v-if="type === 'col'" @click="unCollect(item.id, index)">取消收藏</div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/lib/api.js'
import tip from '@/lib/tip.js'
import base from '../../base.js'
import postBox from '@/components/post-box.vue'

export default {
  mixins: [base],
  data () {
    return {
      list: [],
      page: 1,
      type: '',
    }
  },

  components: {
    postBox
  },

  methods: {
    showTitle(){
      let str;
      if(this.type === 'pos') {str = '我的帖子'}
      if(this.type === 'col') {str = '我的收藏'}
      if(this.type === 'man') {str = '管理帖子'}
      wx.setNavigationBarTitle({
        title: str
      })
    },

    async getList(ref){
      if(this.type === 'pos'){
        if(ref){
          this.page = 1;
          const res = await api.minePost(this.page);
          if(res.code){
            tip.toast(res.data.message);
            return;
          }
          this.list = res.data.list;
          this.page++;
        } else{
          const res = await api.minePost(this.page);
          if(res.code){
            tip.toast(res.data.message);
            return;
          }
          this.list = this.list.concat(res.data.list);
          this.page++;
        }
      }
      if(this.type === 'col'){
        if(ref){
          this.page = 1;
          const res = await api.mineCollect(this.page);
          if(res.code){
            tip.toast(res.data.message);
            return;
          }
          this.list = res.data.list;
          this.page++;
        } else{
          const res = await api.mineCollect(this.page);
          if(res.code){
            tip.toast(res.data.message);
            return;
          }
          this.list = this.list.concat(res.data.list);
          this.page++;
        }
      }
      if(this.type === 'man'){
        if(ref){
          this.page = 1;
          const res = await api.getIndexList(this.page);
          if(res.code){
            tip.toast(res.data.message);
            return;
          }
          this.list = res.data.list;
          this.page++;
        } else{
          const res = await api.getIndexList(this.page);
          if(res.code){
            tip.toast(res.data.message);
            return;
          }
          this.list = this.list.concat(res.data.list);
          this.page++;
        }
      }
    },

    editPost(id){
      wx.setStorageSync('editId', id);
      const url = `/pages/commit/main`;
      wx.switchTab({
        url: url
      })
    },

    async deletePost(id ,index){
      const res = await api.delete(id);
      tip.toast(res.data.message);
      if(!res.code){
        this.list.splice(index, 1);
      }
    },
    
    async unCollect(id, index){
      const res = await api.collect(id);
      tip.toast(res.data.message);
      if(!res.code){
        this.list.splice(index, 1);
      }
    },

    async topPost(item){
      const top = item.top ? 1:0;
      const res = await api.top(item.id, top);
      tip.toast(res.data.message);
      if(!res.code){
        item.top = !item.top;
      }
    }
  },

  onLoad(){
    const { type } = this.$mp.query;
    this.type  = type;
    this.showTitle();
    this.getList(true);
  },

  onUnload(){
    this.list = [];
  },

  created () {
    // let app = getApp()
  },

  onReachBottom () {
    tip.loading();
    this.getList(false)
    tip.loaded();
  },

  onPullDownRefresh(){
    this.getList(true);
    wx.stopPullDownRefresh();
  }
}
</script>

<style scoped lang="scss">
.manage-page{
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
}
.box{
  background-color: #ffffff;
  width: 100%;
  margin-top: 10px;
  .actions{
    display: flex;
    justify-content: flex-end;
    font-size: 14px;
    padding: 5px 20px;
    .action{
      padding: 0 10px;
      border-right: 2px solid #f5f5f5;
      &:last-child{
        padding-right: 0;
        border: none;
      }
    }
  }
}
.box:first-child{
  margin: 0;
  border-top: 1px solid #f5f5f5;
}
</style>
