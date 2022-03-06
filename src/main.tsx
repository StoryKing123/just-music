import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            {/* <BrowserRouter> */}
            <App />
        </RecoilRoot>
        {/* </BrowserRouter> */}
    </React.StrictMode>,
    document.getElementById("root")
);
