import React from 'react'
import TaskImg from '../../assets/task.jpg'
import '../../styles/pages/Cards.css'
import { useSearchParams } from 'react-router-dom';



function todoCard({todo, todoList, setTodoList, setClose, searchParams, setSearchParams}) {

  async function deleteTodo(){
    try{
      const response = await fetch(`http://localhost:8080/todos/${todo.id}`, {method: 'DELETE'});
      if (!response.ok){
          throw new Error("error while trying delete the todo with id: " + todo.id);
      }
      let indexOfTodo = todoList.indexOf(todo);
      let newTodoList = [...todoList];
      newTodoList.splice(indexOfTodo,1); //delete the todo from the list of todo who have been fetched yet. save us from fetching the list again.
      setTodoList(newTodoList);
    }
    catch(err){
      console.log(err)
    }
  }

  function updateTodo(){
    setClose(false); //show card of updating
    searchParams.set("updateTodoId", todo.id)
    setSearchParams(searchParams);
  }

  return (
    <div className = "singleCard" >
        <img src = {TaskImg} className = "imgCard"/>
        <div className = "singleCardInfo">
                <h3>{todo.id}</h3>
                <p>{todo.title}</p>
                <input type="checkbox" id = {`todoCheckBox${todo.id}`} name={`todoCheckBox${todo.id}`} onChange= {()=>{}}value="completed" checked = {todo.completed}/>
                <label htmlFor = {`todoCheckBox${todo.id}`}>completed</label>
            </div>
            <div className = "cardBtns">
                <button className = "buttonCard updateCardBtn" onClick = {updateTodo}>update</button>
                <button className = "buttonCard deleteCardBtn" onClick = {deleteTodo}>delete</button>
        </div>
    </div>
  )
}

export default todoCard
