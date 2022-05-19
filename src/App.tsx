import { useEffect, useMemo, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import PlayList from "./pages/playlist";
import Index from "./pages/index";
import NavBar from "./components/Navbar";
import Player from "./components/Player";
import { useInitAuth, useInitTheme, useTheme } from "./hooks";
import { useInitMusic } from "./hooks/music";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Artist from "./pages/artist";
import { useInitShortCut } from "./hooks/client";
import { isInTauri } from "./utils/tauri";
import Media from "./pages/media";

function App() {
    console.log("app render");
    const initTheme = useInitTheme();
    const initMusic = useInitMusic();
    const initAuth = useInitAuth();

    useInitShortCut();

    if (isInTauri()) {
        //     console.log("tauri");
        //     platform().then((res) => {
        //         console.log("platform");
        //         console.log(res);
        //     });
    }

    useEffect(() => {
        initTheme();
        initMusic();
        initAuth();
        // toast("Music!");
    }, []);

    const MemoNavBar = useMemo(() => NavBar, []);

    return (
        <div id="App" className="App  -z-50  relative bg-base text-base ">
            <ToastContainer />

            <div id="modal"></div>
            <Router>
                <MemoNavBar />
                <Routes>
                    <Route path="/" element={<Index></Index>}></Route>
                    <Route path="/index" element={<Index></Index>}></Route>
                    <Route
                        path="playlist/:id"
                        element={<PlayList></PlayList>}
                    ></Route>
                    <Route
                        path="artist/:id"
                        element={<Artist></Artist>}
                    ></Route>
                    <Route path="media" element={<Media></Media>}></Route>
                </Routes>
            </Router>
            <Player></Player>
        </div>
    );
}

export default App;
