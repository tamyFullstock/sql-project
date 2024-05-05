import React, { useState} from 'react'
import '../../styles/components/updateCard.css'
import closeImg from '../../assets/close.png'


function CreateTodoCard({todosList, setTodosList, setClose, searchParams, setSearchParams, id, setId}){

    const userId = (JSON.parse(localStorage.getItem("user"))).id; //current userId

   // todo entity
   const [newTodo, setNewTodo] = useState({userId: parseInt(userId), id: id.toString(), title:"", completed:false});

   // Handling the title change
   const handleTitle = (e) => {
        setNewTodo((prev)=>({...prev, title: e.target.value}));
   };

   // Handling the completed change
  const handleCompleted = (e) => {
        let isCompleted = false;
        if (e.target.checked){
            isCompleted = true;
        }
        setNewTodo((prev)=>({...prev, completed: isCompleted}));
  };

   // Handling the form submission
   async function handleSubmit(e){
        try{
            e.preventDefault();
            if (newTodo.title==""){
                alert("title must have a value");
            }
            else{
                const response = await fetch(`http://localhost:8080/todos`, {method: 'POST', body: JSON.stringify(newTodo)});
                if (!response.ok){
                    throw new Error("error while trying creating task with id: " + id);
                }
                let newTodoList = [].concat(todosList, newTodo); //updating the todo in the alreay fetched list. save us from fetching the list again.
                setTodosList(newTodoList);
                setId(id=>id+1); //update the run id of todos
            }

        }
        catch(err){
            console.log(err);
        }
        finally{
            setClose(true)
        }
   };


   return (
       <div className="updateCreateContainer">
           <button className = "closeBtn" onClick = {()=>setClose(true)}><img src = {closeImg}/></button>
           <form className="updateCreateForm">
               <h1>{id}</h1>
               <label className="label">title: </label>
               <input onChange={handleTitle } className="input"
                   value={newTodo.title} type="text" />

                <div className = "completedUpdateCreateDiv">
                    <label className="label">completed: </label>
                    <input onChange={handleCompleted } className="input"
                        checked = {newTodo.completed} type="checkbox"/>
                </div>
               <button onClick={handleSubmit} className="btn"
                       type="submit">
                   create task
               </button>
           </form>
       </div>
   );
}

export default CreateTodoCard;