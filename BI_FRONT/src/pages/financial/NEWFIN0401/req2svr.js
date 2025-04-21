import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getMakeDataDate() {
    return axios.get(apiUrl() + "fin/getMakeDataDate").then(x => x.data)
  },
  getRecentDate() {
    return axios.get(apiUrl() + "fin/getRecentDate").then(x => x.data)
  },
  getProfitData(choice, year, month, SUCDs) {
    return axios.get(apiUrl() + "fin/getProfitData2", {
      params : { 
        choice : choice,
        year : year,
        month : month,
        SUCDs : SUCDs
      }
    }).then(x => x.data)
  },
  getDeptProfitData(choice, year, month, FasionSUCDCode, FutureSUCDCode, StopSUCDCode) {
    return axios.get(apiUrl() + "fin/getDeptProfitData", {
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
  getDeptBrandProfitData(choice, year, month, gubun, FasionBRCDCode, FutureBRCDCode, StopBRCDCode) {
    return axios.get(apiUrl() + "fin/getDeptBrandProfitData", {
      params : { 
        choice : choice,
        year : year,
        month : month,
        gubun : gubun,
        FasionBRCDCode : FasionBRCDCode,
        FutureBRCDCode : FutureBRCDCode,
        StopBRCDCode : StopBRCDCode
      }
    }).then(x => x.data)
  },
  getDepartmentList(choice, year, month, gubun, FasionSUCDCode, FutureSUCDCode, StopSUCDCode) {
    return axios.get(apiUrl() + "fin/getDepartmentList3", {
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
