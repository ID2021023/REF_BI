import axios from 'axios'
import apiUrl from '@/config/apiUrl'

export default {
  getData(sql) {
    return axios.get(apiUrl(sql)).then(x => x.data)
  },
}
