import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authToken: null, // 인증용 key
    empCd: null, // 인증용 사번
    authGbnCd: [], // 메뉴권한
    authProCd: [], // 화면권한
    authSUCDCode: [], // 사업부 권한
    authBRCDCode: [], // 브랜드 권한
    yearCode: [],
    monthCode: [
      {CODE:"1", M:"1"},
      {CODE:"2", M:"2"},
      {CODE:"3", M:"3"},
      {CODE:"4", M:"4"},
      {CODE:"5", M:"5"},
      {CODE:"6", M:"6"},
      {CODE:"7", M:"7"},
      {CODE:"8", M:"8"},
      {CODE:"9", M:"9"},
      {CODE:"A", M:"10"},
      {CODE:"B", M:"11"},
      {CODE:"C", M:"12"}
    ],
    SUCDCardList: [],
    SUCDList: [], // CODE, CODNM
    BRCDCardList: [],
    BRCDList: [],  // CODE, CODNM
    FDRList: [],  // CODE, CODNM
    FINList: [],  // CODE, CODNM
    SALList: [],  // CODE, CODNM
    WRPList: [],  // CODE, CODNM
    STYList: [],  // CODE, CODNM
    STOList: [],  // CODE, CODNM
    CRMList: [],  // CODE, CODNM
    PROList: [],  // CODE, CODNM
    BUYList: [],  // CODE, CODNM
    HUMList: [],  // CODE, CODNM
    SDCOMPANYCDList: [], // CODE, CODNM
    SECOMPANYCDList: [], // CODE, CODNM
    JAEJIGCDList: [], // CODE, CODNM
    CHGUCDList: [], // CODE, CODNM
    AMTRATINGCDList: [], // CODE, CODNM,
    FasionSUCDList:[],
    FutureSUCDList:[],
    StopSUCDList:[],
    FasionBRCDList:[],
    FutureBRCDList:[],
    StopBRCDList:[]
  },
  getters: {
    getYearCodeToYear: (state) => (code) => {
      if (state.yearCode.length <= 0) {
        return ""
      }
      return state.yearCode.find(yearCode => yearCode.CODE === String(code)).YYYY
    },
    getYearCode: (state) => (year) => {
      if (state.yearCode.length <= 0) {
        return ""
      }
      return state.yearCode.find(yearCode => yearCode.YYYY === String(year)).CODE
    },
    getYearCodeList: (state) => {
      return state.yearCode
    },
    getMonthCode: (state) => (month) => {
      return state.monthCode.find(monthCode => monthCode.M === String(month)).CODE
    },
    getMonthCodeToMonth: (state) => (code) => {
      return state.monthCode.find(monthCode => monthCode.CODE === String(code)).M
    },
    getMonthCodeList: (state) => {
      return state.monthCode
    },
    getSUCDCardList: state => {
      return state.SUCDCardList
    },
    getSUCDList: state => {
      return state.SUCDList
    },
    getBRCDList: state => {
      return state.BRCDList
    },
    getBRCDCardList: state => {
      return state.BRCDCardList
    },
    getFasionSUCDList: state => {
      return state.FasionSUCDList
    },
    getFutureSUCDList: state => {
      return state.FutureSUCDList
    },
    getStopSUCDList: state => {
      return state.StopSUCDList
    },
    getFasionBRCDList: state => {
      return state.FasionBRCDList
    },
    getFutureBRCDList: state => {
      return state.FutureBRCDList
    },
    getStopBRCDList: state => {
      return state.StopBRCDList
    },
    getSUCDCODNM: (state) => (code) => {
      return state.SUCDList.find(SUCDList => SUCDList.CODE === String(code)).CODNM
    },
    getBRCDCODNM: (state) => (code) => {
      return state.BRCDList.find(BRCDList => BRCDList.CODE === String(code)).CODNM
    },
    getCHGUCDCODNM: (state) => (code) => {
      return state.CHGUCDList.find(CHGUCDList => CHGUCDList.CODE === String(code)).CODNM
    },
    getAuthToken: state => {
      return state.authToken
    },
    getEmpCd: state => {
      return state.empCd
    },
    getAuthGbnCd: state => {
      return state.authGbnCd
    },
    getAuthProCd: state => {
      return state.authProCd
    },
    getAuthSUCDCode: state => {
      return state.authSUCDCode
    },
    getAuthBRCDCode: state => {
      return state.authBRCDCode
    },
    getFDRList: state => {
      return state.FDRList
    },
    getFINList: state => {
      return state.FINList
    },
    getSALList: state => {
      return state.SALList
    },
    getWRPList: state => {
      return state.WRPList
    },
    getSTYList: state => {
      return state.STYList
    },
    getSTOList: state => {
      return state.STOList
    },
    getCRMList: state => {
      return state.CRMList
    },
    getPROList: state => {
      return state.PROList
    },
    getBUYList: state => {
      return state.BUYList
    },
    getHUMList: state => {
      return state.HUMList
    },
    getSDCOMPANYCDList: state => {
      return state.SDCOMPANYCDList
    },
    getSECOMPANYCDList: state => {
      return state.SECOMPANYCDList
    },
    getJAEJIGCDList: state => {
      return state.JAEJIGCDList
    },
    getCHGUCDList: state => {
      return state.CHGUCDList
    },
    getAMTRATINGCDList: state => {
      return state.AMTRATINGCDList
    }
  },
  mutations: {
    setFDRList(state, list) {
      state.FDRList = list
    },
    setFINList(state, list) {
      state.FINList = list
    },
    setSALList(state, list) {
      state.SALList = list
    },
    setWRPList(state, list) {
      state.WRPList = list
    },
    setSTYList(state, list) {
      state.STYList = list
    },
    setSTOList(state, list) {
      state.STOList = list
    },
    setCRMList(state, list) {
      state.CRMList = list
    },
    setPROList(state, list) {
      state.PROList = list
    },
    setBUYList(state, list) {
      state.BUYList = list
    },
    setHUMList(state, list) {
      state.HUMList = list
    },
    setSDCOMPANYCDList(state, list) {
      state.SDCOMPANYCDList = list
    },
    setSECOMPANYCDList(state, list) {
      state.SECOMPANYCDList = list
    },
    setJAEJIGCDList(state, list) {
      state.JAEJIGCDList = list
    },
    setCHGUCDList(state, list) {
      state.CHGUCDList = list
    },
    setAMTRATINGCDList(state, list) {
      state.AMTRATINGCDList = list
    },
    setSUCDCardList(state, list) {
      state.SUCDCardList = list
    },
    setSUCDList(state, list) {
      state.SUCDList = list
    },
    setBRCDCardList(state, list) {
      state.BRCDCardList = list
    },
    setBRCDList(state, list) {
      state.BRCDList = list
    },
    setFasionSUCDList(state, list){
      state.FasionSUCDList = list
    },
    setFutureSUCDList(state, list){
      state.FutureSUCDList = list
    },
    setStopSUCDList(state, list){
      state.StopSUCDList = list
    },
    setFasionBRCDList(state, list){
      state.FasionBRCDList = list
    },
    setFutureBRCDList(state, list){
      state.FutureBRCDList = list
    },
    setStopBRCDList(state, list){
      state.StopBRCDList = list
    },
    setYearCode(state, list) {
      state.yearCode = list
    },
    setAuthToken(state, authToken) {
      state.authToken = authToken
    },
    setEmpCd(state, empCd) {
      state.empCd = empCd
    },
    setAuthGbnCd(state, authGbnCd) {
      state.authGbnCd = authGbnCd
    },
    setAuthProCd(state, authProCd) {
      state.authProCd = authProCd
    },
    setAuthSUCDCode(state, authSUCDCode) {
      state.authSUCDCode = authSUCDCode
    },
    setAuthBRCDCode(state, authBRCDCode) {
      state.authBRCDCode = authBRCDCode
    }
  },
  actions: {
  }
})
