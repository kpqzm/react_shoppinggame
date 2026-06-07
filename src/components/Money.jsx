import { useContext } from "react";
import { UserInformation } from "../App"

function Money() {
    const {money} = useContext(UserInformation);

  return (
    <>
      {money.toLocaleString()}원
    </>
  )
}

export default Money
