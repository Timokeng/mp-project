/* eslint-disable */
var axios = require('axios');
var mpAdapter = require('axios-mp-adapter');

const axiosIns = axios.create({
  adapter: mpAdapter,
});

axiosIns.interceptors.request.use(config => {
  const token = wx.getStorageSync('token')
  const formId = wx.getStorageSync('formId')
  if(token){
    config.headers.common.Authorization = token
  }
  if(formId){
    config.headers.common['wx-form-id'] = formId;
  }
  return config;
});

axiosIns.interceptors.response.use(
  response => {
    if(response.data && response.data.code == -999){   
      wx.removeStorageSync('token')
      wx.removeStorageSync('user-info')
    }
    return response.data;
  },
  err => {
    let error = {};
    if (err.response && err.response.data) {
      error = err.response.data.errors
        ? err.response.data.errors[0]
        : err.response.data;
    }
    if (error.message.indexOf('timeout') === 0) {
      wx.showToast({
        title: '网络异常',
        icon: 'none'
      });
    } else if (error.message) {
      wx.showToast({
        title: error.message,
        icon: 'none'
      });
    } else {
      wx.showToast({
        title: '出了点问题，暂时加载不出来，请稍后再来吧',
        icon: 'none'
      });
    }
    return new Promise.reject(err);
  }
);

export default axiosIns;
