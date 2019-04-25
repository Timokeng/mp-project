import request from './axios'

//let base = 'https://www.easy-mock.com/mock/5ca72327ef77d72844bfd426/forum'
let base = 'http://localhost:3000'

const api = {
    // 主页帖子列表
    getIndexList: (page) => request.get(`${base}/posts?page=${page}`),
    // 帖子详情
    getPostDetail: (id, page) => request.get(`${base}/post?id=${id}&page=${page}`),
    // 置顶帖子列表
    getTopList: () => request.get(`${base}/topList`),
    // token
    getToken: (wx_code) => request.post(`${base}/token`, {
        wx_code
    }), 
    // 创建用户信息
    createAccount: (data) => request.post(`${base}/createAccount`, data),
    // 我的帖子
    minePost: (page) => request.get(`${base}/minePost?page=${page}`),
    // 我的收藏
    mineCollect: (page) => request.get(`${base}/mineCollect?page=${page}`),
    // 评论
    review: (data) => request.post(`${base}/review`, data),
    // 收藏/取消收藏
    collect: (id) => request.get(`${base}/collect?id=${id}`),
    // 删除
    delete: (id) => request.get(`${base}/delete?id=${id}`),
    // 点赞
    like: (id) => request.get(`${base}/like?id=${id}`),
    // 置顶/取消置顶 top=0置顶 top=1取消置顶
    top: (id, top) => request.get(`${base}/top?id=${id}&top=${top}`),
    // 搜索
    search: (str, page) => request.post(`${base}/search`, {
        str,
        page
    }),
    // 发布帖子/修改帖子（通过特定条件，例如是否有id区分发布和修改两种操作，复用同一个接口）
    commit: (data) => request.post(`${base}/commit`, data),
    // 获取帖子主题信息（只获取最初发帖的简单信息，降低成本）
    getTheme: (id) => request.get(`${base}/theme?id=${id}`)
    // 上传图片（微信自带的图片上传组件不单独使用接口，暂不定义）
}

export default api
