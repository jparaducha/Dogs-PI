import React from "react";
import {Link } from 'react-router-dom';

const Form = function(){
    return(
        <div>
            <h1>esta es la página de form</h1>
            <Link to='/home'>volver a home</Link>
        </div>
    )
}

export default Form;