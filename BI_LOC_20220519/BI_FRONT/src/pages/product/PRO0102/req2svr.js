import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getMakeDataDate() {
    return axios.get(apiUrl() + "product/getMakeDataDate").then(x => x.data)
  },
  getData(tabType, CODETab, yearCode, season, YSCD) {
    return axios.get(apiUrl() + "product/getData", {
      params : { 
        tabType :tabType,
        CODETab : CODETab,
        yearCode : yearCode,
        season : season,
        YSCD : YSCD
      }
    }).then(x => x.data)
  }
}
