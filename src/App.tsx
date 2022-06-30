import React, { useState } from 'react';
import "./App.scss";
import Caroussel_Img1 from "./Images/desktop-image-hero-1.jpg"
import Caroussel_Img2 from "./Images/desktop-image-hero-2.jpg"
import Caroussel_Img3 from "./Images/desktop-image-hero-3.jpg"
import Image1 from "./Images/image-about-dark.jpg"
import Image2 from "./Images/image-about-light.jpg"

const caroussel_datas = [
	{
		img: Caroussel_Img1,
		title: "Discover innovative ways to decorate",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In egestas faucibus diam, et consequat orci semper non. Pellentesque efficitur felis a cursus porttitor. Cras lacinia at orci a euismod. Aenean elementum commodo lacinia. Nullam egestas a lorem quis molestie.",

	}, {
		img: Caroussel_Img2,
		title: "We are available all over the globe",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque tortor ut tincidunt feugiat. Praesent vel orci dignissim, bibendum elit id, tempus velit. Cras eu ante eros. Aenean nec posuere arcu. ",
	}, {
		img: Caroussel_Img3,
		title: "Manufactured with the best materials",
		text: "Ut tempor justo metus, porttitor malesuada mauris lobortis quis. Sed massa ligula, rhoncus in hendrerit id, eleifend vel odio. Praesent egestas diam id nisl rhoncus ullamcorper. Aliquam erat volutpat. Maecenas sit amet purus eros. Donec faucibus, sapien at accumsan eleifend, tellus sem aliquet orci, ac finibus ante ex sed ex.",
	}
]

function App() {
	const [index, setIndex] = useState(0);

	const toNext = () => {
		if (index < caroussel_datas.length - 1)
			setIndex(index + 1);
		else
			setIndex(0);
	}

	const toPrevious = () => {
		if (index === 0)
			setIndex(caroussel_datas.length - 1);
		else	
			setIndex(index - 1);
	}
  return (
    <div className='container-room'>
		<header className='header'>
			<svg width="62" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M2.988 12.672v-7.32c0-.48.142-.928.426-1.344a3.36 3.36 0 011.11-1.02c.456-.264.94-.396 1.452-.396.296 0 .618.048.966.144.348.096.654.224.918.384L9.096.588A4.277 4.277 0 007.998.162 5.115 5.115 0 006.744 0c-.776 0-1.488.186-2.136.558-.648.372-1.188.91-1.62 1.614V.384H0v12.288h2.988zm13.472.384c1.328 0 2.526-.276 3.594-.828a6.406 6.406 0 002.532-2.304c.62-.984.93-2.116.93-3.396 0-1.288-.31-2.422-.93-3.402A6.421 6.421 0 0020.054.828C18.986.276 17.788 0 16.46 0c-1.336 0-2.536.276-3.6.828a6.476 6.476 0 00-2.532 2.298c-.624.98-.936 2.114-.936 3.402 0 1.28.312 2.412.936 3.396a6.45 6.45 0 002.538 2.304c1.068.552 2.266.828 3.594.828zm0-2.568c-.744 0-1.416-.17-2.016-.51a3.729 3.729 0 01-1.416-1.404c-.344-.596-.516-1.278-.516-2.046 0-.776.172-1.462.516-2.058a3.686 3.686 0 011.416-1.398c.6-.336 1.272-.504 2.016-.504.752 0 1.426.168 2.022.504a3.698 3.698 0 011.41 1.398c.344.596.516 1.282.516 2.058 0 .768-.172 1.45-.516 2.046a3.741 3.741 0 01-1.41 1.404c-.596.34-1.27.51-2.022.51zm15.704 2.568c1.328 0 2.526-.276 3.594-.828a6.406 6.406 0 002.532-2.304c.62-.984.93-2.116.93-3.396 0-1.288-.31-2.422-.93-3.402A6.421 6.421 0 0035.758.828C34.69.276 33.492 0 32.164 0c-1.336 0-2.536.276-3.6.828a6.476 6.476 0 00-2.532 2.298c-.624.98-.936 2.114-.936 3.402 0 1.28.312 2.412.936 3.396a6.45 6.45 0 002.538 2.304c1.068.552 2.266.828 3.594.828zm0-2.568c-.744 0-1.416-.17-2.016-.51a3.729 3.729 0 01-1.416-1.404c-.344-.596-.516-1.278-.516-2.046 0-.776.172-1.462.516-2.058a3.686 3.686 0 011.416-1.398c.6-.336 1.272-.504 2.016-.504.752 0 1.426.168 2.022.504a3.698 3.698 0 011.41 1.398c.344.596.516 1.282.516 2.058 0 .768-.172 1.45-.516 2.046a3.741 3.741 0 01-1.41 1.404c-.596.34-1.27.51-2.022.51zm12.608 2.184V4.896c0-.44.126-.85.378-1.23s.596-.686 1.032-.918c.436-.232.93-.348 1.482-.348.8 0 1.432.258 1.896.774.464.516.696 1.206.696 2.07v7.428h2.988V4.908c0-.44.124-.852.372-1.236a2.717 2.717 0 011.02-.924c.432-.232.92-.348 1.464-.348.8 0 1.438.266 1.914.798s.714 1.254.714 2.166v7.308h2.988V4.548c0-.952-.198-1.766-.594-2.442a4.051 4.051 0 00-1.62-1.56C58.818.182 58.036 0 57.156 0c-.928 0-1.744.21-2.448.63-.704.42-1.332 1.022-1.884 1.806-.312-.744-.846-1.336-1.602-1.776C50.466.22 49.604 0 48.636 0c-.752 0-1.442.152-2.07.456-.628.304-1.226.772-1.794 1.404V.384h-2.988v12.288h2.988z" fill="#FFF" fill-rule="nonzero"/></svg>
			<p>home</p>
			<p>shop</p>
			<p>about</p>
			<p>contact</p>
		</header>
      <div className='grid-room'>
        <div className='first-case'>
        	<img className='img' src={caroussel_datas[index].img} alt="first img"></img>
        </div>

		<div className='arraw-case-left' onClick={toPrevious}>
			<svg width="14" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M13 0L1 12l12 12" stroke="#FFF" fill="none" fill-rule="evenodd"/></svg>
		</div>
		
		<div className='arraw-case-right' onClick={toNext}>
			<svg width="14" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M1 0l12 12L1 24" stroke="#FFF" fill="none" fill-rule="evenodd"/></svg>
		</div>

        <div className='second-case'>
            <h1> {caroussel_datas[index].title} </h1>
            <p> {caroussel_datas[index].text} </p>
            <p> shop now </p>         
        </div>

        <div className='third-case'>
			<img className='img' src={Image1} alt="first img"></img>
        </div>

        <div className='fourth-case'>
			<h2> about our fourniture</h2>
            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. In egestas faucibus diam, et consequat orci semper non. Pellentesque efficitur felis a cursus porttitor. Cras lacinia at orci a euismod. Aenean elementum commodo lacinia. Nullam egestas a lorem quis molestie.</p>
        </div>

        <div className='fifth-case'>
			<img className='img' src={Image2} alt="first img"></img>
        </div>

      </div>
    </div>
  );
}

export default App;
