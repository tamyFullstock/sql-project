import React, { useState} from 'react'
import '../../styles/components/updateCard.css'
import closeImg from '../../assets/close.png'


function CreateAlbumCard({albumsList, setAlbumsList, setClose, searchParams, setSearchParams, id, setId}){

    const userId = (JSON.parse(localStorage.getItem("user"))).id; //current userId

   // album entity
   const [newAlbum, setNewAlbum] = useState({userId: userId, id: id, title:""});

   // Handling the title change
   const handleTitle = (e) => {
        setNewAlbum((prev)=>({...prev, title: e.target.value}));
   };

   // Handling the form submission
   async function handleSubmit(e){
        try{
            e.preventDefault();
            if (newAlbum.title==""){
                alert("album must have a title");
            }
            else{
                const response = await fetch(`http://localhost:3000/albums`, {method: 'POST', body: JSON.stringify(newAlbum)});
                if (!response.ok){
                    throw new Error("error while trying creating album with id: " + id);
                }
                let newAlbumList = [].concat(albumsList, newAlbum); //updating the album in the alreay fetched list. save us from fetching the list again.
                setAlbumsList(newAlbumList);
                setId(id=>id+1); //update the run id of albums
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
                   value={newAlbum.title} type="text" />
               <button onClick={handleSubmit} className="btn"
                       type="submit">
                   create album
               </button>
           </form>
       </div>
   );
}

export default CreateAlbumCard;
