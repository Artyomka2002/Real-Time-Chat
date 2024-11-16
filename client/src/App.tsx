import { Route, Routes } from "react-router-dom";
import Autorization from "./pages/start-pages/Autorization";
import Layout from "./layout/Layout";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Autorization />} />
        <Route path="/chats" element={<Layout />} />
      </Routes>
    </div>
  );
}

export default App;
