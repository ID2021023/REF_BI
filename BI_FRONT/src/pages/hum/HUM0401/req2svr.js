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
  getLeftInfoData3(vdcd, currentYear) {
    return axios.get(apiUrl() + "hum/getLeftInfoData3", {
      params : { 
        vdcd : vdcd,
        currentYear : currentYear
      }
    }).then(x => x.data)
  },
  getBagicInfoTopData3(vdcd, currentYear, lastMonth) {
    return axios.get(apiUrl() + "hum/getBagicInfoTopData3", {
      params : { 
        vdcd : vdcd,
        currentYear : currentYear,
        lastMonth : lastMonth
      }
    }).then(x => x.data)
  },
  getSalesManagerData3(vdcd) {
    return axios.get(apiUrl() + "hum/getSalesManagerData3", {
      params : { 
        vdcd : vdcd
      }
    }).then(x => x.data)
  },
  getSpecialNote3(vdcd) {
    return axios.get(apiUrl() + "hum/getSpecialNote3", {
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
  }
}
