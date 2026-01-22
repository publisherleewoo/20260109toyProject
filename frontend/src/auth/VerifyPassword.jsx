import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setUser } from "../slice/memberSlice";

const VerifyPassword = () => {
   const navi = useNavigate();
   const dispatch = useDispatch()
   const location = useLocation();
   const userInfo = useSelector(store=>store.ms.user)
   const mode = location.state?.mode || "confirm"; // "edit" 또는 "delete"
 
   const [password, setPassword] = useState("");

   const handleVerify = (e) => {
      e.preventDefault();

      if (!password) {
         alert("비밀번호를 입력해주세요.");
         return;
      }
      
      if(Object.keys(userInfo).length===0 && userInfo.constructor === Object ){
         alert("다시 로그인해주세요")
         return false
      }

      const fd =  new FormData()
      fd.append("email",userInfo.email)
      fd.append("password",password)
      
      axios.post("http://localhost:9999/verifypassword", fd)
         .then((res) => {
            if (res.data.msg==="인증에 성공했습니다") {
               if (mode === "delete") {
                  if (window.confirm("정말로 탈퇴하시겠습니까? 데이터는 복구되지 않습니다.")) {
                     // 삭제 로직 실행
                     axios.delete(`http://localhost:9999/delete.user/${userInfo.email}`).then(() => {
                        alert("탈퇴가 완료되었습니다.");
                        dispatch(setUser({}))
                        navi("/");
                     });
                  }
               } else {
                  alert("비밀번호가 일치합니다")
                  navi("/updateUser");
               }
            } else {
               alert("비밀번호가 일치하지 않습니다.");
               alert(res.data.msg)
            }
         })
         .catch((err) => {
            console.error(err);
            alert("인증 중 오류가 발생했습니다.");
         });
   };

   return (
      <div className="auth-card" style={{ maxWidth: "400px", margin: "100px auto" }}>
     
         <h1 className="form-title">
            {mode === "delete" ? "계정 삭제 확인" : "비밀번호 확인"}
         </h1>
         <p style={{ textAlign: "center", marginBottom: "20px", color: "var(--color-text-secondary)" }}>
            안전을 위해 비밀번호를 다시 한 번 입력해주세요.
         </p>
         
         <form onSubmit={handleVerify}>
            <div className="form-group">
               <label className="form-label" htmlFor="verify-password">
                  비밀번호
               </label>
               <input
                  className="form-control"
                  id="verify-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
            </div>

            <button 
               className={mode === "delete" ? "action-button delete-btn" : "submit-button"} 
               type="submit"
               style={{ width: "100%", padding: "12px", marginTop: "10px" }}
            >
               {mode === "delete" ? "영구 삭제" : "확인"}
            </button>
            
            <button 
               type="button"
               className="action-button edit-btn"
               style={{ width: "100%", marginTop: "10px", padding: "12px" }}
               onClick={() => navi(-1)}
            >
               취소
            </button>
         </form>
      </div>
   );
};

export default VerifyPassword;