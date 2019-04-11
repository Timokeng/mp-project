import request from './axios'

let base = 'https://www.easy-mock.com/mock/5ca72327ef77d72844bfd426/forum'

const api = {
    // 主页帖子列表
    getIndexList: (page) => request.get(`${base}/posts?${page}`),
    // 帖子详情
    getPostDetail: (id) => request.get(`${base}/post?${id}`),
    // 置顶帖子列表
    getTopList: () => request.get(`${base}/topList`),
    // token
    getToken: (wx_code) => request.post(`${base}/token`, {
        wx_code
    }), 
    // 我的帖子
    minePost: () => request.get(`${base}/minePost`),
    // 我的收藏
    mineCollect: () => request.get(`${base}/mineCollect`),
    // 评论
    review: (data) => request.post(`${base}/review`, data),
    // 收藏/取消收藏
    collect: (id) => request.get(`${base}/collect?${id}`),
    unCollect: (id) => request.get(`${base}/unCollect?${id}`),
    // 删除
    delete: (id) => request.get(`${base}/delete?${id}`),
    // 点赞
    like: (id) => request.get(`${base}/like?${id}`),
    // 搜索
    search: (str, page) => request.post(`${base}/search`, {
        str,
        page
    }),
    // 发布帖子/修改帖子（通过特定条件，例如是否有id区分发布和修改两种操作，复用同一个接口）
    commit: (data) => request.post(`${base}/commit`, data)
    // 上传图片（微信自带的图片上传组件不补单独使用接口，暂不定义）
}

export default api
