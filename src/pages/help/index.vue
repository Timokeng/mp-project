<template>
  <div class="help-center">
    <ul class="list">
      <li @click="jump('help-detail', 'log')">如何登陆？</li>
      <li @click="jump('help-detail', 'com')">如何发帖？</li>
      <li @click="jump('help-detail', 'rep')">如何评论？</li>
      <li @click="jump('help-detail', 'col')">如何收藏帖子？</li>
      <li @click="jump('help-detail', 'del')">如何删除帖子？</li>
    </ul>
  </div>
</template>

<script>
import api from '@/lib/api.js'
import tip from '@/lib/tip.js'
import base from '../../base.js'

export default {
  mixins: [base],
  data () {
    return {
      
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
.help-center{
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
}
.list{
  background-color: #ffffff;
  border-top: 1px solid #f5f5f5;
  font-size: 16px;
  li{
    box-sizing: border-box;
    padding: 10px 20px;
    border-bottom: 1px solid #f5f5f5;
  }
  li:last-child{
    border: none;
  }
}
</style>
