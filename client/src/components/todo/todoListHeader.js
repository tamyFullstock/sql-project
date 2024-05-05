import React from 'react'
import '../../styles/components/cardsListHeader.css'

function todoListHeader({searchParams, setSearchParams, setClose}) {

    function  orderByHandleFunc(e){
        let value = document.getElementById('selectSortTodo').value;
        switch(value){
            
            case '1': //sort by id
                searchParams.set('sort', "id");
                break;
            case '2':
                searchParams.set('sort', "completed");
                break;
            case '3':
                searchParams.set('sort', "letters");
                break;
            case '4':
                searchParams.set('sort', "random");
            default:
        }
        setSearchParams(searchParams);
    }

  return (
    <div className = "cardsListHeader">
        <h1 className="cardsTitle">Your tasks:</h1>
        <div className = "cardBtns">
            <div className = "orderContainer">
                <h1 className = "orderByLabel">order by:</h1>
                <select id = "selectSortTodo" onChange = {orderByHandleFunc} className="orderBySelect">
                    <option value="1">id</option>
                    <option value="2">uncompleted to completed</option>
                    <option value="3">a-z</option>
                    <option value="4">random</option>
                </select>
            </div>
            <button className = "buttonCard createCardBtn" onClick = {()=>setClose(false)}>create new task</button>
        </div>

    </div>
  )
}

export default todoListHeader



