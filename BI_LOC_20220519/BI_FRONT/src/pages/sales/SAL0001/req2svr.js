import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getMakeDataDate() {
    return axios.get(apiUrl() + "sales/getMakeDataDate").then(x => x.data)
  },
  getTotalSalesData(date, tabType, CODETab) {
    return axios.get(apiUrl() + "sales/getTotalSalesData", {
      params : { 
        date : date,
        tabType : tabType,
        CODETab : CODETab
      }
    }).then(x => x.data)
  },
  getYearSalesData(date, tabType, CODETab) {
    return axios.get(apiUrl() + "sales/getYearSalesData", {
      params : { 
        date : date,
        tabType : tabType,
        CODETab : CODETab
      }
    }).then(x => x.data)
  },
  getMonthSalesData(date, tabType, CODETab) {
    return axios.get(apiUrl() + "sales/getMonthSalesData", {
      params : { 
        date : date,
        tabType : tabType,
        CODETab : CODETab
      }
    }).then(x => x.data)
  },
  getMonthDiscountData(date, tabType, CODETab) {
    return axios.get(apiUrl() + "sales/getMonthDiscountData", {
      params : { 
        date : date,
        tabType : tabType,
        CODETab : CODETab
      }
    }).then(x => x.data)
  },
  getMonthTotalSalesData(date, tabType, CODETab) {
    return axios.get(apiUrl() + "sales/getMonthTotalSalesData", {
      params : { 
        date : date,
        tabType : tabType,
        CODETab : CODETab
      }
    }).then(x => x.data)
  }
}
