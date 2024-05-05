import React, {useEffect, useState} from 'react'
import {useSetFetchError} from '../helpers/ThemeProvider'
import { useSearchParams, Link } from 'react-router-dom'
import '../styles/pages/Cards.css'
import PostCard from '../components/posts/postCard'
import PostListHeader from '../components/posts/postListHeader'
import SearchHeader from '../components/posts/searchPostHeader'
import UpdateCard from '../components/posts/updatePostCard'
import CreateCard from '../components/posts/CreatePostCard'


function Posts() {

  const user = JSON.parse(localStorage.getItem("user")); //current user

  const setFetchingError = useSetFetchError(); //error while fetching data

  const [postsList, setPostsList] = useState([]); //list posts of user

  const [allPostsList, setAllPostsList] = useState([]); //all posts of all users

  const [isLoading, setIsLoading] = useState(true); //still not get the data yet

  const [searchParams, setSearchParams] = useSearchParams(); //use it to sort/ filter the tasks

  const [closeUpdateForm, setCloseUpdateForm] = useState(true); //show update task board or not

  const [closeCreateForm, setCloseCreateForm] = useState(true); //show create task or not

  const [runId, setRunId] = useState(1);

  const [allPosts, setAllPosts] = useState(true); //show all the posts or only the user's posts

    //filter the tasks list
    const searchById = searchParams.get('idSearch');
    const searchByTitle = searchParams.get('titleSearch');

    function filterById(t){
        if(searchById!="" && searchById){ //want to filter by id
            return t.id == searchById
        }
        return true;
    }

    function filterByTitle(t){
        if(searchByTitle!="" && searchByTitle){ //want to filter by title
            return t.title.includes(searchByTitle)  
        }
        return true;
    }

    function fullFilter(t){ //filter function of all filter rules. id/title
        return filterById(t) && filterByTitle(t);
    }


  useEffect(
    ()=>{
        async function getPosts(){   
            try{
                const response = await fetch("http://localhost:8080/posts");
                const listPostsUsers = await response.json()
                if (!response.ok){
                    throw new Error("error getting user's posts");
                }
                setRunId(parseInt(listPostsUsers[listPostsUsers.length-1].id)+1)
                setAllPostsList(listPostsUsers);
                const userPostList = listPostsUsers.filter((p)=>{
                    return (p.userId == user.id)
                })
                setPostsList(userPostList);
            }
            catch(err){
                console.log(err)
                setFetchingError(true);  //set error 
            }
            finally{
                setIsLoading(false);
            }
        }

        getPosts();
    },[]
  )

  const showPostList = allPosts ? allPostsList : postsList; //all posts or only user's posts
 
  const postsEle = showPostList.filter(p=>fullFilter(p)).map(
    (post)=>{
            return(
                <PostCard post = {post} key = {post.id} postList = {postsList} setPostList = {setPostsList} 
                setClose={setCloseUpdateForm} searchParams = {searchParams} setSearchParams={setSearchParams} 
                setAllPosts= {setAllPostsList} allPosts= {allPostsList} />
                );
    });

  return (
        <section className = "cardsListContainer">
            <SearchHeader/>
            <PostListHeader setSearchParams={setSearchParams} searchParams={searchParams} setClose = {setCloseCreateForm}
                             allPosts = {allPosts} setAllPosts = {setAllPosts} />

                {!closeUpdateForm && <div className = "updateCreateCard">
                    <UpdateCard postsList={postsList} setPostsList={setPostsList} setClose={setCloseUpdateForm} searchParams = {searchParams} setSearchParams={setSearchParams} setAllPosts= {setAllPostsList} allPosts= {allPostsList}/>
                </div>}
                {!closeCreateForm && <div className = "updateCreateCard">
                    <CreateCard postsList={postsList} setPostsList={setPostsList} setClose={setCloseCreateForm} id = {runId} setId = {setRunId}  setAllPostsList= { setAllPostsList}/>
                </div>}

                {!isLoading && <div className="cardsList">
                    {
                        postsList.length > 0 ? (
                            <section className = "cardsListSection">
                                {postsEle}
                            </section>

                        ) : (
                                <h2>you do not have posts yet</h2>
                            )
                    }
                </div>}
                {isLoading && <h1>Loading..</h1>}
            </section>
    
  )
}

export default Posts



