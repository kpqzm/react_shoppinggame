import Header from "../components/Header"
import Mylibrary from "../components/Mylibrary"
import { useEffect } from "react";

function Library() {

  useEffect(() => { document.title = "보유중인 게임"; }, []);

  return (
    <>
      <Header />
      <Mylibrary />
    </>
  )
}

export default Library
