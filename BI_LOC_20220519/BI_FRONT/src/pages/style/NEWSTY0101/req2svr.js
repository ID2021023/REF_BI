import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getMakeDataDate() {
    return axios.get(apiUrl() + "style/getMakeDataDate").then(x => x.data)
  },

  getClothData(styleCode, SUCD) {
    return axios.get(apiUrl() + "style/getClothData", {
      params : { 
        styleCode : styleCode,
        SUCD : SUCD
      }
    }).then(x => x.data)
  },

  getKindOfStyle(MAINSTYCD, SUCD) {
    return axios.get(apiUrl() + "style/getKindOfStyle", {
      params : { 
        MAINSTYCD : MAINSTYCD,
        SUCD : SUCD
      }
    }).then(x => x.data)
  },

  getAccClothSaleData(gubun_a, gubuns, foreign, selectStyle, STYCODE, SUCD, KINDOFSTYLE) {
    return axios.get(apiUrl() + "style/getAccClothSaleData", {
      params : { 
        gubun_a: gubun_a,
        gubuns: gubuns,
        foreign : foreign,
        selectStyle : selectStyle,
        STYCODE : STYCODE,
        SUCD : SUCD,
        KINDOFSTYLE : KINDOFSTYLE
      }
    }).then(x => x.data)
  },

  getInOutQty(selectStyle, STYCODE, SUCD, KINDOFSTYLE) {
    return axios.get(apiUrl() + "style/getInOutQty", {
      params : { 
        selectStyle : selectStyle,
        STYCODE : STYCODE,
        SUCD : SUCD,
        KINDOFSTYLE : KINDOFSTYLE
      }
    }).then(x => x.data)
  },

  getClothJRData(gubun_a, gubuns, foreign, selectStyle, STYCODE, SUCD, saleStartDate, saleEndDate, KINDOFSTYLE) {
    return axios.get(apiUrl() + "style/getClothJRData", {
      params : { 
        gubun_a: gubun_a,
        gubuns: gubuns,
        foreign : foreign,
        selectStyle : selectStyle,
        STYCODE : STYCODE,
        SUCD : SUCD,
        saleStartDate : saleStartDate,
        saleEndDate : saleEndDate,
        KINDOFSTYLE : KINDOFSTYLE
      }
    }).then(x => x.data)
  },

  getAccClothSaleRate(gubun_a, gubuns, foreign, selectStyle, STYCODE, SUCD, KINDOFSTYLE) {
    return axios.get(apiUrl() + "style/getAccClothSaleRate", {
      params : { 
        gubun_a: gubun_a,
        gubuns: gubuns,
        foreign : foreign,
        selectStyle : selectStyle,
        STYCODE : STYCODE,
        SUCD : SUCD,
        KINDOFSTYLE : KINDOFSTYLE
      }
    }).then(x => x.data)
  },

  getInOutDt(selectStyle, STYCODE, KINDOFSTYLE) {
    return axios.get(apiUrl() + "style/getInOutDt", {
      params : { 
        selectStyle : selectStyle,
        STYCODE : STYCODE,
        KINDOFSTYLE : KINDOFSTYLE
      }
    }).then(x => x.data)
  },

  getSqtyData(fromDate, toDate, gubun_a, gubuns, foreign, selectStyle, STYCODE, KINDOFSTYLE) {
    return axios.get(apiUrl() + "style/getSqtyData", {
      params : { 
        gubun_a: gubun_a,
        gubuns: gubuns,
        fromDate : fromDate,
        toDate : toDate,
        foreign : foreign,
        selectStyle : selectStyle,
        STYCODE : STYCODE,
        KINDOFSTYLE : KINDOFSTYLE
      }
    }).then(x => x.data)
  },
}
