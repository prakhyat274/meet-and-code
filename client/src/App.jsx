import { useEffect } from "react";
import { io } from "socket.io-client";
import "./App.css";

function App() {
  useEffect(() => {
    const socket = io("http://localhost:5000");
  }, []);

  return <h1>Hello</h1>;
}

export default App;
