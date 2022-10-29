import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import Banner from "./photos/Banner.png"

const Header = () => {
  return (
    <header>
      <div>
        <img src={Banner} alt="Banner of Flowers"></img>
      </div>
      <div>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
