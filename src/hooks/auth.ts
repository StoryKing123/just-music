import { toast } from "react-toastify";
import { loginByEmail, loginByTel } from "@/services/auth";
import userState from "@/store/user";
import { useRecoilState } from "recoil";
type loginType = {
    tel: { tel: string; password: string };
    email: { email: string; password: string };
};
// function useRef<T>(initialValue: T|null): RefObject<T>;
// interface loginFn<loginType>(type:any):any;
// type login = login<K extends keyof loginType>(
//     type: K,
//     val: loginType[K]
// ): API.Login
type Login = <K extends keyof loginType>(
    type: K,
    val: loginType[K]
) => API.Login;

// function login<K extends keyof loginType>(
//     type: K,
//     val: loginType[K]
// ): API.Login
export const useAuth: () => [Login, () => void] = () => {
    const [user, setUser] = useRecoilState(userState);
    const login: Login = <K extends keyof loginType>(
        type: K,
        val: loginType[K]
    ) => {
        const handleLoginRes = (res: API.Login) => {
            if (res.code === 200) {
                toast.success("登录成功");
                setUser({ ...user, user: res });
                localStorage.setItem("user", JSON.stringify(res));
            }
        };
        const loginFnObj: Record<keyof loginType, any> = {
            tel: async ({ tel, password }: loginType["tel"]) => {
                const res = await loginByTel(tel, password);
                handleLoginRes(res);
                return res;
            },
            email: async ({ email, password }: loginType["email"]) => {
                const res = await loginByEmail(email, password);
                handleLoginRes(res);
                return res;
            },
        };
        return loginFnObj[type](val);
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser({ ...user, user: undefined });
    };

    return [login, logout];
};

export const useInitAuth = () => {
    const [user, setUser] = useRecoilState(userState);
    const initAuth = () => {
        const userString = localStorage.getItem("user");
        if (userString === null) {
            return false;
        }
        const userObj = JSON.parse(userString);
        setUser({ ...user, user: userObj });
        return true;
    };
    return initAuth;
};
