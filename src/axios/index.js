import axios from 'axios'
//创建axios实例
const service = axios.create({})
service.interceptors.request.use(config => {
  let apiPrefix = config.url;
  //阿里云服务接口
  if (apiPrefix === '/login' || apiPrefix === '/register') {
    if (process.env.NODE_ENV === 'development') {
      config.baseURL = `${window.location.origin}/aliApi`
      //线上  
    } else if (process.env.NODE_ENV === 'production') {
      config.baseURL = "http://47.96.122.250:3001"
    }
    //pimcore 接口
  } else if (apiPrefix.indexOf('/webservice/rest') !== -1 || apiPrefix.indexOf('/users') !== -1) {
    if (process.env.NODE_ENV === 'development') {
      config.baseURL = `${window.location.origin}`
      //线上  
    } else if (process.env.NODE_ENV === 'production') {
      config.baseURL = "https://pimcore.idvxlab.com:7000"
    }
  }
  //console.log("process.env.NODE_ENV...",process.env.NODE_ENV)
  //console.log("config.baseURL...",config.baseURL)
  return config;
}, error => {
  return Promise.reject(error)
})

export default service