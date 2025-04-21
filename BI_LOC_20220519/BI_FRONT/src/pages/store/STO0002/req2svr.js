import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getMakeDataDate() {
    return axios.get(apiUrl() + "store/getMakeDataDate2").then(x => x.data)
  },
  getStoreDailyList(tabType, selectedCODE, date, selectStoreList) {
    return axios.get(apiUrl() + "store/getStoreDailyList", {
      params : { 
        tabType : tabType,
        selectedCODE : selectedCODE,
        date : date,
        selectStoreList : selectStoreList
      }
    }).then(x => x.data)
  },
  getStoreMonthList(tabType, selectedCODE, year, month, selectStoreList) {
    return axios.get(apiUrl() + "store/getStoreMonthList", {
      params : { 
        tabType : tabType,
        selectedCODE : selectedCODE,
        year : year,
        month : month,
        selectStoreList : selectStoreList
      }
    }).then(x => x.data)
  },
  getStoreCumulativeList(tabType, selectedCODE, year, selectStoreList) {
    return axios.get(apiUrl() + "store/getStoreCumulativeList", {
      params : { 
        tabType : tabType,
        selectedCODE : selectedCODE,
        year : year,
        selectStoreList : selectStoreList
      }
    }).then(x => x.data)
  },
}
