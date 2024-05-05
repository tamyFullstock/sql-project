import React from 'react'
import PostImg from '../../assets/postBobble.jpg'
import '../../styles/pages/Cards.css'
import { useSearchParams, Link } from 'react-router-dom';



function PostCard({setAllPosts, allPosts, post, postList, setPostList, setClose, searchParams, setSearchParams}) {

  const userId = JSON.parse(localStorage.getItem("user")).id; //current user id

  async function deletePost(){
    try{
      const response = await fetch(`http://localhost:8080/posts/${post.id}`, {method: 'DELETE'});
      if (!response.ok){
          throw new Error("error while trying delete the post with id: " + post.id);
      }
      let indexOfPost = postList.indexOf(post);
      let newPostList = [...postList];
      newPostList.splice(indexOfPost,1); //delete the post from the list of posts who have been fetched yet. save us from fetching the list again.
      setPostList(newPostList);
      //delete from all posts of users list also
      indexOfPost = allPosts.indexOf(post);
      newPostList = [...allPosts];
      newPostList.splice(indexOfPost,1); //delete the post from the list of posts who have been fetched yet. save us from fetching the list again.
      setAllPosts(newPostList);
    }
    catch(err){
      console.log(err)
    }
  }

  function updatePost(){
    setClose(false); //show card of updating
    searchParams.set("updatePostId", post.id)
    setSearchParams(searchParams);
  }

  const isUserPost = userId == post.userId ? true : false;
  
  return (
    <div className = "singleCard" >
        <Link  className = "singleCardLink imgCardLink" to = {`/posts/${post.id}`} state = {{search: searchParams.toString()}}>
        <img src = {PostImg} className = "imgCard imgCardPost"/></Link>
        <div className = "singleCardInfo">
                <h3>{post.id}</h3>
                <p>{post.title}</p>
            </div>
            {isUserPost && <div className = "cardBtns">
                <button className = "buttonCard updateCardBtn" onClick = {updatePost}>update</button>
                <button className = "buttonCard deleteCardBtn" onClick = {deletePost}>delete</button>
        </div>}
    </div>
  )
}

export default PostCard