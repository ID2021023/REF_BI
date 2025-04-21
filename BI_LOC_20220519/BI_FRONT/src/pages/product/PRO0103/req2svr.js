import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getMakeDataDate() {
    return axios.get(apiUrl() + "product/getMakeDataDate").then(x => x.data)
  },
  getMonthlyDetailData(tabType, code, yearCode) {
    return axios.get(apiUrl() + "product/getMonthlyDetailData", {
      params : { 
        tabType :tabType,
        code : code,
        yearCode : yearCode
      }
    }).then(x => x.data)
  }
}
