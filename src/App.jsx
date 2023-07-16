import { useState } from "react";
import Feed from "./pages/feed";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Feed />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
