import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  get0201MakeDataDate() {
    return axios.get(apiUrl() + "wee/get0201MakeDataDate").then(x => x.data)
  },

  getMaxCnt() {
    return axios.get(apiUrl() + "wee/getMaxCnt").then(x => x.data)
  },

  getSaleRate(selectSucd, 
    seasonStartYear, seasonStartMonth, 
    seasonEndYear, seasonEndMonth, 
    lastseasonStartYear, lastseasonStartMonth, 
    lastseasonEndYear, lastseasonEndMonth, 
    paramStartDate, paramEndDate) {
    return axios.post(apiUrl() + "wee/getSaleRate", {
      params : { 
        selectSucd : selectSucd,
        seasonStartYear : seasonStartYear,
        seasonStartMonth : seasonStartMonth,
        seasonEndYear : seasonEndYear,
        seasonEndMonth : seasonEndMonth,
        lastseasonStartYear : lastseasonStartYear, 
        lastseasonStartMonth : lastseasonStartMonth, 
        lastseasonEndYear : lastseasonEndYear, 
        lastseasonEndMonth : lastseasonEndMonth, 
        paramStartDate : paramStartDate,
        paramEndDate : paramEndDate
      }
    }).then(x => x.data)
  },

  getWeeklyBestSale(selectSucd, 
    seasonStartYear, seasonStartMonth, 
    seasonEndYear, seasonEndMonth, 
    lastseasonStartYear, lastseasonStartMonth, 
    lastseasonEndYear, lastseasonEndMonth, 
    paramStartDate, paramEndDate,
    paramBe1StartDate, paramBe1EndDate,
    paramBe2StartDate, paramBe2EndDate) {
    return axios.post(apiUrl() + "wee/getWeeklyBestSale", {
      params : { 
        selectSucd : selectSucd,
        seasonStartYear : seasonStartYear,
        seasonStartMonth : seasonStartMonth,
        seasonEndYear : seasonEndYear,
        seasonEndMonth : seasonEndMonth,
        lastseasonStartYear : lastseasonStartYear, 
        lastseasonStartMonth : lastseasonStartMonth, 
        lastseasonEndYear : lastseasonEndYear, 
        lastseasonEndMonth : lastseasonEndMonth, 
        paramStartDate : paramStartDate,
        paramEndDate : paramEndDate,
        paramBe1StartDate : paramBe1StartDate,
        paramBe1EndDate : paramBe1EndDate,
        paramBe2StartDate : paramBe2StartDate,
        paramBe2EndDate : paramBe2EndDate
      }
    }).then(x => x.data)
  },

  getMCount(selectSucd, 
    seasonStartYear, seasonStartMonth, 
    seasonEndYear, seasonEndMonth, 
    lastseasonStartYear, lastseasonStartMonth, 
    lastseasonEndYear, lastseasonEndMonth, 
    paramStartDate, paramEndDate) {
    return axios.post(apiUrl() + "wee/getMCount", {
      params : { 
        selectSucd : selectSucd,
        seasonStartYear : seasonStartYear,
        seasonStartMonth : seasonStartMonth,
        seasonEndYear : seasonEndYear,
        seasonEndMonth : seasonEndMonth,
        lastseasonStartYear : lastseasonStartYear, 
        lastseasonStartMonth : lastseasonStartMonth, 
        lastseasonEndYear : lastseasonEndYear, 
        lastseasonEndMonth : lastseasonEndMonth, 
        paramStartDate : paramStartDate,
        paramEndDate : paramEndDate
      }
    }).then(x => x.data)
  },

  getStyle20(selectSucd, 
    seasonStartYear, seasonStartMonth, 
    seasonEndYear, seasonEndMonth, 
    lastseasonStartYear, lastseasonStartMonth, 
    lastseasonEndYear, lastseasonEndMonth, 
    paramStartDate, paramEndDate) {
    return axios.post(apiUrl() + "wee/getStyle20", {
      params : { 
        selectSucd : selectSucd,
        seasonStartYear : seasonStartYear,
        seasonStartMonth : seasonStartMonth,
        seasonEndYear : seasonEndYear,
        seasonEndMonth : seasonEndMonth,
        lastseasonStartYear : lastseasonStartYear, 
        lastseasonStartMonth : lastseasonStartMonth, 
        lastseasonEndYear : lastseasonEndYear, 
        lastseasonEndMonth : lastseasonEndMonth, 
        paramStartDate : paramStartDate,
        paramEndDate : paramEndDate
      }
    }).then(x => x.data)
  },

  getStyle20VDSNM(mainStycd, selectSucd, 
    seasonStartYear, seasonStartMonth, 
    seasonEndYear, seasonEndMonth, 
    lastseasonStartYear, lastseasonStartMonth, 
    lastseasonEndYear, lastseasonEndMonth, 
    paramStartDate, paramEndDate) {
    return axios.post(apiUrl() + "wee/getStyle20VDSNM", {
      params : { 
        mainStycd: mainStycd,
        selectSucd : selectSucd,
        seasonStartYear : seasonStartYear,
        seasonStartMonth : seasonStartMonth,
        seasonEndYear : seasonEndYear,
        seasonEndMonth : seasonEndMonth,
        lastseasonStartYear : lastseasonStartYear, 
        lastseasonStartMonth : lastseasonStartMonth, 
        lastseasonEndYear : lastseasonEndYear, 
        lastseasonEndMonth : lastseasonEndMonth, 
        paramStartDate : paramStartDate,
        paramEndDate : paramEndDate
      }
    }).then(x => x.data)
  },

  getStyle20COLOR(mainStycd, selectSucd, 
    seasonStartYear, seasonStartMonth, 
    seasonEndYear, seasonEndMonth, 
    lastseasonStartYear, lastseasonStartMonth, 
    lastseasonEndYear, lastseasonEndMonth, 
    paramStartDate, paramEndDate) {
    return axios.post(apiUrl() + "wee/getStyle20COLOR", {
      params : { 
        mainStycd: mainStycd,
        selectSucd : selectSucd,
        seasonStartYear : seasonStartYear,
        seasonStartMonth : seasonStartMonth,
        seasonEndYear : seasonEndYear,
        seasonEndMonth : seasonEndMonth,
        lastseasonStartYear : lastseasonStartYear, 
        lastseasonStartMonth : lastseasonStartMonth, 
        lastseasonEndYear : lastseasonEndYear, 
        lastseasonEndMonth : lastseasonEndMonth, 
        paramStartDate : paramStartDate,
        paramEndDate : paramEndDate
      }
    }).then(x => x.data)
  },
}
