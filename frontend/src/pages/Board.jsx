import { useState } from "react";
import CommentSection from "../component/CommentSection";
import NewPostModal from "../component/NewPostModal";

// Sample data - the user will replace this with state from an API
const samplePosts = [
  {
    id: 1,
    title: '리액트 시작하기',
    content: '리액트는 사용자 인터페이스를 만들기 위한 강력한 라이브러리입니다. 이 글은 기초를 다룹니다...',
    author: '김민준',
    date: '2026년 1월 1일',
  },
  {
    id: 2,
    title: 'CSS 변수 이해하기',
    content: 'CSS 변수(사용자 지정 속성)를 사용하면 CSS 전체에서 재사용할 값을 저장할 수 있습니다...',
    author: '이수진',
    date: '2026년 1월 2일',
  },
  {
    id: 3,
    title: '최신 앱의 상태 관리',
    content: 'Context API, Redux, Zustand와 같은 다양한 상태 관리 솔루션을 탐색합니다...',
    author: '박서연',
    date: '2026년 1월 3일',
  },
    {
    id: 4,
    title: '리액트 라우터 가이드',
    content: '이 인기 있는 라이브러리로 리액트 애플리케이션에서 클라이언트 측 라우팅을 구현하는 방법을 배워보세요.',
    author: '최현우',
    date: '2026년 1월 4일',
  },
];



const Board = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNewPostClick = () => { // Renamed to avoid confusion with rendering
    handleOpenModal();
  };

  return (
    <div className="board-page">
      <div className="board-header">
        <h1 className="board-title">게시물</h1>
        <button className="new-post-button newWirter" onClick={handleNewPostClick}>
          + 새 글 작성
        </button>
      </div>

      <div className="posts-grid">
        {samplePosts.map((post) => (
          <div key={post.id} className="post-card">
            <h2 className="card-title">{post.title}</h2>
            <p className="card-content">{post.content}</p>
            <div className="card-footer">
              <span className="card-author">{post.author}</span>
              <span className="card-date">{post.date}</span>
            </div>
            <CommentSection />
          </div>
        ))}
      </div>
      
      

      {/* Render NewPostModal conditionally */}
      <NewPostModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Board;