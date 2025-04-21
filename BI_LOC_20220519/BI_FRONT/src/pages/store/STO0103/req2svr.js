import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getData(sql) {
    return axios.get(apiUrl(sql)).then(x => x.data)
  },
  getMakeDataDate() {
    return axios.get(apiUrl() + "store/getMakeDataDate5").then(x => x.data)
  },
  getHeaderData(tabType, selectedCODE, year, store) {
    return axios.get(apiUrl() + "store/getHeaderData", {
      params : { 
        tabType : tabType,
        selectedCODE : selectedCODE,
        year : year,
        store : store
      }
    }).then(x => x.data)
  },
  getSalesChartData(tabType, selectedCODE, year, store) {
    return axios.get(apiUrl() + "store/getSalesChartData", {
      params : { 
        tabType : tabType,
        selectedCODE : selectedCODE,
        year : year,
        store : store
      }
    }).then(x => x.data)
  },
  getSalesLineCharData(tabType, selectedCODE, year, store) {
    return axios.get(apiUrl() + "store/getSalesLineCharData", {
      params : { 
        tabType : tabType,
        selectedCODE : selectedCODE,
        year : year,
        store : store
      }
    }).then(x => x.data)
  },
  getSalesAnalysisData(tabType, selectedCODE, year, store) {
    return axios.get(apiUrl() + "store/getSalesAnalysisData", {
      params : { 
        tabType : tabType,
        selectedCODE : selectedCODE,
        year : year,
        store : store
      }
    }).then(x => x.data)
  }
}
