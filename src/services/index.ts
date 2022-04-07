// import { Login } from "@/declare";
import Axios from "axios";

const axios = Axios.create({
    baseURL: "https://fs-netease-cloud-music-api.vercel.app/",
    // withCredentials: true,
    headers: {
        // cookie: "_ntes_nuid=6352786f13f7aafa101c266028345531; _ntes_nnid=96c000c18785f909a53fa3a0997af86b,1632911476662; _ns=NS1.2.389073158.1632911507; _iuqxldmzr_=32; NMTID=00Oln42z3dCcbiwwUQxtUIrwqJD8OsAAAF8-Qb1Lg; WEVNSM=1.0.0; WNMCID=axqpdt.1636265555589.01.0; WM_TID=exuqFl/BO9NAVFRFEEMvpe6XAHmrl/KQ; playerid=48790041; __snaker__id=Qiux05KKAStoegjO; gdxidpyhxdE=bzhPOWOag9uTJLtlLCHQLZB1REqgyo9R+xzi4wsSoP92rpD3KNvHzqr2QTSNPH30fvTNHVCevE/TlbPt9511M/g/IcBiQW/zkjX/YLm8m05+1HLJQ1AVOLzEut70j7L351Rzgsg0cv5i/ebWLwGdPKGgLdlt+874mKRBzuhqbvEiy/:1641614805496; _9755xjdesxxd_=32; ntes_kaola_ad=1; timing_user_id=time_14pWzAyGRA; _ntes_newsapp_install=false; JSESSIONID-WYYY=xtbTGIAuf+S/e7d+Pwk2XK7uir7W3TVy7apnIFXpvMKJDN/rgMh5yHyebhBrA52X4pjYx1/uHEx4HrpTTobb58gusmljQCGX3FonuaFdZrhlszDQsn1UwqW9EyAmuqCToA1RZF0FhM1/Q9NOp4YEtrdNgPOk5BGsH34OlYzyUOEKXQ3:1646663302582; WM_NI=S7HH6DcZ5i9XgTuBFMQUm6gErcM5eMC82SxEVvOpParDK//xH+HY+BI9hypn+qp3Eb+oSQNRgE8agSXjtTjdWTh0ZOsd69/HR/bf8yzNHTtXzZCmO9rjd8RQFtvGPb2NeDY=; WM_NIKE=9ca17ae2e6ffcda170e2e6eedaf844f8b284b2c445828e8fb7c85b939b9bbbaa25aab9008fe44991938282e62af0fea7c3b92a91e988a9b550a186fb8abc54a58cbba3c547938ba3d7e64fb2bd83d6e84781e8feb4fb4f96aa8191d36bb29c85d0ae748cf588baaa4a8be7a89af366e9afc0d4c86ae9b19db2cd5aa59bf882e6599cb6bcb5e970958ca8d1d945b1bcfadaae4492f1ae87bb73ba9288b5f754ba868d8ece33b2b6acd9d15b86acbaa8d36af292aba5dc37e2a3",
        // cookie: "",
    },
});
axios.interceptors.request.use(
    (config) => {
        config.params = {
            ...config.params,
            realIP: `116.25.146.177`,
            // cookie: "MUSIC_R_T=1449922696092; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 18:17:15 GMT; Path=/api/feedback;;MUSIC_R_T=1449922696092; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 18:17:15 GMT; Path=/eapi/clientlog;;MUSIC_A_T=1449922696089; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 18:17:15 GMT; Path=/api/feedback;;__csrf=0ba9b5fe8bf8e06904eff362be1bd285; Max-Age=1296010; Expires=Wed, 23 Mar 2022 15:03:18 GMT; Path=/;;MUSIC_R_T=1449922696092; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 18:17:15 GMT; Path=/eapi/feedback;;MUSIC_R_T=1449922696092; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 18:17:15 GMT; Path=/neapi/clientlog;;MUSIC_A_T=1449922696089; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 18:17:15 GMT; Path=/wapi/feedback;;MUSIC_A_T=1449922696089; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 18:17:15 GMT; Path=/openapi/clientlog;;MUSIC_A_T=1449922696089; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 18:17:15 GMT; Path=/eapi/feedback;;MUSIC_U=3e07151e1dbab21c4a03ac1cb2aec3f8f478f4749530e1c75eb677660346bb1b519e07624a9f0053d78b6050a17a35e705925a4e6992f61d07c385928f88e8de; Max-Age=1296000; Expires=Wed, 23 Mar 2022 15:03:08 GMT; Path=/;;MUSIC_A_T=1449922696089; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 18:17:15 GMT; Path=/weapi/feedback;;MUSIC_A_T=1449922696089; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 18:17:15 GMT; Path=/api/clientlog;;MUSIC_A_T=1449922696089; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 18:17:15 GMT; Path=/weapi/clientlog;;MUSIC_R_T=1449922696092; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 18:17:15 GMT; Path=/api/clientlog;;MUSIC_A_T=1449922696089; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 18:17:15 GMT; Path=/neapi/clientlog;;MUSIC_R_T=1449922696092; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 18:17:15 GMT; Path=/weapi/feedback;;__remember_me=true; Max-Age=1296000; Expires=Wed, 23 Mar 2022 15:03:08 GMT; Path=/;;MUSIC_A_T=1449922696089; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 18:17:15 GMT; Path=/neapi/feedback;;MUSIC_R_T=1449922696092; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 18:17:15 GMT; Path=/openapi/clientlog;;MUSIC_A_T=1449922696089; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 18:17:15 GMT; Path=/wapi/clientlog;;MUSIC_R_T=1449922696092; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 18:17:15 GMT; Path=/neapi/feedback;;MUSIC_R_T=1449922696092; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 18:17:15 GMT; Path=/wapi/feedback;;MUSIC_R_T=1449922696092; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 18:17:15 GMT; Path=/wapi/clientlog;;MUSIC_SNS=; Max-Age=0; Expires=Tue, 8 Mar 2022 15:03:08 GMT; Path=/;MUSIC_R_T=1449922696092; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 18:17:15 GMT; Path=/weapi/clientlog;;MUSIC_A_T=1449922696089; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 18:17:15 GMT; Path=/eapi/clientlog;",
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
        if (res.status === 200) {
            return Promise.resolve(res.data);
        }
    },
    (err) => {}
);

export default axios;
