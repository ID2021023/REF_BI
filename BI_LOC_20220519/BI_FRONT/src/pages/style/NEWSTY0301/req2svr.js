import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getData(sql) {
    return axios.get(apiUrl(sql)).then(x => x.data)
  },
  getStoreKind(changeSucd, sucd, cloneSucd) {
    return axios.get(apiUrl() + "style/getStoreKind", {
      params : { 
        changeSucd : changeSucd,
        sucd : sucd,
        cloneSucd : cloneSucd
      }
    }).then(x => x.data)
  },
  getstoreList(changeSucd, sucd, cloneSucd, changeStore) {
    return axios.get(apiUrl() + "style/getstoreList", {
      params : { 
        changeSucd : changeSucd,
        sucd : sucd,
        cloneSucd : cloneSucd,
        changeStore : changeStore
      }
    }).then(x => x.data)
  },
  getClothCodeList(sucd) {
    return axios.get(apiUrl() + "style/getClothCodeList").then(x => x.data)
  },
  getFabricsCodeList() {
    return axios.get(apiUrl() + "style/getFabricsCodeList").then(x => x.data)
  },
  getColorsCodeList() {
    return axios.get(apiUrl() + "style/getColorsCodeList").then(x => x.data)
  },
}
