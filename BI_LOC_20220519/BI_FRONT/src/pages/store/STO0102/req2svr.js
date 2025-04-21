import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getMakeDataDate() {
    return axios.get(apiUrl() + "store/getMakeDataDate4").then(x => x.data)
  },
  getDailyData(tabType, selectedCODE, store, date) {
    return axios.get(apiUrl() + "store/getDailyData", {
      params : { 
        tabType : tabType,
        selectedCODE : selectedCODE,
        store : store,
        date : date
      }
    }).then(x => x.data)
  },
  getDailyChartCountData(tabType, selectedCODE, store, date) {
    return axios.get(apiUrl() + "store/getDailyChartCountData", {
      params : { 
        tabType : tabType,
        selectedCODE : selectedCODE,
        store : store,
        date : date
      }
    }).then(x => x.data)
  },
  getDailyChartAMTData(tabType, selectedCODE, store, date) {
    return axios.get(apiUrl() + "store/getDailyChartAMTData", {
      params : { 
        tabType : tabType,
        selectedCODE : selectedCODE,
        store : store,
        date : date
      }
    }).then(x => x.data)
  },
  getDailyChartListData(tabType, selectedCODE, store, date) {
    return axios.get(apiUrl() + "store/getDailyChartListData", {
      params : { 
        tabType : tabType,
        selectedCODE : selectedCODE,
        store : store,
        date : date
      }
    }).then(x => x.data)
  },
  getCurrentYearData(tabType, selectedCODE, store, date) {
    return axios.get(apiUrl() + "store/getCurrentYearData", {
      params : { 
        tabType : tabType,
        selectedCODE : selectedCODE,
        store : store,
        date : date
      }
    }).then(x => x.data)
  },
  getDailyStoreListData(tabType, selectedCODE, selectStoreSU, date) {
    return axios.get(apiUrl() + "store/getDailyStoreListData", {
      params : { 
        tabType : tabType,
        selectedCODE : selectedCODE,
        selectStoreSU : selectStoreSU,
        date : date
      }
    }).then(x => x.data)
  },
}
