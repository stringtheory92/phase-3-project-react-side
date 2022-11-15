import React, {useState, useEffect} from 'react'

function HomeScreen() {

  const [stockData, setStockData] = useState([])

  useEffect(() => {fetch(`http://localhost:9292/stocks`)
  .then(resp => resp.json())
  .then(data => {
    setStockData(data)
    console.log(data)
  })
},[])

  console.log(stockData)

  
  const displayStocks = stockData.map(stock => {
  return(  
  <div>
    <h2>{stock.company}</h2>
    {stock.ticker}
  </div>
  )
})

  // console.log(displayStocks)

  return (
    <div>{displayStocks}</div>
  )
}

export default HomeScreen