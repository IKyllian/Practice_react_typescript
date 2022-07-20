import React, { useState, useEffect, Fragment } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { User } from '../../Interfaces/TodoInterfaces'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../Redux/Store'
import { useAppDispatch, useAppSelector } from '../../Redux/Hooks'
import { useLocation } from 'react-router-dom'

const userId: number = 1;

function HomeTodo() {
    const [useBlur, setUseBlur] = useState<string>("");
    let location = useLocation();
    let format = new RegExp('\\.*/add-project');

    const userDatas: User =  useAppSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (format.test(location.pathname))
            setUseBlur("home-blur");
        else
            setUseBlur("");
    }, [location]);

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
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])


    return (
        <Fragment>
            <Outlet />
            <div className={`home-todo-app ${useBlur}`}>
                <header className='home-todo-header'>
                    <h2> todo app </h2>
                    { userDatas === undefined ? <h3> Signin </h3> : <h3> {userDatas.name} </h3> }
                </header>
                <div className='home-projects-container'>
                    <div className='head-home-projects-container'>
                        <h3> Your Projects </h3>
                        <Link to="/add-project">
                            Add Project
                        </Link>
                    </div>
                    {
                        userDatas.projects.map((element, index) =>
                            <Link key={index} to={`projectPage/${element.id}/${index}`}>
                                <div className='project-item'>
                                    <p> {element.name} </p>
                                    {/* <div className='arrow-home'>
                                        <svg width="40" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M34.05 0l5.481 5.527h.008v.008L40 6l-.461.465v.063l-.062-.001L34.049 12l-.662-.668 4.765-4.805H0v-1h38.206l-4.82-4.86L34.05 0z" fill="#000" fill-rule="nonzero"/></svg>
                                    </div> */}
                                </div>
                            </Link>
                        )
                    }
                </div>
            </div>
        </Fragment>
    );
}

export default HomeTodo;