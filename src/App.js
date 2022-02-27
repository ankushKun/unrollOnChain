import "./App.css";
import Post from "./components/Post";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/posts' element={<Home />} />
        <Route path='/posts/:postHashHex' element={<Post />} />
      </Routes>
    </Router>
  );
}

export default App;
