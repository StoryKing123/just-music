// import { Login } from "@/declare";
import Axios, { AxiosInstance } from "axios";

const generateReqKey = (config: {
    method: string;
    url: string;
    data: any;
    params: any;
}) => {
    const { method, url, params, data } = config;
    return [method, url.split("?")[0]].join("&");
    // return [method, url].join("&");
    // return [method, url, JSON.stringify(params), JSON.stringify(data)].join(
    //     "&"
    // );
};
const pendingRequest = new Map();
const addPendingRequest = (config: any) => {
    const requestKey = generateReqKey(config);
    config.cancelToken =
        config.cancelToken ||
        new Axios.CancelToken((cancel) => {
            if (!pendingRequest.has(requestKey)) {
                pendingRequest.set(requestKey, cancel);
            }
        });
};

const removePendingRequest = (config: any) => {
    const requestKey = generateReqKey(config);
    if (pendingRequest.has(requestKey)) {
        console.log("cancel token:" + requestKey);
        const cancelToken = pendingRequest.get(requestKey);
        cancelToken(requestKey);
        pendingRequest.delete(requestKey);
    }
};

const axios = Axios.create({
    baseURL: "https://fs-netease-cloud-music-api.vercel.app/",
    // withCredentials: true,
    // headers: {
    // },
}) as AxiosInstance & {
    requestGet: <T>(...args: Parameters<typeof axios.get>) => Promise<T>;
};
axios.interceptors.request.use(
    (config) => {
        // removePendingRequest(config); // 检查是否存在重复请求，若存在则取消已发的请求
        // addPendingRequest(config); // 把当前请求信息添加到pendingRequest对象中
        config.params = {
            ...config.params,
            realIP: window.returnCitySN.cip ?? undefined,
        };
        localStorage.getItem("user") &&
            (config.params = {
                ...config.params,
                cookie: (JSON.parse(localStorage.getItem("user")!) as API.Login)
                    .cookie,
            });
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);
axios.interceptors.response.use(
    (res) => {
        // removePendingRequest(res.config); // 从pendingRequest对象中移除请求
        if (res.status === 200) {
            return Promise.resolve(res.data);
        }
    },
    (err) => {
        console.log(err.response.data);
        // removePendingRequest(err.config || {}); // 从pendingRequest对象中移除请求
        if (Axios.isCancel(err)) {
            console.log("已取消的重复请求：" + err.message);
        } else {
            // 添加异常处理
        }
        return Promise.resolve(err.response.data);
    }
);
axios.requestGet = <T>(...args: Parameters<typeof axios.get>) => {
    return axios.get<null, T>(...args);
};

export default axios;

export const qqAxios = Axios.create({
    baseURL: "https://qq-music-api-storyking123.vercel.app/",
}) as AxiosInstance & {
    requestGet: <T>(...args: Parameters<typeof axios.get>) => Promise<T>;
};

qqAxios.requestGet = <T>(...args: Parameters<typeof qqAxios.get>) => {
    return qqAxios.get<null, T>(...args);
};

qqAxios.interceptors.response.use(
    (res) => {
        // removePendingRequest(res.config); // 从pendingRequest对象中移除请求
        if (res.status === 200) {
            return Promise.resolve(res.data.response);
        }
    },
    (err) => {
        console.log(err.response.data);
        // removePendingRequest(err.config || {}); // 从pendingRequest对象中移除请求
        if (Axios.isCancel(err)) {
            console.log("已取消的重复请求：" + err.message);
        } else {
            // 添加异常处理
        }
        return Promise.resolve(err.response.data);
    }
);
