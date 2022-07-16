import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { User } from '../../Interfaces/TodoInterfaces'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../Redux/Store'
import { useAppDispatch, useAppSelector } from '../../Redux/Hooks'

const userId: number = 11;

function HomeTodo() {
    // const [userDatas, setUserDatas] = useState<User | undefined>(undefined);

    const userDatas =  useAppSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch();

    console.log("useAppSelector");
    console.log(userDatas);

    // useEffect(() => {
    //     fetch(`http://localhost:3000/user/getUserTodos/${userId}`, {method: 'GET', mode: 'cors', credentials: 'same-origin'})
    //     .then((response) => {
    //         return response.json();
    //     })
    //     .then((datas) => {
    //         console.log(datas);
    //         setTodos(datas.todos.sort((a: TodoDatas, b: TodoDatas) => {
    //             return a.pos - b.pos;
    //         }));
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
    // }, [todoUpdate])

    useEffect(() => {
        fetch(`http://localhost:3000/user/${userId}`, {method: 'GET'})
        .then((response) => {
            return response.json();
        })
        .then((datas: User) => {
            console.log("datas");
            console.log(datas);
            dispatch({
                type: "user/login",
                payload: datas,
            })
            // setUserDatas(datas)
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])


    return (
        <div className='home-todo-app'>
            <header className='home-todo-header'>
                <h2> todo app </h2>
                {/* <h3> Signin </h3> */}
                { userDatas === undefined ? <h3> Signin </h3> : <h3> {userDatas.name} </h3> }
            </header>
            <div className='home-projects-container'>
                <h3> Your Projects </h3>
                <Link to="projectPage">
                    <div className='project-item'>
                        <p> First project </p>
                        {/* <div className='arrow-home'>
                            <svg width="40" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M34.05 0l5.481 5.527h.008v.008L40 6l-.461.465v.063l-.062-.001L34.049 12l-.662-.668 4.765-4.805H0v-1h38.206l-4.82-4.86L34.05 0z" fill="#000" fill-rule="nonzero"/></svg>
                        </div> */}
                    </div>
                </Link>
               
            </div>
        </div>
    );
}

export default HomeTodo;