import React, { useState, useEffect } from "react";

function HomeScreen({ toggleLogIn }) {
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

  const displayStocks = stockData.map((stock) => {
    return (
      <div>
        <h2>{stock.ticker}</h2>
        {stock.company}
        {/* {stock.stock_prices.price} */}
      </div>
    );
  });
  
  // console.log(displayStocks)
  
  return (
    <div>
      <h1>HOME</h1>
      <button onClick={handleClick}>Log Out</button>
      {displayStocks}
    </div>
  )
}

export default HomeScreen;
