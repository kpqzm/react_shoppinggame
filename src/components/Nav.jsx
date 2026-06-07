import "./Nav.css"
import Button from "./Button"
import glasses from "../assets/glasses.png"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useState, useEffect } from "react"

function Nav() {
  const navi = useNavigate();
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('query') || '';


  useEffect(() => {
    if(initialQuery) {
      setSearchTerm(initialQuery);
    }
  }, [initialQuery]);
  

  const goSearch = () => {
    if (searchTerm.trim() !== '') {
      // URL 쿼리 파라미터로 검색어 전달
      navi(`/Search?query=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      // 검색어가 없을 경우 
       alert("검색어를 입력해주세요!");
    }
  }

  // input 변경 핸들러
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  }

  // 엔터 키 입력 핸들러 (검색 기능)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      goSearch();
    }
  }

  const goHome = () => {
    navi("/");
  }

  const goLibrary = () => {
    navi("/Library");
  }

  return (
    <>
      <div className="Nav">
        <div className="nav_home">
          <Button onClick={goHome} text={"홈"} type={"Button"}/>
        </div>
        <div className="nav_mygame">
          <Button onClick={goLibrary} text={"내 게임"} type={"Button"}/>
        </div>
        <input value={searchTerm} onChange={handleInputChange} onKeyPress={handleKeyPress} placeholder="검색어를 입력하세요"/>
        <div className="nav_search">
          <Button onClick={goSearch} text={<img src={glasses} style={{height: "30px"}}/>} type={"Button"}/>
        </div>
      </div>
    </>
  )
}

export default Nav
