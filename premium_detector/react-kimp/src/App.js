import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Main from "./pages/Main/Main";
import useWebSocket from "./hooks/useWebSocket";
import { useEffect, useRef, createContext } from "react";

function App() {
  const upbitWsURL = "wss://api.upbit.com/websocket/v1";
  const [upbitWs, upbitData] = useWebSocket(upbitWsURL);

  return (
    <Router>
      <Context.Provider value={{ upbitData, upbitWs }}>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </Context.Provider>
    </Router>
  );
}

export const Context = createContext();
export default App;
