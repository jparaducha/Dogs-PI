import React, {useEffect} from 'react';
import Nav from './Nav';
import { getDogs } from '../actions';
import { useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';

const Landing = function(){

    var dispatch = useDispatch();

    useEffect(()=>{
     dispatch(getDogs());
    }, [])
    return(
        <div>
            <Nav/>
            <h3>esto es la página de landing</h3>

            <Link to='/home'>HomE </Link>
        </div>
    )
}
export default Landing;