import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getMakeDataDate() {
    return axios.get(apiUrl() + "fin/getMakeDataDate").then(x => x.data)
  },
  getRecentDate() {
    return axios.get(apiUrl() + "fin/getRecentDate").then(x => x.data)
  },
  getSaleData(choice, year, month, gubun, FasionSUCDCode, FutureSUCDCode, StopSUCDCode) {
    return axios.get(apiUrl() + "fin/getSaleData3", {
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
  getSaleTotRate(choice, year, month, gubun, FasionSUCDCode, FutureSUCDCode, StopSUCDCode) {
    return axios.get(apiUrl() + "fin/getSaleTotRate2", {
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
  getSaleDeptData(choice, year, month, gubun, FasionSUCDCode, FutureSUCDCode, StopSUCDCode) {
    return axios.get(apiUrl() + "fin/getSaleDeptData2", {
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
  getSaleBrandDeptData(choice, year, month, gubun, FasionBRCDCode, FutureBRCDCode, StopBRCDCode) {
    return axios.get(apiUrl() + "fin/getSaleBrandDeptData2", {
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
  }
}
