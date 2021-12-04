import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'

import Nav from './Nav';
import Cards from './Cards';
// import { orderA_Z, orderZ_A } from '../actions';

const Home = function(){
    return(
        <div>
            <Nav/>
            

            <Cards/>
        </div>
    )
}

export default Home;