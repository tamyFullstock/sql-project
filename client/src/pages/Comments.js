import React, {useEffect, useState} from 'react'
import {useSetFetchError} from '../helpers/ThemeProvider'
import { useSearchParams, Link } from 'react-router-dom'
import '../styles/pages/Cards.css'
import CommentCard from '../components/comments/commentCard'
import CommentListHeader from '../components/comments/commentListHeader'
import UpdateCard from '../components/comments/updateCommentCard'
import CreateCard from '../components/comments/CreateCommentCard'
import { usePostContext } from '../components/SinglePostLayout'

function Comments() {

  const post = usePostContext(); //current post

  const setFetchingError = useSetFetchError(); //error while fetching data

  const [commentsList, setCommentsList] = useState([]); //list comments of user

  const [isLoading, setIsLoading] = useState(true); //still not get the data yet

  const [searchParams, setSearchParams] = useSearchParams(); 

  const [closeUpdateForm, setCloseUpdateForm] = useState(true); //show update comment board or not

  const [closeCreateForm, setCloseCreateForm] = useState(true); //show create comment or not

  const [runId, setRunId] = useState(1);

  useEffect(
    ()=>{
        async function getComments(){   
            try{
                const response = await fetch("http://localhost:8080/comments");
                const listComments = await response.json()
                if (!response.ok){
                    throw new Error(`error getting post ${post.id}'s comments`);
                }
                setRunId(parseInt(listComments[listComments.length-1].id)+1)
                const PostCommentList = listComments.filter((c)=>{
                    return (c.postId == post.id)
                })
                setCommentsList(PostCommentList);
            }
            catch(err){
                console.log(err)
                setFetchingError(true);  //set error 
            }
            finally{
                setIsLoading(false);
            }
        }

        getComments();
    },[]
  )

  
 const commentsEle = commentsList.map(
    (comment)=>{
            return(
                <CommentCard comment = {comment} key = {comment.id} commentList = {commentsList} setCommentList = {setCommentsList} 
                setClose={setCloseUpdateForm} searchParams = {searchParams} setSearchParams={setSearchParams}/>
                );
    });

  return (
        <section className = "cardsListContainer">
            <CommentListHeader setSearchParams={setSearchParams} searchParams={searchParams} setClose = {setCloseCreateForm}/>

                {!closeUpdateForm && <div className = "updateCreateCard">
                    <UpdateCard commentsList={commentsList} setCommentsList={setCommentsList} setClose={setCloseUpdateForm} searchParams = {searchParams} setSearchParams={setSearchParams} />
                </div>}
                {!closeCreateForm && <div className = "updateCreateCard">
                    <CreateCard commentsList={commentsList} setCommentList={setCommentsList} setClose={setCloseCreateForm} id = {runId} setId = {setRunId}/>
                </div>}

                {!isLoading && <div className="cardsList">
                    {
                        commentsList.length > 0 ? (
                            <section className = "cardsListSection">
                                {commentsEle}
                            </section>

                        ) : (
                                <h2>{`post number ${post.id} does not have comments yet`}</h2>
                            )
                    }
                </div>}
                {isLoading && <h1>Loading..</h1>}
            </section>
    
  )
}

export default Comments;



