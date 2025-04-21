import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getRatingInfoData(sucd, chgucd) {
    return axios.get(apiUrl() + "hum/getRatingInfoData", {
      params : { 
        sucd : sucd,
        chgucd : chgucd
      }
    }).then(x => x.data)
  },
  getSalesManagerData(vdcd) {
    return axios.get(apiUrl() + "hum/getSalesManagerData", {
      params : { 
        vdcd : vdcd
      }
    }).then(x => x.data)
  },
  getSalesManInfo(hrid) {
    return axios.get(apiUrl() + "hum/getSalesManInfo", {
      params : { 
        hrid : hrid
      }
    }).then(x => x.data)
  },
  getSalesResultData(vdcd, currentYear) {
    return axios.get(apiUrl() + "hum/getSalesResultData", {
      params : { 
        vdcd : vdcd,
        currentYear : currentYear
      }
    }).then(x => x.data)
  },
  getAccumulatedSalesData(vdcd, currentYear) {
    return axios.get(apiUrl() + "hum/getAccumulatedSalesData", {
      params : { 
        vdcd : vdcd,
        currentYear : currentYear
      }
    }).then(x => x.data)
  },
  getSalesInfoData(vdcd, sucd, currentYear) {
    return axios.get(apiUrl() + "hum/getSalesInfoData", {
      params : { 
        vdcd : vdcd,
        sucd : sucd,
        currentYear : currentYear
      }
    }).then(x => x.data)
  },
  getLeftInfoData(vdcd, currentYear) {
    return axios.get(apiUrl() + "hum/getLeftInfoData", {
      params : { 
        vdcd : vdcd,
        currentYear : currentYear
      }
    }).then(x => x.data)
  },
  getBagicInfoTopData(vdcd, currentYear, lastMonth) {
    return axios.get(apiUrl() + "hum/getBagicInfoTopData", {
      params : { 
        vdcd : vdcd,
        currentYear : currentYear,
        lastMonth : lastMonth
      }
    }).then(x => x.data)
  },
  getStyleStoreTop10(vdcd, sDate, eDate) {
    return axios.get(apiUrl() + "hum/getStyleStoreTop10", {
      params : { 
        vdcd : vdcd,
        sDate : sDate,
        eDate : eDate
      }
    }).then(x => x.data)
  },
  getStyleSucdTop10(sucd, sDate, eDate) {
    return axios.get(apiUrl() + "hum/getStyleSucdTop10", {
      params : { 
        sucd : sucd,
        sDate : sDate,
        eDate : eDate
      }
    }).then(x => x.data)
  },
  getAdditionalInfo(vdcd, hrid) {
    return axios.get(apiUrl() + "hum/getAdditionalInfo", {
      params : { 
        vdcd : vdcd,
        hrid : hrid
      }
    }).then(x => x.data)
  },
  getSpecialNote(vdcd) {
    return axios.get(apiUrl() + "hum/getSpecialNote", {
      params : { 
        vdcd : vdcd
      }
    }).then(x => x.data)
  }
}
