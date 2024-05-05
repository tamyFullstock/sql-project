import React from "react"
import { NavLink } from "react-router-dom"
import LogoServerImg from '../assets/database-storage.png'
import '../styles/components/AppHeader.css'

export default function AppHeader() {

    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }
    
    return (
        <header>
            <img className = "Logo-Server" src = {LogoServerImg} alt = "logo"/>
            <h1 className = "HeaderLogoTitle">MY-DB-WEBSITE</h1>
            <nav>
                <NavLink 
                    to="/login"
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    log-in
                </NavLink>
                <NavLink 
                    to="/register"
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    sign-up
                </NavLink>
               
            </nav>
        </header>
    )
}