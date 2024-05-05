import React from 'react'
import CommentImg from '../../assets/commentImg.jpg'
import '../../styles/pages/Cards.css'
import { useSearchParams, Link } from 'react-router-dom';



function CommentCard({comment, commentList, setCommentList, setClose, searchParams, setSearchParams}) {

  const userEmail = (JSON.parse(localStorage.getItem("user"))).email; //current userEmail

  const isUserComment = comment.email == userEmail; //is the comment has been written by the user

  async function deleteComment(){
    try{
      const response = await fetch(`http://localhost:8080/comments/${comment.id}`, {method: 'DELETE'});
      if (!response.ok){
          throw new Error("error while trying delete the comment with id: " + comment.id);
      }
      let indexOfComment = commentList.indexOf(comment);
      let newCommentList = [...commentList];
      newCommentList.splice(indexOfComment,1); //delete the post from the list of todo who have been fetched yet. save us from fetching the list again.
      setCommentList(newCommentList);
    }
    catch(err){
      console.log(err)
    }
  }

  function updateComment(){
    setClose(false); //show card of updating
    searchParams.set("updateCommentId", comment.id)
    setSearchParams(searchParams);
  }

  return (
    <div className = "singleCard commentCardContainer" >
        <img src = {CommentImg} className = "imgCard"/>
        <div className = "singleCardInfo">
                <h4>{comment.id}</h4>
                <h3>{comment.name}</h3>
                <h6>{comment.email}</h6>
                <p>{comment.body}</p>
            </div>
            {isUserComment && <div className = "cardBtns">
                <button className = "buttonCard updateCardBtn" onClick = {updateComment}>update</button>
                <button className = "buttonCard deleteCardBtn" onClick = {deleteComment}>delete</button>
        </div>}
    </div>
  )
}

export default CommentCard
