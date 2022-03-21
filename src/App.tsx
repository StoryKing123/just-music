import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import PlayList from "./pages/playlist";
import Index from "./pages/index";
import NavBar from "./components/Navbar";
import Player from "./components/Player";
import { useInitTheme, useTheme } from "./hooks";
import { useInitMusic } from "./hooks/music";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    // const [count, setCount] = useState(0);
    const initTheme = useInitTheme();
    const initMusic = useInitMusic();

    useEffect(() => {
        initTheme();
        initMusic();
        toast("Wow so easy!");
    }, []);

    return (
        <div id="App" className="App  bg-base text-base ">
            <ToastContainer />
            <Router>
                <NavBar></NavBar>

                {/* <Login></Login> */}
                <Routes>
                    <Route path="/" element={<Index></Index>}></Route>
                    {/* <Route
                            path='search'
                            element={<Search></Search>}></Route> */}
                    <Route
                        path="playlist"
                        element={<PlayList></PlayList>}
                    ></Route>
                </Routes>
            </Router>
            <Player></Player>
            {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header> */}
        </div>
    );
}

export default App;
