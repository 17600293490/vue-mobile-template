import HttpRequest from './axios'
import config from '@/config'
import { getToken } from '@/libs/util.js'
const axios = new HttpRequest(config.baseUrl, getToken())
export default axios
