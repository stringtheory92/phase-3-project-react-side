import React, { useEffect, useState } from 'react'
import WatchListStock from './WatchListStock'

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

  function handleDelete(e, stock){
    console.log(stock)
    // const stockToDelete = userWatchList.find(stock => console.log(e.target.id))
    fetch(`http://localhost:9292/users/${currentUser}/watchlist/stocks/${stock.id}`)
    
  }

  const displayWatchList = userWatchList.map(stock => <WatchListStock key={stock.id} stock={stock} handleDelete={handleDelete}/>)

  

  

  return (
    <div>
      Your Watchlist:
      {displayWatchList}
    </div>
      
    
  )
}

export default WatchList