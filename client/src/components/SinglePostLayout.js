import React , {useEffect, useState, createContext, useContext} from "react"
import { NavLink, Outlet, useLocation} from "react-router-dom"
import {useParams} from 'react-router-dom';
import { useSetFetchError } from '../helpers/ThemeProvider'
import '../styles/components/NavLayout.css'

const postContext = createContext();  //make all components inherit the post have been clicked for details

export default function SinglePostLayout() {

    const location = useLocation();

    const search = location.state?.search || ""; //use it to maintain params between pages

    const isInComments = location.pathname.split('/')[3] == "comments" ? true : false;

    const params =  useParams();

    const setFetchingError = useSetFetchError(); //error while fetching data

    const [post, setPost] = useState({});

    const [isLoading, setIsLoading] = useState(true);

    useEffect(
        ()=>{
            async function getPost(){   
                try{
                    const response = await fetch(`http://localhost:8080/posts/${params.id}`);
                    const Post = await response.json()
                    if (!response.ok){
                        throw new Error(`error getting user's post with id: ${params.id}`);
                    }
                    setPost(Post);
                }
                catch(err){
                    console.log(err)
                    setFetchingError(true);  //set error 
                }
                finally{
                    setIsLoading(false);
                }
            }
    
            getPost();
            
        },[]
      )
    
    
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }
    
    return (
        <div>
        <header className = "headerNav">
            <nav>
                {isInComments ? 
                <NavLink 
                    to="./"
                    state = {{search: search}}
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    back to post
                </NavLink>:
                <NavLink 
                to={`/home/posts?${search}`}
                style={({isActive}) => isActive ? activeStyles : null}
            >
                back to all posts
            </NavLink>}
            </nav>
        </header>
        <postContext.Provider value = {post}>
            {!isLoading && <Outlet/>}
            {isLoading && <h1>loading..</h1>}
        </postContext.Provider>
        </div>
    )
}


export function usePostContext(){
    return useContext(postContext);
}