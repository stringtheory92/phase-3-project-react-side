import React, { useState, useEffect } from "react";

function Trading({ userState, toggleLogIn, isLoggedIn }) {
  const [stockList, setStockList] = useState([]);
  const [user, setUser] = useState({
    userName: "",
    password: "",
    balance: "",
    userPortfolio: [],
  });
  const [formData, setFormData] = useState({
    // userAmount: control for amount (in quantity of shares) to purchase
    // stockSearch: the control for the search input
    userAmount: "",
    stockSearch: "",
    selectedStock: "",
  });
  console.log("formData: ", formData);

  //============== DYNAMIC DROPDOWNS =======================================================

  let availableStocksDropDown =
    stockList.length === 0 ? (
      <option>loading...</option>
    ) : (
      stockList.map((stock) => (
        <option
          key={stock.id}
          value={stock}
        >{`${stock.ticker} ► $${stock.stock_price.price}`}</option>
      ))
    );

  //=============== USE EFFECTS ================================================================

  const updateUser = (data) => {
    const { user_name: userName, password, balance } = data;

    let newBalance;
    if (user.balance.length > 0) {
      if (balance !== user.balance) newBalance = user.balance;
    } else newBalance = balance;

    setUser({
      ...user,
      userName: userName,
      password: password,
      balance: newBalance,
    });

    // build user's portfolio based on data.stocks array (reduce to array of objects: { id: id, ticker: ticker, shares: numberOfOccurrences})
    console.log("user stocks: ", data.stocks);
    let portfolioArray = [];
    for (let stock in data.stocks) {
      if (portfolioArray.length > 0) {
        for (let item of portfolioArray) {
          if (item.id === stock.id) {
            return (item.shares += 1);
          }
        }
        console.log("will it hit?");
      } else {
        console.log("pushing");
        portfolioArray.push({ id: stock.id, ticker: stock.ticker, shares: 1 });
      }
    }
    // setUser({ ...user, userPortfolio: portfolioArray });
    console.log("portfolioArray: ", portfolioArray);
  };
  console.log("user in state: ", user);
  // console.log("user: ", user);
  // console.log("isLoggedIn: ", isLoggedIn);
  useEffect(() => {
    // console.log("in UE: userName?", user.userName.length > 0);
    // if (user.userName.length > 0) {
    fetch(
      `http://localhost:9292/users/${localStorage.getItem(
        "username"
      )}/userstocks_joins`
    )
      .then((resp) => resp.json())
      .then((data) => {
        // console.log("trading user: ", data);
        // const newBalance = (balance === user.balance) ? balance : user.balance
        // const { user_name: userName, password, balance } = data;
        console.log("user data: ", data);
        // updateUser(data);
      });
  }, [user.balance, isLoggedIn]);

  // console.log("user: ", user);
  // console.log(
  //   "(Trading) Local Storage User: ",
  //   localStorage.getItem("username")
  // );

  useEffect(() => {
    console.log("formData.stockSearch.length: ", formData.stockSearch.length);
    if (formData.stockSearch.length > 0) {
      fetch(`http://localhost:9292/stocks/${formData.stockSearch}`)
        .then((r) => r.json())
        .then((data) => {
          // console.log("data: ", data);
          // if (typeof data === Array) setStockList(data);
          // else setStockList([data]);
          setStockList(data);
        });
    } else {
      // console.log("empty search");
      fetch(`http://localhost:9292/stocks`)
        .then((r) => r.json())
        .then((data) => {
          // console.log("data: ", data);
          // console.log("data.length: ", data.length);
          if (data.length > 0) {
            // console.log("true: ", data.length);
            setStockList(data);
          }
        })
        .then(console.log("stockList: ", stockList));
    }
  }, [formData.stockSearch]);
  // console.log("stockList: ", stockList);
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
  const handleSelectedStockChange = (e) => {
    setFormData({ ...formData, selectedStock: e.target.value });
  };

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
            {/* <div>{(formData.userAmount.length === 0) ?  :}</div> */}
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
              name="stockList"
              id="stockList"
              value={formData.selectedStock}
              onChange={(e) => handleSelectedStockChange(e)}
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
