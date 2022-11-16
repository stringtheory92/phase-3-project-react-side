import React, { useState, useEffect } from "react";

function Trading({ userState, toggleLogIn, isLoggedIn }) {
  const [stockList, setStockList] = useState([]);
  const [user, setUser] = useState({
    userName: "",
    password: "",
    balance: "",
  });
  const [formData, setFormData] = useState({
    userAmount: "",
    stockSearch: "",
  });
  //============== DYNAMIC DROPDOWNS =======================================================

  // let availableStocksDropDown =
  //   stockList.length === 0 ? (
  //     <option>loading...</option>
  //   ) : (
  //     stockList.map((stock) => <option key={stock.id}>{stock.ticker}</option>)
  //   );

  // localStorage.setItem({key: value})
  //=============== USE EFFECTS ================================================================
  const updateUser = ({ user_name: userName, password, balance }) => {
    console.log("balance: ", balance);
    console.log("user.balance: ", user.balance);

    let newBalance;
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

  useEffect(() => {
    // if ((formData.stockSearch.length = 0)) {
    //   fetch(`http://localhost:9292/stocks`)
    //     .then((r) => r.json())
    //     .then((data) => {
    //       console.log("data: ", data);
    //       setStockList(data);
    //     });
    // } else {
    //   fetch(`http://localhost:9292/stocks/${formData.stockSearch}`)
    //     .then((r) => r.json())
    //     .then((data) => {
    //       console.log("data: ", data);
    //       setStockList(data);
    //     });
    // }
    console.log("formData.stockSearch.length: ", formData.stockSearch.length);
    if (formData.stockSearch.length > 0) {
      fetch(`http://localhost:9292/stocks/${formData.stockSearch}`)
        .then((r) => r.json())
        .then((data) => {
          console.log("data: ", data);
          setStockList([data]);
        });
    } else {
      fetch(`http://localhost:9292/stocks`)
        .then((r) => r.json())
        .then((data) => {
          console.log("data: ", data);
          setStockList(data);
        });
    }
  }, [formData.stockSearch]);
  console.log("stockList: ", stockList);
  //=============== HANDLERS ==============================================================
  // const handleClick = () => {
  //   toggleLogIn();
  //   localStorage.clear();
  // };
  const handleUserAmountChange = (e) => {
    setFormData({ ...formData, userAmount: e.target.value });
  };
  const handleStockSearchChange = (e) => {
    setFormData({ ...formData, stockSearch: e.target.value });
  };

  let availableStocksDropDown =
    stockList.length === 0 ? (
      <option>loading...</option>
    ) : (
      stockList.map((stock) => <option key={stock.id}>{stock.ticker}</option>)
    );

  const userDropdown = <option value="1">1</option>;
  // const availableStocksDropDown = <option></option>;
  // const availableStocksDropDown = stockList.map((stock) => (
  //   <option value={stock.ticker}>{stock.ticker}</option>
  // ));

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
            <div style={dropDownInput}>{`Cash Balance: $${user.balance}`}</div>
            <input
              style={numberInput}
              type="number"
              value={formData.userAmount}
              onChange={(e) => handleUserAmountChange(e)}
            />
          </div>

          <label htmlFor="stock_search">Search Available Stocks</label>
          <input
            type="text"
            name="stockSearch"
            id="stockSearch"
            value={formData.stockSearch}
            onChange={handleStockSearchChange}
          />
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
