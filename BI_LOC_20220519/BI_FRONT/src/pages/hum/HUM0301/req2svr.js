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
  getLeftInfoData2(hrid, sno, currentYear) {
    return axios.get(apiUrl() + "hum/getLeftInfoData2", {
      params : { 
        hrid: hrid,
        sno : sno,
        currentYear : currentYear
      }
    }).then(x => x.data)
  },
  getBagicInfoTopData2(sno) {
    return axios.get(apiUrl() + "hum/getBagicInfoTopData2", {
      params : { 
        sno : sno
      }
    }).then(x => x.data)
  },
  getSpecialNote2(sno) {
    return axios.get(apiUrl() + "hum/getSpecialNote2", {
      params : { 
        sno : sno
      }
    }).then(x => x.data)
  },
  getSalesManagerData2(sno) {
    return axios.get(apiUrl() + "hum/getSalesManagerData2", {
      params : { 
        sno : sno
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
