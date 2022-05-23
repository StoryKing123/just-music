import axios from ".";
import originAxios from "axios";
// import md5 from "md5";
import md5Hex from "md5-hex";

export const loginByTel = async (tel: string, password: string) => {
    console.log(password);

    const res = await axios.post<null, API.Login>(`/login/cellphone`, {
        phone: tel,
        // password: password,
        md5_password: md5Hex(password),
    });
    return res;
};

export const loginByEmail = async (email: string, password: string) => {
    const res = await axios.post<null, API.Login>(`/login`, {
        email: email,
        md5_password: md5Hex(password),
    });
    return res;
};
