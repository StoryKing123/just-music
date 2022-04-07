import { useAuth } from "@/hooks/auth";
import { loginByTel } from "@/services/auth";
import { createNamespace } from "@/utils";
import { FC, useRef } from "react";
import Button from "../Button";
import "./index.less";

type LoginProps = {
    isShow: boolean;
    onClose: Function;
};
const Login: FC<LoginProps> = (props) => {
    const [name, bem] = createNamespace("login");
    const telInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const [login] = useAuth();
    const handleLogin = async () => {
        if (!(passwordInputRef.current && telInputRef.current)) {
            return;
        }
        // loginByTel(telInputRef.current.value, passwordInputRef.current.value);
        const res = (await login("tel", {
            tel: telInputRef.current.value,
            password: passwordInputRef.current.value,
        })) as API.Login;
        console.log(res);
        if (res.code === 200) {
            props.onClose();
        }
        // return console.log();
    };
    const style = props.isShow
        ? {
              height: "100vh",
              width: "100vw",
              top: "0px",
              left: "0px",
          }
        : {
              height: "0px",
              width: "0px",
              top: "50vh",
              left: "50vw",
          };
    return (
        <div
            style={style}
            className={`w-full h-full fixed  bg-base ${name} overflow-hidden`}
        >
            <div onClick={() => props.onClose()} className="absolute left-0">
                back
            </div>
            {/* <div></div> */}
            <div>login</div>
            <div>
                <div>
                    <div>tel</div>
                    <div>
                        <input
                            type="text"
                            ref={telInputRef}
                            className=" bg-base border-b-2"
                        />{" "}
                    </div>
                </div>
                <div>
                    <div>password</div>
                    <div>
                        <input
                            type="password"
                            ref={passwordInputRef}
                            className=" bg-base border-b-2"
                        />{" "}
                    </div>
                </div>
            </div>
            <div>
                <Button className=" w-60  mt-10" onClick={handleLogin}>
                    登录
                </Button>
            </div>
        </div>
    );
};
export default Login;
