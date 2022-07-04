import React, { useState } from 'react'
import ImageBackground from "../../Images/Todo-App/bg-desktop-dark.jpg"
import TodoItem from "./TodoItem"

type TodoDatas = {
    content: string,
    isActive: boolean,
    isComplete: boolean,
}

function TodoApp() {
    const [newTodo, setNewTodo] = useState<string>("");
    const [newTodoActive, setNewTodoActive] = useState<boolean>(false);
    const [todos, setTodos] = useState<TodoDatas[]>([]);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

    const handleSubmit = (event: React.SyntheticEvent): void => {
        event.preventDefault();
        if (newTodo != "" && (todos.filter((element: TodoDatas) => element.content === newTodo)).length <= 0) {
            setTodos([...todos, {content: newTodo, isActive: newTodoActive, isComplete: false}]);
            setNewTodo("");
        }
    }

    const handleActive: Function = (index: number): void => {
        let newArray  = [...todos];

        if (todos[index].isActive === true)
            newArray[index].isActive = false;
        else
            newArray[index].isActive = true;
        setTodos(newArray);
    }

    const handleComplete: Function = (index: number): void => {
        let newArray  = [...todos];

        if (todos[index].isComplete === true)
            newArray[index].isComplete = false;
        else
            newArray[index].isComplete = true;
        setTodos(newArray);
    }

    const itemsLeft = (): number => {
        let nb = 0;
        if (todos.length <= 0)
            return 0;
        todos.map((element):void => {
            if (element.isComplete == false)
                nb++;
        })
        return nb;
    }

    const removeCompletedElements = (): void => {
        setTodos(todos.filter((element: TodoDatas) => element.isComplete == false));
    }
    
    return (
        <div className='todo-page-container'>
            <img className='todo-img' src={ImageBackground} alt="first img"></img>
            <div className='todo-component-container'>
                <div className='header-todo-component'>
                    <h1> todo </h1>
                    <div onClick={() => isDarkMode == true ? setIsDarkMode(false) : setIsDarkMode(true)}>
                        {
                            isDarkMode == true ? <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg>
                            : <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/></svg>
                        }
                    </div>
                </div>
                <div className='todo-list-container'>
                    <ul className='todo-list'>
                        <li>
                            <form onSubmit={handleSubmit}>
                                <label>
                                    <div className={`circle-check ${newTodoActive === true ? "circle-check-active" : ""}`} onClick={() => newTodoActive === true ? setNewTodoActive(false) : setNewTodoActive(true)}>
                                    {
                                        newTodoActive === true &&
                                            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
                                    }
                                    </div>
                                    <input type='text' placeholder='Create a new todo...' value={newTodo} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTodo(e.target.value)} />
                                </label>
                            </form>
                        </li>
                        {
                            todos.map((element: TodoDatas, index: number) =>
                                <TodoItem element={element} index={index} handleActive={handleActive} handleComplete={handleComplete} />
                            )
                        }
                        <li>
                            <p> {itemsLeft()} items left </p>
                            <div className='filters'>
                                <p> All </p>
                                <p> Active </p>
                                <p> Completed </p>
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