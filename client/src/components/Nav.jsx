import React from 'react';
import { Link } from 'react-router-dom';
// import Home from './Home';
// import Form from './Form';
import navBackground from './navBackground.jpg';

const Nav =function(){

    var styles = {
        fontSize:'8vh',
        fontWeight : '900',
        display: 'flex',
        alignItems : 'center',
        justifyContent : 'space-evenly',
        minHeight : '12vh',
        backgroundImage : `url(${navBackground})`,
        link : {
            textDecoration : 'none',
            fontFamily : 'Helvetica',
            color : 'green',
            textShadow : '1px 1px 0 black',
        },

    }
    return(
        <div style={styles}>
            
            <Link style={styles.link} to='/home'> Home</Link>
            <Link style={styles.link} to='/form'> Crear perro</Link>
        </div>
    )
}

export default Nav;