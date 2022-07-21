import React, { useState, useEffect, Fragment } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { User } from '../../Interfaces/TodoInterfaces'
import { RootState } from '../../Redux/Store'
import { useAppDispatch, useAppSelector } from '../../Redux/Hooks'
import { useLocation, useNavigate } from 'react-router-dom'

const userId: number = 1;

function HomeTodo() {
    const [coords, setCoords] = useState<{x: number, y: number}>({x: 0, y: 0});
    const [useBlur, setUseBlur] = useState<string>("");
    let location = useLocation();
    let addProjectFormat = new RegExp('\\.*/add-project');
    let menuModalFormat = new RegExp('\\.*/menu-modal');

    const userDatas: User =  useAppSelector((state: RootState) => state.user);
    let navigate = useNavigate();
    const dispatch = useAppDispatch();

    function capitalizeFirstLetter(str: string){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const handleModalClick = () => {
        if (menuModalFormat.test(location.pathname) && coords.x < 1008)
            return navigate("/");
    }

    const handleMouseMove = (event: any) => {
        if (menuModalFormat.test(location.pathname)) {
            setCoords({
                x: event.clientX - event.target.offsetLeft,
                y: event.clientY - event.target.offsetTop,
            });
        }   
    };

    useEffect(() => {
        if (addProjectFormat.test(location.pathname) || menuModalFormat.test(location.pathname))
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

    if (userDatas.id == null) {
        return (
            <div>
                No datas
            </div>
        )
    } else {
        return (
            <Fragment>
                <Outlet />
                <div className={`home-todo-app ${useBlur}`} onMouseMove={handleMouseMove} onClick={() => handleModalClick()}>
                    <header className='home-todo-header'>
                        <h2> todo app </h2>
                        <div className='username-badge-container'>
                            <Link to="/menu-modal">
                                <div className='home-badge'> 1 </div>
                                <h3> {capitalizeFirstLetter(userDatas.username!)} </h3>
                            </Link>
                        </div>
                        
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
                                    </div>
                                </Link>
                            )
                        }
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default HomeTodo;