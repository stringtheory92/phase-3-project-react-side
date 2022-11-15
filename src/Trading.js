import React, { useState, useEffect } from "react";

function Trading({ userState }) {
  const [userBalance, setUserBalance] = useState(0)
  const [user]
  // localStorage.setItem({key: value})

  // console.log("userState: ", userState);
  console.log("Local Storage User: ", localStorage.getItem("username"));

  return <div>Trading</div>;
}

export default Trading;
