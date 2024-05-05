import React, { useState} from 'react'
import '../../styles/components/updateCard.css'
import closeImg from '../../assets/close.png'


function UpdateTodoCard({todosList, setTodosList, setClose, searchParams, setSearchParams}){

    //find todo to update by the params
    let todoId = searchParams.get('updateTodoId');
    const todo = todosList.filter(t=>t.id == todoId)[0];

   // todo entity
   const [newTodo, setNewTodo] = useState({...todo});

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
                const response = await fetch(`http://localhost:8080/todos/${todo.id}`, {method: 'PUT', body: JSON.stringify(newTodo)});
                //const res = await response.json()
                if (!response.ok){
                    throw new Error("error while trying updating task with id: " + todo.id);
                }
                let indexOfTodo = todosList.indexOf(todo);
                let newTodoList = [...todosList];
                newTodoList[indexOfTodo] = newTodo; //updating the todo in the alreay fetched list. save us from fetching the list again.
                setTodosList(newTodoList);
            }

        }
        catch(err){
            console.log(err);
        }
        finally{
            searchParams.delete('updateTodoId');
            setSearchParams(searchParams)
            setClose(true)
        }
   };

   //close window of updating
   function closeUpdateTodo(){
    searchParams.delete("updateTodoId");
    setSearchParams(searchParams);
    setClose(true); //close card of updating
  }

   return (
       <div className="updateCreateContainer">
           <button className = "closeBtn" onClick = {closeUpdateTodo}><img src = {closeImg}/></button>
           <form className="updateCreateForm">
               <h1>{todo.id}</h1>
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
                   update task
               </button>
           </form>
       </div>
   );
}

export default UpdateTodoCard;
