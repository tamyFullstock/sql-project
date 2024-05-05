import React, {useEffect, useState} from 'react'
import {useSetFetchError} from '../helpers/ThemeProvider'
import { useSearchParams, Link, useParams } from 'react-router-dom'
import '../styles/pages/Cards.css'
import PhotoCard from '../components/photos/photoCard'
import PhotoListHeader from '../components/photos/photoListHeader'
import UpdateCard from '../components/photos/updatePhotoCard'
import CreateCard from '../components/photos/CreatePhotoCard'
import PhotosPagination from '../components/photos/photosPagination'


function Photos() {

  const albumId = useParams().id;

  const [album, setAlbum] = useState({});

  const setFetchingError = useSetFetchError(); //error while fetching data

  const [photosList, setPhotosList] = useState([]); //list photos of album

  const [isLoading, setIsLoading] = useState(true); //still not get the data yet

  const [searchParams, setSearchParams] = useSearchParams(); 

  const [closeUpdateForm, setCloseUpdateForm] = useState(true); //show update photo board or not

  const [closeCreateForm, setCloseCreateForm] = useState(true); //show create photo or not

  const [runId, setRunId] = useState(1);

  useEffect(

    ()=>{
        async function getAlbum(){   
            try{
                const response = await fetch("http://localhost:3000/albums");
                const listAlbumsUsers = await response.json()
                if (!response.ok){
                    throw new Error("error getting user's albums");
                }
                setAlbum(listAlbumsUsers.filter((a)=>{
                    return (a.id == albumId)
                })[0]);
            }
            catch(err){
                console.log(err)
                setFetchingError(true);  //set error 
            }
            finally{
                setIsLoading(false);
            }
        }

        getAlbum();
    },[]
  )

  useEffect(
    ()=>{
    async function getPhotos(){   
        try{
            const response = await fetch("http://localhost:3000/photos");
            const listPhotosUsers = await response.json()
            if (!response.ok){
                throw new Error(`error getting album ${album.id} photos`);
            }
            setRunId(parseInt(listPhotosUsers[listPhotosUsers.length-1].id)+1)
            const userPhotoList = listPhotosUsers.filter((p)=>{
                return (parseInt(p.albumId) == parseInt(album.id))
            })
            setPhotosList(userPhotoList);
        }
        catch(err){
            console.log(err)
            setFetchingError(true);  //set error 
        }
        finally{
            setIsLoading(false);
        }
    }
    getPhotos();}
    ,
    [album]
  )
 
  const photosEle = photosList.map(
    (photo)=>{
            return(
                <PhotoCard photo = {photo} key = {photo.id} photoList = {photosList} setPhotoList = {setPhotosList} 
                setClose={setCloseUpdateForm} searchParams = {searchParams} setSearchParams={setSearchParams}/>
                );
    });

  return (
        <section className = "cardsListContainer">
            <PhotoListHeader setSearchParams={setSearchParams} searchParams={searchParams} setClose = {setCloseCreateForm}/>

                {!closeUpdateForm && <div className = "updateCreateCard">
                    <UpdateCard photosList={photosList} setPhotosList={setPhotosList} setClose={setCloseUpdateForm} searchParams = {searchParams} setSearchParams={setSearchParams} />
                </div>}
                {!closeCreateForm && <div className = "updateCreateCard">
                    <CreateCard photosList={photosList} setPhotosList={setPhotosList} setClose={setCloseCreateForm} id = {runId} setId = {setRunId} />
                </div>}
                <h1 className='albumTitle'>album id: {album.id}</h1>
                <h1 className='albumTitle'>album name: {album.title}</h1>
                {!isLoading && <div className="cardsList">
                    {
                        photosList.length > 0 ? (
                            <section className = "cardsListSection">
                                <PhotosPagination photosList = {photosEle}/>
                            </section>

                        ) : (
                                <h2>album do not have photos yet</h2>
                            )
                    }
                </div>}
                {isLoading && <h1>Loading..</h1>}
            </section>
    
  )
}

export default Photos



