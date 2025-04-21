import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getMakeDataDate() {
    return axios.get(apiUrl() + "product/getMakeDataDate").then(x => x.data)
  },
  getProData(tabType, CODETab, yearCode) {
    return axios.get(apiUrl() + "product/getProData", {
      params : { 
        tabType :tabType,
        CODETab : CODETab,
        yearCode : yearCode
      }
    }).then(x => x.data)
  }
}
