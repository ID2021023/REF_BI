import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getMakeDataDate() {
    return axios.get(apiUrl() + "store/getMakeDataDate3").then(x => x.data)
  },
  getHeaderData(tabType, selectedCODE, year, month, store) {
    return axios.get(apiUrl() + "store/getMonthlyHeaderData", {
      params : { 
        tabType : tabType,
        selectedCODE : selectedCODE,
        year : year,
        month : month,
        store : store
      }
    }).then(x => x.data)
  },
  getSalesChartData(tabType, selectedCODE, year, month, store) {
    return axios.get(apiUrl() + "store/getMonthlySalesChartData", {
      params : { 
        tabType : tabType,
        selectedCODE : selectedCODE,
        year : year,
        month : month,
        store : store
      }
    }).then(x => x.data)
  },
  getSalesLineCharData(tabType, selectedCODE, year, month, store) {
    return axios.get(apiUrl() + "store/getMonthlySalesLineCharData", {
      params : { 
        tabType : tabType,
        selectedCODE : selectedCODE,
        year : year,
        month : month,
        store : store
      }
    }).then(x => x.data)
  },
  getSalesAnalysisData(tabType, selectedCODE, year, month, store) {
    return axios.get(apiUrl() + "store/getMonthlySalesAnalysisData", {
      params : { 
        tabType : tabType,
        selectedCODE : selectedCODE,
        year : year,
        month : month,
        store : store
      }
    }).then(x => x.data)
  }
}
