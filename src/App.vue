<script>
import { WINDOW_HEIGHT, IS_IPHONEX } from '@/lib/constant.js'

export default {
  onLaunch () {
    wx.getSystemInfo({
      success (res) {
        wx.setStorageSync(WINDOW_HEIGHT, res.windowHeight)
        if (res.model.indexOf('iPhone X') !== -1) {
          wx.setStorageSync(IS_IPHONEX, true)
        } else {
          wx.setStorageSync(IS_IPHONEX, false)
        }
      }
    })
  }
}
</script>

<style>
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
