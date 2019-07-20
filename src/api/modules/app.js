import axios from '../api.request'

// 错误搜集的接口
export const apiSaveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}
