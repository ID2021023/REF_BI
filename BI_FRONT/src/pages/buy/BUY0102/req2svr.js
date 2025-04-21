import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getMakeDataDate() {
    return axios.get(apiUrl() + "buy/getMakeDataDate").then(x => x.data)
  },
  getCurrentYearData(gubun, code, yearCode) {
    return axios.get(apiUrl() + "buy/getCurrentYearData", {
      params : { 
        gubun :gubun,
        code : code,
        yearCode : yearCode
      }
    }).then(x => x.data)
  },
  getLastYearData(gubun, code, yearCode) {
    return axios.get(apiUrl() + "buy/getLastYearData", {
      params : { 
        gubun :gubun,
        code : code,
        yearCode : yearCode
      }
    }).then(x => x.data)
  }
}
