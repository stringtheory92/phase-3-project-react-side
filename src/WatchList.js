import React, { useEffect } from 'react'

function WatchList() {

  const currentUser = localStorage.getItem("username")


  useEffect(() =>{
    fetch(`http://localhost:9292/users/${currentUser}/watchlist`)
    .then(resp => resp.json())
    .then(data => console.log(data))
  }, [] )
  

  return (
    <div>Watchlist</div>
  )
}

export default WatchList