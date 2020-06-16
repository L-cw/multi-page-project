
/**
 * 弹窗组件
 * @param {*} container 要挂载的节点
 */
export function SubscribeDialog(container) {
  this.container = container
  this.cb = null
  this.msg = ''
	this.createDom()
	this.bindEvents()
}

SubscribeDialog.Template = `
<div class="subscribe-dialog-comp">
  <div class="subscribe-mask"></div>
  <div class="subscribe-cont">
    <img class="subscribe-qrcode" src="/images/common/subscribe-dialog/qrcode.png" alt="">
    <div class="subscribe-notice-msg"></div>
    <div class="btn subscribe-btn">我已关注</div>
    <div class="subscribe-skip-btn">跳过</div>
  </div>
</div>
`

$.extend(SubscribeDialog.prototype, {

	createDom: function() {
    this.element = $(SubscribeDialog.Template)
    this.container.append(this.element)
	},

	bindEvents: function() {
    let subscribedBtn = this.element.find(".subscribe-btn")
    let skipBtn = this.element.find('.subscribe-skip-btn')
    let mask = this.element.find('.subscribe-mask')
		subscribedBtn.on("click", $.proxy(this.handleHasSubscribed, this))
    skipBtn.on("click", $.proxy(this.handleSkip, this))
    mask.on('click', $.proxy(this.handleClickMask, this))
  },

  handleHasSubscribed: function () {
    this.hide()
    this.cb && this.cb()
  },

  handleSkip: function () {
    this.hide()
    this.cb && this.cb()
  },

  handleClickMask: function () {
    this.hide()
  },

  setNoticeMsg: function (msg) {
    this.element.find('.subscribe-notice-msg').text(msg)
  },

  setCloseCallBack: function (cb) {
    this.cb = cb || null
  },

  showSkipBtn: function () {
    let skipBtn = this.element.find('.subscribe-skip-btn')
    skipBtn.show()
  },

  hideSkipBtn: function () {
    let skipBtn = this.element.find('.subscribe-skip-btn')
    skipBtn.hide()
  },
  
  show: function () {
    this.element.show()
    this.container.css('overflow', 'hidden')
    // 打开时默认不显示跳过
    let skipBtn = this.element.find('.subscribe-skip-btn')
    skipBtn.hide()
  },

  hide: function () {
    this.element.hide()
    this.container.css('overflow', 'auto')
  }
})
