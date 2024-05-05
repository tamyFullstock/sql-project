import React from "react"
import { NavLink, Outlet} from "react-router-dom"
import '../styles/components/NavLayout.css'

export default function NavLayout() {

    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }
    
    return (
        <div>
        <header className = "headerNav">
            <nav>
                <NavLink 
                    to="todos"
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    todos
                </NavLink>
                <NavLink 
                    to="posts"
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    posts
                </NavLink>
                <NavLink 
                    to="albums"
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    albums
                </NavLink>
                <NavLink 
                    to=".?info=true"
                    
                >
                    info
                </NavLink>
               
            </nav>
        </header>
        <Outlet/>
        </div>
    )
}