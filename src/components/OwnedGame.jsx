import "./OwnedGame.css"
import Box from "./Box"

function OwnedGame({ownedGames}) {

  return (

    <div className="OwnedGame">
        {ownedGames.length > 0 ? (
            ownedGames.map(game => (
                <div key={game.id} className="MyGames">
                    <Box id={game.id} />
                    <div>{game.name}</div>
                </div>
            ))
        ) : (
            <h1 style={{marginLeft: "250px", marginTop: "200px"}}>보유한 게임이 없습니다.</h1>
        )}
    </div>
  )
}

export default OwnedGame
