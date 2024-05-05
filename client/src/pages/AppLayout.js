import React , {useEffect, useState} from "react"
import { Outlet , useLocation} from "react-router-dom"
import Header from "../components/AppHeader"
import Footer from "../components/AppFooter"
import HeaderIn from '../components/AppHeaderIn'

export default function Layout() {
    
    const location = useLocation();

    //if user succeed login- show button log-out in header. else: login.
    const [isInWeb, setIsInWeb] = useState(false);

    useEffect(
        ()=>{
            //not login to web yet
            if (location.pathname == "/" || location.pathname == "/login" || location.pathname == "/register"|| location.pathname == "/registerForm"){
                setIsInWeb(false)
            }
            else { //succeed to login
                setIsInWeb(true)
            }
        }
       , [location]
    )

    return (
        <div className="site-wrapper">
            {isInWeb && <HeaderIn/> }
            {!isInWeb && <Header/>}
            <main style = {{minHeight: "600"}}>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
