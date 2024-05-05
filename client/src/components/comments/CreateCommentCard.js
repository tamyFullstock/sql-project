import React, { useState} from 'react'
import '../../styles/components/updateCard.css'
import closeImg from '../../assets/close.png'
import { usePostContext } from '../SinglePostLayout';

function CreateCommentCard({commentsList, setCommentList, setClose, searchParams, setSearchParams, id, setId}){

    const post = usePostContext(); //current post

    const user = (JSON.parse(localStorage.getItem("user"))); //current user

   // comment entity
   const [newComment, setNewComment] = useState({postId: parseInt(post.id), id: id.toString(), name:"", email: user.email, body: ""});

   // Handling the name change
   const handleName = (e) => {
        setNewComment((prev)=>({...prev,name: e.target.value}));
   };

   // Handling the body change
   const handleBody = (e) => {
        setNewComment((prev)=>({...prev, body: e.target.value}));
    };


   // Handling the form submission
   async function handleSubmit(e){
        try{
            e.preventDefault();
            if (newComment.title==""){
                alert("comment must have a name");
            }
            else if (newComment.body==''){
                alert("comment must have a body");
            }
            else{
                const response = await fetch(`http://localhost:8080/comments`, {method: 'POST', body: JSON.stringify(newComment)});
                if (!response.ok){
                    throw new Error("error while trying creating comment with id: " + id);
                }
                let newCommentList = [].concat(commentsList, newComment); //updating the post in the alreay fetched list. save us from fetching the list again.
                setCommentList(newCommentList);
                setId(id=>id+1); //update the run id of comments
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
               <label className="label">name: </label>
               <input onChange={handleName } className="input"
                   value={newComment.title} type="text" />
                <label className="label">body: </label>
                <input onChange={handleBody } className="input"
                   value={newComment.body} type="text" />
               <button onClick={handleSubmit} className="btn"
                       type="submit">
                   add comment
               </button>
           </form>
       </div>
   );
}

export default CreateCommentCard;
