import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getData(sql) {
    return axios.get(apiUrl(sql)).then(x => x.data)
  },
  getMakeDataDate() {
    return axios.get(apiUrl() + "crm/getMakeDataDate").then(x => x.data)
  },
  getSalesBest3(choice, date, year, tabType, selectedCODE) {
    return axios.get(apiUrl() + "crm/getSalesBest3", {
      params : { 
        choice : choice,
        date : date,
        year : year,
        tabType : tabType,
        selectedCODE : selectedCODE
      }
    }).then(x => x.data)
  },
  getDataByAge(choice, date, year, tabType, selectedCODE) {
    return axios.get(apiUrl() + "crm/getDataByAge", {
      params : { 
        choice : choice,
        date : date,
        year : year,
        tabType : tabType,
        selectedCODE : selectedCODE
      }
    }).then(x => x.data)
  },
  getItemDataByAge(choice, date, year, tabType, selectedCODE) {
    return axios.get(apiUrl() + "crm/getItemDataByAge", {
      params : { 
        choice : choice,
        date : date,
        year : year,
        tabType : tabType,
        selectedCODE : selectedCODE
      }
    }).then(x => x.data)
  },
  getNewCustomerCount(choice, date, year, tabType, selectedCODE) {
    return axios.get(apiUrl() + "crm/getNewCustomerCount", {
      params : { 
        choice : choice,
        date : date,
        year : year,
        tabType : tabType,
        selectedCODE : selectedCODE
      }
    }).then(x => x.data)
  },
  getNewCustomerCountByPeriod(choice, lastYearMonth, lastMonth, currentMonth, year, month, lastYear, tabType, selectedCODE) {
    return axios.get(apiUrl() + "crm/getNewCustomerCountByPeriod", {
      params : { 
        choice : choice,
        lastYearMonth : lastYearMonth,
        lastMonth : lastMonth,
        currentMonth : currentMonth,
        year : year,
        month : month,
        lastYear : lastYear,
        tabType : tabType,
        selectedCODE : selectedCODE
      }
    }).then(x => x.data)
  },
  getCurrentCustomerCount(choice, date, year, tabType, selectedCODE) {
    return axios.get(apiUrl() + "crm/getCurrentCustomerCount", {
      params : { 
        choice : choice,
        date : date,
        year : year,
        tabType : tabType,
        selectedCODE : selectedCODE
      }
    }).then(x => x.data)
  },
  getSumSalesForCurrentMonth(choice, date, year, tabType, selectedCODE) {
    return axios.get(apiUrl() + "crm/getSumSalesForCurrentMonth", {
      params : { 
        choice : choice,
        date : date,
        year : year,
        tabType : tabType,
        selectedCODE : selectedCODE
      }
    }).then(x => x.data)
  },
  getCustomerSalesDataByAge(choice, date, year, tabType, selectedCODE) {
    return axios.get(apiUrl() + "crm/getCustomerSalesDataByAge", {
      params : { 
        choice : choice,
        date : date,
        year : year,
        tabType : tabType,
        selectedCODE : selectedCODE
      }
    }).then(x => x.data)
  },
  getCurrentCustomerCountByPeriod(choice, lastYearMonth, lastMonth, currentMonth, year, month, lastYear, tabType, selectedCODE) {
    return axios.get(apiUrl() + "crm/getCurrentCustomerCountByPeriod", {
      params : { 
        choice : choice,
        lastYearMonth : lastYearMonth,
        lastMonth : lastMonth,
        currentMonth : currentMonth,
        year : year,
        month : month,
        lastYear : lastYear,
        tabType : tabType,
        selectedCODE : selectedCODE
      }
    }).then(x => x.data)
  },
  getDormancyCustomerCount(tabType, selectedCODE) {
    return axios.get(apiUrl() + "crm/getDormancyCustomerCount", {
      params : { 
        tabType : tabType,
        selectedCODE : selectedCODE
      }
    }).then(x => x.data)
  },
}
