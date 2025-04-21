import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getMakeDataDate() {
    return axios.get(apiUrl() + "store/getMakeDataDate6").then(x => x.data)
  },
  
  getMainCurrentStatus(sucd, year, month) {
    return axios.get(apiUrl() + "store/getMainCurrentStatus", {
      params : { 
        sucd : sucd,
        year : year,
        month : month
      }
    }).then(x => x.data)
  },
  
  getMonthlySalesAverage(sucd, year, month, type) {
    return axios.get(apiUrl() + "store/getMonthlySalesAverage", {
      params : { 
        sucd : sucd,
        year : year,
        month : month,
        type : type
      }
    }).then(x => x.data)
  },
  
  getStoreSalesAverage(sucd, year, month, type) {
    return axios.get(apiUrl() + "store/getStoreSalesAverage", {
      params : { 
        sucd : sucd,
        year : year,
        month : month,
        type : type
      }
    }).then(x => x.data)
  },

  getMainLastStatus(sucd, year, month) {
    return axios.get(apiUrl() + "store/getMainLastStatus", {
      params : { 
        sucd : sucd,
        year : year,
        month : month
      }
    }).then(x => x.data)
  },

  getOpenCloseStore(sucd, year, month) {
    return axios.get(apiUrl() + "store/getOpenCloseStore", {
      params : { 
        sucd : sucd,
        year : year,
        month : month
      }
    }).then(x => x.data)
  },

  getInDeCreaseStore(sucd, year, month) {
    return axios.get(apiUrl() + "store/getInDeCreaseStore", {
      params : { 
        sucd : sucd,
        year : year,
        month : month
      }
    }).then(x => x.data)
  },
  
  getCuIndexStore(sucd, year, month) {
    return axios.get(apiUrl() + "store/getCuIndexStore", {
      params : { 
        sucd : sucd,
        year : year,
        month : month
      }
    }).then(x => x.data)
  },

  getLastIndexStore(sucd, year, month) {
    return axios.get(apiUrl() + "store/getLastIndexStore", {
      params : { 
        sucd : sucd,
        year : year,
        month : month
      }
    }).then(x => x.data)
  },

  getMonthAvg(sucd, year, month) {
    return axios.get(apiUrl() + "store/getMonthAvg", {
      params : { 
        sucd : sucd,
        year : year,
        month : month
      }
    }).then(x => x.data)
  },
  getMonthStoreAvg(sucd, year, month) {
    return axios.get(apiUrl() + "store/getMonthStoreAvg", {
      params : { 
        sucd : sucd,
        year : year,
        month : month
      }
    }).then(x => x.data)
  },
  getSalesTotal( year, month) {
    return axios.get(apiUrl() + "store/getSalesTotal", {
      params : { 
        year : year,
        month : month
      }
    }).then(x => x.data)
  },
}
