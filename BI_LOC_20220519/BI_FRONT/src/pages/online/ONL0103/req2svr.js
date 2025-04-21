import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getMakeDataDate() {
    return axios.get(apiUrl() + "fin/getMakeDataDate").then(x => x.data)
  },
  getSaleByBrandList(year) {
    return axios.get(apiUrl() + "online/getSaleByBrandList", {
      params : { 
        year : year
      }
    }).then(x => x.data)
  },
  getITOnOffSaleList(year) {
    return axios.get(apiUrl() + "online/getITOnOffSaleList", {
      params : { 
        year : year
      }
    }).then(x => x.data)
  },
  getBaseSaleList(selectDate) {
    return axios.get(apiUrl() + "online/getBaseSaleList", {
      params : {
        selectDate : selectDate
      }
    }).then(x => x.data)
  },
  getSaleByBrdDetailData(year) {
    return axios.get(apiUrl() + "online/getSaleByBrdDetailData", {
      params : { 
        year : year
      }
    }).then(x => x.data)
  },
  getITOnOffDetailData(year) {
    return axios.get(apiUrl() + "online/getITOnOffDetailData", {
      params : { 
        year : year
      }
    }).then(x => x.data)
  },
  getDailySaleList(start_date, end_date) {
    return axios.get(apiUrl() + "online/getDailySaleList", {
      params : { 
        start_date : start_date,
        end_date : end_date
      }
    }).then(x => x.data)
  },
  getMonthlySaleList(start_date, end_date) {
    return axios.get(apiUrl() + "online/getMonthlySaleList", {
      params : { 
        start_date : start_date,
        end_date : end_date
      }
    }).then(x => x.data)
  },
  geJasaSaleList(sucd, basedt, gubun) {
    return axios.get(apiUrl() + "online/geJasaSaleList", {
      params : { 
        sucd : sucd,
        basedt : basedt,
        gubun : gubun
      }
    }).then(x => x.data)
  }
}
