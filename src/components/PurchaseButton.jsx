import { useContext } from 'react';
import Button from './Button'; // 기존 Button 컴포넌트를 임포트합니다.
import { UserInformation } from '../App'; // UserInformation Context를 임포트합니다.


function PurchaseButton({ gameId }) {
  // UserInformation Context에서 필요한 상태와 함수를 가져옵니다.
  const { games, onBuy } = useContext(UserInformation);

  // gameId에 해당하는 게임 정보를 찾습니다.
  const game = games.find(g => g.id === gameId);

  // 게임을 찾지 못했다면 null을 반환하여 렌더링하지 않습니다.
  if (!game) {
    return null;
  }

  // 구매 버튼 클릭 시 실행될 함수
  const handlePurchase = () => {
      onBuy(game.id);
  };

  return (
    <Button
      onClick={handlePurchase}
      text={game.owned ? "보유중" : "구매"} // 게임 소유 여부에 따라 버튼 텍스트 변경
      type={game.owned ? "secondary" : "primary"} // 게임 소유 여부에 따라 버튼 타입(스타일) 변경
      disabled={game.owned} // 게임 소유 중이면 버튼 비활성화
    />
  );
}

export default PurchaseButton;