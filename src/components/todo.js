import React from "react";
import { useState, useReducer } from "react";
import "./todo.css";
import { ACTIONS, initialState, reducer } from "./reducer";



function ToDo() {
  const [text, setText] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);
  const[toggleButton, setToggleButton] = useState(true);

  const handleAddToDo = (taskToAdd) => {dispatch({ type: ACTIONS.ADD_TODO, payload: taskToAdd })};

  const handleEdit = (item) =>{setToggleButton(false)
  dispatch({type: ACTIONS.EDIT_TODO, payload: {id: item.id, text: text}})
  console.log(item.task)
  console.log(item)
  };
  return (
    <>
      <div className="container">
        <div className="centered-div">
          <h1>What's the Plan for Today?</h1>
          <div>
              <input
                type="text"
                className="todo-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add New Tasks Here"
              ></input>
              {toggleButton ? 
              <button
                className="todo-button"
                type="submit" onClick={(e) => {
                  e.preventDefault();
                  handleAddToDo(text);
                  setText("");
                  console.log("Task has been submitted");
                }}>Add Task</button>
                : 
                <button  className="todo-button" type="submit" onClick={(e)=>{
                  e.preventDefault();
                  setToggleButton(true);
                  console.log('Update button is clicked')}}>Update</button>
              }
            <ListComponent data={state} />
          </div>
        </div>
      </div>
    </>
  );

  //This is the List Componenet
  function ListComponent({ data }) {
    return <ul>{iterationList(data)}</ul>;
  }
  
  function iterationList(data) {
    if (!data) return;
    return (
      <>
        {data.map((todo) => (
          <li key={todo.id}>
          <div className="row-container">
               {todo.task}
               <div className="button-container">
               <button id="edit-button" onClick={()=>handleEdit(todo)}> Edit</button>
               <button  id="delete-button" onClick={()=> dispatch({type: ACTIONS.DELETE_TODO, payload: todo.id})}>Done</button>
                </div>
          </div>
          </li>
        ))}
      </>
    );
  }
}


export default ToDo;
