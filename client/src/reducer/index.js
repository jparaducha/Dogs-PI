import { GET_DOGS, ADD_DOG, FILTER_BY_BREED, FILTER_BY_TEMPERAMENT, ORDER_AZ, ORDER_ZA, GET_BY_ID, GET_BY_NAME } from "../actions/constants";
import { getDogs, getByName } from "../actions";

var initialState = {
    allDogs : [],
    details : {},
    selectedDogs : []
}

const rootReducer = function(state = initialState,{type, payload}){

    switch(type){
        case GET_DOGS:
                        return{
                            ...state,
                            allDogs : payload,
                            selectedDogs : payload
                        }
        case GET_BY_NAME:
                        return{
                            ...state,
                            selectedDogs : payload 
                        }
        case ADD_DOG:
                        return{
                            ...state
                        }
        case ORDER_AZ: 
                        return{
                            ...state,
                            selectedDogs : state.allDogs.sort((a,b)=> a.name> b.name ? 1: -1)
                        }
        case ORDER_ZA:
                        return{
                            ...state,
                            selectedDogs : state.allDogs.sort((a,b)=> a.name>b.name ? -1 : 1)
                        }
    }
}

export default rootReducer;