import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getData(sql) {
    return axios.get(apiUrl(sql)).then(x => x.data)
  },
  getStoreCountByType() {
    return axios.get(apiUrl() + "hum/getStoreCountByType").then(x => x.data)
  },
  getTotalSDCount(selectedBRCD, selectedCHGUCD) {
    return axios.get(apiUrl() + "hum/getTotalSDCount", {
      params : { 
        selectedBRCD : selectedBRCD,
        selectedCHGUCD : selectedCHGUCD
      }
    }).then(x => x.data)
  },
  getRegionSDCount(selectedBRCD, selectedCHGUCD) {
    return axios.get(apiUrl() + "hum/getRegionSDCount", {
      params : { 
        selectedBRCD : selectedBRCD,
        selectedCHGUCD : selectedCHGUCD
      }
    }).then(x => x.data)
  }
}
