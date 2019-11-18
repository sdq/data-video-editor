import Axios from 'axios'

const axios = Axios.create();
axios.defaults.baseURL = 'https://pimcore.idvxlab.com:7000'// 配置axios请求的地址
//axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'
// axios.defaults.crossDomain = true;
// axios.defaults.withCredentials = true; //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
//axios.defaults.headers.common['Authorization'] = ''; // 设置请求头为 Authorization

//配置发送请求前的拦截器
// axios.interceptors.request.use(config => {
//     console.log("config...",config)
//     return config;
// }, error => {
//     return Promise.reject(error);
// });
// // 配置响应拦截器
// axios.interceptors.response.use(res => {
//     return Promise.resolve(res);
// }, error => {
//     return Promise.reject(error);
// });
export default axios;