import { Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Private from "./component/private/private";
import { useSelector } from "react-redux";


function App() {

  axios.defaults.withCredentials = true
  
  
  return (
    <div className="app">
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Home />}>
          <Route path="/:id" element={<Private/>}></Route>
          <Route path="/*" element={<h1>404 not found</h1>}></Route>
        </Route>
        <Route path="*" element={<h1>404 not found</h1>}></Route>
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
}

export default App;