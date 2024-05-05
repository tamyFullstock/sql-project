import React, { useState} from 'react'
import '../../styles/components/updateCard.css'
import closeImg from '../../assets/close.png'


function UpdatePhotoCard({photosList, setPhotosList, setClose, searchParams, setSearchParams}){

    //find photo to update by the params
    let photoId = searchParams.get('updatePhotoId');
    const photo = photosList.filter(p=>p.id == photoId)[0];

   // photo entity
   const [newPhoto, setNewPhoto] = useState({...photo});

   // Handling the title change
   const handleTitle = (e) => {
        setNewPhoto((prev)=>({...prev, title: e.target.value}));
   };

    // Handling the url change
    const handleUrl = (e) => {
        setNewPhoto((prev)=>({...prev, url: e.target.value}));
   };

    // Handling the thumbnailUrl change
    const handleThumbnailUrl = (e) => {
        setNewPhoto((prev)=>({...prev, thumbnailUrl: e.target.value}));
   };

   // Handling the form submission
   async function handleSubmit(e){
        try{
            e.preventDefault();
            if (newPhoto.url==""){
                alert("photo must have a url");
            }
            if (newPhoto.thumbnailUrl==""){
                alert("photo must have a thumbnailUrl");
            }
            else{
                const response = await fetch(`http://localhost:3000/photos/${photo.id}`, {method: 'PUT', body: JSON.stringify(newPhoto)});
                if (!response.ok){
                    throw new Error("error while trying updating photo with id: " + photo.id);
                }
                let indexOfPhoto = photosList.indexOf(photo);
                let newPhotoList = [...photosList];
                newPhotoList[indexOfPhoto] = newPhoto; //updating the photo in the alreay fetched list. save us from fetching the list again.
                setPhotosList(newPhotoList);
            }

        }
        catch(err){
            console.log(err);
        }
        finally{
            searchParams.delete('updatePhotoId');
            setSearchParams(searchParams)
            setClose(true)
        }
   };

    //close window of updating
    function closeUpdatePhoto(){
        searchParams.delete("updatePhotoId");
        setSearchParams(searchParams);
        setClose(true); //close card of updating
      }

   return (
       <div className="updateCreateContainer">
           <button className = "closeBtn" onClick = {closeUpdatePhoto}><img src = {closeImg}/></button>
           <form className="updateCreateForm">
               <h1>{photo.id}</h1>
               <label className="label">title: </label>
               <input onChange={handleTitle } className="input"
                   value={newPhoto.title} type="text" />

                <label className="label">url: </label>
               <input onChange={handleUrl} className="input"
                   value={newPhoto.url} type="text" />

                <label className="label">thumbnail url: </label>
               <input onChange={handleThumbnailUrl} className="input"
                   value={newPhoto.thumbnailUrl} type="text" />

               <button onClick={handleSubmit} className="btn"
                       type="submit">
                   update photo
               </button>
           </form>
       </div>
   );
}

export default UpdatePhotoCard;
