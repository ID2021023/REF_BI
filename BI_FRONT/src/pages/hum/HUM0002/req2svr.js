import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getCHGUCOMList(selectedCOMPANYCD) {
    return axios.get(apiUrl() + "hum/getCHGUCOMList", {
      params : { 
        selectedCOMPANYCD : selectedCOMPANYCD
      }
    }).then(x => x.data)
  },
  getBrandCodeList(selectedCOMPANYCD) {
    return axios.get(apiUrl() + "hum/getBrandCodeList", {
      params : { 
        selectedCOMPANYCD : selectedCOMPANYCD
      }
    }).then(x => x.data)
  },
  getSiList(selectedCOMPANYCD) {
    return axios.get(apiUrl() + "hum/getSiList", {
      params : { 
        selectedCOMPANYCD : selectedCOMPANYCD
      }
    }).then(x => x.data)
  },
  getGuList(selectedCOMPANYCD, selectedSi) {
    return axios.get(apiUrl() + "hum/getGuList", {
      params : { 
        selectedCOMPANYCD : selectedCOMPANYCD,
        selectedSi : selectedSi
      }
    }).then(x => x.data)
  },
  searchSD(selectedCOMPANYCD, searchName) {
    return axios.get(apiUrl() + "hum/searchSD", {
      params : { 
        selectedCOMPANYCD : selectedCOMPANYCD,
        searchName : searchName
      }
    }).then(x => x.data)
  },
  getSDList(selectedCOMPANYCD, selectedSi, selectedGu, selectedBrand, selectedAmtRating, selectedAllAmtRating,
     initAllAmtRating, selectedCHGU, selectedAllCHGU, initAllCHGU, selectedCHGUCOM, selectedAllCHGUCOM, initAllCHGUCOM) {
    return axios.get(apiUrl() + "hum/getSDList", {
      params : { 
        selectedCOMPANYCD : selectedCOMPANYCD,
        selectedSi : selectedSi,
        selectedGu : selectedGu,
        selectedBrand : selectedBrand,
        selectedAmtRating : selectedAmtRating,
        selectedAllAmtRating : selectedAllAmtRating,
        initAllAmtRating : initAllAmtRating,
        selectedCHGU : selectedCHGU,
        selectedAllCHGU : selectedAllCHGU,
        initAllCHGU : initAllCHGU,
        selectedCHGUCOM : selectedCHGUCOM,
        selectedAllCHGUCOM : selectedAllCHGUCOM,
        initAllCHGUCOM : initAllCHGUCOM
      }
    }).then(x => x.data)
  }
}
