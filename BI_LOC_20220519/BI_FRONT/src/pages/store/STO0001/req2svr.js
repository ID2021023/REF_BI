import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getMakeDataDate() {
    return axios.get(apiUrl() + "store/getMakeDataDate").then(x => x.data)
  },
  getRegionData(choice, tabType, selectedCODE, date, year, month, yesterday) {
    return axios.get(apiUrl() + "store/getRegionData", {
      params : { 
        choice : choice,
        tabType : tabType,
        selectedCODE : selectedCODE,
        date : date,
        year : year,
        date : date,
        month : month,
        yesterday : yesterday
      }
    }).then(x => x.data)
  },
  getSelectRegionData(choice, tabType, selectedCODE, date, year, month, yesterday, selectRegion, selectStoreType, selectStoreOption, selectStoreSU) {
    return axios.get(apiUrl() + "store/getSelectRegionData", {
      params : { 
        choice : choice,
        tabType : tabType,
        selectedCODE : selectedCODE,
        date : date,
        year : year,
        date : date,
        month : month,
        yesterday : yesterday,
        selectRegion : selectRegion,
        selectStoreType : selectStoreType,
        selectStoreOption : selectStoreOption,
        selectStoreSU : selectStoreSU
      }
    }).then(x => x.data)
  },
  getStoreSUData(choice, tabType, selectedCODE, date, year, month, yesterday, selectRegion) {
    return axios.get(apiUrl() + "store/getStoreSUData", {
      params : { 
        choice : choice,
        tabType : tabType,
        selectedCODE : selectedCODE,
        date : date,
        year : year,
        date : date,
        month : month,
        yesterday : yesterday,
        selectRegion : selectRegion
      }
    }).then(x => x.data)
  },
  getStoreTypeData(choice, tabType, selectedCODE, date, year, month, yesterday, selectRegion, selectStoreSU) {
    return axios.get(apiUrl() + "store/getStoreTypeData", {
      params : { 
        choice : choice,
        tabType : tabType,
        selectedCODE : selectedCODE,
        date : date,
        year : year,
        date : date,
        month : month,
        yesterday : yesterday,
        selectRegion : selectRegion,
        selectStoreSU : selectStoreSU
      }
    }).then(x => x.data)
  },
  getStoreOptionData(choice, tabType, selectedCODE, date, year, month, yesterday, selectRegion, selectStoreType, selectStoreSU) {
    return axios.get(apiUrl() + "store/getStoreOptionData", {
      params : { 
        choice : choice,
        tabType : tabType,
        selectedCODE : selectedCODE,
        date : date,
        year : year,
        date : date,
        month : month,
        yesterday : yesterday,
        selectRegion : selectRegion,
        selectStoreType : selectStoreType,
        selectStoreSU : selectStoreSU
      }
    }).then(x => x.data)
  },
  getSelectVDCDStoreInfo(choice, tabType, selectedCODE, date, year, month, yesterday, selectRegion, selectStoreType, selectStoreOption, selectStoreSU) {
    return axios.get(apiUrl() + "store/getSelectVDCDStoreInfo", {
      params : { 
        choice : choice,
        tabType : tabType,
        selectedCODE : selectedCODE,
        date : date,
        year : year,
        date : date,
        month : month,
        yesterday : yesterday,
        selectRegion : selectRegion,
        selectStoreType : selectStoreType,
        selectStoreOption : selectStoreOption,
        selectStoreSU : selectStoreSU
      }
    }).then(x => x.data)
  },
  getDailyStoreList(tabType, selectedCODE, date, selectStoreList) {
    return axios.get(apiUrl() + "store/getDailyStoreList", {
      params : { 
        tabType : tabType,
        selectedCODE : selectedCODE,
        date : date,
        selectStoreList : selectStoreList
      }
    }).then(x => x.data)
  },
  getMonthStoreList(tabType, selectedCODE, year, month, selectStoreList) {
    return axios.get(apiUrl() + "store/getMonthStoreList", {
      params : { 
        tabType : tabType,
        selectedCODE : selectedCODE,
        year : year,
        month : month,
        selectStoreList : selectStoreList
      }
    }).then(x => x.data)
  },
  getCumulativeStoreList(tabType, selectedCODE, year, month, selectStoreList) {
    return axios.get(apiUrl() + "store/getCumulativeStoreList", {
      params : { 
        tabType : tabType,
        selectedCODE : selectedCODE,
        year : year,
        month : month,
        selectStoreList : selectStoreList
      }
    }).then(x => x.data)
  },
  getDailyTotalAMT(tabType, selectedCODE, date, selectStoreList) {
    return axios.get(apiUrl() + "store/getDailyTotalAMT", {
      params : { 
        tabType : tabType,
        selectedCODE : selectedCODE,
        date : date,
        selectStoreList : selectStoreList
      }
    }).then(x => x.data)
  },
  getMonthTotalAMT(tabType, selectedCODE, year, month, selectStoreList) {
    return axios.get(apiUrl() + "store/getMonthTotalAMT", {
      params : { 
        tabType : tabType,
        selectedCODE : selectedCODE,
        year : year,
        month : month,
        selectStoreList : selectStoreList
      }
    }).then(x => x.data)
  },
  getCumulativeTotalAMT(tabType, selectedCODE, year, month, selectStoreList) {
    return axios.get(apiUrl() + "store/getCumulativeTotalAMT", {
      params : { 
        tabType : tabType,
        selectedCODE : selectedCODE,
        year : year,
        month : month,
        selectStoreList : selectStoreList
      }
    }).then(x => x.data)
  }
}
