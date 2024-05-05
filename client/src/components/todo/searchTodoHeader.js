import React , {useState} from 'react'
import { useSearchParams } from 'react-router-dom';
import '../../styles/components/searchCardHeader.css'

function SearchTodoHeader() {

    const [searchParams, setSearchParams] = useSearchParams();

    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [searchCompleted, setSearchCompleted] = useState(null);

    // Handling the id change
   const handleId= (e) => {
        setId(e.target.value);
    };

    // Handling the title change
    const handleTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleSearchCompleted = (e)=>{
        const isCompleted = document.getElementById('todoFilterCompleted').value;
        if(isCompleted == "true"){
            setSearchCompleted(true);
        }
        else if(isCompleted == "false"){
            setSearchCompleted(false);
        }
        else if (isCompleted == 'all'){
            setSearchCompleted(null);

        }
    }

    // Handling the final search button
    const handleSubmit = (e) => {
        e.preventDefault();    
        if (id!=""){ //user want to search by id
            searchParams.set("idSearch", id);
        }
        if (title!=""){  //user want to search by title
            searchParams.set("titleSearch", title);
        }
        if (searchCompleted !=null){ //search by completed/or not tasks
            searchParams.set("completedSearch", searchCompleted);
        }
        else if(searchCompleted == null){ //show all tasks
            searchParams.delete('completedSearch');
        }
        setSearchParams(searchParams);
    }

    //handle the clear button. clear the search rules
    const clearHandle = () =>{
        setId("");
        setTitle("");
        setSearchCompleted(null);
        searchParams.delete('titleSearch');
        searchParams.delete('idSearch');
        searchParams.delete('completedSearch');
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
            <div className = "boxContainer">
                <h1>completed</h1>
                <select className = "todoFilterInput" id = "todoFilterCompleted" onChange = {handleSearchCompleted} >
                    <option value="all">all</option>
                    <option value="true">completed</option>
                    <option value="false">uncompleted</option>
                </select>
            </div>
        </div>
        <div className = "finalSerchBtn">
            <button className = "buttonCard searchBtn" onClick = {handleSubmit}>search</button>
            <button className = "buttonCard clearSearchBtn" onClick = {clearHandle}>clear</button>
        </div>
    </header>
  )
}

export default SearchTodoHeader;


