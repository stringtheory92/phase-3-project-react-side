import React, { useState, useEffect } from "react";

function SellForm({
  stockList,
  user,
  buySell,
  handleSellSubmit,
  generateDELETEConfig,
  formData,
  handleSelectedStockChange,
  handleStockSearchChange,
  handleUserAmountChange,
  userStocksDropDown,
}) {
  //   const [formData, setFormData] = useState({
  //     // userAmount: control for amount (in quantity of shares) to purchase
  //     // stockSearch: the control for the search input
  //     userAmount: 0,
  //     stockSearch: "",
  //     selectedStock: { ticker: "Choose a stock", stock_price: { price: 0 } },

  //     // totalPrice: "",
  //   });
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
    outline: "none",
    border: "none",
    color: "white",
  };

  //==================================================================================
  //==================================================================================

  return (
    <div>
      <h1>Sell</h1>
      <form style={formStyles} onSubmit={handleSellSubmit}>
        <label htmlFor="user-tokens" style={swapText}>
          {`${user.userName}'s trading account`}
        </label>

        <label htmlFor="stock_search">Search Available Stocks</label>
        <input
          type="text"
          name="stockSearch"
          id="stockSearch"
          value={formData.stockSearch}
          onChange={handleStockSearchChange}
        />
        <label htmlFor="lps" style={swapText}>
          Amount of shares to sell:
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
            {userStocksDropDown}
          </select>
        </div>
        <div style={dropDownInput}>{`Balance: $${Number(user.balance).toFixed(
          2
        )}`}</div>
        <div style={infoDiv}>
          <div style={dropDownInput}>{`Total Sale Price: $${
            // formData.selectedStock.length > 0
            //   ? formData.selectedStock.stock_price.price *
            //     Number(formData.userAmount)
            //   : 0
            formData.selectedStock.stock_price.price *
            Number(formData.userAmount)
          }`}</div>
          <div style={dropDownInput}>{`New Balance: $${(
            Number(user.balance) +
            formData.selectedStock.stock_price.price *
              Number(formData.userAmount)
          ).toFixed(2)}`}</div>
          {/* <div style={dropDownInput}>{`Balance: $${(
            user.balance -
            formData.selectedStock.stock_price.price *
              Number(formData.userAmount)
          ).toFixed(2)}`}</div> */}
        </div>
        {/* <div style={inputDiv}>
      <div
        style={dropDownInput}
      >{`Cash Balance: $${user.balance.toFixed(2)}`}</div>
      
    </div> */}

        <button type="submit" style={confirmBtn}>
          {buySell ? "BUY" : "SELL"}
        </button>
      </form>
    </div>
  );
}

export default SellForm;
