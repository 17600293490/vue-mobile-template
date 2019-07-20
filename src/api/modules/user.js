import axios from '../api.request'

/**
 * 登录
 * @param {*} userName 用户名
 * @param {*} password 密码
 */
export const apiLogin = ({ userName, password }) => {
  const data = {
    userName,
    password
  }
  return axios.request({
    url: 'login',
    data,
    method: 'post'
  })
}

// 获取用户信息
export const apiGetUserInfo = (token) => {
  return axios.request({
    url: 'get_info',
    params: {
      token
    },
    method: 'get'
  })
}
// 退出的接口
export const apiLogout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}

export const apiGetUnreadCount = () => {
  return axios.request({
    url: 'message/count',
    method: 'get'
  })
}

export const apiGetMessage = () => {
  return axios.request({
    url: 'message/init',
    method: 'get'
  })
}

export const apiGetContentByMsgId = msgId => {
  return axios.request({
    url: 'message/content',
    method: 'get',
    params: {
      msgId
    }
  })
}

export const apiHasRead = msgId => {
  return axios.request({
    url: 'message/has_read',
    method: 'post',
    data: {
      msgId
    }
  })
}

export const apiRemoveReaded = msgId => {
  return axios.request({
    url: 'message/remove_readed',
    method: 'post',
    data: {
      msgId
    }
  })
}

export const apiRestoreTrash = msgId => {
  return axios.request({
    url: 'message/restore',
    method: 'post',
    data: {
      msgId
    }
  })
}
