import "./App.css";
import LandingPage from "./Pages/LandingPage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chill from "./Pages/Chill";
import Home from "./Pages/Home";
import Commits from "./Pages/Commits";
import NewRepo from "./Pages/NewRepo";
import Repo from "./Pages/Repo";
import Profile from "./Pages/Profile";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<LandingPage />} path="/" />
          <Route element={<Login />} path="/Login" />
          <Route element={<Register />} path="/Register" />
          <Route element={<Chill />} path="/Chill" />
          <Route element={<Home />} path="/home" />
          <Route element={<Commits/>} path="/commits"/>
          <Route element={<NewRepo/>} path="/new"/>
          <Route element={<Profile/>} path="/profile"/>
          <Route element={<Repo/>} path="/repo"/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
