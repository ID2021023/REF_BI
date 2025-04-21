import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getMakeDataDate() {
    return axios.get(apiUrl() + "online/getMakeDataDate").then(x => x.data)
  },
  getBrandDetailData(year, yeardate, SUBGU) {
    return axios.get(apiUrl() + "online/getBrandDetailData", {
      params : { 
        year : year,
        yeardate : yeardate,
        SUBGU : SUBGU
      }
    }).then(x => x.data)
  },
  getMallDetailData(year, yeardate, MAINGU) {
    return axios.get(apiUrl() + "online/getMallDetailData", {
      params : { 
        year : year,
        yeardate : yeardate,
        MAINGU : MAINGU
      }
    }).then(x => x.data)
  }
}
