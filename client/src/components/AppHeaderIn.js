import React, {useEffect, useState} from "react"
import { NavLink , useNavigate} from "react-router-dom"
import LogoServerImg from '../assets/database-storage.png'
import '../styles/components/AppHeader.css'

export default function AppHeaderIn() {

    const [logout, setLogout] = useState(false); //click logout the web or not

    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }
    
    //remove user from local storge, and navigate him outside the web
    useEffect (()=>{
        if (logout == true){
            localStorage.setItem("user", {});
        }
    },[logout])

    return (
        <header>
            <img className = "Logo-Server" src = {LogoServerImg} alt = "logo"/>
            <h1>MY-DB-WEBSITE</h1>
            <nav>
                <NavLink 
                    to="/"
                    style={({isActive}) => isActive ? activeStyles : null}
                    onClick = {()=>{setLogout(true)}}
                >
                    log-out
                </NavLink>
            </nav>
        </header>
    )
}