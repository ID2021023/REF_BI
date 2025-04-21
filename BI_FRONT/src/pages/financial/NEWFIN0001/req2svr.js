import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getRecentBIFN050Date() {
    return axios.get(apiUrl() + "fin/getRecentBIFN050Date").then(x => x.data)
  },
  getRecentBIFN051Date() {
    return axios.get(apiUrl() + "fin/getRecentBIFN051Date").then(x => x.data)
  },
  getDailySalesData(tabType, date, authCodeList) {
    return axios.get(apiUrl() + "fin/getDailySalesData", {
      params : { 
        tabType : tabType,
        date : date,
        authCodeList : authCodeList
      }
    }).then(x => x.data)
  },
  getSaleData(f_year, f_month, SUCDs) {
    return axios.get(apiUrl() + "fin/getSaleData", {
      params : { 
        f_year : f_year,
        f_month : f_month,
        SUCDs : SUCDs
      }
    }).then(x => x.data)
  },
  getTotSaleData(f_year, f_month, SUCDs) {
    return axios.get(apiUrl() + "fin/getTotSaleData", {
      params : { 
        f_year : f_year,
        f_month : f_month,
        SUCDs : SUCDs
      }
    }).then(x => x.data)
  },
  getCashData(f_year, f_month, SUCDs) {
    return axios.get(apiUrl() + "fin/getCashData", {
      params : { 
        f_year : f_year,
        f_month : f_month,
        SUCDs : SUCDs
      }
    }).then(x => x.data)
  },
  getTotCashData(f_year, f_month, SUCDs) {
    return axios.get(apiUrl() + "fin/getTotCashData", {
      params : { 
        f_year : f_year,
        f_month : f_month,
        SUCDs : SUCDs
      }
    }).then(x => x.data)
  },
  getProfitData(f_year, f_month, SUCDs) {
    return axios.get(apiUrl() + "fin/getProfitData", {
      params : { 
        f_year : f_year,
        f_month : f_month,
        SUCDs : SUCDs
      }
    }).then(x => x.data)
  },
  getTotProfitData(f_year, f_month, SUCDs) {
    return axios.get(apiUrl() + "fin/getTotProfitData", {
      params : { 
        f_year : f_year,
        f_month : f_month,
        SUCDs : SUCDs
      }
    }).then(x => x.data)
  },
  getStockData(date, currentYear) {
    return axios.get(apiUrl() + "fin/getStockData", {
      params : { 
        date : date,
        currentYear : currentYear
      }
    }).then(x => x.data)
  },
  getResourceData(date, currentYear, yearCode, fs_yearCode, fe_yearCode, du_yearCode, SUCDs) {
    return axios.get(apiUrl() + "fin/getResourceData", {
      params : { 
        date : date,
        currentYear : currentYear,
        yearCode : yearCode,
        fs_yearCode : fs_yearCode,
        fe_yearCode : fe_yearCode,
        du_yearCode : du_yearCode,
        SUCDs : SUCDs
      }
    }).then(x => x.data)
  }
}
