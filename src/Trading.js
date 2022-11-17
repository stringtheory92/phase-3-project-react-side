import React, { useState, useEffect } from "react";

function Trading({ userState, toggleLogIn, isLoggedIn }) {
  const [stockList, setStockList] = useState([]);
  const [user, setUser] = useState({
    userId: "",
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
    selectedStock: { ticker: "Choose a stock", stock_price: { price: 0 } },

    // totalPrice: "",
  });
  console.log("formData: ", formData);

  //============== DYNAMIC DROPDOWNS =======================================================

  let availableStocksDropDown =
    stockList.length === 0 ? (
      <option>No Matches</option>
    ) : (
      stockList.map((stock) => (
        <option
          key={stock.id}
          // Can't have an object as the value of an option (otherwise I would pass in the whole {stock})
          value={stock.id}
        >{`${stock.ticker} ► $${stock.stock_price.price}`}</option>
      ))
    );

  //=============== USE EFFECTS ================================================================

  const updateUser = (data) => {
    const { user_name: userName, password, balance, portfolio, id } = data;

    let newBalance;
    if (user.balance.length > 0) {
      if (balance !== user.balance) {
        newBalance = user.balance;

        const configObjPATCH = {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({
            balance: newBalance,
          }),
        };
        const configObjPOST = {
          method: "POST",
          headers: {
            "content-type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({
            user_id: id,
            stock_id: "x", // need to pass stock id in to updateUser (perhaps from formData.selectedStock)
          }),
        };
        // Update user with new balance
        fetch(
          `http://localhost:9292/users/${localStorage.getItem("username")}`,
          configObjPATCH
        )
          .then((r) => r.json())
          .then((data) => console.log("user:patchBalance: ", data));
        //Update user with new portfolio (POST)
        // .then(fetch(`/users/:id/userstocks_joins`, configObjPOST));
      }
    } else newBalance = balance;

    setUser({
      ...user,
      userName: userName,
      password: password,
      balance: newBalance,
      userPortfolio: portfolio,
      userId: id,
    });
  };
  console.log("user in state: ", user);

  useEffect(() => {
    fetch(
      `http://localhost:9292/users/${localStorage.getItem(
        "username"
      )}/userstocks_joins`
    )
      .then((resp) => resp.json())
      .then((data) => {
        console.log("user data: ", data);
        updateUser(data);
      });
  }, [user.balance, isLoggedIn]);

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
          console.log("stockList in fetch: ", data);
          // console.log("data.length: ", data.length);
          // if (data.length > 0) {
          // console.log("true: ", data.length);
          setStockList(data);
          // }
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
    console.log("selectedStock: ", typeof e.target.value, e.target.value);

    //Because I can't pass in the whole {stock} object as an option value,
    // I must find the stock object by id from the stockList
    const focusStockId = Number(e.target.value);
    const focusStock = stockList.find((stock) => stock.id === focusStockId);

    setFormData({ ...formData, selectedStock: focusStock });
  };
  const handleBuySubmit = () => {
    //purchase price
    const purchasePrice =
      formData.selectedStock.stock_price.price * Number(formData.userAmount);
    //set user.balance in state, update (patch) user's balance, then post to userstocks_joins table
    setUser({ ...user, balance: user.balance - purchasePrice });
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

        <form style={formStyles} onSubmit={handleBuySubmit}>
          <label htmlFor="user-tokens" style={swapText}>
            {`${user.userName}'s trading account`}
          </label>
          <div style={inputDiv}>
            <div style={dropDownInput}>{`Cash Balance: $${user.balance}`}</div>
            {/* <input
              style={numberInput}
              type="number"
              value={formData.userAmount}
              onChange={(e) => handleUserAmountChange(e)}
            /> */}
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
            Amount of shares to purchase:
          </label>
          <div style={inputDiv}>
            <input
              style={numberInput}
              type="number"
              value={formData.userAmount}
              onChange={(e) => handleUserAmountChange(e)}
            />
            <select
              style={dropDownInput}
              name="stockList"
              id="stockList"
              value={formData.selectedStock}
              onChange={(e) => handleSelectedStockChange(e)}
            >
              <option value="1">{`${formData.selectedStock.ticker}`}</option>
              {availableStocksDropDown}
            </select>
          </div>
          <div style={infoDiv}>
            <div style={dropDownInput}>{`Total Price: $${
              // formData.selectedStock.length > 0
              //   ? formData.selectedStock.stock_price.price *
              //     Number(formData.userAmount)
              //   : 0
              formData.selectedStock.stock_price.price *
              Number(formData.userAmount)
            }`}</div>
            <div style={dropDownInput}>{`Balance Remaining: $${
              user.balance -
              formData.selectedStock.stock_price.price *
                Number(formData.userAmount)
            }`}</div>
          </div>

          <button type="submit" style={confirmBtn}>
            BUY
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
