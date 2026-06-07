import "./ParticularSearch.css"
import BoxSearch from "./BoxSearch"

function ParticularSearch({ gameNamesToDisplay, currentQuery }) {
  
    return(
        <div className="ParticularSearch">
            {gameNamesToDisplay.length > 0 ? (
                gameNamesToDisplay.map((gameName) => (
                    <div key={gameName} className="ParticularSearch_Box">
                        <BoxSearch name={gameName} />
                    </div>
                ))
            ) : (
                // 검색어는 있지만 결과가 없을 때 메시지 표시
                (currentQuery || Object.keys(gameNamesToDisplay).length === 0) &&
                <p className="no_result_found">
                    {currentQuery ? `"${currentQuery}"에 해당하는 게임을 찾을 수 없습니다.` : ''}
                    {!currentQuery && Object.keys(gameNamesToDisplay).length === 0 ? '선택된 필터에 해당하는 게임을 찾을 수 없습니다.' : ''}
                </p>
            )}
        </div>
    )
}

export default ParticularSearch