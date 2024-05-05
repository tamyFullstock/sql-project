import React, {useEffect, useState} from 'react'
import {useSetFetchError} from '../helpers/ThemeProvider'
import { useSearchParams } from 'react-router-dom'
import '../styles/pages/Cards.css'
import TodoCard from '../components/todo/todoCard'
import TodoListHeader from '../components/todo/todoListHeader'
import SearchHeader from '../components/todo/searchTodoHeader'
import UpdateCard from '../components/todo/updateTodoCard'
import CreateCard from '../components/todo/CreateTodoCard'


function Todos() {

  const user = JSON.parse(localStorage.getItem("user")); //current user

  const setFetchingError = useSetFetchError(); //error while fetching data

  const [todosList, setTodosList] = useState([]); //list todos of user

  const [isLoading, setIsLoading] = useState(true); //still not get the data yet

  const [searchParams, setSearchParams] = useSearchParams(); //use it to sort/ filter the tasks

  const [closeUpdateForm, setCloseUpdateForm] = useState(true); //show update task board or not

  const [closeCreateForm, setCloseCreateForm] = useState(true); //show create task or not

  const [runId, setRunId] = useState(1);

  const sortRule = searchParams.get('sort');

  function sortByFunc(a,b){return a.id-b.id};

  switch (sortRule){
    case 'id':
        sortByFunc = (a,b)=>{return a.id-b.id}; //order by id
        break;
    case 'completed':
        sortByFunc = (a,b)=>{return (!a.completed && b.completed ? -1 : 1);}; //order from uncompleted to ompleted task
        break;
    case 'letters':
        sortByFunc = (a,b)=>{return (a.title).localeCompare(b.title);}; //order by a-z
        break;
    default:
        sortByFunc = (a,b) => { return Math.random() - 0.5}; //random order

    }

    //filter the tasks list
    const searchById = searchParams.get('idSearch');
    const searchByTitle = searchParams.get('titleSearch');
    const searchByCompleted = searchParams.get('completedSearch');

    function filterById(t){
        if(searchById!="" && searchById){ //want to filter by id
            return t.id == searchById
        }
        return true;
    }

    function filterByTitle(t){
        if(searchByTitle!="" && searchByTitle){ //want to filter by title
            return t.title.includes(searchByTitle)  
        }
        return true;
    }

    function filterByCompleted(t){  //want to filter by completed or not tasks
        if(searchByCompleted!="" && searchByCompleted!=null){
            if(searchByCompleted == 'true'){ //return only completed tasks
                return t.completed;
            }
            return !t.completed;  //return only not completed tasks
        }
        return true;
    }

    function fullFilter(t){ //filter function of all filter rules. id/title/complted
        return filterById(t) && filterByTitle(t) && filterByCompleted(t);
    }
    
  useEffect(
    ()=>{
        async function getTodos(){   
            try{
                const response = await fetch("http://localhost:8080/todos");
                const listTodos = await response.json()
                if (!response.ok){
                    throw new Error("error getting user's todos");
                }
                setRunId(parseInt(listTodos[listTodos.length-1].id)+1)
                const userTodoList = listTodos.filter((todo)=>{
                    return (todo.userId == user.id)
                })
                setTodosList(userTodoList);
            }
            catch(err){
                console.log(err)
                setFetchingError(true);  //set error 
            }
            finally{
                setIsLoading(false);
            }
        }

        getTodos();
    },[]
  )

  
 const toDosEle = todosList.filter(t=>fullFilter(t)).sort((a,b)=>sortByFunc(a,b)).map(
    (todo)=>{
            return(
                <TodoCard todo = {todo} key = {todo.id} todoList = {todosList} setTodoList = {setTodosList} 
                setClose={setCloseUpdateForm} searchParams = {searchParams} setSearchParams={setSearchParams}/>
            );
    });

  return (
        <section className = "cardsListContainer">
            <SearchHeader/>
            <TodoListHeader setSearchParams={setSearchParams} searchParams={searchParams} setClose = {setCloseCreateForm}/>

                {!closeUpdateForm && <div className = "updateCreateCard">
                    <UpdateCard todosList={todosList} setTodosList={setTodosList} setClose={setCloseUpdateForm} searchParams = {searchParams} setSearchParams={setSearchParams} />
                </div>}
                {!closeCreateForm && <div className = "updateCreateCard">
                    <CreateCard todosList={todosList} setTodosList={setTodosList} setClose={setCloseCreateForm} id = {runId} setId = {setRunId}/>
                </div>}

                {!isLoading && <div className="cardsList">
                    {
                        todosList.length > 0 ? (
                            <section className = "cardsListSection">
                                {toDosEle}
                            </section>

                        ) : (
                                <h2>you do not have tasks yet</h2>
                            )
                    }
                </div>}
                {isLoading && <h1>Loading..</h1>}
            </section>
    
  )
}

export default Todos



