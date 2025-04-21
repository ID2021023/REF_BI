import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getMonthlySaleList_POP(date, month) {
    return axios.get(apiUrl() + "online/getMonthlySaleList_POP", {
      params : { 
        date : date,
        month : month,
      }
    }).then(x => x.data)
  }
}
