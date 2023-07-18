import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css'
import { AuthProvider } from "./context/AuthContext";
import Feed from "./pages/feed";
import Login from "./pages/Login";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Header /> 
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/" element={<Feed />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
