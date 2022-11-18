import React, { useState, useEffect } from "react";
import BuyForm from "./BuyForm";
import SellForm from "./SellForm";

// NEED TO WORK ON UPDATING PORTFOLIO IN DOM ON PURCHASE
function Trading({ userState, toggleLogIn, isLoggedIn }) {
  const [stockList, setStockList] = useState([]);
  const [buySell, setBuySell] = useState(true); // buy = true, sell = false
  const [user, setUser] = useState({
    userId: "",
    userName: "",
    password: "",
    balance: 0,
    userPortfolio: [],
    // userId: userState.id,
    // userName: userState.user_name,
    // password: userState.password,
    // balance: userState.balance,
    // userPortfolio: userState.portfolio,
  });
  const [formData, setFormData] = useState({
    // userAmount: control for amount (in quantity of shares) to purchase
    // stockSearch: the control for the search input
    userAmount: 0,
    stockSearch: "",
    selectedStock: { ticker: "Choose a stock", stock_price: { price: 0 } },

    // totalPrice: "",
  });
  // console.log("formData: ", formData);

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
        >{`${stock.ticker}   ⑊   $${stock.stock_price.price}`}</option>
      ))
    );

  let userStocksDropDown = user.userPortfolio.map((stock) => {
    const stockItem = stockList.find(
      (listedStock) => stock.id === listedStock.id
    );
    const stockPrice = stockItem.stock_price
      ? stockItem.stock_price.price
      : "none";

    console.log("stock price: ", stockPrice);
    return (
      <option
        key={stock.id}
        value={stock.id}
      >{`${stock.ticker} - available: ${stock.count}  @  $${stockPrice}`}</option>
    );
  });

  //=============== USE EFFECTS ================================================================

  const deleteUserStocks = (configObjDELETE, user_id, stock_id) => {
    console.log("inDelete");
    console.log("formData.userAmount: ", formData.userAmount);
    // let soldStocks = 1;
    // while (soldStocks >= Number(formData.userAmount)) {
    //   fetch(
    //     `http://localhost:9292/userstocks_joins/${user_id}/${stock_id}`,
    //     configObjDELETE
    //   )
    //     .then((r) => r.json())
    //     .then((data) => {
    //       console.log("updated stock data: ", data);
    //       updateUser({ ...user, userPortfolio: data.portfolio });
    //       soldStocks += 1;
    //     });
    fetch(
      `http://localhost:9292/userstocks_joins/${user_id}/${stock_id}/${formData.userAmount}`,
      configObjDELETE
    )
      .then((r) => r.json())
      .then((data) => {
        console.log("updated stock data: ", data);
        updateUser({ ...user, userPortfolio: data.portfolio });
      });
  };
  console.log("buySell: ", buySell);
  const updateUser = (data) => {
    const { user_name: userName, password, balance, portfolio, id } = data;

    let newBalance;
    // console.log("user.balance: ", user.balance);
    if (user.balance > 0) {
      // console.log("line 45");
      if (balance !== Number(user.balance)) {
        console.log("update price and portfolio on backend");
        newBalance = user.balance;

        //===== CONFIG OBJ'S ==========
        // const configObjPATCH = {
        //   method: "PATCH",
        //   headers: {
        //     "content-type": "application/json",
        //     accept: "application/json",
        //   },
        //   body: JSON.stringify({
        //     balance: Number(user.balance),
        //   }),
        // };

        // const configObjPOST = generatePOSTConfig();
        // const configObjDELETE = generateDELETEConfig();

        // const updateUser = (data) => {
        //   const { user_name: userName, password, balance, portfolio, id } = data;

        //   let newBalance;
        //   // console.log("user.balance: ", user.balance);
        //   if (user.balance > 0) {
        //     // console.log("line 45");
        //     if (balance !== Number(user.balance)) {
        //       console.log("update price and portfolio on backend");
        //       newBalance = user.balance;

        //===== CONFIG OBJ'S ==========
        const configObjPATCH = {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({
            balance: Number(user.balance),
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
            stock_id: formData.selectedStock.id, // need to pass stock id in to updateUser (perhaps from formData.selectedStock)
          }),
        };
        const configObjDELETE = {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            accept: "application/json",
          },
        };

        //====== UPDATE USER BALANCE AND STOCK HOLDINGS ======
        // Update user with new balance
        fetch(
          `http://localhost:9292/users/${localStorage.getItem("username")}`,
          configObjPATCH
        )
          .then((r) => r.json())
          .then((data) => {
            console.log("user:patchBalance: ", data);
            buySell
              ? fetch(
                  `http://localhost:9292/users/${localStorage.getItem(
                    "username"
                  )}/userstocks_joins/${formData.userAmount}`,
                  configObjPOST
                )
                  .then((r) => r.json())
                  .then((data) => {
                    console.log("updated stock data: ", data);
                    updateUser({
                      ...user,
                      userPortfolio: data.portfolio,
                    });
                  })
              : deleteUserStocks(
                  configObjDELETE,
                  id,
                  formData.selectedStock.id
                );
            // fetch(
            //     `http://localhost:9292/users/${localStorage.getItem(
            //       "username"
            //     )}/userstocks_joins`,
            //     configObjDELETE
            //   )
            //     .then((r) => r.json())
            //     .then((data) => {
            //       console.log("updated stock data: ", data);
            //       updateUser({ ...user, portfolio: data.portfolio });
            //     });
          });
      }
    } else {
      newBalance = balance;

      setUser({
        ...user,
        userName: userName,
        password: password,
        userPortfolio: portfolio,
        balance: balance.toFixed(2),
        userId: id,
      });
    }
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

  console.log("stockList: ", stockList);
  useEffect(() => {
    console.log("formData.stockSearch.length: ", formData.stockSearch.length);
    if (formData.stockSearch.length > 0) {
      fetch(`http://localhost:9292/stocks/${formData.stockSearch}`)
        .then((r) => r.json())
        .then((data) => {
          console.log("data: ", data);
          // if (typeof data === Array) setStockList(data);
          // else setStockList([data]);
          setUser({ ...user, userPortfolio: data.portfolio });
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
    // }, []);
  }, [formData.stockSearch]);
  // console.log("stockList: ", stockList);
  //=============== HANDLERS ==============================================================

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
  const handleBuySubmit = (e) => {
    e.preventDefault();
    //purchase price
    const purchasePrice =
      formData.selectedStock.stock_price.price * Number(formData.userAmount);
    console.log("user.balance: ", user.balance);
    console.log("purchasePrice: ", purchasePrice);
    const remaining = user.balance - purchasePrice;
    //set user.balance in state, update (patch) user's balance, then post to userstocks_joins table
    if (remaining >= 0) setUser({ ...user, balance: remaining });
    else alert("Insufficient Funds");
  };
  const handleSellSubmit = (e) => {
    e.preventDefault();

    const sellPrice =
      formData.selectedStock.stock_price.price * Number(formData.userAmount);

    const total = Number(user.balance) + sellPrice;
    console.log("user.balance: ", user.balance);
    console.log("sellPrice: ", sellPrice);
    setUser({ ...user, balance: total });
  };
  const handleBuySellToggle = () => {
    setBuySell((buySell) => !buySell);
  };

  // console.log(user.userPortfolio);

  // ==================================================================================
  // ==================================================================================
  const mainPage = {
    backgroundColor: "#222",
    // color: "white",
    color: "#d4d2cf",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
  };

  const tradeHeader = {
    fontSize: "3rem",
    fontWeight: "400",
    letterSpacing: "0.4rem",
    color: "white",
  };

  const buySellBtn = {
    backgroundColor: "#222",
    color: "white",
    marginBottom: "2rem",
    padding: "0.3rem 0.7rem",
    border: "1px solid white",
  };

  //==================================================================================
  //==================================================================================

  return (
    <div>
      <div style={mainPage}>
        <h1 style={tradeHeader}>TRADE</h1>
        <button onClick={handleBuySellToggle} style={buySellBtn}>
          Buy | Sell
        </button>
        {/* <div>
          <ul>
            {user.userPortfolio.map((stock) => {
              return (
                <li
                  key={stock.id}
                >{`${stock.company} ${stock.ticker} ${stock.count}`}</li>
              );
            })}
          </ul>
        </div> */}
        <div>
          {buySell ? (
            <BuyForm
              buySell={buySell}
              user={user}
              stockList={stockList}
              formData={formData}
              // generatePOSTConfig={generatePOSTConfig}
              handleStockSearchChange={handleStockSearchChange}
              handleSelectedStockChange={handleSelectedStockChange}
              handleUserAmountChange={handleUserAmountChange}
              availableStocksDropDown={availableStocksDropDown}
              handleBuySubmit={handleBuySubmit}
            />
          ) : (
            <SellForm
              buySell={buySell}
              user={user}
              stockList={stockList}
              formData={formData}
              // generateDELETEConfig={generateDELETEConfig}
              handleSelectedStockChange={handleSelectedStockChange}
              handleStockSearchChange={handleStockSearchChange}
              handleUserAmountChange={handleUserAmountChange}
              userStocksDropDown={userStocksDropDown}
              handleSellSubmit={handleSellSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );

  //   return (
  //     <div>
  //       <div style={mainPage}>
  //         <h1>Trading</h1>
  //         <div>
  //           <ul>
  //             {user.userPortfolio.map((stock) => {
  //               return (
  //                 <li
  //                   key={stock.id}
  //                 >{`${stock.company} ${stock.ticker} ${stock.count}`}</li>
  //               );
  //             })}
  //           </ul>
  //         </div>
  //         <div>
  //           {buySell ? (
  //             <div>
  //               <h2>Buy</h2>
  //               <form style={formStyles} onSubmit={handleBuySubmit}>
  //                 <label htmlFor="user-tokens" style={swapText}>
  //                   {`${user.userName}'s trading account`}
  //                 </label>
  //                 <div style={inputDiv}>
  //                   <div style={dropDownInput}>
  //                     {`Cash Balance: $${user.balance}`}
  //                     {/* {`Cash Balance: $${user.balance.toFixed(2)}`} */}
  //                   </div>
  //                   {/* <input
  //               style={numberInput}
  //               type="number"
  //               value={formData.userAmount}
  //               onChange={(e) => handleUserAmountChange(e)}
  //             /> */}
  //                   {/* <div>{(formData.userAmount.length === 0) ?  :}</div> */}
  //                 </div>

  //                 <label htmlFor="stock_search">Search Available Stocks</label>
  //                 <input
  //                   type="text"
  //                   name="stockSearch"
  //                   id="stockSearch"
  //                   value={formData.stockSearch}
  //                   onChange={handleStockSearchChange}
  //                 />
  //                 <label htmlFor="lps" style={swapText}>
  //                   Amount of shares to purchase:
  //                 </label>
  //                 <div style={inputDiv}>
  //                   <input
  //                     style={numberInput}
  //                     type="number"
  //                     value={formData.userAmount}
  //                     onChange={(e) => handleUserAmountChange(e)}
  //                   />
  //                   <select
  //                     style={dropDownInput}
  //                     name="stockList"
  //                     id="stockList"
  //                     value={formData.selectedStock}
  //                     onChange={(e) => handleSelectedStockChange(e)}
  //                   >
  //                     <option value="1">{`${formData.selectedStock.ticker}`}</option>
  //                     {availableStocksDropDown}
  //                   </select>
  //                 </div>
  //                 <div style={infoDiv}>
  //                   <div style={dropDownInput}>{`Total Price: $${
  //                     // formData.selectedStock.length > 0
  //                     //   ? formData.selectedStock.stock_price.price *
  //                     //     Number(formData.userAmount)
  //                     //   : 0
  //                     formData.selectedStock.stock_price.price *
  //                     Number(formData.userAmount)
  //                   }`}</div>
  //                   <div style={dropDownInput}>{`Balance Remaining: $${(
  //                     user.balance -
  //                     formData.selectedStock.stock_price.price *
  //                       Number(formData.userAmount)
  //                   ).toFixed(2)}`}</div>
  //                 </div>

  //                 <button type="submit" style={confirmBtn}>
  //                   {buySell ? "BUY" : "SELL"}
  //                 </button>
  //               </form>
  //             </div>
  //           ) : (
  //             // ==================================================================================
  //             // ==================================================================================
  //             // ==================================================================================
  //             <div>
  //               <h1>Sell</h1>
  //               <form style={formStyles} onSubmit={handleSellSubmit}>
  //                 <label htmlFor="user-tokens" style={swapText}>
  //                   {`${user.userName}'s trading account`}
  //                 </label>

  //                 <label htmlFor="stock_search">Search Available Stocks</label>
  //                 <input
  //                   type="text"
  //                   name="stockSearch"
  //                   id="stockSearch"
  //                   value={formData.stockSearch}
  //                   onChange={handleStockSearchChange}
  //                 />
  //                 <label htmlFor="lps" style={swapText}>
  //                   Amount of shares to sell:
  //                 </label>
  //                 <div style={inputDiv}>
  //                   <input
  //                     style={numberInput}
  //                     type="number"
  //                     value={formData.userAmount}
  //                     onChange={(e) => handleUserAmountChange(e)}
  //                   />
  //                   <select
  //                     style={dropDownInput}
  //                     name="stockList"
  //                     id="stockList"
  //                     value={formData.selectedStock}
  //                     onChange={(e) => handleSelectedStockChange(e)}
  //                   >
  //                     <option value="1">{`${formData.selectedStock.ticker}`}</option>
  //                     {userStocksDropDown}
  //                   </select>
  //                 </div>
  //                 <div style={infoDiv}>
  //                   <div style={dropDownInput}>{`Total Sale Price: $${
  //                     // formData.selectedStock.length > 0
  //                     //   ? formData.selectedStock.stock_price.price *
  //                     //     Number(formData.userAmount)
  //                     //   : 0
  //                     formData.selectedStock.stock_price.price *
  //                     Number(formData.userAmount)
  //                   }`}</div>
  //                   <div style={dropDownInput}>{`Balance: $${(
  //                     user.balance -
  //                     formData.selectedStock.stock_price.price *
  //                       Number(formData.userAmount)
  //                   ).toFixed(2)}`}</div>
  //                 </div>
  //                 {/* <div style={inputDiv}>
  //                   <div
  //                     style={dropDownInput}
  //                   >{`Cash Balance: $${user.balance.toFixed(2)}`}</div>

  //                 </div> */}

  //                 <button type="submit" style={confirmBtn}>
  //                   {buySell ? "BUY" : "SELL"}
  //                 </button>
  //               </form>
  //             </div>
  //           )}
  //         </div>
  //       </div>
  //       {/* <button className="logoutButton" onClick={handleClick}>
  //         Log Out
  //       </button> */}
  //     </div>
  //   );
}

export default Trading;
