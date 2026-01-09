import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    
    console.log('Login form submitted. Implement logic.');
  };

  return (
    <div className="auth-card">
      <h1 className="form-title">로그인</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="email">이메일</label>
          <input className="form-control" id="email" type="email" placeholder="name@example.com" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="password">비밀번호</label>
          <input className="form-control" id="password" type="password" placeholder="••••••••" />
        </div>
        <button className="submit-button" type="submit">로그인</button>
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
;