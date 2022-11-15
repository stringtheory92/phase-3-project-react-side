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
        <button onClick={handleClick}>Log Out</button>
        <h1>HOME</h1>
        <h2>{stock.company}</h2>
        {stock.ticker}
      </div>
    );
  });

  // console.log(displayStocks)

  return <div>{displayStocks}</div>;
}

export default HomeScreen;
