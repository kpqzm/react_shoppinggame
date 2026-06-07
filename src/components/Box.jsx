import "./Box.css"
import { getGameImage } from "../util/get-game-image";
import Button from "./Button"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserInformation } from "../App";

function Box({id, classNameProp}) {
  const nav = useNavigate();
  const { games } = useContext(UserInformation);

  const game = games.find(g => g.id === id);
  if (!game) return null;

  const goGame = () => {
    nav(`/Game/${id}`);
  };

  return (
    <div className={`Box ${classNameProp || ''}`} onClick={goGame} style={{cursor: "pointer"}}>
      <div >
        <Button text={<img style={{borderRadius: "20px"}} src={getGameImage(id)} alt={game.name} />} type={"Button"}/>
      </div>
    </div>
  )
}

export default Box
