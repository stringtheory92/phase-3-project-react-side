import React, { useEffect, useState } from 'react'
import WatchListStock from './WatchListStock'

function WatchList({toggleLogIn}) {

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

  // const handleClick = () => {
  //   toggleLogIn();
  //   localStorage.clear();
  // };

  console.log(userWatchList)

  function handleDelete(e, stock){
    console.log(stock)
    fetch(`http://localhost:9292/users/${currentUser}/watchlist/stocks/${stock.id}`, {
      method: "DELETE"
    })

    const updateStateWithDeleted = userWatchList.filter(watchListItem => watchListItem.id !== stock.id)
    console.log("User Watchlist without the deleted stock: ", updateStateWithDeleted)
    setUserWatchList(updateStateWithDeleted)  
    console.log(userWatchList)
  }
  console.log(userWatchList)
  const displayWatchList = userWatchList.map(stock => <WatchListStock key={stock.id} stock={stock} handleDelete={handleDelete}/>)

  

  

  return (
    <div>
      <h2>Your Watchlist:</h2>
      {displayWatchList}
      {/* <button className="logoutButton" onClick={handleClick}>Log Out</button> */}
    </div>
      
    
  )
}

export default WatchList