import React, {   useEffect    } from 'react';
import {useSelector, useDispatch} from 'react-redux'

import Nav from './Nav';
import Cards from './Cards';
// import { orderA_Z, orderZ_A } from '../actions';
import { getDogs } from '../actions';
import { getDogsLocally } from '../actions';
// import { useDispatch } from 'react-redux';

const Home = function(){

    var dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getDogs());
    }, [])

    
    setTimeout(()=>{
        
        dispatch(getDogs());
        dispatch(getDogsLocally());
    },500)
    
    return(
        <div>
            <Nav/>
            

            <Cards/>
        </div>
    )
}

export default Home;