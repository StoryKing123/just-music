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

window.onerror = () => {
    console.log("err");
};

function App() {
    console.log("app render");
    const initTheme = useInitTheme();
    const initMusic = useInitMusic();
    const initAuth = useInitAuth();

    useEffect(() => {
        initTheme();
        initMusic();
        initAuth();
        toast("Music!");
    }, []);

    const memoNavBar = useMemo(() => <NavBar></NavBar>, []);

    return (
        <div id="App" className="App  -z-50  relative bg-base text-base ">
            <ToastContainer />
            <div id="modal"></div>
            <Router>
                {memoNavBar}
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
                </Routes>
            </Router>
            <Player></Player>
        </div>
    );
}

export default App;
