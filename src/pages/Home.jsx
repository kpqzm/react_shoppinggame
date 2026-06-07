import Header from "../components/Header"
import Nav from "../components/Nav"
import BoxContainer from "../components/BoxContainer"
import { useEffect } from "react";

function Home() {
  useEffect(() => { document.title = "게임 쇼핑 사이트"; }, []);

  return (
    <>
      <Header />
      <Nav />
      <BoxContainer />
    </>
  )
}

export default Home
