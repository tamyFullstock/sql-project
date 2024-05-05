import React, {useEffect, useState} from 'react'
import {useSetUser, useSetFetchError} from '../helpers/ThemeProvider'
import {useNavigate} from 'react-router-dom'
import '../styles/pages/login.css'

function Login() {

    const navigate = useNavigate(); //navigate to other pages

    const setUser = useSetUser(); //current user in the web

    const setFetchingError = useSetFetchError();  //error while fetching data

    const [users, setUsers] = useState([]);  //list of users
    const [isLoading, setIsLoading] = useState(true); //time while fetching the data

    //user try to log
    const [logger, setLogger] = useState("");
    const [loggerPassword, setLoggerPassword] = useState();

    // Handling the name change
   const handleLoggerName = (e) => {
        setLogger(e.target.value);
    };

    // Handling the password change
    const handleLoggerPassword = (e) => {
        setLoggerPassword(e.target.value);
    };

    // Handling the form submission
    const handleSubmit = (e) => {

        e.preventDefault();
        //check logger is alreay registered to the web
        let logger2 = users.map((user)=>{
            if (user.username == logger && user.website == loggerPassword){
                return user;
            }
        })[0];

        //if the logger exist in the db- navigate him to the website home page
        if (logger2){
            setUser(logger2);
            localStorage.setItem("user", JSON.stringify(logger2));
            navigate("../home")
        }

        //if user does not exist in the db, navigate him to sign in.
        else{
            alert("not valid user details");
            navigate("/register")
        }
        
       
     }

    //get list of users from server.
    useEffect(()=>{
        async function getUsers(){   
            try{
                const response = await fetch("http://localhost:8080/users");
                const listUsers = await response.json()
                if (!response.ok){
                    throw new Error("please reload the app");
                }
                setUsers(listUsers);
            }
            catch(err){
                console.log(err)
                setFetchingError(true);  //set error 
            }
            finally{
                setIsLoading(false);
            }
        }

        getUsers();
    }
        ,[]
    )

    
  return (
    <>
    {!isLoading && 
    <div className="loginContainer">
           <form className="loginForm">
               <div className = "formTitle"><h1>LOG-IN</h1></div>
               <label className="label">User-Name</label>
               <input onChange={handleLoggerName } className="input" 
                     type="text" />

               <label className="label">User Password</label>
               <input onChange={handleLoggerPassword } className="input" 
                   type="password"/>

               <button onClick={handleSubmit} className="btn"
                       type="submit">
                   submit
               </button>
           </form>
    </div>}
    {isLoading && <div>
        loading..
    </div>}
    </>
  )
}

export default Login

