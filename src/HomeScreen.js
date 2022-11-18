import React, { useState, useEffect } from "react";

function HomeScreen({ toggleLogIn }) {
  const currentUser = localStorage.getItem("username")
  const [stockData, setStockData] = useState([]);
  const [pointData, setPointData] = useState([]);
  const [gainerData, setGainerData] = useState([]);
  const [loserData, setLoserData] = useState([]);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:9292/stocks`)
      .then((resp) => resp.json())
      .then((data) => {
        setStockData(data);
        // console.log(data);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:9292/top_movers_by_points`)
      .then((resp) => resp.json())
      .then((data) => {
        setPointData(data);
        // console.log(data);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:9292/gainers_by_percentage`)
      .then((resp) => resp.json())
      .then((data) => {
        setGainerData(data);
        // console.log(data);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:9292/losers_by_percentage`)
      .then((resp) => resp.json())
      .then((data) => {
        setLoserData(data);
        // console.log(data);
      });
  }, []);

  // console.log(stockData);
  // console.log(pointData);


  const handleClick = () => {
    toggleLogIn();
    localStorage.clear();
  };



  function handleAddToWatchList(e, stock){
    setIsAdded(true);
    fetch(`http://localhost:9292/users/${currentUser}/watchlist/addstock/${stock.id}`, {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      }
    })
  }

  const displayStocks = stockData.map((stock) => {
    return (
      <tr key={stock.ticker}>
        <td>{stock.ticker}</td>
        <td>{stock.company}</td>
        <td>{stock.stock_price.price}</td>
        <td>{stock.stock_price.change_point}</td>
        <td>{stock.stock_price.change_percentage}%</td>
        <td>{stock.stock_price.total_vol}</td>
        <td><button className="watchlistButton" onClick={ (e) => handleAddToWatchList(e, stock)}>{isAdded ? "In Watchlist" : "Add to Watch List"}</button></td>
      </tr> 
    );
  });
  
  const displayStocksByPoint = pointData.map((stock) => {
    return (
      <tr key={stock.ticker}>
        <td>{stock.ticker}</td>
        <td>{stock.company}</td>
        <td>{stock.stock_price.price}</td>
        <td>{stock.stock_price.change_point}</td>
        <td>{stock.stock_price.change_percentage}%</td>
        <td>{stock.stock_price.total_vol}</td>
        <td><button className="watchlistButton" onClick={ (e) => handleAddToWatchList(e, stock)}>Add to Watch List</button></td>
      </tr> 
    );
  });

  const displayGainerStocks = gainerData.map((stock) => {
    return (
      <tr key={stock.ticker}>
        <td>{stock.ticker}</td>
        <td>{stock.company}</td>
        <td>{stock.stock_price.price}</td>
        <td>{stock.stock_price.change_point}</td>
        <td>{stock.stock_price.change_percentage}%</td>
        <td>{stock.stock_price.total_vol}</td>
        <td><button className="watchlistButton" onClick={ (e) => handleAddToWatchList(e, stock)}>Add to Watch List</button></td>
      </tr> 
    );
  });

  const displayLoserStocks = loserData.map((stock) => {
    return (
      <tr key={stock.ticker}>
        <td>{stock.ticker}</td>
        <td>{stock.company}</td>
        <td>{stock.stock_price.price}</td>
        <td>{stock.stock_price.change_point}</td>
        <td>{stock.stock_price.change_percentage}%</td>
        <td>{stock.stock_price.total_vol}</td>
        <td><button className="watchlistButton" onClick={ (e) => handleAddToWatchList(e, stock)}>Add to Watch List</button></td>
      </tr> 
    );
  });

  // console.log(displayStocks);
  // console.log(pointData);

  
  return (
    <div>
      <h1 className="home" >Hey, {currentUser}! 💸
        <button className="logoutButton" onClick={handleClick}>Log Out</button>
      </h1>
      <div className="home-table">
          <table> 
            <caption className="table-label">✨ Nasdaq Stocks ✨</caption>
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
      <div className="home-table">
        <table> 
          <caption className="table-label">☄️ Top Movers ☄️</caption>
          <tbody>
            <tr>
              <th>Ticker</th>
              <th>Name</th>
              <th>Price</th>
              <th>Change</th>
              <th>% Change</th>
              <th>Volume</th>
            </tr> 
            {displayStocksByPoint}
            </tbody>
          </table>
      </div>
      <div className="home-table">
          <table> 
          <caption className="table-label">🔥 Gainers 🔥</caption>
          <tbody>
            <tr>
              <th>Ticker</th>
              <th>Name</th>
              <th>Price</th>
              <th>Change</th>
              <th>% Change</th>
              <th>Volume</th>
            </tr> 
            {displayGainerStocks}
            </tbody>
          </table>
      </div>

      <div className="home-table">
        <table> 
        <caption className="table-label">🍃 Losers 🍃</caption>
        <tbody>
          <tr>
            <th>Ticker</th>
            <th>Name</th>
            <th>Price</th>
            <th>Change</th>
            <th>% Change</th>
            <th>Volume</th>
          </tr> 
          {displayLoserStocks}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default HomeScreen;
