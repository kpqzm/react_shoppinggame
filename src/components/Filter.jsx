import { useState } from "react"; // useState 훅 임포트
import "./Filter.css";
import Button from "./Button";

function Filter({onApplyFilters}) {
    const [ownedStatus, setOwnedStatus] = useState(''); // 'owned', 'not_owned', 또는 '' (모두)

    // 2. 카테고리 (체크박스)
    const [selectedCategories, setSelectedCategories] = useState([]); // ['RPG', 'Action', ...]

    // 3. 용량 (라디오 버튼 - 예시이므로 실제 용량 기준은 게임 데이터에 있어야 함)
    const [selectedSize, setSelectedSize] = useState(''); // 'under1gb', '1to10gb', 'over10gb', 또는 ''

    // 4. 별점 (체크박스)
    const [selectedRatings, setSelectedRatings] = useState([]); // ['★', '★★', ...] (게임 데이터의 starscore 형식에 맞춤)

    // 5. 가격 (숫자 입력)
    const [minPrice, setMinPrice] = useState(''); // 최소 가격
    const [maxPrice, setMaxPrice] = useState(''); // 최대 가격

    // --- 이벤트 핸들러 ---

    // 보유/미보유 라디오 버튼 변경 핸들러
    const handleOwnedChange = (e) => {
        setOwnedStatus(e.target.value);
    };

    // 카테고리 체크박스 변경 핸들러
    const handleCategoryChange = (e) => {
        const { value, checked } = e.target;
        setSelectedCategories(prevCategories =>
        checked
            ? [...prevCategories, value] // 체크되면 추가
            : prevCategories.filter(cat => cat !== value) // 체크 해제되면 제거
        );
    };

    // 용량 라디오 버튼 변경 핸들러
    const handleSizeChange = (e) => {
        setSelectedSize(e.target.value);
    };

    // 별점 체크박스 변경 핸들러
    const handleRatingChange = (e) => {
        const { value, checked } = e.target;
        setSelectedRatings(prevRatings =>
        checked
            ? [...prevRatings, value] // 체크되면 추가
            : prevRatings.filter(rating => rating !== value) // 체크 해제되면 제거
        );
    };

    // 최소 가격 입력 변경 핸들러
    const handleMinPriceChange = (e) => {
        // 숫자가 아닌 입력 방지 및 숫자로 변환
        setMinPrice(e.target.value === '' ? '' : Number(e.target.value));
    };

    // 최대 가격 입력 변경 핸들러
    const handleMaxPriceChange = (e) => {
        // 숫자가 아닌 입력 방지 및 숫자로 변환
        setMaxPrice(e.target.value === '' ? '' : Number(e.target.value));
    };

    // 검색 버튼 클릭 핸들러
    const handleSearchClick = () => {
        // 모든 현재 필터 상태를 객체로 묶어서 부모 컴포넌트로 전달
        const filters = {
        ownedStatus,
        categories: selectedCategories,
        size: selectedSize,
        ratings: selectedRatings,
        minPrice,
        maxPrice,
        };
        // onApplyFilters prop이 있다면 호출 (Search 페이지에서 이 필터들을 받음)
        if (onApplyFilters) {
        onApplyFilters(filters);
        }
        console.log("Applying Filters:", filters);
    };

    const handleResetClick = () => {
    // 모든 필터 상태를 초기값으로 되돌립니다.
    setOwnedStatus('');
    setSelectedCategories([]);
    setSelectedSize('');
    setSelectedRatings([]);
    setMinPrice('');
    setMaxPrice('');

    // 필터 초기화 후, 부모 컴포넌트에 빈 필터 값을 전달하여 검색 결과도 초기화합니다.
    if (onApplyFilters) {
      onApplyFilters({
        ownedStatus: '',
        categories: [],
        size: '',
        ratings: [],
        minPrice: '',
        maxPrice: '',
      });
    }
    console.log("Filters reset to initial state.");
  };

  return (
    <>
    <div className="Filter">
        <div className="filter_section">
            <p>보유 여부</p>
            <div>
                <label className="categoryLabel">
                <input
                    type="radio"
                    name="owned"
                    value="owned"
                    checked={ownedStatus === 'owned'}
                    onChange={handleOwnedChange}
                />보유
                </label>
                <label className="categoryLabel">
                <input
                    type="radio"
                    name="owned"
                    value="not_owned"
                    checked={ownedStatus === 'not_owned'}
                    onChange={handleOwnedChange}
                />미보유
                </label>
                <label>
                <input
                    type="radio"
                    name="owned"
                    value="" // '모두' 또는 '선택 안 함'을 위한 빈 값
                    checked={ownedStatus === ''}
                    onChange={handleOwnedChange}
                />모두
                </label>
            </div>
        </div>
        <div className="filter_section">
            <p>카테고리</p>
            <div>
                {/* 게임 데이터에 있는 실제 카테고리들을 기반으로 체크박스를 동적으로 생성할 수 있습니다. */}
                {/* 여기서는 예시로 하드코딩된 카테고리를 사용합니다. */}
                {['MOBA', 'RPG', 'Action', 'FPS', 'Party', 'Puzzle', 'Adventure', 'Co-op', 'Platformer', 'Racing', 'Horror', 'Survival', 'Open World', 'Battle Royale', 'Simulation', 'MMORPG'].map(category => (
                <label style={{marginRight: "13px"}} className="categoryLabel" key={category}>
                    <input
                    type="checkbox"
                    value={category}
                    checked={selectedCategories.includes(category)}
                    onChange={handleCategoryChange}
                    />{category}
                </label>
                ))}
            </div>
        </div>
        <div className="filter_section">
            <p>용량 (GB)</p>
            <div>
                <label className="categoryLabel">
                <input
                    type="radio"
                    name="size"
                    value="under1gb"
                    checked={selectedSize === 'under1gb'}
                    onChange={handleSizeChange}
                /> 1GB 이하
                </label>
                <label className="categoryLabel">
                <input
                    type="radio"
                    name="size"
                    value="1to10gb"
                    checked={selectedSize === '1to10gb'}
                    onChange={handleSizeChange}
                /> 1~10GB
                </label>
                <label className="categoryLabel">
                <input
                    type="radio"
                    name="size"
                    value="over10gb"
                    checked={selectedSize === 'over10gb'}
                    onChange={handleSizeChange}
                /> 10GB 이상
                </label>
                <label>
                <input
                    type="radio"
                    name="size"
                    value="" // '모두' 또는 '선택 안 함'을 위한 빈 값
                    checked={selectedSize === ''}
                    onChange={handleSizeChange}
                />모두
                </label>
            </div>
        </div>
        <div className="filter_section">
            <p>별점</p>
            <div>
                {/* 별점은 ★의 개수로 문자열 비교를 해야 할 수 있습니다. */}
                {['★', '★★', '★★★', '★★★★', '★★★★★'].map((rating) => (
                <label className="categoryLabel" key={rating}>
                    <input
                    type="checkbox"
                    value={rating}
                    checked={selectedRatings.includes(rating)}
                    onChange={handleRatingChange}
                    />{rating}
                </label>
                ))}
            </div>
        </div>
        <div className="filter_section">
            <p>가격 (원)</p>
            <div>
                <input className="categoryLabel"
                type="number"
                placeholder="최소 가격"
                value={minPrice}
                onChange={handleMinPriceChange}
                />
                ~
                <input style={{marginLeft: "10px"}}
                type="number"
                placeholder="최대 가격"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                />
            </div>
        </div>
        <div className="filter_section">
            <p>상세검색</p>
            <div>
                <Button onClick={handleSearchClick} text={"재검색"} type={"secondary"} />
                <Button onClick={handleResetClick} text={"초기화"} type={"handleResetClick"} />
            </div>
        </div>
    </div>
    </>
  )
}

export default Filter
