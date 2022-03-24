import { toast } from "react-toastify";
import { Login } from "@/declare";
import { loginByEmail, loginByTel } from "@/services/auth";
import userState from "@/store/user";
import { useRecoilState } from "recoil";
type loginType = {
    tel: { tel: string; password: string };
    email: { email: string; password: string };
};
// function useRef<T>(initialValue: T|null): RefObject<T>;
// interface loginFn<loginType>(type:any):any;
export const useAuth = () => {
    const [user, setUser] = useRecoilState(userState);
    function login<K extends keyof loginType>(
        type: K,
        val: loginType[K]
    ): Login {
        const handleLoginRes = (res: Login) => {
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
    }

    // login('tel',)
    const logout = () => {};
    // login<loginType>('tel');
    return [login, logout];
};
