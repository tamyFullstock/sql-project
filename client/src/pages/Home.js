import React from 'react'
import { useSearchParams } from 'react-router-dom'
import {useUser} from '../helpers/ThemeProvider'
import backgroundImage from '../assets/background-img-server.jpg'
import '../styles/pages/Home.css'
import emojii from '../assets/emojii-search.png'

function Home() {

  const [searchParams, setSearchParams] = useSearchParams();

  const user = JSON.parse(localStorage.getItem("user")); //current user

  const showInfo = searchParams.get('info') == 'true' ? true : false; //show user information

  const styles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100%',
    opacity: '0.4',
    position: 'absolute',
    zIndex : '-1'
};


const infoFirstCol = <div className='infoFirstCol'>
  <p><span>name:</span> {user.name}</p>
  <p><span>username:</span> {user.username}</p>
  <p><span>email:</span> {user.email}</p>
  <p><span>address: </span></p>
  <p><span>street:</span> {user.address.street}</p>
  <p><span>suite:</span> {user.address.suite}</p>
  <p><span>city:</span> {user.address.city}</p>
  <p><span>zipcode:</span> {user.address.zipcode}</p>
  <p><span>geo:</span> lat: {user.address.geo.lat} lng: {user.address.lng}</p>
</div>

const infoSecondCol = <div className='infoSecondCol'>
  <p><span>phone:</span> {user.phone}</p>
  <p><span>company: </span></p>
  <p><span>name:</span> {user.company.name}</p>
  <p><span>catchPhrase:</span> { user.company.catchPhrase}</p>
  <p><span>bs:</span> {user.company.bs}</p>
</div>

  return (
    <>
    <div style = {styles}>
      
    </div>

    {!showInfo && <div className = "homeContainer" >
        <h1>Hello {user.name}</h1>
        <h1>Let's Explore Your Data</h1>
        <div className = "emojiis">
          <img src = {emojii} alt = "emojii"/>
          <img src = {emojii} alt = "emojii"/>
          <img src = {emojii} alt = "emojii"/>
        </div>
    </div>}

    {showInfo && <div className = 'homeContainer homeInfo'>
      {infoFirstCol}
      {infoSecondCol}
      </div>}
    
    </>
  )
}

export default Home
