import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getData(sql) {
    return axios.get(apiUrl(sql)).then(x => x.data)
  },
  getPerformanceList(tabType, code, date) {
    return axios.get(apiUrl() + "fin/getPerformanceList", {
      params : { 
        tabType : tabType,
        code : code,
        date : date
      }
    }).then(x => x.data)
  },
  getMonthGoal(date) {
    return axios.get(apiUrl() + "fin/getMonthGoal", {
      params : { 
        date : date
      }
    }).then(x => x.data)
  }
}
