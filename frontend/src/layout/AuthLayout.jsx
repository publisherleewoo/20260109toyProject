import { Link, Outlet } from 'react-router-dom';
import './Auth.css';

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <div className="auth-container">
        <div className="auth-logo">
          <Link to="/">HwBoard</Link>
        </div>
        <Outlet /> 
      </div>
    </div>
  );
};

export default AuthLayout;
