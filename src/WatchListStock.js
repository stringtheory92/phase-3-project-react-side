import React from 'react'

function WatchListStock({stock, handleDelete}) {

    const {id, ticker, company } = stock
  return(
        <ul> {id} 
        <li>{ticker}</li>
        <li>{company}</li>
        <li>{stock.stock_price.price}</li>
        <div>
          <button onClick={(e) => handleDelete(e, stock)} >Remove From Watch List</button>
        </div>
        </ul> 
  )
}

export default WatchListStock