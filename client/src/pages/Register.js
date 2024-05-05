import React, {useEffect, useState} from 'react'
import {useSetUser, useSetFetchError} from '../helpers/ThemeProvider'
import {useNavigate} from 'react-router-dom'
import '../styles/pages/register.css'

function Register() {

    const navigate = useNavigate(); //navigate to other pages

    const setUser = useSetUser(); //current user in the web
    const setFetchingError = useSetFetchError();  //error while fetching data

    const [users, setUsers] = useState([]);  //list of users
    const [isLoading, setIsLoading] = useState(true); //time while fetching the data

    //user try to sign
    const [logger, setLogger] = useState("");
    const [loggerPassword, setLoggerPassword] = useState();
    const [loggerPassword2, setLoggerPassword2] = useState();

    // Handling the name change
   const handleLoggerName = (e) => {
        setLogger(e.target.value);
    };

    // Handling the password change
    const handleLoggerPassword = (e) => {
        setLoggerPassword(e.target.value);
    };

    // Handling the varifying password change
    const handleLoggerPassword2 = (e) => {
        setLoggerPassword2(e.target.value);
    };

    // Handling the form submission
    const handleSubmit = (e) => {

        e.preventDefault();

        //check if userName already exist in the db
        let sameUser = users.map((user)=>{
            if (user.username == logger){
                return user;
            }
        });

        //if the logger user-name exist in the db- ask him to check another name
        if (sameUser[0]!=null){
            console.log(sameUser)
            alert("please choose another user-name")
            sameUser = [];
        }

        //if user name does not exist in the db, navigate him to full sign in form.
        else{
            
            if (loggerPassword == loggerPassword2){ //verifying password is okay
                //password need to be strong (at least 6 characters)
                let regex =  /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
                //if password strong enough
                if(regex.test(loggerPassword)){
                    let userId = parseInt(users[users.length-1].id)+1;
                    setUser({id: userId.toString(), username: logger, website: loggerPassword})
                    navigate('/registerForm');
                }
                else{ //password not strong enough
                    alert("password is not strong enough");
                }
            }
            else{
                alert("verify your password again")
            }
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
    <div className="signContainer">
           <form className="signForm">
               <div className = "formTitle"><h1>SIGN-IN</h1></div>
               <label className="label">User-Name</label>
               <input onChange={handleLoggerName } className="input" 
                     type="text" />

               <label className="label">User Password</label>
               <input onChange={handleLoggerPassword } className="input"
                   type="password"/>

               <label className="label">Verify User Password</label>
               <input onChange={handleLoggerPassword2 } className="input"
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

export default Register
