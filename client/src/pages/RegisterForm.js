import React , {useState} from 'react';
import '../styles/pages/registerForm.css'
import {useSetUser, useUser} from '../helpers/ThemeProvider'
import { useNavigate } from 'react-router-dom';

function RegisterForm() {

  const setRealUser = useSetUser();  //user also save in local storage

  const realUser = useUser(); //user also save in local storage

  const [user, setUser] = useState(
    {
      id: realUser.id,
      name: "",
      username: realUser.username,
      email: "",
      address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
        geo: {
          lat: "",
          lng: ""
        }
      },
      phone: "",
      website: realUser.website,
      company: {
        name: "",
        catchPhrase: "",
        bs: ""
      }
    }
  ); //current user

  const navigate = useNavigate();

  function handleRegisterInput(e, type){
    switch (type){
      case 'name':
        setUser(prev=>({...prev, name: e.target.value}))
        break;
        case 'email':
          setUser(prev=>({...prev, email: e.target.value}))
          break;
        case 'street':
          setUser(prev=>({...prev, address: {...user.address, street: e.target.value}}))
          break;
        case 'suite':
          setUser(prev=>({...prev, address: {...user.address, suite: e.target.value}}))
          break;
        case 'city':
          setUser(prev=>({...prev, address: {...user.address, city: e.target.value}}))
          break;
        case 'zipcode':
          setUser(prev=>({...prev, address: {...user.address, zipcode: e.target.value}}))
          break;
        case 'lat':
          setUser(prev=>({...prev, address: {...user.address, geo: {...user.address.geo, lat: e.target.value}}}))
          break;
        case 'lng':
          setUser(prev=>({...prev, address: {...user.address, geo: {...user.address.geo, lng: e.target.value}}}))
          break;
        case 'phone':
          setUser(prev=>({...prev, phone: e.target.value}))
          break;
        case 'companyName':
          setUser(prev=>({...prev,  company: {...user.company, name: e.target.value}}))
          break;
        case 'catchPhrase':
          setUser(prev=>({...prev, company: {...user.company, catchPhrase: e.target.value}}))
          break;
        case 'bs':
          setUser(prev=>({...prev, company: {...user.company, bs: e.target.value}}))
          break;
      default:
        break;

    }
  }

  //save the user in the server
  async function saveUserServer(newUser){  
      const response = await fetch(`http://localhost:8080/users`, {method: 'POST', body: JSON.stringify(newUser)});
      if (!response.ok){
          throw new Error("error while trying signing user");
      }
  }

  function handleSubmit(e){ //submit the user
    e.preventDefault();
    if (user.name == ''){
      alert('please fill the name field');
    }
    else if (user.email == ''){
      alert('please fill the email field');
    }
    else if (user.street == ''){
      alert('please fill the street field');
    }
    else if (user.city == ''){
      alert('please fill the city field');
    }
    else if (user.phone == ''){
      alert('please fill the phone field');
    }
    else{  //user filled all required fields
      setRealUser(user)
      localStorage.setItem("user", JSON.stringify(user));
      try{
        saveUserServer(user); //save the user in the server
      }
      catch(err){
        console.log(err);
        navigate("/"); //navigate to the entry page. not enter to the website
      }
      navigate("../home");
    }
    
  }

  return (
    <div className = 'register-form'>
      <form className="registerForm-form">

               <div className = "formTitle-form"><h1>complete your details</h1></div>

              <div className = "colsContainer">
                  <div className = "firstCol">
                        <div className="inputItemContainer">
                            <label className="label">name</label>
                            <input onChange={(e)=>handleRegisterInput(e, 'name') } className="input" 
                                  type="text" min = '2' max = '20' required/>
                        </div>

                        <div className="inputItemContainer">
                            <label className="label">email</label>
                            <input onChange={(e)=>handleRegisterInput(e, 'email') } className="input" 
                                  type="text" required/>
                        </div>

                          <h3 className="label label-address">address</h3>

                          <div className="inputItemContainer">
                            <label className="label">street</label>
                            <input onChange={(e)=>handleRegisterInput(e, 'street') } className="input" 
                                  type="text"  min = '2' max = '40' required/>
                        </div>

                        <div className="inputItemContainer">
                            <label className="label">suite</label>
                            <input onChange={(e)=>handleRegisterInput(e, 'suite') } className="input" 
                                  type="text" required/>
                        </div>

                        <div className="inputItemContainer">
                            <label className="label">city</label>
                            <input onChange={(e)=>handleRegisterInput(e, 'city') } className="input" 
                                  type="text"  min = '2' max = '20' required/>
                        </div>

                        <div className="inputItemContainer">
                            <label className="label">zip-code</label>
                            <input onChange={(e)=>handleRegisterInput(e, 'zipcode') } className="input" 
                                  type="text"   pattern="[0-9]{5}-[0-9]{4}" required/>
                        </div>
                  </div>

                  <div className = "secondCol">
                        <div className="inputItemContainer">
                            <h4 className="label geo-label">geo</h4>
                            <label className="label">lat</label>
                            <input onChange={(e)=>handleRegisterInput(e, 'geoLat') } className="input" 
                                  type="text" required/>
                            <label className="label">lng</label>
                            <input onChange={(e)=>handleRegisterInput(e, 'geoLng') } className="input" 
                                  type="text" required/>
                        </div>

                        <div className="inputItemContainer">
                            <label className="label">phone</label>
                            <input onChange={(e)=>handleRegisterInput(e, 'phone') } className="input" 
                                  type="text"   required/>
                        </div>

                          
                        <h3 className="label label-company">company</h3>

                          <div className="inputItemContainer">
                            <label className="label">name</label>
                            <input onChange={(e)=>handleRegisterInput(e, 'companyName') } className="input" 
                                  type="text"  min = '2' max = '30'  required/>
                          </div>

                          <div className="inputItemContainer">
                            <label className="label">catchPhrase</label>
                            <input onChange={(e)=>handleRegisterInput(e , 'catchPhrase') } className="input" 
                                  type="text"  min = '2' max = '60' required/>
                          </div>

                          <div className="inputItemContainer">
                            <label className="label">bs</label>
                            <input onChange={(e)=>handleRegisterInput(e, 'bs') } className="input" 
                                  type="text" required/>
                          </div>
                    </div>

              </div>
               

               <button onClick={handleSubmit} className="btn-form"
                       type="submit">
                   submit
               </button>
           </form>
    </div>
  )
}

export default RegisterForm
