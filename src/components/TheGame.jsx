import "./TheGame.css"
import { getGameBImage } from "../util/get-game-Bimage";
import { useContext, useState, useEffect } from "react";
import { UserInformation } from "../App";
import PurchaseButton from "./PurchaseButton";
import gameDescriptions from "../util/gameDescriptions";
import Button from "./Button";
import heartImg from "../assets/heart.png";
import emptyHeartImg from "../assets/empty_heart.png";

function TheGame({id}) {

  const { games, setGames } = useContext(UserInformation); // 게임 데이터 가져오기
  const game = games.find(g => g.id === id);
  const info = gameDescriptions.find(g => g.id === id);

  const [review, setReview] = useState('');
  const [tempReview, setTempReview] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  if (!game) return null;

  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem("gameReviews") || "{}");
    const currentReview = savedReviews[id] || '';
    setReview(currentReview);
    setTempReview('');
    setIsEditing(false);
  }, [id]);

  const heartGame = () => {
    const updatedGames = games.map(g =>
      g.id === id ? {...g, heart: !g.heart} : g
    );
    setGames(updatedGames);
  }

  const handleSubmitReview = () => {
    setTempReview(review);  
    setIsEditing(true);    // 쓰기 모드로 전환
  };

  const handleEdit = () => { //작성한 리뷰를 저장
    setReview(tempReview);  
    const saved = JSON.parse(localStorage.getItem("gameReviews") || "{}");
    saved[id] = tempReview;
    localStorage.setItem("gameReviews", JSON.stringify(saved));
    setIsEditing(false);     // 보기 모드로 전환
  };

  const handleCancel = () => {
    setTempReview('');      // 임시 입력 초기화
    setIsEditing(false);    // 보기 모드로 복귀
  };

  return (
    <div className="TheGame">
      <div className="TheGame_image">
        <img src={getGameBImage(id)} alt={game.name}/>
        <div className="game_info">
          <div className="buyButton">
            <PurchaseButton gameId={game.id}/>
          </div>
          <div style={{flex: "2"}} className="sizeInfo">
            <p>용량</p>
            <p>가격</p>
            <p>카테고리</p>
            <p>평점</p>
            <div>{game.size}GB</div>
            {game.price === 0 ? <div>무료</div> : <div>{game.price.toLocaleString()}원</div>}
            <div>{game.category}</div>
            <div>{game.starscore}</div>
          </div>
          <div style={{flex: "2.4"}} className="heart">
            <Button onClick={heartGame} text={
              <img
                src={game.heart ? heartImg : emptyHeartImg}
                alt="heart" />} type={"heart"}/>
          </div>
        </div>
      </div>
      <div className="gameIntro">
        <h1>{game.name}</h1>
        <div>{info.long}</div>
      </div>
      <div className="gameIntro">
        <h3>리뷰</h3>
        {isEditing ? (
          <>
            
            <div style={{display: "flex", marginBottom: "10px"}}>
              <Button onClick={handleEdit} text={"완료"} type={"review"} />
              <Button onClick={handleCancel} text={"취소"} type={"review"} />
            </div>
            <input
              value={tempReview}
              onChange={(e) => setTempReview(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleEdit();
                }
              }}
              placeholder="리뷰를 작성해 주세요"
            />
          </>
        ) : (
          <>
            
            <Button onClick={handleSubmitReview} text={review ? "수정하기" : "작성하기"} type={"reviewStart"} />
            <p>{review}</p>
          </>
        )}
      </div>
    </div>
  )
}

export default TheGame