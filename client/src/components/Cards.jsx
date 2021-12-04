import React from "react";
import Card from './Card';
import { orderA_Z, orderZ_A } from '../actions';
import {useSelector, useDispatch} from 'react-redux'

const Cards = function(){

    
    var dogs = useSelector((state)=>state.selectedDogs);

    const styles = {
        div : {
            display: 'flex',
            justifyContent : 'space-between',
            alignItems : 'center',
            flexWrap : 'wrap'
        }
    }


    var dispatch = useDispatch();
    
    function handleOrderAZ(e){
        e.preventDefault();
        dispatch(orderA_Z());
    }

    function handleOrderZA(e){
        e.preventDefault();
        dispatch(orderZ_A());
    }
    return(
        <div style={styles.div}>
            
            <input type='button' value='order A-Z' onSubmit={(e)=>handleOrderAZ(e)}/>
            <input type='button' value='order Z-A' onSubmit={(e)=>handleOrderZA(e)}/>
            {dogs ? dogs.map((i,idx)=> <Card key={idx} name={i.name} weight={i.weight} temperament={i.temperament} reference_image_id={i.reference_image_id}/>):  <h2>cargando...</h2>}
        </div>
    )
}

export default Cards;