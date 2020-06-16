import '@common/scss/common.scss';
import { SubscribeDialog } from '@common/js/subscribeDialog'

$(function () {
  judgeMobile()
  let currentUrl = location.href
  if (currentUrl.indexOf('#') === -1) {
    // 当页面链接带锚点的时候不回顶部
    $('html,body').animate({'scrollTop':'0'},300)
  }
  $(window).scroll(function () {
    var scrollTop = $(window).scrollTop();
    var height = $(window).height();
    if (scrollTop >= height) {
      $(".back-to-top").show();
    } else {
      $(".back-to-top").hide();
    }
  });

  // 判断移动端
  function judgeMobile() {
    var browser = {
      versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
          trident: u.indexOf('Trident') > -1, //IE内核
          presto: u.indexOf('Presto') > -1, //opera内核
          webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
          gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
          mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
          android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
          iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
          iPad: u.indexOf('iPad') > -1, //是否iPad
          webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
      }(),
      language: (navigator.language || navigator.browserLanguage || navigator.userLanguage).toLowerCase()
    };
    if (browser.versions.mobile || browser.versions.ios || browser.versions.android || browser.versions.iPhone || browser.versions.iPad) {
      $('body').addClass('wap');
      $('.page-cont').bind('touchstart',function(){});
    } else if (browser.versions.trident) {
      // console.log("IE内核");
    }
  }

  // 返回顶部
  $('.back-to-top').click(function(){
    $('html,body').animate({'scrollTop':'0'},300)
  })
  $('.back-to-top').hover(function(){
      $('.back-to-top').stop().animate({'background-positionY':'-50px'},300);
  },function(){
      $('.back-to-top').stop().animate({'background-positionY':'0'},300);
  })

})