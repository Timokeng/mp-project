<template>
    <div class="popup--bottom popup popup--bottom" :class="{ 'popup--show' : showReview }">
        <div class="popup__mask" @click="close(false)"></div>
        <div class="popup__container">
            <div class="popup__container-header">
                <p>发表评论</p>
            </div>
            <div class="popup__container-content">
                <div class='inputBox'>
                    <textarea show-confirm-bar="false" maxlength="200" v-model="str" />
                </div>
                <p>*评论只能在200字以内</p>
            </div>
            <p class="submit-after-sale" @click="apply">发表评论</p>
        </div>
    </div>
</template>

<script>
import tip from '@/lib/tip.js';
import api from '@/lib/api.js';

export default {
    props: ['showReview', 'id', 'pos'],
    data() {
        return {
            str: '',
        }
    },
    methods: {
        close(ref) {
            this.$emit('close', ref);
        },
        async apply() {
            const data = {
                str: this.str,
                id: this.id,
                pos: this.pos
            }
            console.log(data);
            tip.loading();
            const res = await api.review(data);
            tip.loaded();
            tip.toast(res.data.message);
            if(!res.code){
                setTimeout(()=>{
                    this.close(true);
                    this.str = '';
                }, 1000)
            }
        }
    }
}
</script>

<style  lang="scss">
.popup {
    visibility: hidden;
}
.popup--show {
    visibility: visible;
}
.popup__mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background: rgba(0, 0, 0, 0.2);
    display: none;
}
.popup__container {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    transform-origin: center;
    transition: all 0.4s ease;
    z-index: 11;
    opacity: 0;
    height: 412px;
    width: 100%;
    background: #FFFFFF;
    display: flex;
    flex-direction: column;
    .popup__container-header{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 48px;
        border-bottom: 1pt solid #F5F5F5;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #2A2A2A;
    }
    .popup__container-content{
        flex: 1;
        padding: 20px 16px;
        p{
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #333333;
            line-height: 20px;
            width: 100%;
            margin-bottom: 15px;
        }
        .inputBox{
            display: flex;
            margin-bottom: 20px;
            textarea{
                width: 100%;
                height: 200px;
                border: 1px solid #E5E5E5;
                border-radius: 5px;
                display: inline-block;
                font-size: 16px;
                padding: 5px;
            }
            .title{
                line-height: 42px;
                width: 20%;
            }
        }
    }
    .submit-after-sale{
        width: 375px;
        height: 52px;
        background-color: rgb(250, 216, 104);
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #FFFFFF;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
.popup--show .popup__container {
    opacity: 1;
}
.popup--show .popup__mask {
    display: block;
}
.popup--bottom .popup__container {
    top: auto;
    left: auto;
    bottom: 0;
    transform: translate3d(0, 100%, 0);
}
.popup--show.popup--bottom .popup__container {
    transform: translate3d(0, 0, 0);
}

.popup--bottom .popup__container {
    left: 0;
    right: 0;
}
</style>
