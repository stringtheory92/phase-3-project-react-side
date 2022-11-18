import React, { useState } from "react";

function AddToWatchListBtn({ handleAddToWatchList, stock }) {
  const [isAdded, setIsAdded] = useState(false);

  const toggleIsAdded = (e) => {
    setIsAdded((status) => !status);
    handleAddToWatchList(e, stock);
  };
  return (
    <>
      <button className="watchlistButton" onClick={(e) => toggleIsAdded(e)}>
        {isAdded ? "In Watchlist" : "Add to Watch List"}
      </button>
    </>
  );
}

export default AddToWatchListBtn;
