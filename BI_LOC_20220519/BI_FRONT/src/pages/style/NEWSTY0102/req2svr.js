import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getData(sql) {
    return axios.get(apiUrl(sql)).then(x => x.data)
  },
  getMakeDataDate() {
    return axios.get(apiUrl() + "style/getMakeDataDate").then(x => x.data)
  },
  getOutQty(STYCODE, sucd) {
    return axios.get(apiUrl() + "style/getOutQty", {
      params : { 
        STYCODE : STYCODE,
        sucd : sucd
      }
    }).then(x => x.data)
  },
  getOutInfo(STYCODE, MAINSTYCD, sucd) {
    return axios.get(apiUrl() + "style/getOutInfo", {
      params : { 
        STYCODE : STYCODE,
        MAINSTYCD : MAINSTYCD,
        sucd : sucd
      }
    }).then(x => x.data)
  },
  getStoreQTYData(STYCODE, VDCD, sucd) {
    return axios.get(apiUrl() + "style/getStoreQTYData", {
      params : { 
        STYCODE : STYCODE,
        VDCD : VDCD,
        sucd : sucd
      }
    }).then(x => x.data)
  },
  getStoreQTYColSz(tabType, STYCODE, VDCD, sucd) {
    return axios.get(apiUrl() + "style/getStoreQTYColSz", {
      params : { 
        tabType : tabType,
        STYCODE : STYCODE,
        VDCD : VDCD,
        sucd : sucd
      }
    }).then(x => x.data)
  },
  getColorCode(BRCD) {
    return axios.get(apiUrl() + "style/getColorCode", {
      params : { 
        BRCD : BRCD
      }
    }).then(x => x.data)
  },
  getStoreListData(STYCODE, sucd) {
    return axios.get(apiUrl() + "style/getStoreListData", {
      params : { 
        STYCODE : STYCODE,
        sucd : sucd
      }
    }).then(x => x.data)
  },
  getDistributionListData(STYCODE, sucd) {
    return axios.get(apiUrl() + "style/getDistributionListData", {
      params : { 
        STYCODE : STYCODE,
        sucd : sucd
      }
    }).then(x => x.data)
  }
}
