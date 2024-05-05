import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import '../../styles/components/cardsListHeader.css'

function PhotoListHeader({ setClose}) {

  const location = useLocation();

  const search = location.state?.search || ""; //use it to maintain params between pages

  const activeStyles = {
      fontWeight: "bold",
      textDecoration: "underline",
      color: "#161616",
      marginRight: '0',
      marginLeft: '30px',
      fontSize: '1.3rem'
  }

 

  return (
    <div className = "cardsListHeader">
        <h1 className="cardsTitle">Your photos:</h1>
        <div className = "cardBtns">
              <button className = "buttonCard createCardBtn" onClick = {()=>setClose(false)}>add photo</button>
              <NavLink 
                    to={`..?${search}`}
                    relative = 'path'
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    back to albums
                </NavLink>
        </div>

    </div>
  )
}

export default PhotoListHeader



