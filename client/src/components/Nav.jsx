import React from 'react';
import { Link } from 'react-router-dom';
import Home from './Home';
import Form from './Form';

const Nav =function(){
    return(
        <div style={{border: '5px solid black', height : '15vh', fontSize:'8vh'}}>
            esto es un navbar

            <Link to='/home'> Home</Link>
            <Link to='/form'> Crear perro</Link>
        </div>
    )
}

export default Nav;