<template>
    <div class="post-box">
        <div class="title">{{post.title}}</div>
        <div class="userInfo">
            <div class="img">
                <img :src="post.userImg" alt="" />
            </div>
            <div class="user">{{post.userName}}</div>
        </div>
        <div class="time">最新回复：{{post.lastModified}}</div>
    </div>
</template>


<script>
export default {
    props: ['post'],
    methods: {
        
    }
}
</script>

<style lang="scss">
.post-box{
    display: flex;
    box-sizing: border-box;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    background-color: #ffffff;
    padding: 10px 20px;
    border-bottom: 1px solid #f5f5f5;
    .title{
        width: 100%;
        text-overflow: ellipsis;
        font-size: 16px;
        line-height: 20px;
        margin-bottom: 10px;
    }
    .userInfo{
        display: flex;
        .img{
            background-color: #f5f5f5;
            margin-right: 10px;
            height: 20px;
            img{
                width: 20px;
                height: 20px;
            }
        }
        .user{
            font-size: 12px;
            line-height: 20px;
        }
    }
    .time{
        font-size: 12px;
        line-height: 20px;
    }
}
</style>
