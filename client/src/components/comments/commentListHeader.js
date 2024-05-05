import React from 'react'
import '../../styles/components/cardsListHeader.css'
import { usePostContext } from '../SinglePostLayout';

function CommentListHeader({ setClose}) {

  const post = usePostContext(); //current post

  return (
    <div className = "cardsListHeader">
        <h1 className="cardsTitle">{`post ${post.id}'s comments': `}</h1>
        <div className = "cardBtns">
            <button className = "buttonCard createCardBtn" onClick = {()=>setClose(false)}>add new comment</button>
        </div>
    </div>
  )
}

export default CommentListHeader



