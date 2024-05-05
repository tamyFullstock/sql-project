import React , {useState} from 'react'
import { useSearchParams } from 'react-router-dom';
import '../../styles/components/searchCardHeader.css'

function SearchAlbumHeader() {

    const [searchParams, setSearchParams] = useSearchParams();

    const [id, setId] = useState("");
    const [title, setTitle] = useState("");

    // Handling the id change
   const handleId= (e) => {
        setId(e.target.value);
    };

    // Handling the title change
    const handleTitle = (e) => {
        setTitle(e.target.value);
    };

    // Handling the final search button
    const handleSubmit = (e) => {
        e.preventDefault();    
        if (id!=""){ //user want to search by id
            searchParams.set("idSearch", id);
        }
        if (title!=""){  //user want to search by title
            searchParams.set("titleSearch", title);
        }
        setSearchParams(searchParams);
    }

    //handle the clear button. clear the search rules
    const clearHandle = () =>{
        setId("");
        setTitle("");
        searchParams.delete('titleSearch');
        searchParams.delete('idSearch');
        setSearchParams(searchParams);
    }

  return (
    <header className='searchBtnContainer'>
        <h1>search by:</h1>
        <div className = "searchBoxesContainer">
            <div className = "boxContainer"> 
                <h1>id</h1>
                <input className = "cardFilterInput" onChange = {handleId} type = "number" value = {id} />
            </div>
            <div className = "boxContainer">
                <h1>title</h1>
                <input className = "cardFilterInput" onChange = {handleTitle} type = "text" value = {title} />
            </div>
        </div>
        <div className = "finalSerchBtn">
            <button className = "buttonCard searchBtn" onClick = {handleSubmit}>search</button>
            <button className = "buttonCard clearSearchBtn" onClick = {clearHandle}>clear</button>
        </div>
    </header>
  )
}

export default SearchAlbumHeader;


