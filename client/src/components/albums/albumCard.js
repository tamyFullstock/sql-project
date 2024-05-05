import React from 'react'
import AlbumImg from '../../assets/album.jpg'
import '../../styles/pages/Cards.css'
import { useSearchParams, Link } from 'react-router-dom';



function AlbumCard({album}) {

  const [searchParams, setSearchParams] = useSearchParams();
  
  return (
    <Link  className = "singleCardLink" to = {`${album.id}`} state = {{search: searchParams.toString()}}>
    <div className = "singleCard" >
        <img src = {AlbumImg} className = "imgCard albumCardImg"/>
        <div className = "singleCardInfo">
                <h3>{album.id}</h3>
                <p>{album.title}</p>
            </div>
    </div>
    </Link>
  )
}

export default AlbumCard