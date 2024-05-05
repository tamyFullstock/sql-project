import React from 'react'
import '../../styles/components/cardsListHeader.css'

function PostListHeader({ setClose, allPosts, setAllPosts}) {

  return (
    <div className = "cardsListHeader">
        <h1 className="cardsTitle">Your posts:</h1>
        <div className = "cardBtns">
          {allPosts ? <button className = "buttonCard allPostsCardBtn" onClick = {()=>setAllPosts(false)}>your posts</button>:
              <button className = "buttonCard allPostsCardBtn" onClick = {()=>setAllPosts(true)}>all posts</button>}
              
              <button className = "buttonCard createCardBtn" onClick = {()=>setClose(false)}>publish new post</button>
        </div>

    </div>
  )
}

export default PostListHeader



