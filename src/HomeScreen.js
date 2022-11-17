import React, { useState, useEffect } from "react";

function HomeScreen({ toggleLogIn }) {
  const currentUser = localStorage.getItem("username")
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9292/stocks`)
      .then((resp) => resp.json())
      .then((data) => {
        setStockData(data);
        console.log(data);
      });
  }, []);

  console.log(stockData);

  const handleClick = () => {
    toggleLogIn();
    localStorage.clear();
  };

  function handleAddToWatchList(e, stock){
    fetch(`http://localhost:9292/users/${currentUser}/addstock/${stock.id}`, {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      }
    })
  }

  const displayStocks = stockData.map((stock) => {
    return (
      <tr>
        <td>{stock.ticker}</td>
        <td>{stock.company}</td>
        <td>{stock.stock_price.price}</td>
        <td>0.389</td>
        <td>-0.04%</td>
        <td>3.45M</td>
        <td><button onClick={ (e) => handleAddToWatchList(e, stock)}>Add to Watch List</button></td>
      </tr> 
    );
  });
  
  console.log(displayStocks)
  
  return (
    <div>
      <h1 className="home" >WELCOME, {currentUser}!
        <button className="logoutButton" onClick={handleClick}>Log Out</button>
      </h1>

      <div className="title-div">
        <h3 className="table-title">Trending</h3>
      </div>
      <div className="home-table">
          <table> 
            <tbody>
            <tr>
              <th>Ticker</th>
              <th>Name</th>
              <th>Price</th>
              <th>Change</th>
              <th>% Change</th>
              <th>Volume</th>
            </tr> 
            {displayStocks}
            </tbody>
          </table>
      </div>
      <div className="title-div">
        <h3 className="table-title">Top 20</h3>
      </div>
      <div className="home-table">
        <table> 
        <tbody>
          <tr>
            <th>Ticker</th>
            <th>Name</th>
            <th>Price</th>
            <th>Change</th>
            <th>% Change</th>
            <th>Volume</th>
          </tr> 
          {displayStocks}
          </tbody>
        </table>
      </div>
      <div className="title-div">
        <h3 className="table-title">Gainers</h3>
      </div>
      <div className="home-table">
          <table> 
          <tbody>
            <tr>
              <th>Ticker</th>
              <th>Name</th>
              <th>Price</th>
              <th>Change</th>
              <th>% Change</th>
              <th>Volume</th>
            </tr> 
            {displayStocks}
            </tbody>
          </table>
      </div>
      <div className="title-div">
        <h3 className="table-title">Losers</h3>
      </div>
      <div className="home-table">
        <table> 
        <tbody>
          <tr>
            <th>Ticker</th>
            <th>Name</th>
            <th>Price</th>
            <th>Change</th>
            <th>% Change</th>
            <th>Volume</th>
          </tr> 
          {displayStocks}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default HomeScreen;
