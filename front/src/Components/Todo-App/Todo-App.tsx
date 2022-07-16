import React, { useEffect, useState } from 'react'
import {DragDropContext, Droppable } from 'react-beautiful-dnd'
import ImageBackgroundDark from "../../Images/Todo-App/bg-desktop-dark.jpg"
import ImageBackgroundLight from "../../Images/Todo-App/bg-desktop-light.jpg"
import TodoItem from "./TodoItem"
import { TodoDatas, User } from '../../Interfaces/TodoInterfaces'


function TodoApp() {
    const [todoUpdate, setTodoUpdate] = useState<number>(0);
    const [newTodo, setNewTodo] = useState<string>("");
    const [newTodoActive, setNewTodoActive] = useState<boolean>(false);
    const [todos, setTodos] = useState<TodoDatas[]>([]);
    const [theme, setTheme] = useState<string>("dark");
    const [filter, setFilter] = useState<string | null>("all");
    const [userDatas, setUserDatas] = useState<User | undefined>(undefined);
    const [userId, setUserId] = useState(11);

    const handleSubmit = (event: React.SyntheticEvent): void => {
        event.preventDefault();
        console.log(todos.length);
        if (newTodo != "" && (todos.filter((element: TodoDatas) => element.content === newTodo)).length <= 0) {
            fetch(`http://localhost:3000/user/addTodo/${userId}`, {    
            method: 'PUT',
            body: JSON.stringify({
                content: newTodo,
                isActive: newTodoActive,
                isComplete: false,
                pos: todos.length,
            }),
            headers: {
                'Content-type': "application/json",
            }
            })
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((datas: TodoDatas) => {
                console.log(datas);
                setTodoUpdate(todoUpdate + 1);
                setNewTodo("");
                setNewTodoActive(false);
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }

    const handleActive: Function = (index: number): void => {
        fetch(`http://localhost:3000/todo/updateActiveStatus/${todos[index].id}`, {    
            method: 'POST',
        })
        .then((response) => {
            return response.json();
        })
        .then((datas: TodoDatas) => {
            setTodoUpdate(todoUpdate + 1);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const handleComplete: Function = (index: number): void => {
        fetch(`http://localhost:3000/todo/updateCompleteStatus/${todos[index].id}`, {    
            method: 'POST',
        })
        .then((response) => {
            return response.json();
        })
        .then((datas: TodoDatas) => {
            setTodoUpdate(todoUpdate + 1);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const itemsLeft = (): number => {
        return todos.filter((element: TodoDatas) => element.isComplete == false).length;
    }

    const removeCompletedElements = (): void => {
        fetch(`http://localhost:3000/todo/deleteCompletedTodo/${userId}`, {    
            method: 'DELETE',
        })
        .then((response) => {
            return response.json();
        })
        .then((datas: TodoDatas) => {
            setTodoUpdate(todoUpdate + 1);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const displayTodoList = (): React.ReactNode[] => {
        if (filter == "all") {
            return(
                todos.map((element: TodoDatas, index: number) =>
                    <TodoItem key={index} element={element} index={index} handleActive={handleActive} handleComplete={handleComplete} theme={theme} removeItem={removeItem} />
                )
            )
        } else {
            return (
                todos.filter((element: TodoDatas) => filter === "active" ? element.isActive === true : element.isComplete === true).map((element: TodoDatas, index) =>
                    <TodoItem key={index} element={element} index={index} handleActive={handleActive} handleComplete={handleComplete} theme={theme} removeItem={removeItem} />
                )
            )
        }
    }

    const removeItem = (index: number): void => {
        fetch(`http://localhost:3000/todo/deleteTodo/${todos[index].id}`, {    
            method: 'DELETE',
            body: JSON.stringify({
                clientId: userId,
            }),
            headers: {
                'Content-type': "application/json",
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((datas: TodoDatas) => {
            setTodoUpdate(todoUpdate + 1);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const reorderItems = (sourceIdx: number, destIdx: number | undefined):void => {
        if (destIdx == undefined)
            return ;
        let newArray: TodoDatas[] = [...todos];
        newArray.splice(destIdx, 0, newArray.splice(sourceIdx, 1)[0]);
        setTodos(newArray);
        fetch(`http://localhost:3000/user/switchPos/${userId}`, {    
            method: 'POST',
            body: JSON.stringify({
                srcPos: sourceIdx,
                destPos: destIdx,
            }),
            headers: {
                'Content-type': "application/json",
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((datas: User) => {
            console.log(datas);
            setTodos(datas.todos.sort((a: TodoDatas, b: TodoDatas) => {
                return a.pos - b.pos;
            }));
            // setTodoUpdate(todoUpdate + 1);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetch(`http://localhost:3000/user/getUserTodos/${userId}`, {method: 'GET', mode: 'cors', credentials: 'same-origin'})
        .then((response) => {
            return response.json();
        })
        .then((datas) => {
            console.log(datas);
            setTodos(datas.todos.sort((a: TodoDatas, b: TodoDatas) => {
                return a.pos - b.pos;
            }));
        })
        .catch((err) => {
            console.log(err);
        })
    }, [todoUpdate])

    console.log("User = " + userDatas);

    return (
        <div className={`todo-page-container todo-page-container-${theme}`}>
            <img className='todo-img' src={theme === "dark" ? ImageBackgroundDark : ImageBackgroundLight} alt="first img"></img>
            <div className='todo-component-container'>
                <div className='header-todo-component'>
                    <h1> todo </h1>
                    <div onClick={() => theme == "dark" ? setTheme("light") : setTheme("dark")}>
                        {
                            theme == "dark" ? <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fillRule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg>
                            : <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fillRule="evenodd" d="M3 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/></svg>
                        }
                    </div>
                </div>
                <div className='todo-list-container'>
                    <ul className={`todo-list todo-list-${theme}`}>
                        <li className={`li-form li-${theme}`}>
                            <form onSubmit={handleSubmit}>
                                <label>
                                    <div className={`circle-check ${newTodoActive === true ? "circle-check-active" : ""}`} onClick={() => newTodoActive === true ? setNewTodoActive(false) : setNewTodoActive(true)}>
                                    {
                                        newTodoActive === true &&
                                            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6"/></svg>
                                    }
                                    </div>
                                    <input type='text' placeholder='Create a new todo...' value={newTodo} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTodo(e.target.value)} />
                                </label>
                            </form>
                        </li>
                        <DragDropContext onDragEnd={(result) => reorderItems(result.source.index, result.destination?.index)}>
                            <Droppable droppableId="droppable-1">
                                {(provided) => {
                                    return (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >  
                                            {displayTodoList()}
                                            {provided.placeholder}
                                        </div>
                                    );
                                }}
                            </Droppable>
                         </DragDropContext>
                        <li className={`footer-list li-${theme}`}>
                            <p> {itemsLeft()} items left </p>
                            <div className='filters'>
                                <p className={`${filter === "all" ? "filter-active" : ""}`} onClick={() => setFilter("all")}>All</p>
                                <p className={`${filter === "active" ? "filter-active" : ""}`} onClick={() => setFilter("active")}> Active </p>
                                <p className={`${filter === "completed" ? "filter-active" : ""}`} onClick={() => setFilter("completed")}> Completed </p>
                            </div>
                            <p onClick={removeCompletedElements}> Clear Completed </p>
                        </li>
                    </ul>
                </div>
                <p className='footer'> Drag and drop to reorder list </p>
            </div>
        </div>
    );
}

export default TodoApp;