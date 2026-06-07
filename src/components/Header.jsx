import "./Header.css";
import logo from "../assets/logo.png";
import Money from "./Money"
import { useNavigate } from 'react-router-dom'
import Button from "./Button"
import { useContext, useState } from 'react';
import { UserInformation } from "../App";

function Header() {
  const navi = useNavigate();

  const { games, setGames, setMoney, transactionHistory, setTransactionHistory } = useContext(UserInformation);
  const [showChargePopup, setShowChargePopup] = useState(false); //충전 팝업창 띄울건지
  const [showRefundPopup, setShowRefundPopup] = useState(false); //충전 팝업창 띄울건지


  const handleCharge = (amount) => {
    if (window.confirm(`${amount.toLocaleString()}원 충전하시겠습니까?`)) {
      setMoney(prev => prev + amount);
      alert("충전이 완료되었습니다.");
    }
    else {
      alert("취소되었습니다.");
    }
  };

  const handleRefund = (game) => {
    if (!window.confirm(`${game.name} 게임을 환불하시겠습니까?`)) return;

    // 1. 게임 소유 상태 해제
    const updatedGames = games.map(g =>
      g.id === game.id ? { ...g, owned: false } : g
    );
    setGames(updatedGames);

    // 2. 금액 복원
    setMoney(prev => prev + game.price);

    // 3. 내역 추가
    setTransactionHistory(prev => [
      ...prev,
      {
        id: Date.now(),
        type: "환불",
        gameId: game.id,
        gameName: game.name,
        price: game.price,
        date: new Date().toLocaleString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        })
      }
    ]);
  };

  const goHome = () => {
    navi("/");
  }

  return (
    <>
      <header className="Header">
        <div></div>
        <div className="header_logo">
          <Button onClick={goHome} text={<img src={logo} style={{height: "60px"}}/>} type={"Button"}/>
        </div>
        
        <div className="header_money">
          <div className="money">
            <div className="n12">
              <div className="n1">&ensp;잔액</div>
              <div className="n2"><Money />&ensp;</div>
            </div>
            <div className="n12">
              <div className="n3" onClick={() => setShowRefundPopup(true)}>내역</div>
              <div className="n4" onClick={() => setShowChargePopup(true)}>충전</div>
            </div>
          </div>
        </div>
      </header>

      {showChargePopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>충전 금액 선택</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "10px" }}>
              <ul style={{paddingLeft: "20px", margin: "0", marginTop: "10px"}}>
                {[10000, 29999, 59999, 99999].map(amount => (
                    <li key={amount} style={{paddingBottom: "20px"}}>
                      {amount.toLocaleString()}원
                      <button style={{marginLeft: "30px"}} onClick={() => handleCharge(amount)}>
                        충전하기
                      </button>
                    </li>
                ))}
              </ul>
              <button style={{width: "50px", margin: "0 auto"}} onClick={() => setShowChargePopup(false)}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {showRefundPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>거래 내역</h3>
            {transactionHistory.length === 0 ? (
              <p>구매한 게임이 없습니다.</p>
            ) : (
            <ul>
              {transactionHistory.map((entry, index) => {
                const latestTransaction = [...transactionHistory]
                  .filter(e => e.gameId === entry.gameId)
                  .reverse()[0];

                const isLatestPurchase = entry === latestTransaction && entry.type === "구매";

                return (
                  <li key={index}>
                    [{entry.type}] {entry.gameName} - {entry.price.toLocaleString()}원 ({entry.date})
                    {isLatestPurchase && (
                      <button
                        onClick={() => handleRefund(games.find(g => g.id === entry.gameId))}
                        style={{ marginLeft: "10px" }}
                      >
                        환불
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
            )}
            <button onClick={() => setShowRefundPopup(false)}>닫기</button>
          </div>
        </div>
      )}
    </>
  )
}

export default Header