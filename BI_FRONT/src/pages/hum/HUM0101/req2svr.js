import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getMakeDataDate() {
    return axios.get(apiUrl() + "hum/getMakeDataDate").then(x => x.data)
  },
  getRegionData(selectedCODE, selectChgucd) {
    return axios.get(apiUrl() + "hum/getRegionData", {
      params : { 
        selectedCODE : selectedCODE,
        selectChgucd : selectChgucd
      }
    }).then(x => x.data)
  },
  getSiGuData(selectedCODE, selectRegion, selectChgucd) {
    return axios.get(apiUrl() + "hum/getSiGuData", {
      params : { 
        selectedCODE : selectedCODE,
        selectRegion : selectRegion,
        selectChgucd : selectChgucd
      }
    }).then(x => x.data)
  },
  getChageChgucdRegionData(selectedCODE, selectChgucd) {
    return axios.get(apiUrl() + "hum/getChageChgucdRegionData", {
      params : { 
        selectedCODE : selectedCODE,
        selectChgucd : selectChgucd
      }
    }).then(x => x.data)
  },
  getChageChgucdGuData(selectedCODE, selectRegion, selectChgucd) {
    return axios.get(apiUrl() + "hum/getChageChgucdGuData", {
      params : { 
        selectedCODE : selectedCODE,
        selectRegion : selectRegion,
        selectChgucd : selectChgucd
      }
    }).then(x => x.data)
  },
  getVDCDList(selectedCODE, selectRegion, selectGu, selectChgucd) {
    return axios.get(apiUrl() + "hum/getVDCDList", {
      params : { 
        selectedCODE : selectedCODE,
        selectRegion : selectRegion,
        selectGu : selectGu,
        selectChgucd : selectChgucd
      }
    }).then(x => x.data)
  },
  getSDInfo(selectedCODE, vdcdData, choice, year, month, region) {
    return axios.post(apiUrl() + "hum/getSDInfo", {
      params : { 
        selectedCODE : selectedCODE,
        vdcdData : vdcdData,
        choice : choice,
        year : year,
        month : month,
        region : region
      }
    }).then(x => x.data)
  }
}
