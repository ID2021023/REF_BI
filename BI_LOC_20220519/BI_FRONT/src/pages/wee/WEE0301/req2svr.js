import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  get0301MakeDataDate() {
    return axios.get(apiUrl() + "wee/get0301MakeDataDate").then(x => x.data)
  },

  getStyle(selectSucd, 
    paramOutFromDate, paramOutToDate,
    paramStFromDate, paramStToDate) {
    return axios.post(apiUrl() + "wee/getStyle", {
      params : { 
        selectSucd : selectSucd,
        paramOutFromDate : paramOutFromDate,
        paramOutToDate : paramOutToDate,
        paramStFromDate : paramStFromDate,
        paramStToDate : paramStToDate
      }
    }).then(x => x.data)
  },

  getStyleDetail(stycd, selectSucd, 
    paramOutFromDate, paramOutToDate,
    paramStFromDate, paramStToDate) {
    return axios.post(apiUrl() + "wee/getStyleDetail", {
      params : { 
        stycd: stycd,
        selectSucd : selectSucd,
        paramOutFromDate : paramOutFromDate,
        paramOutToDate : paramOutToDate,
        paramStFromDate : paramStFromDate,
        paramStToDate : paramStToDate
      }
    }).then(x => x.data)
  },

  getStyleStore(stycd, selectSucd, 
    paramOutFromDate, paramOutToDate,
    paramStFromDate, paramStToDate) {
    return axios.post(apiUrl() + "wee/getStyleStore", {
      params : { 
        stycd: stycd,
        selectSucd : selectSucd,
        paramOutFromDate : paramOutFromDate,
        paramOutToDate : paramOutToDate,
        paramStFromDate : paramStFromDate,
        paramStToDate : paramStToDate
      }
    }).then(x => x.data)
  },
}

