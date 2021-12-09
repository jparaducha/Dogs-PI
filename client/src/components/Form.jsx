import React, { useState} from "react";
import {Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addDog, getDogs } from "../actions";
import backgroundInfo from './backgroundInfo.jpg';

const Form = function(){

    var dispatch = useDispatch();
    const navigate = useNavigate();

    const temperamentosRedux = useSelector((state)=> state.temperaments);

    const [input, setInput] = useState({});
    const [errors, setErrors] = useState({});
    const [temperamentsInput, setTemperamentsInput] = useState([]);

    var styles = {
      div1 : {
        display:'flex',
        flexFlow:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundImage : `url(${backgroundInfo})`,
        minHeight : '99vh',
      },
      form : {
        display:'flex',
        justifyContent:'center',
        flexWrap:'wrap',
        alignItems:'center',
        maxWidth:'78vw',
        backgroundColor : 'rgba(155,155,155,0.9)',
        padding : '30px',
        border : '3px solid blue',
        borderRadius : '15px',
      },
      inputField : {
        border : '1px solid slateblue',
        borderRadius : '1px'
      },
      link : {
        textDecoration : 'none',
        fontSize : '7vh',
        fontFamily : 'Courier New',
        fontWeight : '700',
        textShadow : '2px 2px 0 black',
      }
    }


    // var payload = {
    //     name : 'perro db',
    //     bred_for : 'bred db',
    //     breed_group : 'breed db',
    //     life_span : 'life_span db',
    //     origin : 'origin db',
    //     // reference_image_id : 'image_id',
    //     temperament : ['Active', 'Joyful'],
    //     weight : '45',
    //     height : '120'
    // }

    // useEffect(()=>{
    //     dispatch(addDog(payload));
    //     console.log('dentro del useEffect de Form, dispatch addDog');
    // }, [])


    function handleInputSubmit(e){
        e.preventDefault();
        // console.log('handleInputsubmit Form');
        let auxTemp = temperamentsInput
        setInput({
            ...input,
            temperament : auxTemp
        })

        console.log('lo que se despacha a adddog:', input);

        dispatch(addDog(input));
        
        dispatch(getDogs());
        navigate('/home', {replace:true});
    }

    function handleInputChange(e){
        
        setErrors(validate({
            ...input,
            [e.target.name] : [e.target.value]
          }))
          
          setInput({
            ...input,
            [e.target.name] : e.target.value
          })
    }

    function handleTemperamentSelect(e){

        // console.log('dentro de temperament select línea 51 temperamentsINput:', temperamentsInput);
        let auxArray = temperamentsInput;
        if(!auxArray.includes(e.target.value)) auxArray.push(e.target.value);
        setTemperamentsInput(auxArray);
        // console.log('dentro de temperament select línea 55 temperamentsINput:', temperamentsInput);

        setInput({
            ...input,
            temperament : temperamentsInput
        })

    }

    const validate = function(input){
        var errors ={};
        if(!input.name){
          errors.name = 'Se necesita un nombre de perro';
        }else if(!/^[a-zA-Z\s]*$/.test(input.name)){
          errors.name = 'Nombre no válido';
        }
        if(!Object.keys(input).includes('weight')){
          delete errors.weight;
        }else {
          if(!/^(0?[1-9]|[1-9][0-9])$/.test(input.weight)){
          errors.weight = 'El peso debe estar entre 1 y 99';
        }} 
        if(input.name===''){
          delete errors.name;
        }
        
        return errors;
      }

    return(
        <div style={styles.div1}>
          
            
            <form style={styles.form} onSubmit={(e)=> handleInputSubmit(e)}>

            <div style={{margin:'10px'}}>
            <label for='name' style={{margin:'2px'}}>Nombre</label>
            <input type='text' value={input.name} name='name' id='name' onChange={(e)=> handleInputChange(e)}/> 
            {errors.name? <p>{errors.name}</p>: null}
            </div>

            <div style={{margin:'10px'}}>
            <label for='bred_for' style={{margin:'5px'}}>Criado para</label>
            <input style={styles.inputField} type='text' value={input.bred_for} name='bred_for' id='bred_for' onChange={(e)=> handleInputChange(e)}/>
            </div>

            
            <div style={{margin:'10px'}}>
            <label for='breed_group' style={{margin:'5px'}}>Grupo de crianza</label>
            <input  style={styles.inputField} type='text' value={input.breed_group} name='breed_group' id='breed_group' onChange={(e)=> handleInputChange(e)}/>
            </div>

            <div style={{margin:'10px'}}>
            <label for='life_span' style={{margin:'5px'}}>Expectativa de vida</label>
            <input  style={styles.inputField} type='text' value={input.life_span} name='life_span' id='life_span' onChange={(e)=> handleInputChange(e)}/>
            </div>

            <div style={{margin:'10px'}}>
            <label for='origin' style={{margin:'5px'}}>Origen</label>
            <input  style={styles.inputField} type='text' value={input.origin} name='origin' id='origin' onChange={(e)=> handleInputChange(e)}/>
            </div>

            <div style={{margin:'10px'}}>
            <label for='weight' style={{margin:'5px'}}>Peso</label>
            <input  style={styles.inputField} type='text' value={input.weight} name='weight' id='weight' min={0} max={99} onChange={(e)=> handleInputChange(e)}/>
            </div>
            {errors.weight && <p>{errors.weight}</p>}

            <div style={{margin:'10px'}}>
            <label for='height' style={{margin:'5px'}}>Altura</label>
            <input  style={styles.inputField} type='number' value={input.height}  name='height' id='height' min={0} max={150} onChange={(e)=> handleInputChange(e)}/>
            </div>



            {/* <input type='checkbox' 
            id='joyful'
            name='joyful'
            value='joyful'
            onClick={(e)=> handleTemperamentSelect(e)}>
            </input>

            <label for='joyful'>joyful</label>

            <input type='checkbox' 
            id='active'
            name='active'
            value='active'
            onClick={(e)=> handleTemperamentSelect(e)}>
            </input>

            <label for='active'>active</label> */}

            <div style={{
            display:'flex',
            justifyContent:'center',
            flexFlow : 'row',
            flexWrap : 'wrap',
            margin : '4px'}}>
            {temperamentosRedux.map((i,idx)=>{
                return(
                    <div>
                    <input style={{margin:'2px'}}
                     key = {idx} 
                     type='checkbox' 
                    id={i.name}
                    name={i.name}
                    value={i.name}
                    onClickCapture={(e)=> handleTemperamentSelect(e)}>
                    </input>

                    <label for={i.name}>{i.name}</label>
            </div>
                )
            })}
            </div>

            <input type='button' value='Agregar perro' disabled={Object.keys(errors).length || !input.name || !input.weight} onClick={(e)=>handleInputSubmit(e)}/>
            
            </form>


            
            <Link style={styles.link} to='/home'>Volver a home</Link>
        </div>
    )
}

export default Form;