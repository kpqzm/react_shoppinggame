import "./GameList.css"
import { useNavigate } from "react-router-dom";

function GameList({ownedGames, heartGames}) {
    const nav = useNavigate();

  return (

    <div className="GameList">
        <h3>보유한 게임</h3>
        {ownedGames.length > 0 ? (
            <ul>
                {ownedGames.map(game => (
                    <li key={game.id}>
                        <span style={{cursor: "pointer"}} onClick={() => nav(`/Game/${game.id}`)}>{game.name}</span>
                    </li>
                ))}
            </ul>
        ) : (
            <p>보유한 게임이 없습니다.</p>
        )}
        <h3 style={{borderTop: "1px solid black", paddingTop: "20px"}}>즐겨찾기</h3>
        {heartGames.length > 0 ? (
            <ul>
                {heartGames.map(game => (
                    <li key={game.id}>
                        <span style={{cursor: "pointer"}} onClick={() => nav(`/Game/${game.id}`)}>{game.name}</span>
                    </li>
                ))}
            </ul>
        ) : (
            <p>즐겨찾기한 게임이 없습니다.</p>
        )}
    </div>
  )
}

export default GameList
