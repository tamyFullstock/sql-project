import React, {useContext} from 'react'
import PostImg from '../../assets/postBobble.jpg'
import '../../styles/pages/detailedCard.css'
import {usePostContext} from '../SinglePostLayout'
import { useNavigate , Link, useLocation } from 'react-router-dom'

function SinglePost() {

    const navigation = useNavigate();

    const post = usePostContext(); //current post

    const location = useLocation();

    const search = location.state?.search || ""; //use it to maintain params between pages

    return (
    <div className = "fullScreeenDetailed">
    <div className = "detailedCardContainer" >
        <img src = {PostImg} className = "imgDetailedCard"/>
        <div className = "detailedCardInfo">
                <h3>{post.id}</h3>
                <h4>{post.title}</h4>
                <p>{post.body}</p>
            </div>
            <div className = "detailedCardBtns">
                <Link to = {`comments`} state = {{search: search}}><button className = "buttonCard showCommentsBtn" >show all comments</button></Link>
        </div>
    </div>
    </div>
  )
}

export default SinglePost

