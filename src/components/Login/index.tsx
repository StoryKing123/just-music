import { createNamespace } from "@/utils";
import { FC } from "react";
import Button from "../Button";
import "./index.less";

type LoginProps = {
    isShow: boolean;
    onClose: Function;
};
const Login: FC<LoginProps> = (props) => {
    const [name, bem] = createNamespace("login");
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
        <div style={style} className={`w-full h-full fixed  bg-base ${name} overflow-hidden`}>
            <div onClick={() => props.onClose()}  className="absolute left-0">back</div>
            {/* <div></div> */}
            <div>login</div>
            <div>
                <div>
                    {" "}
                    <input type="text" />{" "}
                </div>
                <div>
                    {" "}
                    <input type="text" />
                </div>
            </div>
            <div>
                <Button>登录</Button>
            </div>
        </div>
    );
};
export default Login;
