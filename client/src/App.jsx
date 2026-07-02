import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

function App() {

  const [socket, setSocket] = useState(io("http://localhost:5000"));
  const [message, setMessage] = useState("");

  const handleButtonClick = (event) => {
    socket.emit("clicked", message);
    setMessage("");
  }

  useEffect(() => {

  }, []);

  return <>
    <input value={message} onChange={(e) => {setMessage(e.target.value)}}></input>
    <button onClick={handleButtonClick}>Click Me</button>
  </>;
}

export default App;
