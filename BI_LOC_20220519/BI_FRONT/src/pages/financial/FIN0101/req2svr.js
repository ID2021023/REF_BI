import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getMakeDataDate() {
    return axios.get(apiUrl() + "fin/getMakeDataDate").then(x => x.data)
  },
  getRecentBISL061Date() { 
    return axios.get(apiUrl() + "fin/getRecentBISL061Date").then(x => x.data)
  },
  getTotalSalesData(tabType, authCodeList, date, monthStartDate) { 
    return axios.get(apiUrl() + "fin/getTotalSalesData", {
      params : { 
        tabType : tabType,
        authCodeList : authCodeList,
        date : date,
        monthStartDate : monthStartDate
      }
    }).then(x => x.data)
  },
  getCumulativeData(tabType, authCodeList, date, monthStartDate) { 
    return axios.get(apiUrl() + "fin/getCumulativeData", {
      params : { 
        tabType : tabType,
        authCodeList : authCodeList,
        date : date,
        monthStartDate : monthStartDate
      }
    }).then(x => x.data)
  },
  getChartData2(tabType, code, lastYear30day, lastYearSelectDay, searchType) { 
    return axios.get(apiUrl() + "fin/getChartData2", {
      params : { 
        tabType : tabType,
        code : code,
        lastYear30day : lastYear30day,
        lastYearSelectDay : lastYearSelectDay,
        searchType : searchType,
      }
    }).then(x => x.data)
  },
  getChartData2_1(tabType, code, lastYear30day, lastYearSelectDay, searchType) { 
    return axios.get(apiUrl() + "fin/getChartData2_1", {
      params : { 
        tabType : tabType,
        code : code,
        lastYear30day : lastYear30day,
        lastYearSelectDay : lastYearSelectDay,
        searchType : searchType,
      }
    }).then(x => x.data)
  },
  getCurrentData (tabType, code, start_date, date, searchType) { 
    return axios.get(apiUrl() + "fin/getCurrentYearData", {
      params : { 
        tabType : tabType,
        code : code,
        start_date : start_date,
        date : date,
        searchType : searchType,
      }
    }).then(x => x.data)
  },
  getStoreList(date, tabType, code, gubun) { 
    return axios.get(apiUrl() + "fin/getStoreList", {
      params : { 
        date : date,
        tabType : tabType,
        code : code,
        gubun: gubun
      }
    }).then(x => x.data)
  },
  getStoreMonthList(date, tabType, code) { 
    return axios.get(apiUrl() + "fin/getStoreMonthList", {
      params : { 
        date : date,
        tabType : tabType,
        code : code
      }
    }).then(x => x.data)
  },
  getSalesChartCount(tabType, code, date, searchType) { 
    return axios.get(apiUrl() + "fin/getSalesChartCount", {
      params : { 
        tabType : tabType,
        code : code,
        date : date,
        searchType : searchType,
      }
    }).then(x => x.data)
  },
  getSalesChartAMT(tabType, code, date, searchType) { 
    return axios.get(apiUrl() + "fin/getSalesChartAMT", {
      params : { 
        tabType : tabType,
        code : code,
        date : date,
        searchType : searchType
      }
    }).then(x => x.data)
  },
  getDailySalesData(tabType, date, authCodeList) {
    return axios.get(apiUrl() + "fin/getDailySalesData", {
      params : { 
        tabType : tabType,
        date : date,
        authCodeList : authCodeList
      }
    }).then(x => x.data)
  },
  getCumulativeSales(tabType, code, date) {
    return axios.get(apiUrl() + "fin/getCumulativeSales", {
      params : { 
        tabType : tabType,
        code : code,
        date : date
      }
    }).then(x => x.data)
  },
  getPerformanceList(tabType, code, date) {
    return axios.get(apiUrl() + "fin/getPerformanceList", {
      params : { 
        tabType : tabType,
        code : code,
        date : date
      }
    }).then(x => x.data)
  }
}
