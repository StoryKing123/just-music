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
import Media from "./pages/media";
import Explore from "./pages/explore";
import DailyRecommend from "./pages/dailyRecommend";
import Detail from "./components/Detail";
import Search from "./pages/search";
import Album from "./pages/album";

function App() {
    const initTheme = useInitTheme();
    const initMusic = useInitMusic();
    const initAuth = useInitAuth();

    useInitShortCut();

    useEffect(() => {
        initTheme();
        initMusic();
        initAuth();
    }, []);

    const MemoNavBar = useMemo(() => NavBar, []);

    return (
        <div id="App" className="App  -z-50 pt-20  relative bg-base text-base ">
            <ToastContainer />
            <div id="modal"></div>
            <Router>
                <MemoNavBar />
                <Routes>
                    <Route path="/" element={<Index></Index>}></Route>
                    <Route path="/index" element={<Index></Index>}></Route>
                    <Route
                        path="/recommend"
                        element={<DailyRecommend></DailyRecommend>}
                    ></Route>
                    <Route
                        path="/explore"
                        element={<Explore></Explore>}
                    ></Route>
                    <Route
                        path="playlist/:id"
                        element={<PlayList></PlayList>}
                    ></Route>
                    <Route
                        path="artist/:id"
                        element={<Artist></Artist>}
                    ></Route>
                    <Route path="album/:id" element={<Album></Album>}></Route>
                    <Route
                        path="search/:keyword"
                        element={<Search></Search>}
                    ></Route>
                    <Route path="media" element={<Media></Media>}></Route>
                </Routes>
            </Router>
            <Detail></Detail>
            <Player></Player>
        </div>
    );
}

export default App;
