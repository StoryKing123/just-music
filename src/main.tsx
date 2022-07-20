import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import App from "./App";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import "mac-scrollbar/dist/mac-scrollbar.css";
import { GlobalScrollbar } from "mac-scrollbar";

ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <GlobalScrollbar />
            {/* <BrowserRouter> */}
            <App />
        </RecoilRoot>
        {/* </BrowserRouter> */}
    </React.StrictMode>,
    document.getElementById("root")
);
