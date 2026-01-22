import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../slice/memberSlice";

const UpdateUser = () => {
   const userInfo = useSelector((store) => store.ms.user);
   const navi = useNavigate()
   const dispatch = useDispatch()
   const [formDatas, setFormDatas] = useState({
      name: "",
      birthYear: "",
      birthMonth: "",
      birthDay: "",
      email: "",
      password: "",
      newPassword: "",
      newPassword2: "",
      postCode: "",
      address: "",
      detailAddress: "",
      profileImage: "",
   });
   const currentYear = new Date().getFullYear();
   const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
   const months = Array.from({ length: 12 }, (_, i) => i + 1);
   const days = Array.from({ length: 31 }, (_, i) => i + 1);
   // 비밀번호: 수정 페이지에서 비밀번호를 보여줄 필요음 (보통 보안상 ********로 처리하거나 빈칸으로 둠.) 사용자가 비밀번호를 바꿀 때만 새 비밀번호를 입력받아 서버로 전송하면 됨.

   // 아이디(이메일): 아이디는 수정 불가능한 경우가 많으므로 disabled 처리된 input 창으로 보여주는 것이 좋음.

   // 나머지 정보: 이름, 주소, 프로필 이미지 경로 등은 서버에서 받아와서 화면에 채워줘야(Pre-fill) 사용자가 수정을 편하게 할 수 있음.

   // 여기에서는 axios.put 해보기

   useEffect(() => {
      axios
         .get(`http://localhost:9999/getInfo.user?email=${userInfo.email}`)
         .then((res) => {
            console.log(res);
            const { name, email, postCode, address, detailAddress,profileImage } =
               res.data.user;

            if (res.data.msg == "유저조회성공") {
            

               setFormDatas(()=>{
                  dispatch(setUser(res.data.user))
                  return {
                  name,
                  email,
                  postCode,
                  address,
                  detailAddress,
                  birthYear: res.data.user.birth.split("-")[0],
                  birthMonth: res.data.user.birth.split("-")[1],
                  birthDay: res.data.user.birth.split("-")[2],
                  profileImage
               }
               });
             
            }
         })
         .catch((err) => {
            console.log(err);
         });
   }, [userInfo.email,userInfo.profileImage]);

   const onChangeFun = (e) => {
      console.log(e.target);
      setFormDatas({ ...formDatas, [e.target.name]: e.target.value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      if (formDatas.paassword == formDatas.newPassword) {
         alert("기존비밀번호와 동일합니다.");
         return false;
      }

      if (formDatas.newPassword !== formDatas.newPassword2) {
         alert("새 비밀번호가 같지 않습니다.");
         return false;
      }
      const fd = new FormData(e.target);
      console.log(e.target)
      axios
         .put("http://localhost:9999/update.user", fd)
         .then((res) => {
            if(res.data.msg === "수정 성공"){
               alert("회원정보 수정성공")
               navi("/")
            }
         })
         .catch((err) => {
            alert(err);
         });
   };

   return (
      <div className="auth-card">
         <h1 className="form-title">회원정보수정</h1>
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
                  value={formDatas.name}
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
                     value={formDatas.birthYear}
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
                     value={Number(formDatas.birthMonth)}
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
                     value={Number(formDatas.birthDay)}
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
                  value={formDatas.email}
                  onChange={onChangeFun}
                  readOnly
               />
            </div>
            <div className="form-group">
               <label className="form-label" htmlFor="password">
                  기존비밀번호
               </label>
               <input
                  className="form-control"
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  name="password"
                  value={formDatas.password}
                  onChange={onChangeFun}
               />
            </div>
            <div className="form-group">
               <label className="form-label" htmlFor="password">
                  새비밀번호
               </label>
               <input
                  className="form-control"
                  id="newpassword"
                  type="password"
                  placeholder="••••••••"
                  name="newPassword"
                  value={formDatas.newPassword}
                  onChange={onChangeFun}
               />
            </div>

            <div className="form-group">
               <label className="form-label" htmlFor="confirm-password">
                  새비밀번호 확인
               </label>
               <input
                  className="form-control"
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  name="newPassword2"
                  value={formDatas.newPassword2}
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
                  name="postCode"
                  value={formDatas.postCode}
                  onChange={onChangeFun}
                  //   onClick={postOnClick}
                  //   value={v.postcode}
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
                  value={formDatas.address}
                  onChange={onChangeFun}
                  //   value={v.address}
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
                  value={formDatas.detailAddress}
                  onChange={onChangeFun}
               />
            </div>

            <div className="form-group">
               <label className="form-label" htmlFor="profile-image">
                  프로필 이미지
               </label>
               <img
                  src={`http://localhost:9999/getImage.user/${userInfo.profileImage}`}
               />
               <input
                  className="form-control"
                  id="profile-image"
                  type="file"
                  placeholder="프로필이미지"
                  name="profileImage"
                  onChange={onChangeFun}
               />
            </div>

            <button className="submit-button" type="submit">
               회원정보 수정
            </button>
         </form>
         {/* <div className="auth-switch-link">
            <p>
               이미 계정이 있으신가요? <Link to="/login">로그인</Link>
            </p>
         </div> */}
      </div>
   );
};

export default UpdateUser;
