import React, { useState} from 'react'
import '../../styles/components/updateCard.css'
import closeImg from '../../assets/close.png'


function CreatePostCard({postsList, setPostsList, setClose, searchParams, setSearchParams, id, setId,  setAllPostsList}){

    const userId = parseInt((JSON.parse(localStorage.getItem("user"))).id); //current userId

   // post entity
   const [newPost, setNewPost] = useState({userId: userId, id: id.toString(), title:"", body: ""});

   // Handling the title change
   const handleTitle = (e) => {
        setNewPost((prev)=>({...prev, title: e.target.value}));
   };

   // Handling the post change
   const handleBody = (e) => {
        setNewPost((prev)=>({...prev, body: e.target.value}));
    };

   // Handling the form submission
   async function handleSubmit(e){
        try{
            e.preventDefault();
            if (newPost.title==""){
                alert("post must have a title");
            }
            else if (newPost.body==''){
                alert("post must have a body");
            }
            else{
                const response = await fetch(`http://localhost:8080/posts`, {method: 'POST', body: JSON.stringify(newPost)});
                if (!response.ok){
                    throw new Error("error while trying creating post with id: " + id);
                }
                let newPostList = [].concat(postsList, newPost); //updating the post in the alreay fetched list. save us from fetching the list again.
                setPostsList(newPostList);
                setAllPostsList(prev=>[].concat(prev, newPost)); //update all posts list
                setId(id=>id+1);  //update the run id of posts
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
                   value={newPost.title} type="text" />
                <label className="label">body: </label>
                <input onChange={handleBody } className="input"
                   value={newPost.body} type="text" />
               <button onClick={handleSubmit} className="btn"
                       type="submit">
                   publish post
               </button>
           </form>
       </div>
   );
}

export default CreatePostCard;
