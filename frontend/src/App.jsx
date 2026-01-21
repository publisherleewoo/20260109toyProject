import axios from "axios";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./auth/Login";
import Signup from "./auth/SignUp";
import AuthLayout from "./layout/AuthLayout";
import FirstLayout from "./layout/FirstLayout";
import Board from "./pages/Board";
import HomePage from "./pages/HomePage";
import { setUser } from "./slice/memberSlice";
import { useDispatch } from "react-redux";
import UpdateUser from "./auth/UpdateUser";
import DeleteUser from "./auth/VerifyPassword";
import VerifyPassword from "./auth/VerifyPassword";

function App() {
   const location = useLocation();
   const dispatcher = useDispatch()
   const token = sessionStorage.getItem("loginUser");

   //로그인하면 세션과 redux셋팅 완료.  세션에 토큰이 있다면 path가 바뀔때 마다 재발행 체크. 없다면 로그아웃과 리덕스 아웃
   useEffect(() => {
      if (token) {
         const fd = new FormData();
         fd.append("token", token);
         axios
            .post("http://localhost:9999/refreshToken", fd)
            .then((res) => {
               console.log(res);
               if(res.data.msg !=="토큰이 아직 유효합니다"){
                  // 토큰이 아직 유효하지 않으므로 리덕스 데이터 삭제
                  dispatcher(setUser({}))
               }
            })
            .catch((err) => alert(err));
      }
   }, [token, location.pathname,dispatcher]);

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
               <Route path="/updateUser" element={<UpdateUser />} />
               <Route path="/verifyPassword" element={<VerifyPassword />} />
            </Route>
         </Routes>
      </>
   );
}

export default App;
