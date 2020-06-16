
export const apiBase = '/api'

export function setStorage (key, value) {
  var val = JSON.stringify(value)
  window.localStorage.setItem(key, val)
}

export function getStorage (key) {
  var val = window.localStorage.getItem(key)
  if (val === null || val === undefined) {
    return ''
  }
  return JSON.parse(val)
}

export function commafy (num) {
  num = fourDigit(num, 8) + ''
  if (num === '') {
    return
  }
  if (isNaN(num)) {
    return
  }
  var index = num.indexOf('.')
  if (index === -1) {
    var reg = /(-?\d+)(\d{3})/
    while (reg.test(num)) {
      num = num.replace(reg, '$1,$2')
    }
  } else {
    var intPart = num.substring(0, index)
    var pointPart = num.substring(index + 1, num.length)
    reg = /(-?\d+)(\d{3})/
    while (reg.test(intPart)) {
      intPart = intPart.replace(reg, '$1,$2')
    }
    num = intPart + '.' + pointPart
  }
  return num
}

export function fourDigit (value, s) {
  if (isNaN(value) || value === '' || value === null) {
    return ''
  }
  const num = value.toString().split('.')
  if (num.length === 1) {
    return value.toString()
  } else if (num[1].length >= s) {
    return num[0] + '.' + num[1].substring(0, s)
  } else {
    return value.toString()
  }
}
