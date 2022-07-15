import axios from ".";
import md5Hex from "md5-hex";

export const loginByTel = async (tel: string, password: string) => {
    const res = await axios.requestGet<API.Login>(
        `/login/cellphone?phone=${tel}&md5_password=${md5Hex(password)}`
    );
    return res;
};

export const loginByEmail = async (email: string, password: string) => {
    const res = await axios.post<null, API.Login>(`/login`, {
        email: email,
        md5_password: md5Hex(password),
    });
    return res;
};
