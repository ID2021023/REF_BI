import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getData(sql) {
    return axios.get(apiUrl(sql)).then(x => x.data)
  },
  getDataByClothingType(selectSucd, date, startDate, lastYearDate, startYearDate, fromSeason, toSeason, fromLastYearSeason, toLastYearSeason) {
    return axios.get(apiUrl() + "wee/getDataByClothingType", {
      params : { 
        selectSucd : selectSucd,
        date : date,
        startDate : startDate,
        lastYearDate : lastYearDate,
        startYearDate : startYearDate,
        fromSeason : fromSeason,
        toSeason : toSeason,
        fromLastYearSeason : fromLastYearSeason, 
        toLastYearSeason : toLastYearSeason
      }
    }).then(x => x.data)
  },
  getMonthlySalesData(selectSucd, date, lastYearDate, fromSeason, toSeason, fromLastYearSeason, toLastYearSeason) {
    return axios.get(apiUrl() + "wee/getMonthlySalesData", {
      params : { 
        selectSucd : selectSucd,
        date : date,
        lastYearDate : lastYearDate,
        fromSeason : fromSeason,
        toSeason : toSeason,
        fromLastYearSeason : fromLastYearSeason, 
        toLastYearSeason : toLastYearSeason
      }
    }).then(x => x.data)
  },
  getForeignerData(selectSucd, date, lastYearDate, fromSeason, toSeason, fromLastYearSeason, toLastYearSeason) {
    return axios.get(apiUrl() + "wee/getForeignerData", {
      params : { 
        selectSucd : selectSucd,
        date : date,
        lastYearDate : lastYearDate,
        fromSeason : fromSeason,
        toSeason : toSeason,
        fromLastYearSeason : fromLastYearSeason, 
        toLastYearSeason : toLastYearSeason
      }
    }).then(x => x.data)
  },
  getForeignerSumData(selectSucd, date, lastYearDate, fromSeason, toSeason, fromLastYearSeason, toLastYearSeason) {
    return axios.get(apiUrl() + "wee/getForeignerSumData", {
      params : { 
        selectSucd : selectSucd,
        date : date,
        lastYearDate : lastYearDate,
        fromSeason : fromSeason,
        toSeason : toSeason,
        fromLastYearSeason : fromLastYearSeason, 
        toLastYearSeason : toLastYearSeason
      }
    }).then(x => x.data)
  },
  getSalesResultData(selectSucd, date, lastYearDate) {
    return axios.get(apiUrl() + "wee/getSalesResultData", {
      params : { 
        selectSucd : selectSucd,
        date : date,
        lastYearDate : lastYearDate
      }
    }).then(x => x.data)
  }
}
