import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getMakeDataDate() {
    return axios.get(apiUrl() + "store/getMakeDataDate6").then(x => x.data)
  },
  getSHTPNMList() {
    return axios.get(apiUrl() + "store/getSHTPNMList").then(x => x.data)
  },
  getMonthlySalesStatus(sucd, year, month) {
    return axios.get(apiUrl() + "store/getMonthlySalesStatus", {
      params : { 
        sucd : sucd,
        year : year,
        month : month
      }
    }).then(x => x.data)
  },
}
