import axios from "axios";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import Chatpage from "./Pages/Chatpage";
import Homepage from "./Pages/Homepage";

// Set base URL for the chat backend
axios.defaults.baseURL = "http://localhost:5001";

function ChatApp() {
  return (
    <div className="App App-Chat-Container">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chats" element={<Chatpage />} />
      </Routes>
    </div>
  );
}

export default ChatApp;
