import { apiBase } from '../common/js/utils'

// 获取体验链数据概览
export function getChainDataApi () {
  return jQuery.get(apiBase+ '/chain/data/overview')
}

// 获取新闻列表
export function getNewsListApi (data) {
  return $.ajax({
    type: "POST",
    url: apiBase + '/cms/news/list',
    contentType: "application/json",
    dataType: "json",
    data
  })
}

// 获取首页新闻动态
export function getIndexNewsListApi () {
  return $.get(apiBase + '/cms/news/index?limit=3')
}