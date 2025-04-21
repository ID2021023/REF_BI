import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getMakeDataDate() {
    return axios.get(apiUrl() + "fin/getMakeDataDate").then(x => x.data)
  },
  getRecentDate() {
    return axios.get(apiUrl() + "fin/getRecentDate").then(x => x.data)
  },
  getCashData(choice, year, month, gubun, FasionSUCDCode, FutureSUCDCode, StopSUCDCode) {
    return axios.get(apiUrl() + "fin/getCashData3", {
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
    return axios.get(apiUrl() + "fin/getSaleTotRate3", {
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
  getDeptCashData(choice, year, month, gubun, FasionSUCDCode, FutureSUCDCode, StopSUCDCode) {
    return axios.get(apiUrl() + "fin/getDeptCashData2", {
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
  getBrandCashData(choice, year, month, gubun, FasionBRCDCode, FutureBRCDCode, StopBRCDCode) {
    return axios.get(apiUrl() + "fin/getBrandCashData2", {
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
