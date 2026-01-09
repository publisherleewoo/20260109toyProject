import { Link, NavLink, Outlet } from 'react-router-dom';

const FirstLayout = () => {
  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="header-container">
                    <NavLink to="/" className="logo">
                      HwBoard
                    </NavLink>
                    <nav className="main-nav">
                      <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                        홈
                      </NavLink>
                      <NavLink to="/board" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                        게시판
                      </NavLink>
                    </nav>
                    <div className="header-actions">
                      <Link to="/login" className="login-button">
                        로그인
                      </Link>
                    </div>
                  </div>
                </header>
          
                <main className="app-main">
                  <Outlet />
                </main>
          
                <footer className="app-footer">
                  <p>&copy; 2026 HwBoard. 모든 권리 보유.</p>
                </footer>              </div>  );
};

export default FirstLayout;