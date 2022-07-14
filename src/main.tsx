import "./index.less";
import App from "./App";
import { RecoilRoot } from "recoil";
import "mac-scrollbar/dist/mac-scrollbar.css";
import { GlobalScrollbar } from "mac-scrollbar";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);
root.render(
    <StrictMode>
        <RecoilRoot>
            <GlobalScrollbar />
            <App />
        </RecoilRoot>
    </StrictMode>
);