import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getData(sql) {
    return axios.get(apiUrl(sql)).then(x => x.data)
  },
  getStoreByDate(date, vdcd) {
    return axios.get(apiUrl() + "fin/getStoreByDate", {
      params : { 
        vdcd : vdcd,
        date : date
      }
    }).then(x => x.data)
  }
}
