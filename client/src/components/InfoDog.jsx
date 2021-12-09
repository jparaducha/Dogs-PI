import React, {useEffect} from 'react';
import Nav from './Nav';
import { getById,  deleteById} from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import image_default from './image_default.png';
import backgroundInfo from './backgroundInfo.jpg';


const InfoDog = function(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const{ id }= useParams();
    
    var details;

    function handleDeleteSubmit(e){
        e.preventDefault();
        dispatch(deleteById(id));

        navigate('/home', {replace:true})

    }

    function handleUpdateDog(e){
        e.preventDefault();

        navigate(`/update/${id}`, {replace:true});
    }

    // dispatch(getById(id));
    useEffect(()=>{

        dispatch(getById(id));
        details = {};

    },[])

    details = useSelector((state)=> state.details);

    var styles= {
        mainDiv : {
            display:'flex',
            justifyContent : 'center',
            alignItems : 'center',
            flexFlow : 'column',
            padding : '%20',
            border : '10px solid green',
            borderRadius : '20px',
            width : '70vw',
            margin : '20vh',
            backgroundColor : 'rgba(193,243,176,0.83)',
            fontFamily : 'Courier New',
            textShadow : '0.5px 0.5px 0 black',
            fontSize : '25px'
        },
        img : {
            border : '3px solid slategray',
            borderRadius : '3px',
            margin : '20px',
            maxWidth : '55vw'
        }
    }

    console.log('details: ', details)
    return(
        <div style={{display:'flex', flexFlow:'column', alignItems:'center', backgroundImage : `url(${backgroundInfo})`}}>
            <Nav/>

            <div style={styles.mainDiv}>


            {/* {details ? details : <h3>cargandooo...</h3>} */}
            {details ? <h4>Nombre: {details.name}</h4>: <h4>Cargando...</h4>}
            {details ? <h4>Peso: {details.weight}</h4>: null}
            {details ? <h4>Altura: {details.height}</h4>: null}
            {details ? <h4>Crianza: {details.bred_for}</h4>: null}
            {details ? <h4>Expectativa de vida: {details.life_span}</h4>: null}
            {details ? details.origin ? <h4>Origen: {details.origin}</h4>:null : null}
            {details ? details.temperament? <h4>Temperamento: {details.temperament}</h4>: null : null}
            {details ? details.temperaments? <h4>Temperamento: {details.temperaments.map(i => i.name + ' ')} </h4>:null: null}
            {details ? <img style={styles.img} alt='imagen del perro' src={details.reference_image_id ?'https://cdn2.thedogapi.com/images/'+ details.reference_image_id + '.jpg' : image_default}/> : null}

            {details ? details.uuid? <input type='button' value='Eliminar' onClick={(e)=>handleDeleteSubmit(e)}/>:null :null}
            {details ? details.uuid? <input type='button' value='Actualizar' onClick={(e)=>handleUpdateDog(e)}/>:null :null}


            </div>

        </div>
    )
}

export default InfoDog;