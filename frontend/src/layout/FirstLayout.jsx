import { useSelector } from "react-redux";
import { Link, NavLink, Outlet } from "react-router-dom";

const FirstLayout = () => {
   const loginUser = useSelector((store) => store.ms.user);

   const utilNav = () => {
      if (loginUser.name) {
         return (
            <div className="header-actions">
               <span className="user-welcome">
                  <b>{loginUser.name}</b>님 안녕하세요
               </span>
               <div className="user-menu-group">
                  <Link to="/verifyPassword" state={{mode:'edit'}} className="action-button edit-btn">
                     정보수정
                  </Link>
                  <Link to="/verifyPassword" state={{mode:'delete'}} className="action-button delete-btn">
                     정보삭제
                  </Link>
               </div>
            </div>
         );
      } else {
         return (
            <div className="header-actions">
               <Link to="/login" className="login-button">
                  로그인
               </Link>
            </div>
         );
      }
   };

   return (
      <div className="app-layout">
         <header className="app-header">
            <div className="header-container">
               <NavLink to="/" className="logo">
                  HwBoard
               </NavLink>
               <nav className="main-nav">
                  <NavLink
                     to="/"
                     className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                     }
                  >
                     홈
                  </NavLink>
                  <NavLink
                     to="/board"
                     className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                     }
                  >
                     게시판
                  </NavLink>
               </nav>
               {utilNav()}
            </div>
         </header>
         <main className="app-main">
            <Outlet />
         </main>
         <footer className="app-footer">
            <p>&copy; 2026 HwBoard. 모든 권리 보유.</p>
         </footer>
      </div>
   );
};

export default FirstLayout;