import "./BoxSearch.css"
import { useContext } from "react";
import { UserInformation } from "../App";
import Box from "./Box"
import { useNavigate } from "react-router-dom";
import PurchaseButton from '../components/PurchaseButton';
import gameDescriptions from "../util/gameDescriptions";

function BoxSearch({name}) {
    const nav = useNavigate();
    const {games} = useContext(UserInformation);

    const game = games.find(g => g.name.toLowerCase() === name.toLowerCase());
    const info = gameDescriptions.find(g => g.id === game.id);
    
    if (!game) {
        console.warn(`[BoxSearch] Game with name "${gameName}" not found in context.`);
        return null;
    }

    return(
        <div className="BoxSearch">
            <div style={{flex: "0.5"}}>
                <Box id={game.id} classNameProp="Box_BoxSearch" />
            </div>
            <div>
                <h3><span style={{cursor: "pointer"}} onClick={() => nav(`/Game/${game.id}`)}>{game.name}</span></h3>
                <p>카테고리: {game.category}</p>
                <p>평점: {game.starscore}</p>
            </div>
            <div>{info.short}</div>
            <div style={{flex: "0.5"}} className="BoxSearch_Buy">
                {game.price === 0 ? <p>무료</p> : <p>{game.price.toLocaleString()}원</p>}
                <PurchaseButton gameId={game.id}/>
            </div>
        </div>
    )
}

export default BoxSearch