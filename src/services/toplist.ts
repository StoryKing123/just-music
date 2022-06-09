import axios from ".";

export const getToplist = async () => {
    return await axios.requestGet<API.Toplists>("/toplist");
};
