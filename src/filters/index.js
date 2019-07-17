import { getDate } from '@/libs/utils'
import Vue from 'vue'
const filter = {
  getDate (timeStamp) {
    return getDate(timeStamp)
  }
}
Object.keys(filter).forEach(key => Vue.filter(key, filter[key]))
