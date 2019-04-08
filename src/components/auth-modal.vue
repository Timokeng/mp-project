<template>
    <div class="auth-dialog" :class="{ 'auth-show': show }">
        <div class="auth-mask"></div>
        <div class="auth-container">
            <div class="auth-logo">
                <img src="" alt="">
            </div>
            <p>托马斯论坛需要获取您的头像、名称</p>
             <button class="auth-btn" open-type="getUserInfo" @getuserinfo="onGetUserInfo">允许</button>
        </div>
    </div>
</template>


<script>
export default {
    props: ['show'],
    methods: {
        close() {
            this.$emit('close');
        },
        onGetUserInfo(e){
            if(e.mp.detail.errMsg == 'getUserInfo:ok'){
                console.log('data',e.mp.detail);
                this.$emit('ok',e.mp.detail)
            }
        }
    }
}
</script>

<style lang="scss">
.auth-container {
    position: relative;
    width: 280px;
    height: 260px;
    border-radius: 4px;
    background: #FFFFFF;
    position: fixed;
    transform: translate3d(-50%, -50%, 0);
    top: 50%;
    left: 50%;
    z-index: 2001;
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .auth-logo{
        width: 102px;
        height: 102px;
        margin: 34px auto 0;
        img{
            width: 100%;
            height: 100%;
        }
    }
    p{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #333333;
        text-align: center;
        line-height: 20px;
    }
    .auth-btn{
        width: 100%;
        height: 48px;
        background: transparent;
        border: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #1874FA;
        border-top: 1px solid #F5F5F5;
    }
}

.auth-mask {
    background-color: rgba(0, 0, 0, .4);
    position: fixed;
    z-index: 2000;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: none;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
.auth-show .auth-mask{
    display: flex;
}
.auth-show .auth-container{
    display: flex;
}
</style>
