import React, {useEffect} from 'react';
import Nav from './Nav';
import { getById,  deleteById} from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import image_default from './image_default.png';


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

    console.log('details: ', details)
    return(
        <div>
            <Nav/>

            {/* {details ? details : <h3>cargandooo...</h3>} */}
            {details ? <h4>nombre {details.name}</h4>: <h4>cargandoo..</h4>}
            {details ? <h4>peso {details.weight}</h4>: null}
            {details ? <h4>altura {details.height}</h4>: null}
            {details ? <h4>crianza {details.bred_for}</h4>: null}
            {details ? <h4>expectativa de vida {details.life_span}</h4>: null}
            {details ? <h4>origen {details.origin}</h4>: null}
            {details ? <h4>temperamento {details.temperamento}</h4>: null}
            {details ? <img alt='imagen del perro' src={details.reference_image_id ?'https://cdn2.thedogapi.com/images/'+ details.reference_image_id + '.jpg' : image_default}/> : null}

            {details ? details.uuid? <input type='button' value='Eliminar' onClick={(e)=>handleDeleteSubmit(e)}/>:null :null}
            {details ? details.uuid? <input type='button' value='Actualizar' onClick={(e)=>handleUpdateDog(e)}/>:null :null}

        </div>
    )
}

export default InfoDog;