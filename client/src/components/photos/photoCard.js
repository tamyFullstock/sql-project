import React from 'react'
import '../../styles/pages/Cards.css'
import { useSearchParams, Link } from 'react-router-dom';



function PhotoCard({photo, photoList, setPhotoList, setClose, searchParams, setSearchParams}) {

  const album = {}; //useContext

  async function deletePhoto(){
    try{
      const response = await fetch(`http://localhost:3000/photos/${photo.id}`, {method: 'DELETE'});
      if (!response.ok){
          throw new Error("error while trying delete the photo with id: " + photo.id);
      }
      let indexOfPhoto = photoList.indexOf(photo);
      let newPhotoList = [...photoList];
      newPhotoList.splice(indexOfPhoto,1); //delete the photo from the list of todo who have been fetched yet. save us from fetching the list again.
      setPhotoList(newPhotoList);
    }
    catch(err){
      console.log(err)
    }
  }

  function updatePhoto(){
    setClose(false); //show card of updating
    searchParams.set("updatePhotoId", photo.id)
    setSearchParams(searchParams);
  }

  return (
    <div className = "singleCard" >
        <img src = {photo.thumbnailUrl} className = "imgCard photoCardImg"/>
        <div className = "singleCardInfo">
                <h3>{photo.title}</h3>
            </div>
            <div className = "cardBtns">
                <button className = "buttonCard updateCardBtn" onClick = {updatePhoto}>update</button>
                <button className = "buttonCard deleteCardBtn" onClick = {deletePhoto}>delete</button>
        </div>
    </div>
  )
}

export default PhotoCard