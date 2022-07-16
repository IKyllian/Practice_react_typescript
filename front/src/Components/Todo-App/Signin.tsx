import React, { useState } from 'react'
import { TodoDatas, User } from '../../Interfaces/TodoInterfaces'

function Signin(props: any) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSign = (event: React.SyntheticEvent): void => {
        event.preventDefault();
        if (email.length > 0 && password.length > 0) {
            fetch(`http://localhost:3000/user/signin?email=${email}&password=${password}`, {    
                method: 'GET',
            })
            .then((response) => {
                return response.json();
            })
            .then((datas: User) => {
                console.log("User = " + datas);
                props.setUser(datas);
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }

    return (
        <div className='sign-container'>
            <h3> Signin </h3>
            <form className='sign-form' onSubmit={handleSign}>
                <input type="text" placeholder='Email..' value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                <input type="text" placeholder='Password' value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                <input type="submit" value="Signin" />
            </form>
        </div>
    );
}

export default Signin;