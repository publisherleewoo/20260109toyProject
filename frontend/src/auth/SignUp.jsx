import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
   const [formData, setformData] = useState({
      name: "",
      birthYear: "",
      birthMonth: "",
      birthDay: "",
      email: "",
      password: "",
      confirmPassword: "",
      zonecode: "",
      address: "",
      detailAddress: "",
   });

   const currentYear = new Date().getFullYear();
   const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
   const months = Array.from({ length: 12 }, (_, i) => i + 1);
   const days = Array.from({ length: 31 }, (_, i) => i + 1);
   const handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());
      console.log(data);
   };
   const onChangeFun = (e) => {
      setformData({
         ...formData,
         [e.target.name]: e.target.value,
      });
   };
   const postOnClick = () => {
      new window.daum.Postcode({
         oncomplete: function (data) {
            const { zonecode, address } = data;
            setformData((prev) => ({ ...prev, zonecode, address }));
         },
      }).open();
   };

   return (
      <div className="auth-card">
         <h1 className="form-title">회원가입</h1>
         <form onSubmit={handleSubmit}>
            <div className="form-group">
               <label className="form-label" htmlFor="name">
                  이름
               </label>
               <input
                  className="form-control"
                  id="name"
                  type="text"
                  placeholder="이름을 입력하세요"
                  name="name"
                  onChange={onChangeFun}
               />
            </div>

            <div className="form-group">
               <label className="form-label">생년월일</label>
               <div style={{ display: "flex", gap: "8px" }}>
                  <select
                     className="form-control"
                     id="birth-year"
                     name="birthYear"
                     onChange={onChangeFun}
                  >
                     <option value="">년</option>
                     {years.map((year) => (
                        <option key={year} value={year}>
                           {year}
                        </option>
                     ))}
                  </select>
                  <select
                     className="form-control"
                     id="birth-month"
                     name="birthMonth"
                     onChange={onChangeFun}
                  >
                     <option value="">월</option>
                     {months.map((month) => (
                        <option key={month} value={month}>
                           {month}
                        </option>
                     ))}
                  </select>
                  <select
                     className="form-control"
                     id="birth-day"
                     name="birthDay"
                     onChange={onChangeFun}
                  >
                     <option value="">일</option>
                     {days.map((day) => (
                        <option key={day} value={day}>
                           {day}
                        </option>
                     ))}
                  </select>
               </div>
            </div>

            <div className="form-group">
               <label className="form-label" htmlFor="email">
                  이메일
               </label>
               <input
                  className="form-control"
                  id="email"
                  type="email"
                  placeholder="예: name@example.com"
                  name="email"
                  onChange={onChangeFun}
               />
            </div>

            <div className="form-group">
               <label className="form-label" htmlFor="password">
                  비밀번호
               </label>
               <input
                  className="form-control"
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  name="password"
                  onChange={onChangeFun}
               />
            </div>

            <div className="form-group">
               <label className="form-label" htmlFor="confirm-password">
                  비밀번호 확인
               </label>
               <input
                  className="form-control"
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  name="confirmPassword"
                  onChange={onChangeFun}
               />
            </div>

            <div className="form-group">
               <label className="form-label" htmlFor="postcode">
                  우편번호
               </label>
               <input
                  className="form-control"
                  id="postcode"
                  type="text"
                  placeholder="예: 01234"
                  name="postcode"
                  onChange={onChangeFun}
                  onClick={postOnClick}
                  value={formData.zonecode}
               />
            </div>

            <div className="form-group">
               <label className="form-label" htmlFor="address">
                  주소
               </label>
               <input
                  className="form-control"
                  id="address"
                  type="text"
                  placeholder="도로명 주소"
                  name="address"
                  onChange={onChangeFun}
                  value={formData.address}
               />
            </div>

            <div className="form-group">
               <label className="form-label" htmlFor="detail-address">
                  상세 주소
               </label>
               <input
                  className="form-control"
                  id="detail-address"
                  type="text"
                  placeholder="아파트, 동/호수 등"
                  name="detailAddress"
                  onChange={onChangeFun}
               />
            </div>

            <button className="submit-button" type="submit">
               회원가입
            </button>
         </form>
         <div className="auth-switch-link">
            <p>
               이미 계정이 있으신가요? <Link to="/login">로그인</Link>
            </p>
         </div>
      </div>
   );
};

export default Signup;
