import { GET_DOGS, GET_DOGS_LOCALLY, ADD_DOG, FILTER_BY_BREED, FILTER_BY_TEMPERAMENT, ORDER_AZ, ORDER_ZA, GET_BY_ID, GET_BY_NAME, GET_TEMPERAMENT, ORDER_WEIGHT_ASC, DELETE_DOG , ORDER_WEIGHT_DESC, UPDATE_DOG} from "../actions/constants";


var initialState = {
    allDogs : [],
    details : {},
    selectedDogs : [],
    temperaments : {}
}

const rootReducer = function(state = initialState,{type, payload}){

    switch(type){
        case GET_DOGS:
                        return{
                            ...state,
                            allDogs : payload,
                            selectedDogs : payload
                        }
        case GET_DOGS_LOCALLY:
                        return{
                            ...state,
                            selectedDogs : state.allDogs
                        }
        case GET_BY_NAME:
                        return{
                            ...state,
                            selectedDogs : state.allDogs.filter(i => i.name.toLowerCase().includes(payload.toLowerCase())) 
                        }
        case ADD_DOG:
                        return{
                            ...state
                        }
        case ORDER_AZ: 
                        return{
                            ...state,
                            selectedDogs : state.selectedDogs.sort((a,b)=> a.name> b.name ? 1: -1)
                        }
        case ORDER_ZA:
                        return{
                            ...state,
                            selectedDogs : state.selectedDogs.sort((a,b)=> a.name>b.name ? -1 : 1)
                        }
        case GET_TEMPERAMENT:
                        return{
                            ...state,
                            temperaments : payload
                        }
        case FILTER_BY_TEMPERAMENT:
                        return{
                            ...state,
                            selectedDogs : state.allDogs.filter(i =>{

                                let flag = false;
                                if(typeof i.temperament=== 'string'){
                                    if(i.temperament.includes(payload)){
                                        flag = true;
                                    }
                                }

                                return flag;
                            })
                        }
        case GET_BY_ID:
                        return{
                            ...state,
                            details : payload[0]
                        }
        case FILTER_BY_BREED:
                        return{
                            ...state,
                            selectedDogs : state.allDogs.filter((i)=> i.hasOwnProperty('uuid'))
                        }
        case ORDER_WEIGHT_DESC:
                        return{
                            ...state,
                            selectedDogs : state.selectedDogs.sort((a,b) => { 

                                let pesoMaxA = a.weight.length > 2 ? parseInt(a.weight.split(' ')[2], 10): parseInt(a.weight, 10);
                                let pesoMaxB = b.weight.length > 2 ? parseInt(b.weight.split(' ')[2], 10): parseInt(b.weight, 10);

                                if(a.weight.length===3 && !Number.isNaN(parseInt(a.weight[2],10))) pesoMaxA = a.weight;
                                if(b.weight.length===3 && !Number.isNaN(parseInt(b.weight[2],10))) pesoMaxB = b.weight;
                                
                                // console.log('pesoMax A (', pesoMaxA, ') es mayor que pesoMaxB(', pesoMaxB, ')?  ', Number.isNaN(pesoMaxB) || typeof(pesoMaxB)==='string' || pesoMaxA < pesoMaxB)
                                return Number.isNaN(pesoMaxB) || typeof(pesoMaxB)==='string' || pesoMaxA > pesoMaxB ? -1 : 1;
                            })
                        }
        case ORDER_WEIGHT_ASC:
                        return{
                            ...state,
                            selectedDogs : state.selectedDogs.sort((a,b) => { 

                                let pesoMaxA = a.weight.length > 2 ? parseInt(a.weight.split(' ')[0], 10): parseInt(a.weight, 10);
                                let pesoMaxB = b.weight.length > 2 ? parseInt(b.weight.split(' ')[0], 10): parseInt(b.weight, 10);
                                
                                // console.log('pesoMax A (', pesoMaxA, ') es mayor que pesoMaxB(', pesoMaxB, ')?  ', Number.isNaN(pesoMaxB) || typeof(pesoMaxB)==='string' || pesoMaxA < pesoMaxB)
                                return Number.isNaN(pesoMaxB) || typeof(pesoMaxB)==='string' || pesoMaxA < pesoMaxB ? -1 : 1;
                            })
                        }
        case DELETE_DOG:
                        return{
                            ...state,
                            allDogs : state.allDogs.filter((i)=> i.hasOwnProperty('uuid')? i.uuid === payload ? false : true: true )
                        }
        case UPDATE_DOG:
                        return{
                            ...state
                        }
        default :
                        return{
                            ...state
                        }
    }
}

export default rootReducer;