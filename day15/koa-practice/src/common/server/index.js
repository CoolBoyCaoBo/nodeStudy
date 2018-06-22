/*
 * @Author: CoolBoy_CaoBo 
 * @Date: 2018-03-15 13:00:58 
 * @Last Modified by: CoolBoy_CaoBo
 * @Last Modified time: 2018-06-22 12:59:33
 */
import axios from "axios";
import router from "../../router";

const reqUrl = process.env.NODE_ENV === 'development' ? '/api' : 'www.baidu.com';
// 创建一个axios的对象
// application/x-www-form-urlencoded;charset=utf-8
const Axios = axios.create({
    baseURL: reqUrl,
    method: 'post',
    timeout: 15000,
    responseType: "json",
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    },
    iResType:0//0response需要拦截除200的状态，1拦截3001以外的状态,细分为0的类型一般是渲染数据类型接口，1为交互类型接口
});
// POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(
    config => {
      // 在发送请求之前做某件事
        // console.log(config);
        return config;
    },
    error => {
      return Promise.reject(error.data.error.message);
    }
);
//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
    res => {
        //对响应数据做些事
        if(res.data.code === 3001){
            console.log(router);
            router.push({
                path: "/login",
                query:{link_url:'100'}
            });
        }else if (res.data && !(res.data.code === 200) && res.config.iResType === 0){
            router.push({
                path: "/CommError",
                query:{errorMsg:res.data.message}
            });
            return Promise.reject(res);
        }
        return res;
    },
    error => {
        router.push({
            path: "/CommError",
            query:{errorMsg:'服务器访问异常，请稍候再试！'}
        });
        return Promise.reject(error);
    }
);

// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
    install: function (Vue, Option) {
        Object.defineProperty(Vue.prototype, "$http", { value: Axios });
    }
};