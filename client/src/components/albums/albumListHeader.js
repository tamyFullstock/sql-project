import React from 'react'
import '../../styles/components/cardsListHeader.css'

function AlbumListHeader({ setClose }) {

  return (
    <div className = "cardsListHeader">
        <h1 className="cardsTitle">Your albums:</h1>
        <div className = "cardBtns">
              <button className = "buttonCard createCardBtn" onClick = {()=>setClose(false)}>new album</button>
        </div>

    </div>
  )
}

export default AlbumListHeader



