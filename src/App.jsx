import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import CreateRoom from "./pages/CreateRoom/CreateRoom";
import JoinRoom from "./pages/JoinRoom/JoinRoom";
import ChatRoom from "./pages/ChatRoom/ChatRoom";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/create"
          element={<CreateRoom />}
        />

        <Route
          path="/join"
          element={<JoinRoom />}
        />

       <Route
  path="/chat/:roomCode"
  element={<ChatRoom />}
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;