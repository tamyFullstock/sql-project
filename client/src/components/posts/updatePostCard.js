import React, { useState} from 'react'
import '../../styles/components/updateCard.css'
import closeImg from '../../assets/close.png'


function UpdatePostCard({allPosts, setAllPosts, postsList, setPostsList, setClose, searchParams, setSearchParams}){

    //find post to update by the params
    let postId = searchParams.get('updatePostId');
    const post = postsList.filter(p=>p.id == postId)[0];

   // post entity
   const [newPost, setNewPost] = useState({...post});

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
                alert("title must have a value");
            }
            if (newPost.body==""){
                alert("body must have a value");
            }
            else{
                const response = await fetch(`http://localhost:8080/posts/${post.id}`, {method: 'PUT', body: JSON.stringify(newPost)});
                if (!response.ok){
                    throw new Error("error while trying updating post with id: " + post.id);
                }
                let indexOfPost = postsList.indexOf(post);
                let newPostList = [...postsList];
                newPostList[indexOfPost] = newPost; //updating the post in the alreay fetched list. save us from fetching the list again.
                setPostsList(newPostList);
                //change also in the all user's posts list
                indexOfPost = allPosts.indexOf(post);
                newPostList = [...allPosts];
                newPostList[indexOfPost] = newPost; //updating the post in the alreay fetched list. save us from fetching the list again.
                setAllPosts(newPostList);
            }

        }
        catch(err){
            console.log(err);
        }
        finally{
            searchParams.delete('updatePostId');
            setSearchParams(searchParams)
            setClose(true)
        }
   };

    //close window of updating
    function closeUpdatePost(){
        searchParams.delete("updatePostId");
        setSearchParams(searchParams);
        setClose(true); //close card of updating
      }

   return (
       <div className="updateCreateContainer">
           <button className = "closeBtn" onClick = {closeUpdatePost}><img src = {closeImg}/></button>
           <form className="updateCreateForm">
               <h1>{post.id}</h1>
               <label className="label">title: </label>
               <input onChange={handleTitle } className="input"
                   value={newPost.title} type="text" />

                <label className="label">body: </label>
               <input onChange={handleBody} className="input"
                   value={newPost.body} type="text" />

               <button onClick={handleSubmit} className="btn"
                       type="submit">
                   update post
               </button>
           </form>
       </div>
   );
}

export default UpdatePostCard;
