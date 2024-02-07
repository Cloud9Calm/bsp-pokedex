import React, { useState, useEffect } from 'react';
import './Background.scss'; 
import pokemonImages from '../../data/pokemonImages.json'; 

const Background = () => {
  const [backgroundImage, setBackgroundImage] = useState('pokemon1.png'); 

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * pokemonImages.length);
      const newImage = pokemonImages[randomIndex];
      setBackgroundImage(newImage);
    }, 2000); 

    return () => clearInterval(interval); 
  }, [pokemonImages]);

  return (
    <div className="background" style={{ backgroundImage: `url(${backgroundImage})` }}>
     
    </div>
  );
};

export default Background;
