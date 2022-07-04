import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

type practiceClass = {
    name: string,
    url: string,
}

const practiceElements: practiceClass[] = [
    {
        name: "Room Homepage",
        url: "/room-homepage",
    },
]

function Home() {
  return (
    <div className='home-container'>
        <h1> Practice Typescript </h1>
        {
            practiceElements.map((elem: practiceClass, i: number) =>
                <Link to={elem.url}>
                    <button key={i} className='home-button' type='button'> {elem.name} </button>
                </Link>
            )
        }
    </div>
  );
}

export default Home;