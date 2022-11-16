import React, { useState, useEffect } from "react";

function Trading({ userState, toggleLogIn, isLoggedIn }) {
  const [user, setUser] = useState({
    userName: "",
    password: "",
    balance: "",
  });
  // localStorage.setItem({key: value})

  const updateUser = ({ user_name: userName, password, balance }) => {
    console.log("balance: ", balance);
    console.log("user.balance: ", user.balance);
    let newBalance;
    // if ((user.balance = "") || balance === user.balance) {
    //   newBalance = balance;
    //   console.log("newBalance: ", newBalance);
    // } else {
    //   newBalance = user.balance;
    //   console.log("in else: ", newBalance);
    // }
    if (user.balance.length > 0) {
      if (balance !== user.balance) newBalance = user.balance;
    } else newBalance = balance;

    setUser({ userName: userName, password: password, balance: newBalance });
  };
  // console.log("user: ", user);
  console.log("isLoggedIn: ", isLoggedIn);
  useEffect(() => {
    // console.log("in UE: userName?", user.userName.length > 0);
    // if (user.userName.length > 0) {
    fetch(`http://localhost:9292/users/${localStorage.getItem("username")}`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log("trading user: ", data);
        // const newBalance = (balance === user.balance) ? balance : user.balance
        // const { user_name: userName, password, balance } = data;
        updateUser(data);
      });
  }, [user.balance, isLoggedIn]);

  console.log("user: ", user);
  console.log(
    "(Trading) Local Storage User: ",
    localStorage.getItem("username")
  );

  // const handleClick = () => {
  //   toggleLogIn();
  //   localStorage.clear();
  // };

  const userDropdown = <option value="1">1</option>;

  const availableStocksDropDown = <option value="1">1</option>;
  // ==================================================================================
  // ==================================================================================
  const mainPage = {
    backgroundColor: "#222",
    color: "white",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
  };

  const formStyles = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#444",
    width: "30rem",
    height: "30rem",
    padding: "3rem",
    color: "#b0afae",
    boxShadow: "0 0 4px #999",
  };

  const swapText = {
    textAlign: "left",
  };

  const inputDiv = {
    backgroundColor: "#333",
    borderRadius: "5px",
    padding: "0.4rem ",
  };

  const numberInput = {
    padding: "0.5rem 0.5rem",
    borderRadius: "6px",
    border: "none",
    outline: "none",
    backgroundColor: "#333",
    color: "#b0afae",
  };

  const dropDownInput = {
    backgroundColor: "#222",
    borderRadius: "6px",
    padding: "0.5rem 0.5rem",
    color: "#b0afae",
    border: "1px solid #555",
  };

  const infoDiv = {
    marginTop: "1rem",
    backgroundColor: "#333",
    borderRadius: "5px",
    padding: "0.4rem ",
  };

  const confirmBtn = {
    width: "8rem",
    backgroundColor: "dodgerBlue",
    padding: "0.5rem 0.9rem",
    borderRadius: "10px",
    ouline: "none",
    border: "none",
    color: "white",
  };

  //==================================================================================
  //==================================================================================

  return (
    <div>
      <div style={mainPage}>
        <h2>Trading</h2>

        <form style={formStyles}>
          <label htmlFor="user-tokens" style={swapText}>
            Swap From:
          </label>
          <div style={inputDiv}>
            <input
              style={numberInput}
              type="number"
              // value={userAmount}
              // onChange={(e) => handleUserAmountChange(e)}
            />
            <select
              style={dropDownInput}
              name=""
              id="user-tokens"
              // value={userSelect}
              // onChange={(e) => handleUserSelectChange(e)}
            >
              {userDropdown}
            </select>
          </div>

          <label htmlFor="lps" style={swapText}>
            Swap To:
          </label>
          <div style={inputDiv}>
            <input
              style={numberInput}
              type="number"
              name=""
              id=""
              // value={lpsAmount}
              // onChange={(e) => handleLpsAmountChange(e)}
            />
            <select
              style={dropDownInput}
              name=""
              id="lps"
              // value={lpsSelect}
              // onChange={(e) => handleLpsChange(e)}
            >
              {availableStocksDropDown}
            </select>
          </div>
          <div style={infoDiv}>
            <p>Exchange Rate</p>
            <p>Slippage</p>
            <p>Minimum received</p>
          </div>

          <button type="submit" style={confirmBtn}>
            Confirm Trade
          </button>
        </form>
      </div>
      {/* <button className="logoutButton" onClick={handleClick}>
        Log Out
      </button> */}
    </div>
  );
}

export default Trading;
