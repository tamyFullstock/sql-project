import React, { useState} from 'react'
import '../../styles/components/updateCard.css'
import closeImg from '../../assets/close.png'


function UpdateCommentCard({commentsList, setCommentsList, setClose, searchParams, setSearchParams}){

    //find post to update by the params
    let commentId = searchParams.get('updateCommentId');
    const comment = commentsList.filter(c=>c.id == commentId)[0];

    console.log(comment);

   // comment entity
   const [newComment, setNewComment] = useState({...comment});

   // Handling the name change
   const handleName = (e) => {
        setNewComment((prev)=>({...prev, name: e.target.value}));
   };

    // Handling the body change
    const handleBody = (e) => {
        setNewComment((prev)=>({...prev, body: e.target.value}));
    };

   // Handling the form submission
   async function handleSubmit(e){
        try{
            e.preventDefault();
            if (newComment.name==""){
                alert("comment'name must have a value");
            }
            if (newComment.body==""){
                alert("comment's body must have a value");
            }
            else{
                console.log(newComment);
                const response = await fetch(`http://localhost:8080/comments/${commentId}`, {method: 'PUT', body: JSON.stringify(newComment)});
                if (!response.ok){
                    throw new Error("error while trying updating comment with id: " + comment.id);
                }
                let indexOfComment = commentsList.indexOf(comment);
                let newCommentList = [...commentsList];
                newCommentList[indexOfComment] = newComment; //updating the comment in the alreay fetched list. save us from fetching the list again.
                setCommentsList(newCommentList);
            }

        }
        catch(err){
            console.log(err);
        }
        finally{
            searchParams.delete('updateCommentId');
            setSearchParams(searchParams)
            setClose(true)
        }
   };

   //close window of updating
   function closeUpdateComment(){
    searchParams.delete("updateCommentId");
    setSearchParams(searchParams);
    setClose(true); //close card of updating
  }


   return (
       <div className="updateCreateContainer">
           <button className = "closeBtn" onClick = {closeUpdateComment}><img src = {closeImg}/></button>
           <form className="updateCreateForm">
               <h1>{comment.id}</h1>
               <label className="label">name: </label>
               <input onChange={handleName } className="input"
                   value={newComment.name} type="text" />

                <label className="label">body: </label>
               <input onChange={handleBody} className="input"
                   value={newComment.body} type="text" />

               <button onClick={handleSubmit} className="btn"
                       type="submit">
                   change comment
               </button>
           </form>
       </div>
   );
}

export default UpdateCommentCard;
