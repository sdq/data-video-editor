 import axios from 'axios'

//创建axios实例
const service = axios.create({
  // baseURL:'https://pimcore.idvxlab.com:7000'
}
)
service.defaults.baseURL = `${window.location.origin}/webservice/rest`

export default service