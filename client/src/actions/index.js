import { GET_DOGS, GET_DOGS_LOCALLY, ADD_DOG, FILTER_BY_BREED, FILTER_BY_TEMPERAMENT, ORDER_AZ, ORDER_ZA, GET_BY_ID, GET_BY_NAME, GET_TEMPERAMENT, ORDER_WEIGHT_ASC, ORDER_WEIGHT_DESC, DELETE_DOG, UPDATE_DOG } from "./constants";
const axios = require('axios');

export const getDogs = function(){
    return async function(dispatch){
        
        const allDogs = await axios.get('http://localhost:3001/dogs');

        return dispatch({
            type: GET_DOGS,
            payload : allDogs.data
        })
    }
}

export const getDogsLocally = function(){
    return function(dispatch){
        return dispatch({
            type: GET_DOGS_LOCALLY
        })
    }
}

export const getTemperament = function(){
    return async function(dispatch){

        const allDogs = await axios.get('http://localhost:3001/temperament');

        return dispatch({
            type: GET_TEMPERAMENT,
            payload : allDogs.data
        })
    }
}

export const getByName =   function(name){
    return async function(dispatch){

        // const allDogs = await axios.get(`http://localhost:3001/dogs?name=${name}`);

        return dispatch({
            type: GET_BY_NAME,
            // payload : allDogs.data
            payload : name
        })
    }
}

export const addDog = function(payload){
    return async function(dispatch){

        await axios.post(`http://localhost:3001/dog`, payload);
        return dispatch({
            type: ADD_DOG,
            payload
        })
    }
}

export const orderA_Z = function(payload){
    return async function(dispatch){
        dispatch({
            type: ORDER_AZ,
            payload
        })}
    }


export const orderZ_A = function(payload){
        return {
            type: ORDER_ZA,
            payload
        }
    }

export const filterByTemp = function(payload){

    return async function(dispatch){
        dispatch({
        type: FILTER_BY_TEMPERAMENT,
        payload
    })
}
}

export const getById = function(payload){

    return async function(dispatch){
        let json  = await axios.get(`http://localhost:3001/dogs/${payload}`)
        dispatch({
            type: GET_BY_ID,
            payload : json.data
        })
    }
}

export const deleteById = function(payload){

    return async function(dispatch){
        await axios.delete(`http://localhost:3001/dogs/${payload}`)

        dispatch({
            type : DELETE_DOG,
            payload
        })
    }
}

export const updateById = function(payload){

    return async function(dispatch){

        await axios.put(`http://localhost:3001/update/${payload.id}`, payload);

        dispatch({
            type: UPDATE_DOG,
            payload
        })
    }
}

export const filterByBreed = function(payload){

    return async function(dispatch){
        dispatch({
            type: FILTER_BY_BREED,
            payload
        })
    }
}

export const orderAscWeight = function(payload){

    return async function(dispatch){ 
        return dispatch({
        type: ORDER_WEIGHT_ASC,
        payload
    })}
}

export const orderDescWeight = function(payload){

    return async function(dispatch){
    return dispatch({
        type: ORDER_WEIGHT_DESC,
        payload
    })}
}