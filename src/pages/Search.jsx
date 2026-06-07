import { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';

import Header from "../components/Header";
import Nav from "../components/Nav";
import Filter from "../components/Filter";
import ParticularSearch from "../components/ParticularSearch";
import { UserInformation } from '../App';

function Search() {

  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('query') || ''; // 초기 검색어, 없으면 빈 문자열

  const { games } = useContext(UserInformation);

  // 필터 상태
  const [activeFilters, setActiveFilters] = useState({});

  // 필터링된 게임들의 이름
  const [filteredGameNames, setFilteredGameNames] = useState([]);

  function fuzzyMatch(text, query) {
    const normalizedText = text.toLowerCase().replace(/\s/g, '');
    const normalizedQuery = query.toLowerCase().replace(/\s/g, '');

    if (normalizedQuery.length === 0) {
      return true; // 빈 검색어는 모든 텍스트와 일치
    }

    let textIndex = 0;
    let queryIndex = 0;

    // 검색어의 모든 문자를 텍스트에서 순서대로 찾으려고 시도
    while (queryIndex < normalizedQuery.length && textIndex < normalizedText.length) {
      if (normalizedText[textIndex] === normalizedQuery[queryIndex]) {
        queryIndex++; // 현재 검색어 문자를 찾았으면 다음 문자로 이동
      }
      textIndex++; // 텍스트에서는 항상 다음 문자로 이동
    }

    // 검색어의 모든 문자를 텍스트에서 순서대로 찾았다면 true를 반환
    return queryIndex === normalizedQuery.length;
  }

  useEffect(() => { document.title = "게임 상세 검색"; }, []);

  // URL 쿼리 또는 활성 필터가 변경될 때마다 게임 목록을 필터링
  useEffect(() => {
    let currentGames = [...games]; // 원본 게임 배열을 복사하여 필터링을 시작

    // 1. URL에서 넘어온 검색어(`initialQuery`)로 게임을 필터링
    if (initialQuery) {
      currentGames = currentGames.filter(game => 
        fuzzyMatch(game.name, initialQuery)
      );
    }

    // 2. Filter 컴포넌트에서 전달받은 `activeFilters`를 적용
    if (activeFilters) {
      const { ownedStatus, categories, size, ratings, minPrice, maxPrice } = activeFilters;

      // 2.1. 보유 여부 필터
      if (ownedStatus === 'owned') {
        currentGames = currentGames.filter(game => game.owned);
      } else if (ownedStatus === 'not_owned') {
        currentGames = currentGames.filter(game => !game.owned);
      }

      // 2.2. 카테고리 필터 (선택된 카테고리가 1개 이상일 때)
      if (categories && categories.length > 0) {
        currentGames = currentGames.filter(game =>
          categories.some(cat => game.category && game.category.toLowerCase().includes(cat.toLowerCase()))
        );
      }

      if (size) { // size 필터 값이 있을 때만 적용 (예: 'under1gb', '1to10gb', 'over10gb')
        currentGames = currentGames.filter(game => {
          const gameSize = game.size; // 게임의 실제 용량 (숫자)

          if (size === 'under1gb') {
            return gameSize < 1;
          } else if (size === '1to10gb') {
            return gameSize >= 1 && gameSize <= 10;
          } else if (size === 'over10gb') {
            return gameSize > 10;
          }
          return true; // 필터 옵션이 '모두'이거나 일치하는 용량 범주가 없으면 모든 게임 포함
        });
      }

      // 2.3. 별점 필터 (선택된 별점이 1개 이상일 때)
      if (ratings && ratings.length > 0) {
        currentGames = currentGames.filter(game =>
          ratings.includes(game.starscore)
        );
      }
      
      // 2.4. 가격 필터
      if (minPrice !== '' && !isNaN(minPrice)) {
        currentGames = currentGames.filter(game => game.price >= minPrice);
      }
      if (maxPrice !== '' && !isNaN(maxPrice)) {
        currentGames = currentGames.filter(game => game.price <= maxPrice);
      }

    }

    // 필터링된 게임들의 이름을 추출하여 상태를 업데이트합니다.
    setFilteredGameNames(currentGames.map(game => game.name));

  }, [initialQuery, games, activeFilters]); // `initialQuery`, `games`, `activeFilters`가 변경될 때마다 실행

  // Filter 컴포넌트로부터 필터 값을 받을 콜백 함수
  const handleApplyFilters = (filters) => {
    setActiveFilters(filters); // Filter 컴포넌트에서 전달받은 필터 값을 업데이트
  };

  return (
    <>
      <Header />
      <Nav />
      <Filter onApplyFilters={handleApplyFilters} />
      <ParticularSearch gameNamesToDisplay={filteredGameNames} currentQuery={initialQuery} />
    </>
  )
}

export default Search
