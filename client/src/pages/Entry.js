import React from 'react'
import backgroundImage from '../assets/background-img-server.jpg'


function Entry() {
    const styles = {
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100%',
           height: '600px'
    };
  return (
    <div style = {styles}>
      
      </div>
    
  )
}

export default Entry
