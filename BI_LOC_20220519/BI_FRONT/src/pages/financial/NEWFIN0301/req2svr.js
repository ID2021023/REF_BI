import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getMakeDataDate() {
    return axios.get(apiUrl() + "fin/getMakeDataDate").then(x => x.data)
  },
  getRecentDate() {
    return axios.get(apiUrl() + "fin/getRecentDate").then(x => x.data)
  },
  getCashData(choice, year, month, SUCDs) {
    return axios.get(apiUrl() + "fin/getCashData2", {
      params : { 
        choice : choice,
        year : year,
        month : month,
        SUCDs : SUCDs
      }
    }).then(x => x.data)
  },
  getDeptCashData(choice, year, month, FasionSUCDCode, FutureSUCDCode, StopSUCDCode) {
    return axios.get(apiUrl() + "fin/getDeptCashData", {
      params : { 
        choice : choice,
        year : year,
        month : month,
        FasionSUCDCode : FasionSUCDCode,
        FutureSUCDCode : FutureSUCDCode,
        StopSUCDCode : StopSUCDCode
      }
    }).then(x => x.data)
  },
  getBrandCashData(choice, year, month, authBRCDCode) {
    return axios.get(apiUrl() + "fin/getBrandCashData", {
      params : { 
        choice : choice,
        year : year,
        month : month,
        authBRCDCode : authBRCDCode
      }
    }).then(x => x.data)
  },
  getDepartmentList(choice, year, month, gubun, FasionSUCDCode, FutureSUCDCode, StopSUCDCode) {
    return axios.get(apiUrl() + "fin/getDepartmentList2", {
      params : { 
        choice : choice,
        year : year,
        month : month,
        gubun : gubun,
        FasionSUCDCode : FasionSUCDCode,
        FutureSUCDCode : FutureSUCDCode,
        StopSUCDCode : StopSUCDCode
      }
    }).then(x => x.data)
  },
}
