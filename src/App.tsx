import React from 'react';
import "./App.scss";
import Image1 from "./Images/desktop-image-hero-1.jpg"

function App() {
  return (
    <div className='container-room'>
      <div className='grid-room'>
        <div>
          <img className='img' src={Image1} alt="first img"></img>
        </div>

        <div>
          <div>
            <h1> Discover innovative ways to decorate</h1>
            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. In egestas faucibus diam, et consequat orci semper non. Pellentesque efficitur felis a cursus porttitor. Cras lacinia at orci a euismod. Aenean elementum commodo lacinia. Nullam egestas a lorem quis molestie. Donec eget tincidunt tortor. Aenean eu leo non metus varius tempor.</p>
            <p>SHOP NOW</p>
          </div>
         
        </div>

        <div>
          
        </div>

        <div>
          
        </div>

        <div>
          
        </div>

      </div>
    </div>
  );
}

export default App;
