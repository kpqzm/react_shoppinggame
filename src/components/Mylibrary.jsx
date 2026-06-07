import "./Mylibrary.css"
import GameList from "./GameList"
import OwnedGame from "./OwnedGame"
import { UserInformation } from "../App"
import { useContext } from "react"

function Mylibrary() {

    const { games } = useContext(UserInformation);
    const ownedGames = games.filter(game => game.owned);
    const heartGames = games.filter(game => game.heart);

  return (

    <div className="Mylibrary">
        <GameList ownedGames={ownedGames} heartGames={heartGames}/>
        <OwnedGame ownedGames={ownedGames} />
    </div>
  )
}

export default Mylibrary
