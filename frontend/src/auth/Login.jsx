import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../slice/memberSlice";

const Login = () => {
   const dispatcher = useDispatch();
   const navi = useNavigate();
   const handleSubmit = (e) => {
      e.preventDefault();
      const formDate = new FormData(e.target);
      axios
         .post("http://localhost:9999/login.user", formDate)
         .then((res) => {
            alert(res.data.msg)
            if (res.data.msg == "로그인 성공") {
               sessionStorage.setItem("loginUser", res.data.token);
               dispatcher(setUser(res.data.user));
               navi("/");
            } else {
               alert(res.data.msg);
               alert("로그인 실패");
            }
         })
         .catch((err) => alert(err));
   };


   return (
      <div className="auth-card">
         <h1 className="form-title">로그인</h1>
         <form onSubmit={handleSubmit}>
            <div className="form-group">
               <label className="form-label" htmlFor="email">
                  이메일
               </label>
               <input
                  className="form-control"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
               />
            </div>
            <div className="form-group">
               <label className="form-label" htmlFor="password">
                  비밀번호
               </label>
               <input
                  className="form-control"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
               />
            </div>
            <button className="submit-button" type="submit">
               로그인
            </button>
         </form>
         <div className="auth-switch-link">
            <p>
               계정이 없으신가요? <Link to="/signup">회원가입</Link>
            </p>
         </div>
      </div>
   );
};

export default Login;
