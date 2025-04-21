import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getMakeDataDate() {
    return axios.get(apiUrl() + "online/getMakeDataDate").then(x => x.data)
  },
  getLatelySalesDate() {
    return axios.get(apiUrl() + "online/getLatelySalesDate").then(x => x.data)
  },
  getMakeLastDataDate() {
    return axios.get(apiUrl() + "online/getMakeLastDataDate").then(x => x.data)
  },
  getSaleDeptCount() {
    return axios.get(apiUrl() + "online/getSaleDeptCount").then(x => x.data)
  },
  getSaleBrandCount() {
    return axios.get(apiUrl() + "online/getSaleBrandCount").then(x => x.data)
  },
  getSaleData(month, sql_startdate, sql_enddate) {
    return axios.get(apiUrl() + "online/getSaleData", {
      params : { 
        month : month,
        sql_startdate : sql_startdate,
        sql_enddate : sql_enddate
      }
    }).then(x => x.data)
  },
  getSaleDeptData(month, sql_startdate, sql_enddate) {
    return axios.get(apiUrl() + "online/getSaleDeptData", {
      params : { 
        month : month,
        sql_startdate : sql_startdate,
        sql_enddate : sql_enddate
      }
    }).then(x => x.data)
  },
  getSaleBrandData(month, sql_enddate) {
    return axios.get(apiUrl() + "online/getSaleBrandData", {
      params : { 
        month : month,
        sql_enddate : sql_enddate
      }
    }).then(x => x.data)
  }
}
