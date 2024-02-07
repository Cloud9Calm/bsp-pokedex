import React from 'react'; 
import './Header.scss'; 

const Header = () => {
  return (
    <header className='header'>
      <nav className='header__nav'>
        <h2 className='header__title'>
          BSP's Pokédex
        </h2>
        <p className='header__subtitle'>
        Gotta Catch 'Em All!
        </p>
      </nav>
    </header>
  );
};

export default Header; 
