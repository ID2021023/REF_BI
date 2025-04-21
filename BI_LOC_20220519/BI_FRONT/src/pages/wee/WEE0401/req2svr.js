import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  get0401MakeDataDate() {
    return axios.get(apiUrl() + "wee/get0401MakeDataDate").then(x => x.data)
  },

  getWeeklySale(selectSucd, 
    seasonStartYear, seasonStartMonth, 
    seasonEndYear, seasonEndMonth, 
    lastseasonStartYear, lastseasonStartMonth, 
    lastseasonEndYear, lastseasonEndMonth, 
    choiceDay, choiceBe1Day) {
    return axios.post(apiUrl() + "wee/getWeeklySale", {
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
        choiceDay : choiceDay,
        choiceBe1Day : choiceBe1Day
      }
    }).then(x => x.data)
  },

  getWeeklySSUM(selectSucd, 
    seasonStartYear, seasonStartMonth, 
    seasonEndYear, seasonEndMonth, 
    lastseasonStartYear, lastseasonStartMonth, 
    lastseasonEndYear, lastseasonEndMonth, 
    choiceDay, choiceBe1Day) {
    return axios.post(apiUrl() + "wee/getWeeklySSUM", {
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
        choiceDay : choiceDay,
        choiceBe1Day : choiceBe1Day
      }
    }).then(x => x.data)
  },

  getWeeklyTSUM(selectSucd, 
    seasonStartYear, seasonStartMonth, 
    seasonEndYear, seasonEndMonth, 
    lastseasonStartYear, lastseasonStartMonth, 
    lastseasonEndYear, lastseasonEndMonth, 
    choiceDay, choiceBe1Day) {
    return axios.post(apiUrl() + "wee/getWeeklyTSUM", {
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
        choiceDay : choiceDay,
        choiceBe1Day : choiceBe1Day
      }
    }).then(x => x.data)
  },

  getWeeklyGraph(selectSucd, 
    seasonStartYear, seasonStartMonth, 
    seasonEndYear, seasonEndMonth, 
    lastseasonStartYear, lastseasonStartMonth, 
    lastseasonEndYear, lastseasonEndMonth, 
    choiceDay, choiceBe1Day) {
    return axios.post(apiUrl() + "wee/getWeeklyGraph", {
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
        choiceDay : choiceDay,
        choiceBe1Day : choiceBe1Day
      }
    }).then(x => x.data)
  },
  
}
