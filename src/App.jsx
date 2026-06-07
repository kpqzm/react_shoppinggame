import './App.css'
import { useState, createContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Search from "./pages/Search"
import Library from "./pages/Library"
import Game from "./pages/Game"
import allGame from "./util/allGame"

export const UserInformation = createContext();

function App() {
  const [money, setMoney] = useState(0); //초기값
  const [games, setGames] = useState(allGame); //게임 관리
  const [transactionHistory, setTransactionHistory] = useState([]); //게임내역

  //페이지 시작하면 로컬스토리지 불러오기
  useEffect(() => {
    const savedGames = JSON.parse(localStorage.getItem("games")) || [];
    if (savedGames.length > 0) {
      setGames(savedGames);
    }

  // 거래 내역 초기 불러오기
  const savedHistory = JSON.parse(localStorage.getItem("transactionHistory")) || [];
  setTransactionHistory(savedHistory);

  // 잔액 초기 불러오기
  const savedMoney = JSON.parse(localStorage.getItem("money"));
  if (savedMoney !== null) {
    setMoney(savedMoney);
  }
  }, []);

  //모든게임 관리
  useEffect(() => {
    localStorage.setItem("games", JSON.stringify(games));
  }, [games]);

  //거래내역 관리
  useEffect(() => {
    localStorage.setItem("transactionHistory", JSON.stringify(transactionHistory));
  }, [transactionHistory]);
  
  //잔액관리
  useEffect(() => {
    localStorage.setItem("money", JSON.stringify(money));
  }, [money]);

  const onBuy = (gameId) => {
    const gameToBuy = games.find(game => game.id === gameId);

    if (!gameToBuy) {
      return;
    }

    // 2. 잔액이 충분한지 확인
    if (money < gameToBuy.price) {
      alert(`잔액이 부족합니다.\n현재 잔액: ${money.toLocaleString()}원\n게임 가격: ${gameToBuy.price.toLocaleString()}원\n필요 금액: ${(gameToBuy.price-money).toLocaleString()}원`);
      return;
    }

    // 3. 구매 확인 메시지
    if (gameToBuy.price === 0 
      ? window.confirm(`${gameToBuy.name}을(를) 구매하시겠습니까?`) 
      : window.confirm(`${gameToBuy.name}을(를) 구매하시겠습니까?\n현재 잔액: ${money.toLocaleString()}원\n게임 가격: ${gameToBuy.price.toLocaleString()}원\n결제후 잔액: ${(money-gameToBuy.price).toLocaleString()}원`)) {
      // 잔액에서 게임 가격 차감
      setMoney(prevMoney => prevMoney - gameToBuy.price);

      // 게임의 'owned' 상태를 업데이트
      const updatedGames = games.map(game =>
        game.id === gameId ? { ...game, owned: true } : game
      );
      setGames(updatedGames); // 상태 업데이트 (useEffect가 localStorage에 저장)

      const newTransaction = {
        id: Date.now(),
        type: "구매",
        gameId: gameId,
        gameName: gameToBuy.name,
        price: gameToBuy.price,
        date: new Date().toLocaleString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        })
      };
      setTransactionHistory(prev => [...prev, newTransaction]);

      alert(`${gameToBuy.name} 구매가 완료되었습니다!`);
    } else {
      alert("구매를 취소했습니다.");
    }
  };


  return (
    <>
      <UserInformation.Provider value={{money, setMoney, games, setGames, onBuy, transactionHistory, setTransactionHistory}}>
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/Library" element={<Library />} />
            <Route path="/Game/:id" element={<Game />} />
        </Routes>
      </UserInformation.Provider>
    </>
  )
}

export default App
