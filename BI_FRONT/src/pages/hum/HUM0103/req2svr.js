import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getMakeDataDate() {
    return axios.get(apiUrl() + "hum/getMakeDataDate").then(x => x.data)
  },
  getSDSalesData(selectedCODE, vdcdData, year, month, dateTab) {
    return axios.post(apiUrl() + "hum/getSDSalesData", {
      params : { 
        selectedCODE : selectedCODE,
        vdcdData : vdcdData,
        year : year,
        month : month,
        dateTab : dateTab
      }
    }).then(x => x.data)
  }
}
