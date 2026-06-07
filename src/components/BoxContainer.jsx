import "./BoxContainer.css"
import BoxCategory from "./BoxCategory"
import { useContext } from "react";
import { UserInformation } from "../App"

function BoxContainer() {

  const {games} = useContext(UserInformation);

  const popularGameIds = games
    .filter(game => game.starscore === "★★★★★")
    .map(game => game.id);

    const cheapGameIds = games
    .filter(game => game.price <= 10000)
    .map(game => game.id);

  return (
    <>
      <div className="BoxContainer">
        <div>
          <BoxCategory title="인기 게임" gameIds = {popularGameIds} />
        </div>
        <div>
          <BoxCategory title="만원 이하의 게임" gameIds = {cheapGameIds}/>
        </div>
      </div>
    </>
  )
}

export default BoxContainer
