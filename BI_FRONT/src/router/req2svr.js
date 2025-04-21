import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getData(sql) {
    // return axios.get(db() + '?q=' + encodeURIComponent(sql)).then(x => x.data)
    return axios.get(apiUrl(sql)).then(x => x.data)
  },
  accessControl() {
    return axios.get(apiUrl() + "common/accessControl").then(x => x.data)
  },
  getAssignedMenuList(empcd) {
    return axios.get(apiUrl() + "common/getAssignedMenuList", {
      params : { 
        empcd :empcd
      }
    }).then(x => x.data)
  },
  getAssignedPageList(empcd) {
    return axios.get(apiUrl() + "common/getAssignedPageList", {
      params : { 
        empcd :empcd
      }
    }).then(x => x.data)
  },
  getAssignedSUList(empcd) {
    return axios.get(apiUrl() + "common/getAssignedSUList", {
      params : { 
        empcd :empcd
      }
    }).then(x => x.data)
  },
  getAssignedBrandList(empcd) {
    return axios.get(apiUrl() + "common/getAssignedBrandList", {
      params : { 
        empcd :empcd
      }
    }).then(x => x.data)
  },
  getFDRList() {
    return axios.get(apiUrl() + "common/getFDRList").then(x => x.data)
  },
  getFINLIST() {
    return axios.get(apiUrl() + "common/getFINLIST").then(x => x.data)
  },
  getSALList() {
    return axios.get(apiUrl() + "common/getSALList").then(x => x.data)
  },
  getWRPList() {
    return axios.get(apiUrl() + "common/getWRPList").then(x => x.data)
  },
  getSTYList() {
    return axios.get(apiUrl() + "common/getSTYList").then(x => x.data)
  },
  getSTOList() {
    return axios.get(apiUrl() + "common/getSTOList").then(x => x.data)
  },
  getCRMList() {
    return axios.get(apiUrl() + "common/getCRMList").then(x => x.data)
  },
  getPROList() {
    return axios.get(apiUrl() + "common/getPROList").then(x => x.data)
  },
  getBUYList() {
    return axios.get(apiUrl() + "common/getBUYList").then(x => x.data)
  },
  getHUMList() {
    return axios.get(apiUrl() + "common/getHUMList").then(x => x.data)
  },
  getSDCOMPANYCDList() {
    return axios.get(apiUrl() + "common/getSDCOMPANYCDList").then(x => x.data)
  },
  getSECOMPANYCDList() {
    return axios.get(apiUrl() + "common/getSECOMPANYCDList").then(x => x.data)
  },
  getJAEJIGCDList() {
    return axios.get(apiUrl() + "common/getJAEJIGCDList").then(x => x.data)
  },
  getCHGUCDList() {
    return axios.get(apiUrl() + "common/getCHGUCDList").then(x => x.data)
  },
  getAMTRATINGCDList() {
    return axios.get(apiUrl() + "common/getAMTRATINGCDList").then(x => x.data)
  },
  getSUCDCardList() {
    return axios.get(apiUrl() + "common/getSUCDCardList").then(x => x.data)
  },
  getSUCDList() {
    return axios.get(apiUrl() + "common/getSUCDList").then(x => x.data)
  },
  getBRCDList() {
    return axios.get(apiUrl() + "common/getBRCDList").then(x => x.data)
  },
  getBRCDCardList() {
    return axios.get(apiUrl() + "common/getBRCDCardList").then(x => x.data)
  },
  getFasionSUCDList() {
    return axios.get(apiUrl() + "common/getFasionSUCDList").then(x => x.data)
  },
  getFutureSUCDList() {
    return axios.get(apiUrl() + "common/getFutureSUCDList").then(x => x.data)
  },
  getStopSUCDList() {
    return axios.get(apiUrl() + "common/getStopSUCDList").then(x => x.data)
  },
  getFasionBRCDList() {
    return axios.get(apiUrl() + "common/getFasionBRCDList").then(x => x.data)
  },
  getFutureBRCDList() {
    return axios.get(apiUrl() + "common/getFutureBRCDList").then(x => x.data)
  },
  getStopBRCDList() {
    return axios.get(apiUrl() + "common/getStopBRCDList").then(x => x.data)
  },
  getYearCodeList() {
    return axios.get(apiUrl() + "common/getYearCodeList").then(x => x.data)
  }
}
