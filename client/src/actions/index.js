import { GET_DOGS, ADD_DOG, FILTER_BY_BREED, FILTER_BY_TEMPERAMENT, ORDER_AZ, ORDER_ZA, GET_BY_ID, GET_BY_NAME } from "./constants";
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

export const getByName =   function(name){
    return async function(dispatch){

        const allDogs = await axios.get(`http://localhost:3001/dogs?name=${name}`);

        return dispatch({
            type: GET_BY_NAME,
            payload : allDogs.data
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
        return {
            type: ORDER_AZ
        }
    }


export const orderZ_A = function(payload){
        return {
            type: ORDER_ZA,
            payload
        }
    }
