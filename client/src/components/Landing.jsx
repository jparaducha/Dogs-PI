import React, {useEffect} from 'react';
// import Nav from './Nav';
import { getDogs, getTemperament } from '../actions';
import { useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';

const Landing = function(){

    var dispatch = useDispatch();

    useEffect(()=>{
     dispatch(getDogs());
     dispatch(getTemperament());
    }, [])

    var styles = {
        div : {
            minWidth : '99vw',
            minHeight : '100vh',
            background : 'slategray',
            fontFamily : 'Courier New',
            display : 'flex',
            justifyContent : 'space-around',
            alignItems : 'center',
            fontSize : '10vh',
            textShadow : '2px 2px 0 orange'
        },
        link : {
            textDecoration : 'none',
            color : 'orange',
            fontWeight : 'bolder',
            fontFamily : 'Courier New',
            textShadow : '2px 2px 0 black'
        }
    }
    return(
        <div style={styles.div}>
            <h3>Dogs App</h3>

            <Link style={styles.link} to='/home'>Home </Link>
        </div>
    )
}
export default Landing;