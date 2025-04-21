import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getMakeDataDate() {
    return axios.get(apiUrl() + "buy/getMakeDataDate").then(x => x.data)
  },
  getBuyData(choice, tabType, CODETab, yearCode) {
    return axios.get(apiUrl() + "buy/getBuyData", {
      params : { 
        choice : choice,
        tabType : tabType,
        CODETab : CODETab,
        yearCode : yearCode
      }
    }).then(x => x.data)
  },
}