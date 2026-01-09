import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <h1 className="hero-title">HwBoard에 오신 것을 환영합니다</h1>
        <p className="hero-subtitle">
          아이디어를 공유하고, 질문하며, 커뮤니티와 소통하는 공간입니다.
        </p>
        <Link to="/board" className="cta-button">
          게시판으로 가기
        </Link>
      </section>
    </div>
  );
};

export default HomePage;