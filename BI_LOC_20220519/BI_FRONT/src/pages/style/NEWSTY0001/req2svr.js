import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getMakeDataDate() {
    return axios.get(apiUrl() + "style/getMakeDataDate").then(x => x.data)
  },
  searchStyle(tabType, searchText, filterData) {
    return axios.post(apiUrl() + "style/searchStyle", {
      params : { 
        tabType : tabType,
        searchText : searchText,
        filterData : filterData
      }
    }).then(x => x.data)
  },
  getStyleTopData(tabType, filterData) {
    return axios.post(apiUrl() + "style/getStyleTopData", {
      params : { 
        tabType : tabType,
        filterData : filterData
      }
    }).then(x => x.data)
  },
  getDesignerTopData(tabType, sucd) {
    return axios.get(apiUrl() + "style/getDesignerTopData", {
      params : { 
        tabType : tabType,
        sucd : sucd
      }
    }).then(x => x.data)
  }
}
