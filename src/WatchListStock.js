import React from 'react'

function WatchListStock({stock, handleDelete}) {
    const {id, ticker, company } = stock

  return(
      <tr>
        <td>{ticker}</td>
        <td>{company}</td>
        <td>{stock.stock_price.price}</td>
        {/* <td>{stock.stock_price.change_point}</td>
        <td>{stock.stock_price.change_percentage}</td>
        <td>{stock.stock_price.total_vol}</td> */}
        <td>
          <button className="removeWatchlistButton" onClick={(e) => handleDelete(e, stock)} >Remove From Watch List</button>
        </td>
      </tr>
  )
}

export default WatchListStock