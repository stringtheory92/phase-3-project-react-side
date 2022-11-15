import React, { useEffect, useState } from 'react'

function WatchList() {

  const currentUser = localStorage.getItem("username")
  const [userWatchList, setUserWatchList] = useState([])

  useEffect(() =>{
    fetch(`http://localhost:9292/users/${currentUser}/watchlist`)
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      setUserWatchList(data)
    
    })
      
  }, [] )

  console.log(userWatchList)

  const displayWatchList = userWatchList.map(stock => {
  return(
  <ul>  
  <li>{stock.ticker}</li>
  <li>{stock.company}</li>
  {/* <li>{stock.stock_prices["current_price"]}</li> */}
  </ul> 
  )})
  

  

  return (
    <div>
      Your Watchlist:
      {displayWatchList}
    </div>
      
    
  )
}

export default WatchList