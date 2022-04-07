import axios from ".";

export const loginByTel = async (tel: string, password: string) => {
    const res = await axios.post<null, API.Login>(
        `/login/cellphone?phone=${tel}&password=${password}`
    );
    return res;
};

export const loginByEmail = async (email: string, password: string) => {
    const res = await axios.post<null, API.Login>(
        `/login?email=${email}&password=${password}`
    );
    return res;
};
