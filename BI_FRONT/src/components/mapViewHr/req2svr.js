import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getRegionData() {
    return axios.get(apiUrl() + "common/getRegionData").then(x => x.data)
  },
}
