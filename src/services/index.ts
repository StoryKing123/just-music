import Axios from "axios";

const axios = Axios.create({
    baseURL: "https://fs-netease-cloud-music-api.vercel.app/",
});

export default axios;
