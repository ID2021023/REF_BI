import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getMakeDataDate() {
    return axios.get(apiUrl() + "fin/getMakeDataDate2").then(x => x.data)
  },
  getRecentDate() {
    return axios.get(apiUrl() + "fin/getRecentDate2").then(x => x.data)
  },
  getStockData(date, currentYear, yearCode, gubun, SUCDs) {
    return axios.get(apiUrl() + "fin/getStockData2", {
      params : { 
        date : date,
        currentYear : currentYear,
        yearCode : yearCode,
        gubun : gubun,
        SUCDs : SUCDs
      }
    }).then(x => x.data)
  },
  getDeptStockData(date, currentYear, yearCode, fs_yearCode, fe_yearCode, du_yearCode, SUCD, gubun, GUBUN) {
    return axios.get(apiUrl() + "fin/getDeptStockData", {
      params : { 
        date : date,
        currentYear : currentYear,
        yearCode : yearCode,
        fs_yearCode : fs_yearCode,
        fe_yearCode : fe_yearCode,
        du_yearCode : du_yearCode,
        SUCD : SUCD,
        gubun : gubun,
        GUBUN : GUBUN
      }
    }).then(x => x.data)
  },
  getDepartmentList(date, currentYear, yearCode, gubun, gubun2, FasionSUCDCode, FutureSUCDCode, StopSUCDCode) {
    return axios.get(apiUrl() + "fin/getDepartmentList4", {
      params : { 
        date : date,
        currentYear : currentYear,
        yearCode : yearCode,
        gubun : gubun,
        gubun2 : gubun2,
        FasionSUCDCode : FasionSUCDCode,
        FutureSUCDCode : FutureSUCDCode,
        StopSUCDCode : StopSUCDCode
      }
    }).then(x => x.data)
  },
}
