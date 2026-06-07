import Header from "../components/Header"
import { useParams, useNavigate } from 'react-router-dom'
import TheGame from "../components/TheGame"
import GameList from "../components/GameList";
import { UserInformation } from "../App"
import { useContext, useEffect } from "react"
import "./Game.css"

function Game() {
  const params = useParams();
  const gameId = parseInt(params.id, 10);

  const { games } = useContext(UserInformation);
  const ownedGames = games.filter(game => game.owned);
  const heartGames = games.filter(game => game.heart);

  const navigate = useNavigate();

  useEffect(() => { document.title = games.find(g => g.id === gameId).name; }, []);

  return (
    <>
      <Header />
      <div style={{display: "flex", width: "100%", alignItems: "start", marginTop: "30px"}}>
        <div style={{flex: "1.5"}}>
          <div className="a" style={{ marginBottom: "30px" }} onClick={() => navigate(-1)}>
              ← 뒤로가기
          </div>
          <GameList ownedGames={ownedGames} heartGames={heartGames}/>
        </div>
        
        <TheGame id={gameId}/>
      </div>
    </>
  )
}

export default Game
