import React, { useState} from 'react'
import '../../styles/components/updateCard.css'
import closeImg from '../../assets/close.png'


function CreatePhotoCard({photosList, setPhotosList, setClose, searchParams, setSearchParams, id, setId}){

    const album = {};  //useContext

   // post entity
   const [newPhoto, setNewPhoto] = useState({albumId: parseInt(album.id), id: id.toString(), title:"", url: "", thumbnailUrl: ""});

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
            else if (newPhoto.thumbnailUrl==''){
                alert("photo must have a thumbnailUrl");
            }
            else{
                const response = await fetch(`http://localhost:3000/photos`, {method: 'POST', body: JSON.stringify(newPhoto)});
                if (!response.ok){
                    throw new Error("error while trying creating photo with id: " + id);
                }
                let newPhotoList = [].concat(photosList, newPhoto); //updating the post in the alreay fetched list. save us from fetching the list again.
                setPhotosList(newPhotoList);
                setId(id=>id+1); //update the run id of photos
            }

        }
        catch(err){
            console.log(err);
        }
        finally{
            setClose(true)
        }
   };


   return (
       <div className="updateCreateContainer">
           <button className = "closeBtn" onClick = {()=>setClose(true)}><img src = {closeImg}/></button>
           <form className="updateCreateForm">
               <h1>{id}</h1>
               <label className="label">title: </label>
               <input onChange={handleTitle } className="input"
                   value={newPhoto.title} type="text" />
                <label className="label">url: </label>
                <input onChange={handleUrl } className="input"
                   value={newPhoto.url} type="text" />
                <label className="label">thumbnail url: </label>
                <input onChange={handleThumbnailUrl } className="input"
                   value={newPhoto.thumbnailUrl} type="text" />
               <button onClick={handleSubmit} className="btn"
                       type="submit">
                   add photo
               </button>
           </form>
       </div>
   );
}

export default CreatePhotoCard;
