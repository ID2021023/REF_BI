import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getData(sql) {
    return axios.get('http://100.100.200.12:5001/machbase?q=' + encodeURIComponent(sql)).then(x => x.data)
  },
  getMakeDataDate() {
    return axios.get(apiUrl() + "fin/getMakeDataDate2").then(x => x.data)
  },
  getRecentDate() {
    return axios.get(apiUrl() + "fin/getRecentDate2").then(x => x.data)
  },
  getStockData(date, currentYear, yearCode, gubun, GUBUN, FasionSUCDCode, FutureSUCDCode, StopSUCDCode) {
    return axios.get(apiUrl() + "fin/getStockData3", {
      params : { 
        date : date,
        currentYear : currentYear,
        yearCode : yearCode,
        gubun : gubun,
        GUBUN : GUBUN,
        FasionSUCDCode : FasionSUCDCode,
        FutureSUCDCode : FutureSUCDCode,
        StopSUCDCode : StopSUCDCode
      }
    }).then(x => x.data)
  },
  getDeptStockData(date, currentYear, yearCode, SUCD, gubun, GUBUN) {
    return axios.get(apiUrl() + "fin/getDeptStockData2", {
      params : { 
        date : date,
        currentYear : currentYear,
        yearCode : yearCode,
        SUCD : SUCD,
        gubun : gubun,
        GUBUN : GUBUN
      }
    }).then(x => x.data)
  },
}
