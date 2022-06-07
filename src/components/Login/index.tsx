import { useEventListener } from "@/hooks";
import { useAuth } from "@/hooks/auth";
import { loginByTel } from "@/services/auth";
import { createNamespace } from "@/utils";
import { FC, useRef } from "react";
import { useLocation } from "react-router";
import { toast } from "react-toastify";
import Button from "../Button";
import "./index.less";

type LoginProps = {
    isShow: boolean;
    onClose: Function;
};
const Login: FC<LoginProps> = (props) => {
    const [name, bem] = createNamespace("login");
    const telOrEmailRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const [login] = useAuth();
    useEventListener("keyup", (e) => {
        // console.log(e);
        if (e.key === "Enter") {
            handleLogin();
        }
    });

    const handleLogin = async () => {
        if (!(passwordInputRef.current && telOrEmailRef.current)) {
            return;
        }
        const emailReg =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const telReg =
            /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;
        const res = await login(
            telReg.test(telOrEmailRef.current.value) ? "tel" : "email",
            {
                tel: telOrEmailRef.current.value,
                email: telOrEmailRef.current.value,
                password: passwordInputRef.current.value,
            }
        );

        if (res && res.code === 200) {
            toast.success("登录成功");
            props.onClose();
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } else {
            toast.error(res.msg);
        }
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
            <Button
                onClick={() => props.onClose()}
                className="m-2 absolute left-0"
            >
                返回
            </Button>
            <div className="mt-10">登录</div>
            <div className="mt-10">
                <div>
                    <div>手机号码/邮箱</div>
                    <div>
                        <input
                            type="text"
                            ref={telOrEmailRef}
                            className=" bg-base border-b-2"
                        />{" "}
                    </div>
                </div>
                <div>
                    <div>密码</div>
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
