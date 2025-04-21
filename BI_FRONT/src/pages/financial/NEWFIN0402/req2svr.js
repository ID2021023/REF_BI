import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getMakeDataDate() {
    return axios.get(apiUrl() + "fin/getMakeDataDate").then(x => x.data)
  },
  getRecentDate() {
    return axios.get(apiUrl() + "fin/getRecentDate").then(x => x.data)
  },
  getProfitData(choice, year, month, gubun, FasionSUCDCode, FutureSUCDCode, StopSUCDCode) {
    return axios.get(apiUrl() + "fin/getProfitData3", {
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
  getDeptProfitData(choice, year, month, gubun, FasionSUCDCode, FutureSUCDCode, StopSUCDCode) {
    return axios.get(apiUrl() + "fin/getDeptProfitData2", {
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
  getDeptBrandProfitData(choice, year, month, gubun, FasionBRCDCode, FutureBRCDCode, StopBRCDCode) {
    return axios.get(apiUrl() + "fin/getDeptBrandProfitData2", {
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
}
