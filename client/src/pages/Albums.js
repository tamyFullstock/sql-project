import React, {useEffect, useState} from 'react'
import {useSetFetchError} from '../helpers/ThemeProvider'
import { useSearchParams } from 'react-router-dom'
import '../styles/pages/Cards.css'
import AlbumCard from '../components/albums/albumCard'
import AlbumListHeader from '../components/albums/albumListHeader'
import SearchHeader from '../components/albums/searchAlbumHeader'
import CreateCard from '../components/albums/CreateAlbumCard'


function Albums() {

  const user = JSON.parse(localStorage.getItem("user")); //current user

  const setFetchingError = useSetFetchError(); //error while fetching data

  const [albumsList, setAlbumsList] = useState([]); //list albums of user

  const [isLoading, setIsLoading] = useState(true); //still not get the data yet

  const [searchParams, setSearchParams] = useSearchParams(); 

  const [closeCreateForm, setCloseCreateForm] = useState(true); //show create album or not

  const [runId, setRunId] = useState(1);

    //filter the albums list
    const searchById = searchParams.get('idSearch');
    const searchByTitle = searchParams.get('titleSearch');

    function filterById(a){
        if(searchById!="" && searchById){ //want to filter by id
            return a.id == searchById
        }
        return true;
    }

    function filterByTitle(a){
        if(searchByTitle!="" && searchByTitle){ //want to filter by title
            return a.title.includes(searchByTitle)  
        }
        return true;
    }

    function fullFilter(a){ //filter function of all filter rules. id/title
        return filterById(a) && filterByTitle(a);
    }


  useEffect(
    ()=>{
        async function getAlbums(){   
            try{
                const response = await fetch("http://localhost:3000/albums");
                const listAlbumsUsers = await response.json()
                if (!response.ok){
                    throw new Error("error getting user's albums");
                }
                setRunId(parseInt(listAlbumsUsers[listAlbumsUsers.length-1].id)+1)
                const userAlbumList = listAlbumsUsers.filter((a)=>{
                    return (a.userId == user.id)
                })
                setAlbumsList(userAlbumList);
            }
            catch(err){
                console.log(err)
                setFetchingError(true);  //set error 
            }
            finally{
                setIsLoading(false);
            }
        }

        getAlbums();
    },[]
  )
 
  const albumsEle = albumsList.filter(a=>fullFilter(a)).map(
    (album)=>{
            return(
                <AlbumCard album = {album} key = {album.id} albumList = {albumsList} setAlbumList = {setAlbumsList} 
                 searchParams = {searchParams} setSearchParams={setSearchParams}/>
                );
    });

  return (
        <section className = "cardsListContainer">
            <SearchHeader/>
            <AlbumListHeader setSearchParams={setSearchParams} searchParams={searchParams} setClose = {setCloseCreateForm}/>

                {!closeCreateForm && <div className = "updateCreateCard">
                    <CreateCard albumsList={albumsList} setAlbumsList={setAlbumsList} setClose={setCloseCreateForm} id = {runId} setId = {setRunId}/>
                </div>}

                {!isLoading && <div className="cardsList">
                    {
                        albumsList.length > 0 ? (
                            <section className = "cardsListSection">
                                {albumsEle}
                            </section>

                        ) : (
                                <h2>you do not have albums yet</h2>
                            )
                    }
                </div>}
                {isLoading && <h1>Loading..</h1>}
            </section>
    
  )
}

export default Albums



