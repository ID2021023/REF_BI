import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getMakeDataDate() {
    return axios.get(apiUrl() + "fin/getMakeDataDate").then(x => x.data)
  },
  getRecentDate() {
    return axios.get(apiUrl() + "fin/getRecentDate").then(x => x.data)
  },
  getSaleData(choice, year, month, SUCDs) {
    return axios.get(apiUrl() + "fin/getSaleData2", {
      params : { 
        choice : choice,
        year : year,
        month : month,
        SUCDs : SUCDs
      }
    }).then(x => x.data)
  },
  getSaleTotRate(choice, year, month, authSUCDCode) {
    return axios.get(apiUrl() + "fin/getSaleTotRate", {
      params : { 
        choice : choice,
        year : year,
        month : month,
        authSUCDCode : authSUCDCode
      }
    }).then(x => x.data)
  },
  getSaleDeptData(choice, year, month, FasionSUCDCode, FutureSUCDCode, StopSUCDCode) {
    return axios.get(apiUrl() + "fin/getSaleDeptData", {
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
  getDepartmentList(choice, year, month, gubun, FasionSUCDCode, FutureSUCDCode, StopSUCDCode) {
    return axios.get(apiUrl() + "fin/getDepartmentList", {
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
  getSaleBrandDeptData(choice, year, month, authBRCDCode) {
    return axios.get(apiUrl() + "fin/getSaleBrandDeptData", {
      params : { 
        choice : choice,
        year : year,
        month : month,
        authBRCDCode : authBRCDCode
      }
    }).then(x => x.data)
  },
}
