import React from 'react';

const Card = function({name, weight, temperament, reference_image_id}){
    const styles = {
        div1 : {
            display: 'flex',
            justifyContent: 'center',
            alignItems : 'center',
            flexFlow : 'column',
            maxWidth : '28vw',
            border : '5px solid black',
            margin : '10px',
            padding : '%5'
        },
        imagen : {
            width: '25vw',
            borderRadius : '5px',
            border : '2px solid black',
            margin : '5px'
        }
    }

    return(
        <div style={styles.div1}>
            <h2>{name}</h2>
            <h4>peso : {weight}</h4>
            <p>temperamento : {temperament}</p>
            <img src={reference_image_id} alt='imagen' style={styles.imagen}/>
        </div>
    )
}

export default Card;