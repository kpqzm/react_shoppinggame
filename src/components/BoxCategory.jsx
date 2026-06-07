import "./BoxCategory.css"
import Box from "./Box"
import { useRef } from "react";
import { useContext, useState, useEffect } from "react";
import { UserInformation } from "../App";

function BoxCategory({title, gameIds = []}) {

  const { games } = useContext(UserInformation);

  const scrollContainerRef = useRef(null);

  // 왼쪽으로 스크롤하는 함수
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      // 왼쪽으로 스크롤
      scrollContainerRef.current.scrollBy({
        left: -600,
        behavior: "smooth", // 부드러운 스크롤 효과
      });
    }
  };

  // 오른쪽으로 스크롤하는 함수
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      // 오른쪽으로 스크롤
      scrollContainerRef.current.scrollBy({
        left: 600,
        behavior: "smooth", // 부드러운 스크롤 효과
      });
    }
  };

  return (
    <div className="BoxCategoryWrapper">
      <div className="category-header">
        <h2>{title}</h2>
        <div className="scroll-arrows-container">
          <button className="scroll-arrow left-arrow" onClick={scrollLeft}>
            &#9664;
          </button>
          <button className="scroll-arrow right-arrow" onClick={scrollRight}>
            &#9654;
          </button>
        </div>
      </div>
      <div className="BoxCategory" ref={scrollContainerRef}>
        {gameIds.map(id => {
          const game = games.find(g => g.id === id);
          if (!game) return null;

          return (
            <div className="Home_Box" key={id}>
              <Box classNameProp={"Home_Box"} id={id} />
              <div className="BoxCategory_name">{game.name}</div>
            </div>
          );
        })}
        </div>
    </div>
  )
}

export default BoxCategory
