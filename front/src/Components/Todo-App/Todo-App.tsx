import React, { Fragment, useEffect, useState } from 'react'
import {DragDropContext, Droppable } from 'react-beautiful-dnd'
import ImageBackgroundDark from "../../Images/Todo-App/bg-desktop-dark.jpg"
import ImageBackgroundLight from "../../Images/Todo-App/bg-desktop-light.jpg"
import TodoItem from "./TodoItem"
import { TodoDatas, User, Project } from '../../Interfaces/TodoInterfaces'
import { RootState } from '../../Redux/Store'
import { useAppDispatch, useAppSelector } from '../../Redux/Hooks'
import { useParams, Navigate } from "react-router-dom"

function TodoApp() {
    const [newTodo, setNewTodo] = useState<string>("");
    const [newTodoActive, setNewTodoActive] = useState<boolean>(false);
    const [theme, setTheme] = useState<string>("dark");
    const [filter, setFilter] = useState<string | null>("all");
    const [loadTodos, setLoadTodos] = useState<boolean>(false);

    const userDatas: User =  useAppSelector((state: RootState) => state.user);
    let projectId: number = Number(useParams().projectId);
    const projectIndex: number = Number(useParams().projectIndex);
    const projectDatas : Project | undefined = userDatas.projects.find(elem => elem.id == projectId);
    const dispatch = useAppDispatch();

    const handleSubmit = async (event: React.SyntheticEvent): Promise<void> => {
        event.preventDefault();
        if (newTodo != "" && (projectDatas!.todos.filter((element: TodoDatas) => element.content === newTodo)).length <= 0) {
            await fetch(`http://localhost:3000/project/addTodo/${projectId}`, {    
            method: 'POST',
            body: JSON.stringify({
                content: newTodo,
                isActive: newTodoActive,
                pos: projectDatas!.todos.length,
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
                dispatch({
                    type: "user/addTodo",
                    payload: {
                        projectIdx: projectIndex,
                        todo: datas,
                    }
                })
                setNewTodo("");
                setNewTodoActive(false);
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }

    const handleActive: Function = async (index: number): Promise<void> => {
        const activeStatus: boolean = !projectDatas!.todos[index].isActive;
        await fetch(`http://localhost:3000/todo/updateActiveStatus/${projectDatas!.todos[index].id}`, {    
            method: 'POST',
            body: JSON.stringify({
                status: activeStatus,
            }),
            headers: {
                'Content-type': "application/json",
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((datas: TodoDatas) => {
            console.log(datas);
            dispatch({
                type: "user/changeActiveStatus",
                payload: {
                    projectIdx: projectIndex,
                    todoIdx: index,
                    status: activeStatus,
                }
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const handleComplete: Function = async (index: number): Promise<void> => {
        const completeStatus: boolean = !projectDatas!.todos[index].isComplete;
        await fetch(`http://localhost:3000/todo/updateCompleteStatus/${projectDatas!.todos[index].id}`, {    
            method: 'POST',
            body: JSON.stringify({
                status: completeStatus,
            }),
            headers: {
                'Content-type': "application/json",
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((datas: TodoDatas) => {
            console.log(datas);
            dispatch({
                type: "user/changeCompleteStatus",
                payload: {
                    projectIdx: projectIndex,
                    todoIdx: index,
                    status: completeStatus,
                }
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const itemsLeft = (): number => {
        return projectDatas!.todos.filter((element: TodoDatas) => element.isComplete == false).length;
    }

    const removeCompletedElements = async (): Promise<void> => {
        await fetch(`http://localhost:3000/todo/deleteCompletedTodo/${projectId}`, {    
            method: 'DELETE',
        })
        .then((response) => {
            return response.json();
        })
        .then((datas: TodoDatas) => {
            console.log(datas);
            dispatch({
                type: "user/replaceTodosArray",
                payload: {
                    projectIdx: projectIndex,
                    newTodosArray: datas,
                }
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const displayTodoList = (): React.ReactNode[] => {
        if (filter == "all") {
            return (
                projectDatas!.todos.map((element: TodoDatas, index: number) =>
                    <TodoItem key={index} element={element} index={index} handleActive={handleActive} handleComplete={handleComplete} theme={theme} removeItem={removeItem} />
                )
            )
        } else {
            return (
                projectDatas!.todos.filter((element: TodoDatas) => filter === "active" ? element.isActive === true : element.isComplete === true).map((element: TodoDatas, index) =>
                    <TodoItem key={index} element={element} index={index} handleActive={handleActive} handleComplete={handleComplete} theme={theme} removeItem={removeItem} />
                )
            )
        }
    }

    const removeItem = async (index: number): Promise<void> => {
        await fetch(`http://localhost:3000/todo/deleteTodo/${projectDatas!.todos[index].id}`, {    
            method: 'DELETE',
            body: JSON.stringify({
                projectId: projectId,
            }),
            headers: {
                'Content-type': "application/json",
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((datas: TodoDatas) => {
            console.log(datas);
            dispatch({
                type: "user/replaceTodosArray",
                payload: {
                    projectIdx: projectIndex,
                    newTodosArray: datas,
                }
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const reorderItems = async (sourceIdx: number, destIdx: number | undefined): Promise<void> => {
        if (destIdx == undefined)
            return ;
        console.log("Reorder function");
        await fetch(`http://localhost:3000/project/switchTodosPos/${userDatas.id}`, {    
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
        .then((datas: Project) => {
            console.log(datas);
            dispatch({
                type: "user/replaceTodosArray",
                payload: {
                    projectIdx: projectIndex,
                    newTodosArray: datas,
                }
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetch(`http://localhost:3000/todo/getTodosByProjectId/${projectId}`, {    
            method: 'GET',
        })
        .then((response) => {
            return response.json();
        })
        .then((datas: Project) => {
            console.log(datas);
            dispatch({
                type: "user/replaceTodosArray",
                payload: {
                    projectIdx: projectIndex,
                    newTodosArray: datas,
                }
            })
            setLoadTodos(true);
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);
    
    if (userDatas.id == null || projectDatas == undefined) {
        return (
            <Navigate replace to="/" />
        )
    } else {
        console.log("Return");
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
                            {
                                loadTodos == true ? 
                                <Fragment>
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
                                </Fragment>
                                :
                                <h3 style={{textAlign: "center", margin: "1em 0"}}> Loading datas ... </h3>
                            }
                            
                            
                        </ul>
                    </div>
                    <p className='footer'> Drag and drop to reorder list </p>
                </div>
            </div>
        );
    }
}

export default TodoApp;