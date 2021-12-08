import React from 'react';
import  imageDefault from './image_default.png';
import { Link } from 'react-router-dom';

const Card = function({id, uuid, name, weight, temperament, reference_image_id, temperaments}){
    const styles = {
        div1 : {
            display: 'flex',
            justifyContent: 'center',
            alignItems : 'center',
            flexFlow : 'column',
            maxWidth : '28vw',
            border : '5px solid black',
            margin : '10px',
            padding : '%5',
            borderRadius : '6px'
            // ,boxShadow : '30px 30px 30px rgba(0,0,0,0.9)'
            ,backgroundColor : 'rgba(190,190,190,0.7)'

        },
        imagen : {
            width: '25vw',
            borderRadius : '5px',
            border : '2px solid black',
            margin : '5px'
        }
    }

    // console.log('uuid card línea 25: ', uuid);

    return(
        <div style={styles.div1}>
            <Link to={`/infoDog/${id || uuid}`}><h2>{name}</h2></Link>
            <h4>peso (kg) : {weight}</h4>
            <p>temperamento : { temperament ? temperament: null} {temperaments ? temperaments.map((i,idx) => idx===temperaments.length-1 ? i.name: i.name + ', '): null}</p>
             <img src={reference_image_id? reference_image_id : imageDefault} alt='imagen' style={styles.imagen}/>
        </div>
    )
}

export default Card;