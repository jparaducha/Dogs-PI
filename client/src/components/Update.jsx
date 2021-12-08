import React, {useState} from "react";
import { Link } from 'react-router-dom';

import { useDispatch } from "react-redux";

import { updateById } from "../actions";
import { useParams } from "react-router";




const Update = function(){

    const [input, setInput] = useState({});
    const [ errors, setErrors] = useState({});

    const { id } = useParams();

    var dispatch = useDispatch();


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

    function handleInputSubmit(e){
        e.preventDefault();

        console.log('update línea 39 id:', id)
        setInput({
            ...input,
            id : id
        })

        dispatch(updateById(input));
    }

    const validate = function(input){
        var errors ={};
        
        if(!input.weight){
          errors.weight = 'Se necesita un peso';
        }else if(!/^(0?[1-9]|[1-9][0-9])$/.test(input.weight)){
          errors.weight = 'El peso debe estar entre 1 y 99';
        }
        if(!input.weight || input.weight === ''){
          delete errors.weight;
          delete input.weight;
        }

        if(!input.name || input.name ===''){
            delete input.name;
            delete errors.name;
        }

        if(!input.bred_for || input.bred_for === ''){
            delete errors.bred_for;
            delete input.bred_for;
          }
  
          if(!input.breed_group || input.breed_group ===''){
              delete input.breed_group;
              delete errors.breed_group;
          }

          if(!input.life_span || input.life_span ===''){
            delete input.life_span;
            delete errors.life_span;
        }

        if(!input.origin || input.origin === ''){
            delete errors.origin;
            delete input.origin;
          }
  
          if(!input.height || input.height ===''){
              delete input.height;
              delete errors.height;
          }
        
        return errors;
      }

    return(
        <div>
            
            <div style={{display:'flex', flexFlow:'column', justifyContent:'center', alignItems:'center'}}>
            <h1>esta es la página de form</h1>
            <Link to='/home'>volver a home</Link>
            
            <form style={{display:'flex', justifyContent:'center', flexWrap:'wrap', alignItems:'center' , maxWidth:'78vw'}} onSubmit={(e)=> handleInputSubmit(e)}>

            <div style={{margin:'10px'}}>
            <label for='name' style={{margin:'2px'}}>Nombre</label>
            <input type='text' value={input.name} name='name' id='name' onChange={(e)=> handleInputChange(e)}/> 
            {/* {errors.name? <p>{errors.name}</p>: null} */}
            </div>

            <div style={{margin:'10px'}}>
            <label for='bred_for' style={{margin:'5px'}}>Criado para</label>
            <input type='text' value={input.bred_for} name='bred_for' id='bred_for' onChange={(e)=> handleInputChange(e)}/>
            </div>

            
            <div style={{margin:'10px'}}>
            <label for='breed_group' style={{margin:'5px'}}>Grupo de crianza</label>
            <input type='text' value={input.breed_group} name='breed_group' id='breed_group' onChange={(e)=> handleInputChange(e)}/>
            </div>

            <div style={{margin:'10px'}}>
            <label for='life_span' style={{margin:'5px'}}>Expectativa de vida</label>
            <input type='text' value={input.life_span} name='life_span' id='life_span' onChange={(e)=> handleInputChange(e)}/>
            </div>

            <div style={{margin:'10px'}}>
            <label for='origin' style={{margin:'5px'}}>Origen</label>
            <input type='text' value={input.origin} name='origin' id='origin' onChange={(e)=> handleInputChange(e)}/>
            </div>

            <div style={{margin:'10px'}}>
            <label for='weight' style={{margin:'5px'}}>Peso</label>
            <input type='text' value={input.weight} name='weight' id='weight' min={0} max={99} onChange={(e)=> handleInputChange(e)}/>
            </div>
            {errors.weight && <p>{errors.weight}</p>}

            <div style={{margin:'10px'}}>
            <label for='height' style={{margin:'5px'}}>Altura</label>
            <input type='number' value={input.height}  name='height' id='height' min={0} max={150} onChange={(e)=> handleInputChange(e)}/>
            </div>
            <input type='button' value='actualizar perro'  disabled={ !Object.keys(input).length || Object.keys(errors).length}  onClick={(e)=>handleInputSubmit(e)}/>
            
            </form>
            
             </div>
        </div>
    )
}

export default Update;