import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import FirstLayout from "./layout/FirstLayout";
import Board from "./pages/Board";
import AuthLayout from "./layout/AuthLayout";
import Login from "./auth/Login";
import Signup from "./auth/SignUp";

function App() {
  return (
    <>
      <Routes>

        <Route element={<FirstLayout />}>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/board" element={<Board />}></Route>
        </Route>


        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
